/**
 * Lovelace card: the COPilot overview for any dashboard, e.g. as a
 * full-screen tab on a wall display (view type "panel").
 *
 *   type: custom:copilot-card
 *   show_kpis: true          # KPI tiles above the schematic
 *   show_messages: false     # messages column
 *   show_demo_controls: false
 *   height: 600px            # optional; panel views fill the screen
 *   views: [overview, curve] # menu of the card (default: overview only)
 *   back_after: 120          # seconds without touch → back to the first view (0 = never)
 */

import { LitElement, css, html, nothing, type PropertyValues } from "lit";
import { PlantController } from "./controller";
import { t } from "./i18n";
import { icon, logo, tokens, ui } from "./styles";
import type { Hass, Plant } from "./types";
import { CARD_VIEWS, VIEW_ICON, renderView, type View } from "./views/router";

export interface CardConfig {
  type: string;
  show_kpis?: boolean;
  show_messages?: boolean;
  show_demo_controls?: boolean;
  height?: string;
  /** menu entries of the card; one entry = no menu */
  views?: View[];
  back_after?: number;
}

export class CopilotCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    isPanel: { type: Boolean },
    _config: { state: true },
    _narrow: { state: true },
    _view: { state: true },
    _err: { state: true },
  };

  hass?: Hass;
  /** set by Home Assistant when the card is the only card of a panel view */
  isPanel = false;
  private _config: CardConfig = { type: "custom:copilot-card" };
  private _ctl = new PlantController(this, false);
  /**
   * Narrow layout from the card's own width. Measured continuously and only while the card is
   * laid out: a render while the dashboard is hidden (screen off, other view) reports width 0 and
   * would otherwise stick in the narrow layout with a tiny schematic until the page is reloaded.
   */
  private _narrow = false;
  private _resizeObs?: ResizeObserver;
  private _view: View | null = null;
  private _err = "";
  private _backTimer?: number;

  connectedCallback(): void {
    super.connectedCallback();
    this._resizeObs = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      if (w > 0) this._narrow = w < 700;
    });
    this._resizeObs.observe(this);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._resizeObs?.disconnect();
    window.clearTimeout(this._backTimer);
  }

  private get _views(): View[] {
    const v = (this._config.views || []).filter((x) => CARD_VIEWS.includes(x));
    return v.length ? v : ["overview"];
  }

  private get _current(): View {
    const views = this._views;
    return this._view && views.includes(this._view) ? this._view : views[0];
  }

  /** after a while without interaction, go back to the first view (wall displays) */
  private _touch = () => {
    window.clearTimeout(this._backTimer);
    const s = Number(this._config.back_after) || 0;
    if (s > 0 && this._current !== this._views[0]) this._backTimer = window.setTimeout(() => (this._view = null), s * 1000);
  };

  private _go(v: View) {
    this._view = v;
    this._err = "";
    this.updateComplete.then(this._touch);
  }

  private async _save(plant: Plant) {
    try {
      await this._ctl.save(plant);
      this._err = "";
    } catch (err: any) {
      this._err = err?.message || String(err);
    }
  }

  setConfig(config: CardConfig): void {
    if (!config) throw new Error("Invalid configuration");
    this._config = { show_kpis: true, show_messages: false, show_demo_controls: false, ...config };
  }

  getCardSize(): number {
    return 10;
  }

  getGridOptions() {
    return { columns: 12, rows: 10, min_columns: 6, min_rows: 5 };
  }

  static getStubConfig(): Partial<CardConfig> {
    return { show_kpis: true, show_messages: false, show_demo_controls: false };
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("copilot-card-editor");
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("hass") && this.hass) this._ctl.setHass(this.hass);
    // also measured on every update (Home Assistant pushes state changes all the time)
    const w = this.clientWidth;
    if (w > 0) this._narrow = w < 700;
  }

  render() {
    const c = this._config;
    const plant = this._ctl.plant;
    const height = c.height || (this.isPanel ? "calc(100vh - var(--header-height, 56px) - 16px)" : "560px");
    const views = this._views;
    const view = this._current;
    return html`<ha-card style="height:${height}" @pointerdown=${this._touch} @keydown=${this._touch}>
      ${views.length > 1
        ? html`<nav>
            ${views.map(
              (v) => html`<button class="tab ${view === v ? "on" : ""}" title=${t(`nav.${v}`)} @click=${() => this._go(v)}>
                ${icon(VIEW_ICON[v])}<span class="tl">${t(`nav.${v}`)}</span>
              </button>`,
            )}
          </nav>`
        : nothing}
      ${this._ctl.error || this._err ? html`<div class="err">${this._ctl.error || this._err}</div>` : nothing}
      ${!plant
        ? html`<div class="loading">${logo}</div>`
        : html`<div class="body ${view === "overview" ? "fill" : ""}">
            ${renderView(view, plant, {
              ctl: this._ctl,
              hass: this.hass,
              narrow: this._narrow,
              save: (p: Plant) => this._save(p),
              overview: { showKpis: c.show_kpis !== false, showSide: !!c.show_messages, showDemo: !!c.show_demo_controls },
            })}
          </div>`}
    </ha-card>`;
  }

  static styles = [
    tokens,
    ui,
    css`
      :host { display: block; }
      ha-card {
        display: flex;
        flex-direction: column;
        padding: 12px;
        box-sizing: border-box;
        overflow: hidden;
        background: var(--cp-bg);
        color: var(--cp-text);
        font-family: var(--cp-font);
      }
      nav { display: flex; gap: 4px; margin-bottom: 8px; flex-wrap: wrap; }
      .tab { background: transparent; border-color: transparent; color: var(--cp-muted); }
      .tab.on { background: var(--cp-surface-2); color: var(--cp-text); border-color: var(--cp-border); }
      .body { flex: 1; min-height: 0; overflow: auto; display: flex; flex-direction: column; gap: 10px; }
      .body.fill { overflow: hidden; }
      .body > cp-overview { flex: 1; min-height: 0; }
      .pad { overflow: auto; }
      @media (max-width: 800px) { .tab:not(.on) .tl { display: none; } }
      .loading { flex: 1; display: grid; place-items: center; }
      .loading svg { width: 48px; height: 48px; opacity: 0.7; }
      .err { color: var(--cp-error); font-size: 13px; }
    `,
  ];
}

// ------------------------------------------------------------------ editor

export class CopilotCardEditor extends LitElement {
  static properties = { hass: { attribute: false }, _config: { state: true } };
  hass?: Hass;
  private _config: CardConfig = { type: "custom:copilot-card" };

  setConfig(config: CardConfig): void {
    this._config = config;
  }

  private _set(key: keyof CardConfig, value: unknown): void {
    const config = { ...this._config, [key]: value };
    if (value === "" || value === undefined) delete (config as any)[key];
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }));
  }

  render() {
    const c = this._config;
    const box = (key: keyof CardConfig, label: string, def: boolean) => html`<label class="row">
      <input type="checkbox" .checked=${(c[key] as boolean | undefined) ?? def} @change=${(e: Event) => this._set(key, (e.target as HTMLInputElement).checked)} />
      ${label}</label>`;
    const views = c.views?.length ? c.views : (["overview"] as View[]);
    const toggle = (v: View, on: boolean) => {
      const next = CARD_VIEWS.filter((x) => (x === v ? on : views.includes(x)));
      this._set("views", next.length > 1 || next[0] !== "overview" ? (next.length ? next : undefined) : undefined);
    };
    return html`<div class="ed">
      <div class="field">${t("card.views")}</div>
      <div class="views">
        ${CARD_VIEWS.map(
          (v) => html`<label class="row"><input type="checkbox" .checked=${views.includes(v)} ?disabled=${views.length === 1 && views[0] === v}
            @change=${(e: Event) => toggle(v, (e.target as HTMLInputElement).checked)} /> ${t(`nav.${v}`)}</label>`,
        )}
      </div>
      <p class="hint">${t("card.views_hint")}</p>
      <label class="field">${t("card.back_after")}
        <input type="number" min="0" step="10" .value=${String(c.back_after ?? "")} placeholder="0"
          @change=${(e: Event) => {
            const v = Number((e.target as HTMLInputElement).value);
            this._set("back_after", v > 0 ? v : undefined);
          }} /></label>
      ${box("show_kpis", t("card.show_kpis"), true)}
      ${box("show_messages", t("card.show_messages"), false)}
      ${box("show_demo_controls", t("card.show_demo"), false)}
      <label class="field">${t("card.height")}
        <input .value=${c.height || ""} placeholder="560px" @change=${(e: Event) => this._set("height", (e.target as HTMLInputElement).value.trim())} /></label>
      <p class="hint">${t("card.hint")}</p>
    </div>`;
  }

  static styles = [
    ui,
    css`
      .ed { display: grid; gap: 10px; color: var(--primary-text-color); }
      .row { display: flex; gap: 8px; align-items: center; font-size: 14px; }
      .field { color: var(--secondary-text-color); }
      .views { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 6px; }
      input:not([type]), input[type="number"] { background: transparent; color: var(--primary-text-color); border-color: var(--divider-color); }
      .hint { font-size: 12px; color: var(--secondary-text-color); margin: 0; }
    `,
  ];
}

if (!customElements.get("copilot-card")) customElements.define("copilot-card", CopilotCard);
if (!customElements.get("copilot-card-editor")) customElements.define("copilot-card-editor", CopilotCardEditor);

const w = window as any;
w.customCards = w.customCards || [];
if (!w.customCards.some((c: { type: string }) => c.type === "copilot-card")) {
  w.customCards.push({
    type: "copilot-card",
    name: "COPilot",
    description: "Animated heat pump schematic with live values",
    preview: false,
    documentationURL: "https://github.com/junky84/copilot",
  });
}
