/**
 * Before / after: how much fuel the old boiler used at a given outdoor
 * temperature, and how the heat pump compares on the same days.
 *
 * The old meter (gas m³ or kWh, oil litres) and an outdoor temperature are read
 * as daily long-term statistics up to the switch-over date. Days with broken
 * sensors are dropped (frozen temperature, zero runs of the meter, outliers),
 * then a heating line `fuel = a + b · T` is fitted to the heating days and a
 * base load (hot water, cooking) is taken from the warm days. For every heat
 * pump day the line gives the fuel the old boiler would have needed at that
 * temperature; set against the measured heat pump electricity this yields a
 * performance factor that does not depend on the heat pump's own (modelled)
 * heat meter.
 */

import { tariffOf } from "./costs";
import { midnight } from "./efficiency";
import type { BaselineConfig, Hass, Plant } from "../types";
import type { Simulator } from "../sim/simulator";

export type FuelUnit = "m3" | "kwh" | "l";

/** Defaults per unit: kWh per unit (gross calorific value × z-number for gas), CO₂ in kg per kWh fuel. */
export const UNIT_DEFAULTS: Record<FuelUnit, { kwh: number; co2: number; price: number }> = {
  m3: { kwh: 10, co2: 0.201, price: 1.2 },
  kwh: { kwh: 1, co2: 0.201, price: 0.12 },
  l: { kwh: 10, co2: 0.266, price: 1.0 },
};

export const DEFAULT_BASELINE: Required<Omit<BaselineConfig, "meter" | "outdoor" | "switch_date" | "from" | "annual">> = {
  enabled: false,
  unit: "m3",
  kwh_per_unit: UNIT_DEFAULTS.m3.kwh,
  eff: 90,
  price: UNIT_DEFAULTS.m3.price,
  co2_per_kwh: UNIT_DEFAULTS.m3.co2,
  heating_limit: 15,
};

export function baselineOf(plant: Plant) {
  const b = plant.settings.baseline || {};
  const unit = (b.unit || "m3") as FuelUnit;
  const d = UNIT_DEFAULTS[unit];
  return {
    ...DEFAULT_BASELINE,
    kwh_per_unit: d.kwh,
    price: d.price,
    co2_per_kwh: d.co2,
    ...b,
    unit,
  };
}

/** One day of the old heating. */
export interface FuelDay {
  day: number;
  /** daily mean outdoor temperature, °C */
  t: number;
  /** fuel used, in the meter's unit */
  fuel: number;
}

export type DropReason = "temp_frozen" | "zero_run" | "outlier" | "no_temp";

export interface CleanResult {
  days: FuelDay[];
  dropped: Record<DropReason, number>;
}

/** Raw daily inputs as they come from the statistics. */
export interface RawDay {
  day: number;
  fuel?: number | null;
  t?: number | null;
  tMin?: number | null;
  tMax?: number | null;
}

/** Drop days on which a sensor obviously did not work. */
export function cleanDays(raw: RawDay[]): CleanResult {
  const dropped: Record<DropReason, number> = { temp_frozen: 0, zero_run: 0, outlier: 0, no_temp: 0 };
  const sorted = [...raw].filter((r) => r.fuel !== null && r.fuel !== undefined).sort((a, b) => a.day - b.day);
  // runs of two or more days without consumption: the meter (or its reader) was down
  const zero = new Set<number>();
  for (let i = 0; i < sorted.length; ) {
    let j = i;
    while (j < sorted.length && (sorted[j].fuel as number) <= 0.001) j++;
    if (j - i >= 2) for (let k = i; k < j; k++) zero.add(sorted[k].day);
    i = j > i ? j : i + 1;
  }
  const kept: FuelDay[] = [];
  for (const r of sorted) {
    const fuel = r.fuel as number;
    if (zero.has(r.day)) {
      dropped.zero_run++;
      continue;
    }
    if (r.t === null || r.t === undefined || !Number.isFinite(r.t)) {
      dropped.no_temp++;
      continue;
    }
    // a temperature that did not move over a whole day is a frozen sensor
    if (r.tMin != null && r.tMax != null && r.tMax - r.tMin < 0.3) {
      dropped.temp_frozen++;
      continue;
    }
    if (fuel < 0) {
      dropped.outlier++;
      continue;
    }
    kept.push({ day: r.day, t: r.t, fuel });
  }
  // catch-up bookings after an outage: far above everything else
  if (kept.length >= 20) {
    const v = kept.map((d) => d.fuel).sort((a, b) => a - b);
    const p95 = v[Math.floor(v.length * 0.95)];
    const limit = Math.max(p95 * 2.5, 0.5);
    const out = kept.filter((d) => d.fuel <= limit);
    dropped.outlier += kept.length - out.length;
    return { days: out, dropped };
  }
  return { days: kept, dropped };
}

export interface Bin {
  /** lower edge of the 1 K class */
  t: number;
  n: number;
  mean: number;
  sd: number;
}

export interface BaselineFit {
  /** fuel per day = a + b · T (b < 0), in the meter's unit */
  a: number;
  b: number;
  /** base load per day (warm days) */
  base: number;
  /** outdoor temperature where the line meets the base load */
  limit: number;
  r2: number;
  /** days used: total, on the heating line, for the base load */
  n: number;
  nHeat: number;
  nBase: number;
  from: number;
  to: number;
  bins: Bin[];
  /** fitted from a yearly consumption instead of meter history */
  fromAnnual?: boolean;
}

const mean = (a: number[]) => a.reduce((s, x) => s + x, 0) / a.length;

export function linreg(pts: [number, number][]): { a: number; b: number; r2: number } {
  const mx = mean(pts.map((p) => p[0]));
  const my = mean(pts.map((p) => p[1]));
  let sxy = 0;
  let sxx = 0;
  let syy = 0;
  for (const [x, y] of pts) {
    sxy += (x - mx) * (y - my);
    sxx += (x - mx) ** 2;
    syy += (y - my) ** 2;
  }
  const b = sxx > 0 ? sxy / sxx : 0;
  const a = my - b * mx;
  let res = 0;
  for (const [x, y] of pts) res += (y - a - b * x) ** 2;
  return { a, b, r2: syy > 0 ? 1 - res / syy : 0 };
}

export function binDays(days: FuelDay[]): Bin[] {
  const m = new Map<number, number[]>();
  for (const d of days) {
    const k = Math.floor(d.t);
    const list = m.get(k) || [];
    list.push(d.fuel);
    m.set(k, list);
  }
  return [...m.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([t, v]) => {
      const mu = mean(v);
      return { t, n: v.length, mean: mu, sd: Math.sqrt(mean(v.map((x) => (x - mu) ** 2))) };
    });
}

export const MIN_HEAT_DAYS = 30;

/**
 * Heating line through the cold days. Days at or below `fitMax` °C form the
 * line; days at 18 °C and warmer give the base load. Returns undefined with too
 * little data or a line that does not fall with rising temperature.
 */
export function fitBaseline(days: FuelDay[], fitMax = 12): BaselineFit | undefined {
  const heat = days.filter((d) => d.t <= fitMax);
  if (heat.length < MIN_HEAT_DAYS) return undefined;
  const { a, b, r2 } = linreg(heat.map((d) => [d.t, d.fuel]));
  if (!(b < 0)) return undefined;
  const warm = days.filter((d) => d.t >= 18).map((d) => d.fuel);
  // without summer days, assume hot water at half of the line at 15 °C
  const base = warm.length >= 10 ? mean(warm) : Math.max(0, (a + b * 15) * 0.5);
  const limit = Math.min(22, Math.max(8, (base - a) / b));
  return {
    a,
    b,
    base,
    limit,
    r2,
    n: days.length,
    nHeat: heat.length,
    nBase: warm.length,
    from: Math.min(...days.map((d) => d.day)),
    to: Math.max(...days.map((d) => d.day)),
    bins: binDays(days),
  };
}

/** Long-term daily mean temperatures for one year (Central European climate), used without meter history. */
const MONTH_TEMPS = [1.5, 2.5, 6.0, 10.0, 14.5, 17.5, 19.5, 19.0, 15.0, 10.0, 5.5, 2.5];

/**
 * Heating line from a yearly consumption alone. Hot water takes `dhwShare`,
 * the rest is spread over the heating degree days below `limit`.
 */
export function fitFromAnnual(annual: number, limit = 15, dhwShare = 0.18): BaselineFit | undefined {
  if (!(annual > 0)) return undefined;
  const base = (annual * dhwShare) / 365;
  let hdd = 0;
  const year = new Date().getFullYear() - 1;
  for (let m = 0; m < 12; m++) {
    const n = new Date(year, m + 1, 0).getDate();
    // ±4 K spread of the daily means around the month mean
    for (const dt of [-4, -2, 0, 2, 4]) hdd += (Math.max(0, limit - (MONTH_TEMPS[m] + dt)) * n) / 5;
  }
  const slope = (annual * (1 - dhwShare)) / hdd;
  return { a: base + slope * limit, b: -slope, base, limit, r2: NaN, n: 0, nHeat: 0, nBase: 0, from: 0, to: 0, bins: [], fromAnnual: true };
}

/** Fuel the old boiler would have used at this daily mean temperature. */
export function expectedFuel(fit: BaselineFit, t: number): number {
  return Math.max(fit.base, fit.a + fit.b * t);
}

/** One heat pump day next to the old heating. */
export interface CompareDay {
  day: number;
  t: number;
  /** heat pump electricity, kWh */
  el: number;
  /** heat pump heat as reported by the unit, kWh (may be missing) */
  heat?: number;
  /** fuel the old boiler would have used (meter unit), its energy and the useful heat */
  fuel: number;
  fuelKwh: number;
  useful: number;
  /** useful heat of the old boiler ÷ heat pump electricity */
  factor: number;
  costOld: number;
  costHp: number;
  co2Old: number;
  /** electricity price used for this day, €/kWh */
  price: number;
}

export interface CompareTotals {
  days: number;
  el: number;
  fuel: number;
  fuelKwh: number;
  useful: number;
  factor: number;
  costOld: number;
  costHp: number;
  co2Old: number;
}

export function compareDay(
  fit: BaselineFit,
  cfg: ReturnType<typeof baselineOf>,
  d: { day: number; t: number; el: number; heat?: number },
  price: number,
): CompareDay {
  const fuel = expectedFuel(fit, d.t);
  const fuelKwh = fuel * cfg.kwh_per_unit;
  const useful = fuelKwh * (cfg.eff / 100);
  return {
    day: d.day,
    t: d.t,
    el: d.el,
    heat: d.heat,
    fuel,
    fuelKwh,
    useful,
    factor: d.el > 0.05 ? useful / d.el : NaN,
    costOld: fuel * cfg.price,
    costHp: d.el * price,
    co2Old: fuelKwh * cfg.co2_per_kwh,
    price,
  };
}

export function sumCompare(days: CompareDay[]): CompareTotals | null {
  if (!days.length) return null;
  const z = { days: days.length, el: 0, fuel: 0, fuelKwh: 0, useful: 0, factor: NaN, costOld: 0, costHp: 0, co2Old: 0 };
  for (const d of days) {
    z.el += d.el;
    z.fuel += d.fuel;
    z.fuelKwh += d.fuelKwh;
    z.useful += d.useful;
    z.costOld += d.costOld;
    z.costHp += d.costHp;
    z.co2Old += d.co2Old;
  }
  z.factor = z.el > 0.05 ? z.useful / z.el : NaN;
  return z;
}

/** Electricity price at which the heat pump costs as much as the old boiler at this performance factor. */
export function breakEvenFactor(cfg: ReturnType<typeof baselineOf>, price: number): number {
  const usefulPrice = cfg.price / cfg.kwh_per_unit / (cfg.eff / 100);
  return price / usefulPrice;
}

// ------------------------------------------------------------- loading

export interface BaselineData {
  fit?: BaselineFit;
  clean?: CleanResult;
  compare: CompareDay[];
  /** why nothing could be fitted */
  missing?: "disabled" | "no_meter" | "no_outdoor" | "no_switch" | "too_few_days" | "no_slope";
  /** electricity price used for the cost columns (fixed price or mean of the price entity) */
  price: number;
  demo?: boolean;
}

type StatRow = { start: number; change?: number | null; mean?: number | null; min?: number | null; max?: number | null };

const DAY = 86400_000;

/** Outdoor temperature entity: the configured one, else the heat pump's sensor. */
function outdoorEntity(plant: Plant): string | undefined {
  const cfg = plant.settings.baseline;
  if (cfg?.outdoor) return cfg.outdoor;
  return plant.components.find((c) => c.type === "outdoor_unit")?.bindings.outdoor_temp;
}

function elEntity(plant: Plant): string | undefined {
  const iu = plant.components.find((c) => c.type === "indoor_unit");
  return iu?.bindings.el_energy_total;
}

function heatEntity(plant: Plant): string | undefined {
  const iu = plant.components.find((c) => c.type === "indoor_unit");
  return iu?.bindings.heat_energy_total;
}

const cache = new Map<string, { at: number; data: Promise<BaselineData> }>();
const CACHE_MS = 30 * 60_000;

export function loadBaseline(hass: Hass, plant: Plant): Promise<BaselineData> {
  const key = JSON.stringify([plant.settings.baseline, plant.settings.tariff, outdoorEntity(plant), elEntity(plant)]);
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.data;
  const data = hassBaseline(hass, plant);
  cache.set(key, { at: Date.now(), data });
  data.catch(() => cache.delete(key));
  return data;
}

async function hassBaseline(hass: Hass, plant: Plant): Promise<BaselineData> {
  const cfg = baselineOf(plant);
  const tariff = tariffOf(plant);
  let price = tariff.price;
  const out: BaselineData = { compare: [], price };
  if (!cfg.enabled) return { ...out, missing: "disabled" };
  const tId = outdoorEntity(plant);
  if (!cfg.switch_date) return { ...out, missing: "no_switch" };
  const sw = midnight(new Date(cfg.switch_date));
  const now = Date.now();
  if (!tId) return { ...out, missing: "no_outdoor" };

  const stats = (ids: string[], start: number, end: number, types: string[]) =>
    hass.callWS<Record<string, StatRow[]>>({
      type: "recorder/statistics_during_period",
      start_time: new Date(start).toISOString(),
      end_time: new Date(end).toISOString(),
      statistic_ids: ids,
      period: "day",
      types,
    });

  // -- before: meter + outdoor temperature
  let fit: BaselineFit | undefined;
  let clean: CleanResult | undefined;
  if (cfg.meter) {
    const from = cfg.from ? midnight(new Date(cfg.from)) : sw - 4 * 365 * DAY;
    const [meter, temp] = await Promise.all([stats([cfg.meter], from, sw, ["change"]), stats([tId], from, sw, ["mean", "min", "max"])]);
    const byDay = new Map<number, RawDay>();
    for (const r of meter[cfg.meter] || []) {
      const day = midnight(new Date(r.start));
      byDay.set(day, { ...(byDay.get(day) || { day }), fuel: r.change ?? null });
    }
    for (const r of temp[tId] || []) {
      const day = midnight(new Date(r.start));
      const d = byDay.get(day);
      if (d) Object.assign(d, { t: r.mean, tMin: r.min, tMax: r.max });
    }
    clean = cleanDays([...byDay.values()].filter((d) => d.day < sw));
    fit = fitBaseline(clean.days);
    if (!fit) return { ...out, clean, missing: clean.days.length < MIN_HEAT_DAYS ? "too_few_days" : "no_slope" };
  } else if (cfg.annual) {
    fit = fitFromAnnual(cfg.annual, cfg.heating_limit);
  } else return { ...out, missing: "no_meter" };
  if (!fit) return { ...out, missing: "no_meter" };

  // -- after: heat pump electricity + outdoor temperature since the switch-over (max. one year)
  const elId = elEntity(plant);
  const hId = heatEntity(plant);
  const start = Math.max(sw, midnight(new Date()) - 365 * DAY);
  const priceId = tariff.mode === "entity" ? tariff.price_entity : undefined;
  const energyIds = [elId, hId].filter((x): x is string => !!x);
  const [en, temp, prices] = await Promise.all([
    energyIds.length
      ? hass.callWS<Record<string, StatRow[]>>({
          type: "recorder/statistics_during_period",
          start_time: new Date(start).toISOString(),
          end_time: new Date(now).toISOString(),
          statistic_ids: energyIds,
          period: "day",
          types: ["change"],
          units: { energy: "kWh" },
        })
      : Promise.resolve({} as Record<string, StatRow[]>),
    stats([tId], start, now, ["mean"]),
    priceId ? stats([priceId], start, now, ["mean"]) : Promise.resolve({} as Record<string, StatRow[]>),
  ]);
  const tByDay = new Map<number, number>();
  for (const r of temp[tId] || []) if (r.mean != null) tByDay.set(midnight(new Date(r.start)), r.mean);
  const pByDay = new Map<number, number>();
  for (const r of (priceId && prices[priceId]) || []) if (r.mean != null) pByDay.set(midnight(new Date(r.start)), r.mean);
  if (pByDay.size) price = mean([...pByDay.values()]);
  const hByDay = new Map<number, number>();
  for (const r of (hId && en[hId]) || []) if (r.change != null) hByDay.set(midnight(new Date(r.start)), r.change);
  const today = midnight(new Date());
  for (const r of (elId && en[elId]) || []) {
    const day = midnight(new Date(r.start));
    const t = tByDay.get(day);
    // only complete days: not the running one, not the switch-over day itself
    if (r.change == null || t === undefined || day >= today || day <= sw) continue;
    out.compare.push(compareDay(fit, cfg, { day, t, el: r.change, heat: hByDay.get(day) }, pByDay.get(day) ?? tariff.price));
  }
  out.compare.sort((a, b) => a.day - b.day);
  return { ...out, fit, clean, price };
}

// ------------------------------------------------------------- demo

/** Small deterministic noise so the demo looks the same on every load. */
function noise(i: number): number {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}

/**
 * Demo: two winters of a gas boiler for the simulated house, then the last
 * 30 days with the heat pump. The heat pump's electricity follows the same
 * heat demand with a temperature-dependent performance factor.
 */
export function simBaseline(sim: Simulator, plant: Plant): BaselineData {
  const cfg = { ...baselineOf(plant), enabled: true };
  const tariff = tariffOf(plant);
  const p = sim.p;
  const hLoss = p.heatLoad / (21 - p.designTemp); // kW/K
  const today = midnight(new Date(sim.time * 1000));
  const kwhPerUnit = cfg.kwh_per_unit;
  const dhwKwh = 13; // useful heat for hot water per day
  const fuelOf = (t: number, i: number) => {
    const heat = Math.max(0, hLoss * (16 - t) * 24 * 0.85) + dhwKwh;
    return Math.max(0.2, ((heat / (cfg.eff / 100)) / kwhPerUnit) * (1 + noise(i) * 0.14));
  };
  const raw: RawDay[] = [];
  for (let i = 760; i > 31; i--) {
    const day = today - i * DAY;
    const d = new Date(day);
    const m = d.getMonth();
    const t = MONTH_TEMPS[m] + noise(i + 7) * 4.5;
    // a few broken stretches, as in real installations
    const frozen = i > 420 && i < 470;
    const meterDown = i > 300 && i < 330;
    raw.push({ day, t: frozen ? 7.1 : t, tMin: frozen ? 7.1 : t - 3, tMax: frozen ? 7.1 : t + 3, fuel: meterDown ? 0 : fuelOf(t, i) });
  }
  const clean = cleanDays(raw);
  const fit = fitBaseline(clean.days)!;
  const compare: CompareDay[] = [];
  for (let i = 30; i >= 1; i--) {
    const day = today - i * DAY;
    const recent = (30 - i) / 30;
    const t = MONTH_TEMPS[new Date(day).getMonth()] * (1 - recent) + sim.outdoorMean * recent + noise(i + 99) * 3;
    const heat = Math.max(0, hLoss * (16 - t) * 24 * 0.85) * 1.08 + dhwKwh;
    const factor = Math.max(1.8, 3.2 + 0.09 * t) * (1 + noise(i + 3) * 0.06);
    compare.push(compareDay(fit, cfg, { day, t, el: heat / factor, heat: heat * 1.15 }, tariff.price));
  }
  return { fit, clean, compare, price: tariff.price, demo: true };
}
