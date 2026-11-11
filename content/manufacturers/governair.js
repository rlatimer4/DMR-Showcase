/*
 * Governair — manufacturer and its product lines.
 *
 * Everything about this manufacturer is in this file. To stop showing it, set
 * active: false (or remove "governair" from content/manifest.js). To retire one
 * product line, set active: false on that product or delete its block.
 * See CONTENT.md for the optional fields (specs, links, badge, photo).
 */
DMR.registerManufacturer({
  id: "governair",
  name: "Governair",
  active: true,
  family: "Nortek Air Solutions",
  logo: "assets/logos/Governair.jpg",
  website: null,
  blurb: "Custom packaged rooftop systems and packaged chiller plants.",
  products: [
    {
      id: "governair-rtu",
      category: "packaged",
      name: "Custom Packaged Rooftop Systems",
      summary: "Rooftop units built to order, with cooling, heating and controls assembled and tested at the factory.",
      features: [
        "Custom capacities and footprints for replacement on existing curbs",
        "Air-cooled, water-cooled and evaporative-condensed options",
        "Walk-in service vestibules available"
      ],
      photo: null
    },
    {
      id: "governair-chiller",
      category: "packaged",
      name: "Packaged Chiller Plants",
      summary: "A complete chilled water plant in one weatherproof enclosure: chillers, pumps and controls, piped and wired before it ships.",
      features: [
        "Frees up indoor mechanical space",
        "Factory piping, wiring and testing",
        "Shortens site installation"
      ],
      photo: null
    }
  ]
});
