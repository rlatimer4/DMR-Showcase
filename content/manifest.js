/*
 * DMR Showcase — what is loaded.
 *
 * This is the one list that decides which manufacturers and buildings appear.
 * Each name is a file: content/manufacturers/<name>.js or content/buildings/<name>.js.
 *
 *  - Add a manufacturer or building: create its file, then add its name here.
 *  - Drop one: remove its name here (you can leave the file in place).
 *
 * Anything that referred to a dropped manufacturer or product (building stops,
 * map pins, gallery photos) is skipped automatically. Open the site with
 * ?check=1 to see a report of what was skipped.
 */
DMR.manifest = {
  manufacturers: [
    "nortek",
    "governair",
    "huntair",
    "mammoth",
    "temtrol",
    "venmar",
    "ventrol",
    "cooney",
    "envirotec",
    "fisair",
    "gree",
    "kampmann",
    "klingenburg",
    "novelaire",
    "rapid",
    "reddi",
    "runtal",
    "steamovap",
    "sterling",
    "uvr"
  ],
  buildings: [
    "data-center",
    "recreation-center",
    "hotel",
    "high-rise-office",
    "mid-rise-office",
    "low-rise-office",
    "airport",
    "convention-center",
    "retail-strip",
    "hospital",
    "sports-stadium",
    "medical-clinic",
    "government-office",
    "religious-center",
    "library",
    "fine-arts-center",
    "higher-education",
    "laboratory",
    "museum",
    "k-12-school",
    "small-manufacturing",
    "food-beverage-processing",
    "warehouse",
    "pharma-manufacturing",
    "greenhouse",
    "industrial-manufacturing",
    "hi-tech-manufacturing",
    "multifamily"
  ]
};
