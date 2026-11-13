/*
 * Mid-Rise Office — building model (shape and layout only).
 *
 * The words for this building are in content/text/buildings/mid-rise-office.txt.
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
  id: "mid-rise-office",
  name: "Mid-Rise Office",
  use: "commercial",
  size: { width: 20, depth: 16, floors: 5, floorHeight: 3.8, bays: 2, extraHeight: 3 },
  model: null,
  facade: { style: "bands", color: "#cfd8df" },
  walls: "#cfd8df",
  stops: [
    { id: "mid-rise-office-1", at: { floor: "roof", x: 0.4 }, space: "plant" },
    { id: "mid-rise-office-2", at: { floor: 3, x: 0.75 }, space: "open-office" },
    { id: "mid-rise-office-4", at: { floor: 3, x: 0.25 }, space: "open-office" },
    { id: "mid-rise-office-3", at: { floor: 1, x: 0.25 }, space: "mechanical" },
    { id: "mid-rise-office-5", at: { floor: 1, x: 0.75 }, space: "mechanical" }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // entrance canopy, roof screen and planters
    kit.front(kit.box(7, 0.35, 3, 0, 3.6, f + 1.6, "dark"));
    kit.box(8, 2, 0.3, 5.5, h + 1.3, 4, "equip"); kit.box(0.3, 2, 5, 9.5, h + 1.3, 1.5, "equip");
    kit.box(4, 0.8, 1.6, 6, 0.4, f + 4.5, "#7cb87c"); kit.box(4, 0.8, 1.6, 0.5, 0.4, f + 4.5, "#7cb87c");
  }
});
