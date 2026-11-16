/**
 * Heating curve coach: guides the user over days/weeks to a curve that just
 * reaches the desired room temperature. One small change per round; after
 * every change the house gets a settling day, then enough heating hours are
 * collected before the next evaluation.
 *
 * Evaluation splits the hours into mild and cold outdoor temperatures:
 *   same deviation in both → parallel shift
 *   cold too cold / warm but mild fits → slope (design temperature)
 * Hours above the heating limit tell whether the heating limit is too low.
 */

import { flowTarget, type CurveParams } from "./curve";

export interface CoachLogEntry {
  /** ISO time of the change */
  ts: string;
  /** parameter → [before, after] */
  changes: Partial<Record<keyof CurveParams, [number, number]>>;
  /** reason key (cc.why.*) */
  why: string;
  /** mean room deviation (K) mild / cold / overall at the time of the change */
  dev?: { mild?: number; cold?: number; all?: number };
  /** set at the controller by hand instead of written by COPilot */
  manual?: boolean;
}

export interface CoachState {
  /** ISO start of the coaching */
  started: string;
  /** desired room temperature (reference room) */
  target: number;
  /** ISO time of the last change: evaluation uses hours after it + settling time */
  step_since: string;
  /** optional entity (binary_sensor/input_boolean/switch…) that marks disturbances (stove, open window) */
  disturb?: string;
  /** user postponed the evaluation until (ISO) */
  snooze_until?: string;
  /** epoch seconds from which the backend reports "evaluation due" */
  due_at?: number;
  log: CoachLogEntry[];
}

export interface CoachPoint {
  /** start of the hour, epoch ms */
  ts: number;
  tOut: number;
  flow?: number;
  room?: number;
  /** heat pump heated in this hour (false: above heating limit / no heat output) */
  heating: boolean;
}

export const SETTLE_H = 24;
export const MIN_HOURS = 36;
export const MIN_DAYS = 2;
/** bands */
export const MILD_FROM = 5;
export const COLD_BELOW = 1;
export const BAND_MIN_H = 10;
/** room deviation that is fine */
export const TOL = 0.3;
const H = 3600_000;

export type CoachStatus =
  | { kind: "settle"; until: number }
  | { kind: "collect"; hours: number; days: number; progress: number; eta: number; snoozed?: boolean }
  | { kind: "suggest"; change: Partial<CurveParams>; why: string; dev: BandDev; hours: number }
  | { kind: "fits"; dev: BandDev; hours: number; coldSeen: boolean };

export interface BandDev {
  all?: number;
  mild?: number;
  cold?: number;
  mildH: number;
  coldH: number;
  /** room deviation in hours above the heating limit (no heating) */
  idle?: number;
  idleH: number;
}

const mean = (a: number[]) => (a.length ? a.reduce((s, v) => s + v, 0) / a.length : undefined);
const r1 = (v: number) => Math.round(v * 10) / 10;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const roundTo = (v: number, step: number) => Math.round(v / step) * step;

/**
 * Hours disturbed by an outside heat source: room temperature jumps by more than
 * 0.6 K within an hour; that hour and the next three are ignored.
 */
export function jumpDisturbed(pts: CoachPoint[]): Set<number> {
  const out = new Set<number>();
  const sorted = pts.filter((p) => p.room !== undefined).sort((a, b) => a.ts - b.ts);
  for (let i = 1; i < sorted.length; i++) {
    const a = sorted[i - 1];
    const b = sorted[i];
    if (b.ts - a.ts <= H && b.room! - a.room! > 0.6) for (let k = 0; k < 4; k++) out.add(b.ts + k * H);
  }
  return out;
}

/** Points that count for the evaluation: after settling, with room temperature, not disturbed. */
export function usable(pts: CoachPoint[], state: CoachState, disturbed: Set<number>): CoachPoint[] {
  const from = new Date(state.step_since).getTime() + SETTLE_H * H;
  return pts.filter((p) => p.ts >= from && p.room !== undefined && !disturbed.has(p.ts));
}

export function bandDeviation(pts: CoachPoint[], target: number): BandDev {
  const heat = pts.filter((p) => p.heating);
  const idle = pts.filter((p) => !p.heating);
  const dev = (a: CoachPoint[]) => {
    const m = mean(a.map((p) => p.room! - target));
    return m === undefined ? undefined : r1(m);
  };
  const mild = heat.filter((p) => p.tOut >= MILD_FROM);
  const cold = heat.filter((p) => p.tOut < COLD_BELOW);
  return {
    all: dev(heat),
    mild: mild.length >= BAND_MIN_H ? dev(mild) : undefined,
    cold: cold.length >= BAND_MIN_H ? dev(cold) : undefined,
    mildH: mild.length,
    coldH: cold.length,
    idle: idle.length >= BAND_MIN_H ? dev(idle) : undefined,
    idleH: idle.length,
  };
}

/** K flow temperature per K room temperature (rule of thumb). */
export function flowPerRoom(p: CurveParams): number {
  return p.exponent > 1.2 ? 2.5 : 1.5;
}

/**
 * One change for this round, or null when the curve fits.
 * Steps are deliberately small: at most 1.5 K parallel shift or 3 K design temperature.
 */
export function proposeChange(p: CurveParams, d: BandDev): { change: Partial<CurveParams>; why: string } | null {
  const f = flowPerRoom(p);
  // 1) slope: cold and mild disagree clearly
  if (d.mild !== undefined && d.cold !== undefined && Math.abs(d.cold - d.mild) >= 0.4) {
    const diff = d.cold - d.mild; // > 0: too warm when cold → flatter
    const step = clamp(roundTo(-diff * f * 1.5, 1), -3, 3) || -Math.sign(diff);
    // keep the mild end where it is when it fits; otherwise the next round fixes the offset
    return { change: { design: clamp(p.design + step, 28, 65) }, why: diff > 0 ? "flatter" : "steeper" };
  }
  // 2) everything too warm / too cold → parallel shift
  const all = d.all;
  if (all !== undefined && Math.abs(all) > TOL) {
    const step = clamp(roundTo(-all * f, 0.5), -1.5, 1.5) || -Math.sign(all) * 0.5;
    return { change: { offset: clamp(p.offset + step, -10, 10) }, why: all > 0 ? "lower" : "raise" };
  }
  // 3) cools down above the heating limit
  if (d.idle !== undefined && d.idle < -0.7 && p.limit < 20) {
    return { change: { limit: p.limit + 1 }, why: "limit_up" };
  }
  return null;
}

/** Current status of the coach for the given points. */
export function coachStatus(p: CurveParams, state: CoachState, pts: CoachPoint[], disturbed: Set<number>, now = Date.now()): CoachStatus {
  const settleEnd = new Date(state.step_since).getTime() + SETTLE_H * H;
  if (now < settleEnd) return { kind: "settle", until: settleEnd };
  const use = usable(pts, state, disturbed);
  const heatH = use.filter((p) => p.heating).length;
  const days = new Set(use.map((p) => new Date(p.ts).toDateString())).size;
  const snoozed = !!state.snooze_until && now < new Date(state.snooze_until).getTime();
  if (heatH < MIN_HOURS || days < MIN_DAYS || snoozed) {
    // rate of usable heating hours per elapsed hour so far (default: 18 h/day)
    const elapsed = Math.max(1, (now - settleEnd) / H);
    const rate = elapsed >= 12 && heatH > 0 ? Math.min(1, heatH / elapsed) : 0.75;
    const needH = Math.max(0, MIN_HOURS - heatH) / rate;
    const needD = Math.max(0, MIN_DAYS - days) * 24;
    let eta = now + Math.max(needH, needD) * H;
    if (snoozed) eta = Math.max(eta, new Date(state.snooze_until!).getTime());
    const progress = Math.min(1, Math.min(heatH / MIN_HOURS, days / MIN_DAYS));
    return { kind: "collect", hours: heatH, days, progress, eta, snoozed };
  }
  const dev = bandDeviation(use, state.target);
  const prop = proposeChange(p, dev);
  if (prop) return { kind: "suggest", ...prop, dev, hours: heatH };
  return { kind: "fits", dev, hours: heatH, coldSeen: dev.coldH >= BAND_MIN_H };
}

/** Expected flow at the outdoor temperature with a change applied (for texts). */
export function flowAt(p: CurveParams, tOut: number): number | null {
  const v = flowTarget(p, tOut);
  return v === null ? null : r1(v);
}

export function newCoach(target: number, now = new Date()): CoachState {
  const iso = now.toISOString();
  return { started: iso, target, step_since: iso, log: [], due_at: Math.round(now.getTime() / 1000 + (SETTLE_H + MIN_DAYS * 24) * 3600) };
}

/** State after a change (written or set by hand). */
export function afterChange(state: CoachState, entry: CoachLogEntry): CoachState {
  const ts = new Date(entry.ts);
  return {
    ...state,
    step_since: entry.ts,
    snooze_until: undefined,
    due_at: Math.round(ts.getTime() / 1000 + (SETTLE_H + MIN_DAYS * 24) * 3600),
    log: [...state.log, entry],
  };
}
