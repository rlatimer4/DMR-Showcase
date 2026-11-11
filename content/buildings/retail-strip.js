/*
 * Retail Strip — building model.
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
  id: "retail-strip",
  name: "Retail Strip",
  use: "commercial",
  size: { width: 30, depth: 16, floors: 1, floorHeight: 5, bays: 4 },
  model: null,
  facade: { style: "storefront", color: "#e9e2d5", stripe: "#b7ada0" },
  walls: "#e9e2d5",
  intro: "Each tenant pays its own utility bill and wants its own system.",
  challenges: ["Separate systems for each tenant", "Frequent door openings", "Low maintenance budgets"],
  stops: [
    { id: "retail-strip-1", at: { floor: "roof", x: 0.4 }, title: "Tenant rooftop units", room: "",
      text: "Packaged rooftop units serve each storefront.",
      products: ["mammoth-rtu"] },
    { id: "retail-strip-2", at: { floor: 0, x: 0.12 }, title: "Storefront", room: "Shop",
      text: "Air curtains keep conditioned air in at the door. Mini-splits handle small shops and stock rooms.",
      products: ["kampmann-curtain", "gree-mini", "reddi-line"] }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // awnings and shop signs
    var shops = ["CAFE", "SHOES", "BOOKS", "PHARMACY"], colors = ["#c0392b", "#1779ba", "#2e9e5b", "#ffa500"];
    for (var k = 0; k < 4; k++) {
      var x = -w / 2 + (k + 0.5) * w / 4;
      kit.front(kit.box(w / 4 - 1.2, 0.3, 1.8, x, 3.2, f + 1.1, colors[k]));
      kit.front(kit.sign(shops[k], 5.4, 0.9, x, 4.15, f + 0.45, colors[k], "#ffffff"));
    }
    // car park
    var cars = ["#c0392b", "#f4f6f8", "#1779ba", "#3f4854", "#f7b500"];
    kit.box(20, 0.1, 6, 3, 0.12, f + 8, "#8a929a");
    for (var c = 0; c < 5; c++) kit.box(1.9, 1.2, 4, -5 + c * 4, 0.75, f + 8, cars[c]);
  }
});
