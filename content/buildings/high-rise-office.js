/*
 * High-Rise Office — building model.
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
  id: "high-rise-office",
  name: "High-Rise Office",
  use: "commercial",
  size: { width: 18, depth: 16, floors: 10, floorHeight: 3.8, bays: 2, extraHeight: 13 },
  model: null,
  facade: { style: "glass", color: "#1c5f93" },
  walls: "#dfe7ee",
  intro: "Tall office buildings are leased by the floor and refit often.",
  challenges: ["Limited ceiling and shaft space", "Tenant-by-tenant flexibility", "Replacing rooftop plant on an occupied building"],
  stops: [
    { id: "high-rise-office-1", at: { floor: "roof", x: 0.45 }, title: "Rooftop plant", room: "",
      text: "A custom rooftop unit matches the existing curb and structure, so replacement does not require roof rework.",
      products: ["governair-rtu", "klingenburg-wheel"] },
    { id: "high-rise-office-2", at: { floor: 7, x: 0.25 }, title: "Open office", room: "Open office",
      text: "Chilled beams and VAV terminals condition the floor with small ducts and shallow ceilings.",
      products: ["nuclimate-beam", "envirotec-vav", "uvr-coil"] },
    { id: "high-rise-office-3", at: { floor: 4, x: 0.75 }, title: "Tenant fit-out", room: "Tenant",
      text: "VRF and mini-splits add cooling for a tenant's server closet without changing the base building system.",
      products: ["gree-vrf", "gree-mini"] },
    { id: "high-rise-office-4", at: { floor: 0, x: 0.3 }, title: "Lobby", room: "Lobby",
      text: "Trench units sit in the floor along the glass. Panel radiators and air curtains handle the entrance.",
      products: ["kampmann-trench", "runtal-radiator", "kampmann-curtain"] }
  ],
  // Shapes that make this building recognizable. See CONTENT.md for the kit.
  build: function (kit, d) {
    var w = d.width, h = d.height, f = d.depth / 2;
    // glass parapet and spire
    kit.box(w, 2, 0.3, 0, h + 1, f - 0.15, "#1c5f93"); kit.box(w, 2, 0.3, 0, h + 1, -f + 0.15, "#1c5f93");
    kit.box(0.3, 2, d.depth, -w / 2 + 0.15, h + 1, 0, "#1c5f93"); kit.box(0.3, 2, d.depth, w / 2 - 0.15, h + 1, 0, "#1c5f93");
    kit.cyl(0.2, 0.45, 12, 6, h + 6, -5, "dark");
    kit.cyl(0.4, 0.4, 0.5, 6, h + 12.2, -5, "#d62828");
  }
});
