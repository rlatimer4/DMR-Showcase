/*
 * Warehouse — building model.
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
  id: "warehouse",
  name: "Warehouse",
  use: "industrial",
  size: { width: 30, depth: 16, floors: 1, floorHeight: 11, bays: 1 },
  model: null,
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
  build: function (kit, d) {
    for (var k = 0; k < 3; k++) kit.box(3.2, 7, 9, -d.width / 2 + 3.5 + k * 4.6, 3.8, -2, "equip");
  }
});
