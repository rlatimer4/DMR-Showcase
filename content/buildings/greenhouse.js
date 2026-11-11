/*
 * Greenhouse — building model.
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
  id: "greenhouse",
  name: "Greenhouse",
  use: "industrial",
  size: { width: 26, depth: 16, floors: 1, floorHeight: 6, bays: 1, extraHeight: 4 },
  model: null,
  facade: { style: "glass", color: "#bfe3d0", entrance: false },
  walls: "glass",
  roof: "open",
  intro: "Plants release moisture all day, and the glass loses heat all night.",
  challenges: ["High humidity from plants", "Heat loss through glass", "Even conditions across the crop"],
  stops: [
    { id: "greenhouse-1", at: { floor: "yard", x: 0.25 }, title: "Dehumidification", room: "",
      text: "Desiccant systems remove plant moisture without overcooling the space.",
      products: ["novelaire-desiccant", "fisair-dehum"] },
    { id: "greenhouse-2", at: { floor: 0, x: 0.6 }, title: "Growing floor", room: "Grow",
      text: "Humidifiers and hydronic unit heaters hold conditions steady across the crop.",
      products: ["fisair-humid", "sterling-unit", "sterling-hydronic"] }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // glass roof spans
    for (var k = 0; k < 3; k++) kit.gable(w / 3, 3.2, d.depth, -w / 2 + (k + 0.5) * w / 3, h, 0, "glass");
    // growing beds
    for (var r = 0; r < 4; r++) { kit.box(w - 4, 0.5, 1.6, 0, 0.55, -5 + r * 3.4, "#8a7560"); kit.box(w - 4.4, 0.7, 1.2, 0, 1.1, -5 + r * 3.4, "#4caf50"); }
  }
});
