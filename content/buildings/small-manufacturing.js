/*
 * Small Manufacturing — building model.
 *
 * This file is one self-contained building. Edit it without touching the others:
 *  - size:   overall dimensions in metres; the shell, floors and ducts are generated from it
 *  - facade, walls: the look of the outside (styles are listed in CONTENT.md)
 *  - stops:  the numbered points visitors select. `at.floor` is "roof", "yard"
 *            (a unit on the ground in front) or a floor number (0 = ground);
 *            `at.x` is the position across the width, 0 to 1
 *  - model:  optional path to a .glb file that replaces the generated shell
 *  - build:  the shapes that make this building recognizable (kit helpers are in CONTENT.md)
 * Products listed in a stop that are no longer offered are skipped automatically.
 */
DMR.registerBuilding({
  id: "small-manufacturing",
  name: "Small Manufacturing",
  use: "industrial",
  size: { width: 24, depth: 16, floors: 1, floorHeight: 7, bays: 2, extraHeight: 7 },
  model: null,
  facade: { style: "solid", color: "#7d8791", stripe: "#ffa500", doors: 2 },
  walls: "#8a949e",
  intro: "Small plants need dependable heat and make-up air without a maintenance staff.",
  challenges: ["Make-up air for process exhaust", "Simple, rugged equipment", "Heating a tall space"],
  stops: [
    { id: "small-manufacturing-1", at: { floor: "yard", x: 0.3 }, title: "Make-up air", room: "",
      text: "Direct-fired units replace the air that process exhaust removes.",
      products: ["rapid-mua"] },
    { id: "small-manufacturing-2", at: { floor: 0, x: 0.6 }, title: "Shop floor", room: "Shop",
      text: "Unit heaters and electric heaters cover the shop floor.",
      products: ["sterling-unit", "reddi-line"] }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // sawtooth factory roof and a stack
    for (var k = 0; k < 4; k++) kit.gable(w / 4, 2.6, d.depth, -w / 2 + (k + 0.5) * w / 4, h + 0.3, 0, "#9aa4ad");
    kit.cyl(0.5, 0.5, 7, 9, h + 3.5, -5, "dark");
    // forklift and pallets
    kit.box(1.4, 1.6, 2.2, 8, 0.9, f + 5, "#ffa500"); kit.box(1.6, 1, 1.6, 4.5, 0.6, f + 5, "#b98a5a");
  }
});
