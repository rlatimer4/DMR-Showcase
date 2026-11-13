/*
 * Sports Stadium — building model (shape and layout only).
 *
 * The words for this building are in content/text/buildings/sports-stadium.txt.
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
  id: "sports-stadium",
  name: "Sports Stadium",
  use: "institutional",
  size: { width: 30, depth: 16, floors: 2, floorHeight: 6, bays: 2, extraHeight: 18 },
  model: null,
  facade: { style: "solid", color: "#6b7785", stripe: "#ffa500" },
  walls: "#7d8894",
  stops: [
    { id: "sports-stadium-1", at: { floor: "yard", x: 0.2 }, space: "plant" },
    { id: "sports-stadium-2", at: { floor: 1, x: 0.7 }, space: "suite" },
    { id: "sports-stadium-4", at: { floor: 1, x: 0.25 }, space: "suite" },
    { id: "sports-stadium-3", at: { floor: 0, x: 0.25 }, space: "locker" },
    { id: "sports-stadium-5", at: { floor: 0, x: 0.75 }, space: "mechanical" }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // seating bowl and playing field
    kit.ring(w * 0.3, w * 0.5, 5, 0, h + 2.8, 0, "slab");
    var field = kit.cyl(w * 0.3, w * 0.3, 0.3, 0, h + 0.5, 0, "#4caf50"); field.scale.z = 0.5;
    // floodlight towers
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) {
      kit.cyl(0.25, 0.3, 17, c[0] * (w / 2 - 0.8), h + 8.5, c[1] * (f - 0.8), "dark");
      kit.box(3, 1.6, 0.4, c[0] * (w / 2 - 0.8), h + 17.4, c[1] * (f - 0.8), "wall");
    });
  }
});
