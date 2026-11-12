/*
 * Kampmann — manufacturer and its product lines.
 *
 * The words and photos for each product are in content/text/products/<id>.txt.
 * This file lists which product lines exist:
 *  - category: a product type from content/categories.js
 *  - shape:    which 3D equipment model stands for it in the buildings (see CONTENT.md)
 * To stop showing the manufacturer, remove "kampmann" from content/manifest.js.
 * To retire one product line, delete its line here.
 */
DMR.registerManufacturer({
  id: "kampmann",
  name: "Kampmann",
  active: true,
  family: "Independent",
  logo: "assets/logos/Kampmann.png",
  website: "https://www.kampmann.ca/en-CA",
  blurb: "Katherm trench units, fan coils, perimeter heating and unit heaters.",
  products: [
    { id: "kampmann-katherm-hk", category: "hydronic", shape: "trench" },
    { id: "kampmann-katherm-qk", category: "hydronic", shape: "trench" },
    { id: "kampmann-katherm-qk-nano", category: "hydronic", shape: "trench" },
    { id: "kampmann-katherm-nk", category: "hydronic", shape: "trench" },
    { id: "kampmann-katherm-qe", category: "hydronic", shape: "trench" },
    { id: "kampmann-top", category: "heaters", shape: "unitheater" },
    { id: "kampmann-perimeter", category: "hydronic", shape: "fintube" },
    { id: "kampmann-kadius", category: "terminal", shape: "cassette" },
    { id: "kampmann-venkon", category: "terminal", shape: "fancoil" },
    { id: "kampmann-venkon-xl", category: "terminal", shape: "fancoil" },
    { id: "kampmann-kadeck", category: "terminal", shape: "fancoil" },
    { id: "kampmann-powerkon", category: "terminal", shape: "radiator" },
    { id: "kampmann-baseboard", category: "hydronic", shape: "fintube" }
  ]
});
