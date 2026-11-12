/*
 * Religious Center — building model (shape and layout only).
 *
 * The words for this building are in content/text/buildings/religious-center.txt.
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
  id: "religious-center",
  name: "Religious Center",
  use: "institutional",
  size: { width: 18, depth: 16, floors: 1, floorHeight: 9, bays: 1, extraHeight: 15 },
  model: null,
  facade: { style: "tall", color: "#e9e2d5" },
  walls: "#f4efe6",
  stops: [
    { id: "religious-center-1", at: { floor: "yard", x: 0.3 }, space: "plant" },
    { id: "religious-center-2", at: { floor: 0, x: 0.6 }, space: "sanctuary" }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    kit.gable(w + 1, 5, d.depth + 1, 0, h + 0.3, 0, "#8a5a44");
    // steeple with a cross
    var x = -w / 2 + 1.7, z = f - 1.7;
    kit.front(kit.box(3.4, h + 6, 3.4, x, (h + 6) / 2, z, "#f4efe6"));
    kit.front(kit.cone(2.6, 6, x, h + 9, z, "#8a5a44"));
    kit.front(kit.box(0.3, 2.6, 0.3, x, h + 13.3, z, "#b9a15a"));
    kit.front(kit.box(1.5, 0.3, 0.3, x, h + 13.6, z, "#b9a15a"));
  }
});
