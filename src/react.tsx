import { make } from "./react/make";
import {
  counter, fader, gauge, gears, keycap, knob, presets, toggle,
  type CounterOptions, type FaderOptions, type GaugeOptions, type GearsOptions,
  type KeycapOptions, type KnobOptions, type PresetsOptions, type ToggleOptions,
} from "./index";

/** knurl-ui/react — the controls as React components. */
export type { KnurlDivProps } from "./react/make";

/** A switch: a bat-handle toggle on a panel, with a lamp that lights when on. */
export const Toggle = make<ToggleOptions>("Toggle", toggle, "200 / 140", "checked");
/** A slider: a mixing-desk fader on its strip. */
export const Fader = make<FaderOptions>("Fader", fader, "320 / 120", "value");
/** A rotary value: a knurled knob over a 270° scale. Drag up/down, scroll or use the arrows. */
export const Knob = make<KnobOptions>("Knob", knob, "200 / 170", "value");
/** A button: one mechanical key in a plate. Fires `onPress`. */
export const Keycap = make<KeycapOptions>("Keycap", keycap, "200 / 150");
/** A radio group: a bank of latching preset keys. */
export const Presets = make<PresetsOptions>("Presets", presets, "300 / 150", "value");
/** A number field: a tally counter whose drums roll like an odometer. */
export const Counter = make<CounterOptions>("Counter", counter, "280 / 150", "value");
/** A progress bar or meter: a dial gauge with a damped needle and a tell-tale hand. */
export const Gauge = make<GaugeOptions>("Gauge", gauge, "200 / 170");
/** A loading indicator: a gear train that turns at its true ratios. */
export const Gears = make<GearsOptions>("Gears", gears, "200 / 150");

export type {
  CounterOptions, FaderOptions, GaugeOptions, GearsOptions, KeycapOptions, KnobOptions, PresetsOptions, ToggleOptions,
};
