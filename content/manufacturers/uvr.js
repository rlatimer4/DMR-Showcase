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
  website: "https://www.uvresources.com/",
  blurb: "UV-C fixtures, lamps and accessories for HVAC coil and air disinfection.",
  products: [
    { id: "uvr-rlm", category: "iaq", shape: "uv" },
    { id: "uvr-de", category: "iaq", shape: "uv" },
    { id: "uvr-sln", category: "iaq", shape: "uv" },
    { id: "uvr-sl", category: "iaq", shape: "uv" },
    { id: "uvr-dln", category: "iaq", shape: "uv" },
    { id: "uvr-uvk", category: "iaq", shape: "uv" },
    { id: "uvr-x-plus", category: "iaq", shape: "uv" },
    { id: "uvr-glo", category: "iaq", shape: "uv" },
    { id: "uvr-lamps", category: "iaq", shape: "uv" },
    { id: "uvr-accessories", category: "iaq", shape: "uv" }
  ]
});
