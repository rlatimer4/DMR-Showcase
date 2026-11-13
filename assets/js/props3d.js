/*
 * DMR Showcase — 3D props: room furnishings and equipment models.
 *
 * furnish(group, space, room)   fills a room so you can tell what it is
 *                               (an operating room has a table and a surgical light,
 *                               a classroom has desks and a board, and so on)
 * equip(group, shape, place)    draws one piece of HVAC equipment. `shape` comes from
 *                               the product (see content/manufacturers/*.js)
 *
 * To add a room type or an equipment shape, add a function to SPACES or SHAPES
 * below and use its name as `space` in a building file or `shape` in a manufacturer file.
 */
export function makeProps({ THREE, box, mesh, material }) {
  const WOOD = "#b98a5a", STEEL = "#b8c2ca", FABRIC = "#5b8db8", GREEN = "#4caf50", WHITE = "#ffffff", BLUE = "#1779ba", RED = "#c0392b";

  /* ================= rooms ================= */

  // r: { cx, y, w, h, dp } = centre x, floor level, bay width, storey height, building depth
  function tools(g, r) {
    const y0 = r.y + 0.3;
    return {
      w: r.w - 1.2, zd: r.dp / 2 - 1.4, h: r.h - 0.6,
      B: (w, h, d, x, y, z, m) => box(g, w, h, d, r.cx + x, y0 + y + h / 2, z, material(m)),
      C: (rt, rb, h, x, y, z, m, seg) => mesh(g, new THREE.CylinderGeometry(rt, rb, h, seg || 16), material(m), r.cx + x, y0 + y + h / 2, z),
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
    "cleanroom": t => { t.B(t.w - 0.6, 0.05, t.zd * 2, 0, 0, 0, "#eef6fb"); t.grid(3.4, 3.6, (x, z, i, k) => { t.B(2, 1.5, 1.4, x, 0, z, WHITE); t.B(0.9, 0.5, 0.06, x, 0.8, z + 0.72, "#1e9be8"); t.B(0.5, 0.25, 0.5, x + 0.6, 1.5, z, (i + k) % 2 ? "#f7b500" : STEEL); }); },
    "dry-room": t => { t.grid(3, 3.4, (x, z) => { t.B(1.8, 0.9, 0.9, x, 0, z, STEEL); t.B(1.6, 0.8, 0.8, x, 0.9, z, "glass"); }); t.grid(1.2, 100, (x) => t.C(0.4, 0.4, 1.1, x, 0, t.zd - 1, BLUE, 14), 0, 0); },
    "process": t => { t.grid(3.4, 100, (x) => { t.C(1.1, 1.1, 3, x, 0.6, -2.5, STEEL, 20); t.C(1.1, 0.3, 0.6, x, 0, -2.5, STEEL, 20); }, 0, 0); t.B(t.w - 3, 0.9, 1, 0, 0, 2.5, STEEL); t.grid(1.4, 100, (x) => t.B(0.5, 0.5, 0.5, x, 0.9, 2.5, WOOD), 0, 0); },
    "production": t => { t.B(t.w - 3, 0.9, 1.2, 0, 0, 0, "#3f4854"); t.grid(2.6, 100, (x, z, i) => { t.B(1, 0.6, 0.9, x, 0.9, 0, STEEL); if (i % 2) { t.C(0.25, 0.3, 1.6, x, 0, 1.6, "#ffa500", 10); t.B(0.2, 0.2, 1.6, x, 1.6, 0.9, "#ffa500"); } }, 0, 0); t.grid(3, 100, (x) => t.B(1.8, 1.8, 1.4, x, 0, -3.5, BLUE), 0, 0); },
    "shop-floor": t => { t.grid(4, 4, (x, z, i, k) => { t.B(1.8, 1.3, 1.2, x, 0, z, (i + k) % 2 ? BLUE : "#3f4854"); t.B(0.4, 0.6, 0.4, x, 1.3, z, STEEL); }, -3, 2); t.B(2.2, 0.9, 0.8, -t.w / 2 + 2.2, 0, t.zd - 1.5, WOOD); },
    // pallet racking in rows running front to back, with aisles between the rows
    "high-bay": t => { const n = Math.max(2, Math.round(t.w / 4.4)), step = t.w / n, len = t.zd * 2 - 5; for (let i = 0; i < n; i++) { const x = (i - (n - 1) / 2) * step - step * 0.22; t.B(1.3, t.h - 3, len, x, 0, -1.2, "#f08c1a"); for (let k = 0; k < 3; k++) t.B(1.4, 1, len - 0.4, x, 0.3 + k * 2.2, -1.2, k % 2 ? WOOD : "#cfd8df"); } },
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

  // Each shape draws around a local origin on the floor; `s` is its scale.
  function unitTools(g, o) {
    const s = o.scale || 1, E = material("unit"), T = material("trim");
    const B = (w, h, d, x, y, z, m) => box(g, w * s, h * s, d * s, o.x + x * s, o.y + (y + h / 2) * s, o.z + z * s, m ? material(m) : E);
    const C = (rt, rb, h, x, y, z, m, seg) => mesh(g, new THREE.CylinderGeometry(rt * s, rb * s, h * s, seg || 18), m ? material(m) : E, o.x + x * s, o.y + (y + h / 2) * s, o.z + z * s);
    // fan seen from the front (axis front to back) or from above
    const fanFront = (r, x, y, z) => { const f = C(r, r, 0.12, x, y - 0.06, z, "dark", 20); f.rotation.x = Math.PI / 2; const h = C(r * 0.3, r * 0.3, 0.16, x, y - 0.08, z, "unit", 12); h.rotation.x = Math.PI / 2; };
    const fanTop = (r, x, y, z) => { C(r, r, 0.12, x, y, z, "dark", 20); C(r * 0.3, r * 0.3, 0.16, x, y, z, "unit", 12); };
    // round duct from this unit back to the building's supply main
    const toMain = (r, y, z0) => {
      if (o.mainZ === undefined) return;
      const zw = o.z + z0 * s, len = Math.abs(zw - o.mainZ);
      const yw = o.y + y * s;
      const c = mesh(g, new THREE.CylinderGeometry(r * s, r * s, len, 14), material("#b8c2ca"), o.x, yw, (zw + o.mainZ) / 2);
      c.rotation.x = Math.PI / 2;
      // short riser from the branch up into the main
      if (o.mainY > yw) mesh(g, new THREE.CylinderGeometry(r * s, r * s, o.mainY - yw, 14), material("#b8c2ca"), o.x, (o.mainY + yw) / 2, o.mainZ);
    };
    return { B, C, fanFront, fanTop, toMain, trim: (w, d, x, z) => B(w + 0.06, 0.25, d + 0.06, x, 0, z, "trim"), T };
  }
  const SHAPES = {
    // custom air handler: long cabinet in sections, with louvres and access doors
    ahu: u => { u.B(9, 3, 3.2, 0, 0.25, 0); u.trim(9, 3.2, 0, 0); for (let k = -1; k <= 2; k++) u.B(0.08, 3, 3.24, k * 2.2 - 1, 0.25, 0, "#b8c2ca"); u.B(0.1, 2, 2.4, -4.52, 0.75, 0, "dark"); for (let k = 0; k < 3; k++) u.B(1.2, 2.2, 0.06, -2.1 + k * 2.2, 0.6, 1.62, "#dfe7ee"); u.B(1.6, 0.9, 1.6, 3.4, 3.25, 0, "#b8c2ca"); },
    rooftop: u => { u.B(6.5, 2.4, 3.4, 0, 0.25, 0); u.trim(6.5, 3.4, 0, 0); u.fanTop(0.85, 1.4, 2.65, 0); u.fanTop(0.85, -0.6, 2.65, 0); u.B(0.08, 1.8, 3, 3.27, 0.5, 0, "dark"); const hood = u.B(1.4, 0.9, 3, -3.6, 1.6, 0, "#b8c2ca"); hood.rotation.z = -0.5; for (let k = 0; k < 6; k++) u.B(0.06, 1.6, 0.06, 0.2 + k * 0.5, 0.5, 1.72, "#b8c2ca"); },
    chiller: u => { u.B(9, 0.5, 2.6, 0, 0.25, 0, "#3f4854"); u.trim(9, 2.6, 0, 0); for (let k = 0; k < 4; k++) { const x = -3.3 + k * 2.2; const a = u.B(0.12, 2, 2.4, x - 0.5, 0.8, 0, "#b8c2ca"); a.rotation.z = 0.32; const b = u.B(0.12, 2, 2.4, x + 0.5, 0.8, 0, "#b8c2ca"); b.rotation.z = -0.32; u.fanTop(0.8, x, 2.75, 0); u.B(2, 0.12, 2.5, x, 2.65, 0); } u.C(0.5, 0.5, 2.2, 3.3, 0.6, 1.5, "#1779ba").rotation.z = Math.PI / 2; },
    fanwall: u => { u.B(4.6, 3.2, 0.5, 0, 0.25, 0, "#dfe7ee"); u.trim(4.6, 0.5, 0, 0); for (let i = 0; i < 3; i++) for (let k = 0; k < 2; k++) u.fanFront(0.6, -1.5 + i * 1.5, 1.05 + k * 1.5, 0.3); },
    erv: u => { u.B(6, 2.4, 3, 0, 0.25, 0); u.trim(6, 3, 0, 0); const wh = u.C(1.05, 1.05, 0.3, 0, 1.4, 1.36, "#f7b500", 24); wh.rotation.x = Math.PI / 2; const hub = u.C(0.2, 0.2, 0.36, 0, 1.38, 1.36, "dark", 10); hub.rotation.x = Math.PI / 2; u.B(1.2, 1, 1.2, -3.5, 1.2, 0.8, "#b8c2ca"); u.B(1.2, 1, 1.2, 3.5, 1.2, -0.8, "#b8c2ca"); },
    wheel: u => { u.B(3, 3, 0.7, 0, 0.25, 0, "#dfe7ee"); const wh = u.C(1.3, 1.3, 0.8, 0, 1.75, 0, "#f7b500", 28); wh.rotation.x = Math.PI / 2; const hub = u.C(0.22, 0.22, 0.86, 0, 1.75, 0, "dark", 10); hub.rotation.x = Math.PI / 2; u.B(3.06, 0.1, 0.76, 0, 1.7, 0, "dark"); },
    plate: u => { u.B(3.4, 3, 2, 0, 0.25, 0, "#dfe7ee"); const p = u.B(1.9, 1.9, 2.06, 0, 0.8, 0, "#b8c2ca"); p.rotation.z = Math.PI / 4; u.B(1, 0.7, 1.4, -2.1, 2.2, 0, "supply"); u.B(1, 0.7, 1.4, 2.1, 0.6, 0, "return"); },
    mua: u => { u.B(7, 2.4, 2.8, 0, 0.25, 0); u.trim(7, 2.8, 0, 0); u.B(1.8, 2.44, 2.84, -1, 0.25, 0, "#ffa500"); const hood = u.B(1.6, 1, 2.6, -4, 1.5, 0, "#b8c2ca"); hood.rotation.z = -0.5; u.C(0.25, 0.25, 1.6, -1, 2.65, 0, "dark"); u.B(1.4, 1.2, 2, 4, 0.9, 0, "supply"); },
    turnover: u => { u.B(2.2, 6.5, 2.2, 0, 0, 0); u.trim(2.2, 2.2, 0, 0); for (let k = 0; k < 4; k++) u.B(2.26, 0.12, 1.8, 0, 5.2 + k * 0.3, 0, "dark"); u.B(1.8, 1.4, 0.06, 0, 0.5, 1.12, "dark"); u.B(2.26, 0.5, 2.26, 0, 3, 0, "#ffa500"); },
    coil: u => { u.B(3.2, 2.2, 0.5, 0, 0.3, 0, "#c98a4a"); for (let k = 0; k < 9; k++) u.B(0.05, 2.2, 0.54, -1.4 + k * 0.35, 0.3, 0, "#b8c2ca"); u.C(0.12, 0.12, 2.4, -1.75, 0.2, 0.2, "supply"); u.C(0.12, 0.12, 2.4, 1.75, 0.2, -0.2, "return"); },
    uv: u => { u.B(3, 0.2, 0.3, 0, 1.2, 0, "#3f4854"); for (let k = 0; k < 3; k++) { const l = u.C(0.07, 0.07, 2.6, 0, 0.6 + k * 0.3, 0.1, "#8f7bff", 8); l.rotation.z = Math.PI / 2; l.material = new THREE.MeshBasicMaterial({ color: 0x9d8bff }); } },
    dehumidifier: u => { u.B(3.4, 2, 1.8, 0, 0.25, 0); u.trim(3.4, 1.8, 0, 0); const wh = u.C(0.8, 0.8, 0.2, -0.6, 1.25, 0.86, "#2e9e5b", 24); wh.rotation.x = Math.PI / 2; u.C(0.3, 0.3, 1.4, 1.1, 2.25, 0, "#ffa500"); u.B(0.8, 0.6, 0.06, 1, 0.9, 0.92, "dark"); },
    humidifier: u => { u.B(1.2, 1.6, 0.7, 0, 0.5, 0); u.B(0.5, 0.3, 0.06, 0, 1.5, 0.36, "#1e9be8"); u.C(0.09, 0.09, 1.4, 0.3, 2.1, 0, "#b8c2ca"); const m = u.C(0.07, 0.07, 2, 0.9, 2.75, 0, "#b8c2ca"); m.rotation.z = Math.PI / 2; for (let k = 0; k < 4; k++) u.C(0.18, 0.02, 0.4, 0.3 + k * 0.45, 2.3, 0, "#ffffff", 8); },
    crah: u => { for (let k = 0; k < 2; k++) { u.B(1.8, 2.3, 1, -1 + k * 2, 0, 0, "#2f3a46"); u.B(1.5, 0.9, 0.06, -1 + k * 2, 0.2, 0.52, "dark"); u.B(0.5, 0.3, 0.06, -1 + k * 2, 1.6, 0.52, "#1e9be8"); } u.B(3.9, 0.25, 1.06, 0, 0, 0, "trim"); },
    vrf: u => { for (let k = 0; k < 2; k++) { u.B(1.3, 1.9, 0.9, -0.75 + k * 1.5, 0.15, 0); u.fanTop(0.5, -0.75 + k * 1.5, 2.05, 0); u.B(1.1, 1.2, 0.05, -0.75 + k * 1.5, 0.4, 0.47, "#b8c2ca"); } u.B(3, 0.15, 1, 0, 0, 0, "trim"); },
    wshp: u => { u.B(1.1, 2, 1.1, 0, 0, 0); u.trim(1.1, 1.1, 0, 0); u.B(0.9, 0.7, 0.05, 0, 0.4, 0.57, "dark"); u.C(0.08, 0.08, 0.8, -0.3, 2, 0, "supply"); u.C(0.08, 0.08, 0.8, 0.3, 2, 0, "return"); u.B(0.8, 0.5, 0.8, 0, 2, 0, "#b8c2ca"); },
    // ---- ceiling and wall mounted: origin is at the mounting height ----
    fancoil: u => { u.B(1.9, 0.45, 0.9, 0, -0.45, 0); u.B(1.95, 0.12, 0.95, 0, -0.5, 0, "trim"); u.B(1.5, 0.3, 0.3, 0, -0.38, 0.6, "dark"); },
    // VAV box: round primary-air inlet at the back, connected to the supply main; rectangular discharge at the front
    vav: u => { u.B(1.2, 0.5, 0.9, 0, -0.5, 0, "#cfd8df"); u.toMain(0.2, -0.25, -0.45); u.B(0.3, 0.3, 0.25, 0.75, -0.4, -0.1, "trim"); u.B(0.95, 0.4, 0.9, 0, -0.45, 0.9, "supply"); u.B(1.05, 0.06, 0.5, 0, -0.5, 1.5, "dark"); },
    cassette: u => { u.B(1.3, 0.3, 1.3, 0, -0.3, 0); u.B(0.8, 0.06, 0.8, 0, -0.34, 0, "dark"); u.B(1.36, 0.06, 1.36, 0, -0.32, 0, "trim"); },
    minisplit: u => { u.B(1.5, 0.45, 0.35, 0, -0.6, 0); u.B(1.5, 0.08, 0.37, 0, -0.62, 0, "trim"); u.B(1.2, 0.05, 0.1, 0, -0.52, 0.2, "dark"); },
    unitheater: u => { u.C(0.05, 0.05, 0.8, -0.4, -0.8, 0, "dark"); u.C(0.05, 0.05, 0.8, 0.4, -0.8, 0, "dark"); u.B(1.2, 1, 0.9, 0, -1.8, 0, "#ffa500"); for (let k = 0; k < 4; k++) u.B(1.1, 0.06, 0.1, 0, -1.7 + k * 0.22, 0.48, "dark"); },
    ductheater: u => { u.B(2.2, 0.6, 0.7, 0, -0.6, 0, "#cfd8df"); u.B(0.5, 0.64, 0.74, 0, -0.62, 0, "#c0392b"); u.B(0.35, 0.5, 0.3, 0, -0.55, 0.5, "dark"); },
    aircurtain: u => { u.B(2.8, 0.4, 0.6, 0, -0.4, 0); u.B(2.6, 0.06, 0.2, 0, -0.44, 0.1, "dark"); u.B(2.8, 0.1, 0.62, 0, -0.1, 0, "trim"); for (let k = 0; k < 5; k++) u.B(0.04, 1.3, 0.04, -1 + k * 0.5, -1.75, 0.1, "#8fd0f5"); },
    orceiling: u => { u.B(3.4, 0.2, 3.4, 0, -0.2, 0); for (let i = -1; i <= 1; i++) for (let k = -1; k <= 1; k++) u.B(0.95, 0.06, 0.95, i * 1.1, -0.24, k * 1.1, "#dff3ff"); u.B(3.5, 0.08, 3.5, 0, -0.1, 0, "trim"); },
    ffu: u => { for (let i = -1; i <= 1; i++) for (let k = -1; k <= 1; k++) { u.B(1.1, 0.35, 1.1, i * 1.3, -0.35, k * 1.3); u.B(0.9, 0.05, 0.9, i * 1.3, -0.38, k * 1.3, "#dff3ff"); } },
    // ---- floor-standing room units ----
    radiator: u => { u.B(2.2, 0.9, 0.12, 0, 0.25, 0, "#ffffff"); for (let k = 0; k < 8; k++) u.B(0.03, 0.9, 0.14, -0.95 + k * 0.27, 0.25, 0, "#cfd8df"); u.C(0.05, 0.05, 0.25, -1, 0, 0, "dark"); u.C(0.05, 0.05, 0.25, 1, 0, 0, "dark"); },
    fintube: u => { u.B(4.5, 0.5, 0.25, 0, 0.1, 0, "#dfe7ee"); u.B(4.5, 0.05, 0.3, 0, 0.6, 0, "dark"); u.B(4.5, 0.08, 0.27, 0, 0.1, 0, "trim"); },
    trench: u => { u.B(4.2, 0.1, 0.5, 0, 0, 0, "dark"); for (let k = 0; k < 14; k++) u.B(0.05, 0.12, 0.5, -1.95 + k * 0.3, 0, 0, "#b8c2ca"); u.B(4.3, 0.06, 0.6, 0, 0, 0, "trim"); },
    box: u => { u.B(2, 1.4, 1.2, 0, 0, 0); u.trim(2, 1.2, 0, 0); }
  };
  // Where a shape goes in a room. Rooftop-sized shapes are shrunk to fit indoors.
  const MOUNT = { turnover: "aisle", fancoil: "ceiling", vav: "ceiling", cassette: "ceiling", minisplit: "ceiling", unitheater: "ceiling", ductheater: "ceiling", orceiling: "ceiling", ffu: "ceiling", aircurtain: "door", trench: "front", uv: "ceiling" };
  const INDOOR = { ahu: 0.5, rooftop: 0.5, chiller: 0.5, fanwall: 0.6, erv: 0.5, wheel: 0.6, plate: 0.55, mua: 0.5, turnover: 0.75, coil: 0.7, dehumidifier: 0.8, vrf: "cassette" };

  /*
   * place: { x, floorY, ceilY, dp, outdoor }.  Returns nothing; draws into the group.
   * Outdoors (roof or yard) shapes are drawn full size on the surface.
   */
  function equip(g, shape, p) {
    let name = SHAPES[shape] ? shape : "box", scale = 1;
    if (!p.outdoor && INDOOR[name]) { if (typeof INDOOR[name] === "string") name = INDOOR[name]; else scale = INDOOR[name]; }
    const mount = p.outdoor ? "floor" : MOUNT[name] || "floor";
    const o = { x: p.x, scale: scale * (p.outdoor ? 1 : 1.25) * (p.scale || 1), y: p.floorY, z: p.outdoor ? p.z : 0 };
    if (!p.outdoor) {
      if (mount === "ceiling") { o.y = p.ceilY - (name === "uv" ? 1.5 * o.scale : 0); o.z = p.dp / 2 - 2.2; }   // the UV fixture is drawn upward, so hang it lower
      else if (mount === "door") { o.y = Math.min(p.ceilY, p.floorY + 3.4); o.z = p.dp / 2 - 0.7; }
      else if (mount === "front") { o.z = p.dp / 2 - 1.1; }
      else if (mount === "aisle") { o.z = p.dp / 2 - 2.2; o.x += 1.1; }   // at the open end of an aisle, clear of the racks
      else o.z = p.dp / 2 - 3.4;
      if (name === "vav") { o.y = p.ceilY - 0.25; o.z = p.dp / 2 - 3; o.mainZ = -p.dp * 0.1; o.mainY = p.ceilY + 0.2; }   // primary inlet ducted back to the supply main
    }
    SHAPES[name](unitTools(g, o));
  }
  // How much room (metres along x) a shape needs, so several can sit side by side.
  function footprint(shape, outdoor) {
    const big = { ahu: 9.6, rooftop: 7.6, chiller: 9.6, fanwall: 5, erv: 7.6, wheel: 3.4, plate: 4.6, mua: 8.4, turnover: 2.8, coil: 3.8, dehumidifier: 4, vrf: 3.4, crah: 4.2, uv: 3.4, humidifier: 2.6, wshp: 1.8 };
    const small = { fancoil: 2.6, vav: 3.6, cassette: 2, minisplit: 2.2, unitheater: 1.8, ductheater: 3, aircurtain: 3.6, orceiling: 4.6, ffu: 5, radiator: 3, fintube: 5.8, trench: 5.4, crah: 5, humidifier: 3.2, wshp: 2.2, uv: 4, box: 3 };
    if (outdoor) return big[shape] || 3;
    const k = INDOOR[shape];
    if (typeof k === "string") return small[k];
    return k ? (big[shape] || 3) * k * 1.25 : small[shape] || 3;
  }
  return { furnish, equip, footprint };
}
