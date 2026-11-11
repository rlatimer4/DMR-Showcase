/*
 * Recreation Center — building model.
 *
 * This file is one self-contained building. Edit it without touching the others:
 *  - size:   overall dimensions in metres; the shell, floors and ducts are generated from it
 *  - stops:  the numbered points visitors select. `at.floor` is "roof" or a floor
 *            number (0 = ground); `at.x` is the position across the width, 0 to 1
 *  - model:  optional path to a .glb file that replaces the generated shell
 *  - build:  optional extra geometry, drawn with the kit helpers (see world.js)
 */
DMR.registerBuilding({
  id: "recreation-center",
  name: "Recreation Center",
  use: "commercial",
  size: { width: 26, depth: 16, floors: 1, floorHeight: 8, bays: 2 },
  model: null,
  intro: "Pools and gyms put moisture and people loads into one building.",
  challenges: ["Pool humidity and condensation", "Large swings in occupancy", "Odor and air quality"],
  stops: [
    { id: "recreation-center-1", at: { floor: "roof", x: 0.35 }, title: "Pool dehumidification", room: "",
      text: "Desiccant systems hold pool-hall humidity down and protect the structure from condensation.",
      products: ["novelaire-desiccant", "venmar-erv"] },
    { id: "recreation-center-2", at: { floor: 0, x: 0.75 }, title: "Gymnasium", room: "Gym",
      text: "Packaged rooftop units handle the gym, and unit heaters cover the entrances.",
      products: ["mammoth-rtu", "sterling-unit", "kampmann-curtain"] }
  ]
});
