/*
 * DMR Showcase — 3D props: room furnishings and equipment models.
 *
 * furnish(group, space, room)   fills a room so you can tell what it is
 *                               (an operating room has a table and a surgical light,
 *                               a classroom has desks and a board, and so on)
 * arrange(shapes, room)         works out where each piece of equipment in a room or on a
 *                               roof goes, so pieces are spread out and never overlap
 * equip(group, placement)       draws one piece of HVAC equipment. Its `shape` comes from
 *                               the product (see content/manufacturers/*.js)
 *
 * To add a room type, add a function to SPACES and use its name as `space` in a
 * building file. To add an equipment shape, add a function to SHAPES and a line to SPEC,
 * then use its name as `shape` in a manufacturer file.
 */
export function makeProps({ THREE, box, mesh, material }) {
  const WOOD = "#b98a5a", STEEL = "#b8c2ca", FABRIC = "#5b8db8", GREEN = "#4caf50", WHITE = "#ffffff", BLUE = "#1779ba", RED = "#c0392b";

  /* ================= rooms ================= */

  // r: { cx, y, w, h, dp } = centre x, floor level, bay width, storey height, building depth
  // The front strip of every room (CLEAR metres deep) is kept free for the equipment models,
  // so furniture is laid out in the rest of the room behind it.
  const CLEAR = 6;
  function tools(g, r0) {
    const r = Object.assign({}, r0, { dp: r0.dp - CLEAR }), zo = -CLEAR / 2;
    const y0 = r.y + 0.3;
    return {
      w: r.w - 1.2, zd: r.dp / 2 - 1.4, h: r.h - 0.6,
      B: (w, h, d, x, y, z, m) => box(g, w, h, d, r.cx + x, y0 + y + h / 2, z + zo, material(m)),
      C: (rt, rb, h, x, y, z, m, seg) => mesh(g, new THREE.CylinderGeometry(rt, rb, h, seg || 16), material(m), r.cx + x, y0 + y + h / 2, z + zo),
      // lay items out on a grid across the room
      grid: (stepX, stepZ, fn, zFrom, zTo) => {
        const w = r.w - 2.4, nx = Math.max(1, Math.floor(w / stepX)), z0 = zFrom === undefined ? -r.dp / 2 + 2.5 : zFrom, z1 = zTo === undefined ? r.dp / 2 - 2.5 : zTo;
        const nz = Math.max(1, Math.floor((z1 - z0) / stepZ) + 1);
        for (let i = 0; i < nx; i++) for (let k = 0; k < nz; k++) fn((i - (nx - 1) / 2) * stepX, z0 + k * stepZ, i, k);
      }
    };
  }
  const desk = (t, x, z) => { t.B(1.5, 0.75, 0.75, x, 0, z, WOOD); t.B(0.5, 0.9, 0.5, x, 0, z + 0.85, "dark"); t.B(0.5, 0.35, 0.05, x, 0.78, z - 0.1, "dark"); };
  const bed = (t, x, z) => { t.B(1.2, 0.55, 2.2, x, 0, z, WHITE); t.B(1.2, 0.2, 0.5, x, 0.55, z - 0.8, "#dfe7ee"); t.B(1.3, 1.0, 0.12, x, 0, z - 1.15, STEEL); };
  const sofa = (t, x, z, c) => { t.B(2.2, 0.5, 0.9, x, 0, z, c || FABRIC); t.B(2.2, 0.5, 0.25, x, 0.5, z - 0.33, c || FABRIC); };
  const plant = (t, x, z) => { t.C(0.3, 0.25, 0.5, x, 0, z, "#8a7560"); t.C(0.05, 0.5, 1.1, x, 0.5, z, GREEN, 8); };
  const shelf = (t, x, z, len, h) => { t.B(0.5, h || 2.2, len, x, 0, z, WOOD); for (let k = 0; k < 3; k++) t.B(0.56, 0.3, len - 0.2, x, 0.4 + k * 0.6, z, ["#c0392b", "#1779ba", "#2e9e5b"][k]); };

  const SPACES = {
    "operating-room": t => {
      t.B(0.8, 0.9, 2.1, 0, 0, 0, STEEL); t.B(0.9, 0.12, 2.2, 0, 0.9, 0, "#7fd0c8");          // operating table
      t.C(0.9, 0.9, 0.12, 0.3, t.h - 1.5, 0.2, WHITE, 24); t.C(0.06, 0.06, 1.3, 0.3, t.h - 1.38, 0.2, STEEL);  // surgical light
      t.B(0.7, 1.3, 0.6, -2, 0, -1.5, WHITE); t.B(0.6, 1.0, 0.5, 2, 0, 1.5, "#dfe7ee"); t.B(0.5, 0.9, 0.9, -1.8, 0, 1.6, STEEL);
    },
    "patient-room": t => t.grid(3.4, 6, (x, z) => { bed(t, x, z); t.B(0.5, 0.6, 0.5, x + 1.1, 0, z - 0.8, WOOD); t.B(0.6, 0.9, 0.6, x - 1.2, 0, z + 0.6, FABRIC); t.C(0.03, 0.03, 1.8, x + 0.9, 0, z + 0.3, STEEL); }),
    "exam-room": t => t.grid(3.6, 6, (x, z) => { t.B(0.7, 0.8, 1.9, x, 0, z, "#7fd0c8"); desk(t, x + 1.3, z - 1); t.B(0.6, 1.9, 0.4, x - 1.2, 0, z - 1.4, WHITE); }),
    "guest-room": t => t.grid(4.2, 7, (x, z) => { bed(t, x - 0.6, z); t.B(1.2, 0.08, 2.2, x - 0.6, 0.55, z + 0.2, RED); t.B(0.5, 0.5, 0.5, x + 0.5, 0, z - 0.8, WOOD); desk(t, x + 1.2, z + 1.2); }),
    "apartment": t => t.grid(4.6, 7, (x, z) => { bed(t, x - 1, z - 0.6); sofa(t, x + 1, z + 1.6, "#7a5a3a"); t.B(1, 0.4, 0.6, x + 1, 0, z + 2.6, WOOD); t.B(1.8, 0.9, 0.6, x + 1, 0, z - 1.6, WHITE); }),
    "suite": t => { t.grid(4.5, 8, (x, z) => { sofa(t, x, z + 1.5); t.B(1.2, 0.4, 0.7, x, 0, z + 2.6, WOOD); }); t.B(t.w * 0.7, 1.05, 0.6, 0, 0, -t.zd + 0.6, "dark"); },
    "lobby": t => { t.B(3.2, 1.05, 0.9, 0, 0, -1.5, WOOD); t.B(3.3, 0.08, 1, 0, 1.05, -1.5, "dark"); sofa(t, -t.w / 2 + 2, 2.5); sofa(t, t.w / 2 - 2, 2.5, "#7a5a3a"); plant(t, -t.w / 2 + 0.8, 0.5); plant(t, t.w / 2 - 0.8, 0.5); },
    "open-office": t => t.grid(3, 3.2, (x, z) => { desk(t, x - 0.75, z); desk(t, x + 0.75, z); t.B(3.1, 1.1, 0.06, x, 0, z - 0.42, "#cfd8df"); }),
    "office": t => { t.grid(3.4, 3.6, (x, z) => desk(t, x, z), -t.zd + 1, 1); t.B(2.6, 0.75, 1.1, 0, 0, t.zd - 2.2, WOOD); },
    "classroom": t => { t.grid(1.6, 1.7, (x, z) => { t.B(0.9, 0.7, 0.55, x, 0, z, WOOD); t.B(0.4, 0.75, 0.4, x, 0, z + 0.6, BLUE); }, -t.zd + 2.6, t.zd - 1); t.B(Math.min(5, t.w - 1), 1.3, 0.1, 0, 1, -t.zd + 0.3, "#2f4f3f"); desk(t, -1.8, -t.zd + 1.4); },
    "lecture": t => seats(t, BLUE, true),
    "auditorium": t => seats(t, RED, true),
    "sanctuary": t => { t.grid(100, 1.7, (x, z) => { t.B(t.w * 0.36, 0.5, 0.5, -t.w * 0.22, 0, z, WOOD); t.B(t.w * 0.36, 0.5, 0.5, t.w * 0.22, 0, z, WOOD); }, -t.zd + 4, t.zd - 1); t.B(2.4, 1.1, 1, 0, 0.4, -t.zd + 1.4, WHITE); t.B(5, 0.4, 2.6, 0, 0, -t.zd + 1.6, WOOD); t.B(0.2, 2.6, 0.2, 0, 1.5, -t.zd + 0.5, "#b9a15a"); t.B(1.2, 0.2, 0.2, 0, 3.3, -t.zd + 0.5, "#b9a15a"); },
    "reading-room": t => { t.grid(2.2, 100, (x, z) => shelf(t, x, -t.zd + 3, 5), 0, 0); t.grid(4, 100, (x) => { t.B(2.6, 0.75, 1.1, x, 0, t.zd - 2.5, WOOD); t.B(0.4, 0.8, 0.4, x - 0.7, 0, t.zd - 1.5, "dark"); t.B(0.4, 0.8, 0.4, x + 0.7, 0, t.zd - 1.5, "dark"); }, 0, 0); },
    "archive": t => t.grid(1.5, 100, (x) => shelf(t, x, 0, t.zd * 2 - 2, 2.6), 0, 0),
    "gallery": t => { t.grid(4, 5, (x, z, i, k) => { t.B(0.8, 1, 0.8, x, 0, z, WHITE); t.C(0.25, 0.35, 0.7, x, 1, z, ["#b9a15a", "#5b4a8a", "#c0392b"][(i + k) % 3], 8); }); for (let k = -1; k <= 1; k++) t.B(2, 1.4, 0.08, k * 3.2, 1.2, -t.zd + 0.3, ["#c0392b", "#1779ba", "#f7b500"][k + 1]); },
    "shop": t => { t.grid(2.6, 100, (x) => shelf(t, x, -1.5, 6, 1.8), 0, 0); t.B(2.4, 1, 0.8, -t.w / 2 + 2, 0, t.zd - 1.6, WOOD); t.B(0.5, 0.4, 0.4, -t.w / 2 + 2, 1, t.zd - 1.6, "dark"); },
    "concourse": t => { t.grid(3.4, 2.4, (x, z) => { t.B(2.6, 0.45, 0.6, x, 0, z, FABRIC); t.B(2.6, 0.5, 0.12, x, 0.45, z - 0.25, FABRIC); }, -2, t.zd - 1.5); t.B(3, 1.1, 0.8, 0, 0, -t.zd + 1.2, WOOD); t.B(3.2, 0.9, 0.08, 0, 2.2, -t.zd + 0.6, "dark"); },
    "baggage": t => { const c = t.C(3, 3, 0.7, 0, 0, 0, STEEL, 28); c.scale.x = Math.min(2.2, t.w / 8); const i = t.C(1.8, 1.8, 0.9, 0, 0, 0, "dark", 28); i.scale.x = Math.min(2.2, t.w / 8); [[-2, 2.4], [1, -2.3], [3, 2.2]].forEach(p => t.B(0.7, 0.45, 0.5, p[0], 0.7, p[1], [RED, BLUE, WOOD][(p[0] + 4) % 3 | 0])); },
    "exhibit-hall": t => t.grid(5, 5, (x, z, i, k) => { const c = [RED, BLUE, "#2e9e5b", "#ffa500"][(i + k) % 4]; t.B(3, 2.4, 0.12, x, 0, z - 1.4, c); t.B(0.12, 2.4, 2.8, x - 1.5, 0, z, WHITE); t.B(1.6, 0.9, 0.7, x, 0, z + 0.6, WHITE); }),
    "gym": t => { t.B(t.w - 1, 0.06, t.zd * 2 - 1, 0, 0, 0, "#d9a868"); t.B(0.15, 0.07, t.zd * 2 - 1, 0, 0.01, 0, WHITE); [-1, 1].forEach(s => { t.C(0.08, 0.08, 3, s * (t.w / 2 - 1.2), 0, 0, STEEL); t.B(0.1, 1, 1.6, s * (t.w / 2 - 1.5), 2.6, 0, WHITE); }); },
    "pool": t => { t.B(t.w - 1, 0.25, t.zd * 2 - 2, 0, 0, 0, "#f4f1ea"); t.B(t.w - 3, 0.3, t.zd * 2 - 5, 0, 0.02, 0, "#38b6e8"); for (let k = -2; k <= 2; k++) t.B(t.w - 3.2, 0.32, 0.1, 0, 0.02, k * 1.6, WHITE); },
    "locker": t => { t.grid(2.4, 100, (x, z, i) => { t.B(0.6, 2, t.zd * 2 - 4, x, 0, 0, [BLUE, "#2a8a8a"][i % 2]); t.B(0.45, 0.45, t.zd * 2 - 5, x + 1, 0, 0, WOOD); }, 0, 0); },
    "data-hall": t => t.grid(2.9, 6, (x, z) => { t.B(1.6, 5.2, 3.4, x, 0, z, "dark"); t.B(1.62, 0.12, 3.42, x, 4.2, z, "#1e9be8"); }, -3.5, 2.5),
    "mechanical": t => { t.C(1, 1, 2.6, -t.w / 2 + 2, 0, -2, STEEL, 20); t.B(1.6, 1, 0.9, 0, 0, -3, BLUE); t.C(0.35, 0.35, 0.9, 0.9, 0.3, -3, "dark").rotation.z = Math.PI / 2; t.B(1.6, 1, 0.9, 2.4, 0, -3, BLUE); t.B(t.w - 2, 0.25, 0.25, 0, 2, -4.5, "supply"); t.B(t.w - 2, 0.25, 0.25, 0, 1.5, -4.5, "return"); t.B(0.8, 1.9, 0.5, t.w / 2 - 1.4, 0, -1, "#3f4854"); },
    "lab": t => { t.grid(100, 3, (x, z) => { t.B(t.w * 0.7, 0.9, 0.9, 0, 0, z, "#2f3a46"); [-0.3, 0, 0.3].forEach(f => t.C(0.12, 0.16, 0.4, t.w * f, 0.9, z, ["#2e9e5b", "#1e9be8", "#f7b500"][(f * 3.4 + 1) | 0], 8)); }, -t.zd + 3, t.zd - 2); t.B(1.6, 2.3, 0.9, -t.w / 2 + 1.6, 0, -t.zd + 0.8, WHITE); t.B(1.4, 0.9, 0.06, -t.w / 2 + 1.6, 1, -t.zd + 1.27, "glass"); },
    // dry lab: instrument benches with analysers and screens, and an equipment rack
    "dry-lab": t => { t.grid(3.2, 3.2, (x, z, i, k) => { t.B(2.4, 0.9, 0.8, x, 0, z, "#3f4854"); t.B(2.5, 0.06, 0.9, x, 0.9, z, WHITE); t.B(0.8, 0.55, 0.55, x - 0.6, 0.96, z, (i + k) % 2 ? "#dfe7ee" : "#1e9be8"); t.B(0.55, 0.38, 0.05, x + 0.5, 1.05, z, "dark"); t.B(0.4, 0.8, 0.4, x, 0, z + 0.8, "dark"); }); t.B(0.7, 2, 0.8, -t.w / 2 + 1, 0, -t.zd + 0.8, "dark"); t.B(0.72, 0.1, 0.82, -t.w / 2 + 1, 1.5, -t.zd + 0.8, "#1e9be8"); },
    // vivarium: rows of ventilated cage racks, each with its blower on top
    "vivarium": t => t.grid(2.3, 100, (x) => { const len = t.zd * 2 - 3; [-0.36, 0.36].forEach(dx => [-len / 2, 0, len / 2].forEach(dz => t.B(0.05, 2.1, 0.05, x + dx, 0.1, dz, STEEL))); for (let k = 0; k < 5; k++) { t.B(0.78, 0.04, len, x, 0.3 + k * 0.4, 0, STEEL); t.B(0.66, 0.24, len - 0.3, x, 0.35 + k * 0.4, 0, "glass"); t.B(0.68, 0.06, len - 0.28, x, 0.35 + k * 0.4, 0, "#cfa76a"); } t.B(0.6, 0.35, 0.8, x, 2.25, 0, BLUE); }, 0, 0),
    "cleanroom": t => { t.B(t.w - 0.6, 0.05, t.zd * 2, 0, 0, 0, "#eef6fb"); t.grid(3.4, 3.6, (x, z, i, k) => { t.B(2, 1.5, 1.4, x, 0, z, WHITE); t.B(0.9, 0.5, 0.06, x, 0.8, z + 0.72, "#1e9be8"); t.B(0.5, 0.25, 0.5, x + 0.6, 1.5, z, (i + k) % 2 ? "#f7b500" : STEEL); }); },
    "dry-room": t => { t.grid(3, 3.4, (x, z) => { t.B(1.8, 0.9, 0.9, x, 0, z, STEEL); t.B(1.6, 0.8, 0.8, x, 0.9, z, "glass"); }); t.grid(1.2, 100, (x) => t.C(0.4, 0.4, 1.1, x, 0, t.zd - 1, BLUE, 14), 0, 0); },
    "process": t => { t.grid(3.4, 100, (x) => { t.C(1.1, 1.1, 3, x, 0.6, -2.5, STEEL, 20); t.C(1.1, 0.3, 0.6, x, 0, -2.5, STEEL, 20); }, 0, 0); t.B(t.w - 3, 0.9, 1, 0, 0, 2.5, STEEL); t.grid(1.4, 100, (x) => t.B(0.5, 0.5, 0.5, x, 0.9, 2.5, WOOD), 0, 0); },
    "production": t => { t.B(t.w - 3, 0.9, 1.2, 0, 0, 0, "#3f4854"); t.grid(2.6, 100, (x, z, i) => { t.B(1, 0.6, 0.9, x, 0.9, 0, STEEL); if (i % 2) { t.C(0.25, 0.3, 1.6, x, 0, 1.6, "#ffa500", 10); t.B(0.2, 0.2, 1.6, x, 1.6, 0.9, "#ffa500"); } }, 0, 0); t.grid(3, 100, (x) => t.B(1.8, 1.8, 1.4, x, 0, -3.5, BLUE), 0, 0); },
    "shop-floor": t => { t.grid(4, 4, (x, z, i, k) => { t.B(1.8, 1.3, 1.2, x, 0, z, (i + k) % 2 ? BLUE : "#3f4854"); t.B(0.4, 0.6, 0.4, x, 1.3, z, STEEL); }, -3, 2); t.B(2.2, 0.9, 0.8, -t.w / 2 + 2.2, 0, t.zd - 1.5, WOOD); },
    // pallet racking in rows running front to back, with aisles between the rows
    "high-bay": t => { const n = Math.max(2, Math.round(t.w / 4.4)), step = t.w / n, len = t.zd * 2 - 1; for (let i = 0; i < n; i++) { const x = (i - (n - 1) / 2) * step - step * 0.22; t.B(1.3, t.h - 3, len, x, 0, 0, "#f08c1a"); for (let k = 0; k < 3; k++) t.B(1.4, 1, len - 0.4, x, 0.3 + k * 2.2, 0, k % 2 ? WOOD : "#cfd8df"); } },
    "dock": t => { t.grid(2, 2, (x, z, i, k) => { t.B(1.2, 0.15, 1.2, x, 0, z, WOOD); t.B(1.1, 0.9 + ((i + k) % 2) * 0.5, 1.1, x, 0.15, z, "#cfa76a"); }, 0, t.zd - 1.5); t.B(1.2, 1.6, 2, 0, 0, -3, "#ffa500"); },
    "grow": () => {},
    "plant": () => {}
  };
  function seats(t, color, stage) {
    const rows = Math.max(3, Math.floor((t.zd * 2 - 5) / 1.3));
    for (let k = 0; k < rows; k++) {
      const rise = (rows - 1 - k) * 0.28, z = -t.zd + 4.5 + (rows - 1 - k) * 1.3;
      t.B(t.w - 1.5, rise + 0.1, 1.3, 0, 0, z, "#8d949c"); t.B(t.w - 2.2, 0.75, 0.5, 0, rise + 0.1, z + 0.2, color);
    }
    if (stage) { t.B(t.w - 1.5, 0.8, 3, 0, 0, -t.zd + 1.6, WOOD); t.B(t.w * 0.5, Math.min(3, t.h - 1.6), 0.1, 0, 0.8, -t.zd + 0.3, WHITE); }
  }
  function furnish(g, space, r) {
    const fn = SPACES[space];
    if (fn) fn(tools(g, r));
    return !!fn;
  }


  /* ================= equipment ================= */

  // Shared see-through materials: an air handler section you can look into, mist and steam, UV light.
  const GLASS = new THREE.MeshStandardMaterial({ color: 0xcfe6f5, transparent: true, opacity: 0.2, roughness: 0.2, depthWrite: false });
  const MIST = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55, depthWrite: false });
  const UVLAMP = new THREE.MeshBasicMaterial({ color: 0xa694ff });
  const UVGLOW = new THREE.MeshBasicMaterial({ color: 0x8f7bff, transparent: true, opacity: 0.35, depthWrite: false });
  const COPPER = "#c98a4a", GALV = "#b8c2ca", DUCT = "#cfd8df", SLATE = "#3f4854", STAIN = "#c9d2d9", HOT = "#c0392b";

  /*
   * Each shape draws around a local origin; `s` is its scale. For floor shapes the origin
   * is on the floor. For ceiling and wall shapes it is at ceiling level and they draw downward.
   * x runs across the room, y up, z toward the viewer.
   *   B(w, h, d, x, y, z, colour)       box; y is its underside
   *   C(rTop, rBottom, h, x, y, z, ..)  upright cylinder; y is its underside
   *   X(r, len, x, y, z, ..) / Z(..)    cylinder lying across the room / front to back; y is its centre
   */
  function unitTools(g, o) {
    const s = o.scale || 1, E = material("unit"), T = material("trim");
    const B = (w, h, d, x, y, z, m) => { const e = m ? 0.03 : 0; return box(g, w * s + e, h * s + e, d * s + e, o.x + x * s, o.y + (y + h / 2) * s, o.z + z * s, m ? material(m) : E); };
    const C = (rt, rb, h, x, y, z, m, seg) => mesh(g, new THREE.CylinderGeometry(rt * s, rb * s, h * s, seg || 18), m ? material(m) : E, o.x + x * s, o.y + (y + h / 2) * s, o.z + z * s);
    const X = (r, len, x, y, z, m, seg, r2) => { const c = mesh(g, new THREE.CylinderGeometry((r2 || r) * s, r * s, len * s, seg || 16), m ? material(m) : E, o.x + x * s, o.y + y * s, o.z + z * s); c.rotation.z = Math.PI / 2; return c; };
    const Z = (r, len, x, y, z, m, seg, r2) => { const c = mesh(g, new THREE.CylinderGeometry((r2 || r) * s, r * s, len * s, seg || 16), m ? material(m) : E, o.x + x * s, o.y + y * s, o.z + z * s); c.rotation.x = Math.PI / 2; return c; };
    const see = (m, material) => { m.material = material; m.castShadow = false; return m; };
    // fan seen from the front (axis front to back) or from above
    const fanFront = (r, x, y, z) => { const f = C(r, r, 0.12, x, y - 0.06, z, "dark", 20); f.rotation.x = Math.PI / 2; const h = C(r * 0.3, r * 0.3, 0.16, x, y - 0.08, z, "unit", 12); h.rotation.x = Math.PI / 2; };
    const fanTop = (r, x, y, z) => { C(r, r, 0.12, x, y, z, "dark", 20); C(r * 0.3, r * 0.3, 0.16, x, y, z, "unit", 12); };
    // round duct from this unit back to the building's supply main
    const toMain = (r, y, z0) => {
      if (o.mainZ === undefined) return;
      const zw = o.z + z0 * s, len = Math.abs(zw - o.mainZ);
      const yw = o.y + y * s;
      const c = mesh(g, new THREE.CylinderGeometry(r * s, r * s, len, 14), material(GALV), o.x, yw, (zw + o.mainZ) / 2);
      c.rotation.x = Math.PI / 2;
      // short riser from the branch up into the main
      if (o.mainY > yw) mesh(g, new THREE.CylinderGeometry(r * s, r * s, o.mainY - yw, 14), material(GALV), o.x, (o.mainY + yw) / 2, o.mainZ);
    };
    // A section of air handler casing you can see into: base rail, corner posts, roof rails and clear panels.
    const casing = (w, h, d, x, z) => {
      B(w + 0.08, 0.2, d + 0.08, x, 0, z, "trim");
      see(B(w - 0.04, h, d - 0.04, x, 0.2, z, "glass"), GLASS);
      [-1, 1].forEach(i => [-1, 1].forEach(k => B(0.1, h, 0.1, x + i * (w / 2 - 0.05), 0.2, z + k * (d / 2 - 0.05), "#ffffff")));
      [-1, 1].forEach(k => { B(w, 0.1, 0.1, x, h + 0.1, z + k * (d / 2 - 0.05), "#ffffff"); B(0.1, 0.1, d, x + k * (w / 2 - 0.05), h + 0.1, z, "#ffffff"); });
    };
    // A length of duct you can see into, running across the room.
    const ductGlass = (len, h, d, x, y, z) => {
      see(B(len, h, d, x, y, z, "glass"), GLASS);
      [-1, 1].forEach(i => B(0.08, h + 0.08, d + 0.08, x + i * len / 2, y - 0.04, z, DUCT));
    };
    const puff = (r, x, y, z) => see(mesh(g, new THREE.SphereGeometry(r * s, 12, 8), MIST, o.x + x * s, o.y + y * s, o.z + z * s), MIST);
    // Threaded rods from a hung unit up to the slab above.
    const hang = (dx, dz, top) => [-1, 1].forEach(i => [-1, 1].forEach(k => C(0.025, 0.025, (o.slab || 0.75) / s - top, i * dx, top, k * dz, "dark", 6)));
    // Chilled and hot water pipes rising from a unit into the ceiling.
    const pipes = (x, y, z, h) => { C(0.05, 0.05, h, x, y, z, "supply", 8); C(0.05, 0.05, h, x, y, z + 0.18, "return", 8); };
    // A piece of wall for wall-mounted equipment to hang on.
    const wall = (w, h, x, y, z) => B(w, h, 0.14, x, y, z, "#e3e8ec");
    return { B, C, X, Z, see, fanFront, fanTop, toMain, casing, ductGlass, puff, hang, pipes, wall, trim: (w, d, x, z) => B(w + 0.06, 0.25, d + 0.06, x, 0, z, "trim"), T, roomH: (o.roomH || 3) / s };
  }
  function cabinet(u, len, x0) {
    const x = x0 || 0, n = Math.round(len / 2.2);
    u.B(len, 3, 3.2, x, 0.25, 0); u.trim(len, 3.2, x, 0);
    for (let k = 1; k < n; k++) u.B(0.08, 3, 3.24, x - len / 2 + k * len / n, 0.25, 0, GALV);
    u.B(0.1, 2, 2.4, x - len / 2 - 0.02, 0.75, 0, "dark");
    for (let k = 0; k < Math.min(3, n - 1); k++) { const dx = x - len / 2 + (k + 0.5) * len / n; u.B(1.2, 2.2, 0.06, dx, 0.6, 1.62, "#dfe7ee"); u.B(0.08, 0.3, 0.1, dx + 0.45, 1.6, 1.64, "dark"); }
    u.B(1.6, 0.9, 1.6, x + len / 2 - 1.2, 3.25, 0, GALV);
  }
  // Fan array: stacked cube cells, each with a direct-drive plug fan inside, in a section of air handler.
  function fanArray(u, nx, ny, coil) {
    const c = 1.2, D = 1.3, W = nx * c, H = ny * c, y0 = 0.3, zf = D / 2, zb = -D / 2;
    u.casing(W + 0.7, H + 0.4, D + 1.3, 0, 0);
    // the frame of the cubes
    for (let i = 0; i <= nx; i++) { const x = -W / 2 + i * c; [zb, zf].forEach(z => u.B(0.07, H, 0.07, x, y0, z, "#8d99a3")); for (let k = 0; k <= ny; k++) u.B(0.07, 0.07, D, x, y0 + k * c - 0.035, 0, "#8d99a3"); }
    for (let k = 0; k <= ny; k++) [zb, zf].forEach(z => u.B(W, 0.07, 0.07, 0, y0 + k * c - 0.035, z, "#8d99a3"));
    for (let i = 0; i < nx; i++) for (let k = 0; k < ny; k++) {
      const x = -W / 2 + (i + 0.5) * c, y = y0 + (k + 0.5) * c;
      u.B(c - 0.1, c - 0.1, 0.05, x, y - c / 2 + 0.05, zb + 0.03, DUCT);          // inlet panel at the back of the cube
      u.Z(0.46, 0.2, x, y, zb + 0.16, SLATE, 20, 0.34);                            // inlet cone
      u.Z(0.47, 0.05, x, y, zb + 0.3, "#eef2f5", 24); u.Z(0.42, 0.3, x, y, zb + 0.47, "#1f2630", 24); u.Z(0.47, 0.05, x, y, zb + 0.65, "#eef2f5", 24);   // plug fan wheel
      u.Z(0.17, 0.4, x, y, zb + 0.88, "trim", 14);                                  // motor
      u.B(c - 0.1, 0.06, 0.08, x, y - 0.26, zb + 0.9, "#8d99a3");                  // motor support
    }
    if (coil) { u.B(W, H, 0.35, 0, y0, zb - 0.4, COPPER); for (let i = 0; i <= nx * 4; i++) u.B(0.04, H, 0.37, -W / 2 + i * c / 4, y0, zb - 0.4, GALV); u.C(0.09, 0.09, H + 0.2, W / 2 + 0.16, y0, zb - 0.5, "supply", 10); u.C(0.09, 0.09, H + 0.2, W / 2 + 0.16, y0, zb - 0.25, "return", 10); }
  }
  // Coil in a section of air handler: finned block, headers, return bends. kind picks the details.
  function coil(u, kind) {
    const steam = kind === "steam", hdr = steam ? HOT : "supply";
    u.casing(3.5, 2.7, 1.6, 0, 0);
    u.B(2.6, 2.1, 0.45, -0.1, 0.4, 0, COPPER);
    for (let k = 0; k <= 13; k++) u.B(0.035, 2.1, 0.48, -1.4 + k * 0.2, 0.4, 0, GALV);
    u.B(2.7, 0.1, 0.52, -0.1, 0.32, 0, GALV); u.B(2.7, 0.1, 0.52, -0.1, 2.5, 0, GALV);
    for (let k = 0; k < 6; k++) { u.B(0.12, 0.2, 0.3, -1.5, 0.55 + k * 0.33, 0, "#b87333"); if (kind === "freeze") u.B(0.1, 0.1, 0.1, -1.6, 0.6 + k * 0.33, 0, HOT); }
    if (kind === "dx") {
      // refrigerant distributor feeding each circuit, and a suction header
      u.C(0.12, 0.05, 0.3, 1.62, 1.3, 0.55, "#c9a23a", 10);
      for (let k = 0; k < 6; k++) { const t = u.B(0.03, 0.03, 0.7, 1.4, 0.55 + k * 0.33, 0.35, "#c9a23a"); t.rotation.x = (k - 2.5) * 0.18; }
      u.C(0.1, 0.1, 2.1, 1.3, 0.4, -0.12, "supply", 10); u.Z(0.1, 0.9, 1.3, 0.55, 0.3, "supply", 10);
    } else {
      u.C(0.1, 0.1, 2.1, 1.3, 0.4, 0.12, hdr, 10); u.C(0.1, 0.1, 2.1, 1.3, 0.4, -0.12, steam ? GALV : "return", 10);
      u.Z(0.1, 1, 1.3, steam ? 2.3 : 0.6, 0.6, hdr, 10); u.Z(0.1, 1, 1.3, steam ? 0.6 : 2.3, 0.35, steam ? GALV : "return", 10);
      if (steam) u.B(0.3, 0.3, 0.3, 1.3, 0.25, 0.95, SLATE);                       // steam trap
    }
    if (kind === "smart") { u.B(0.55, 0.7, 0.16, 1.2, 1.2, 0.86, SLATE); u.B(0.3, 0.2, 0.04, 1.2, 1.55, 0.95, "#4caf50"); u.B(0.03, 0.9, 0.03, 0.6, 0.6, 0.24, "#4caf50"); u.B(0.03, 0.9, 0.03, -0.6, 1.2, 0.24, "#4caf50"); }
  }
  // Steam: a few puffs drifting forward from a dispersion tube.
  const steam = (u, x, y, z, n) => { for (let k = 0; k < (n || 3); k++) { u.puff(0.16 + (k % 2) * 0.05, x + k * 0.5, y + 0.02 * k, z + 0.22); u.puff(0.12, x + 0.25 + k * 0.5, y + 0.16, z + 0.4); } };
  // The slatted grille on a room unit.
  const slats = (u, w, h, x, y, z, n, m) => { for (let k = 0; k < n; k++) u.B(w, 0.03, 0.03, x, y + (k + 0.5) * h / n, z, m || "dark"); };
  // Fan-powered VAV box, with an optional sensible cooling coil on its plenum inlet.
  function vavFan(u, cooling) {
    u.hang(0.7, 0.55, -0.25);
    u.B(1.6, 0.6, 1.3, 0, -0.85, 0, DUCT); u.toMain(0.2, -0.5, -0.65);
    u.B(0.35, 0.35, 0.3, 0.95, -0.7, -0.2, "trim");                                 // controls
    u.B(0.05, 0.42, 0.8, -0.82, -0.76, 0.1, "dark");                                // induced-air inlet from the ceiling plenum
    u.B(1.3, 0.5, 0.12, 0, -0.8, 0.72, cooling ? DUCT : COPPER);                    // reheat coil on the discharge
    u.B(1.2, 0.45, 0.9, 0, -0.78, 1.2, "supply"); u.B(1.3, 0.06, 0.6, 0, -0.86, 1.9, "dark");
    if (cooling) { u.B(0.16, 0.5, 0.9, -0.94, -0.8, 0.1, COPPER); u.C(0.045, 0.045, 0.6, -0.98, -0.3, -0.2, "supply", 8); u.C(0.045, 0.045, 0.6, -0.98, -0.3, 0.4, "return", 8); u.B(1.64, 0.1, 1.34, 0, -0.5, 0, "supply"); }
  }
  const SHAPES = {
    // ---- air handlers: one base cabinet, with a visible feature that tells each type apart ----
    ahu: u => cabinet(u, 9),
    // knockdown: the same unit as separate sections, one still being lowered into place
    "ahu-knockdown": u => { for (let k = 0; k < 3; k++) { const x = -3.3 + k * 3.3, up = k === 1 ? 1.6 : 0; u.B(2.7, 3, 3.2, x, 0.25 + up, 0, "unit"); u.B(2.76, 0.25, 3.26, x, up, 0, "trim"); u.B(1.2, 2.2, 0.06, x, 0.6 + up, 1.62, "#dfe7ee"); if (up) { u.C(0.04, 0.04, 2.2, x - 1, 3.25 + up, 1, "dark"); u.C(0.04, 0.04, 2.2, x + 1, 3.25 + up, -1, "dark"); u.B(2.6, 0.12, 0.12, x, 5.4 + up, 0, "#ffa500"); } } },
    // AcoustiFLO: the round fan with its perforated casing shows at the open end
    "ahu-acoustiflo": u => { cabinet(u, 7, -1.2); u.B(2.2, 3, 3.2, 3.5, 0.25, 0, "#2f3a46"); const f = u.C(1.35, 1.35, 1.5, 3.7, 1.0, 0, "#d9c9a0", 28); f.rotation.z = Math.PI / 2; const hub = u.C(0.5, 0.5, 1.6, 3.75, 1.25, 0, "#c9a23a", 16); hub.rotation.z = Math.PI / 2; u.B(0.12, 0.5, 3, 4.5, 0.3, 0, "#1f4fb4"); },
    // gas-phase filtration: a bank of black media cassettes with yellow straps
    "ahu-gas": u => { cabinet(u, 9); u.B(2.3, 2.6, 0.08, 1.2, 0.45, 1.64, "#1b1f24"); for (let i = 0; i < 3; i++) for (let k = 0; k < 2; k++) { u.B(0.62, 1.1, 0.1, 0.45 + i * 0.75, 0.6 + k * 1.25, 1.66, "#2a2f36"); u.B(0.5, 0.14, 0.12, 0.45 + i * 0.75, 0.95 + k * 1.25, 1.68, "#f2d21b"); } },
    // low-temp desiccant: desiccant wheel in the side, reactivation duct on top
    "ahu-desiccant": u => { cabinet(u, 9); const wh = u.C(1.2, 1.2, 0.2, 1.4, 1.1, 1.66, "#2e9e5b", 28); wh.rotation.x = Math.PI / 2; const hub = u.C(0.2, 0.2, 0.26, 1.4, 1.62, 1.66, "dark", 10); hub.rotation.x = Math.PI / 2; u.B(1, 0.8, 1, 1.4, 3.25, 0.6, "#ffa500"); u.C(0.35, 0.35, 1.2, 1.4, 4.05, 0.6, "#ffa500"); },
    // Temtrol LC: a short, compact cabinet
    "ahu-lc": u => { u.B(5, 2.2, 2.6, 0, 0.25, 0); u.trim(5, 2.6, 0, 0); u.B(0.08, 2.2, 2.64, -0.8, 0.25, 0, GALV); u.B(0.08, 2.2, 2.64, 0.9, 0.25, 0, GALV); u.B(1, 1.6, 0.06, 0, 0.55, 1.32, "#dfe7ee"); u.B(0.1, 1.4, 1.8, -2.52, 0.6, 0, "dark"); u.B(1.2, 0.6, 1.4, 1.7, 2.45, 0, "supply"); },
    // washdown: stainless cabinet on a sloped drain pan
    "ahu-washdown": u => { u.B(9, 0.3, 3.6, 0, 0, 0, "#1e9be8"); u.B(9, 3, 3.2, 0, 0.3, 0, STAIN); for (let k = -1; k <= 2; k++) u.B(0.08, 3, 3.24, k * 2.2 - 1, 0.3, 0, "#8d99a3"); for (let k = 0; k < 3; k++) u.B(1.2, 2.2, 0.06, -2.1 + k * 2.2, 0.65, 1.62, "#eef3f6"); const dr = u.C(0.12, 0.12, 0.9, 4.2, 0.05, 2.1, "#1e9be8"); dr.rotation.x = Math.PI / 2; },
    // V-Cube: a tall vertical self-contained unit
    vcube: u => { u.B(3.2, 4.8, 2.6, 0, 0.25, 0); u.trim(3.2, 2.6, 0, 0); u.B(1.3, 3.6, 0.06, -0.75, 0.6, 1.32, "#dfe7ee"); u.B(1.3, 3.6, 0.06, 0.75, 0.6, 1.32, "#dfe7ee"); u.B(2.4, 0.5, 1.8, 0, 5.05, 0, "supply"); u.B(0.5, 0.3, 0.06, 0.75, 3.4, 1.36, "#1e9be8"); },
    rooftop: u => { u.B(6.5, 2.4, 3.4, 0, 0.25, 0); u.trim(6.5, 3.4, 0, 0); u.fanTop(0.85, 1.4, 2.65, 0); u.fanTop(0.85, -0.6, 2.65, 0); u.B(0.08, 1.8, 3, 3.27, 0.5, 0, "dark"); const hood = u.B(1.4, 0.9, 3, -3.6, 1.6, 0, GALV); hood.rotation.z = -0.5; for (let k = 0; k < 6; k++) u.B(0.06, 1.6, 0.06, 0.2 + k * 0.5, 0.5, 1.72, GALV); },
    chiller: u => { u.B(9, 0.5, 2.6, 0, 0.25, 0, SLATE); u.trim(9, 2.6, 0, 0); for (let k = 0; k < 4; k++) { const x = -3.3 + k * 2.2; const a = u.B(0.12, 2, 2.4, x - 0.5, 0.8, 0, GALV); a.rotation.z = 0.32; const b = u.B(0.12, 2, 2.4, x + 0.5, 0.8, 0, GALV); b.rotation.z = -0.32; u.fanTop(0.8, x, 2.75, 0); u.B(2, 0.12, 2.5, x, 2.65, 0); } u.C(0.5, 0.5, 2.2, 3.3, 0.6, 1.5, "#1779ba").rotation.z = Math.PI / 2; },
    fanwall: u => fanArray(u, 3, 2, false),
    // CoilWall: the same fan cells with a chilled water coil across the back
    coilwall: u => fanArray(u, 3, 2, true),
    erv: u => { u.B(6, 2.4, 3, 0, 0.25, 0); u.trim(6, 3, 0, 0); const wh = u.C(1.05, 1.05, 0.3, 0, 1.4, 1.36, "#f7b500", 24); wh.rotation.x = Math.PI / 2; const hub = u.C(0.2, 0.2, 0.36, 0, 1.38, 1.36, "dark", 10); hub.rotation.x = Math.PI / 2; u.B(1.2, 1, 1.2, -3.5, 1.2, 0.8, GALV); u.B(1.2, 1, 1.2, 3.5, 1.2, -0.8, GALV); },
    // wheel in its cassette: the rotor, hub and the seal that splits supply from exhaust
    wheel: u => { u.B(3.1, 0.2, 1, 0, 0, 0, "trim"); u.B(3, 3, 0.6, 0, 0.2, 0, "#dfe7ee"); u.Z(1.32, 0.72, 0, 1.7, 0, "#f7b500", 32); u.Z(0.22, 0.8, 0, 1.7, 0, "dark", 10); u.B(2.7, 0.1, 0.76, 0, 1.65, 0, "dark"); for (let k = 1; k < 6; k++) { const sp = u.B(2.6, 0.03, 0.74, 0, 1.685, 0, "#d99a00"); sp.rotation.z = k * Math.PI / 6; } u.B(0.4, 0.4, 0.3, 1.2, 0.25, 0.45, SLATE); },
    plate: u => { u.B(3.4, 3, 2, 0, 0.25, 0, "#dfe7ee"); const p = u.B(1.9, 1.9, 2.06, 0, 0.8, 0, GALV); p.rotation.z = Math.PI / 4; u.B(1, 0.7, 1.4, -2.1, 2.2, 0, "supply"); u.B(1, 0.7, 1.4, 2.1, 0.6, 0, "return"); },
    mua: u => { u.B(7, 2.4, 2.8, 0, 0.25, 0); u.trim(7, 2.8, 0, 0); u.B(1.8, 2.44, 2.84, -1, 0.25, 0, "#ffa500"); const hood = u.B(1.6, 1, 2.6, -4, 1.5, 0, GALV); hood.rotation.z = -0.5; u.C(0.25, 0.25, 1.6, -1, 2.65, 0, "dark"); u.B(1.4, 1.2, 2, 4, 0.9, 0, "supply"); },
    turnover: u => { u.B(2.2, 6.5, 2.2, 0, 0, 0); u.trim(2.2, 2.2, 0, 0); for (let k = 0; k < 4; k++) u.B(2.26, 0.12, 1.8, 0, 5.2 + k * 0.3, 0, "dark"); u.B(1.8, 1.4, 0.06, 0, 0.5, 1.12, "dark"); u.B(2.26, 0.5, 2.26, 0, 3, 0, "#ffa500"); },
    // ---- coils, each shown in a section of air handler ----
    coil: u => coil(u, "water"),
    "coil-dx": u => coil(u, "dx"),
    "coil-steam": u => coil(u, "steam"),
    "coil-freeze": u => coil(u, "freeze"),       // red pressure relief on every return bend
    "coil-smart": u => coil(u, "smart"),         // freeze sensors on the face, wired to a control panel
    // booster coil in a length of duct
    "coil-duct": u => { u.hang(0.9, 0.3, -0.2); u.B(2.6, 0.6, 0.8, 0, -0.8, 0, DUCT); u.B(0.4, 0.66, 0.86, 0, -0.83, 0, COPPER); for (let k = -1; k <= 1; k++) u.B(0.03, 0.68, 0.88, k * 0.12, -0.84, 0, GALV); u.pipes(0, -0.2, 0.3, 0.6); },
    // ---- UV-C ----
    // lamps on a rack inside the air handler, shining on the cooling coil
    uv: u => {
      u.casing(3.5, 2.7, 1.9, 0, 0);
      u.B(2.6, 2.1, 0.4, 0, 0.4, -0.5, COPPER); for (let k = 0; k <= 13; k++) u.B(0.035, 2.1, 0.43, -1.3 + k * 0.2, 0.4, -0.5, GALV);
      u.see(u.B(2.6, 2.1, 0.03, 0, 0.4, -0.26, "glass"), UVGLOW);
      [-1.2, 1.2].forEach(x => u.B(0.07, 2.2, 0.07, x, 0.35, 0.3, SLATE));
      for (let k = 0; k < 4; k++) { u.see(u.X(0.06, 2.3, 0, 0.7 + k * 0.5, 0.3, "glass", 10), UVLAMP); u.B(0.16, 0.14, 0.14, -1.2, 0.63 + k * 0.5, 0.3, "#e9edf0"); u.B(0.16, 0.14, 0.14, 1.2, 0.63 + k * 0.5, 0.3, "#e9edf0"); }
      u.B(0.6, 0.8, 0.2, 1.1, 1.1, 1.05, SLATE); u.B(0.3, 0.12, 0.04, 1.1, 1.6, 1.16, "#8f7bff");       // power supply on the outside of the casing
    },
    // fixtures bolted to the outside of a plenum or duct, with the lamps reaching in through the wall
    "uv-ext": u => {
      u.casing(3.5, 2.7, 1.9, 0, 0);
      u.B(0.12, 2.5, 1.8, 1.72, 0.25, 0, "#e9edf0");                                                     // the plenum wall the fixtures mount through
      [0.9, 1.9].forEach(y => { u.B(0.35, 0.5, 1.1, 1.98, y - 0.25, 0, SLATE); u.B(0.04, 0.2, 0.3, 2.17, y - 0.1, 0, "#8f7bff"); [-0.3, 0.3].forEach(z => u.see(u.X(0.06, 2.6, 0.35, y, z, "glass", 10), UVLAMP)); });
      u.see(u.B(2.9, 2.2, 1.5, 0.1, 0.35, 0, "glass"), UVGLOW);
    },
    // upper-room UV: a louvred fixture high on the wall, with the band of UV it throws across the top of the room
    upperuv: u => { u.wall(2.4, 1.9, 0, -1.7, -0.3); u.B(1.3, 0.35, 0.4, 0, -0.75, 0, "#e9edf0"); for (let k = 0; k < 4; k++) u.B(1.34, 0.03, 0.44, 0, -0.72 + k * 0.08, 0, SLATE); u.see(u.B(5, 0.14, 3.6, 0, -0.67, 2.1, "glass"), UVGLOW); u.see(u.B(1.2, 0.12, 0.06, 0, -0.65, 0.23, "glass"), UVLAMP); },
    // ---- humidifiers ----
    // electric steam humidifier: wall cabinet making its own steam, hose up to a dispersion tube in the duct
    humidifier: u => {
      u.wall(3.4, 2.7, 0, 0, -0.35);
      u.B(1, 1.3, 0.5, -0.9, 0.6, 0); u.B(1.04, 0.14, 0.54, -0.9, 0.6, 0, "trim"); u.B(0.03, 1.1, 0.03, -0.75, 0.75, 0.26, GALV); u.B(0.4, 0.25, 0.04, -1.1, 1.5, 0.26, "#1e9be8");
      u.C(0.035, 0.035, 0.6, -1.2, 0, 0, "supply", 8); u.C(0.035, 0.035, 0.6, -1.05, 0, 0, SLATE, 8);    // water in, drain out
      u.C(0.09, 0.09, 0.55, -0.6, 1.9, 0, "dark", 10); u.X(0.09, 0.9, -0.2, 2.42, 0, "dark", 10);        // steam hose
      u.ductGlass(2.2, 0.8, 0.9, 0.5, 2.0, 0.1);
      u.X(0.06, 1.7, 0.6, 2.42, 0.1, STAIN, 10); steam(u, 0, 2.5, 0.1, 3);
    },
    // boiler steam injection: a multi-tube manifold across the air handler, steam valve and trap outside
    "humidifier-steam": u => {
      u.casing(3, 2.7, 1.5, -0.3, 0);
      u.X(0.09, 2.4, -0.3, 0.5, 0, STAIN, 10); u.X(0.09, 2.4, -0.3, 2.6, 0, STAIN, 10);
      for (let k = 0; k < 6; k++) u.C(0.05, 0.05, 2.1, -1.3 + k * 0.4, 0.5, 0, STAIN, 8);
      for (let k = 0; k < 3; k++) { u.puff(0.2, -1.1 + k * 0.8, 1.2 + (k % 2) * 0.6, 0.35); u.puff(0.15, -0.7 + k * 0.8, 1.9 - (k % 2) * 0.7, 0.5); }
      u.X(0.08, 1.2, 1.5, 2.6, 0, HOT, 10); u.C(0.08, 0.08, 2.1, 2.05, 0.5, 0, HOT, 10);                  // steam supply
      u.B(0.3, 0.3, 0.3, 1.9, 1.5, 0, "trim"); u.C(0.2, 0.2, 0.5, 2.05, 0.9, 0, STAIN, 12);               // control valve and separator
      u.B(0.25, 0.25, 0.25, 1.92, 0.2, 0, SLATE);                                                         // trap
    },
    // steam-to-steam: boiler steam heats a tank of clean water, and the clean steam goes to the duct
    "humidifier-exchange": u => {
      [-0.7, 0.7].forEach(x => [-0.3, 0.3].forEach(z => u.B(0.08, 0.5, 0.08, x, 0, z, SLATE)));
      u.B(1.9, 1, 0.9, 0, 0.5, 0, STAIN); u.B(1.94, 0.08, 0.94, 0, 0.5, 0, "trim"); u.B(0.5, 0.6, 0.06, 0.5, 0.7, 0.46, SLATE); u.B(0.3, 0.15, 0.04, 0.5, 1.05, 0.5, "#1e9be8");
      u.X(0.08, 0.9, -1.35, 0.8, 0.2, HOT, 10); u.X(0.06, 0.9, -1.35, 0.65, -0.2, "return", 10); u.B(0.25, 0.25, 0.25, -1.3, 0.7, 0.2, "trim");   // boiler steam in, condensate out
      u.C(0.3, 0.2, 0.3, -0.3, 1.5, 0, STAIN, 14); u.C(0.09, 0.09, 0.55, -0.3, 1.8, 0, "dark", 10);
      u.ductGlass(2.6, 0.8, 0.9, 0, 2.0, 0); u.X(0.06, 2.1, 0.1, 2.4, 0, STAIN, 10); steam(u, -0.6, 2.5, 0, 3);
    },
    // evaporative: wetted media across the airstream, water header above and a sump below
    evap: u => {
      u.casing(3.2, 2.7, 1.6, 0, 0);
      u.B(2.8, 0.25, 1, 0, 0.22, 0, "#38b6e8"); u.B(2.9, 0.3, 1.1, 0, 0.2, 0, STAIN);
      u.B(2.6, 1.9, 0.5, 0, 0.55, 0, "#8fc9b0"); for (let k = 0; k <= 16; k++) { const f = u.B(0.03, 1.95, 0.52, -1.28 + k * 0.16, 0.53, 0, "#5fa78c"); f.rotation.z = 0.12; }
      u.X(0.06, 2.6, 0, 2.55, 0, "supply", 8); u.C(0.05, 0.05, 2.1, 1.42, 0.45, 0.4, "supply", 8); u.C(0.14, 0.14, 0.3, 1.42, 0.3, 0.4, SLATE, 10);
      for (let k = 0; k < 5; k++) u.B(0.05, 0.12, 0.05, -1 + k * 0.5, 2.38, 0, "#38b6e8");
    },
    // atomizing and ultrasonic: rows of nozzles putting out a fine fog
    atomizer: u => {
      u.casing(3.2, 2.7, 1.9, 0, 0);
      [-1.3, 1.3].forEach(x => u.B(0.07, 2.3, 0.07, x, 0.3, -0.5, SLATE));
      for (let k = 0; k < 3; k++) { const y = 0.8 + k * 0.7; u.X(0.045, 2.6, 0, y, -0.5, "supply", 8); u.X(0.03, 2.6, 0, y + 0.12, -0.5, GALV, 8);
        for (let i = 0; i < 4; i++) { const x = -1.05 + i * 0.7; u.B(0.1, 0.1, 0.16, x, y - 0.05, -0.4, "#c9a23a"); u.see(u.Z(0.03, 0.9, x, y, 0.13, "glass", 12, 0.3), MIST); } }
      u.B(0.6, 0.8, 0.2, -1, 1.2, 1.05, SLATE); u.B(0.3, 0.2, 0.04, -1, 1.65, 1.16, "#1e9be8");
    },
    // desiccant dehumidifier: the rotor shows in the front, dry air leaves on the right, wet reactivation air goes up
    dehumidifier: u => {
      u.B(3.4, 2, 1.8, 0, 0.25, 0); u.trim(3.4, 1.8, 0, 0);
      u.Z(0.85, 0.2, -0.6, 1.25, 0.86, "#2e9e5b", 28); u.Z(0.16, 0.26, -0.6, 1.25, 0.86, "dark", 10); const sec = u.B(0.85, 0.5, 0.22, -0.6, 1.25, 0.86, "#ffa500"); sec.rotation.z = 0.5;
      u.B(1, 0.7, 1, 1.1, 2.25, 0, "#ffa500"); u.C(0.3, 0.3, 1, 1.1, 2.95, 0, "#ffa500");
      u.X(0.4, 0.5, 1.9, 1.2, 0, "supply", 16); u.X(0.4, 0.5, -1.9, 1.2, 0, GALV, 16);
      u.B(0.8, 0.6, 0.06, 1, 0.9, 0.92, "dark"); u.B(0.3, 0.15, 0.04, 1, 1.25, 0.95, "#1e9be8");
    },
    crah: u => { for (let k = 0; k < 2; k++) { u.B(1.8, 2.3, 1, -1 + k * 2, 0, 0, "#2f3a46"); u.B(1.5, 0.9, 0.06, -1 + k * 2, 0.2, 0.52, "dark"); u.B(0.5, 0.3, 0.06, -1 + k * 2, 1.6, 0.52, "#1e9be8"); } u.B(3.9, 0.25, 1.06, 0, 0, 0, "trim"); },
    vrf: u => { for (let k = 0; k < 2; k++) { u.B(1.3, 1.9, 0.9, -0.75 + k * 1.5, 0.15, 0); u.fanTop(0.5, -0.75 + k * 1.5, 2.05, 0); u.B(1.1, 1.2, 0.05, -0.75 + k * 1.5, 0.4, 0.47, GALV); } u.B(3, 0.15, 1, 0, 0, 0, "trim"); },
    wshp: u => { u.B(1.1, 2, 1.1, 0, 0, 0); u.trim(1.1, 1.1, 0, 0); u.B(0.9, 0.7, 0.05, 0, 0.4, 0.57, "dark"); u.C(0.08, 0.08, 0.8, -0.3, 2, 0, "supply"); u.C(0.08, 0.08, 0.8, 0.3, 2, 0, "return"); u.B(0.8, 0.5, 0.8, 0, 2, 0, GALV); },
    // ---- fan coils and blower coils ----
    // horizontal fan coil hung above the ceiling: filter at the back, short duct to a diffuser, piping on the side
    fancoil: u => { u.hang(0.65, 0.4, -0.3); u.B(1.5, 0.5, 1, 0, -0.8, 0); u.B(1.55, 0.07, 1.05, 0, -0.84, 0, "trim"); u.B(1.3, 0.4, 0.05, 0, -0.75, -0.52, "dark"); u.B(1.2, 0.36, 0.8, 0, -0.72, 0.9, "supply"); u.B(1.1, 0.05, 0.5, 0, -0.78, 1.15, "dark"); u.pipes(0.85, -0.6, -0.2, 0.6); u.B(0.2, 0.25, 0.5, 0.85, -0.7, -0.1, "trim"); },
    // low-profile fan coil: a wide, shallow cabinet with a linear grille underneath
    "fancoil-low": u => { u.hang(0.95, 0.4, -0.22); u.B(2.2, 0.26, 1, 0, -0.48, 0); u.B(2.26, 0.05, 1.06, 0, -0.5, 0, "trim"); u.B(1.9, 0.03, 0.16, 0, -0.52, 0.32, "dark"); for (let k = 0; k < 9; k++) u.B(0.03, 0.03, 0.4, -0.8 + k * 0.2, -0.52, -0.2, "#8d99a3"); u.pipes(1.2, -0.45, -0.2, 0.45); },
    // blower coil: a larger hung unit with its blower housing, ducted to more than one diffuser
    blowercoil: u => { u.hang(0.7, 0.6, -0.35); u.B(1.6, 0.85, 1.4, 0, -1.2, 0); u.B(1.65, 0.08, 1.45, 0, -1.24, 0, "trim"); u.B(1.4, 0.7, 0.06, 0, -1.12, -0.72, "dark"); u.X(0.34, 1, 0, -0.75, 0.75, GALV, 18); u.B(0.9, 0.5, 1.2, 0, -1.0, 1.5, "supply"); u.B(3, 0.4, 0.5, 0, -0.95, 2.3, "supply"); [-1.2, 1.2].forEach(x => { u.C(0.32, 0.22, 0.2, x, -1.15, 2.3, GALV, 16); u.C(0.34, 0.34, 0.03, x, -1.18, 2.3, "dark", 16); }); u.pipes(0.92, -0.9, -0.3, 0.9); u.B(0.22, 0.3, 0.6, 0.92, -1.05, -0.2, "trim"); },
    // vertical blower coil in a closet: filter door low, duct rising off the top and turning into the room
    "blowercoil-vertical": u => { u.wall(1.7, 2.6, 0, 0, -0.6); u.B(0.14, 2.6, 1.2, -0.85, 0, -0.05, "#e3e8ec"); u.B(0.9, 1.9, 0.9, 0, 0, 0); u.trim(0.9, 0.9, 0, 0); u.B(0.75, 0.6, 0.05, 0, 0.3, 0.46, "dark"); u.B(0.92, 0.04, 0.92, 0, 0.95, 0, GALV); u.B(0.5, 0.4, 0.05, 0, 1.2, 0.46, "#dfe7ee"); u.B(0.6, 0.5, 0.6, 0, 1.9, 0, "supply"); u.B(0.6, 0.4, 1.5, 0, 2.3, 0.45, "supply"); u.B(0.7, 0.05, 0.4, 0, 2.26, 1, "dark"); u.C(0.05, 0.05, 1.6, 0.55, 0.4, -0.2, "supply", 8); u.C(0.05, 0.05, 1.6, 0.55, 0.4, 0.05, "return", 8); },
    // hi-rise fan coil: a full-height cabinet stacked floor on floor, with the risers running through the slabs
    "fancoil-hirise": u => { const H = Math.min(3, u.roomH - 0.1); u.B(0.75, H, 0.7, 0, 0, 0); u.trim(0.75, 0.7, 0, 0); u.B(0.55, 0.32, 0.04, 0, H - 0.6, 0.36, "dark"); slats(u, 0.55, 0.32, 0, H - 0.6, 0.38, 4, GALV); u.B(0.6, 0.9, 0.04, 0, 0.35, 0.36, DUCT); slats(u, 0.56, 0.86, 0, 0.37, 0.38, 8, "#8d99a3"); u.B(0.14, 0.2, 0.03, 0.2, 1.5, 0.37, "#1e9be8"); ["supply", "return", GALV].forEach((m, k) => u.C(0.055, 0.055, u.roomH + 1.2, 0.5 + k * 0.16, -0.4, -0.15, m, 8)); },
    // vertical fan coil: an upright cabinet with the return grille low and a discharge grille on top
    "fancoil-vertical": u => { u.B(1, 1.5, 0.55, 0, 0, 0); u.trim(1, 0.55, 0, 0); u.B(0.85, 0.45, 0.04, 0, 0.3, 0.28, "dark"); slats(u, 0.85, 0.45, 0, 0.3, 0.3, 5, GALV); u.B(1, 0.45, 0.55, 0, 1.5, 0, DUCT); u.B(0.85, 0.3, 0.04, 0, 1.58, 0.28, "dark"); slats(u, 0.85, 0.3, 0, 1.58, 0.3, 3, GALV); u.B(0.3, 0.2, 0.03, 0.25, 1.1, 0.28, "trim"); u.C(0.05, 0.05, 1.3, 0.6, 0, -0.1, "supply", 8); u.C(0.05, 0.05, 1.3, 0.6, 0, 0.1, "return", 8); },
    // floor-mounted fan coil under the window: discharge grille on top, air drawn in at the toe
    "fancoil-floor": u => { u.B(1.6, 0.62, 0.28, 0, 0.12, 0); u.B(1.5, 0.12, 0.22, 0, 0, 0, "dark"); u.B(1.3, 0.03, 0.16, -0.1, 0.74, 0, "dark"); for (let k = 0; k < 12; k++) u.B(0.03, 0.04, 0.16, -0.7 + k * 0.11, 0.74, 0, GALV); u.B(0.22, 0.03, 0.16, 0.65, 0.74, 0, "trim"); u.B(1.6, 0.04, 0.3, 0, 0.12, 0, "trim"); },
    // low-profile floor fan coil: longer and lower, to sit under a low sill
    "fancoil-floor-low": u => { u.B(2.3, 0.36, 0.3, 0, 0.1, 0); u.B(2.2, 0.1, 0.24, 0, 0, 0, "dark"); u.B(1.9, 0.03, 0.18, -0.12, 0.46, 0, "dark"); for (let k = 0; k < 17; k++) u.B(0.03, 0.04, 0.18, -1 + k * 0.11, 0.46, 0, GALV); u.B(0.24, 0.03, 0.18, 0.98, 0.46, 0, "trim"); u.B(2.3, 0.04, 0.32, 0, 0.1, 0, "trim"); },
    // round exposed ceiling fan coil
    "fancoil-round": u => { u.C(0.06, 0.06, 0.75 / 1 + 0.25, 0, -0.25, 0, SLATE, 10); u.C(0.8, 0.8, 0.28, 0, -0.53, 0, "#ffffff", 32); u.C(0.82, 0.82, 0.05, 0, -0.42, 0, "trim", 32); u.C(0.6, 0.6, 0.03, 0, -0.56, 0, "dark", 32); u.C(0.25, 0.25, 0.04, 0, -0.58, 0, "#ffffff", 20); },
    // ---- VAV terminals ----
    // single-duct VAV box: round primary-air inlet at the back, connected to the supply main; rectangular discharge at the front
    vav: u => { u.hang(0.5, 0.35, -0.25); u.B(1.2, 0.5, 0.9, 0, -0.75, 0, DUCT); u.toMain(0.2, -0.5, -0.45); u.B(0.3, 0.3, 0.25, 0.75, -0.65, -0.1, "trim"); u.B(0.95, 0.4, 0.9, 0, -0.7, 0.9, "supply"); u.B(1.05, 0.06, 0.5, 0, -0.75, 1.5, "dark"); },
    "vav-fan": u => vavFan(u, false),
    "vav-cooling": u => vavFan(u, true),
    // ---- other ceiling and wall mounted units ----
    cassette: u => { u.B(1.3, 0.3, 1.3, 0, -0.3, 0); u.B(1.4, 0.05, 1.4, 0, -0.34, 0, "#ffffff"); u.B(0.75, 0.04, 0.75, 0, -0.37, 0, "dark"); [-1, 1].forEach(k => { u.B(1, 0.04, 0.1, 0, -0.37, k * 0.56, "dark"); u.B(0.1, 0.04, 1, k * 0.56, -0.37, 0, "dark"); }); u.B(1.36, 0.06, 1.36, 0, -0.3, 0, "trim"); },
    minisplit: u => { u.wall(2.4, 1.7, 0, -1.7, -0.3); u.B(1.6, 0.5, 0.36, 0, -0.75, 0); u.B(1.6, 0.08, 0.38, 0, -0.77, 0, "trim"); u.B(1.3, 0.05, 0.1, 0, -0.74, 0.2, "dark"); u.B(0.05, 0.9, 0.05, 0.7, -1.65, -0.2, GALV); },
    // packaged terminal unit: through the wall under the window
    ptac: u => { u.wall(2.6, 2.6, 0, 0, -0.25); u.see(u.B(1.7, 1.1, 0.06, 0, 1.25, -0.2, "glass"), material("glass")); u.B(1.8, 0.08, 0.2, 0, 1.17, -0.15, "#ffffff"); u.B(1.2, 0.45, 0.4, 0, 0.12, 0); u.B(1.2, 0.05, 0.42, 0, 0.12, 0, "trim"); u.B(1.05, 0.03, 0.18, -0.05, 0.57, 0.05, "dark"); for (let k = 0; k < 9; k++) u.B(0.03, 0.04, 0.18, -0.5 + k * 0.11, 0.57, 0.05, GALV); u.B(0.2, 0.03, 0.14, 0.48, 0.575, 0.05, "#1e9be8"); u.B(1.1, 0.1, 0.02, 0, 0.16, 0.2, "dark"); },
    unitheater: u => { u.C(0.05, 0.05, 0.8, -0.4, -0.8, 0, "dark"); u.C(0.05, 0.05, 0.8, 0.4, -0.8, 0, "dark"); u.B(1.2, 1, 0.9, 0, -1.8, 0, "#ffa500"); for (let k = 0; k < 4; k++) u.B(1.1, 0.06, 0.1, 0, -1.7 + k * 0.22, 0.48, "dark"); u.Z(0.4, 0.2, 0, -1.3, -0.5, "dark", 18); },
    ductheater: u => { u.hang(0.8, 0.25, -0.2); u.B(2.2, 0.6, 0.7, 0, -0.8, 0, DUCT); u.B(0.5, 0.64, 0.74, 0, -0.82, 0, HOT); u.B(0.35, 0.5, 0.3, 0, -0.75, 0.5, "dark"); },
    aircurtain: u => { u.B(2.8, 0.4, 0.6, 0, -0.4, 0); u.B(2.6, 0.06, 0.2, 0, -0.44, 0.1, "dark"); u.B(2.8, 0.1, 0.62, 0, -0.1, 0, "trim"); for (let k = 0; k < 5; k++) u.B(0.04, 1.3, 0.04, -1 + k * 0.5, -1.75, 0.1, "#8fd0f5"); },
    orceiling: u => { u.B(3.4, 0.2, 3.4, 0, -0.2, 0); for (let i = -1; i <= 1; i++) for (let k = -1; k <= 1; k++) u.B(0.95, 0.06, 0.95, i * 1.1, -0.24, k * 1.1, "#dff3ff"); u.B(3.5, 0.08, 3.5, 0, -0.1, 0, "trim"); },
    ffu: u => { for (let i = -1; i <= 1; i++) for (let k = -1; k <= 1; k++) { u.B(1.1, 0.35, 1.1, i * 1.3, -0.35, k * 1.3); u.B(0.9, 0.05, 0.9, i * 1.3, -0.38, k * 1.3, "#dff3ff"); } },
    // radiant ceiling panels with their pipe connection
    radiantpanel: u => { for (let i = -1; i <= 1; i++) { u.B(0.9, 0.06, 2.4, i, -0.3, 0, "#ffffff"); u.B(0.8, 0.02, 2.3, i, -0.32, 0, "#ffd9b0"); } u.X(0.04, 2.9, 0, -0.18, -1, HOT, 8); u.C(0.04, 0.04, 0.4, 1.4, -0.2, -1, HOT, 8); },
    // ---- floor-standing room units ----
    radiator: u => { u.B(2.2, 0.9, 0.12, 0, 0.25, 0, "#ffffff"); for (let k = 0; k < 8; k++) u.B(0.03, 0.9, 0.14, -0.95 + k * 0.27, 0.25, 0, DUCT); u.C(0.05, 0.05, 0.25, -1, 0, 0, "dark"); u.C(0.05, 0.05, 0.25, 1, 0, 0, "dark"); },
    // cabinet unit heater or convector: grilles top and bottom, heating colour stripe
    cabinetheater: u => { u.B(1.4, 0.75, 0.3, 0, 0.1, 0); u.B(1.2, 0.16, 0.04, 0, 0.18, 0.16, "dark"); u.B(1.2, 0.16, 0.04, 0, 0.62, 0.16, "dark"); slats(u, 1.2, 0.16, 0, 0.62, 0.18, 3, GALV); u.B(1.44, 0.06, 0.34, 0, 0.42, 0, "#ffa500"); u.B(1.3, 0.1, 0.24, 0, 0, 0, "dark"); },
    fintube: u => { u.B(4.5, 0.5, 0.25, 0, 0.1, 0, "#dfe7ee"); u.B(4.5, 0.05, 0.3, 0, 0.6, 0, "dark"); u.B(4.5, 0.08, 0.27, 0, 0.1, 0, "trim"); },
    trench: u => { u.B(4.2, 0.1, 0.5, 0, 0, 0, "dark"); for (let k = 0; k < 14; k++) u.B(0.05, 0.12, 0.5, -1.95 + k * 0.3, 0, 0, GALV); u.B(4.3, 0.06, 0.6, 0, 0, 0, "trim"); },
    box: u => { u.B(2, 1.4, 1.2, 0, 0, 0); u.trim(2, 1.2, 0, 0); }
  };
  /*
   * What the layout needs to know about each shape: [where it goes, width, indoor scale, height].
   *   "floor"      stands on the floor            "perimeter"  low, along the window line
   *   "ceiling"    hangs from the ceiling         "wall"       high on its own piece of wall
   * Width and height are in metres at full size. Indoors a shape is drawn at its indoor scale,
   * and smaller still if the room is too low or too crowded for it.
   */
  const SPEC = {
    ahu: ["floor", 9.4, 0.6, 4.2], "ahu-knockdown": ["floor", 9.6, 0.6, 7.2], "ahu-acoustiflo": ["floor", 9.6, 0.6, 4.2], "ahu-gas": ["floor", 9.4, 0.6, 4.2], "ahu-desiccant": ["floor", 9.4, 0.6, 5.3],
    "ahu-lc": ["floor", 5.2, 0.7, 3.1], "ahu-washdown": ["floor", 9.4, 0.6, 3.3], vcube: ["floor", 3.4, 0.6, 5.6], rooftop: ["floor", 8, 0.55, 2.8], chiller: ["floor", 9.2, 0.55, 2.9],
    fanwall: ["floor", 4.5, 0.8, 3.1], coilwall: ["floor", 4.6, 0.8, 3.1], erv: ["floor", 8.4, 0.55, 2.7], wheel: ["floor", 3.2, 0.75, 3.3], plate: ["floor", 5.4, 0.6, 3.3], mua: ["floor", 9.6, 0.5, 4.3],
    turnover: ["floor", 2.4, 0.9, 6.6], coil: ["floor", 3.7, 0.75, 3], "coil-dx": ["floor", 3.9, 0.75, 3], "coil-steam": ["floor", 3.7, 0.75, 3], "coil-freeze": ["floor", 3.8, 0.75, 3], "coil-smart": ["floor", 3.7, 0.75, 3],
    uv: ["floor", 3.7, 0.75, 3], "uv-ext": ["floor", 4, 0.75, 3], humidifier: ["floor", 3.5, 0.85, 2.9], "humidifier-steam": ["floor", 4.2, 0.75, 3], "humidifier-exchange": ["floor", 3.4, 0.85, 2.9],
    evap: ["floor", 3.4, 0.75, 3], atomizer: ["floor", 3.4, 0.75, 3], dehumidifier: ["floor", 4.4, 0.75, 4], crah: ["floor", 4, 1, 2.4], vrf: ["floor", 3.1, 1, 2.2], wshp: ["floor", 1.3, 1.1, 2.8],
    "blowercoil-vertical": ["floor", 1.9, 1, 2.8], "fancoil-hirise": ["floor", 1.6, 1, 0], "fancoil-vertical": ["floor", 1.4, 1.15, 2], ptac: ["floor", 2.7, 0.95, 2.6], box: ["floor", 2.1, 1, 1.4],
    "fancoil-floor": ["perimeter", 1.7, 1.35, 0.8], "fancoil-floor-low": ["perimeter", 2.4, 1.35, 0.5], radiator: ["perimeter", 2.3, 1.25, 1.2], cabinetheater: ["perimeter", 1.5, 1.35, 0.9],
    fintube: ["perimeter", 4.6, 1, 0.7], trench: ["perimeter", 4.4, 1, 0.2],
    fancoil: ["ceiling", 2, 1.25], "fancoil-low": ["ceiling", 2.6, 1.2], blowercoil: ["ceiling", 3.1, 1.05], "fancoil-round": ["ceiling", 1.8, 1.3], "coil-duct": ["ceiling", 2.7, 1.1],
    vav: ["ceiling", 1.6, 1.25], "vav-fan": ["ceiling", 2, 1.2], "vav-cooling": ["ceiling", 2.1, 1.2], cassette: ["ceiling", 1.5, 1.35], unitheater: ["ceiling", 1.3, 1.25], ductheater: ["ceiling", 2.3, 1.2],
    aircurtain: ["ceiling", 2.9, 1], orceiling: ["ceiling", 3.6, 1.1], ffu: ["ceiling", 3.8, 1.1], radiantpanel: ["ceiling", 3, 1.1],
    minisplit: ["wall", 2.5, 1.15], upperuv: ["wall", 2.6, 1.15]
  };

  /*
   * Works out where each piece of equipment at one location goes.
   * room: { x, w, floorY, ceilY, slabY, dp } indoors, or { x, w, floorY, z, outdoor: true } on a roof or in a yard.
   * Floor-level pieces share the width of the room between them, and so do ceiling-level pieces,
   * so nothing overlaps and the width is used. Returns one placement per shape, in the same order.
   */
  function arrange(shapes, r) {
    const items = shapes.map((sh, n) => {
      const shape = SHAPES[sh] ? sh : "box", sp = SPEC[shape] || SPEC.box;
      return { shape, n, lane: sp[0], w: sp[1], pref: r.outdoor ? 1 : sp[2], h: sp[3] || 0, outdoor: !!r.outdoor };
    });
    const high = i => i.lane === "ceiling" || i.lane === "wall";
    const rows = r.outdoor ? [items] : [items.filter(i => !high(i)), items.filter(high)];
    rows.forEach(list => {
      if (!list.length) return;
      list.forEach(i => { if (!r.outdoor && !high(i) && i.h) i.pref = Math.min(i.pref, (r.ceilY - r.floorY - 0.1) / i.h); i.want = i.w * i.pref + 0.5; });
      const total = list.reduce((a, i) => a + i.want, 0), k = Math.min(1, r.w / total);
      let at = r.x - r.w / 2;
      list.forEach(i => { const slot = i.want / total * r.w; i.x = at + slot / 2; at += slot; i.scale = i.pref * k; });
    });
    items.forEach(i => {
      if (r.outdoor) { i.y = r.floorY + (high(i) ? 2.2 * i.scale : 0); i.z = r.z; return; }
      i.roomH = r.ceilY - r.floorY; i.slab = r.slabY - r.ceilY;
      if (i.lane === "ceiling") { i.y = r.ceilY; i.z = r.dp / 2 - 2.8; }
      else if (i.lane === "wall") { i.y = r.ceilY; i.z = r.dp / 2 - 4.4; }
      else if (i.lane === "perimeter") { i.y = r.floorY; i.z = r.dp / 2 - 1.2; }
      else { i.y = r.floorY; i.z = r.dp / 2 - 3.6; }
      if (/^vav/.test(i.shape)) { i.z = r.dp / 2 - 3.4; i.mainZ = -r.dp * 0.1; i.mainY = r.ceilY + 0.2; }   // primary inlet ducted back to the supply main
    });
    return items;
  }
  // Draws one placement from arrange() into the group.
  function equip(g, p) {
    SHAPES[p.shape](unitTools(g, { x: p.x, y: p.y, z: p.z, scale: p.scale, roomH: p.roomH, slab: p.outdoor ? 0.01 : p.slab, mainZ: p.mainZ, mainY: p.mainY }));
  }
  return { furnish, arrange, equip, shapes: Object.keys(SHAPES) };
}
