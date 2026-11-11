/*
 * Huntair — manufacturer and its product lines.
 *
 * Everything about this manufacturer is in this file. To stop showing it, set
 * active: false (or remove "huntair" from content/manifest.js). To retire one
 * product line, set active: false on that product or delete its block.
 * See CONTENT.md for the optional fields (specs, links, badge, photo).
 */
DMR.registerManufacturer({
  id: "huntair",
  name: "Huntair",
  active: true,
  family: "Nortek Air Solutions",
  logo: "assets/logos/Huntair.jpg",
  website: null,
  blurb: "FANWALL fan arrays, cleanroom systems and operating room air delivery.",
  products: [
    {
      id: "huntair-fanwall",
      category: "fans",
      name: "FANWALL Technology",
      summary: "An array of smaller direct-drive fans in place of one large fan. If a fan fails, the others keep the air moving.",
      features: [
        "Built-in redundancy from multiple fans",
        "Shorter air handler length than a single large fan",
        "Retrofit kits that pass through a standard doorway",
        "Lower low-frequency noise"
      ],
      photo: null
    },
    {
      id: "huntair-cleansuite",
      category: "critical",
      name: "CLEANSUITE Operating Room Systems",
      summary: "A ceiling system for hospital operating rooms that combines air delivery, lighting and equipment supports in one prefabricated assembly.",
      features: [
        "Single large diffuser over the surgical table",
        "Prefabricated modules shorten ceiling installation",
        "Integrated lighting and boom mounting"
      ],
      photo: null
    },
    {
      id: "huntair-cleanroom",
      category: "critical",
      name: "Cleanroom Air Systems",
      summary: "Recirculation and make-up air systems for cleanrooms in pharmaceutical, semiconductor and research facilities.",
      features: [
        "Fan filter units and recirculation air handlers",
        "Make-up air units with tight temperature and humidity control",
        "Designed for continuous operation"
      ],
      photo: null
    }
  ]
});
