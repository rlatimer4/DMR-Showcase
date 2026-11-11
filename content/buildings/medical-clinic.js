/*
 * Medical Clinic — building model.
 *
 * This file is one self-contained building. Edit it without touching the others:
 *  - size:   overall dimensions in metres; the shell, floors and ducts are generated from it
 *  - facade, walls: the look of the outside (styles are listed in CONTENT.md)
 *  - stops:  the numbered points visitors select. `at.floor` is "roof", "yard"
 *            (a unit on the ground in front) or a floor number (0 = ground);
 *            `at.x` is the position across the width, 0 to 1
 *  - model:  optional path to a .glb file that replaces the generated shell
 *  - build:  the shapes that make this building recognizable (kit helpers are in CONTENT.md)
 * Products listed in a stop that are no longer offered are skipped automatically.
 */
DMR.registerBuilding({
  id: "medical-clinic",
  name: "Medical Clinic",
  use: "institutional",
  size: { width: 22, depth: 16, floors: 2, floorHeight: 4, bays: 3, extraHeight: 3 },
  model: null,
  facade: { style: "windows", color: "#2a8a8a" },
  walls: "#ffffff",
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
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    kit.sign("+ CLINIC", 9, 2, -5.5, h + 1.3, f - 0.4, "#ffffff", "#1a9a5a");
    kit.front(kit.box(6, 0.35, 3, 0, 3.4, f + 1.6, "#2a8a8a"));
    kit.front(kit.cyl(0.2, 0.2, 3.4, -2.6, 1.7, f + 2.9, "wall")); kit.front(kit.cyl(0.2, 0.2, 3.4, 2.6, 1.7, f + 2.9, "wall"));
  }
});
