/** Views shared by the panel and the Lovelace card. */

import { html, nothing, type TemplateResult } from "lit";
import type { PlantController } from "../controller";
import type { Hass, Plant } from "../types";
import "./overview";
import "./efficiency";
import "./compare";
import "./check";
import "./curve";
import "./maintenance";
import "./widgets";

export type View = "overview" | "efficiency" | "compare" | "check" | "curve" | "maintenance" | "messages" | "config";
/** views the Lovelace card can show (configuration stays in the panel) */
export const CARD_VIEWS: View[] = ["overview", "efficiency", "compare", "check", "curve", "maintenance", "messages"];
export const ALL_VIEWS: View[] = [...CARD_VIEWS, "config"];

export const VIEW_ICON: Record<View, string> = {
  overview: "grid",
  efficiency: "chart",
  compare: "scale",
  check: "check",
  curve: "curve",
  maintenance: "wrench",
  messages: "bell",
  config: "gear",
};

export interface ViewContext {
  ctl: PlantController;
  hass?: Hass;
  narrow: boolean;
  save: (plant: Plant) => unknown;
  /** overview options of the card */
  overview?: { showKpis?: boolean; showSide?: boolean; showDemo?: boolean };
}

/** Content of every view except the configuration. */
export function renderView(view: View, plant: Plant, c: ViewContext): TemplateResult | typeof nothing {
  const ctl = c.ctl;
  const src = ctl.src;
  const onSave = (e: CustomEvent) => c.save(e.detail);
  switch (view) {
    case "overview": {
      const o = c.overview;
      return html`<cp-overview
        .plant=${plant}
        .src=${src}
        .icons=${ctl.icons}
        .messages=${ctl.messages}
        .sim=${ctl.sim}
        .hass=${c.hass}
        .api=${ctl.api}
        ?admin=${ctl.admin}
        .version=${ctl.version}
        .showKpis=${o ? o.showKpis !== false : true}
        .showSide=${o ? !!o.showSide : true}
        .showDemo=${o ? !!o.showDemo : true}
        ?narrow=${c.narrow}
        @scenario=${(e: CustomEvent) => ctl.scenario(e.detail)}
      ></cp-overview>`;
    }
    case "efficiency":
      return html`<cp-efficiency .plant=${plant} .src=${src} .hass=${c.hass} .sim=${ctl.sim} .version=${ctl.version}></cp-efficiency>`;
    case "compare":
      return html`<cp-compare .plant=${plant} .hass=${c.hass} .sim=${ctl.sim} .version=${ctl.version}></cp-compare>`;
    case "check":
      return html`<cp-check .plant=${plant} .src=${src} .sim=${ctl.sim} .version=${ctl.version}></cp-check>`;
    case "curve":
      return html`<cp-curve .plant=${plant} .src=${src} .hass=${c.hass} .sim=${ctl.sim} .version=${ctl.version} ?admin=${ctl.admin} @save=${onSave}></cp-curve>`;
    case "maintenance":
      return html`<cp-maintenance .plant=${plant} ?admin=${ctl.admin} @save=${onSave}></cp-maintenance>`;
    case "messages":
      return html`<div class="card pad"><cp-messages
        .messages=${ctl.messages}
        ?canClear=${ctl.admin && !ctl.sim}
        @clear=${() => ctl.clearMessages()}
      ></cp-messages></div>`;
    default:
      return nothing;
  }
}
