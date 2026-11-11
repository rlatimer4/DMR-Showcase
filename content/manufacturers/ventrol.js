/*
 * Ventrol — manufacturer and its product lines.
 *
 * Everything about this manufacturer is in this file. To stop showing it, set
 * active: false (or remove "ventrol" from content/manifest.js). To retire one
 * product line, set active: false on that product or delete its block.
 * See CONTENT.md for the optional fields (specs, links, badge, photo).
 */
DMR.registerManufacturer({
  id: "ventrol",
  name: "Ventrol",
  active: true,
  family: "Nortek Air Solutions",
  logo: "assets/logos/Ventrol.jpg",
  website: null,
  blurb: "Custom air handling units for commercial and institutional buildings.",
  products: [
    {
      id: "ventrol-ahu",
      category: "ahu",
      name: "Custom Air Handling Units",
      summary: "Custom air handling units for commercial and institutional buildings, with energy recovery built into the cabinet when the project calls for it.",
      features: [
        "Custom cabinet sizes and component arrangements",
        "Integrated energy recovery options",
        "Indoor and rooftop configurations"
      ],
      photo: null
    }
  ]
});
