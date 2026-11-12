/*
 * Cooney Technologies — manufacturer and its product lines.
 *
 * The words and photos for each product are in content/text/products/<id>.txt.
 * This file lists which product lines exist:
 *  - category: a product type from content/categories.js
 *  - shape:    which 3D equipment model stands for it in the buildings (see CONTENT.md)
 * To stop showing the manufacturer, remove "cooney" from content/manifest.js.
 * To retire one product line, delete its line here.
 */
DMR.registerManufacturer({
  id: "cooney",
  name: "Cooney Technologies",
  active: true,
  family: "Independent",
  logo: "assets/logos/Cooney-Logo.jpg",
  website: null,
  blurb: "Freeze-resistant heating and cooling coils.",
  products: [
    { id: "cooney-coil", category: "coils", shape: "coil" }
  ]
});
