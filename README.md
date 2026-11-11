# DMR Showcase

Interactive product showcase for DMR Associates, Inc. — an HVAC manufacturers'
representative serving DC, Maryland and Virginia.

This is a prototype. It is a static site with no build step.

## Run it

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. Any static host (GitHub Pages, Netlify, S3) works.

## What is in it

| Section | What it does |
| --- | --- |
| Walkthrough | A campus of six buildings drawn in cross-section. Visitors pick a building or take a 19-stop guided tour; each stop lists the equipment used there. |
| Products | Catalog of every product line with search and filters for system type, building type and manufacturer. |
| Manufacturers | One tile per manufacturer; selecting one filters the catalog. |
| Installations | Map of installed equipment with a filterable list. |
| Gallery | Photo grid. |
| Project list | Visitors collect products and email the list to DMR. Saved in the browser. |

## Updating content

All content lives in `assets/js/data.js`.

- **Products and manufacturers**: edit `DMR.products` and `DMR.brands`. Entries with
  `verify: true` show a "Details pending DMR review" label.
- **Photos**: put images in `assets/photos/` and set `photo: "assets/photos/<file>"`
  on a product or gallery entry. Entries with `photo: null` show a placeholder tile.
- **Installations**: replace the sample records in `DMR.installs`. Each needs a
  name, city, `lat`, `lng`, market, year and product ids.
- **Walkthrough**: `DMR.tour.buildings` defines each building and its stops.

## The map

`assets/js/map.js` draws the same installation records two ways:

- **Map**: a real, pannable map using Leaflet (vendored in `assets/vendor/leaflet`)
  with OpenStreetMap tiles. To use Mapbox, MapTiler or Esri instead, change
  `tiles` and `attribution` in `DMR.mapConfig`.
- **Schematic**: a self-contained drawing. The site switches to it automatically
  when map tiles cannot load.

## Before launch

- Product descriptions are draft copy and need DMR review.
- Installations are sample records, not real projects.
- Manufacturer logos and DMR brand colors have not been applied.
- OpenStreetMap's public tile server is fine for a prototype; pick a commercial
  tile provider for production traffic.
