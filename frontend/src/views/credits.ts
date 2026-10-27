import { LitElement, css, html, svg } from "lit";
import vt323 from "../assets/VT323-latin.woff2?inline";
import { outdoorModel } from "../catalog";
import type { ValueSource } from "../data/values";
import type { Plant, PlantComponent } from "../types";

/*
 * "About COPilot": credits in the style of a 1990s BIOS power-on self-test.
 * The plant's own components show up as detected drives. Only links to GitHub.
 * Opened from Configuration → Settings or with a triple click on the logo.
 * ESC closes, DEL/Backspace opens GitHub, click or Enter skips the animation.
 */

const GH = "github.com/junky84";
const GHURL = "https://github.com/junky84";
const FONT = "CP-VT323";

// junky84 logo as pixel art (24 × 26)
const PIX = [
  "................##......",
  "................##......",
  "................##......",
  "................##......",
  "................##......",
  "................##......",
  ".................#......",
  ".................#......",
  ".................#......",
  ".................#......",
  "............#....#......",
  "............#...........",
  "...........##...........",
  "...........#............",
  "..........##............",
  ".........###............",
  "........###.............",
  ".......###..........#...",
  "......####..........#...",
  ".....####............#..",
  "....####.............#..",
  "...####...............#.",
  "..####................#.",
  ".###...................#",
  "##......................",
  ".......................#",
];
const RECTS = PIX.flatMap((row, y) => {
  const out = [];
  let x = 0;
  while (x < row.length) {
    if (row[x] !== "#") {
      x++;
      continue;
    }
    const s = x;
    while (row[x] === "#") x++;
    out.push(svg`<rect x=${s} y=${y} width=${x - s} height="1" />`);
  }
  return out;
});
const pixLogo = (cls: string) =>
  html`<svg class=${cls} viewBox="0 0 24 26" shape-rendering="crispEdges" aria-hidden="true"><g fill="currentColor">${RECTS}</g></svg>`;

// @font-face does not work inside a shadow root, so the font is registered on the document
let fontReady: Promise<unknown> | null = null;
function loadFont(): Promise<unknown> {
  if (!fontReady) {
    try {
      const face = new FontFace(FONT, `url(${vt323}) format("woff2")`);
      fontReady = face.load().then((f) => document.fonts.add(f)).catch(() => undefined);
    } catch {
      fontReady = Promise.resolve();
    }
  }
  return fontReady;
}

type Line = [cls: string, text: string];

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

function num(src: ValueSource, c: PlantComponent | undefined, slot: string): number | undefined {
  if (!c) return undefined;
  const v = src.get(c, slot);
  return v?.available && v.num !== null && v.num !== undefined ? v.num : undefined;
}

/** "online" when any bound value of the heat pump arrives, "offline" when none does. */
function gateway(plant: Plant, src: ValueSource): [cls: string, text: string] {
  if (plant.settings.demo) return ["y", "simulated"];
  let bound = 0;
  let ok = 0;
  for (const c of plant.components) {
    if (c.type !== "outdoor_unit" && c.type !== "indoor_unit") continue;
    for (const [slot, entity] of Object.entries(c.bindings || {})) {
      if (!entity) continue;
      bound++;
      if (src.get(c, slot)?.available) ok++;
    }
  }
  if (!bound) return ["y", "not configured"];
  return ok ? ["g", "online"] : ["r", "offline"];
}

/** Text of the self-test, built from the plant. */
export function biosText(plant: Plant, src: ValueSource, version: string, now = new Date()) {
  const comps = plant.components;
  const of = (type: string) => comps.filter((c) => c.type === type);
  const ou = of("outdoor_unit")[0];
  const iu = of("indoor_unit")[0];
  const ref = ou ? outdoorModel(ou.model).refrigerant : undefined;
  const vol = (c: PlantComponent) => (Number(c.props?.volume) > 0 ? ` (${Math.round(Number(c.props.volume))} l)` : "");
  const short = (s: string) => (s.length > 42 ? s.slice(0, 41) + "…" : s);

  const drives: [string, string][] = [];
  if (ou) drives.push(["Outdoor Unit", ou.label + (ref ? ` (${ref})` : "")]);
  if (iu) drives.push(["Indoor Unit", iu.label]);
  of("buffer").forEach((c) => drives.push(["Buffer", c.label + vol(c)]));
  of("dhw_tank").forEach((c) => drives.push(["DHW Cylinder", c.label + vol(c)]));
  comps
    .filter((c) => c.type === "radiators" || c.type === "floor_heating")
    .slice(0, 4)
    .forEach((c) => drives.push(["Heating Circuit", c.label]));
  drives.push(["Source Code", GH]);
  const w = Math.max(...drives.map(([k]) => k.length));

  const ver = version ? (/^\d/.test(version) ? ` v${version}` : ` ${version}`) : "";
  const [gwCls, gwText] = gateway(plant, src);
  const lines: (Line | ["mem", ""] | ["gw", string])[] = [
    ["w", "junky84 Modular BIOS v4.51PG, A Heat Pump Ally"],
    ["", `Copyright (C) 1984-${now.getFullYear()}, junky84`],
    ["", ""],
    ["y", `COPILOT${ver.toUpperCase().replace(" V", " v")} OPEN-SOURCE RELEASE`],
    ["", ""],
    ["", "Main Processor : COP-Core 1984 @ 84MHz"],
    ["mem", ""],
    ["", ""],
    ["gw", `<span class="${gwCls}">${gwText}</span>`],
    ["", "Initialize Plant Components..."],
    ["", ""],
    ...drives.map(([k, v]): Line => ["", `Detecting ${k.padEnd(w)} ... ${short(v)}`]),
  ];

  let el = num(src, ou, "el_power");
  if (el !== undefined && ou && src.get(ou, "el_power")?.unit === "kW") el *= 1000;
  const heat = num(src, ou, "heat_power");
  const cop = heat !== undefined && el !== undefined && el > 50 && heat > 0.2 ? (heat / (el / 1000)).toFixed(1) : "--";
  const date = `${String(now.getMonth() + 1).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")}/${now.getFullYear()}`;
  const code = `${date}-${ref || "HP"}-J84-COP${cop}-00`;
  return { lines, code };
}

const memLine = (k: number, ok: boolean) => `Memory Test    :  ${k}K${ok ? " OK" : ""}`;
function lineHtml([c, t]: [string, string]): string {
  if (c === "mem") return memLine(65536, true);
  if (c === "gw") return `EMS-ESP Plug and Play Gateway ..... ${t}`;
  return c ? `<span class="${c}">${esc(t)}</span>` : esc(t);
}

export class CpCredits extends LitElement {
  static properties = { plant: { attribute: false }, src: { attribute: false }, version: {} };

  plant: Plant | null = null;
  src: ValueSource | null = null;
  version = "";

  private _token = 0;
  private _running = false;
  private _finish: (() => void) | null = null;

  private get _dlg(): HTMLDialogElement | null {
    return this.renderRoot.querySelector("dialog");
  }

  async open(): Promise<void> {
    const dlg = this._dlg;
    if (!dlg || !this.plant || !this.src) return;
    if (!dlg.open) dlg.showModal();
    dlg.focus();
    const tok = ++this._token;
    await loadFont();
    if (tok !== this._token) return;
    const { lines, code } = biosText(this.plant, this.src, this.version);
    const pre = this.renderRoot.querySelector("pre")!;
    const foot = this.renderRoot.querySelector(".foot")!;
    const renderFoot = () => {
      foot.innerHTML = `Press <a href="${GHURL}" target="_blank" rel="noopener">DEL</a> to visit ${GH}, ESC to exit<br>${code}`;
    };
    foot.innerHTML = "";
    this._finish = () => {
      this._token++;
      this._running = false;
      pre.innerHTML = lines.map(lineHtml).join("\n");
      renderFoot();
    };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return this._finish();

    this._running = true;
    const html: string[] = [];
    let i = 0;
    const wait = (ms: number, fn: () => void) => window.setTimeout(() => tok === this._token && fn(), ms);
    const show = () => (pre.innerHTML = html.join("\n"));
    const next = (): void => {
      if (i >= lines.length) {
        this._running = false;
        renderFoot();
        return;
      }
      const l = lines[i++];
      if (l[0] === "mem") {
        const idx = html.push("") - 1;
        let k = 0;
        const count = (): void => {
          k = Math.min(65536, k + 2048);
          html[idx] = memLine(k, k >= 65536);
          show();
          wait(k < 65536 ? 28 : 260, k < 65536 ? count : next);
        };
        return count();
      }
      html.push(lineHtml(l));
      show();
      wait(l[0] === "gw" || l[1].startsWith("Detecting") ? 480 : l[1] === "" ? 90 : 160, next);
    };
    next();
  }

  private _onClick(e: MouseEvent) {
    if ((e.target as HTMLElement).closest("a")) return;
    if (this._running && this._finish) this._finish();
    else this._dlg?.close();
  }

  private _onKey(e: KeyboardEvent) {
    // keep Home Assistant's own shortcuts (quick bar …) out while the dialog is open
    e.stopPropagation();
    if (e.key === "Delete" || e.key === "Backspace") {
      e.preventDefault();
      window.open(GHURL, "_blank", "noopener");
    } else if ((e.key === "Enter" || e.key === " ") && this._running && this._finish) {
      e.preventDefault();
      this._finish();
    }
  }

  render() {
    return html`<dialog tabindex="-1" aria-label="About COPilot" @click=${this._onClick} @keydown=${this._onKey}
      @close=${() => {
        // the close event arrives late: ignore it when the dialog was opened again meanwhile
        if (this._dlg?.open) return;
        this._token++;
        this._running = false;
      }}>
      <div class="bios">
        <div class="head">${pixLogo("mark")}<pre></pre><div class="ally">${pixLogo("big")}<b>junky84</b></div></div>
        <div class="foot"></div>
      </div>
    </dialog>`;
  }

  static styles = css`
    dialog {
      padding: 0;
      border: 0;
      background: #000;
      color: #a8a8a8;
      width: min(880px, 94vw);
      max-width: none;
      max-height: 94vh;
      outline: none;
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
    }
    dialog::backdrop {
      background: rgba(0, 0, 0, 0.85);
    }
    .bios {
      font: 22px/1.2 "CP-VT323", ui-monospace, Menlo, Consolas, monospace;
      padding: 22px 26px 18px;
      min-height: min(560px, 90vh);
      display: flex;
      flex-direction: column;
      cursor: default;
      user-select: none;
    }
    .head {
      display: flex;
      gap: 16px;
      align-items: flex-start;
      flex: 1;
    }
    .mark {
      flex: none;
      width: 48px;
      height: 52px;
      color: #5a8cff;
    }
    pre {
      margin: 0;
      font: inherit;
      white-space: pre-wrap;
      flex: 1;
      min-width: 0;
    }
    .w {
      color: #fff;
    }
    .y {
      color: #f5d76e;
    }
    .g {
      color: #3ddc97;
    }
    .r {
      color: #ff5a5f;
    }
    .ally {
      flex: none;
      width: 108px;
      border: 2px solid #2f6fd5;
      padding: 10px 6px 6px;
      text-align: center;
      line-height: 1;
    }
    .big {
      width: 72px;
      height: 78px;
      display: block;
      margin: 0 auto;
      color: #7ab8ff;
    }
    .ally b {
      display: block;
      font-weight: normal;
      font-size: 26px;
      margin-top: 6px;
      color: #79d36a;
    }
    .foot {
      margin-top: 18px;
      min-height: 2.4em;
    }
    .foot a {
      color: #fff;
    }
    @media (max-width: 700px) {
      .bios {
        font-size: 15px;
        padding: 14px;
      }
      .mark,
      .ally {
        display: none;
      }
    }
  `;
}

if (!customElements.get("cp-credits")) customElements.define("cp-credits", CpCredits);
