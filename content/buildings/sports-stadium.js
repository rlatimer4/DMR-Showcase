/*
 * Sports Stadium — building model.
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
  id: "sports-stadium",
  name: "Sports Stadium",
  use: "institutional",
  size: { width: 30, depth: 16, floors: 2, floorHeight: 6, bays: 2, extraHeight: 18 },
  model: null,
  facade: { style: "solid", color: "#6b7785", stripe: "#ffa500" },
  walls: "#7d8894",
  intro: "Stadiums sit idle most of the week and then fill in an hour.",
  challenges: ["Peak loads a few days a month", "Concourses open to the outdoors", "Premium seating expectations"],
  stops: [
    { id: "sports-stadium-1", at: { floor: "yard", x: 0.2 }, title: "Concourse air handling", room: "",
      text: "Custom rooftop systems condition clubs and concourses and turn down between events.",
      products: ["governair-rtu", "fuji-vfd"] },
    { id: "sports-stadium-2", at: { floor: 1, x: 0.7 }, title: "Suites and clubs", room: "Suite",
      text: "Fan coils and VRF give each suite its own control.",
      products: ["envirotec-fancoil", "gree-vrf"] },
    { id: "sports-stadium-3", at: { floor: 0, x: 0.25 }, title: "Locker rooms", room: "Lockers",
      text: "Energy recovery ventilators handle the high exhaust rates locker rooms need.",
      products: ["venmar-erv", "sterling-unit"] }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // seating bowl and playing field
    kit.ring(w * 0.3, w * 0.5, 5, 0, h + 2.8, 0, "slab");
    var field = kit.cyl(w * 0.3, w * 0.3, 0.3, 0, h + 0.5, 0, "#4caf50"); field.scale.z = 0.5;
    // floodlight towers
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) {
      kit.cyl(0.25, 0.3, 17, c[0] * (w / 2 - 0.8), h + 8.5, c[1] * (f - 0.8), "dark");
      kit.box(3, 1.6, 0.4, c[0] * (w / 2 - 0.8), h + 17.4, c[1] * (f - 0.8), "wall");
    });
  }
});
