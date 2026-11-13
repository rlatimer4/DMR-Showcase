/*
 * Fisair — manufacturer and its product lines.
 *
 * The words and photos for each product are in content/text/products/<id>.txt.
 * This file lists which product lines exist:
 *  - category: a product type from content/categories.js
 *  - shape:    which 3D equipment model stands for it in the buildings (see CONTENT.md)
 * To stop showing the manufacturer, remove "fisair" from content/manifest.js.
 * To retire one product line, delete its line here.
 */
DMR.registerManufacturer({
  id: "fisair",
  name: "Fisair",
  active: true,
  family: "Independent",
  logo: "assets/logos/Fisair-Logo-3.jpg",
  website: "https://fisair.com/",
  blurb: "Diphusair humidifiers, DF desiccant dehumidifiers and HEF evaporative coolers.",
  products: [
    { id: "fisair-fsh", category: "humid", shape: "humidifier-steam" },
    { id: "fisair-mt2", category: "humid", shape: "humidifier-steam" },
    { id: "fisair-electrode", category: "humid", shape: "humidifier" },
    { id: "fisair-resistance", category: "humid", shape: "humidifier" },
    { id: "fisair-asc", category: "humid", shape: "humidifier-exchange" },
    { id: "fisair-vxv", category: "humid", shape: "humidifier-exchange" },
    { id: "fisair-dfa", category: "dehum", shape: "dehumidifier" },
    { id: "fisair-dfog", category: "dehum", shape: "dehumidifier" },
    { id: "fisair-dfra", category: "dehum", shape: "dehumidifier" },
    { id: "fisair-dflex", category: "dehum", shape: "dehumidifier" },
    { id: "fisair-dflow", category: "dehum", shape: "dehumidifier" },
    { id: "fisair-dfrb", category: "dehum", shape: "dehumidifier" },
    { id: "fisair-dfrc", category: "dehum", shape: "dehumidifier" },
    { id: "fisair-dfrd", category: "dehum", shape: "dehumidifier" },
    { id: "fisair-dfrigo", category: "dehum", shape: "dehumidifier" },
    { id: "fisair-dfrm", category: "dehum", shape: "dehumidifier" },
    { id: "fisair-hef2e", category: "evap", shape: "evap" },
    { id: "fisair-hef3", category: "evap", shape: "evap" },
    { id: "fisair-hef7", category: "evap", shape: "evap" },
    { id: "fisair-atomspray", category: "evap", shape: "atomizer" }
  ]
});
