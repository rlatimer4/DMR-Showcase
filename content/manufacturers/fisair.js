/*
 * Fisair — manufacturer and its product lines.
 *
 * Everything about this manufacturer is in this file. To stop showing it, set
 * active: false (or remove "fisair" from content/manifest.js). To retire one
 * product line, set active: false on that product or delete its block.
 * See CONTENT.md for the optional fields (specs, links, badge, photo).
 */
DMR.registerManufacturer({
  id: "fisair",
  name: "Fisair",
  active: true,
  family: "Independent",
  logo: "assets/logos/Fisair-Logo-3.jpg",
  website: null,
  blurb: "Humidifiers and desiccant dehumidifiers.",
  products: [
    {
      id: "fisair-humid",
      category: "humidity",
      name: "Humidifiers",
      summary: "Isothermal (steam) and adiabatic (evaporative) humidifiers for comfort and process applications.",
      features: [
        "Steam and evaporative technologies",
        "Duct, air handler and direct-room dispersion",
        "Adiabatic options with low energy use"
      ],
      photo: null
    },
    {
      id: "fisair-dehum",
      category: "humidity",
      name: "Desiccant Dehumidifiers",
      summary: "Desiccant rotor dehumidifiers for spaces that need low humidity, including storage and process rooms.",
      features: [
        "Holds low dew points that cooling coils cannot reach",
        "Standalone and air-handler-integrated units",
        "Electric, steam and gas reactivation"
      ],
      photo: null
    }
  ]
});
