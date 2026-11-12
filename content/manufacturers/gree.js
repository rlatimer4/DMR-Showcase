/*
 * GREE — manufacturer and its product lines.
 *
 * The words and photos for each product are in content/text/products/<id>.txt.
 * This file lists which product lines exist:
 *  - category: a product type from content/categories.js
 *  - shape:    which 3D equipment model stands for it in the buildings (see CONTENT.md)
 * To stop showing the manufacturer, remove "gree" from content/manifest.js.
 * To retire one product line, delete its line here.
 */
DMR.registerManufacturer({
  id: "gree",
  name: "GREE",
  active: true,
  family: "Independent",
  logo: "assets/logos/GREE-logo-v4.png",
  website: null,
  blurb: "GMV VRF systems and ductless mini-split heat pumps.",
  products: [
    { id: "gree-vrf", category: "vrf", shape: "vrf" },
    { id: "gree-mini", category: "vrf", shape: "minisplit" }
  ]
});
