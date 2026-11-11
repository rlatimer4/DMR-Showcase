/*
 * Small Manufacturing — building model.
 *
 * This file is one self-contained building. Edit it without touching the others:
 *  - size:   overall dimensions in metres; the shell, floors and ducts are generated from it
 *  - stops:  the numbered points visitors select. `at.floor` is "roof" or a floor
 *            number (0 = ground); `at.x` is the position across the width, 0 to 1
 *  - model:  optional path to a .glb file that replaces the generated shell
 *  - build:  optional extra geometry, drawn with the kit helpers (see CONTENT.md)
 * Products listed in a stop that are no longer offered are skipped automatically.
 */
DMR.registerBuilding({
  id: "small-manufacturing",
  name: "Small Manufacturing",
  use: "industrial",
  size: { width: 24, depth: 16, floors: 1, floorHeight: 7, bays: 2 },
  model: null,
  intro: "Small plants need dependable heat and make-up air without a maintenance staff.",
  challenges: ["Make-up air for process exhaust", "Simple, rugged equipment", "Heating a tall space"],
  stops: [
    { id: "small-manufacturing-1", at: { floor: "roof", x: 0.3 }, title: "Make-up air", room: "",
      text: "Direct-fired units replace the air that process exhaust removes.",
      products: ["rapid-mua"] },
    { id: "small-manufacturing-2", at: { floor: 0, x: 0.6 }, title: "Shop floor", room: "Shop",
      text: "Unit heaters and electric heaters cover the shop floor.",
      products: ["sterling-unit", "reddi-line"] }
  ]
});
