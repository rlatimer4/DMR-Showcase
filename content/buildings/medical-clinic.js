/*
 * Medical Clinic — building model.
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
  id: "medical-clinic",
  name: "Medical Clinic",
  use: "institutional",
  size: { width: 22, depth: 16, floors: 2, floorHeight: 4, bays: 3 },
  model: null,
  intro: "Clinics need hospital-grade air quality on an office-building budget.",
  challenges: ["Infection control in a small building", "Quiet exam rooms", "Limited mechanical space"],
  stops: [
    { id: "medical-clinic-1", at: { floor: "roof", x: 0.5 }, title: "Rooftop unit with UV-C", room: "",
      text: "A packaged rooftop unit with UV-C keeps coils clean and air quality high.",
      products: ["mammoth-rtu", "uvr-coil"] },
    { id: "medical-clinic-2", at: { floor: 1, x: 0.5 }, title: "Exam rooms", room: "Exam",
      text: "VAV terminals with reheat hold each exam room at its setpoint.",
      products: ["envirotec-vav", "runtal-radiator"] },
    { id: "medical-clinic-3", at: { floor: 0, x: 0.83 }, title: "Procedure room", room: "Procedure",
      text: "Steam humidifiers and upper-room UV-C support minor procedures.",
      products: ["steamovap-humid", "uvr-air"] }
  ]
});
