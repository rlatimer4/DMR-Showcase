/*
 * Venmar CES — manufacturer and its product lines.
 *
 * The words and photos for each product are in content/text/products/<id>.txt.
 * This file lists which product lines exist:
 *  - category: a product type from content/categories.js
 *  - shape:    which 3D equipment model stands for it in the buildings (see CONTENT.md)
 * To stop showing the manufacturer, remove "venmar" from content/manifest.js.
 * To retire one product line, delete its line here.
 */
DMR.registerManufacturer({
  id: "venmar",
  name: "Venmar CES",
  active: true,
  family: "Nortek Air Solutions",
  logo: "assets/logos/Venmar.jpg",
  website: "https://www.nortekair.com/about/our-brands/venmar/",
  blurb: "EnergyPack custom HVAC solutions, energy recovery units and air-source heat pumps.",
  products: [
    { id: "venmar-energypack", category: "recovery", shape: "erv" },
    { id: "venmar-erv", category: "recovery", shape: "erv" },
    { id: "venmar-ashp", category: "heatpump", shape: "rooftop" }
  ]
});
