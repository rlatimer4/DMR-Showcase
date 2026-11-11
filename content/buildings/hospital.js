/*
 * Hospital — building model.
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
  id: "hospital",
  name: "Hospital",
  use: "institutional",
  size: { width: 27, depth: 16, floors: 4, floorHeight: 4.4, bays: 3, extraHeight: 5 },
  model: null,
  facade: { style: "windows", color: "#3f88b5" },
  walls: "#ffffff",
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
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // helipad
    kit.disc(3, -9.5, h + 0.4, 4, "#3f4854");
    var pad = kit.sign("H", 3.2, 3.2, -9.5, h + 0.5, 4, "#3f4854", "#ffffff"); pad.rotation.x = -Math.PI / 2;
    // red cross on the roof
    kit.box(4, 4, 4, 9.5, h + 2.3, 4, "wall");
    kit.sign("+", 3.4, 3.4, 9.5, h + 2.3, 6.05, "#ffffff", "#d62828");
    var side = kit.sign("+", 3.4, 3.4, 11.55, h + 2.3, 4, "#ffffff", "#d62828"); side.rotation.y = Math.PI / 2;
    // emergency entrance and ambulance
    kit.front(kit.box(8, 0.4, 4, 7, 3.6, f + 2.1, "#d62828"));
    kit.front(kit.sign("EMERGENCY", 7.5, 1, 7, 4.4, f + 4.15, "#d62828", "#ffffff"));
    kit.box(2.2, 2.2, 5, 9, 1.3, f + 8.5, "wall"); kit.box(2.25, 0.5, 5.05, 9, 1.3, f + 8.5, "#d62828");
  }
});
