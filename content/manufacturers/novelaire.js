/*
 * NovelAire — manufacturer and its product lines.
 *
 * Everything about this manufacturer is in this file. To stop showing it, set
 * active: false (or remove "novelaire" from content/manifest.js). To retire one
 * product line, set active: false on that product or delete its block.
 * See CONTENT.md for the optional fields (specs, links, badge, photo).
 */
DMR.registerManufacturer({
  id: "novelaire",
  name: "NovelAire",
  active: true,
  family: "Independent",
  logo: "assets/logos/NovelAire-logo-2.jpg",
  website: null,
  blurb: "Desiccant dehumidification and energy recovery wheels.",
  products: [
    {
      id: "novelaire-wheel",
      category: "recovery",
      name: "Energy Recovery Wheels & Cassettes",
      summary: "Desiccant-coated energy recovery wheels and cassettes for new equipment and wheel replacement.",
      features: [
        "Total energy (heat and moisture) recovery",
        "Cassettes for OEM and field replacement",
        "Range of sizes"
      ],
      photo: null
    },
    {
      id: "novelaire-desiccant",
      category: "humidity",
      name: "Desiccant Dehumidification Systems",
      summary: "Packaged desiccant systems for humidity control independent of temperature.",
      features: [
        "Desiccant wheel systems with pre- and post-cooling",
        "Dry rooms, ice rinks, pools and archives",
        "Custom units for process loads"
      ],
      photo: null
    }
  ]
});
