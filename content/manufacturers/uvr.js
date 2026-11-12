/*
 * UV Resources — manufacturer and its product lines.
 *
 * The words and photos for each product are in content/text/products/<id>.txt.
 * This file lists which product lines exist:
 *  - category: a product type from content/categories.js
 *  - shape:    which 3D equipment model stands for it in the buildings (see CONTENT.md)
 * To stop showing the manufacturer, remove "uvr" from content/manifest.js.
 * To retire one product line, delete its line here.
 */
DMR.registerManufacturer({
  id: "uvr",
  name: "UV Resources",
  active: true,
  family: "Independent",
  logo: "assets/logos/UVR-logo-for-website.jpg",
  website: null,
  blurb: "UV-C fixtures for coil and air-stream disinfection.",
  products: [
    { id: "uvr-coil", category: "iaq", shape: "uv" },
    { id: "uvr-air", category: "iaq", shape: "uv" }
  ]
});
