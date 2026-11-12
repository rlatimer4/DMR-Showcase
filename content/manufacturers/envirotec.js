/*
 * Enviro-Tec — manufacturer and its product lines.
 *
 * The words and photos for each product are in content/text/products/<id>.txt.
 * This file lists which product lines exist:
 *  - category: a product type from content/categories.js
 *  - shape:    which 3D equipment model stands for it in the buildings (see CONTENT.md)
 * To stop showing the manufacturer, remove "envirotec" from content/manifest.js.
 * To retire one product line, delete its line here.
 */
DMR.registerManufacturer({
  id: "envirotec",
  name: "Enviro-Tec",
  active: true,
  family: "Independent",
  logo: "assets/logos/enviro-tec.png",
  website: null,
  blurb: "Fan coils, blower coils and VAV terminal units.",
  products: [
    { id: "envirotec-fancoil", category: "terminal", shape: "fancoil" },
    { id: "envirotec-vav", category: "terminal", shape: "vav" }
  ]
});
