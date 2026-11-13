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
  website: "https://www.sterlingheat.com/",
  blurb: "Finned tube, convectors, cabinet and unit heaters, radiant panels and baseboard.",
  products: [
    { id: "sterling-guardian", category: "hydronic", shape: "fintube" },
    { id: "sterling-versa-line", category: "hydronic", shape: "fintube" },
    { id: "sterling-light-commercial", category: "hydronic", shape: "fintube" },
    { id: "sterling-classic", category: "hydronic", shape: "fintube" },
    { id: "sterling-custom", category: "hydronic", shape: "fintube" },
    { id: "sterling-dura-vane", category: "hydronic", shape: "fintube" },
    { id: "sterling-convectors", category: "hydronic", shape: "cabinetheater" },
    { id: "sterling-cabinet", category: "heaters", shape: "cabinetheater" },
    { id: "sterling-unit-heaters", category: "heaters", shape: "unitheater" },
    { id: "sterling-radiant", category: "hydronic", shape: "radiantpanel" },
    { id: "sterling-panel-radiators", category: "hydronic", shape: "radiator" },
    { id: "sterling-baseboard", category: "hydronic", shape: "fintube" },
    { id: "sterling-electric-baseboard", category: "electric", shape: "fintube" }
  ]
});
