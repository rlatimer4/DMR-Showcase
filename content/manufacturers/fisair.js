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
  website: null,
  blurb: "Humidifiers and desiccant dehumidifiers.",
  products: [
    { id: "fisair-humid", category: "humid", shape: "humidifier" },
    { id: "fisair-dehum", category: "dehum", shape: "dehumidifier" }
  ]
});
