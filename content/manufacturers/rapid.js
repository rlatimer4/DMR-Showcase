/*
 * Rapid Engineering — manufacturer and its product lines.
 *
 * The words and photos for each product are in content/text/products/<id>.txt.
 * This file lists which product lines exist:
 *  - category: a product type from content/categories.js
 *  - shape:    which 3D equipment model stands for it in the buildings (see CONTENT.md)
 * To stop showing the manufacturer, remove "rapid" from content/manifest.js.
 * To retire one product line, delete its line here.
 */
DMR.registerManufacturer({
  id: "rapid",
  name: "Rapid Engineering",
  active: true,
  family: "Independent",
  logo: "assets/logos/Rapid-Engineering.png",
  website: "http://rapidengineering.com/",
  blurb: "Direct-fired make-up air and industrial space heating.",
  products: [
    { id: "rapid-mua", category: "makeup", shape: "mua" },
    { id: "rapid-turnover", category: "makeup", shape: "turnover" }
  ]
});
