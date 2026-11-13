/*
 * DMR Showcase — real-time 3D world (three.js).
 *
 * Loads every building in DMR.buildings (content/buildings/) into one scene.
 * Each building is its own model: a shell generated from the building file's
 * `size`, plus that file's optional build() geometry, or a .glb file if the
 * building sets `model`. The building format is described in CONTENT.md.
 *
 * tour.js owns the tour state and side panel; this module draws and reports clicks.
 */
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { makeProps } from "./props3d.js?v=4";

const D = window.DMR;
const stage = document.querySelector(".tour-stage");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function init() {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, logarithmicDepthBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const canvas = renderer.domElement;
  canvas.className = "scene3d";
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", "3D model of the DMR world. Use the tabs and the list beside it to choose a building and its equipment locations.");

  const layout = D.layoutWorld();
  let t0 = -1;                                  // start time of the camera move in progress, or -1
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xe4eef6, 500, 1500);
  const camera = new THREE.PerspectiveCamera(30, 1, 2, 3000);
  const controls = new OrbitControls(camera, canvas);
  Object.assign(controls, { enableZoom: true, zoomSpeed: 1.2, minDistance: 5, maxDistance: 1400, enablePan: false, enableDamping: true, maxPolarAngle: Math.PI / 2 - 0.08, minPolarAngle: 0.35 });
  // A plain scroll still scrolls the page. Ctrl or Cmd + scroll, a pinch, the buttons, or any scroll in full screen zooms.
  stage.addEventListener("wheel", e => { if (!(e.ctrlKey || e.metaKey || document.fullscreenElement)) e.stopPropagation(); }, { capture: true });
  function zoom(factor) {
    t0 = -1;                                    // stop any camera move in progress
    const off = camera.position.clone().sub(controls.target);
    off.setLength(Math.max(controls.minDistance, Math.min(controls.maxDistance, off.length() * factor)));
    camera.position.copy(controls.target).add(off);
  }

  scene.add(new THREE.HemisphereLight(0xffffff, 0xb9c6d1, 1.5));
  const sun = new THREE.DirectionalLight(0xffffff, 2.0);
  sun.position.set(-160, 260, 200);
  sun.castShadow = true;
  sun.shadow.mapSize.set(4096, 4096);
  const half = layout.width / 2 + 60;
  Object.assign(sun.shadow.camera, { left: -half, right: half, top: layout.depth * 0.7 + 60, bottom: -layout.depth * 0.5 - 40, near: 10, far: 1200 });
  sun.target.position.set(layout.x, 0, layout.z);
  scene.add(sun.target);
  sun.position.set(layout.x - 160, 300, layout.z + 220);
  sun.shadow.bias = -0.0005;
  scene.add(sun);

  const mat = (color, o) => new THREE.MeshStandardMaterial(Object.assign({ color, roughness: 0.85 }, o));
  const M = {
    wall: mat(0xf7f9fb), slab: mat(0xdfe5ea), partition: mat(0xeef2f5), unit: mat(0xffffff, { roughness: 0.5 }), trim: mat(0x1779ba),
    supply: mat(0x1e9be8, { roughness: 0.4 }), return: mat(0xffa500, { roughness: 0.4 }), dark: mat(0x282c39, { roughness: 0.6 }),
    equip: mat(0xcfd8df, { roughness: 0.5 }), glass: mat(0x8fd0f5, { transparent: true, opacity: 0.45, roughness: 0.15 }),
    tree: mat(0x5d9b6b), trunk: mat(0x8a7560), road: mat(0xc3ccd4), mark: mat(0xffffff), pad: mat(0xf3f5f7)
  };
  function mesh(parent, geo, material, x, y, z, shadow) {
    const m = new THREE.Mesh(geo, material);
    m.position.set(x, y, z);
    m.castShadow = shadow !== false;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  }
  const box = (parent, w, h, d, x, y, z, material, shadow) => mesh(parent, new THREE.BoxGeometry(w, h, d), material, x, y, z, shadow);

  /* ---------- site: ground, streets, trees ---------- */

  const districtSigns = [];

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(4000, 3000), mat(0xe3e9ee));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);
  const cell = D.world.cell;
  // A street in front of every row of buildings.
  [...new Set(D.buildings.map(b => b.pos.z))].forEach(z0 => {
    const z = z0 + cell.depth / 2;
    box(scene, layout.width + 160, 0.06, 8, layout.x, 0.03, z, M.road, false);
    for (let x = layout.x - layout.width / 2 - 70; x <= layout.x + layout.width / 2 + 70; x += 12) box(scene, 5, 0.08, 0.3, x, 0.07, z, M.mark, false);
  });
  function tree(x, z, s) {
    mesh(scene, new THREE.CylinderGeometry(0.25 * s, 0.3 * s, 1.6 * s, 6), M.trunk, x, 0.8 * s, z);
    mesh(scene, new THREE.ConeGeometry(1.5 * s, 4 * s, 8), M.tree, x, 3.4 * s, z);
  }
  D.buildings.forEach((b, i) => {
    tree(b.pos.x - cell.width / 2 + 1.5, b.pos.z + 6 - (i % 3) * 3, 0.9 + (i % 4) * 0.12);
    tree(b.pos.x + cell.width / 2 - 2.5, b.pos.z - 4 + (i % 2) * 5, 1 + (i % 3) * 0.1);
  });
  Object.keys(layout.districts).forEach(id => {
    const d = layout.districts[id], u = D.useTypes.find(x => x.id === id);
    const s = textSprite(u.name + " district", u.color, 44);
    s.position.set(d.x, 4.5, d.front + cell.depth / 2 + 7);
    s.scale.set(64, 8, 1);
    scene.add(s);
    districtSigns.push(s);
  });

  /* ---------- canvas textures ---------- */

  function canvasTexture(c) {
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }
  /*
   * Front-wall textures. style:
   *   "windows"     rows of separate windows (default)       "glass"       full curtain wall
   *   "brick"       brick with framed windows                "bands"       ribbon windows on a plain wall
   *   "tall"        tall narrow windows (halls, chapels)     "solid"       windowless, with a stripe
   *   "storefront"  shop fronts with a sign band
   * doors: number of roll-up or dock doors along the ground floor.
   */
  function facadeTexture(w, h, floors, f) {
    const U = 24, c = document.createElement("canvas");            // 24 px per metre
    c.width = Math.round(w * U); c.height = Math.round(h * U);
    const g = c.getContext("2d"), W = c.width, H = c.height, fh = H / floors;
    const color = f.color, style = f.style || "windows", pane = "rgba(214,236,250,0.92)";
    g.fillStyle = color; g.fillRect(0, 0, W, H);
    if (style === "glass") {
      g.fillStyle = "rgba(190,226,248,0.55)"; g.fillRect(0, 0, W, H);
      g.strokeStyle = "rgba(255,255,255,0.75)"; g.lineWidth = 3;
      for (let x = 0; x <= W; x += U * 2) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
      const rows = floors * Math.max(1, Math.round(fh / (U * 3.6)));
      for (let r = 0; r <= rows; r++) { g.beginPath(); g.moveTo(0, r * H / rows); g.lineTo(W, r * H / rows); g.stroke(); }
    } else if (style === "solid" || style === "storefront") {
      g.fillStyle = f.stripe || "#1779ba"; g.fillRect(0, H * 0.1, W, Math.max(8, H * 0.07));
      if (style === "storefront") {
        g.fillStyle = pane; g.fillRect(U * 0.6, H - U * 2.9, W - U * 1.2, U * 2.6);
        g.fillStyle = color; for (let x = U * 0.3; x < W; x += U * 3) g.fillRect(x, H - U * 2.9, U * 0.3, U * 2.6);
      }
    } else if (style === "bands") {
      for (let i = 0; i < floors; i++) { g.fillStyle = pane; g.fillRect(U * 0.8, i * fh + fh * 0.3, W - U * 1.6, fh * 0.34); }
    } else if (style === "tall") {
      const n = Math.max(3, Math.round(w / 3.4)), step = W / n;
      for (let k = 0; k < n; k++) { g.fillStyle = pane; g.beginPath(); g.roundRect(k * step + step * 0.34, H * 0.2, step * 0.32, H * 0.55, step * 0.16); g.fill(); }
    } else {
      const n = Math.max(3, Math.round(w / 2.6)), step = W / n;
      if (style === "brick") {
        g.strokeStyle = "rgba(0,0,0,0.13)"; g.lineWidth = 1;
        for (let y = 0; y < H; y += 7) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
      }
      for (let i = 0; i < floors; i++) for (let k = 0; k < n; k++) {
        const x = k * step + step * 0.22, y = i * fh + fh * 0.26, ww = step * 0.56, hh = fh * 0.46;
        if (style === "brick") { g.fillStyle = "#f4efe6"; g.fillRect(x - 3, y - 3, ww + 6, hh + 6); }
        g.fillStyle = pane; g.fillRect(x, y, ww, hh);
      }
    }
    const doors = f.doors || 0;
    for (let k = 0; k < doors; k++) {
      const dw = Math.min(U * 3.2, W / doors * 0.6), x = (k + 0.5) * W / doors - dw / 2;
      g.fillStyle = "#e9edf0"; g.fillRect(x, H - U * 3.4, dw, U * 3.4);
      g.strokeStyle = "rgba(0,0,0,0.25)"; g.lineWidth = 1;
      for (let y = H - U * 3.4; y < H; y += 9) { g.beginPath(); g.moveTo(x, y); g.lineTo(x + dw, y); g.stroke(); }
    }
    if (f.entrance !== false && !doors) { g.fillStyle = "#282c39"; g.fillRect(W / 2 - U * 1.3, H - U * 2.5, U * 2.6, U * 2.5); g.fillStyle = pane; g.fillRect(W / 2 - U * 1.1, H - U * 2.3, U * 2.2, U * 2.3); }
    return canvasTexture(c);
  }
  function signTexture(text, bg, color, wRatio) {
    const c = document.createElement("canvas");
    c.height = 128; c.width = Math.round(128 * wRatio);
    const g = c.getContext("2d");
    g.fillStyle = bg; g.fillRect(0, 0, c.width, c.height);
    let size = 84;
    g.font = "800 " + size + "px Montserrat, Arial, sans-serif";
    const tw = g.measureText(text).width;
    if (tw > c.width - 24) { size = Math.floor(size * (c.width - 24) / tw); g.font = "800 " + size + "px Montserrat, Arial, sans-serif"; }
    g.fillStyle = color; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(text, c.width / 2, 68);
    return canvasTexture(c);
  }
  function textSprite(text, bg, size) {
    const c = document.createElement("canvas");
    c.width = 768; c.height = 96;
    const g = c.getContext("2d");
    g.font = "800 " + (size || 40) + "px Montserrat, Arial, sans-serif";
    const w = Math.min(760, g.measureText(text.toUpperCase()).width + 48);
    g.fillStyle = bg; g.beginPath(); g.roundRect(384 - w / 2, 12, w, 72, 10); g.fill();
    g.fillStyle = "#ffffff"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(text.toUpperCase(), 384, 50, 720);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthTest: false, transparent: true }));
    s.renderOrder = 5;
    return s;
  }

  /* ---------- building models ---------- */

  const models = {}, hits = [];
  const DUCTLESS = /^(turnover|ptac|minisplit|vrf|cassette|unitheater|atomizer|radiator|fintube|trench|cabinetheater|radiantpanel|fancoil-hirise|fancoil-vertical|fancoil-floor|fancoil-floor-low|crah|cdu)$/;
  let P;

  const hexMats = {};
  function material(name) {
    if (M[name]) return M[name];
    if (/^#/.test(name || "")) return hexMats[name] || (hexMats[name] = mat(new THREE.Color(name)));
    return M.wall;
  }

  P = makeProps({ THREE, box, mesh, material });

  // Generated shell: floors, walls, partitions, ducts and a front wall that fades away.
  function generateShell(b, shell, m) {
    const { width: w, depth: dp, floors, floorHeight: fh, bays, height: h } = b.size;
    const useColor = (D.useTypes.find(u => u.id === b.use) || {}).color || "#1779ba";
    const facadeDef = Object.assign({ style: "windows", color: useColor }, b.facade);
    const wall = material(b.walls || "wall");
    box(shell, w + 3, 0.12, dp + 3, 0, 0.06, 0, M.pad, false);
    // Floor slabs sit inside the walls and the roof overhangs them, so no two faces share a plane.
    for (let i = 0; i < floors; i++) box(shell, w - 0.84, 0.3, dp - 0.44, 0, i * fh + 0.15, 0.2, M.slab);
    if (b.roof !== "open") box(shell, w + 0.3, 0.3, dp + 0.3, 0, h + 0.15, 0, M.slab);
    box(shell, w, h, 0.4, 0, h / 2, -dp / 2 + 0.2, wall);
    box(shell, 0.4, h, dp, -w / 2 + 0.2, h / 2, 0, wall);
    box(shell, 0.4, h, dp, w / 2 - 0.2, h / 2, 0, wall);
    const cw = w / bays;
    for (let i = 0; i < floors; i++) {
      for (let k = 1; k < bays; k++) box(shell, 0.25, fh - 0.3, dp * 0.62, -w / 2 + k * cw, i * fh + fh / 2 + 0.15, -dp * 0.19, M.partition);
      if (b.roof === "open") continue;
      for (let col = 0; col < bays; col++) {
        const bayStops = b.stops.filter(s => s.at.floor === i && Math.min(bays - 1, Math.floor(s.at.x * bays)) === col);
        const isDuctless = bayStops.length > 0 && bayStops.every(s => s.equipment.every(e => DUCTLESS.test(D.lookup.products[e.product].shape || "box")));
        if (!isDuctless) {
          const bx = -w / 2 + (col + 0.5) * cw, dw = cw * 0.86;
          box(shell, dw, 0.5, 0.9, bx, (i + 1) * fh - 0.55, -dp * 0.1, M.supply, false);
          box(shell, dw, 0.4, 0.7, bx, (i + 1) * fh - 0.5, -dp * 0.36, M.return, false);
        }
      }
    }
    const fm = new THREE.MeshStandardMaterial({ map: facadeTexture(w, h, floors, facadeDef), transparent: true, roughness: 0.45 });
    const facade = box(shell, w - 0.04, h - 0.04, 0.24, 0, h / 2, dp / 2 + 0.14, fm, false);
    facade.renderOrder = 2;
    m.cutaways.push(facade);

    const kit = {
      // Everything returns the mesh, so a building file can rotate or scale it.
      box: (bw, bh, bd, x, y, z, name) => box(shell, bw, bh, bd, x, y, z, material(name)),
      cyl: (rt, rb, ch, x, y, z, name) => mesh(shell, new THREE.CylinderGeometry(rt, rb, ch, 24), material(name), x, y, z),
      cone: (r, ch, x, y, z, name, sides) => mesh(shell, new THREE.ConeGeometry(r, ch, sides || 4), material(name), x, y, z).rotateY(Math.PI / 4),
      dome: (r, x, y, z, name) => mesh(shell, new THREE.SphereGeometry(r, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), material(name), x, y, z),
      disc: (r, x, y, z, name) => mesh(shell, new THREE.CylinderGeometry(r, r, 0.15, 32), material(name), x, y, z, false),
      ring: (ri, ro, rh, x, y, z, name) => {
        const r = mesh(shell, new THREE.CylinderGeometry(ro, ri, rh, 40, 1, true), material(name).clone(), x, y, z);
        r.material.side = THREE.DoubleSide;
        r.scale.z = 0.5;
        return r;
      },
      // Triangular roof or pediment: the triangle faces the front, the ridge runs front to back.
      gable: (gw, gh, gd, x, y, z, name) => {
        const s = new THREE.Shape([new THREE.Vector2(-gw / 2, 0), new THREE.Vector2(gw / 2, 0), new THREE.Vector2(0, gh)]);
        const g = new THREE.ExtrudeGeometry(s, { depth: gd, bevelEnabled: false });
        g.translate(0, 0, -gd / 2);
        return mesh(shell, g, material(name), x, y, z);
      },
      // Curved roof: the arch faces the front and runs front to back.
      barrel: (bw, bh, bd, x, y, z, name) => {
        const g = new THREE.CylinderGeometry(1, 1, bd, 28, 1, false, 0, Math.PI);
        g.rotateZ(Math.PI / 2); g.rotateY(Math.PI / 2);
        const r = mesh(shell, g, material(name).clone(), x, y, z);
        r.material.side = THREE.DoubleSide;
        r.scale.set(bw / 2, bh, 1);
        return r;
      },
      // Flat sign with text. Faces the front; rotate the returned mesh to turn it.
      sign: (text, sw, sh, x, y, z, bg, color) => {
        const sm = new THREE.MeshBasicMaterial({ map: signTexture(text, bg || "#282c39", color || "#ffffff", sw / sh), side: THREE.DoubleSide });
        return mesh(shell, new THREE.PlaneGeometry(sw, sh), sm, x, y, z, false);
      },
      // Mark something on the front of the building so it disappears when the building opens.
      front: o => { m.cutaways.push(o); return o; }
    };
    // Name board at the kerb, so every building is labelled even without custom shapes.
    if (b.sign !== false) {
      const sx = -w / 2 + 4.5, sz = dp / 2 + 3.4;
      // It hides when the building opens so it never blocks a ground-floor room.
      kit.front(kit.box(8.4, 0.5, 0.7, sx, 0.3, sz, "dark"));
      kit.front(kit.box(8.2, 1.9, 0.3, sx, 1.5, sz, "dark"));
      kit.front(kit.sign(b.name.toUpperCase(), 8, 1.7, sx, 1.5, sz + 0.2, "#282c39", "#ffffff"));
    }
    if (typeof b.build === "function") b.build(kit, b.size);
  }

  // Optional artist-made model. Meshes named "Cutaway…" hide when the building opens.
  function loadModel(b, m) {
    import("three/addons/loaders/GLTFLoader.js").then(({ GLTFLoader }) => {
      new GLTFLoader().load(b.model, gltf => {
        m.shell.clear();
        m.cutaways = [];
        gltf.scene.traverse(o => {
          if (o.isMesh) { o.castShadow = o.receiveShadow = true; }
          if (/^cutaway/i.test(o.name)) m.cutaways.push(o);
        });
        m.shell.add(gltf.scene);
        focus(view, true);
      }, undefined, err => console.warn("Could not load " + b.model + "; keeping the generated model.", err));
    });
  }

  D.buildings.forEach(b => {
    const g = new THREE.Group(), shell = new THREE.Group();
    g.position.set(b.pos.x, 0, b.pos.z);
    g.add(shell);
    scene.add(g);
    const { width: w, depth: dp, floorHeight: fh, bays, height: h } = b.size;
    const m = models[b.id] = { b, g, shell, cutaways: [], rooms: {}, equip: [], items: {}, zones: [], tagged: {}, open: 0, openTarget: 0 };
    generateShell(b, shell, m);
    if (b.model) loadModel(b, m);

    m.label = textSprite(b.name, "#282c39");
    m.label.position.set(0, h + 9, 0);
    m.label.scale.set(30, 3.75, 1);
    g.add(m.label);

    const hit = new THREE.Mesh(new THREE.BoxGeometry(w, h + 5, dp), new THREE.MeshBasicMaterial({ visible: false }));
    hit.position.set(0, (h + 5) / 2, 0);
    hit.userData.building = b.id;
    g.add(hit); hits.push(hit);

    b.stops.forEach(s => {
      const x = -w / 2 + s.at.x * w;
      const shapes = s.equipment.map(e => {
        const sh = D.lookup.products[e.product].shape || "box";
        if (/^ahu/.test(sh) && /exhaust/i.test(e.role)) return "ahu-exhaust";
        if (/^coil/.test(sh) && /run-around/i.test(e.role)) return "coil-runaround";
        return sh;
      });
      const outdoor = s.at.floor === "roof" || s.at.floor === "yard";
      // Each piece of equipment is its own group, so it can be clicked to open its product.
      const place = u => {
        const grp = new THREE.Group(), e = s.equipment[u.n], prod = D.lookup.products[e.product];
        grp.userData = { product: e.product, stop: s.id, n: u.n, name: e.role || prod.name, label: (e.role || prod.name) + " · " + D.lookup.brands[prod.brand].name, at: u };
        m.items[s.id + ":" + u.n] = grp;
        shell.add(grp);
        P.equip(grp, u);
        m.equip.push(grp);
      };
      let pos;
      if (outdoor) {
        const onRoof = s.at.floor === "roof", y = onRoof ? h + 0.3 : 0.12, z = onRoof ? -1 : dp / 2 + 8.5;
        const shared = b.stops.filter(o => o.at.floor === s.at.floor).length;   // units share the roof or yard
        const room = Math.min(21, (w - 2) / shared), cx = Math.max(-w / 2 + room / 2 + 0.5, Math.min(w / 2 - room / 2 - 0.5, x));
        if (!b.model) {
          P.arrange(shapes, { x: cx, w: room, floorY: y, z, outdoor: true }).forEach(place);
          if (onRoof) {
            // Risers run from the ground floor up through the roof, ending well above it so no face lies in the roof's plane.
            box(shell, 1.1, h + 0.9, 1.1, cx + 2.5, (h + 0.9) / 2 + 0.32, -dp / 2 + 1.3, M.supply, false);
            box(shell, 0.9, h + 0.7, 0.9, cx - 2.5, (h + 0.7) / 2 + 0.32, -dp / 2 + 1.3, M.return, false);
          } else {
            box(shell, 0.9, 0.9, 6.5, cx + 1.5, 0.9, z - 5, M.supply, false);
            box(shell, 0.8, 0.8, 6.5, cx - 1.5, 0.9, z - 5, M.return, false);
          }
        }
        pos = new THREE.Vector3(cx, y + 5.8, z);
        s.frame = { x: cx, y: y + 2, z, w: room + 8, h: 9, outdoor: true };
        // invisible click target around the outdoor equipment
        const zone = new THREE.Mesh(new THREE.BoxGeometry(room + 2, 6, 7), new THREE.MeshBasicMaterial({ visible: false }));
        zone.position.set(cx, y + 3, z);
        zone.userData = { stop: s.id, title: s.title };
        g.add(zone); m.zones.push(zone);
      } else {
        const y0 = s.at.floor * fh, cw = w / bays, col = Math.min(bays - 1, Math.floor(s.at.x * bays)), bx = -w / 2 + (col + 0.5) * cw;
        if (!b.model) {
          P.furnish(shell, s.space, { cx: bx, y: y0, w: cw, h: fh, dp });
          P.arrange(shapes, { x: bx, w: cw - 1.4, floorY: y0 + 0.3, ceilY: y0 + fh - 0.75, slabY: y0 + fh, dp, occupied: s.space !== "mechanical" && s.space !== "plant" }).forEach(place);
        }
        const room = new THREE.Mesh(new THREE.BoxGeometry(cw - 0.5, fh - 0.5, dp - 0.8),
          new THREE.MeshBasicMaterial({ color: 0xffa500, transparent: true, opacity: 0.07, depthWrite: false }));
        room.position.set(bx, y0 + fh / 2 + 0.15, 0);
        room.visible = false; room.renderOrder = 3;
        room.userData = { stop: s.id, title: s.title };
        g.add(room); m.rooms[s.id] = room; m.zones.push(room);
        pos = new THREE.Vector3(bx - cw / 2 + 1.3, y0 + fh - 1.1, dp / 2 + 0.6);
        // The close-up looks at the front of the room, where the equipment stands (or includes the outdoor VRF pad on low floors).
        const hasExtVrf = shapes.indexOf("vrf") >= 0 && s.at.floor <= 1;
        s.frame = hasExtVrf
          ? { x: bx, y: (y0 + fh) / 2, z: dp / 2 - 2.2, w: cw + 2.4, h: y0 + fh + 2.2 }
          : { x: bx, y: y0 + fh / 2, z: dp / 2 - 4.5, w: cw + 0.6, h: fh + 1.2 };
      }
    });
  });

  /* ---------- camera ---------- */

  let view = { use: null, building: null, stop: null, item: 0 };

  /*
   * Name tags: when a room is open, every piece of equipment in it carries a tag with its name.
   * The tag of the piece being shown is highlighted. Tags are made the first time a room is opened.
   */
  function tagTexture(lines, active) {
    const c = document.createElement("canvas"), g = c.getContext("2d"), font = "700 30px Roboto, Arial, sans-serif";
    g.font = font;
    const tw = Math.max(...lines.map(l => g.measureText(l).width)), bh = lines.length * 38 + 20;
    c.width = Math.ceil(tw + 44); c.height = bh + 22;
    g.font = font;
    g.fillStyle = active ? "#ffa500" : "#282c39"; g.strokeStyle = "#ffffff"; g.lineWidth = 4; g.lineJoin = "round";
    g.beginPath(); g.roundRect(2, 2, c.width - 4, bh - 4, 10);
    g.moveTo(c.width / 2 - 14, bh - 3); g.lineTo(c.width / 2, c.height - 3); g.lineTo(c.width / 2 + 14, bh - 3);
    g.stroke(); g.fill();
    g.fillStyle = active ? "#282c39" : "#ffffff"; g.textAlign = "center"; g.textBaseline = "middle";
    lines.forEach((l, i) => g.fillText(l, c.width / 2, 30 + i * 38));
    return canvasTexture(c);
  }
  function wrap(text) {
    if (text.length <= 24) return [text];
    const words = text.split(" "), lines = [""];
    words.forEach(w => { const k = lines.length - 1; if (lines[k] && (lines[k] + " " + w).length > Math.ceil(text.length / 2) + 3 && lines.length < 2) lines.push(w); else lines[k] = (lines[k] ? lines[k] + " " : "") + w; });
    return lines;
  }
  const tags = [];
  function makeTags(m, stop) {
    stop.equipment.forEach((e, n) => {
      const grp = m.items[stop.id + ":" + n];
      if (!grp) return;
      const lines = wrap(grp.userData.name), off = tagTexture(lines, false), on = tagTexture(lines, true);
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: off, depthTest: false, transparent: true }));
      sp.center.set(0.5, 0);           // the tip of the tag sits on the position
      sp.renderOrder = 20;
      const bb = new THREE.Box3().setFromObject(grp), a = grp.userData.at;
      sp.userData = Object.assign({}, grp.userData, { off, on, aspect: off.image.width / off.image.height, rows: lines.length, base: new THREE.Vector3(m.b.pos.x + a.x, bb.max.y + 0.1, m.b.pos.z + a.z), lift: 0 });
      sp.position.copy(sp.userData.base);
      scene.add(sp); tags.push(sp);
    });
    m.tagged[stop.id] = true;
  }
  const tagHeight = (sp, dist) => dist * (sp.userData.rows > 1 ? 0.047 : 0.033);
  function showTags() {
    const b = view.building, stop = view.stop;
    if (stop && !models[b.id].tagged[stop.id]) makeTags(models[b.id], stop);
    const mine = tags.filter(sp => { sp.visible = !!stop && sp.userData.stop === stop.id; return sp.visible; });
    // Where two tags would overlap from the room's camera position, the later one is raised above the other.
    mine.sort((p, q) => p.userData.base.y - q.userData.base.y || p.userData.base.x - q.userData.base.x);
    mine.forEach((sp, i) => {
      const u = sp.userData, d = toPos.distanceTo(u.base), hh = tagHeight(sp, d);
      u.lift = 0;
      for (let k = 0; k < i; k++) {
        const o = mine[k], oh = tagHeight(o, d), top = o.userData.base.y + o.userData.lift + oh;
        if (Math.abs(o.userData.base.x - u.base.x) < (hh * u.aspect + oh * o.userData.aspect) / 2 + d * 0.004 && u.base.y + u.lift < top + d * 0.004 && u.base.y + u.lift + hh > o.userData.base.y + o.userData.lift) u.lift = top + d * 0.004 - u.base.y;
      }
    });
  }
  function point(stopId, n) {
    const idx = n || 0;
    tags.forEach(sp => { if (sp.visible) { const on = sp.userData.stop === stopId && sp.userData.n === idx; sp.material.map = on ? sp.userData.on : sp.userData.off; sp.renderOrder = on ? 21 : 20; } });
    if (view.stop && view.stop.id === stopId && view.building && view.item !== idx) {
      const m = models[view.building.id], prev = m && m.items[stopId + ":" + view.item], next = m && m.items[stopId + ":" + idx];
      view.item = idx;
      if (prev && next && !!prev.userData.at.outdoorUnit !== !!next.userData.at.outdoorUnit && view.stop.at.floor > 1) {
        const [p, t] = shot(view);
        fromPos.copy(camera.position); fromTgt.copy(controls.target); toPos.copy(p); toTgt.copy(t);
        if (reduce) { camera.position.copy(p); controls.target.copy(t); t0 = -1; } else t0 = performance.now();
      }
    }
  }
  // A light that moves into whichever room is being looked at.
  const roomLight = new THREE.PointLight(0xffffff, 0, 60, 1.2);
  scene.add(roomLight);
  const fromPos = new THREE.Vector3(), fromTgt = new THREE.Vector3(), toPos = new THREE.Vector3(), toTgt = new THREE.Vector3();
  function shot(v) {
    const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const fit = (wNeed, hNeed) => Math.max(hNeed / 2 / tan, wNeed / 2 / tan / camera.aspect);
    if (v.stop && v.stop.frame) {
      // Close-up of one room or one group of outdoor equipment.
      let f = v.stop.frame;
      if (v.building && v.stop.at && v.stop.at.floor > 1) {
        const grp = models[v.building.id] && models[v.building.id].items[v.stop.id + ":" + (v.item || 0)];
        if (grp && grp.userData.at && grp.userData.at.outdoorUnit) {
          const a = grp.userData.at;
          f = { x: a.x, y: a.y + 1.4, z: a.z - 1.2, w: 9, h: 6, outdoor: true };
        }
      }
      const p = v.building.pos, d = fit(f.w, f.h) + (f.outdoor ? 3 : 4.5);
      const up = f.outdoor ? 0.34 : 0.16;
      return [new THREE.Vector3(p.x + f.x + d * 0.3, f.y + d * up, p.z + f.z + d * 0.94), new THREE.Vector3(p.x + f.x, f.y, p.z + f.z)];
    }
    if (v.building) {
      const s = v.building.size, p = v.building.pos, d = fit(s.width + 16, s.height + (s.extraHeight || 0) + 18) + s.depth / 2 + 6;
      return [new THREE.Vector3(p.x + d * 0.34, s.height / 2 + 2 + d * 0.2, p.z + d * 0.92), new THREE.Vector3(p.x, s.height / 2 + 2, p.z)];
    }
    const a = v.use ? layout.districts[v.use] : { x: layout.x, z: layout.z, width: layout.width, depth: layout.depth };
    // The near edge of the area is closer to the camera than its centre, so allow extra width.
    const d = fit(a.width * 1.14 + 24, a.depth * 0.55 + 50);
    return [new THREE.Vector3(a.x, d * 0.42, a.z + cell.depth * 0.3 + d * 0.9), new THREE.Vector3(a.x, 6, a.z + cell.depth * 0.3)];
  }
  function focus(v, instant) {
    view = { use: v.use || null, building: v.building || null, stop: v.stop || null, item: v.item || 0 };
    const [p, t] = shot(view);
    fromPos.copy(camera.position); fromTgt.copy(controls.target); toPos.copy(p); toTgt.copy(t);
    showTags();
    point(view.stop ? view.stop.id : null, view.item);
    if (instant || reduce) { camera.position.copy(p); controls.target.copy(t); t0 = -1; } else t0 = performance.now();
    const fb = view.building;
    if (view.stop && view.stop.frame && !view.stop.frame.outdoor) {
      const f = view.stop.frame;
      roomLight.position.set(fb.pos.x + f.x, f.y + f.h * 0.2, fb.pos.z + fb.size.depth * 0.3);
      roomLight.intensity = 16;
    } else roomLight.intensity = 0;
    districtSigns.forEach(x => { x.visible = !fb; });
    D.buildings.forEach(b => {
      const m = models[b.id], mine = b === fb;
      m.openTarget = mine ? 1 : 0;
      // Buildings standing between the camera and the open building step aside.
      m.g.visible = !fb || mine || b.pos.z <= fb.pos.z + 1;
      m.label.visible = !fb && (!view.use || b.use === view.use);
      m.label.scale.set(view.use ? 30 : 38, view.use ? 3.75 : 4.75, 1);
      Object.keys(m.rooms).forEach(id => { m.rooms[id].visible = mine && !!view.stop && view.stop.id === id; });
    });
  }

  /* ---------- interaction ---------- */

  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
  let down = null;
  function pick(e) {
    const r = canvas.getBoundingClientRect();
    ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, camera);
    const tag = ray.intersectObjects(tags.filter(x => x.visible))[0];
    if (tag) return tag.object.userData;
    if (view.building) {
      // equipment inside the open building
      const hit = ray.intersectObjects(models[view.building.id].equip, true)[0];
      for (let o = hit && hit.object; o; o = o.parent) if (o.userData && o.userData.product) return o.userData;
      // otherwise the room or rooftop area it stands in
      const zone = ray.intersectObjects(models[view.building.id].zones)[0];
      if (zone && !(view.stop && view.stop.id === zone.object.userData.stop)) return { room: zone.object.userData.stop, title: zone.object.userData.title };
    }
    const h = ray.intersectObjects(hits.filter(x => x.parent.visible))[0];
    return h ? { building: h.object.userData.building } : null;
  }
  canvas.addEventListener("pointerdown", e => { down = [e.clientX, e.clientY]; });
  canvas.addEventListener("pointerup", e => {
    if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) return;   // a drag, not a click
    const p = pick(e);
    if (p && p.product) D.selectEquipment(p.stop, p.n, true);
    else if (p && p.room) D.goToStop(p.room);
    else if (p && (!view.building || view.building.id !== p.building)) D.showBuilding(p.building);
  });
  const tip = document.createElement("p");
  tip.className = "scene-tip";
  tip.hidden = true;
  canvas.addEventListener("pointermove", e => {
    if (e.buttons !== 0) { tip.hidden = true; return; }
    const p = pick(e), r = stage.getBoundingClientRect();
    canvas.style.cursor = p ? "pointer" : "grab";
    const name = !p ? "" : p.product ? p.label + " — select for details" : p.room ? p.title : p.building && (!view.building || view.building.id !== p.building) ? models[p.building].b.name : "";
    canvas.style.cursor = p && (p.product || p.room || name) ? "pointer" : "grab";
    tip.hidden = !name;
    if (name) { tip.textContent = name; tip.style.left = e.clientX - r.left + 14 + "px"; tip.style.top = e.clientY - r.top + 14 + "px"; }
  });
  canvas.addEventListener("pointerleave", () => { tip.hidden = true; });

  /* ---------- loop ---------- */

  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    focus(view, true);
  }
  let onScreen = true, last = performance.now();
  new IntersectionObserver(en => { onScreen = en[0].isIntersecting; }).observe(stage);
  function frame(now) {
    requestAnimationFrame(frame);
    if (!onScreen) return;
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (t0 >= 0) {
      const t = Math.min(1, (now - t0) / 1000), e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      camera.position.lerpVectors(fromPos, toPos, e);
      controls.target.lerpVectors(fromTgt, toTgt, e);
      if (t === 1) t0 = -1;
    }
    D.buildings.forEach(b => {
      const m = models[b.id];
      m.open += (m.openTarget - m.open) * (reduce ? 1 : Math.min(1, dt * 5));
      m.cutaways.forEach(o => {
        if (o.material && o.material.transparent) o.material.opacity = 1 - m.open;
        o.visible = m.open < 0.97;
      });
    });
    tags.forEach(sp => {
      if (!sp.visible) return;
      const u = sp.userData, hh = tagHeight(sp, camera.position.distanceTo(u.base));
      sp.scale.set(hh * u.aspect, hh, 1);
      sp.position.set(u.base.x, u.base.y + u.lift, u.base.z);
    });
    controls.update();
    renderer.render(scene, camera);
  }

  stage.classList.add("is-3d");
  stage.appendChild(canvas);
  const hint = document.createElement("p");
  hint.className = "scene-hint";
  hint.textContent = "Drag to orbit · Ctrl + scroll to zoom · Click any building, room or unit";
  stage.appendChild(hint);
  stage.appendChild(tip);
  // zoom and full-screen buttons
  const tools = document.createElement("div");
  tools.className = "scene-tools";
  tools.innerHTML = '<button type="button" data-zoom="0.7" aria-label="Zoom in" title="Zoom in">+</button>' +
    '<button type="button" data-zoom="1.4" aria-label="Zoom out" title="Zoom out">−</button>' +
    '<button type="button" data-reset aria-label="Reset view" title="Reset view">⟲</button>' +
    '<button type="button" data-full aria-label="Full screen" title="Full screen">⛶</button>';
  stage.appendChild(tools);
  const frameEl = stage.closest(".tour");
  tools.addEventListener("click", e => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.zoom) zoom(Number(b.dataset.zoom));
    else if ("reset" in b.dataset) focus(view, false);
    else if (document.fullscreenElement) document.exitFullscreen();
    else if (frameEl.requestFullscreen) frameEl.requestFullscreen();
  });
  document.addEventListener("fullscreenchange", () => {
    const on = document.fullscreenElement === frameEl;
    tools.querySelector("[data-full]").setAttribute("aria-label", on ? "Exit full screen" : "Full screen");
    tools.querySelector("[data-full]").title = on ? "Exit full screen" : "Full screen";
  });
  if (!document.fullscreenEnabled) tools.querySelector("[data-full]").hidden = true;
  new ResizeObserver(resize).observe(stage);
  resize();
  D.view3d = { focus: v => focus(v, false), point, models };
  focus(D.tourState ? D.tourState() : view, true);
  requestAnimationFrame(frame);
}

try {
  init();
} catch (err) {
  // No WebGL: the panel beside the stage still lists every building and stop.
  console.warn("3D view unavailable.", err);
  stage.classList.add("no-3d");
}
