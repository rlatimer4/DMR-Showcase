/*
 * Kampmann — manufacturer and its product lines.
 *
 * Everything about this manufacturer is in this file. To stop showing it, set
 * active: false (or remove "kampmann" from content/manifest.js). To retire one
 * product line, set active: false on that product or delete its block.
 * See CONTENT.md for the optional fields (specs, links, badge, photo).
 */
DMR.registerManufacturer({
  id: "kampmann",
  name: "Kampmann",
  active: true,
  family: "Independent",
  logo: "assets/logos/Kampmann.png",
  website: null,
  blurb: "Trench heating and cooling, air curtains and unit heaters.",
  products: [
    {
      id: "kampmann-trench",
      category: "terminal",
      name: "Trench Heating & Cooling",
      summary: "Floor-recessed convectors that heat and cool along full-height glass without interrupting the view.",
      features: [
        "Natural convection and fan-assisted models",
        "Heating-only and heating/cooling versions",
        "Grilles in multiple finishes"
      ],
      photo: null
    },
    {
      id: "kampmann-curtain",
      category: "terminal",
      name: "Air Curtains",
      summary: "Air curtains that separate indoor and outdoor air at entrances and dock doors.",
      features: [
        "Exposed and recessed models",
        "Hot water and electric heat",
        "Sizes for pedestrian entrances and industrial doors"
      ],
      photo: null
    }
  ]
});
