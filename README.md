# DMR Showcase

Interactive product showcase for DMR Associates, Inc., an HVAC manufacturers'
representative serving DC, Maryland and Virginia. Styling follows dmr-hvac.com
(Montserrat, Roboto and Roboto Condensed; DMR blue, charcoal, slate and amber).

This is a prototype. It is a static site with no build step.

## Run it

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. Any static host (GitHub Pages, Netlify, S3) works.
The 3D view needs the site served over http(s); opening `index.html` from disk will not load it.

## What is in it

| Section | What it does |
| --- | --- |
| Walkthrough | A real-time 3D world of 27 building types in four use types (commercial, institutional, industrial, residential). Selecting a building opens it as a cutaway with numbered equipment locations. |
| Products | Catalog with search and filters for system type, building type and manufacturer. |
| Manufacturers | Logo tiles; selecting one filters the catalog. |
| Installations | Google Map of installed equipment, filterable by manufacturer and building type. |
| Gallery | Photo grid (placeholders). |
| Project list | Visitors collect products and email the list to DMR. Saved in the browser. |

## The 3D world

The world is assembled from separate building models, one file each:

```
assets/world/world.js              use types, grid layout, format reference
assets/world/buildings/<id>.js     one building per file
assets/world/models/               optional .glb files from a 3D artist
assets/js/scene3d.js               loads every building into the scene
```

**Edit a building**: open its file. `size` sets the dimensions (the shell, floors
and ducts are generated from it), `stops` are the numbered points with their
products, and the optional `build()` function adds custom shapes (see the
airport, stadium, greenhouse and religious center for examples).

**Add a building**: copy a building file, change its `id` and contents, and add a
`<script>` line for it in `index.html`. It is placed in its district automatically.

**Swap in an artist-made model**: export a `.glb` to `assets/world/models/` and set
`model: "assets/world/models/<file>.glb"` in the building file. The model replaces
the generated shell; the stops still come from the building file. Conventions:
metres, origin at the centre of the footprint at ground level, front facing +Z,
and any mesh whose name starts with `Cutaway` is hidden when the building opens.

## Updating content

- **Products and manufacturers**: `assets/js/data.js` (`DMR.products`, `DMR.brands`).
  A product's building types come from the building stops that list it.
- **Photos**: put images in `assets/photos/` and set `photo: "assets/photos/<file>"`
  on a product or gallery entry. Entries with `photo: null` show a placeholder.

## The map and its pins

The map uses the Google Maps JavaScript API. Put your key in
`DMR.mapConfig.googleMapsApiKey` in `assets/js/data.js` and restrict the key to
your website's domain in the Google Cloud console. Without a key the map loads
with Google's "for development purposes only" overlay.

Pins live in `assets/js/installs.js`. Each has a name, city, coordinates,
building type, year, the `manufacturers` installed there, and optional `photos`
(image paths or URLs shown in the pin's info window).

**Pin editor**: open the site with `?edit=1` (for example
`http://localhost:8000/?edit=1#installations`). Click the map to drop a pin, tick
the manufacturers, add photo paths if you have them, and drag pins to move them.
Changes are kept in that browser only. Use **Download installs.js** and replace
`assets/js/installs.js` with the downloaded file to publish them.

## Before launch

- Product descriptions and building text are draft copy and need DMR review.
- Installations are sample records, not real projects.
- The Residential district has one building (Multifamily Residential) that we
  added; the other 26 building types follow Nortek World's list.
- The building models are simple generated shapes. For render-quality visuals,
  commission `.glb` models and drop them in as described above.
- Manufacturer logos were copied from dmr-hvac.com; confirm usage rights.
