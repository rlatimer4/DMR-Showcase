/*
 * Greenhouse — building model.
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
  id: "greenhouse",
  name: "Greenhouse",
  use: "industrial",
  size: { width: 26, depth: 16, floors: 1, floorHeight: 6, bays: 1 },
  model: null,
  intro: "Plants release moisture all day, and the glass loses heat all night.",
  challenges: ["High humidity from plants", "Heat loss through glass", "Even conditions across the crop"],
  stops: [
    { id: "greenhouse-1", at: { floor: "roof", x: 0.25 }, title: "Dehumidification", room: "",
      text: "Desiccant systems remove plant moisture without overcooling the space.",
      products: ["novelaire-desiccant", "fisair-dehum"] },
    { id: "greenhouse-2", at: { floor: 0, x: 0.6 }, title: "Growing floor", room: "Grow",
      text: "Humidifiers and hydronic unit heaters hold conditions steady across the crop.",
      products: ["fisair-humid", "sterling-unit", "sterling-hydronic"] }
  ],
  build: function (kit, d) {
    kit.gable(d.width, 4, d.depth, 0, d.height + 0.3, 0, "glass");
  }
});
