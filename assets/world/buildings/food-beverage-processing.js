/*
 * Food & Beverage Processing — building model.
 *
 * This file is one self-contained building. Edit it without touching the others:
 *  - size:   overall dimensions in metres; the shell, floors and ducts are generated from it
 *  - stops:  the numbered points visitors select. `at.floor` is "roof" or a floor
 *            number (0 = ground); `at.x` is the position across the width, 0 to 1
 *  - model:  optional path to a .glb file that replaces the generated shell
 *  - build:  optional extra geometry, drawn with the kit helpers (see world.js)
 */
DMR.registerBuilding({
  id: "food-beverage-processing",
  name: "Food & Beverage Processing",
  use: "industrial",
  size: { width: 28, depth: 16, floors: 1, floorHeight: 8, bays: 2 },
  model: null,
  intro: "Processing rooms are washed down daily and must stay dry and clean.",
  challenges: ["Wash-down humidity", "Sanitation", "Temperature-controlled process rooms"],
  stops: [
    { id: "food-beverage-processing-1", at: { floor: "roof", x: 0.3 }, title: "Process air handling", room: "",
      text: "Custom air handlers with UV-C keep coils clean in sanitary applications.",
      products: ["nortek-ahu", "uvr-coil"] },
    { id: "food-beverage-processing-2", at: { floor: 0, x: 0.7 }, title: "Processing room", room: "Process",
      text: "Desiccant dehumidifiers dry the room after wash-down and prevent condensation.",
      products: ["fisair-dehum", "novelaire-desiccant"] }
  ]
});
