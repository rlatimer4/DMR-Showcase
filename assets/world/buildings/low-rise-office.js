/*
 * Low-Rise Office — building model.
 *
 * This file is one self-contained building. Edit it without touching the others:
 *  - size:   overall dimensions in metres; the shell, floors and ducts are generated from it
 *  - stops:  the numbered points visitors select. `at.floor` is "roof" or a floor
 *            number (0 = ground); `at.x` is the position across the width, 0 to 1
 *  - model:  optional path to a .glb file that replaces the generated shell
 *  - build:  optional extra geometry, drawn with the kit helpers (see world.js)
 */
DMR.registerBuilding({
  id: "low-rise-office",
  name: "Low-Rise Office",
  use: "commercial",
  size: { width: 24, depth: 16, floors: 2, floorHeight: 4, bays: 3 },
  model: null,
  intro: "Small office buildings need simple systems that are easy to maintain.",
  challenges: ["Simple maintenance", "Low first cost", "Comfort at the perimeter"],
  stops: [
    { id: "low-rise-office-1", at: { floor: "roof", x: 0.5 }, title: "Packaged rooftop units", room: "",
      text: "Packaged rooftop units provide heating, cooling and ventilation from one cabinet.",
      products: ["mammoth-rtu", "uvr-coil"] },
    { id: "low-rise-office-2", at: { floor: 1, x: 0.5 }, title: "Office suites", room: "Suite",
      text: "VRF gives each suite its own control without large ductwork.",
      products: ["gree-vrf", "gree-mini"] },
    { id: "low-rise-office-3", at: { floor: 0, x: 0.17 }, title: "Perimeter", room: "Entry",
      text: "Finned tube and panel radiators offset heat loss at the glass.",
      products: ["sterling-hydronic", "runtal-radiator"] }
  ]
});
