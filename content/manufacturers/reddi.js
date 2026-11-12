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
  website: "https://www.redd-i.com/",
  blurb: "Electric duct, unit and wall heaters, controls and ventilation.",
  products: [
    { id: "reddi-duct-heaters", category: "electric", shape: "ductheater" },
    { id: "reddi-unit-heaters", category: "electric", shape: "unitheater" },
    { id: "reddi-controls", category: "controls", shape: "box" },
    { id: "reddi-ventilation", category: "heaters", shape: "unitheater" }
  ]
});
