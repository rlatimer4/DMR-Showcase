/*
 * Hotel — building model.
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
  id: "hotel",
  name: "Hotel",
  use: "commercial",
  size: { width: 20, depth: 16, floors: 7, floorHeight: 3.6, bays: 2, extraHeight: 4 },
  model: null,
  facade: { style: "windows", color: "#8c5a44" },
  walls: "#efe6da",
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
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    kit.sign("HOTEL", 9, 3, 4.5, h + 2.2, f - 0.5, "#c0392b", "#ffffff");
    kit.box(0.3, 2, 0.3, 1.5, h + 1, f - 0.6, "dark"); kit.box(0.3, 2, 0.3, 7.5, h + 1, f - 0.6, "dark");
    // entrance canopy
    kit.front(kit.box(9, 0.4, 5, 0, 4, f + 2.6, "#c0392b"));
    kit.front(kit.cyl(0.25, 0.25, 4, -4, 2, f + 4.6, "wall")); kit.front(kit.cyl(0.25, 0.25, 4, 4, 2, f + 4.6, "wall"));
  }
});
