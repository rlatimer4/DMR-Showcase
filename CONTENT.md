# Updating the showcase

Everything you would normally change lives in the `content/` folder. You do not
need to touch the code in `assets/js/`.

## Start here: the words are in plain text files

The wording on the site is in ordinary text files that open in Notepad, TextEdit
or any editor. No programming is involved.

| To change | Open |
| --- | --- |
| A building's summary, its "What a DMR package brings" points, its challenges, and the equipment listed at each location | `content/text/buildings/<building>.txt` |
| A product's name, summary, key points, photos, specifications and documents | `content/text/products/<product>.txt` |

The files explain themselves at the top. The rules are short:

- Keep the labels (the words before each colon), such as `Summary:` or `Key points:`.
- List lines start with a dash.
- Lines starting with `#` are notes and never appear on the site.

Example, from a building file:

```
Summary: Hospitals run around the clock and cannot lose airflow.

Why a DMR package:
- No lost airflow: Fan arrays keep operating rooms supplied through a fan failure
- Infection control: HEPA filtration, UV-C and room-side equipment that is easy to clean

Location: hospital-2
Title: Operating suite
Text: A single ceiling assembly delivers filtered air over the surgical table.
Equipment:
- huntair-ahu | Operating room air handler | Dedicated custom unit with HEPA final filters
- steamovap-humid | Clean-steam humidifier | Holds the room at 20 to 60% relative humidity
```

Each equipment line is: product code | what it is in this building | why it suits
(the last part is optional). Product codes are the file names in `content/text/products/`.

**After any change, open the site with `?check=1`** (for example
`http://localhost:8000/?check=1`). A report at the top of the page lists anything
that needs attention, such as a misspelled product code or a missing file.

## Product photos

Each product has its own photo gallery, shown when a visitor opens the product.

1. Put the image files in `assets/photos/<product>/`.
2. List them under `Photos:` in the product's text file, one per line:

```
Photos:
- assets/photos/huntair-fanwall/installed.jpg | Installed on a hospital roof
- assets/photos/huntair-fanwall/retrofit.jpg | Retrofit through a standard doorway
```

The first photo is the main one and is also used on the product's catalog card.
Until photos are listed, the gallery shows labelled placeholder tiles.

## Optional product details

Add any of these to a product's text file:

```
Badge: New

Specifications:
- Capacity: 20 to 200 tons
- Refrigerant: R-454B

Documents:
- Brochure (PDF) | assets/docs/acme-chiller.pdf
- Submittal data | https://example.com/submittal
```

## Where everything is

```
content/
  manifest.js              the list of manufacturers and buildings that are shown
  text/buildings/<id>.txt  words for each building
  text/products/<id>.txt   words and photos for each product
  manufacturers/<id>.js    which product lines a manufacturer has
  categories.js            product types (the catalog filter buttons)
  buildings/<id>.js        the 3D model of each building
  installs.js              map pins
  gallery.js               gallery photos
  settings.js              company details, Google Maps key, use types
assets/logos/  assets/photos/  assets/models/     images and 3D model files
```

The site repairs itself around missing items. If a manufacturer or product goes
away, the building locations, map pins and gallery photos that mentioned it skip
it. Nothing breaks, and the `?check=1` report tells you what was skipped.

## Manufacturers

### We now represent a new manufacturer
1. Copy any file in `content/manufacturers/` to `content/manufacturers/<newid>.js` and edit the `id`, `name`, `blurb` and the `products` list.
2. For each product, create `content/text/products/<product id>.txt` (copy an existing one).
3. Put the logo in `assets/logos/` and set `logo` to its path (or `null` to show the name).
4. Add `"<newid>"` to the `manufacturers` list in `content/manifest.js`.
5. Add its products to building locations in `content/text/buildings/` so they show in the 3D world.

### We no longer represent a manufacturer
Remove its name from `content/manifest.js`. That is the whole change.

### A manufacturer changed its name or logo
Edit `name` or `logo` in its file. Keep the `id` the same.

## Product lines

### Add a product line
1. Add a line to the `products` list in the manufacturer's file:
   `{ id: "acme-chiller", category: "chillers", shape: "chiller" }`
2. Create `content/text/products/acme-chiller.txt` with its name, summary and key points.

`category` is a product type from `content/categories.js`. `shape` picks the 3D
model that stands for it in the buildings:

| shape | looks like |
| --- | --- |
| `ahu` | long custom air handler |
| `rooftop` | packaged rooftop unit |
| `chiller` | air-cooled chiller with V-coils and fans |
| `fanwall` | wall of fans |
| `erv`, `wheel`, `plate` | energy recovery unit, wheel, plate exchanger |
| `mua`, `turnover` | make-up air unit, air turnover tower |
| `crah` | computer room air handlers |
| `vrf`, `minisplit`, `wshp` | VRF unit, wall-mounted split, water-source heat pump |
| `fancoil`, `vav` | ceiling fan coil, VAV box |
| `radiator`, `fintube`, `trench` | panel radiator, finned tube, floor trench unit |
| `unitheater`, `ductheater`, `aircurtain` | hanging unit heater, duct heater, air curtain over a door |
| `humidifier`, `dehumidifier` | humidifier with steam manifold, desiccant dehumidifier |
| `coil`, `uv` | coil, UV-C lamp fixture |
| `orceiling`, `ffu` | operating room ceiling, cleanroom fan filter ceiling |

### Retire a product line
Delete its line from the manufacturer's file.

## Product types

`content/categories.js` lists the types in the order of the catalog buttons.

- **Add a type**: add a line with a new `id`, `name` and `blurb`, then use that `id` as `category` on products.
- **Remove a type**: delete its line. Products still using it move to "Other" and the report says so.
- A type with no products is hidden on its own.

## Buildings (the 3D world)

Each building has two files: its words in `content/text/buildings/<id>.txt` and
its 3D model in `content/buildings/<id>.js`.

- **Change the equipment at a location**: edit the `Equipment:` lines in the text file.
  Every equipment line gets its own 3D model in that room, and visitors can select the model to open the product.
- **Different system designs get different rooms**: where a building could use one of several systems (VAV or fan coils, VRF or blower coils), give each its own location in a separate room rather than listing them together. The K-12 school's three classrooms and the hotel's two guest rooms are examples.
- **Add a location**: add `{ id: "hospital-5", at: { floor: 1, x: 0.5 }, space: "patient-room" }` to `stops` in the model file, then add a matching `Location: hospital-5` block to the text file. `at.floor` is `"roof"`, `"yard"` (on the ground in front) or a floor number (0 is the ground floor); `at.x` is the position across the width from 0 to 1.
- **Add a building**: copy both files of an existing building, change the `id`, and add its name to `buildings` in `content/manifest.js`. It is placed in its district automatically.
- **Remove a building**: remove its name from `content/manifest.js`.
- **Add a use type (district)**: add a line to `DMR.useTypes` in `content/settings.js`.

`space` decides how a room is furnished so visitors can tell what it is:

`operating-room`, `patient-room`, `exam-room`, `guest-room`, `apartment`, `suite`,
`lobby`, `open-office`, `office`, `classroom`, `lecture`, `auditorium`, `sanctuary`,
`reading-room`, `archive`, `gallery`, `shop`, `concourse`, `baggage`, `exhibit-hall`,
`gym`, `pool`, `locker`, `data-hall`, `mechanical`, `lab`, `cleanroom`, `dry-room`,
`process`, `production`, `shop-floor`, `high-bay`, `dock`, `grow`, `plant`.

New room types and equipment shapes are added in `assets/js/props3d.js`.

`size` is in metres: `width`, `depth`, `floors`, `floorHeight`, and `bays` (rooms
across each floor). Add `extraHeight` if tall shapes on the roof get cut off by the camera.

### Making a building recognizable from outside

**1. The front wall** (`facade`) and wall colour (`walls`):

```js
facade: { style: "brick", color: "#b5533c" },
walls: "#c0603f",
```

| style | looks like |
| --- | --- |
| `"windows"` | rows of separate windows (the default) |
| `"glass"` | full glass curtain wall |
| `"brick"` | brick with framed windows |
| `"bands"` | ribbon windows on a plain wall |
| `"tall"` | tall narrow windows, for halls and chapels |
| `"solid"` | windowless, with a coloured `stripe` |
| `"storefront"` | shop fronts |

Extra facade options: `stripe: "#hex"`, `doors: 4` (roll-up or dock doors),
`entrance: false`. Set `walls: "glass"` and `roof: "open"` for an all-glass building.

**2. The name board.** Every building gets a sign with its name at the kerb. Set `sign: false` to remove it.

**3. Custom shapes** in `build(kit, d)`. This is where the hospital gets its
helipad and red cross, the airport its tower and airplane, the school its bus.
Positions are relative to the centre of the building at ground level; `d` holds
`width`, `depth`, `height`, `floors`, `floorHeight` and `bays`.

```
kit.box(w, h, d, x, y, z, color)          kit.cyl(rTop, rBottom, h, x, y, z, color)
kit.cone(r, h, x, y, z, color, sides)     kit.dome(r, x, y, z, color)
kit.disc(r, x, y, z, color)               kit.ring(rInner, rOuter, h, x, y, z, color)
kit.gable(w, h, d, x, y, z, color)        pitched roof or pediment
kit.barrel(w, h, d, x, y, z, color)       curved roof
kit.sign(text, w, h, x, y, z, background, textColor)
kit.front(shape)                          hide this shape when the building opens
```

`color` is a hex colour such as `"#c0392b"`, or one of the named materials:
`"wall"`, `"slab"`, `"glass"`, `"unit"`, `"equip"`, `"dark"`, `"supply"`, `"return"`.

Guidelines that keep the cutaway readable:

- Wrap anything attached to the front wall in `kit.front(...)` so it disappears when the building opens.
- Put tall things (silos, stacks, towers) behind the building or at the back of the roof, and low things (cars, trucks, pools) in front.
- Leave the middle strip of the roof clear around each `"roof"` location for its equipment.

### Artist-made 3D models
Export a `.glb` to `assets/models/` and set `model: "assets/models/<file>.glb"` in
the building's model file. The model replaces the generated shape; the locations
still come from the building's files. Conventions: metres, origin at the centre
of the footprint at ground level, front facing +Z. Any mesh whose name starts
with `Cutaway` is hidden when the building opens.

## Map pins

Open the site with `?edit=1` (for example `http://localhost:8000/?edit=1#installations`).
Click the map to drop a pin, tick the manufacturers, add photo paths if you have
them, and drag pins to move them. Then choose **Download installs.js** and
replace `content/installs.js` with the downloaded file.

## Company details and the map key

`content/settings.js` holds the address, phone, email and the Google Maps key.
