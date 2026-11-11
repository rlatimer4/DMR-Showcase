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

const D = window.DMR;
const stage = document.querySelector(".tour-stage");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function init() {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const canvas = renderer.domElement;
  canvas.className = "scene3d";
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", "3D model of the DMR world. Use the tabs and the list beside it to choose a building and its equipment locations.");

  const layout = D.layoutWorld();
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xe4eef6, 500, 1500);
  const camera = new THREE.PerspectiveCamera(30, 1, 1, 3000);
  const controls = new OrbitControls(camera, canvas);
  Object.assign(controls, { enableZoom: false, enablePan: false, enableDamping: true, maxPolarAngle: Math.PI / 2 - 0.08, minPolarAngle: 0.35 });

  scene.add(new THREE.HemisphereLight(0xffffff, 0xb9c6d1, 1.5));
  const sun = new THREE.DirectionalLight(0xffffff, 2.0);
  sun.position.set(-160, 260, 200);
  sun.castShadow = true;
  sun.shadow.mapSize.set(4096, 4096);
  const half = layout.width / 2 + 40;
  Object.assign(sun.shadow.camera, { left: -half, right: half, top: 160, bottom: -140, near: 10, far: 900 });
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
  const cell = D.world.cell, rows = Math.round(layout.depth / cell.depth);
  for (let r = 0; r <= rows; r++) {
    const z = cell.depth / 2 - r * cell.depth + (r === 0 ? 2 : 0);
    box(scene, layout.width + 120, 0.06, 8, 0, 0.03, z, M.road, false);
    for (let x = -layout.width / 2 - 50; x <= layout.width / 2 + 50; x += 12) box(scene, 5, 0.08, 0.3, x, 0.07, z, M.mark, false);
  }
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
    s.position.set(d.x, 1.5, cell.depth / 2 + 12);
    s.scale.set(64, 8, 1);
    scene.add(s);
    districtSigns.push(s);
  });

  /* ---------- canvas textures ---------- */

  function facadeTexture(cols, rowsN, color) {
    const c = document.createElement("canvas");
    c.width = 64 * cols; c.height = 64 * rowsN;
    const g = c.getContext("2d");
    g.fillStyle = color; g.fillRect(0, 0, c.width, c.height);
    for (let r = 0; r < rowsN; r++) for (let k = 0; k < cols; k++) {
      g.fillStyle = "rgba(255,255,255," + (0.5 + ((r * 7 + k * 3) % 5) * 0.07) + ")";
      g.fillRect(k * 64 + 8, r * 64 + 12, 48, 38);
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }
  function dotTexture(n, active) {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d");
    g.beginPath(); g.arc(64, 64, 54, 0, Math.PI * 2);
    g.fillStyle = active ? "#ffffff" : "#ffa500"; g.fill();
    g.lineWidth = 12; g.strokeStyle = active ? "#ffa500" : "#ffffff"; g.stroke();
    g.fillStyle = "#282c39"; g.font = "800 58px Montserrat, Arial, sans-serif";
    g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(String(n), 64, 68);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
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

  const models = {}, spots = [], hits = [], fans = [];

  // Generated shell: floors, walls, partitions, ducts and a glass front that fades away.
  function generateShell(b, shell, m) {
    const { width: w, depth: dp, floors, floorHeight: fh, bays, height: h } = b.size;
    const color = (D.useTypes.find(u => u.id === b.use) || {}).color || "#1779ba";
    box(shell, w + 3, 0.12, dp + 3, 0, 0.06, 0, M.pad, false);
    for (let i = 0; i <= floors; i++) box(shell, w, 0.3, dp, 0, i * fh + 0.15, 0, M.slab);
    box(shell, w, h, 0.4, 0, h / 2, -dp / 2 + 0.2, M.wall);
    box(shell, 0.4, h, dp, -w / 2 + 0.2, h / 2, 0, M.wall);
    box(shell, 0.4, h, dp, w / 2 - 0.2, h / 2, 0, M.wall);
    for (let i = 0; i < floors; i++) {
      for (let k = 1; k < bays; k++) box(shell, 0.25, fh - 0.3, dp * 0.62, -w / 2 + k * w / bays, i * fh + fh / 2 + 0.15, -dp * 0.19, M.partition);
      box(shell, w * 0.84, 0.5, 0.9, 0, (i + 1) * fh - 0.55, -dp * 0.1, M.supply, false);
      box(shell, w * 0.84, 0.4, 0.7, 0, (i + 1) * fh - 0.5, -dp * 0.36, M.return, false);
    }
    const fm = new THREE.MeshStandardMaterial({ map: facadeTexture(Math.max(3, Math.round(w / 3)), Math.max(2, Math.round(h / 2.2)), color), transparent: true, roughness: 0.3 });
    const facade = box(shell, w, h, 0.3, 0, h / 2, dp / 2 + 0.16, fm, false);
    facade.renderOrder = 2;
    m.cutaways.push(facade);

    // Per-building extras from the building file.
    if (typeof b.build === "function") {
      const pick = name => (name === "accent" ? (m.accent = m.accent || mat(new THREE.Color(color))) : M[name] || M.wall);
      b.build({
        box: (bw, bh, bd, x, y, z, name) => box(shell, bw, bh, bd, x, y, z, pick(name)),
        cyl: (rt, rb, ch, x, y, z, name) => mesh(shell, new THREE.CylinderGeometry(rt, rb, ch, 24), pick(name), x, y, z),
        cone: (r, ch, x, y, z, name) => mesh(shell, new THREE.ConeGeometry(r, ch, 4), pick(name), x, y, z).rotateY(Math.PI / 4),
        ring: (ri, ro, rh, x, y, z, name) => {
          const g = new THREE.CylinderGeometry(ro, ri, rh, 40, 1, true);
          const r = mesh(shell, g, pick(name), x, y, z);
          r.material = r.material.clone(); r.material.side = THREE.DoubleSide;
          r.scale.z = 0.5;
          return r;
        },
        gable: (gw, gh, gd, x, y, z, name) => {
          const s = new THREE.Shape([new THREE.Vector2(-gw / 2, 0), new THREE.Vector2(gw / 2, 0), new THREE.Vector2(0, gh)]);
          const g = new THREE.ExtrudeGeometry(s, { depth: gd, bevelEnabled: false });
          return mesh(shell, g, pick(name), x, y, z - gd / 2);
        }
      }, b.size);
    }
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
    const m = models[b.id] = { b, g, shell, cutaways: [], rooms: {}, spots: [], open: 0, openTarget: 0 };
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
      let pos;
      if (s.at.floor === "roof") {
        if (!b.model) {
          box(shell, 8, 3, 5, x, h + 1.8, -1, M.unit);
          box(shell, 8.1, 0.5, 5.1, x, h + 0.75, -1, M.trim, false);
          [-2.2, 2.2].forEach(dx => {
            const f = mesh(shell, new THREE.CylinderGeometry(1.25, 1.25, 0.3, 20), M.dark, x + dx, h + 3.45, -1, false);
            const blade = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.1, 0.35), M.unit);
            blade.position.y = 0.2; f.add(blade);
            const blade2 = blade.clone(); blade2.rotation.y = Math.PI / 2; f.add(blade2);
            fans.push(f);
          });
          box(shell, 1.1, h, 1.1, x + 2.5, h / 2 + 0.3, -dp / 2 + 1.2, M.supply, false);
          box(shell, 0.9, h, 0.9, x - 2.5, h / 2 + 0.3, -dp / 2 + 1.2, M.return, false);
        }
        pos = new THREE.Vector3(x, h + 6.2, -1);
      } else {
        const y0 = s.at.floor * fh, cw = w / bays, col = Math.min(bays - 1, Math.floor(s.at.x * bays));
        if (!b.model) {
          const eh = Math.min(2.2, fh * 0.35);
          box(shell, 2.6, eh, 1.6, x, y0 + 0.3 + eh / 2, dp * 0.12, M.unit);
          box(shell, 2.7, 0.3, 1.7, x, y0 + 0.55, dp * 0.12, M.trim, false);
        }
        const room = new THREE.Mesh(new THREE.BoxGeometry(cw - 0.5, fh - 0.5, dp - 0.8),
          new THREE.MeshBasicMaterial({ color: 0xffa500, transparent: true, opacity: 0.28, depthWrite: false }));
        room.position.set(-w / 2 + (col + 0.5) * cw, y0 + fh / 2 + 0.15, 0);
        room.visible = false; room.renderOrder = 3;
        g.add(room); m.rooms[s.id] = room;
        pos = new THREE.Vector3(x, y0 + fh * 0.62, dp * 0.34);
      }
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: dotTexture(s.n, false), depthTest: false, transparent: true }));
      sp.position.copy(pos);
      sp.renderOrder = 10;
      sp.visible = false;
      sp.userData = { stop: s.id, off: sp.material.map, on: dotTexture(s.n, true), phase: s.n * 0.7 };
      g.add(sp); spots.push(sp); m.spots.push(sp);
    });
  });

  /* ---------- camera ---------- */

  let view = { use: null, building: null, stop: null };
  const fromPos = new THREE.Vector3(), fromTgt = new THREE.Vector3(), toPos = new THREE.Vector3(), toTgt = new THREE.Vector3();
  let t0 = -1;
  function shot(v) {
    const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const fit = (wNeed, hNeed) => Math.max(hNeed / 2 / tan, wNeed / 2 / tan / camera.aspect);
    if (v.building) {
      const s = v.building.size, p = v.building.pos, d = fit(s.width + 14, s.height + 18) + s.depth / 2;
      return [new THREE.Vector3(p.x + d * 0.34, s.height / 2 + 2 + d * 0.2, p.z + d * 0.92), new THREE.Vector3(p.x, s.height / 2 + 2, p.z)];
    }
    const a = v.use ? layout.districts[v.use] : { x: 0, z: -(layout.depth - cell.depth) / 2, width: layout.width, depth: layout.depth };
    // The near edge of the area is closer to the camera than its centre, so allow extra width.
    const d = fit(a.width * 1.14 + 24, a.depth * 0.55 + 50);
    return [new THREE.Vector3(a.x, d * 0.42, a.z + cell.depth * 0.3 + d * 0.9), new THREE.Vector3(a.x, 6, a.z + cell.depth * 0.3)];
  }
  function focus(v, instant) {
    view = { use: v.use || null, building: v.building || null, stop: v.stop || null };
    const [p, t] = shot(view);
    fromPos.copy(camera.position); fromTgt.copy(controls.target); toPos.copy(p); toTgt.copy(t);
    if (instant || reduce) { camera.position.copy(p); controls.target.copy(t); t0 = -1; } else t0 = performance.now();
    const fb = view.building;
    districtSigns.forEach(x => { x.visible = !fb; });
    D.buildings.forEach(b => {
      const m = models[b.id], mine = b === fb;
      m.openTarget = mine ? 1 : 0;
      // Buildings standing between the camera and the open building step aside.
      m.g.visible = !fb || mine || b.pos.z <= fb.pos.z + 1;
      m.label.visible = !fb && !!view.use && b.use === view.use;
      m.spots.forEach(sp => {
        sp.visible = mine;
        sp.material.map = view.stop && sp.userData.stop === view.stop.id ? sp.userData.on : sp.userData.off;
      });
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
    const s = ray.intersectObjects(spots.filter(x => x.visible))[0];
    if (s) return { stop: s.object.userData.stop };
    const h = ray.intersectObjects(hits.filter(x => x.parent.visible))[0];
    return h ? { building: h.object.userData.building } : null;
  }
  canvas.addEventListener("pointerdown", e => { down = [e.clientX, e.clientY]; });
  canvas.addEventListener("pointerup", e => {
    if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) return;   // a drag, not a click
    const p = pick(e);
    if (p && p.stop) D.goToStop(p.stop);
    else if (p && (!view.building || view.building.id !== p.building)) D.showBuilding(p.building);
  });
  const tip = document.createElement("p");
  tip.className = "scene-tip";
  tip.hidden = true;
  canvas.addEventListener("pointermove", e => {
    if (e.buttons !== 0) { tip.hidden = true; return; }
    const p = pick(e), r = stage.getBoundingClientRect();
    canvas.style.cursor = p ? "pointer" : "grab";
    const name = p && p.building && (!view.building || view.building.id !== p.building) ? models[p.building].b.name : "";
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
    const k = reduce ? 3.4 : null;
    if (!reduce) fans.forEach(f => { f.rotation.y += dt * 6; });
    spots.forEach(sp => { if (sp.visible) { const s = k || 3.4 + Math.sin(now / 420 + sp.userData.phase) * 0.25; sp.scale.set(s, s, 1); } });
    controls.update();
    renderer.render(scene, camera);
  }

  stage.classList.add("is-3d");
  stage.appendChild(canvas);
  const hint = document.createElement("p");
  hint.className = "scene-hint";
  hint.textContent = "Drag to rotate · Select a building, then a numbered point";
  stage.appendChild(hint);
  stage.appendChild(tip);
  new ResizeObserver(resize).observe(stage);
  resize();
  D.view3d = { focus: v => focus(v, false) };
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
