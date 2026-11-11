/*
 * Hotel — building model.
 *
 * This file is one self-contained building. Edit it without touching the others:
 *  - size:   overall dimensions in metres; the shell, floors and ducts are generated from it
 *  - stops:  the numbered points visitors select. `at.floor` is "roof" or a floor
 *            number (0 = ground); `at.x` is the position across the width, 0 to 1
 *  - model:  optional path to a .glb file that replaces the generated shell
 *  - build:  optional extra geometry, drawn with the kit helpers (see world.js)
 */
DMR.registerBuilding({
  id: "hotel",
  name: "Hotel",
  use: "commercial",
  size: { width: 20, depth: 16, floors: 7, floorHeight: 3.6, bays: 2 },
  model: null,
  intro: "Every guest room needs quiet, individual control, and the corridors need fresh air.",
  challenges: ["Quiet guest rooms", "Individual room control", "Ventilation for corridors and bathrooms"],
  stops: [
    { id: "hotel-1", at: { floor: "roof", x: 0.45 }, title: "Corridor ventilation", room: "",
      text: "A dedicated outdoor air system feeds corridors and guest rooms with dry, tempered air.",
      products: ["venmar-doas", "novelaire-wheel"] },
    { id: "hotel-2", at: { floor: 4, x: 0.25 }, title: "Guest rooms", room: "Guest room",
      text: "Vertical-stack fan coils or VRF give each room its own control.",
      products: ["envirotec-fancoil", "gree-vrf", "runtal-radiator"] },
    { id: "hotel-3", at: { floor: 0, x: 0.3 }, title: "Lobby", room: "Lobby",
      text: "Trench units sit in the floor along the glass and air curtains protect the entrance.",
      products: ["kampmann-trench", "kampmann-curtain"] }
  ]
});
