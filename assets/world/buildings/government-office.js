/*
 * Government Office — building model.
 *
 * This file is one self-contained building. Edit it without touching the others:
 *  - size:   overall dimensions in metres; the shell, floors and ducts are generated from it
 *  - stops:  the numbered points visitors select. `at.floor` is "roof" or a floor
 *            number (0 = ground); `at.x` is the position across the width, 0 to 1
 *  - model:  optional path to a .glb file that replaces the generated shell
 *  - build:  optional extra geometry, drawn with the kit helpers (see world.js)
 */
DMR.registerBuilding({
  id: "government-office",
  name: "Government Office",
  use: "institutional",
  size: { width: 24, depth: 16, floors: 4, floorHeight: 4, bays: 3 },
  model: null,
  intro: "Public buildings are built to last decades and are often renovated while occupied.",
  challenges: ["Long service life", "Renovation in occupied buildings", "Energy targets"],
  stops: [
    { id: "government-office-1", at: { floor: "roof", x: 0.4 }, title: "Custom air handlers", room: "",
      text: "Air handlers built in sections fit through existing openings for replacement work.",
      products: ["ventrol-ahu", "temtrol-ahu"] },
    { id: "government-office-2", at: { floor: 2, x: 0.5 }, title: "Office floors", room: "Office",
      text: "Chilled beams and VAV terminals serve the floors with low fan energy.",
      products: ["nuclimate-beam", "envirotec-vav"] },
    { id: "government-office-3", at: { floor: 0, x: 0.83 }, title: "Mechanical room", room: "Mech",
      text: "Freeze-resistant coils and drives modernize the existing plant.",
      products: ["cooney-coil", "fuji-vfd", "sterling-hydronic"] }
  ]
});
