/*
 * Nortek Air Solutions — manufacturer and its product lines.
 *
 * Everything about this manufacturer is in this file. To stop showing it, set
 * active: false (or remove "nortek" from content/manifest.js). To retire one
 * product line, set active: false on that product or delete its block.
 * See CONTENT.md for the optional fields (specs, links, badge, photo).
 */
DMR.registerManufacturer({
  id: "nortek",
  name: "Nortek Air Solutions",
  active: true,
  family: "Nortek Air Solutions",
  logo: "assets/logos/nortek.png",
  website: null,
  blurb: "Parent of the Governair, Huntair, Mammoth, Temtrol, Venmar CES and Ventrol brands, with custom air handling and data center cooling.",
  products: [
    {
      id: "nortek-ahu",
      category: "ahu",
      name: "Engineered Air Handling Systems",
      summary: "Engineering support across the Nortek Air Solutions brands, so one team carries a project from selection through startup.",
      features: [
        "Single source for custom air handling across brands",
        "Application engineering for healthcare, labs and mission critical",
        "Factory testing options"
      ],
      photo: null
    },
    {
      id: "nortek-dc",
      category: "critical",
      name: "Data Center Cooling",
      summary: "Cooling for data halls, from computer room air handlers to liquid cooling systems for high-density racks.",
      features: [
        "Computer room air handlers (CRAH) and fan wall units",
        "StatePoint liquid cooling technology",
        "ServerCool liquid cooling products for high-density racks"
      ],
      photo: null
    }
  ]
});
