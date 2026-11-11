/*
 * Pharma Manufacturing — building model.
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
  id: "pharma-manufacturing",
  name: "Pharma Manufacturing",
  use: "industrial",
  size: { width: 26, depth: 16, floors: 2, floorHeight: 5.5, bays: 2, extraHeight: 5 },
  model: null,
  facade: { style: "bands", color: "#ffffff" },
  walls: "#ffffff",
  intro: "Pharmaceutical production runs in classified cleanrooms with documented conditions.",
  challenges: ["Cleanroom classification", "Low humidity for powders", "Validated, redundant systems"],
  stops: [
    { id: "pharma-manufacturing-1", at: { floor: "roof", x: 0.4 }, title: "Energy recovery", room: "",
      text: "Plate exchangers recover energy from exhaust while keeping it separate from the supply air.",
      products: ["klingenburg-plate", "venmar-erv", "ventrol-ahu"] },
    { id: "pharma-manufacturing-2", at: { floor: 1, x: 0.25 }, title: "Cleanroom", room: "ISO 7",
      text: "Recirculation units and fan filter units keep particle counts within class. Fan arrays provide redundancy.",
      products: ["huntair-cleanroom", "huntair-fanwall"] },
    { id: "pharma-manufacturing-3", at: { floor: 0, x: 0.75 }, title: "Dry room", room: "Dry room",
      text: "Desiccant systems hold humidity lower than a cooling coil can reach.",
      products: ["novelaire-desiccant", "fisair-dehum", "fisair-humid"] }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // exhaust stacks
    for (var k = 0; k < 5; k++) kit.cyl(0.3, 0.3, 4, 3 + k * 2, h + 2.3, -5, "#b8c2ca");
    // process tanks behind
    [-9, -4.5].forEach(function (x) { kit.cyl(1.8, 1.8, 10, x, 5, -f - 3, "wall"); kit.dome(1.8, x, 10, -f - 3, "wall"); });
    kit.front(kit.sign("Rx PHARMA", 9, 1.5, 6, h - 1.1, f + 0.45, "#1779ba", "#ffffff"));
  }
});
