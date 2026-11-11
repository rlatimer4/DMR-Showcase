/*
 * Convention Center — building model.
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
  id: "convention-center",
  name: "Convention Center",
  use: "commercial",
  size: { width: 30, depth: 16, floors: 1, floorHeight: 10, bays: 2, extraHeight: 6 },
  model: null,
  facade: { style: "glass", color: "#3a7ca8" },
  intro: "Exhibit halls go from empty to thousands of people in an hour.",
  challenges: ["Huge swings in occupancy", "Long air throws in high spaces", "Large outdoor air volumes"],
  stops: [
    { id: "convention-center-1", at: { floor: "yard", x: 0.35 }, title: "Hall air handling", room: "",
      text: "Custom rooftop systems are sized for peak crowds and turn down when the hall is empty.",
      products: ["governair-rtu", "huntair-fanwall", "fuji-vfd"] },
    { id: "convention-center-2", at: { floor: 0, x: 0.7 }, title: "Exhibit hall", room: "Exhibit hall",
      text: "Energy recovery wheels cut the cost of the outdoor air a full hall needs.",
      products: ["klingenburg-wheel", "nortek-ahu"] }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    kit.barrel(w, 5.5, d.depth, 0, h + 0.3, 0, "slab");
    // banners on the front
    var colors = ["#c0392b", "#ffa500", "#1779ba"];
    for (var k = 0; k < 3; k++) kit.front(kit.sign("EXPO", 3, 6, -9 + k * 9, h - 4, f + 0.5, colors[k], "#ffffff"));
  }
});
