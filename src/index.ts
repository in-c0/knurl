/**
 * Knurl — UI controls machined as isometric instruments.
 * Each export mounts a control on an element: `toggle(el, { checked: true })`.
 */
export { toggle, type ToggleOptions } from "./controls/toggle";
export { fader, type FaderOptions } from "./controls/fader";
export { knob, type KnobOptions } from "./controls/knob";
export { keycap, type KeycapOptions } from "./controls/keycap";
export { presets, type PresetsOptions } from "./controls/presets";
export { counter, type CounterOptions } from "./controls/counter";
export { gauge, type GaugeOptions } from "./controls/gauge";
export { gears, type GearsOptions } from "./controls/gears";
export type { BaseOptions, Control, Finish, Theme } from "./core/control";
export type { RangeOptions } from "./core/range";
