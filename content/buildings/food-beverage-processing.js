/*
 * Food & Beverage Processing — building model (shape and layout only).
 *
 * The words for this building are in content/text/buildings/food-beverage-processing.txt.
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
  id: "food-beverage-processing",
  name: "Food & Beverage Processing",
  use: "industrial",
  size: { width: 28, depth: 16, floors: 1, floorHeight: 8, bays: 2, extraHeight: 10 },
  model: null,
  facade: { style: "solid", color: "#f1f3f5", stripe: "#2e9e5b", doors: 2 },
  walls: "#f4f6f7",
  stops: [
    { id: "food-beverage-processing-1", at: { floor: "roof", x: 0.3 }, space: "plant" },
    { id: "food-beverage-processing-2", at: { floor: 0, x: 0.7 }, space: "process" }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // storage silos behind the plant
    for (var k = 0; k < 4; k++) {
      kit.cyl(2.2, 2.2, 15, -2 + k * 4.8, 7.5, -f - 3.2, "#dfe5ea");
      kit.cone(2.3, 2, -2 + k * 4.8, 16, -f - 3.2, "#b8c2ca", 16);
    }
    kit.box(17, 0.3, 1, 5.2, 15.2, -f - 3.2, "dark");
    // tanker truck
    var tank = kit.cyl(1.2, 1.2, 7, 6, 2, f + 8.5, "#cfd8df"); tank.rotation.z = Math.PI / 2;
    kit.box(2.2, 2.4, 2.4, 11, 1.5, f + 8.5, "#2e9e5b");
  }
});
