/*
 * Mid-Rise Office — building model.
 *
 * This file is one self-contained building. Edit it without touching the others:
 *  - size:   overall dimensions in metres; the shell, floors and ducts are generated from it
 *  - stops:  the numbered points visitors select. `at.floor` is "roof" or a floor
 *            number (0 = ground); `at.x` is the position across the width, 0 to 1
 *  - model:  optional path to a .glb file that replaces the generated shell
 *  - build:  optional extra geometry, drawn with the kit helpers (see world.js)
 */
DMR.registerBuilding({
  id: "mid-rise-office",
  name: "Mid-Rise Office",
  use: "commercial",
  size: { width: 20, depth: 16, floors: 5, floorHeight: 3.8, bays: 2 },
  model: null,
  intro: "Mid-rise offices balance first cost against energy use.",
  challenges: ["Energy code compliance", "Zone control on every floor", "Mechanical space on each floor"],
  stops: [
    { id: "mid-rise-office-1", at: { floor: "roof", x: 0.4 }, title: "Outdoor air and recovery", room: "",
      text: "Energy recovery ventilators pre-condition outdoor air using the building's exhaust.",
      products: ["venmar-erv", "ventrol-ahu"] },
    { id: "mid-rise-office-2", at: { floor: 3, x: 0.7 }, title: "Office floor", room: "Office",
      text: "Water-source heat pumps or VAV terminals serve each zone.",
      products: ["mammoth-wshp", "envirotec-vav"] },
    { id: "mid-rise-office-3", at: { floor: 1, x: 0.25 }, title: "Floor-by-floor units", room: "Mech",
      text: "Vertical self-contained units serve one floor each, driven by variable frequency drives.",
      products: ["mammoth-rtu", "fuji-vfd"] }
  ]
});
