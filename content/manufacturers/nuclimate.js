/*
 * NuClimate — manufacturer and its product lines.
 *
 * Everything about this manufacturer is in this file. To stop showing it, set
 * active: false (or remove "nuclimate" from content/manifest.js). To retire one
 * product line, set active: false on that product or delete its block.
 * See CONTENT.md for the optional fields (specs, links, badge, photo).
 */
DMR.registerManufacturer({
  id: "nuclimate",
  name: "NuClimate",
  active: true,
  family: "Independent",
  logo: null,
  website: null,
  blurb: "Chilled beams and induction units.",
  products: [
    {
      id: "nuclimate-beam",
      category: "terminal",
      name: "Chilled Beams & Induction Units",
      summary: "Ceiling units that use ventilation air to induce room air across a water coil. No fan in the space, so they run quietly.",
      features: [
        "Active chilled beams and induction units",
        "No moving parts at the zone",
        "Reduces ductwork size and ceiling depth"
      ],
      photo: null
    }
  ]
});
