/**
 * ╔══════════════════════════════════════════════════════╗
 * ║   JOYCESON PORTFOLIO — script.js                    ║
 * ║   SOLO LEVELING / SHADOW MONARCH THEME              ║
 * ║   Stack: Three.js · GSAP · ScrollTrigger            ║
 * ╚══════════════════════════════════════════════════════╝
 */
(function () {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const PAGE = document.body.dataset.page || "home";
  const isMobile = window.matchMedia("(hover:none)").matches;

  /* ══════════════════════════════════════════════════
     1. SYSTEM LOADER
  ══════════════════════════════════════════════════ */
  function initLoader() {
    return new Promise((resolve) => {
      const bar   = $("#loaderBar");
      const text  = $("#loaderText");
      const loader = $("#loader");

      const msgs = {
        home:     ["[SYSTEM] Booting...", "[SYSTEM] Checking Player Stats...", "[SYSTEM] Level: 99", "[SYSTEM] ARISE."],
        about:    ["[SYSTEM] Accessing Player Info...", "[SYSTEM] Class: Shadow Monarch...", "[SYSTEM] Status Verified.", "[SYSTEM] ARISE."],
        skills:   ["[SYSTEM] Loading Skill Tree...", "[SYSTEM] Passive: Ruler's Authority...", "[SYSTEM] Active: Shadow Extraction...", "[SYSTEM] ARISE."],
        projects: ["[SYSTEM] Loading Quests...", "[SYSTEM] S-Rank Gates detected...", "[SYSTEM] Ready for Entry.", "[SYSTEM] ARISE."],
        contact:  ["[SYSTEM] Establishing comms...", "[SYSTEM] Warning: High Mana Signature...", "[SYSTEM] Channel Open.", "[SYSTEM] ARISE."],
      };
      const pageM = msgs[PAGE] || msgs.home;

      const failsafe = setTimeout(hideLoader, 3500);

      function hideLoader() {
        clearTimeout(failsafe);
        if (!loader) { resolve(); return; }
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        loader.style.pointerEvents = "none";
        setTimeout(resolve, 100);
      }

      let progress = 0;
      function step() {
        progress += Math.random() * 20 + 8;
        if (progress >= 100) progress = 100;
        if (bar) bar.style.width = progress + "%";
        if (text) text.textContent = pageM[Math.min(Math.floor(progress / 25), pageM.length - 1)];

        if (progress < 100) {
          setTimeout(step, 60 + Math.random() * 60);
        } else {
          setTimeout(hideLoader, 350);
        }
      }
      step();
    });
  }

  /* ══════════════════════════════════════════════════
     2. THREE.JS — SHADOW AURA BACKGROUND
  ══════════════════════════════════════════════════ */
  function initBackgroundThree() {
    const canvas = $("#threeCanvas");
    if (!canvas || typeof THREE === "undefined") return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 300);
    camera.position.z = 60;

    const PCOUNT = isMobile ? 500 : 1200;
    const positions = new Float32Array(PCOUNT * 3);
    const colors    = new Float32Array(PCOUNT * 3);
    const speeds    = new Float32Array(PCOUNT);
    const swayOff   = new Float32Array(PCOUNT);

    for (let i = 0; i < PCOUNT; i++) {
      positions[i*3]     = (Math.random() - 0.5) * 160;
      positions[i*3 + 1] = (Math.random() - 0.5) * 160;
      positions[i*3 + 2] = (Math.random() - 0.5) * 100;
      speeds[i]  = 0.04 + Math.random() * 0.06;
      swayOff[i] = Math.random() * Math.PI * 2;

      const isBlue = Math.random() > 0.4;
      if (isBlue) {
        // Neon blue
        colors[i*3] = 0.0; colors[i*3+1] = 0.8; colors[i*3+2] = 1.0;
      } else {
        // Shadow purple
        colors[i*3] = 0.4; colors[i*3+1] = 0.0; colors[i*3+2] = 0.8;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    const mouse = { x: 0, y: 0 };
    if (!isMobile) {
      window.addEventListener("mousemove", (e) => {
        mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
        mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
      });
    }

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const posArr = geo.attributes.position.array;
    const clock  = new THREE.Clock();

    (function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      for (let i = 0; i < PCOUNT; i++) {
        // Embers rise upwards
        posArr[i*3 + 1] += speeds[i];
        posArr[i*3]     += Math.sin(t * 0.5 + swayOff[i]) * 0.02;
        if (posArr[i*3 + 1] > 80) {
          posArr[i*3 + 1] = -80;
          posArr[i*3]     = (Math.random() - 0.5) * 160;
        }
      }
      geo.attributes.position.needsUpdate = true;

      if (!isMobile) {
        camera.position.x += (mouse.x * 4 - camera.position.x) * 0.05;
        camera.position.y += (mouse.y * 3 - camera.position.y) * 0.05;
      }

      mat.opacity = 0.4 + Math.sin(t * 1.5) * 0.15;
      renderer.render(scene, camera);
    })();
  }

  /* ══════════════════════════════════════════════════
     3. THREE.JS — KNIGHT'S KILLER (HOME)
  ══════════════════════════════════════════════════ */
  function initDaggerScene() {
    const canvas = $("#hero3DCanvas");
    if (!canvas || typeof THREE === "undefined") return;

    canvas.style.display = "block";
    const W = 500, H = 500;
    canvas.style.width  = W + "px";
    canvas.style.height = H + "px";

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
    camera.position.set(0, 0, 10);

    scene.add(new THREE.AmbientLight(0x1a1a2e, 1));
    const blueL = new THREE.PointLight(0x00e5ff, 4, 15);
    blueL.position.set(3, 4, 5); scene.add(blueL);
    const purpleL = new THREE.PointLight(0x7a00ff, 3, 15);
    purpleL.position.set(-3, -4, -3); scene.add(purpleL);

    const dagger = new THREE.Group();

    // Blade
    const bladeGeo = new THREE.CylinderGeometry(0, 0.4, 4, 4);
    const bladeMat = new THREE.MeshPhongMaterial({
      color: 0x111115, shininess: 100, specular: 0x00e5ff, emissive: 0x001a22
    });
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    blade.position.y = 1;
    dagger.add(blade);

    // Hilt / Crossguard
    const guardGeo = new THREE.BoxGeometry(1.6, 0.2, 0.4);
    const hiltMat = new THREE.MeshPhongMaterial({ color: 0x050508, shininess: 50, specular: 0x7a00ff });
    const guard = new THREE.Mesh(guardGeo, hiltMat);
    guard.position.y = -1;
    dagger.add(guard);

    // Handle
    const handleGeo = new THREE.CylinderGeometry(0.15, 0.15, 1.2, 8);
    const handle = new THREE.Mesh(handleGeo, hiltMat);
    handle.position.y = -1.7;
    dagger.add(handle);

    // Glowing core line
    const coreGeo = new THREE.CylinderGeometry(0.02, 0.02, 3.8, 4);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.y = 1;
    core.position.z = 0.21;
    dagger.add(core);

    dagger.rotation.z = Math.PI / 6;
    scene.add(dagger);

    const mouse = { x: 0, y: 0 };
    if (!isMobile) {
      window.addEventListener("mousemove", (e) => {
        mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
        mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
      });
    }

    const clock = new THREE.Clock();
    (function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      
      dagger.position.y = Math.sin(t * 2) * 0.2;
      dagger.rotation.y = t * 0.5 + mouse.x * 0.5;
      dagger.rotation.x = mouse.y * 0.5;
      
      blueL.intensity = 3 + Math.sin(t * 3) * 1.5;
      renderer.render(scene, camera);
    })();
  }

  /* ══════════════════════════════════════════════════
     4. THREE.JS — SYSTEM PORTAL (ABOUT)
  ══════════════════════════════════════════════════ */
  function initPortalScene() {
    const canvas = $("#about3DCanvas");
    if (!canvas || typeof THREE === "undefined") return;

    canvas.style.display = "block";
    const W = 500, H = 500;
    canvas.style.width  = W + "px";
    canvas.style.height = H + "px";

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.z = 8;

    const group = new THREE.Group();

    function createRing(radius, color, dash) {
      const geo = new THREE.TorusGeometry(radius, 0.015, 16, 100);
      let mat;
      if (dash) {
        mat = new THREE.LineDashedMaterial({ color, dashSize: 0.2, gapSize: 0.1 });
        const edges = new THREE.EdgesGeometry(geo);
        const line = new THREE.LineSegments(edges, mat);
        line.computeLineDistances();
        return line;
      } else {
        mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.6 });
        return new THREE.Mesh(geo, mat);
      }
    }

    const r1 = createRing(2.5, 0x00e5ff, false);
    const r2 = createRing(2.2, 0x7a00ff, true);
    const r3 = createRing(1.8, 0x00e5ff, true);
    const r4 = createRing(0.5, 0x00e5ff, false);
    
    // Portal core
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x7a00ff })
    );

    group.add(r1, r2, r3, r4, core);

    // Floating data particles inside
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(50 * 3);
    for(let i=0; i<150; i++) {
      pPos[i] = (Math.random() - 0.5) * 4;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x00e5ff, size: 0.05 });
    const points = new THREE.Points(pGeo, pMat);
    group.add(points);

    scene.add(group);
    group.rotation.x = 0.5;

    const clock = new THREE.Clock();
    (function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      
      r1.rotation.z = t * 0.2;
      r2.rotation.z = -t * 0.4;
      r3.rotation.z = t * 0.5;
      r2.rotation.x = Math.sin(t * 0.5) * 0.2;
      
      points.rotation.y = t * 0.3;
      core.scale.setScalar(1 + Math.sin(t * 4) * 0.2);
      
      renderer.render(scene, camera);
    })();
  }

  /* ══════════════════════════════════════════════════
     5. THREE.JS — SHADOW CRYSTAL (SKILLS)
  ══════════════════════════════════════════════════ */
  function initCrystalScene() {
    const canvas = $("#skills3DCanvas");
    if (!canvas || typeof THREE === "undefined") return;

    canvas.style.display = "block";
    const W = 500, H = 500;
    canvas.style.width  = W + "px";
    canvas.style.height = H + "px";

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0, 8);

    scene.add(new THREE.AmbientLight(0x0a0510, 1.5));
    const blueL = new THREE.PointLight(0x00e5ff, 5, 12);
    blueL.position.set(3, 4, 4); scene.add(blueL);
    const purpL = new THREE.PointLight(0x7a00ff, 4, 10);
    purpL.position.set(-3, -2, 2); scene.add(purpL);

    // Icosahedron crystal
    const geo = new THREE.IcosahedronGeometry(1.5, 0);
    const mat = new THREE.MeshPhongMaterial({
      color: 0x050508, emissive: 0x0a001a, shininess: 100, specular: 0x00e5ff, flatShading: true
    });
    const crystal = new THREE.Mesh(geo, mat);
    
    // Wireframe overlay
    const wire = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: 0.3 })
    );
    wire.scale.setScalar(1.02);
    crystal.add(wire);

    // Orbiting shards
    const shards = new THREE.Group();
    for(let i=0; i<6; i++) {
      const s = new THREE.Mesh(
        new THREE.TetrahedronGeometry(0.3, 0),
        new THREE.MeshPhongMaterial({ color: 0x111, emissive: 0x202, specular: 0x7a00ff, flatShading: true })
      );
      const angle = (i / 6) * Math.PI * 2;
      s.position.set(Math.cos(angle) * 3, Math.sin(angle) * 3, 0);
      shards.add(s);
    }
    
    scene.add(crystal, shards);

    const clock = new THREE.Clock();
    (function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      
      crystal.rotation.y = t * 0.4;
      crystal.rotation.x = t * 0.2;
      crystal.position.y = Math.sin(t * 1.5) * 0.2;
      
      shards.rotation.z = t * 0.3;
      shards.rotation.y = t * 0.2;
      shards.children.forEach(s => {
        s.rotation.x += 0.02;
        s.rotation.y += 0.03;
      });
      
      renderer.render(scene, camera);
    })();
  }

  /* ══════════════════════════════════════════════════
     6. GSAP ANIMATIONS
  ══════════════════════════════════════════════════ */
  function initGSAP() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    /* ── Hero Entrance ── */
    if (PAGE === "home") {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".hero-eyebrow", { opacity:0, y:20,  duration:0.6, ease:"power3.out" })
        .from(".hero-title",   { opacity:0, x:-40, duration:0.8, ease:"power3.out" }, "-=0.3")
        .from(".hero-role",    { opacity:0, x:-20, duration:0.6, ease:"power3.out" }, "-=0.4")
        .from(".hero-desc",    { opacity:0, y:15,  duration:0.6, ease:"power2.out" }, "-=0.3")
        .from(".hero-rule",    { scaleX:0,         duration:0.6, ease:"power3.out", transformOrigin:"left" }, "-=0.2")
        .from(".hero-stats",   { opacity:0, y:20,  duration:0.5, ease:"power2.out" }, "-=0.2")
        .from(".hero-btns",    { opacity:0, y:20,  duration:0.5, ease:"power2.out" }, "-=0.2")
        .from(".hero-right",   { opacity:0, scale:0.8, duration:1.2, ease:"elastic.out(1,0.6)" }, 0.2)
        .from(".scroll-hint",  { opacity:0, y:10,  duration:0.4 }, "-=0.3");

      $$(".stat-num[data-count]").forEach(el => {
        const target = parseInt(el.dataset.count);
        gsap.fromTo(el, { textContent: 0 }, {
          textContent: target, duration: 2, ease: "power2.out", delay: 1, snap: { textContent: 1 },
          onUpdate() { el.textContent = Math.round(this.targets()[0].textContent); }
        });
      });
    } else {
      gsap.from(".section-head", { opacity:0, y:30, duration:0.7, ease:"power3.out", delay:0.2 });
    }

    /* ── Standard Reveals ── */
    $$(".reveal").forEach(el => gsap.from(el, { opacity:0, y:40, duration:0.8, ease:"power3.out", scrollTrigger: { trigger: el, start: "top 85%" } }));
    $$(".reveal-left").forEach(el => gsap.from(el, { opacity:0, x:-40, duration:0.8, ease:"power3.out", scrollTrigger: { trigger: el, start: "top 85%" } }));
    $$(".reveal-scale").forEach(el => gsap.from(el, { opacity:0, scale:0.9, duration:0.8, ease:"power3.out", scrollTrigger: { trigger: el, start: "top 85%" } }));

    $$(".skill-fill").forEach(fill => gsap.to(fill, { width: fill.dataset.w + "%", duration: 1.2, ease: "power2.out", scrollTrigger: { trigger: fill, start: "top 90%" } }));
    $$(".skill-card").forEach((c, i) => gsap.from(c, { opacity:0, y:30, duration:0.6, delay: i*0.1, scrollTrigger: { trigger: c, start: "top 85%" } }));
    $$(".timeline-item").forEach((item, i) => gsap.from(item, { opacity:0, x:-30, duration:0.7, delay: i*0.15, scrollTrigger: { trigger: item, start: "top 85%" } }));
    $$(".pcard").forEach((c, i) => gsap.from(c, { opacity:0, y:40, duration:0.7, delay: i*0.1, scrollTrigger: { trigger: c, start: "top 85%" } }));
  }

  /* ══════════════════════════════════════════════════
     7. TYPED TEXT (System Mode)
  ══════════════════════════════════════════════════ */
  function initTyped() {
    const el = $("#typedText");
    if (!el) return;
    const phrases = ["Shadow Monarch", "Frontend Architect", "System Player", "UI Awakened"];
    let pi = 0, ci = 0, deleting = false;

    function type() {
      const word = phrases[pi];
      el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
      const pause = deleting ? (ci < 0 ? 500 : 30) : ci > word.length ? 2000 : 60;
      if (!deleting && ci > word.length) deleting = true;
      if (deleting && ci < 0) { deleting = false; pi = (pi + 1) % phrases.length; ci = 0; }
      setTimeout(type, pause);
    }
    setTimeout(type, 1000);
  }

  /* ══════════════════════════════════════════════════
     8. CUSTOM CURSOR
  ══════════════════════════════════════════════════ */
  function initCursor() {
    if (isMobile) return;
    const outer = $("#cursor-outer");
    const inner = $("#cursor-inner");
    if (!outer || !inner) return;

    let mx = -200, my = -200, ox = -200, oy = -200;
    document.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; inner.style.left = mx + "px"; inner.style.top  = my + "px"; });
    (function follow() {
      ox += (mx - ox) * 0.15; oy += (my - oy) * 0.15;
      outer.style.left = ox + "px"; outer.style.top  = oy + "px";
      requestAnimationFrame(follow);
    })();
    $$("a, button, .skill-card, .pcard").forEach(el => {
      el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });
  }

  /* ══════════════════════════════════════════════════
     9. UI UTILITIES (Header, Progress, Transitions)
  ══════════════════════════════════════════════════ */
  function initUI() {
    const header = $("header");
    if (header) window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 30));

    const bar = $("#scroll-bar");
    if (bar) window.addEventListener("scroll", () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = ((window.scrollY / Math.max(max, 1)) * 100) + "%";
    });

    const burger = $("#burger"), nav = $("#mainNav");
    if (burger && nav) {
      burger.addEventListener("click", () => { burger.classList.toggle("open"); nav.classList.toggle("open"); });
    }

    const overlay = $("#page-transition");
    if (overlay && typeof gsap !== "undefined") {
      gsap.set(overlay, { scaleY: 1, transformOrigin: "top" });
      gsap.to(overlay, { scaleY: 0, duration: 0.6, ease: "power3.out", delay: 0.05 });

      $$("a[href]").forEach(a => {
        const href = a.getAttribute("href");
        if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto")) return;
        a.addEventListener("click", e => {
          e.preventDefault();
          gsap.to(overlay, {
            scaleY: 1, transformOrigin: "bottom", duration: 0.4, ease: "power3.in",
            onComplete: () => window.location.href = href
          });
        });
      });
    }

    const filterBtns = $$(".filter-btn"), cards = $$(".pcard");
    if (filterBtns.length) {
      filterBtns.forEach(btn => btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.dataset.f;
        cards.forEach(c => {
          const show = f === "all" || (c.dataset.cat || "").includes(f);
          if (typeof gsap !== "undefined") gsap.to(c, { opacity: show ? 1 : 0.1, scale: show ? 1 : 0.95, duration: 0.3 });
          c.style.pointerEvents = show ? "auto" : "none";
        });
      }));
    }
  }

  /* ══════════════════════════════════════════════════
     MAIN INIT
  ══════════════════════════════════════════════════ */
  async function init() {
    initBackgroundThree();
    initUI();
    
    await initLoader();

    if (PAGE === "home")   initDaggerScene();
    if (PAGE === "about")  initPortalScene();
    if (PAGE === "skills") initCrystalScene();

    initGSAP();
    initTyped();
    initCursor();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
