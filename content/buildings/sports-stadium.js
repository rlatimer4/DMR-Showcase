/*
 * Sports Stadium — building model.
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
  id: "sports-stadium",
  name: "Sports Stadium",
  use: "institutional",
  size: { width: 30, depth: 16, floors: 2, floorHeight: 6, bays: 2 },
  model: null,
  intro: "Stadiums sit idle most of the week and then fill in an hour.",
  challenges: ["Peak loads a few days a month", "Concourses open to the outdoors", "Premium seating expectations"],
  stops: [
    { id: "sports-stadium-1", at: { floor: "roof", x: 0.2 }, title: "Concourse air handling", room: "",
      text: "Custom rooftop systems condition clubs and concourses and turn down between events.",
      products: ["governair-rtu", "fuji-vfd"] },
    { id: "sports-stadium-2", at: { floor: 1, x: 0.7 }, title: "Suites and clubs", room: "Suite",
      text: "Fan coils and VRF give each suite its own control.",
      products: ["envirotec-fancoil", "gree-vrf"] },
    { id: "sports-stadium-3", at: { floor: 0, x: 0.25 }, title: "Locker rooms", room: "Lockers",
      text: "Energy recovery ventilators handle the high exhaust rates locker rooms need.",
      products: ["venmar-erv", "sterling-unit"] }
  ],
  build: function (kit, d) {
    kit.ring(d.width * 0.36, d.width * 0.5, 7, 0, d.height + 3.6, 1, "slab");
  }
});
