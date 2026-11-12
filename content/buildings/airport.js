/*
 * Airport — building model (shape and layout only).
 *
 * The words for this building are in content/text/buildings/airport.txt.
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
  id: "airport",
  name: "Airport",
  use: "commercial",
  size: { width: 30, depth: 16, floors: 2, floorHeight: 6, bays: 2, extraHeight: 19 },
  model: null,
  facade: { style: "glass", color: "#2f86c2" },
  stops: [
    { id: "airport-1", at: { floor: "roof", x: 0.3 }, space: "plant" },
    { id: "airport-2", at: { floor: 1, x: 0.7 }, space: "concourse" },
    { id: "airport-3", at: { floor: 0, x: 0.25 }, space: "baggage" }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // control tower
    kit.cyl(1.4, 1.8, 16, w / 2 - 4, h + 8, -3, "wall");
    kit.cyl(3, 2.2, 2.4, w / 2 - 4, h + 17, -3, "#8fd0f5");
    kit.cyl(3.2, 3.2, 0.4, w / 2 - 4, h + 18.4, -3, "dark");
    // airplane at the gate
    var body = kit.cyl(1.2, 1.2, 15, -2, 2.8, f + 8.5, "wall"); body.rotation.z = Math.PI / 2;
    var nose = kit.cone(1.2, 2.6, 6.8, 2.8, f + 8.5, "wall", 16); nose.rotation.set(0, 0, -Math.PI / 2);
    kit.box(3, 0.25, 12, -1, 2.5, f + 8.5, "wall");
    kit.box(1.6, 0.2, 5, -8.6, 3.2, f + 8.5, "wall");
    kit.box(2.2, 3, 0.25, -8.6, 4.8, f + 8.5, "#1779ba");
    kit.box(4, 2, 2, 3, 3.2, f + 3, "equip");
  }
});
