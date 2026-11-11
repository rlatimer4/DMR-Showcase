/*
 * Higher Education — building model.
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
  id: "higher-education",
  name: "Higher Education",
  use: "institutional",
  size: { width: 26, depth: 16, floors: 3, floorHeight: 4.4, bays: 3 },
  model: null,
  intro: "Campus buildings mix classrooms, labs and offices under one roof.",
  challenges: ["Lab exhaust energy", "Mixed uses in one building", "Deferred maintenance"],
  stops: [
    { id: "higher-education-1", at: { floor: "roof", x: 0.4 }, title: "Lab exhaust energy recovery", room: "",
      text: "Plate exchangers recover energy from lab exhaust while keeping it separate from the supply air.",
      products: ["klingenburg-plate", "ventrol-ahu"] },
    { id: "higher-education-2", at: { floor: 2, x: 0.17 }, title: "Teaching labs", room: "Lab",
      text: "Custom air handlers and fan arrays supply the high air change rates labs need.",
      products: ["nortek-ahu", "huntair-fanwall"] },
    { id: "higher-education-3", at: { floor: 1, x: 0.5 }, title: "Lecture halls", room: "Lecture",
      text: "Chilled beams and water-source heat pumps keep lecture halls quiet.",
      products: ["nuclimate-beam", "mammoth-wshp"] },
    { id: "higher-education-4", at: { floor: 0, x: 0.83 }, title: "Mechanical room", room: "Mech",
      text: "Freeze-resistant coils replace failed preheat coils in existing air handlers.",
      products: ["cooney-coil", "fuji-vfd"] }
  ]
});
