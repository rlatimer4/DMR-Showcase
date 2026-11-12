/*
 * Redd-i — manufacturer and its product lines.
 *
 * The words and photos for each product are in content/text/products/<id>.txt.
 * This file lists which product lines exist:
 *  - category: a product type from content/categories.js
 *  - shape:    which 3D equipment model stands for it in the buildings (see CONTENT.md)
 * To stop showing the manufacturer, remove "reddi" from content/manifest.js.
 * To retire one product line, delete its line here.
 */
DMR.registerManufacturer({
  id: "reddi",
  name: "Redd-i",
  active: true,
  family: "Independent",
  logo: "assets/logos/reddi.png",
  website: null,
  blurb: "Duct heaters, VAV systems and electric unit and wall heaters, built in the USA.",
  products: [
    { id: "reddi-line", category: "electric", shape: "ductheater" }
  ]
});
