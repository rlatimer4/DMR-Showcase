/*
 * Hospital — building model.
 *
 * This file is one self-contained building. Edit it without touching the others:
 *  - size:   overall dimensions in metres; the shell, floors and ducts are generated from it
 *  - stops:  the numbered points visitors select. `at.floor` is "roof" or a floor
 *            number (0 = ground); `at.x` is the position across the width, 0 to 1
 *  - model:  optional path to a .glb file that replaces the generated shell
 *  - build:  optional extra geometry, drawn with the kit helpers (see world.js)
 */
DMR.registerBuilding({
  id: "hospital",
  name: "Hospital",
  use: "institutional",
  size: { width: 27, depth: 16, floors: 4, floorHeight: 4.4, bays: 3 },
  model: null,
  intro: "Hospitals run around the clock and cannot lose airflow, so the equipment is chosen for redundancy and infection control.",
  challenges: ["No downtime for air systems", "Infection control", "Humidity limits in surgical spaces"],
  stops: [
    { id: "hospital-1", at: { floor: "roof", x: 0.38 }, title: "Rooftop air handling", room: "",
      text: "Custom air handlers with fan arrays keep air moving through a fan failure. UV-C fixtures keep the cooling coils clean.",
      products: ["temtrol-ahu", "huntair-fanwall", "uvr-coil"] },
    { id: "hospital-2", at: { floor: 2, x: 0.17 }, title: "Operating suite", room: "OR",
      text: "A single ceiling assembly delivers filtered air over the surgical table. Steam humidifiers hold the room within its required humidity range.",
      products: ["huntair-cleansuite", "steamovap-humid", "uvr-air"] },
    { id: "hospital-3", at: { floor: 1, x: 0.83 }, title: "Patient rooms", room: "Patient",
      text: "Quiet room-level units give each patient room its own temperature control. Flat panel radiators are easy to wipe down.",
      products: ["envirotec-fancoil", "runtal-radiator", "envirotec-vav"] },
    { id: "hospital-4", at: { floor: 0, x: 0.5 }, title: "Mechanical room", room: "Mech",
      text: "Freeze-resistant preheat coils protect outdoor air systems in winter. Variable frequency drives match fan and pump speed to the load.",
      products: ["cooney-coil", "fuji-vfd"] }
  ]
});
