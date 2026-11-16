/**
 * Heating curve coach card (below the curve chart): start dialog with checklist,
 * stepper, current status with progress / suggestion, band coverage and log.
 * All writing is done by the curve view (events).
 */

import { LitElement, css, html, nothing } from "lit";
import { fmtNum, t } from "../i18n";
import { icon, ui } from "../styles";
import type { Hass } from "../types";
import type { CurveParams } from "../data/curve";
import { BAND_MIN_H, COLD_BELOW, MILD_FROM, MIN_DAYS, MIN_HOURS, SETTLE_H, TOL, flowAt, type CoachState, type CoachStatus } from "../data/coach";

const STEPS = ["prep", "settle", "collect", "adjust", "fits"] as const;

function when(ts: number | string, withDay = true): string {
  const d = new Date(ts);
  return d.toLocaleString(undefined, withDay ? { weekday: "short", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" } : { hour: "2-digit", minute: "2-digit" });
}

const sign = (v: number) => `${v > 0 ? "+" : v < 0 ? "−" : "±"}${fmtNum(Math.abs(v), 1)}`;

export class CpCoach extends LitElement {
  static properties = {
    hass: { attribute: false },
    state: { attribute: false },
    status: { attribute: false },
    params: { attribute: false },
    admin: { type: Boolean },
    demo: { type: Boolean },
    canWrite: { type: Boolean },
    circuit: { type: String },
    _start: { state: true },
    _checks: { state: true },
    _target: { state: true },
    _disturb: { state: true },
    _showLog: { state: true },
  };
  hass?: Hass;
  state?: CoachState;
  status?: CoachStatus | null;
  params!: CurveParams;
  admin = false;
  demo = false;
  canWrite = false;
  circuit = "";
  private _start = false;
  private _checks = new Set<string>();
  private _target = 21;
  private _disturb = "";
  private _showLog = false;

  private _emit(name: string, detail?: unknown) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  private _openStart() {
    this._target = this.state?.target ?? this.params.roomSet;
    this._disturb = this.state?.disturb ?? "";
    this._checks = new Set();
    this._start = true;
  }

  private get _stepIdx(): number {
    const s = this.status;
    if (!this.state || !s) return 0;
    return s.kind === "settle" ? 1 : s.kind === "collect" ? 2 : s.kind === "suggest" ? 3 : 4;
  }

  render() {
    return html`<div class="card coach">
      <div class="row head">
        <span class="cap">${icon("wand")} ${t("cc.title")}</span>
        <span class="spacer"></span>
        ${this.state && this.admin
          ? html`<button class="small-btn" @click=${() => (this._showLog = !this._showLog)}>${icon("history")} ${t("cc.log")} (${this.state.log.length})</button>
              <button class="small-btn" @click=${this._openStart}>${icon("gear")} ${t("cc.settings")}</button>
              <button class="small-btn" @click=${() => confirm(t("cc.stop_q")) && this._emit("coach-stop")}>${t("cc.stop")}</button>`
          : nothing}
      </div>
      ${this.state ? this._running(this.state) : this._intro()}
      ${this._start ? this._startDialog() : nothing}
    </div>`;
  }

  private _intro() {
    return html`<div class="intro">
      <p class="small">${t("cc.intro")}</p>
      <ol class="small how">
        <li>${t("cc.how1")}</li>
        <li>${t("cc.how2", { h: SETTLE_H })}</li>
        <li>${t("cc.how3", { h: MIN_HOURS, d: MIN_DAYS })}</li>
        <li>${t("cc.how4")}</li>
      </ol>
      ${this.admin
        ? html`<button class="primary" @click=${this._openStart}>${icon("play")} ${t("cc.start")}</button>`
        : html`<p class="muted small">${t("cc.admin_only")}</p>`}
    </div>`;
  }

  private _stepper() {
    const idx = this._stepIdx;
    return html`<ol class="stepper">
      ${STEPS.map(
        (s, i) => html`<li class=${i < idx ? "done" : i === idx ? "on" : ""}>
          <span class="dot">${i < idx ? icon("check") : i + 1}</span><span class="sl">${t(`cc.step.${s}`)}</span>
        </li>`,
      )}
    </ol>`;
  }

  private _running(state: CoachState) {
    const s = this.status;
    return html`
      ${this._stepper()}
      <div class="meta small muted">
        ${t("cc.meta", { target: state.target, since: when(state.started), round: state.log.length + 1 })}
        ${state.disturb ? html` · ${t("cc.meta_disturb", { entity: state.disturb })}` : nothing}
        ${this.demo ? html` · <b>${t("cc.demo")}</b>` : nothing}
      </div>
      ${!s ? html`<p class="muted small">${t("cc.loading")}</p>` : nothing}
      ${s?.kind === "settle"
        ? html`<div class="box info">
            <b>${t("cc.settle_t")}</b>
            <p class="small">${t("cc.settle", { until: when(s.until), h: SETTLE_H })}</p>
          </div>`
        : nothing}
      ${s?.kind === "collect"
        ? html`<div class="box info">
            <b>${t(s.snoozed ? "cc.snoozed_t" : "cc.collect_t")}</b>
            <div class="bar"><i style="width:${Math.round(s.progress * 100)}%"></i></div>
            <p class="small">${t("cc.collect", { h: s.hours, need: MIN_HOURS, d: s.days, needd: MIN_DAYS, eta: when(s.eta) })}</p>
            <p class="small muted">${t("cc.collect_hint")}</p>
          </div>`
        : nothing}
      ${s?.kind === "suggest" ? this._suggest(s) : nothing}
      ${s?.kind === "fits"
        ? html`<div class="box ok">
            <b>${t("cc.fits_t")}</b>
            <p class="small">${t("cc.fits", { tol: TOL })}</p>
            ${!s.coldSeen ? html`<p class="small">${t("cc.fits_cold", { t: COLD_BELOW })}</p>` : nothing}
          </div>`
        : nothing}
      ${s && s.kind !== "settle" && s.kind !== "collect" ? this._bands(s.dev) : nothing}
      ${this._showLog ? this._log(state) : nothing}
    `;
  }

  private _bands(d: Extract<CoachStatus, { dev: unknown }>["dev"]) {
    const cell = (label: string, dev: number | undefined, h: number) => html`<div class="band ${dev === undefined ? "na" : Math.abs(dev) <= TOL ? "good" : dev > 0 ? "warm" : "cold"}">
      <span class="bl">${label}</span>
      <b>${dev === undefined ? "–" : `${sign(dev)} K`}</b>
      <span class="bh">${dev === undefined ? t("cc.band_need", { h: BAND_MIN_H - Math.min(h, BAND_MIN_H) }) : t("cc.band_h", { h })}</span>
    </div>`;
    return html`<div class="bands">
      ${cell(t("cc.band_cold", { t: COLD_BELOW }), d.cold, d.coldH)}
      ${cell(t("cc.band_all"), d.all, d.mildH + d.coldH)}
      ${cell(t("cc.band_mild", { t: MILD_FROM }), d.mild, d.mildH)}
      ${d.idleH ? cell(t("cc.band_idle", { t: this.params.limit }), d.idle, d.idleH) : nothing}
    </div>
    <p class="muted small">${t("cc.band_note")}</p>`;
  }

  private _suggest(s: Extract<CoachStatus, { kind: "suggest" }>) {
    const p = this.params;
    const next = { ...p, ...s.change };
    const entries = Object.entries(s.change) as [keyof CurveParams, number][];
    const at = [-10, 0, 10].map((x) => ({ x, a: flowAt(p, x), b: flowAt(next, x) })).filter((v) => v.a !== null && v.b !== null);
    return html`<div class="box warn">
      <b>${t(`cc.why.${s.why}`)}</b>
      <p class="small">${t(`cc.whyx.${s.why}`)}</p>
      <ul class="small">
        ${entries.map(([k, v]) => html`<li>${t(`cv.p.${k}`)}: ${fmtNum(p[k], 1)} → <b>${fmtNum(v, 1)}</b> ${k === "offset" ? "K" : "°C"}</li>`)}
      </ul>
      ${at.length
        ? html`<p class="small muted">${t("cc.effect")} ${at.map((v, i) => html`${i ? " · " : ""}${t("cc.effect_at", { x: v.x, a: v.a, b: v.b })}`)}</p>`
        : nothing}
      ${this.admin
        ? html`<div class="row btns">
            <button @click=${() => this._emit("coach-preview", s.change)}>${t("cv.try")}</button>
            ${this.canWrite ? html`<button class="primary" @click=${() => this._emit("coach-apply", { change: s.change, why: s.why, dev: s.dev, manual: false })}>${icon("check")} ${t("cc.apply")}</button>` : nothing}
            <button class=${this.canWrite ? "" : "primary"} @click=${() => this._emit("coach-apply", { change: s.change, why: s.why, dev: s.dev, manual: true })}>${t("cc.manual")}</button>
            <button class="ghost" @click=${() => this._emit("coach-snooze")}>${t("cc.snooze")}</button>
          </div>
          ${!this.canWrite ? html`<p class="muted small">${t("cc.manual_hint")}</p>` : nothing}`
        : nothing}
    </div>`;
  }

  private _log(state: CoachState) {
    if (!state.log.length) return html`<p class="muted small">${t("cc.log_empty")}</p>`;
    return html`<table class="log small">
      <thead><tr><th>${t("cc.log_when")}</th><th>${t("cc.log_change")}</th><th>${t("cc.log_why")}</th><th>${t("cc.log_dev")}</th></tr></thead>
      <tbody>
        ${[...state.log].reverse().map(
          (e) => html`<tr>
            <td>${when(e.ts)}</td>
            <td>${(Object.entries(e.changes) as [keyof CurveParams, [number, number]][]).map(
              ([k, [a, b]]) => html`<div>${t(`cv.p.${k}`)} ${fmtNum(a, 1)} → <b>${fmtNum(b, 1)}</b></div>`,
            )}${e.manual ? html`<span class="muted"> (${t("cc.log_manual")})</span>` : nothing}</td>
            <td>${t(`cc.why.${e.why}`)}</td>
            <td>${e.dev?.all !== undefined ? `${sign(e.dev.all)} K` : "–"}</td>
          </tr>`,
        )}
      </tbody>
    </table>`;
  }

  private _startDialog() {
    const items = ["valves", "setback", "room", "doors"];
    const entities = this.hass
      ? Object.keys(this.hass.states).filter((e) => /^(binary_sensor|input_boolean|switch|climate|fan)\./.test(e)).sort()
      : [];
    const all = items.every((i) => this._checks.has(i));
    const restart = !!this.state;
    return html`<div class="backdrop" @click=${() => (this._start = false)}></div>
      <div class="dialog card">
        <h3>${t(restart ? "cc.settings_t" : "cc.start_t")}</h3>
        ${!restart
          ? html`<p class="small">${t("cc.prep")}</p>
              ${items.map(
                (i) => html`<label class="chk small"><input type="checkbox" .checked=${this._checks.has(i)}
                  @change=${(e: Event) => {
                    const s = new Set(this._checks);
                    (e.target as HTMLInputElement).checked ? s.add(i) : s.delete(i);
                    this._checks = s;
                  }} /> ${t(`cc.chk.${i}`)}</label>`,
              )}`
          : nothing}
        <label class="small field">${t("cc.target")}
          <input type="number" step="0.5" min="16" max="26" .value=${String(this._target)}
            @input=${(e: Event) => (this._target = Number((e.target as HTMLInputElement).value))} /></label>
        <p class="muted small">${t("cc.target_hint")}</p>
        <label class="small field">${t("cc.disturb")}
          <input list="cc-ents" .value=${this._disturb} placeholder="binary_sensor.kaminofen"
            @input=${(e: Event) => (this._disturb = (e.target as HTMLInputElement).value.trim())} /></label>
        <datalist id="cc-ents">${entities.map((e) => html`<option value=${e}></option>`)}</datalist>
        <p class="muted small">${t("cc.disturb_hint")}</p>
        <div class="row"><span class="spacer"></span>
          <button @click=${() => (this._start = false)}>${t("cancel")}</button>
          <button class="primary" ?disabled=${(!restart && !all) || !(this._target >= 16 && this._target <= 26)}
            @click=${() => {
              this._start = false;
              this._emit(restart ? "coach-settings" : "coach-start", { target: this._target, disturb: this._disturb || undefined });
            }}>${restart ? t("apply") : html`${icon("play")} ${t("cc.start")}`}</button>
        </div>
      </div>`;
  }

  static styles = [
    ui,
    css`
      :host { display: block; }
      .coach { display: grid; gap: 10px; }
      .head { gap: 6px; flex-wrap: wrap; }
      .cap { display: inline-flex; gap: 6px; align-items: center; font-size: 11px; text-transform: uppercase; letter-spacing: 0.7px; color: var(--cp-muted); font-weight: 700; }
      .small { font-size: 13px; line-height: 1.45; margin: 4px 0; }
      .small-btn { padding: 4px 10px; font-size: 12px; }
      .how { padding-left: 20px; margin: 4px 0 10px; }
      .intro button.primary { justify-self: start; }
      .stepper { display: flex; list-style: none; padding: 0; margin: 0; gap: 4px; }
      .stepper li { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; position: relative; font-size: 12px; color: var(--cp-muted); text-align: center; }
      .stepper li::before { content: ""; position: absolute; top: 13px; left: -50%; right: 50%; height: 2px; background: var(--cp-border); z-index: 0; }
      .stepper li:first-child::before { display: none; }
      .stepper li.done::before, .stepper li.on::before { background: var(--cp-accent); }
      .dot { width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center; background: var(--cp-surface-2); border: 2px solid var(--cp-border); font-weight: 700; z-index: 1; }
      .dot .ico { width: 14px; height: 14px; }
      li.done .dot { background: var(--cp-accent); border-color: var(--cp-accent); color: var(--cp-bg); }
      li.on .dot { border-color: var(--cp-accent); color: var(--cp-text); box-shadow: 0 0 0 4px color-mix(in srgb, var(--cp-accent) 20%, transparent); }
      li.on { color: var(--cp-text); font-weight: 700; }
      .box { padding: 10px 12px; border-radius: 10px; background: var(--cp-surface-2); border-left: 3px solid var(--cp-info); }
      .box.ok { border-left-color: var(--cp-accent); }
      .box.warn { border-left-color: var(--cp-warn); background: color-mix(in srgb, var(--cp-warn) 10%, var(--cp-surface-2)); }
      .box ul { margin: 4px 0; padding-left: 18px; }
      .bar { height: 8px; border-radius: 4px; background: var(--cp-border); overflow: hidden; margin: 8px 0 4px; }
      .bar i { display: block; height: 100%; background: var(--cp-accent); border-radius: 4px; transition: width 0.4s; }
      .btns { gap: 6px; flex-wrap: wrap; margin-top: 6px; }
      .bands { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 6px; }
      .band { display: grid; gap: 2px; padding: 8px 10px; border-radius: 10px; background: var(--cp-surface-2); border-top: 3px solid var(--cp-border); }
      .band.good { border-top-color: var(--cp-accent); }
      .band.warm { border-top-color: #ff7a45; }
      .band.cold { border-top-color: var(--cp-info); }
      .band b { font-size: 18px; }
      .bl, .bh { font-size: 12px; color: var(--cp-muted); }
      .log { width: 100%; border-collapse: collapse; }
      .log th { text-align: left; color: var(--cp-muted); font-weight: 600; border-bottom: 1px solid var(--cp-border); padding: 4px 6px; }
      .log td { padding: 5px 6px; border-bottom: 1px solid var(--cp-border); vertical-align: top; }
      .chk { display: flex; gap: 8px; align-items: flex-start; }
      .chk input { margin-top: 3px; }
      .field { display: grid; gap: 4px; margin-top: 8px; }
      .backdrop { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.45); z-index: 40; }
      .dialog { position: fixed; z-index: 41; left: 50%; top: 50%; transform: translate(-50%, -50%); width: min(480px, 92vw); max-height: 90vh; overflow: auto; }
      .dialog h3 { margin-top: 0; color: var(--cp-text); font-size: 16px; text-transform: none; letter-spacing: 0; }
      @media (max-width: 600px) { .sl { display: none; } li.on .sl { display: block; } }
    `,
  ];
}

if (!customElements.get("cp-coach")) customElements.define("cp-coach", CpCoach);
