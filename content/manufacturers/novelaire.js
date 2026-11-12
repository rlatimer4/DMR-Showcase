/*
 * NovelAire — manufacturer and its product lines.
 *
 * The words and photos for each product are in content/text/products/<id>.txt.
 * This file lists which product lines exist:
 *  - category: a product type from content/categories.js
 *  - shape:    which 3D equipment model stands for it in the buildings (see CONTENT.md)
 * To stop showing the manufacturer, remove "novelaire" from content/manifest.js.
 * To retire one product line, delete its line here.
 */
DMR.registerManufacturer({
  id: "novelaire",
  name: "NovelAire",
  active: true,
  family: "Independent",
  logo: "assets/logos/NovelAire-logo-2.jpg",
  website: "https://www.novelaire.com/",
  blurb: "Energy conservation wheels, desiccant wheels and packaged dehumidification units.",
  products: [
    { id: "novelaire-ecw", category: "recovery", shape: "wheel" },
    { id: "novelaire-desiccant-wheels", category: "dehum", shape: "wheel" },
    { id: "novelaire-comfortdry", category: "dehum", shape: "dehumidifier" },
    { id: "novelaire-precisiondry", category: "dehum", shape: "dehumidifier" }
  ]
});
