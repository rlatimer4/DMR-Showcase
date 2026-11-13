/*
 * Enviro-Tec — manufacturer and its product lines.
 *
 * The words and photos for each product are in content/text/products/<id>.txt.
 * This file lists which product lines exist:
 *  - category: a product type from content/categories.js
 *  - shape:    which 3D equipment model stands for it in the buildings (see CONTENT.md)
 * To stop showing the manufacturer, remove "envirotec" from content/manifest.js.
 * To retire one product line, delete its line here.
 */
DMR.registerManufacturer({
  id: "envirotec",
  name: "Enviro-Tec",
  active: true,
  family: "Independent",
  logo: "assets/logos/enviro-tec.png",
  website: "https://www.enviro-tec.com/",
  blurb: "Air handlers, blower coils, fan coils and VAV terminals, including sensible cooling DOAS VAVs.",
  products: [
    { id: "envirotec-mql", category: "ahu", shape: "ahu" },
    { id: "envirotec-hdd", category: "terminal", shape: "blowercoil" },
    { id: "envirotec-vb", category: "terminal", shape: "blowercoil-vertical" },
    { id: "envirotec-vh", category: "terminal", shape: "fancoil-hirise" },
    { id: "envirotec-hp", category: "terminal", shape: "fancoil" },
    { id: "envirotec-vf", category: "terminal", shape: "fancoil-floor" },
    { id: "envirotec-crb", category: "terminal", shape: "vav-fan" },
    { id: "envirotec-sdr", category: "terminal", shape: "vav" },
    { id: "envirotec-vfr", category: "terminal", shape: "vav-fan" },
    { id: "envirotec-ddc", category: "controls", shape: "box" },
    { id: "envirotec-hl", category: "terminal", shape: "fancoil-low" },
    { id: "envirotec-cdv", category: "terminal", shape: "fancoil-vertical" },
    { id: "envirotec-vl", category: "terminal", shape: "fancoil-floor-low" },
    { id: "envirotec-piping", category: "controls", shape: "box" },
    { id: "envirotec-crc", category: "terminal", shape: "vav-cooling" },
    { id: "envirotec-cfl-cc", category: "terminal", shape: "vav-cooling" },
    { id: "envirotec-cfl", category: "terminal", shape: "vav-fan" },
    { id: "envirotec-crq", category: "terminal", shape: "vav-fan" },
    { id: "envirotec-sdl", category: "terminal", shape: "vav" },
    { id: "envirotec-vfl", category: "terminal", shape: "vav-fan" },
    { id: "envirotec-sgx", category: "terminal", shape: "vav" },
    { id: "envirotec-rft", category: "controls", shape: "box" },
    { id: "envirotec-pneumatic", category: "controls", shape: "box" }
  ]
});
