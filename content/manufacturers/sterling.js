/*
 * Sterling — manufacturer and its product lines.
 *
 * The words and photos for each product are in content/text/products/<id>.txt.
 * This file lists which product lines exist:
 *  - category: a product type from content/categories.js
 *  - shape:    which 3D equipment model stands for it in the buildings (see CONTENT.md)
 * To stop showing the manufacturer, remove "sterling" from content/manifest.js.
 * To retire one product line, delete its line here.
 */
DMR.registerManufacturer({
  id: "sterling",
  name: "Sterling",
  active: true,
  family: "Independent",
  logo: "assets/logos/sterling-hvac.png",
  website: null,
  blurb: "Unit heaters and hydronic heating products.",
  products: [
    { id: "sterling-hydronic", category: "hydronic", shape: "fintube" },
    { id: "sterling-unit", category: "heaters", shape: "unitheater" }
  ]
});
