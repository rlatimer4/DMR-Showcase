# Updating the showcase

Everything you would normally change lives in the `content/` folder. You do not
need to touch the code in `assets/js/`.

```
content/
  manifest.js              the list of manufacturers and buildings that are shown
  manufacturers/<id>.js    one manufacturer and all of its product lines
  categories.js            product types (the catalog filter buttons)
  buildings/<id>.js        one building of the 3D world and its equipment stops
  installs.js              map pins
  gallery.js               gallery photos
  settings.js              company details, Google Maps key, use types
assets/logos/  assets/photos/  assets/models/     images and 3D model files
```

**After any change, open the site with `?check=1`** (for example
`http://localhost:8000/?check=1`). A report at the top of the page lists anything
that needs attention: a misspelled name, a stop left with no products, a missing logo.

The site repairs itself around missing items. If a manufacturer or product goes
away, the building stops, map pins and gallery photos that mentioned it simply
skip it. Nothing breaks, and the report tells you what was skipped.

## Manufacturers

### We now represent a new manufacturer
1. Copy any file in `content/manufacturers/` to `content/manufacturers/<newid>.js`.
2. Edit the `id`, `name`, `blurb` and the `products` list.
3. Put the logo in `assets/logos/` and set `logo` to its path (or `null` to show the name).
4. Add `"<newid>"` to the `manufacturers` list in `content/manifest.js`.
5. Optional: add its products to building stops (see Buildings) so they show in the 3D world.

### We no longer represent a manufacturer
Remove its name from `content/manifest.js`. That is the whole change.
To hide it temporarily instead, set `active: false` at the top of its file.

### A manufacturer changed its name or logo
Edit `name` or `logo` in its file. Keep the `id` the same so pins and stops still match.

## Product lines

### Add a product line
Add a block to the `products` list in the manufacturer's file:

```js
{
  id: "acme-chiller",            // unique, lowercase, no spaces
  category: "packaged",          // an id from content/categories.js
  name: "Air-Cooled Chillers",
  summary: "One or two sentences shown on the card.",
  features: ["First point", "Second point"],
  photo: null                    // or "assets/photos/acme-chiller.jpg"
}
```

### Retire a product line
Delete its block, or add `active: false` to it.

### Add more information to a product
These fields are optional. Add any of them to a product block and they appear
in its detail window:

```js
badge: "New",
specs: { "Capacity": "20 to 200 tons", "Refrigerant": "R-454B" },
links: [
  { label: "Brochure (PDF)", url: "assets/docs/acme-chiller.pdf" },
  { label: "Submittal data", url: "https://example.com/submittal" }
]
```

A manufacturer can also have `website: "https://..."`, shown as a link on each of its products.

## Product types

`content/categories.js` lists the types in the order of the catalog buttons.

- **Add a type**: add a line with a new `id`, `name` and `blurb`, then use that `id` as `category` on products.
- **Remove a type**: delete its line. If products still use it they move to "Other" and the report says so.
- A type with no products is hidden on its own, so you can leave it listed.

## Buildings (the 3D world)

Each building is one file in `content/buildings/`.

- **Change what equipment a building shows**: edit the `products` list of a stop. Use product ids.
- **Add a stop**: add a block to `stops`. `at.floor` is `"roof"` or a floor number (0 is the ground floor); `at.x` is the position across the width from 0 to 1.
- **Add a building**: copy a building file, change its `id`, `name`, `use`, `size` and `stops`, then add its name to `buildings` in `content/manifest.js`. It is placed in its district automatically.
- **Remove a building**: remove its name from `content/manifest.js`.
- **Add a use type (district)**: add a line to `DMR.useTypes` in `content/settings.js` and set `use` to its id in the building files.

`size` is in metres: `width`, `depth`, `floors`, `floorHeight`, and `bays` (rooms across each floor).

### Custom shapes
A building file can have a `build(kit, d)` function that adds shapes to the
generated shell. Positions are relative to the centre of the building at ground level.

```
kit.box(w, h, d, x, y, z, material)      kit.cyl(rTop, rBottom, h, x, y, z, material)
kit.cone(r, h, x, y, z, material)         kit.ring(rInner, rOuter, h, x, y, z, material)
kit.gable(w, h, d, x, y, z, material)
```

Materials: `"wall"`, `"slab"`, `"glass"`, `"accent"`, `"unit"`, `"equip"`, `"dark"`, `"supply"`, `"return"`.
`d` holds the building's `width`, `depth`, `height`, `floors`, `floorHeight` and `bays`.
See `airport.js`, `sports-stadium.js`, `greenhouse.js` and `religious-center.js`.

### Artist-made 3D models
Export a `.glb` to `assets/models/` and set `model: "assets/models/<file>.glb"` in
the building file. The model replaces the generated shape; the stops still come
from the building file. Conventions: metres, origin at the centre of the
footprint at ground level, front facing +Z. Any mesh whose name starts with
`Cutaway` is hidden when the building opens.

## Map pins

Open the site with `?edit=1` (for example `http://localhost:8000/?edit=1#installations`).
Click the map to drop a pin, tick the manufacturers, add photo paths if you have
them, and drag pins to move them. Then choose **Download installs.js** and
replace `content/installs.js` with the downloaded file.

You can also edit `content/installs.js` by hand. Each pin has `name`, `city`,
`lat`, `lng`, `building` (a building id), `year`, `manufacturers` (manufacturer
ids), and optional `products`, `photos` and `notes`.

## Photos

Put images in `assets/photos/`. Set `photo` on a product, add paths to a pin's
`photos`, or edit `content/gallery.js`. Anything left as `null` shows a placeholder tile.

## Company details and the map key

`content/settings.js` holds the address, phone, email and the Google Maps key.
