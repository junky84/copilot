/**
 * Before / after: the old boiler's consumption per outdoor temperature next to
 * the heat pump's electricity on the same kind of days.
 */

import { LitElement, css, html, nothing } from "lit";
import type { ChartOption, ChartTheme } from "./echart";
import {
  baselineOf,
  breakEvenFactor,
  expectedFuel,
  loadBaseline,
  simBaseline,
  sumCompare,
  type BaselineData,
  type CompareDay,
  type CompareTotals,
} from "../data/baseline";
import { AMPEL_COLOR } from "../data/efficiency";
import { fmtNum, getLang, t } from "../i18n";
import { ui } from "../styles";
import type { Hass, Plant } from "../types";
import type { Simulator } from "../sim/simulator";

const REFRESH_LIVE_MS = 30 * 60_000;
const REFRESH_DEMO_MS = 15_000;

const C_OLD = "#ff8a3d";
const C_EL = "#4d9fff";
const C_HEAT = "#9b8cff";

let echartLoad: Promise<unknown> | null = null;

/** One tooltip row: series marker, name, value, explanation. */
type TipRow = [string, string, string, string];

/** Tooltip frame shared by both charts (as in the efficiency view, plus a short explanation per row). */
function tipBase(th: ChartTheme) {
  return {
    trigger: "axis",
    confine: true,
    axisPointer: { type: "shadow", shadowStyle: { color: "rgba(127,127,127,0.12)" } },
    backgroundColor: th.surface,
    borderColor: th.border,
    textStyle: { color: th.text, fontSize: 12 },
    extraCssText: "max-width:340px;white-space:normal;",
  };
}

function tipHtml(title: string, rows: TipRow[]): string {
  const body = rows
    .map(
      ([marker, name, value, note]) =>
        `<div style="margin-top:5px"><div style="display:flex;gap:10px;justify-content:space-between"><span>${marker}${name}</span><b>${value}</b></div>` +
        (note ? `<div style="opacity:0.7;font-size:11px;line-height:1.35;margin-left:${marker ? 14 : 0}px">${note}</div>` : "") +
        `</div>`,
    )
    .join("");
  return `<div style="font-weight:700">${title}</div>${body}`;
}

function factorColor(f: number, breakEven: number): string {
  if (!Number.isFinite(f)) return "var(--cp-muted)";
  return f >= breakEven * 1.4 ? AMPEL_COLOR.green : f >= breakEven ? AMPEL_COLOR.yellow : AMPEL_COLOR.red;
}

export class CpCompare extends LitElement {
  static properties = {
    plant: { attribute: false },
    hass: { attribute: false },
    sim: { attribute: false },
    version: { type: Number },
    _data: { state: true },
    _error: { state: true },
    _showBins: { state: true },
  };
  plant!: Plant;
  hass?: Hass;
  sim: Simulator | null = null;
  version = 0;
  private _data: BaselineData | null = null;
  private _error = "";
  private _showBins = false;
  private _loadedAt = 0;
  private _loadedFor: unknown = null;
  private _keyT = "";
  private _keyD = "";
  private _optT?: (th: ChartTheme) => ChartOption;
  private _optD?: (th: ChartTheme) => ChartOption;

  connectedCallback(): void {
    super.connectedCallback();
    echartLoad ??= import("./echart").catch((e) => {
      echartLoad = null;
      console.error("COPilot: chart module failed to load", e);
    });
  }

  protected willUpdate(): void {
    const key = this.sim || this.plant;
    const age = Date.now() - this._loadedAt;
    if (key !== this._loadedFor || age > (this.sim ? REFRESH_DEMO_MS : REFRESH_LIVE_MS)) {
      this._loadedFor = key;
      this._loadedAt = Date.now();
      this._load();
    }
  }

  private async _load(): Promise<void> {
    try {
      this._error = "";
      if (this.sim) this._data = simBaseline(this.sim, this.plant);
      else if (this.hass && !this.hass.__standalone) this._data = await loadBaseline(this.hass, this.plant);
    } catch (err: any) {
      this._error = err?.message || String(err);
    }
  }

  private _unit(): string {
    return t(`cmp.unit.${baselineOf(this.plant).unit}`);
  }

  // ------------------------------------------------------------ tiles

  private _tiles(z: CompareTotals, d: BaselineData) {
    const cfg = baselineOf(this.plant);
    const be = breakEvenFactor(cfg, d.price);
    const eur = (v: number) => `${fmtNum(v, v >= 100 ? 0 : 2)} €`;
    const saving = z.costOld - z.costHp;
    const heatSum = d.compare.reduce((s, x) => s + (x.heat ?? 0), 0);
    const heatRatio = d.compare.every((x) => x.heat !== undefined) && z.useful > 0 ? heatSum / z.useful : undefined;
    const fc = factorColor(z.factor, be);
    return html`<div class="tiles">
      <div class="card tile main">
        <div class="cap">${t("cmp.factor")} ${d.demo ? html`<span class="est">${t("cmp.demo")}</span>` : nothing}</div>
        <div class="big" style="color:${fc}">${Number.isFinite(z.factor) ? fmtNum(z.factor, 2) : "–"}</div>
        <div class="kv"><span>${t("cmp.break_even")}</span><b>${fmtNum(be, 2)}</b></div>
        <p class="muted small">${t("cmp.factor_hint")}</p>
      </div>
      <div class="card tile">
        <div class="cap">${t("cmp.since", { n: z.days })}</div>
        <div class="kv"><span>${t("cmp.hp_el")}</span><b>${fmtNum(z.el, 0)} kWh</b></div>
        <div class="kv"><span>${t("cmp.old_fuel")}</span><b>${fmtNum(z.fuel, z.fuel >= 100 ? 0 : 1)} ${this._unit()}</b></div>
        <div class="kv"><span>${t("cmp.old_kwh")}</span><b>${fmtNum(z.fuelKwh, 0)} kWh</b></div>
        <div class="kv"><span>${t("cmp.old_useful")}</span><b>${fmtNum(z.useful, 0)} kWh</b></div>
        ${heatRatio !== undefined
          ? html`<div class="kv"><span>${t("cmp.heat_ratio")}</span><b class=${heatRatio > 1.2 ? "warn" : ""}>${fmtNum(heatRatio, 2)}</b></div>
              ${heatRatio > 1.2 ? html`<p class="muted small">${t("cmp.heat_ratio_hint")}</p>` : nothing}`
          : nothing}
      </div>
      <div class="card tile">
        <div class="cap">${t("cmp.costs")}</div>
        <div class="kv"><span>${t("cmp.cost_hp")}</span><b>${eur(z.costHp)}</b></div>
        <div class="kv"><span>${t("cmp.cost_old")}</span><b>${eur(z.costOld)}</b></div>
        <div class="kv"><span>${t(saving >= 0 ? "cmp.saving" : "cmp.extra")}</span><b class=${saving >= 0 ? "good" : "bad"}>${eur(Math.abs(saving))}</b></div>
        <div class="kv"><span>${t("cmp.co2_old")}</span><b>${fmtNum(z.co2Old, 0)} kg</b></div>
        <p class="muted small">${t("cmp.cost_hint", { price: fmtNum(d.price * 100, 1), old: fmtNum(cfg.price, 3), unit: this._unit() })}</p>
      </div>
    </div>`;
  }

  // ------------------------------------------------------------ charts

  /** Energy per day over the outdoor temperature, in 1 K classes. */
  private _tempChart(d: BaselineData) {
    const fit = d.fit!;
    const cfg = baselineOf(this.plant);
    const k = cfg.kwh_per_unit;
    const eff = cfg.eff / 100;
    const key = JSON.stringify([fit.a, fit.b, fit.base, d.compare.map((x) => [x.t, x.el, x.heat]), k, eff, getLang()]);
    if (key !== this._keyT) {
      this._keyT = key;
      const unit = this._unit();
      const locale = getLang() === "de" ? "de-DE" : "en-GB";
      const dm = (ms: number) => new Date(ms).toLocaleDateString(locale, { day: "2-digit", month: "2-digit" });
      const bins = new Map(fit.bins.filter((b) => b.n >= 3).map((b) => [b.t, b]));
      const hp = new Map<number, CompareDay[]>();
      for (const x of d.compare) {
        const c = Math.floor(x.t);
        hp.set(c, [...(hp.get(c) || []), x]);
      }
      const keys = [...bins.keys(), ...hp.keys()];
      const lo = Math.min(...keys);
      const hi = Math.max(...keys);
      const classes: number[] = [];
      for (let c = lo; c <= hi; c++) classes.push(c);
      const avg = (list: CompareDay[] | undefined, f: (x: CompareDay) => number | undefined) => {
        const v = (list || []).map(f).filter((x): x is number => x !== undefined);
        return v.length ? v.reduce((s, x) => s + x, 0) / v.length : undefined;
      };
      const rows = classes.map((c) => {
        const b = bins.get(c);
        const days = hp.get(c);
        const el = avg(days, (x) => x.el);
        return {
          c,
          bin: b,
          fuelKwh: b ? b.mean * k : undefined,
          useful: expectedFuel(fit, c + 0.5) * k * eff,
          days: days || [],
          el,
          heat: avg(days, (x) => x.heat),
          factor: el ? (expectedFuel(fit, c + 0.5) * k * eff) / el : undefined,
        };
      });
      const r1 = (v: number | undefined) => (v === undefined ? null : Math.round(v * 10) / 10);
      const hasHeat = rows.some((r) => r.heat !== undefined);
      this._optT = (th: ChartTheme): ChartOption => ({
        animationDuration: 400,
        textStyle: { fontFamily: "inherit" },
        grid: { left: 8, right: 8, top: 50, bottom: 8, containLabel: true },
        legend: { top: 0, right: 0, itemWidth: 12, itemHeight: 12, textStyle: { color: th.muted }, inactiveColor: th.border },
        tooltip: {
          ...tipBase(th),
          formatter: (items: any) => {
            const list = Array.isArray(items) ? items : [items];
            const r = rows[list[0]?.dataIndex ?? 0];
            const mk = (i: number) => list.find((it: any) => it.seriesIndex === i)?.marker ?? "";
            const out: TipRow[] = [];
            if (r.bin) out.push([mk(0), t("cmp.s_bins"), `${fmtNum(r.fuelKwh!, 0)} kWh`, t("cmp.tt_bin", { n: r.bin.n, v: fmtNum(r.bin.mean, 2), sd: fmtNum(r.bin.sd, 2), unit })]);
            out.push([mk(1), t("cmp.s_line"), `${fmtNum(r.useful, 0)} kWh`, t("cmp.tt_useful", { eff: fmtNum(cfg.eff, 0) })]);
            if (r.el !== undefined) {
              out.push([mk(hasHeat ? 3 : 2), t("cmp.s_el"), `${fmtNum(r.el, 1)} kWh`, t("cmp.tt_hp_days", { n: r.days.length, days: r.days.map((x) => dm(x.day)).join(", ") })]);
              // the series marker of a hollow dot is invisible (transparent fill): draw the ring
              const ring = `<span style="display:inline-block;margin-right:4px;border-radius:50%;width:7px;height:7px;border:1.5px solid ${C_HEAT}"></span>`;
              if (r.heat !== undefined) out.push([ring, t("cmp.s_heat"), `${fmtNum(r.heat, 0)} kWh`, t("cmp.tt_heat")]);
              if (r.factor !== undefined) out.push(["", t("cmp.factor_short"), fmtNum(r.factor, 2), t("cmp.tt_factor")]);
            } else out.push(["", t("cmp.s_el"), "–", t("cmp.tt_no_hp")]);
            return tipHtml(t("cmp.tt_class", { a: r.c, b: r.c + 1 }), out);
          },
        },
        xAxis: {
          type: "category",
          data: classes.map(String),
          name: "°C",
          nameTextStyle: { color: th.muted },
          axisLine: { lineStyle: { color: th.border } },
          axisTick: { show: false },
          axisLabel: { color: th.muted, interval: (_i: number, v: string) => Number(v) % 5 === 0 },
        },
        yAxis: { type: "value", name: t("cmp.kwh_day"), min: 0, nameTextStyle: { color: th.muted, align: "left" }, axisLabel: { color: th.muted }, splitLine: { lineStyle: { color: th.border, type: "dashed" } } },
        series: [
          { name: t("cmp.s_bins"), type: "bar", barCategoryGap: "25%", data: rows.map((r) => r1(r.fuelKwh)), itemStyle: { color: C_OLD, opacity: 0.32, borderRadius: [3, 3, 0, 0] } },
          { name: t("cmp.s_line"), type: "line", showSymbol: false, data: rows.map((r) => r1(r.useful)), lineStyle: { color: C_OLD, width: 2.5 }, itemStyle: { color: C_OLD } },
          ...(hasHeat
            ? [{ name: t("cmp.s_heat"), type: "scatter", symbolSize: 9, data: rows.map((r) => r1(r.heat)), itemStyle: { color: "transparent", borderColor: C_HEAT, borderWidth: 1.5 } }]
            : []),
          { name: t("cmp.s_el"), type: "scatter", symbolSize: 10, data: rows.map((r) => r1(r.el)), itemStyle: { color: C_EL } },
        ],
      });
    }
    return html`<div class="card chart">
      <div class="cap">${t("cmp.chart_t")}</div>
      <cp-echart .option=${this._optT}></cp-echart>
      <p class="muted small">${t("cmp.chart_t_hint", { k: fmtNum(k, 2), unit: this._unit(), eff: fmtNum(cfg.eff, 0) })}</p>
    </div>`;
  }

  /** Day by day: heat pump electricity vs. the old boiler's useful heat, and the factor. */
  private _dayChart(days: CompareDay[], be: number) {
    const key = JSON.stringify([days.map((x) => [x.day, x.el, x.useful]), be, getLang()]);
    if (key !== this._keyD) {
      this._keyD = key;
      const locale = getLang() === "de" ? "de-DE" : "en-GB";
      const label = (ms: number) => new Date(ms).toLocaleDateString(locale, { day: "2-digit", month: "2-digit" });
      const unit = this._unit();
      this._optD = (th: ChartTheme): ChartOption => ({
        animationDuration: 400,
        textStyle: { fontFamily: "inherit" },
        grid: { left: 8, right: 8, top: 50, bottom: 8, containLabel: true },
        legend: { top: 0, right: 0, itemWidth: 12, itemHeight: 12, textStyle: { color: th.muted }, inactiveColor: th.border },
        tooltip: {
          ...tipBase(th),
          formatter: (items: any) => {
            const list = Array.isArray(items) ? items : [items];
            const x = days[list[0]?.dataIndex ?? 0];
            const mk = (i: number) => list.find((it: any) => it.seriesIndex === i)?.marker ?? "";
            const verdict = !Number.isFinite(x.factor) ? "" : x.factor >= be ? t("cmp.tt_cheaper", { v: fmtNum(x.costOld - x.costHp, 2) }) : t("cmp.tt_dearer", { v: fmtNum(x.costHp - x.costOld, 2) });
            const title = `${new Date(x.day).toLocaleDateString(locale, { weekday: "short", day: "2-digit", month: "2-digit" })} · ${fmtNum(x.t, 1)} °C`;
            return tipHtml(title, [
              [mk(0), t("cmp.old_useful"), `${fmtNum(x.useful, 0)} kWh`, t("cmp.tt_day_useful", { fuel: fmtNum(x.fuel, 1), unit })],
              [mk(1), t("cmp.s_el"), `${fmtNum(x.el, 1)} kWh`, t("cmp.tt_day_el")],
              [mk(2), t("cmp.factor_short"), fmtNum(x.factor, 2), t("cmp.tt_factor")],
              [mk(3), t("cmp.break_even_line"), fmtNum(be, 2), t("cmp.tt_break_even")],
              ["", t("cmp.cost_hp"), `${fmtNum(x.costHp, 2)} €`, t("cmp.tt_cost_hp", { p: fmtNum(x.price * 100, 1) })],
              ["", t("cmp.cost_old"), `${fmtNum(x.costOld, 2)} €`, verdict],
            ]);
          },
        },
        dataZoom: [{ type: "inside", minValueSpan: 5 }],
        xAxis: { type: "category", data: days.map((x) => label(x.day)), axisLine: { lineStyle: { color: th.border } }, axisTick: { show: false }, axisLabel: { color: th.muted, hideOverlap: true } },
        yAxis: [
          { type: "value", name: "kWh", nameTextStyle: { color: th.muted, align: "left" }, axisLabel: { color: th.muted }, splitLine: { lineStyle: { color: th.border, type: "dashed" } } },
          { type: "value", name: t("cmp.factor_short"), min: 0, max: 5, interval: 1, nameTextStyle: { color: th.muted, align: "right" }, axisLabel: { color: th.muted }, splitLine: { show: false } },
        ],
        series: [
          { name: t("cmp.old_useful"), type: "bar", data: days.map((x) => Math.round(x.useful * 10) / 10), itemStyle: { color: C_OLD, opacity: 0.45, borderRadius: [3, 3, 0, 0] }, barGap: "10%", barCategoryGap: "35%" },
          { name: t("cmp.s_el"), type: "bar", data: days.map((x) => Math.round(x.el * 10) / 10), itemStyle: { color: C_EL, borderRadius: [3, 3, 0, 0] } },
          {
            name: t("cmp.factor_short"),
            type: "line",
            yAxisIndex: 1,
            smooth: 0.3,
            symbol: "circle",
            symbolSize: 7,
            lineStyle: { color: th.text, width: 1.5, type: "dashed", opacity: 0.7 },
            itemStyle: { color: th.text },
            data: days.map((x) => (Number.isFinite(x.factor) ? { value: Math.round(x.factor * 100) / 100, itemStyle: { color: factorColor(x.factor, be) } } : null)),
          },
          // a flat line on the factor axis; own series so it has a legend entry and a row in the tooltip
          {
            name: t("cmp.break_even_line"),
            type: "line",
            yAxisIndex: 1,
            data: days.map(() => Math.round(be * 100) / 100),
            symbol: "none",
            lineStyle: { color: AMPEL_COLOR.yellow, type: "dashed", width: 1.5, opacity: 0.85 },
            itemStyle: { color: AMPEL_COLOR.yellow },
          },
        ],
      });
    }
    return html`<div class="card chart">
      <div class="cap">${t("cmp.chart_d")}</div>
      <cp-echart .option=${this._optD}></cp-echart>
      <p class="muted small">${t("cmp.chart_d_hint", { be: fmtNum(be, 2) })}</p>
    </div>`;
  }

  // ------------------------------------------------------------ baseline info

  private _fitInfo(d: BaselineData) {
    const fit = d.fit!;
    const unit = this._unit();
    const locale = getLang() === "de" ? "de-DE" : "en-GB";
    const date = (ms: number) => new Date(ms).toLocaleDateString(locale, { month: "2-digit", year: "numeric" });
    const dr = d.clean?.dropped;
    const k = baselineOf(this.plant).kwh_per_unit;
    return html`<div class="card info">
      <div class="cap">${t("cmp.fit")}</div>
      <div class="formula">${t("cmp.formula", { a: fmtNum(fit.a, 2), b: fmtNum(-fit.b, 3), unit })}</div>
      <div class="facts">
        <div class="kv"><span>${t("cmp.limit")}</span><b>${fmtNum(fit.limit, 1)} °C</b></div>
        <div class="kv"><span>${t("cmp.base")}</span><b>${fmtNum(fit.base, 2)} ${unit}</b></div>
        ${fit.fromAnnual
          ? html`<div class="kv"><span>${t("cmp.source")}</span><b>${t("cmp.from_annual")}</b></div>`
          : html`<div class="kv"><span>${t("cmp.days")}</span><b>${fit.n} (${date(fit.from)} – ${date(fit.to)})</b></div>
              <div class="kv"><span>R²</span><b class=${fit.r2 < 0.5 ? "warn" : ""}>${fmtNum(fit.r2, 2)}</b></div>`}
      </div>
      ${dr && (dr.temp_frozen || dr.zero_run || dr.outlier || dr.no_temp)
        ? html`<p class="muted small">${t("cmp.dropped", { frozen: dr.temp_frozen, zero: dr.zero_run, out: dr.outlier, none: dr.no_temp })}</p>`
        : nothing}
      ${fit.fromAnnual ? html`<p class="muted small">${t("cmp.annual_hint")}</p>` : nothing}
      ${fit.bins.length
        ? html`<button class="ghost" @click=${() => (this._showBins = !this._showBins)}>${t(this._showBins ? "cmp.bins_hide" : "cmp.bins_show")}</button>
            ${this._showBins
              ? html`<div class="scroll"><table>
                  <thead><tr><th>°C</th><th>${t("cmp.days")}</th><th>${unit}/${t("cmp.per_day")}</th><th>±</th><th>kWh</th></tr></thead>
                  <tbody>${fit.bins.map((b) => html`<tr class=${b.n < 5 ? "thin" : ""}><td>${b.t} … ${b.t + 1}</td><td>${b.n}</td><td>${fmtNum(b.mean, 2)}</td><td>${fmtNum(b.sd, 2)}</td><td>${fmtNum(b.mean * k, 0)}</td></tr>`)}</tbody>
                </table></div>`
              : nothing}`
        : nothing}
    </div>`;
  }

  render() {
    const d = this._data;
    if (this._error) return html`<div class="card err">${this._error}</div>`;
    if (!d) return html`<div class="card muted">${t("cmp.loading")}</div>`;
    if (d.missing || !d.fit) {
      return html`<div class="card intro">
        <h3>${t("cmp.title")}</h3>
        <p>${t("cmp.intro")}</p>
        <p class="hint">${t(`cmp.missing.${d.missing || "no_meter"}`)}</p>
        <p class="muted small">${t("cmp.setup")}</p>
      </div>`;
    }
    const cfg = baselineOf(this.plant);
    const be = breakEvenFactor(cfg, d.price);
    const z = sumCompare(d.compare);
    return html`
      ${z ? this._tiles(z, d) : html`<div class="card hint">${t("cmp.no_days")}</div>`}
      ${this._tempChart(d)}
      ${d.compare.length ? this._dayChart(d.compare, be) : nothing}
      ${this._fitInfo(d)}
      <div class="card notes">
        <div class="cap">${t("cmp.notes")}</div>
        <ul>
          <li>${t("cmp.note_model")}</li>
          <li>${t("cmp.note_dhw")}</li>
          <li>${t("cmp.note_behaviour")}</li>
        </ul>
      </div>
    `;
  }

  static styles = [
    ui,
    css`
      :host { display: grid; gap: 12px; align-content: start; }
      .tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; }
      .cap { font-size: 11px; text-transform: uppercase; letter-spacing: 0.7px; color: var(--cp-muted); font-weight: 700; }
      .tile { display: grid; gap: 6px; align-content: start; }
      .big { font-size: 44px; font-weight: 800; font-variant-numeric: tabular-nums; line-height: 1.1; }
      .kv { display: flex; justify-content: space-between; gap: 10px; font-size: 13px; color: var(--cp-muted); }
      .kv b { color: var(--cp-text); font-variant-numeric: tabular-nums; text-align: right; }
      b.good { color: #3ddc97; }
      b.bad, b.warn { color: var(--cp-warn); }
      .est { font-size: 10px; color: var(--cp-notice); border: 1px solid currentColor; border-radius: 6px; padding: 0 5px; margin-left: 4px; text-transform: none; letter-spacing: 0; }
      .small { font-size: 12px; margin: 4px 0 0; }
      .chart .cap { margin-bottom: 4px; }
      .info { display: grid; gap: 8px; }
      .formula { font-size: 18px; font-weight: 700; font-variant-numeric: tabular-nums; }
      .facts { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 4px 24px; }
      .facts b { white-space: nowrap; }
      .info button { justify-self: start; }
      .scroll { overflow-x: auto; }
      table { border-collapse: collapse; font-size: 12px; font-variant-numeric: tabular-nums; min-width: 320px; }
      th, td { padding: 4px 10px; border-bottom: 1px solid var(--cp-border); text-align: right; white-space: nowrap; }
      th { color: var(--cp-muted); font-weight: 600; }
      td:first-child, th:first-child { text-align: left; }
      tr.thin td { color: var(--cp-muted); }
      .notes ul { margin: 6px 0 0; padding-left: 1.2em; display: grid; gap: 4px; font-size: 13px; color: var(--cp-muted); }
      .intro { display: grid; gap: 6px; max-width: 70ch; }
      .intro h3 { margin: 0; }
      .intro p { margin: 0; }
      .hint { color: var(--cp-warn); font-size: 13px; }
      .err { color: var(--cp-error); }
    `,
  ];
}

if (!customElements.get("cp-compare")) customElements.define("cp-compare", CpCompare);
