/*
 * Multifamily Residential — building model.
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
  id: "multifamily",
  name: "Multifamily Residential",
  use: "residential",
  size: { width: 20, depth: 16, floors: 6, floorHeight: 3.4, bays: 2, extraHeight: 3 },
  model: null,
  facade: { style: "windows", color: "#b0703c" },
  walls: "#e3d3bd",
  intro: "Apartments need individual control and individual billing in every unit.",
  challenges: ["Individual control in each unit", "Ventilation for corridors", "Limited space for equipment"],
  stops: [
    { id: "multifamily-1", at: { floor: "roof", x: 0.45 }, title: "Corridor ventilation", room: "",
      text: "Energy recovery ventilators supply corridors and units with fresh air.",
      products: ["venmar-erv", "novelaire-wheel"] },
    { id: "multifamily-2", at: { floor: 3, x: 0.25 }, title: "Apartments", room: "Apartment",
      text: "VRF, mini-splits or fan coils give each apartment its own system.",
      products: ["gree-vrf", "gree-mini", "envirotec-fancoil"] },
    { id: "multifamily-3", at: { floor: 0, x: 0.7 }, title: "Amenity level", room: "Amenity",
      text: "Water-source heat pumps and trench units serve the lobby and amenity spaces.",
      products: ["mammoth-wshp", "kampmann-trench"] }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // balconies on the front and one side
    for (var i = 1; i < d.floors; i++) {
      var y = i * d.floorHeight;
      [-5.5, 5.5].forEach(function (x) {
        kit.front(kit.box(4, 0.2, 1.3, x, y + 0.3, f + 0.95, "#f4efe6"));
        kit.front(kit.box(4, 0.9, 0.08, x, y + 0.85, f + 1.55, "#7a5a3a"));
      });
      kit.box(1.3, 0.2, 4, w / 2 + 0.65, y + 0.3, 0, "#f4efe6"); kit.box(0.08, 0.9, 4, w / 2 + 1.25, y + 0.85, 0, "#7a5a3a");
    }
    kit.box(4, 2.6, 4, 6, h + 1.6, 4, "#e3d3bd");
    kit.front(kit.box(5, 0.3, 2.4, 0, 3.2, f + 1.3, "#7a5a3a"));
    // playground
    kit.box(5, 0.12, 4, 6, 0.14, f + 8, "#f0d9a8"); kit.box(0.2, 2, 0.2, 4.5, 1, f + 8, "#c0392b"); kit.box(0.2, 2, 0.2, 7.5, 1, f + 8, "#c0392b"); kit.box(3.2, 0.2, 0.2, 6, 2, f + 8, "#c0392b");
  }
});
