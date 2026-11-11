/*
 * Warehouse — building model.
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
  id: "warehouse",
  name: "Warehouse",
  use: "industrial",
  size: { width: 30, depth: 16, floors: 1, floorHeight: 11, bays: 1 },
  model: null,
  facade: { style: "solid", color: "#8b949c", stripe: "#ffa500", doors: 6 },
  walls: "#98a1a9",
  intro: "Large-volume buildings lose heat through dock doors and stratify from floor to roof.",
  challenges: ["Heat lost at dock doors", "Stratification in high bays", "Low operating cost"],
  stops: [
    { id: "warehouse-1", at: { floor: "roof", x: 0.3 }, title: "Make-up air", room: "",
      text: "Direct-fired units heat outdoor air and keep the building at positive pressure.",
      products: ["rapid-mua"] },
    { id: "warehouse-2", at: { floor: 0, x: 0.35 }, title: "Warehouse floor", room: "High bay",
      text: "Air turnover units keep temperature even from floor to roof. Unit heaters cover local areas.",
      products: ["rapid-turnover", "sterling-unit", "reddi-line"] },
    { id: "warehouse-3", at: { floor: 0, x: 0.85 }, title: "Loading dock", room: "",
      text: "Industrial air curtains hold conditioned air in while dock doors are open.",
      products: ["kampmann-curtain", "sterling-unit"] }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // racking inside
    for (var k = 0; k < 3; k++) kit.box(3.2, 7, 9, -w / 2 + 3.5 + k * 4.6, 3.8, -2, "equip");
    // trucks at the dock doors
    [-2.5, 7.5].forEach(function (x, i) {
      kit.box(2.6, 2.9, 8, x, 2.2, f + 5.2, "wall");
      kit.box(2.4, 2.4, 2.2, x, 1.5, f + 10.5, i ? "#c0392b" : "#1779ba");
    });
  }
});
