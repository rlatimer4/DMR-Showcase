/*
 * Hotel — building model (shape and layout only).
 *
 * The words for this building are in content/text/buildings/hotel.txt.
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
  id: "hotel",
  name: "Hotel",
  use: "commercial",
  size: { width: 20, depth: 16, floors: 7, floorHeight: 3.6, bays: 2, extraHeight: 4 },
  model: null,
  facade: { style: "windows", color: "#8c5a44" },
  walls: "#efe6da",
  stops: [
    { id: "hotel-1", at: { floor: "roof", x: 0.45 }, space: "plant" },
    { id: "hotel-2", at: { floor: 4, x: 0.25 }, space: "guest-room" },
    { id: "hotel-3", at: { floor: 0, x: 0.3 }, space: "lobby" }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    kit.front(kit.sign("HOTEL", 9, 3, 4.5, h + 2.2, f - 0.5, "#c0392b", "#ffffff"));
    kit.front(kit.box(0.3, 2, 0.3, 1.5, h + 1, f - 0.6, "dark")); kit.front(kit.box(0.3, 2, 0.3, 7.5, h + 1, f - 0.6, "dark"));
    // entrance canopy
    kit.front(kit.box(9, 0.4, 5, 0, 4, f + 2.6, "#c0392b"));
    kit.front(kit.cyl(0.25, 0.25, 4, -4, 2, f + 4.6, "wall")); kit.front(kit.cyl(0.25, 0.25, 4, 4, 2, f + 4.6, "wall"));
  }
});
