/*
 * Nortek Air Solutions — manufacturer and its product lines.
 *
 * The words and photos for each product are in content/text/products/<id>.txt.
 * This file lists which product lines exist:
 *  - category: a product type from content/categories.js
 *  - shape:    which 3D equipment model stands for it in the buildings (see CONTENT.md)
 * To stop showing the manufacturer, remove "nortek" from content/manifest.js.
 * To retire one product line, delete its line here.
 */
DMR.registerManufacturer({
  id: "nortek",
  name: "Nortek Air Solutions",
  active: true,
  family: "Nortek Air Solutions",
  logo: "assets/logos/nortek.png",
  website: "https://www.nortekair.com/",
  blurb: "Make-up air, air rotation and low humidity units, coils, and data center cooling.",
  products: [
    { id: "nortek-mua", category: "makeup", shape: "mua" },
    { id: "nortek-air-rotation", category: "makeup", shape: "turnover" },
    { id: "nortek-low-humidity", category: "dehum", shape: "dehumidifier" },
    { id: "nortek-water-coils", category: "coils", shape: "coil" },
    { id: "nortek-dx-coils", category: "coils", shape: "coil" },
    { id: "nortek-steam-coils", category: "coils", shape: "coil" },
    { id: "nortek-steam-distributing-coils", category: "coils", shape: "coil" },
    { id: "nortek-booster-coils", category: "coils", shape: "coil" },
    { id: "nortek-statepoint", category: "datacenter", shape: "chiller" },
    { id: "nortek-cdu", category: "datacenter", shape: "crah" },
    { id: "nortek-coilwall", category: "datacenter", shape: "fanwall" }
  ]
});
