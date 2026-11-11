/*
 * Temtrol — manufacturer and its product lines.
 *
 * Everything about this manufacturer is in this file. To stop showing it, set
 * active: false (or remove "temtrol" from content/manifest.js). To retire one
 * product line, set active: false on that product or delete its block.
 * See CONTENT.md for the optional fields (specs, links, badge, photo).
 */
DMR.registerManufacturer({
  id: "temtrol",
  name: "Temtrol",
  active: true,
  family: "Nortek Air Solutions",
  logo: "assets/logos/Temtrol.jpg",
  website: null,
  blurb: "Custom air handlers for institutional and healthcare projects.",
  products: [
    {
      id: "temtrol-ahu",
      category: "ahu",
      name: "Custom Air Handlers",
      summary: "Air handlers engineered unit by unit, for projects where a catalog cabinet will not fit the load or the room.",
      features: [
        "Built to project dimensions, including knock-down construction for existing buildings",
        "Indoor and outdoor casings with custom coil, filter and fan sections",
        "Pairs with FANWALL arrays for redundancy"
      ],
      photo: null
    }
  ]
});
