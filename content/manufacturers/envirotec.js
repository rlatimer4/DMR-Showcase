/*
 * Enviro-Tec — manufacturer and its product lines.
 *
 * Everything about this manufacturer is in this file. To stop showing it, set
 * active: false (or remove "envirotec" from content/manifest.js). To retire one
 * product line, set active: false on that product or delete its block.
 * See CONTENT.md for the optional fields (specs, links, badge, photo).
 */
DMR.registerManufacturer({
  id: "envirotec",
  name: "Enviro-Tec",
  active: true,
  family: "Independent",
  logo: "assets/logos/enviro-tec.png",
  website: null,
  blurb: "Fan coils, blower coils and VAV terminal units.",
  products: [
    {
      id: "envirotec-fancoil",
      category: "terminal",
      name: "Fan Coil & Blower Coil Units",
      summary: "Room-level heating and cooling units in horizontal, vertical and high-rise stack configurations.",
      features: [
        "Horizontal, vertical and vertical-stack models",
        "Two-pipe and four-pipe coils",
        "Blower coils for higher static applications"
      ],
      photo: null
    },
    {
      id: "envirotec-vav",
      category: "terminal",
      name: "VAV Terminal Units",
      summary: "Single-duct and fan-powered terminals that vary airflow to each zone.",
      features: [
        "Single-duct, series and parallel fan-powered boxes",
        "Hot water and electric reheat",
        "Factory-mounted controls options"
      ],
      photo: null
    }
  ]
});
