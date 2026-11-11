/*
 * Library — building model.
 *
 * This file is one self-contained building. Edit it without touching the others:
 *  - size:   overall dimensions in metres; the shell, floors and ducts are generated from it
 *  - stops:  the numbered points visitors select. `at.floor` is "roof" or a floor
 *            number (0 = ground); `at.x` is the position across the width, 0 to 1
 *  - model:  optional path to a .glb file that replaces the generated shell
 *  - build:  optional extra geometry, drawn with the kit helpers (see world.js)
 */
DMR.registerBuilding({
  id: "library",
  name: "Library",
  use: "institutional",
  size: { width: 22, depth: 16, floors: 2, floorHeight: 5, bays: 2 },
  model: null,
  intro: "Collections need stable humidity and readers need quiet.",
  challenges: ["Humidity control for collections", "Quiet reading rooms", "Daylit perimeter spaces"],
  stops: [
    { id: "library-1", at: { floor: "roof", x: 0.45 }, title: "Outdoor air system", room: "",
      text: "A dedicated outdoor air system delivers dry ventilation air so humidity stays stable.",
      products: ["venmar-doas"] },
    { id: "library-2", at: { floor: 1, x: 0.25 }, title: "Reading room", room: "Reading",
      text: "Chilled beams have no fan in the room. Panel radiators heat the perimeter.",
      products: ["nuclimate-beam", "runtal-radiator"] },
    { id: "library-3", at: { floor: 0, x: 0.75 }, title: "Archive", room: "Archive",
      text: "Desiccant dehumidifiers and humidifiers hold the archive within a narrow humidity range.",
      products: ["fisair-dehum", "fisair-humid"] }
  ]
});
