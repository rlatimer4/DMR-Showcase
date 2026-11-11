/*
 * Venmar CES — manufacturer and its product lines.
 *
 * Everything about this manufacturer is in this file. To stop showing it, set
 * active: false (or remove "venmar" from content/manifest.js). To retire one
 * product line, set active: false on that product or delete its block.
 * See CONTENT.md for the optional fields (specs, links, badge, photo).
 */
DMR.registerManufacturer({
  id: "venmar",
  name: "Venmar CES",
  active: true,
  family: "Nortek Air Solutions",
  logo: "assets/logos/Venmar.jpg",
  website: null,
  blurb: "Energy recovery ventilators and dedicated outdoor air systems.",
  products: [
    {
      id: "venmar-erv",
      category: "recovery",
      name: "Energy Recovery Ventilators",
      summary: "Ventilators that transfer heat and moisture from exhaust air to incoming outdoor air, reducing the load on the main system.",
      features: [
        "Wheel and plate heat exchanger options",
        "Indoor and outdoor units",
        "Reduces heating and cooling plant size"
      ],
      photo: null
    },
    {
      id: "venmar-doas",
      category: "recovery",
      name: "Dedicated Outdoor Air Systems",
      summary: "Units that condition 100% outdoor air and deliver it dry and neutral, so zone equipment handles only the sensible load.",
      features: [
        "Energy recovery with integral cooling and heating",
        "Dehumidifies ventilation air before it reaches the space",
        "Pairs with chilled beams, VRF and water-source heat pumps"
      ],
      photo: null
    }
  ]
});
