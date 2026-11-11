/*
 * Recreation Center — building model.
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
  id: "recreation-center",
  name: "Recreation Center",
  use: "commercial",
  size: { width: 26, depth: 16, floors: 1, floorHeight: 8, bays: 2, extraHeight: 5 },
  model: null,
  facade: { style: "glass", color: "#2f86c2" },
  intro: "Pools and gyms put moisture and people loads into one building.",
  challenges: ["Pool humidity and condensation", "Large swings in occupancy", "Odor and air quality"],
  stops: [
    { id: "recreation-center-1", at: { floor: "yard", x: 0.35 }, title: "Pool dehumidification", room: "",
      text: "Desiccant systems hold pool-hall humidity down and protect the structure from condensation.",
      products: ["novelaire-desiccant", "venmar-erv"] },
    { id: "recreation-center-2", at: { floor: 0, x: 0.75 }, title: "Gymnasium", room: "Gym",
      text: "Packaged rooftop units handle the gym, and unit heaters cover the entrances.",
      products: ["mammoth-rtu", "sterling-unit", "kampmann-curtain"] }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    kit.barrel(w, 4.5, d.depth, 0, h + 0.3, 0, "slab");
    // outdoor pool
    kit.box(11, 0.25, 5.5, 7, 0.2, f + 8.5, "#ffffff");
    kit.box(9.6, 0.3, 4.3, 7, 0.25, f + 8.5, "#38b6e8");
  }
});
