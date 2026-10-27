// The one list of controls the registry, the site and the README read from.
export const CONTROLS = [
  { id: "toggle", group: "Inputs", name: "Toggle", role: "Switch", ratio: "200 / 140", controlKey: "checked", summary: "A switch, built as a bat-handle toggle on a panel, with a lamp that lights when it is on." },
  { id: "fader", group: "Inputs", name: "Fader", role: "Slider", ratio: "320 / 120", controlKey: "value", summary: "A slider, built as a mixing-desk fader whose cap rides a lit slot over a ruler of its steps." },
  { id: "knob", group: "Inputs", name: "Knob", role: "Slider (rotary)", ratio: "200 / 170", controlKey: "value", summary: "A rotary value, built as a knurled knob over a 270° scale. Drag up or down, scroll, or use the arrow keys." },
  { id: "keycap", group: "Inputs", name: "Keycap", role: "Button", ratio: "200 / 150", controlKey: null, summary: "A button, built as one mechanical key in a plate. It travels down when pressed and fires on release." },
  { id: "presets", group: "Choices", name: "Presets", role: "Radio group", ratio: "300 / 150", controlKey: "value", summary: "A radio group, built as a bank of latching preset keys: pressing one throws the last one back up." },
  { id: "counter", group: "Inputs", name: "Counter", role: "Number field", ratio: "280 / 150", controlKey: "value", summary: "A number field, built as a tally counter whose drums roll like an odometer." },
  { id: "gauge", group: "Readouts", name: "Gauge", role: "Progress / meter", ratio: "200 / 170", controlKey: null, summary: "A progress bar or meter, built as a dial gauge with a damped needle and a tell-tale hand." },
  { id: "gears", group: "Readouts", name: "Gears", role: "Loading status", ratio: "200 / 150", controlKey: null, summary: "A loading indicator, built as a gear train that turns at its true ratios." },
];
