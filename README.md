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
| Walkthrough | A real-time 3D world of building types in four use types (commercial, institutional, industrial, residential). Selecting a building shows what a DMR package brings to it and opens it as a cutaway; selecting a location zooms into the furnished room and lists the specific equipment. |
| Products | Catalog with search and filters for product type, building type and manufacturer. Each product opens with its own photo gallery. |
| Manufacturers | Logo tiles; selecting one filters the catalog to that manufacturer's full range. |
| Installations | Google Map of installed equipment, filterable by manufacturer and building type. |
| Gallery | Photo grid (placeholders). |
| Project list | Visitors collect products and email the list to DMR. Saved in the browser. |

## Changing content

All content is in the `content/` folder. The wording for every building and
product is in plain text files (`content/text/`) that anyone can edit without
programming. **[CONTENT.md](CONTENT.md) has step-by-step instructions** for
editing text, adding product photos, and adding or dropping a manufacturer,
product line, product type, building or map pin.

Two tools help:

- `?check=1` shows a report of anything inconsistent in the content.
- `?edit=1` turns on the map pin editor.

When a manufacturer or product is removed, everything that referred to it
(building locations, map pins, gallery links, filters) adjusts automatically.

## How it is organised

```
index.html
content/            everything editable (see CONTENT.md)
assets/js/core.js   loads the content, reconciles it, starts the site
assets/js/app.js    catalog, manufacturers, gallery, project list
assets/js/tour.js   walkthrough panel and tour state
assets/js/scene3d.js  3D world (three.js)
assets/js/props3d.js  room furnishings and equipment models for the 3D world
assets/js/map.js    Google Map and pin editor
assets/css/styles.css
assets/logos, photos, models, vendor
```

The map uses the Google Maps JavaScript API. Put your key in
`DMR.mapConfig.googleMapsApiKey` in `content/settings.js` and restrict it to your
website's domain. Without a key the map loads with Google's "for development
purposes only" overlay.

## Before launch

- Product descriptions and building text are draft copy and need DMR review.
- Installations are sample records, not real projects.
- Product photos were collected from the manufacturers' public product pages and
  dmr-hvac.com. `assets/photos/SOURCES.md` lists where each one came from. Confirm
  usage rights with each manufacturer before launch.
- Product summaries were written from the manufacturers' published pages and need
  DMR review. Klingenburg, Rapid Engineering, Runtal and most Redd-i lines could not
  be read online and use one general image each.
- The Residential district has one building (Multifamily Residential) that we
  added; the other 26 building types follow Nortek World's list.
- The building models are simple generated shapes. For render-quality visuals,
  commission `.glb` models and drop them in (see CONTENT.md).
- Manufacturer logos were copied from dmr-hvac.com; confirm usage rights.
