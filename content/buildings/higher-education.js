/*
 * Higher Education — building model (shape and layout only).
 *
 * The words for this building are in content/text/buildings/higher-education.txt.
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
  id: "higher-education",
  name: "Higher Education",
  use: "institutional",
  size: { width: 26, depth: 16, floors: 3, floorHeight: 4.4, bays: 3, extraHeight: 14 },
  model: null,
  facade: { style: "brick", color: "#9c4f35" },
  walls: "#a85a3c",
  stops: [
    { id: "higher-education-1", at: { floor: "roof", x: 0.4 }, space: "plant" },
    { id: "higher-education-2", at: { floor: 2, x: 0.17 }, space: "lab" },
    { id: "higher-education-3", at: { floor: 1, x: 0.5 }, space: "lecture" },
    { id: "higher-education-5", at: { floor: 1, x: 0.83 }, space: "lecture" },
    { id: "higher-education-4", at: { floor: 0, x: 0.83 }, space: "mechanical" }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // clock tower
    kit.box(4, 9, 4, 9, h + 4.6, -4.5, "#a85a3c");
    kit.cone(3.3, 4, 9, h + 11.1, -4.5, "#4f6b5a");
    var face = kit.cyl(1.3, 1.3, 0.15, 9, h + 6.6, -2.42, "wall"); face.rotation.x = Math.PI / 2;
    kit.box(0.14, 1, 0.1, 9, h + 7, -2.3, "dark"); kit.box(0.7, 0.14, 0.1, 9.3, h + 6.6, -2.3, "dark");
    // quad
    kit.box(16, 0.12, 6, 3, 0.14, f + 8, "#7cb87c"); kit.box(1.5, 0.14, 6, 3, 0.16, f + 8, "wall"); kit.box(16, 0.14, 1.2, 3, 0.16, f + 8, "wall");
  }
});
