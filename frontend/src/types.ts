/** Shared data model. Grid coordinates are in cells (see CELL in catalog.ts). */

export type ComponentType =
  | "outdoor_unit"
  | "indoor_unit"
  | "buffer"
  | "dhw_tank"
  | "pump"
  | "valve_3way"
  | "mixer"
  | "radiators"
  | "floor_heating"
  | "tap"
  | "water_inlet"
  | "separator"
  | "expansion_vessel"
  | "junction"
  | "value_tile"
  | "label";

export type Rotation = 0 | 90 | 180 | 270;
export type Dir = "l" | "r" | "t" | "b";

export type PipeKind = "supply" | "return" | "dhw_hot" | "dhw_cold" | "circulation";

export interface PlantComponent {
  id: string;
  type: ComponentType;
  label: string;
  x: number;
  y: number;
  rot?: Rotation;
  /** mirrored left/right (connections on the other side) */
  flip?: boolean;
  model?: string;
  icon?: string;
  bindings: Record<string, string>;
  props: Record<string, any>;
  /** slots released for changing from the panel (with confirmation) */
  writable?: string[];
  /** slots shown as value badges; undefined = type defaults */
  show?: string[];
  /** value fields moved in the editor: top left corner in cells, relative to the component */
  valuePos?: Record<string, [number, number]>;
}

export interface PortRef {
  c: string;
  p: string;
}

/** Pipe is animated when all conditions hold. `s` is a component state flag. */
export interface FlowCond {
  c: string;
  s: string;
}

export interface Pipe {
  id: string;
  from: PortRef;
  to: PortRef;
  kind: PipeKind;
  /** absolute grid coordinate of the middle segment (x for horizontal starts, y for vertical) */
  bend?: number;
  /** explicit waypoints (cells); orthogonal corners are added between them */
  via?: [number, number][];
  flow?: FlowCond[];
  /** additionally at least one of these must hold (OR group) */
  flowAny?: FlowCond[];
  bindings?: { temp?: string; flow?: string };
}

export interface EnergyConfig {
  enabled?: boolean;
  pv?: string;
  grid?: string;
  /** entity reports export as positive */
  grid_invert?: boolean;
  battery?: string;
  /** entity reports charging as positive */
  battery_invert?: boolean;
  battery_soc?: string;
  house?: string;
  /** house entity already contains the heat pump (evcc "home power") */
  house_includes_hp?: boolean;
  wallbox?: string;
  /** §14a: guaranteed minimum power while dimmed, kW */
  limit_14a?: number;
}

/** Electricity tariff and comparison for the cost view (prices in €/kWh). */
export interface TariffConfig {
  mode?: "fixed" | "entity";
  price?: number;
  price_entity?: string;
  /** feed-in tariff: PV power used by the heat pump is not sold */
  feed_in?: number;
  /** comparison heating: gas/oil price per kWh fuel and boiler efficiency in % */
  gas_price?: number;
  gas_eff?: number;
}

/** Before / after: the old boiler's meter as a reference for the heat pump (see data/baseline.ts). */
export interface BaselineConfig {
  enabled?: boolean;
  /** meter of the old heating (gas m³ or kWh, oil litres) with long-term statistics */
  meter?: string;
  unit?: "m3" | "kwh" | "l";
  /** energy per meter unit in kWh (gas: gross calorific value × z-number, about 10–11) */
  kwh_per_unit?: number;
  /** efficiency of the old boiler in % (relative to the energy above) */
  eff?: number;
  /** price per meter unit, € */
  price?: number;
  /** CO₂ per kWh fuel, kg */
  co2_per_kwh?: number;
  /** outdoor temperature with statistics reaching back before the switch-over (default: heat pump sensor) */
  outdoor?: string;
  /** first day of the heat pump (ISO date); the meter is read up to this day */
  switch_date?: string;
  /** read the meter from this day on (ISO date), e.g. after insulation work */
  from?: string;
  /** without meter history: yearly consumption in the meter unit */
  annual?: number;
  /** heating limit for the yearly consumption, °C */
  heating_limit?: number;
}

export interface MaintenanceTask {
  id: string;
  /** preset key (texts mt.<key>); custom tasks carry a title instead */
  key?: string;
  title?: string;
  interval_days: number;
  /** epoch seconds */
  last_done?: number;
  component?: string;
}

/** Building section drawn behind the plant (grid cells). */
export interface BuildingConfig {
  show?: boolean;
  /** floor / ground level (y) */
  floor: number;
  /** outer wall (x) */
  wall?: number;
  /** side of the outer wall that is outside (default left) */
  outside?: "left" | "right";
  /** ground level outside (y); above the floor for a basement plant room */
  ground?: number;
  /** ceiling of the plant room = floor of the living space above (y) */
  slab?: number;
}

export interface PlantSettings {
  style: "flat" | "iso";
  demo: boolean;
  language?: "auto" | "de" | "en";
  typeIcons?: Partial<Record<ComponentType, string>>;
  /** heat load at design temperature in kW (simulator) */
  heat_load?: number;
  tariff?: TariffConfig;
  /** before / after comparison with the old heating */
  baseline?: BaselineConfig;
  building?: BuildingConfig;
  maintenance?: { tasks: MaintenanceTask[] };
  /** energy layer (PV, grid, battery, house, wallbox) */
  energy?: EnergyConfig;
  /** non-admin users may change released values too */
  write_non_admin?: boolean;
  /** layout changed by hand in the editor: never regenerate it automatically */
  layout_edited?: boolean;
  /** heating curve view: show measurements only from this point on (circuit id → ISO time) */
  curve_since?: Record<string, string>;
  /** heating curve coach per circuit id (see data/coach.ts) */
  curve_coach?: Record<string, import("./data/coach").CoachState>;
  /** last wizard answers, to reopen the wizard pre-filled */
  wizard?: any;
}

export interface Plant {
  /** 2 = built-in PC0/VW1 and real connection positions, 3 = circulation from the end of the hot water line */
  version: 1 | 2 | 3 | 4 | 5;
  name: string;
  grid: { w: number; h: number };
  components: PlantComponent[];
  pipes: Pipe[];
  settings: PlantSettings;
}

export type Level = "info" | "notice" | "warning" | "error";

export interface PlantMessage {
  id: string;
  ts: number;
  level: Level;
  key: string;
  params: Record<string, any>;
  component_id: string | null;
  active: boolean;
  end_ts: number | null;
}

export interface UserIcon {
  id: string;
  name: string;
  mime: string;
  iso: boolean;
  size: number;
  data_url: string;
}

/** A resolved value of a component slot. */
export interface SlotValue {
  raw: string | number | boolean | null;
  num: number | null;
  unit?: string;
  entity?: string;
  available: boolean;
}

export interface HistoryPoint {
  t: number;
  v: number | null;
  /** original state text (enums such as compressor activity) */
  raw?: string;
}

/** Minimal subset of the Home Assistant frontend `hass` object that we use. */
export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
  last_updated: string;
}

export interface Hass {
  states: Record<string, HassEntity>;
  language: string;
  themes?: { darkMode?: boolean };
  user?: { is_admin: boolean; name?: string };
  callWS<T = any>(msg: Record<string, any>): Promise<T>;
  connection?: {
    subscribeMessage<T = any>(cb: (msg: T) => void, msg: Record<string, any>): Promise<() => void>;
  };
  /** set by the standalone demo page */
  __standalone?: boolean;
}
