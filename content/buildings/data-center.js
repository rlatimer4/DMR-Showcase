/*
 * Data Center — building model (shape and layout only).
 *
 * The words for this building are in content/text/buildings/data-center.txt.
 * This file controls the 3D model:
 *  - size:    overall dimensions in metres
 *  - facade, walls: the look of the outside
 *  - stops:   where each equipment location sits. `at.floor` is "roof", "yard"
 *             or a floor number (0 = ground); `at.x` is the position across
 *             the width, 0 to 1; `space` picks how the room is furnished
 *  - model:   optional path to a .glb file that replaces the generated shell
 *  - build:   shapes that make the building recognizable
 * CONTENT.md lists the facade styles, space types and kit helpers.
 */
DMR.registerBuilding({
  id: "data-center",
  name: "Data Center",
  use: "commercial",
  size: { width: 28, depth: 16, floors: 1, floorHeight: 7, bays: 1, extraHeight: 3 },
  model: null,
  facade: { style: "solid", color: "#56606c", stripe: "#1e9be8", entrance: false },
  walls: "#6b7580",
  stops: [
    { id: "data-center-1", at: { floor: "roof", x: 0.3 }, space: "plant" },
    { id: "data-center-2", at: { floor: 0, x: 0.55 }, space: "data-hall" },
    { id: "data-center-3", at: { floor: "roof", x: 0.78 }, space: "plant" }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // row of rooftop condensers
    for (var n = 0; n < 5; n++) { kit.box(2.6, 1.6, 2.8, 1 + n * 3, h + 1.1, -5, "equip"); kit.cyl(0.9, 0.9, 0.3, 1 + n * 3, h + 2.05, -5, "dark"); }
    // standby generators in the yard
    for (var g = 0; g < 3; g++) { kit.box(2.4, 2.6, 5, 5 + g * 3.2, 1.4, f + 7.5, "#3f4854"); kit.cyl(0.2, 0.2, 2, 5 + g * 3.2, 3.6, f + 6, "dark"); }
    kit.front(kit.sign("DATA CENTER", 9, 1.5, -7, h - 2.6, f + 0.45, "#56606c", "#ffffff"));
  }
});
