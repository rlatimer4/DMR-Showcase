/*
 * Pharma Manufacturing — building model.
 *
 * This file is one self-contained building. Edit it without touching the others:
 *  - size:   overall dimensions in metres; the shell, floors and ducts are generated from it
 *  - stops:  the numbered points visitors select. `at.floor` is "roof" or a floor
 *            number (0 = ground); `at.x` is the position across the width, 0 to 1
 *  - model:  optional path to a .glb file that replaces the generated shell
 *  - build:  optional extra geometry, drawn with the kit helpers (see world.js)
 */
DMR.registerBuilding({
  id: "pharma-manufacturing",
  name: "Pharma Manufacturing",
  use: "industrial",
  size: { width: 26, depth: 16, floors: 2, floorHeight: 5.5, bays: 2 },
  model: null,
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
  ]
});
