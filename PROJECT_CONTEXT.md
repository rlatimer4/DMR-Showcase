# Project context

A summary of what this project is, how it is organised, the decisions made so
far and what is still open. Read this first when picking the work up again.

## Project

An interactive product showcase website for DMR Associates, Inc., an HVAC
manufacturers' representative in Gaithersburg, MD serving DC, Maryland and
Virginia. It is a static site with no build step.

- **Run it**: `python3 -m http.server 8000` from the repo root, then open
  http://localhost:8000. The 3D view needs http; it will not load from a file
  opened from disk.
- **Guides**: `README.md` (overview) and `CONTENT.md` (how to change content).

## What the site has

- **3D walkthrough** (three.js): 28 building types in Commercial, Institutional,
  Industrial and Residential districts, laid out in one row.
  - Selecting a building shows "What a DMR package brings" and opens it as a cutaway.
  - Selecting a room zooms in; selecting an equipment model opens its product
    window. Every model in the open room carries a name tag, and the tag of the
    model being shown is highlighted.
  - Each model stands for a type of equipment. The panel lists every other
    product line that fits the same role under it, and each building lists the
    lines that suit it but have no model there, so no applicable product is missed.
  - Zoom, reset and full-screen buttons sit on the view.
- **Catalog**: 171 product lines from 20 manufacturers, filterable by product
  type, building type and manufacturer. Each product has a photo gallery.
- **Manufacturers**: logo tiles styled like dmr-hvac.com.
- **Installations**: Google Map with pins filterable by manufacturer; pin editor
  at `?edit=1`. The 16 pins are sample data.
- **Project list**: visitors collect products and email them to DMR.
- **Styling**: matches dmr-hvac.com (Montserrat, Roboto, Roboto Condensed; blue
  `#1779ba`, charcoal `#282c39`, amber accents).

## How content is organised

Everything editable is in `content/`.

| Path | Holds |
| --- | --- |
| `content/manifest.js` | The list of manufacturers and buildings that are shown |
| `content/text/buildings/<id>.txt` | Plain-text wording, advantages and equipment list for each building |
| `content/text/products/<id>.txt` | Plain-text wording and photo list for each product |
| `content/manufacturers/<id>.js` | Each product's `category` and 3D `shape` |
| `content/buildings/<id>.js` | Each building's 3D model: size, facade, room positions, custom shapes |
| `content/categories.js`, `installs.js`, `gallery.js`, `settings.js` | Product types, map pins, gallery, company details and map key |

Code is in `assets/js/`: `core.js` loads and reconciles the content, `app.js`
runs the catalog, `tour.js` the walkthrough panel, `scene3d.js` the 3D world,
`props3d.js` the room furnishings and equipment models, and `map.js` the map.

`?check=1` shows a content report. Removing a manufacturer or product never
breaks the site: anything that referred to it is skipped.

## Decisions made by DMR

- No AirBox, Airedale, NuClimate or Fuji Electric.
- No counts or index numbers on the site.
- The world stays in one horizontal row.
- Kampmann: North American range only (kampmann.ca). The German site lists
  products that are not sold in the US.
- Mammoth: VAV self-contained, rooftop and heat pump units only. Nothing unitary
  in the 1 to 6 ton range.
- Huntair cleanroom: CleanPak fan filter units and ceiling grid systems only.
  CleanPak can have a sensible cooling coil on the side, sometimes called
  PlenPak. CLEANSUITE is discontinued.
- Governair: no knockdown or washdown units; construction is similar to
  Temtrol's. Ventrol has knockdown and washdown units.
- Air rotation units are a Temtrol line and are typically placed at the end of
  warehouse aisles. Rapid Engineering no longer makes them and lists make-up air only.
- A building may show several system designs that would not coexist in a real
  building (VAV, fan coil, VRF and so on). Each goes in its own room.
- Equipment models are selected directly; there are no numbered markers.
- The site must be comprehensive: a visitor who opens a building type should not
  miss any product that could apply to it.
- Components (fan arrays, coils, UV-C, humidifier dispersion) are shown inside a
  see-through air handler or duct section, not loose in a room. FANWALL is drawn
  as stacked cube cells with a plug fan in each.
- Research labs (wet lab, dry lab, vivarium, clean lab) have their own building.
- **Photos**: prefer a photo of the actual product, and avoid using the same
  photo for several products where possible. This is a preference, not a strict
  rule. A shared or general photo is acceptable when nothing better exists.

## Open items

- **Z-fighting**: fixes are in (logarithmic depth buffer, slabs inset inside the
  walls, detail pieces set proud of cabinets) but were only checked in still
  screenshots. They need checking with the camera moving.
- **Photos**: 23 products currently show a placeholder, including the Governair,
  Huntair and Temtrol custom air handlers and the Ventrol washdown unit. Given
  the photo preference above, a reasonable general photo could be put back on
  these. Usage rights for all collected photos need confirming with the
  manufacturers; sources are listed in `assets/photos/SOURCES.md`.
- **Wording**: all product summaries, building advantages and equipment roles
  are draft text and need DMR review. Runtal, Klingenburg, Rapid Engineering and
  most Redd-i text was written without a manufacturer page to check against.
- **Google Maps**: needs an API key in `content/settings.js`.
- **Product coverage**: which lines are listed under each model and under each
  building's "More product lines" was filled in by rule (same kind of equipment,
  with limits for residential, lodging, healthcare and industrial lines). DMR
  should review each building's text file and remove anything that does not belong.
- **Room spacing**: the front 6 m of every room is kept clear for equipment and
  furniture sits behind it. Rooms with three large air handlers still draw them small.
- **3D models**: simple generated shapes. Any building can be replaced with an
  artist-made `.glb` file (see `CONTENT.md`).
- **Choices to confirm**:
  - which air handlers appear under each building's "Air handling options"
  - the Sterling cabinet heaters and Kampmann TOP unit heaters that replaced air curtains
  - "AcoustiFLO for low ambient applications" was read as low noise
