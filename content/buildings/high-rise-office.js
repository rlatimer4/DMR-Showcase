/*
 * High-Rise Office — building model (shape and layout only).
 *
 * The words for this building are in content/text/buildings/high-rise-office.txt.
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
  id: "high-rise-office",
  name: "High-Rise Office",
  use: "commercial",
  size: { width: 18, depth: 16, floors: 10, floorHeight: 3.8, bays: 2, extraHeight: 13 },
  model: null,
  facade: { style: "glass", color: "#1c5f93" },
  walls: "#dfe7ee",
  stops: [
    { id: "high-rise-office-1", at: { floor: "roof", x: 0.45 }, space: "plant" },
    { id: "high-rise-office-2", at: { floor: 7, x: 0.25 }, space: "open-office" },
    { id: "high-rise-office-5", at: { floor: 7, x: 0.75 }, space: "open-office" },
    { id: "high-rise-office-3", at: { floor: 4, x: 0.75 }, space: "office" },
    { id: "high-rise-office-4", at: { floor: 0, x: 0.3 }, space: "lobby" }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // glass parapet and spire
    kit.box(w, 2, 0.3, 0, h + 1, f - 0.15, "#1c5f93"); kit.box(w, 2, 0.3, 0, h + 1, -f + 0.15, "#1c5f93");
    kit.box(0.3, 2, d.depth, -w / 2 + 0.15, h + 1, 0, "#1c5f93"); kit.box(0.3, 2, d.depth, w / 2 - 0.15, h + 1, 0, "#1c5f93");
    kit.cyl(0.2, 0.45, 12, 6, h + 6, -5, "dark");
    kit.cyl(0.4, 0.4, 0.5, 6, h + 12.2, -5, "#d62828");
  }
});
