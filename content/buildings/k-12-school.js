/*
 * K-12 School — building model.
 *
 * This file is one self-contained building. Edit it without touching the others:
 *  - size:   overall dimensions in metres; the shell, floors and ducts are generated from it
 *  - stops:  the numbered points visitors select. `at.floor` is "roof" or a floor
 *            number (0 = ground); `at.x` is the position across the width, 0 to 1
 *  - model:  optional path to a .glb file that replaces the generated shell
 *  - build:  optional extra geometry, drawn with the kit helpers (see CONTENT.md)
 * Products listed in a stop that are no longer offered are skipped automatically.
 */
DMR.registerBuilding({
  id: "k-12-school",
  name: "K-12 School",
  use: "institutional",
  size: { width: 28, depth: 16, floors: 2, floorHeight: 4.2, bays: 4 },
  model: null,
  intro: "Schools need fresh air and quiet classrooms on a public budget.",
  challenges: ["Ventilation for full classrooms", "Low noise", "Tight public budgets"],
  stops: [
    { id: "k-12-school-1", at: { floor: "roof", x: 0.5 }, title: "Dedicated outdoor air", room: "",
      text: "A dedicated outdoor air system dries and tempers ventilation air and recovers energy from the exhaust.",
      products: ["venmar-doas", "mammoth-rtu", "novelaire-wheel"] },
    { id: "k-12-school-2", at: { floor: 1, x: 0.4 }, title: "Classrooms", room: "Classroom",
      text: "Chilled beams have no fan in the room, so they run quietly. Water-source heat pumps and VRF give each classroom its own control.",
      products: ["nuclimate-beam", "mammoth-wshp", "gree-vrf"] },
    { id: "k-12-school-3", at: { floor: 0, x: 0.12 }, title: "Entrance and gym", room: "Entry",
      text: "Air curtains keep outdoor air out at busy doors. Finned tube and unit heaters cover the perimeter and the gym.",
      products: ["kampmann-curtain", "sterling-hydronic", "sterling-unit"] }
  ]
});
