(function () {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const PAGE = document.body.dataset.page || "home";
  const isMobile = window.matchMedia("(hover:none)").matches;

  /* ══════════════════════════════════════════════════
     1. LOADER — hard failsafe, always resolves
  ══════════════════════════════════════════════════ */
  function initLoader() {
    return new Promise((resolve) => {
      const bar   = $("#loaderBar");
      const text  = $("#loaderText");
      const loader = $("#loader");

      const msgs = {
        home:     ["Opening the notebook...", "Writing the name...", "Cause of death:", "Heart attack."],
        about:    ["Entering Shinigami Realm...", "Locating the suspect...", "Profile confirmed.", "Proceed."],
        skills:   ["Analyzing the suspect...", "Cross-referencing data...", "Intelligence: SUPERIOR.", "Proceed."],
        projects: ["Retrieving case files...", "Decrypting evidence...", "Files unlocked.", "Proceed."],
        contact:  ["Preparing the note...", "Feather pen ready...", "Write carefully.", "\u2026or else."],
      };
      const pageM = msgs[PAGE] || msgs.home;

      // Hard-failsafe: always hide loader after 4 seconds maximum
      const failsafe = setTimeout(hideLoader, 4000);

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
        progress += Math.random() * 18 + 6;
        if (progress >= 100) progress = 100;
        if (bar) bar.style.width = progress + "%";
        if (text) text.textContent = pageM[Math.min(Math.floor(progress / 25), pageM.length - 1)];

        if (progress < 100) {
          setTimeout(step, 80 + Math.random() * 80);
        } else {
          setTimeout(hideLoader, 350);
        }
      }
      step();
    });
  }

  /* ══════════════════════════════════════════════════
     2. THREE.JS — BACKGROUND (falling petals / feathers)
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

    const PCOUNT = isMobile ? 600 : 1400;
    const positions = new Float32Array(PCOUNT * 3);
    const colors    = new Float32Array(PCOUNT * 3);
    const speeds    = new Float32Array(PCOUNT);
    const swayOff   = new Float32Array(PCOUNT);

    for (let i = 0; i < PCOUNT; i++) {
      positions[i*3]     = (Math.random() - 0.5) * 160;
      positions[i*3 + 1] = Math.random() * 160 - 20;
      positions[i*3 + 2] = (Math.random() - 0.5) * 100;
      speeds[i]  = 0.025 + Math.random() * 0.055;
      swayOff[i] = Math.random() * Math.PI * 2;

      if (Math.random() > 0.38) {
        // Gold petals
        const t = 0.5 + Math.random() * 0.5;
        colors[i*3] = 0.78 * t; colors[i*3+1] = 0.66 * t; colors[i*3+2] = 0.30 * t;
      } else {
        // Dark red feathers
        colors[i*3] = 0.55; colors[i*3+1] = 0.0; colors[i*3+2] = 0.0;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 1.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
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
        posArr[i*3 + 1] -= speeds[i];
        posArr[i*3]     += Math.sin(t * 0.35 + swayOff[i]) * 0.012;
        if (posArr[i*3 + 1] < -90) {
          posArr[i*3 + 1] = 90;
          posArr[i*3]     = (Math.random() - 0.5) * 160;
        }
      }
      geo.attributes.position.needsUpdate = true;

      if (!isMobile) {
        camera.position.x += (mouse.x * 5 - camera.position.x) * 0.03;
        camera.position.y += (mouse.y * 4 - camera.position.y) * 0.03;
      }

      mat.opacity = 0.38 + Math.sin(t * 0.5) * 0.08;
      renderer.render(scene, camera);
    })();
  }

  /* ══════════════════════════════════════════════════
     3. THREE.JS — DEATH NOTE BOOK (index.html)
  ══════════════════════════════════════════════════ */
  function initBookScene() {
    const canvas = $("#bookCanvas");
    if (!canvas || typeof THREE === "undefined") return;

    // Force canvas dimensions via CSS before reading
    canvas.style.display = "block";
    const W = 420, H = 480;
    canvas.style.width  = W + "px";
    canvas.style.height = H + "px";

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
    camera.position.set(0, 0, 9);

    // Lights
    scene.add(new THREE.AmbientLight(0x1a0a00, 0.8));
    const gL = new THREE.PointLight(0xc9a84c, 4, 22);
    gL.position.set(3, 4, 5); scene.add(gL);
    const rL = new THREE.PointLight(0x8b0000, 2.5, 18);
    rL.position.set(-3, -2, 4); scene.add(rL);

    const book = new THREE.Group();

    // Cover
    const cvMat = new THREE.MeshPhongMaterial({ color: 0x0d0a0d, shininess: 45, specular: 0xc9a84c });
    book.add(new THREE.Mesh(new THREE.BoxGeometry(2.7, 3.7, 0.24), cvMat));

    // Pages
    const pgMesh = new THREE.Mesh(
      new THREE.BoxGeometry(2.45, 3.55, 0.20),
      new THREE.MeshPhongMaterial({ color: 0xf5e6c8, shininess: 5 })
    );
    pgMesh.position.set(0.06, 0, 0);
    book.add(pgMesh);

    // Spine
    const spMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 3.7, 0.24),
      new THREE.MeshPhongMaterial({ color: 0x070508, shininess: 70, specular: 0xc9a84c })
    );
    spMesh.position.set(-1.47, 0, 0);
    book.add(spMesh);

    // Gold title band
    const goldMat = new THREE.MeshPhongMaterial({ color: 0xc9a84c, shininess: 100, specular: 0xffd700, emissive: 0x3a2800 });
    const band = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.38, 0.25), goldMat);
    band.position.set(0, 1.15, 0);
    book.add(band);

    // DEATH NOTE text bar
    const dn = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.14, 0.25), goldMat);
    dn.position.set(0, 0.75, 0);
    book.add(dn);

    // Eye sigil on cover
    const eyeRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.28, 0.018, 8, 48),
      new THREE.MeshPhongMaterial({ color: 0xc9a84c, emissive: 0x3a2200 })
    );
    eyeRing.position.set(0, -0.3, 0.125);
    book.add(eyeRing);

    const eyePupil = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 10, 10),
      new THREE.MeshPhongMaterial({ color: 0x8b0000, emissive: 0x3a0000 })
    );
    eyePupil.position.set(0, -0.3, 0.14);
    book.add(eyePupil);

    // Horizontal lines (page lines, barely visible on cover edge)
    for (let i = -1.2; i < 1.2; i += 0.22) {
      const lm = new THREE.Mesh(
        new THREE.BoxGeometry(2.42, 0.008, 0.01),
        new THREE.MeshBasicMaterial({ color: 0xd0b884, transparent: true, opacity: 0.3 })
      );
      lm.position.set(0.06, i, 0.115);
      book.add(lm);
    }

    book.rotation.y = 0.35;
    book.rotation.x = -0.06;
    scene.add(book);

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
      book.position.y = Math.sin(t * 0.65) * 0.14;
      book.rotation.y = 0.35 + mouse.x * 0.2 + Math.sin(t * 0.28) * 0.04;
      book.rotation.x = -0.06 + mouse.y * 0.1;
      gL.intensity = 3 + Math.sin(t * 1.1) * 0.7;
      renderer.render(scene, camera);
    })();
  }

  /* ══════════════════════════════════════════════════
     4. THREE.JS — SHINIGAMI EYE (about.html)
  ══════════════════════════════════════════════════ */
  function initAboutScene() {
    const canvas = $("#aboutCanvas");
    if (!canvas || typeof THREE === "undefined") return;

    canvas.style.display = "block";
    const W = 300, H = 300;
    canvas.style.width  = W + "px";
    canvas.style.height = H + "px";

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 5;

    scene.add(new THREE.AmbientLight(0x1a0505, 1));
    const rL = new THREE.PointLight(0x8b0000, 5, 14);
    rL.position.set(2, 2, 3); scene.add(rL);
    const gL = new THREE.PointLight(0xc9a84c, 2, 12);
    gL.position.set(-2, -1, 3); scene.add(gL);

    const group = new THREE.Group();

    // Eye frame (oval torus)
    const eyeFrame = new THREE.Mesh(
      new THREE.TorusGeometry(1.5, 0.04, 8, 64),
      new THREE.MeshPhongMaterial({ color: 0xc9a84c, shininess: 80, emissive: 0x2a1500 })
    );
    eyeFrame.scale.set(1, 0.48, 1);
    group.add(eyeFrame);

    // Pupil
    const pupil = new THREE.Mesh(
      new THREE.SphereGeometry(0.36, 16, 16),
      new THREE.MeshPhongMaterial({ color: 0x6b0000, shininess: 100, emissive: 0x3a0000, specular: 0xff2020 })
    );
    pupil.scale.set(0.48, 1.4, 0.48);
    group.add(pupil);

    // Iris
    const iris = new THREE.Mesh(
      new THREE.SphereGeometry(0.19, 16, 16),
      new THREE.MeshPhongMaterial({ color: 0xff2020, emissive: 0x8b0000 })
    );
    iris.scale.set(0.48, 1.4, 0.48);
    group.add(iris);

    // Rotating rings
    const makeRing = (r, c, op) => new THREE.Mesh(
      new THREE.TorusGeometry(r, 0.022, 6, 64),
      new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: op })
    );
    const r1 = makeRing(2.0, 0x8b0000, 0.5);
    const r2 = makeRing(1.7, 0xc9a84c, 0.35);
    const r3 = makeRing(1.3, 0x8b0000, 0.25);
    r1.rotation.x = Math.PI / 3;
    r2.rotation.y = Math.PI / 4;
    r3.rotation.x = Math.PI / 2;
    group.add(r1, r2, r3);

    // Radiating lines
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const lm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.009, 0.009, 0.85, 4),
        new THREE.MeshBasicMaterial({ color: 0xc9a84c, transparent: true, opacity: 0.3 })
      );
      lm.position.set(Math.cos(a) * 1.85, Math.sin(a) * 0.9, 0);
      lm.rotation.z = -a - Math.PI / 2;
      group.add(lm);
    }

    scene.add(group);

    const clock = new THREE.Clock();
    (function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      group.rotation.z = t * 0.1;
      r1.rotation.z = t * 0.18;
      r2.rotation.z = -t * 0.14;
      r3.rotation.z = t * 0.23;
      const sc = 0.48 + Math.sin(t * 1.8) * 0.15;
      pupil.scale.set(sc * 0.48 / 0.48, 1.2 + Math.sin(t * 1.8) * 0.25, sc * 0.48 / 0.48);
      iris.scale.copy(pupil.scale);
      rL.intensity = 4 + Math.sin(t * 2) * 1.5;
      renderer.render(scene, camera);
    })();
  }

  /* ══════════════════════════════════════════════════
     5. THREE.JS — CHESS KINGS (skills.html)
  ══════════════════════════════════════════════════ */
  function initChessScene() {
    const canvas = $("#chessCanvas");
    if (!canvas || typeof THREE === "undefined") return;

    canvas.style.display = "block";
    const W = 420, H = 420;
    canvas.style.width  = W + "px";
    canvas.style.height = H + "px";

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.setSize(W, H);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 3.5, 9);
    camera.lookAt(0, 0.5, 0);

    scene.add(new THREE.AmbientLight(0x0d0810, 1.2));
    const gL = new THREE.PointLight(0xc9a84c, 4, 22);
    gL.position.set(4, 6, 4); scene.add(gL);
    const rL = new THREE.PointLight(0x8b0000, 3, 16);
    rL.position.set(-4, 2, 2); scene.add(rL);

    function makeKing(color, emissive) {
      const g = new THREE.Group();
      const mat = new THREE.MeshPhongMaterial({ color, shininess: 80, emissive, specular: 0xffffff });
      const base  = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.62, 0.22, 16), mat);
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.3, 1.1, 16), mat);
      const neck  = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.22, 0.22, 16), mat);
      const head  = new THREE.Mesh(new THREE.SphereGeometry(0.33, 16, 16), mat);
      const cross1= new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.38, 0.08), mat);
      const cross2= new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.08, 0.08), mat);
      shaft.position.y  = 0.66;
      neck.position.y   = 1.27;
      head.position.y   = 1.55;
      cross1.position.y = 1.85;
      cross2.position.y = 1.98;
      g.add(base, shaft, neck, head, cross1, cross2);
      return g;
    }

    const lightKing = makeKing(0xfaf0e0, 0x2a1a00);
    const darkKing  = makeKing(0x1a1018, 0x0a0005);
    lightKing.position.set(-1.9, 0, 0);
    darkKing.position.set( 1.9, 0, 0);
    scene.add(lightKing, darkKing);

    // Board
    const board = new THREE.Mesh(
      new THREE.BoxGeometry(6.5, 0.12, 6.5),
      new THREE.MeshPhongMaterial({ color: 0x0d0810, shininess: 20 })
    );
    board.position.y = -0.06; board.receiveShadow = true; scene.add(board);

    for (let x = -3; x < 3; x++) {
      for (let z = -3; z < 3; z++) {
        const sq = new THREE.Mesh(
          new THREE.BoxGeometry(0.99, 0.06, 0.99),
          new THREE.MeshPhongMaterial({
            color: (x + z) % 2 === 0 ? 0x1e1520 : 0x080a0c,
            shininess: (x + z) % 2 === 0 ? 20 : 3,
          })
        );
        sq.position.set(x + 0.5, 0.01, z + 0.5);
        scene.add(sq);
      }
    }

    // Dividing golden line
    const div = new THREE.Mesh(
      new THREE.BoxGeometry(0.025, 2.4, 6.5),
      new THREE.MeshBasicMaterial({ color: 0xc9a84c, transparent: true, opacity: 0.35 })
    );
    scene.add(div);

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
      lightKing.position.y = Math.sin(t * 0.8) * 0.12;
      darkKing.position.y  = Math.cos(t * 0.8) * 0.12;
      lightKing.rotation.y = t * 0.24 + mouse.x * 0.4;
      darkKing.rotation.y  = -t * 0.28 + mouse.x * 0.4;
      camera.position.x = mouse.x * 1.8;
      camera.position.y = 3.5 + mouse.y * 0.8;
      camera.lookAt(0, 0.5, 0);
      gL.intensity = 3.5 + Math.sin(t * 1.4) * 0.8;
      renderer.render(scene, camera);
    })();
  }

  /* ══════════════════════════════════════════════════
     6. GSAP SCROLL ANIMATIONS (window-based scroll)
  ══════════════════════════════════════════════════ */
  function initGSAP() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    /* ── Hero entrance ── */
    if (PAGE === "home") {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".hero-eyebrow", { opacity:0, y:30,  duration:0.7, ease:"power3.out" })
        .from(".hero-title",   { opacity:0, x:-50, duration:0.9, ease:"power3.out", skewX:-3 }, "-=0.4")
        .from(".hero-role",    { opacity:0, x:-30, duration:0.6, ease:"power3.out" }, "-=0.4")
        .from(".hero-desc",    { opacity:0, y:20,  duration:0.6, ease:"power2.out" }, "-=0.3")
        .from(".hero-rule",    { scaleX:0,          duration:0.8, ease:"power3.out", transformOrigin:"left" }, "-=0.3")
        .from(".hero-stats",   { opacity:0, y:20,  duration:0.5, ease:"power2.out" }, "-=0.2")
        .from(".hero-btns",    { opacity:0, y:20,  duration:0.5, ease:"power2.out" }, "-=0.2")
        .from(".hero-right",   { opacity:0, scale:0.75, duration:1.2, ease:"elastic.out(1,0.5)" }, 0.3)
        .from(".scroll-hint",  { opacity:0, y:10,  duration:0.4 }, "-=0.3");

      // Counter animation
      $$(".stat-num[data-count]").forEach(el => {
        const target = parseInt(el.dataset.count);
        gsap.fromTo(el, { textContent: 0 }, {
          textContent: target, duration: 2.5, ease: "power2.out", delay: 1.5,
          snap: { textContent: 1 },
          onUpdate() { el.textContent = Math.round(this.targets()[0].textContent); }
        });
      });
    }

    /* ── Page-level entrance for non-home pages ── */
    if (PAGE !== "home") {
      gsap.from(".section-head", { opacity:0, y:40, duration:0.8, ease:"power3.out", delay:0.3 });
    }

    /* ── Scroll reveal (window-based) ── */
    const revealCfg = [
      { sel: ".reveal",       from: { opacity:0, y:50 } },
      { sel: ".reveal-left",  from: { opacity:0, x:-60 } },
      { sel: ".reveal-right", from: { opacity:0, x:60 } },
      { sel: ".reveal-scale", from: { opacity:0, scale:0.85 } },
    ];

    revealCfg.forEach(({ sel, from }) => {
      $$(sel).forEach(el => {
        gsap.from(el, {
          ...from, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" }
        });
      });
    });

    /* ── Skill fills ── */
    $$(".skill-fill").forEach(fill => {
      gsap.to(fill, {
        width: (fill.dataset.w || 0) + "%",
        duration: 1.4, ease: "power2.out",
        scrollTrigger: { trigger: fill, start: "top 88%", toggleActions: "play none none none" }
      });
    });

    /* ── Skill cards ── */
    $$(".skill-card").forEach((c, i) => {
      gsap.from(c, {
        opacity:0, x:-40, duration:0.7, ease:"power3.out", delay: i * 0.09,
        scrollTrigger: { trigger: c, start: "top 88%", toggleActions: "play none none none" }
      });
    });

    /* ── Project cards ── */
    $$(".pcard").forEach((c, i) => {
      gsap.from(c, {
        opacity:0, y:60, duration:0.8, ease:"power3.out", delay: i * 0.1,
        scrollTrigger: { trigger: c, start: "top 88%", toggleActions: "play none none none" }
      });
    });

    /* ── Timeline items ── */
    $$(".timeline-item").forEach((item, i) => {
      const isR = item.classList.contains("is-right");
      gsap.from(item, {
        opacity:0, x: isR ? 50 : -50, duration:0.8, ease:"power3.out", delay: i * 0.15,
        scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none none" }
      });
    });

    /* ── Contact ── */
    gsap.from(".contact-intro", {
      opacity:0, y:30, duration:0.7, ease:"power2.out",
      scrollTrigger: { trigger: ".contact-intro", start: "top 85%", toggleActions: "play none none none" }
    });
    $$(".clink").forEach((el, i) => {
      gsap.from(el, {
        opacity:0, x:-30, duration:0.6, ease:"power3.out", delay: i * 0.1,
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" }
      });
    });
    gsap.from(".death-note-form", {
      opacity:0, x:60, duration:0.9, ease:"power3.out",
      scrollTrigger: { trigger: ".death-note-form", start: "top 85%", toggleActions: "play none none none" }
    });
  }

  /* ══════════════════════════════════════════════════
     7. TYPED TEXT
  ══════════════════════════════════════════════════ */
  function initTyped() {
    const el = $("#typedText");
    if (!el) return;
    const phrases = ["Frontend Developer", "UI Architect", "React Learner", "God of the New Web"];
    let pi = 0, ci = 0, deleting = false;

    function type() {
      const word = phrases[pi];
      el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
      const pause = deleting ? (ci < 0 ? 500 : 45) : ci > word.length ? 2200 : 80;
      if (!deleting && ci > word.length) deleting = true;
      if (deleting && ci < 0) { deleting = false; pi = (pi + 1) % phrases.length; ci = 0; }
      setTimeout(type, pause);
    }
    setTimeout(type, 1500);
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

    document.addEventListener("mousemove", e => {
      mx = e.clientX; my = e.clientY;
      inner.style.left = mx + "px";
      inner.style.top  = my + "px";
    });

    (function follow() {
      ox += (mx - ox) * 0.1;
      oy += (my - oy) * 0.1;
      outer.style.left = ox + "px";
      outer.style.top  = oy + "px";
      requestAnimationFrame(follow);
    })();

    $$("a, button, .skill-card, .pcard, .clink, .filter-btn, .social-pill, .form-submit").forEach(el => {
      el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });
    document.addEventListener("mouseleave", () => {
      inner.style.opacity = "0"; outer.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
      inner.style.opacity = "1"; outer.style.opacity = "1";
    });
  }

  /* ══════════════════════════════════════════════════
     9. HEADER SCROLL STATE
  ══════════════════════════════════════════════════ */
  function initHeader() {
    const header = $("header");
    if (!header) return;
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 30);
    }, { passive: true });
    // Set on load
    header.classList.toggle("scrolled", window.scrollY > 30);
  }

  /* ══════════════════════════════════════════════════
     10. SCROLL PROGRESS BAR
  ══════════════════════════════════════════════════ */
  function initScrollProgress() {
    const bar = $("#scroll-bar");
    if (!bar) return;
    window.addEventListener("scroll", () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = ((window.scrollY / Math.max(max, 1)) * 100) + "%";
    }, { passive: true });
  }

  /* ══════════════════════════════════════════════════
     11. BURGER MENU
  ══════════════════════════════════════════════════ */
  function initBurger() {
    const burger = $("#burger");
    const nav    = $("#mainNav");
    if (!burger || !nav) return;
    burger.addEventListener("click", () => {
      burger.classList.toggle("open");
      nav.classList.toggle("open");
    });
    $$(".nav-link").forEach(l => l.addEventListener("click", () => {
      burger.classList.remove("open");
      nav.classList.remove("open");
    }));
  }

  /* ══════════════════════════════════════════════════
     12. PAGE TRANSITIONS (GSAP overlay)
  ══════════════════════════════════════════════════ */
  function initPageTransitions() {
    const overlay = $("#page-transition");
    if (!overlay || typeof gsap === "undefined") return;

    // Animate page IN (slide overlay away)
    gsap.set(overlay, { scaleY: 1, transformOrigin: "top" });
    gsap.to(overlay, { scaleY: 0, duration: 0.65, ease: "power3.out", delay: 0.05 });

    // On link click, animate OUT
    $$("a[href]").forEach(a => {
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http") ||
          href.startsWith("mailto") || href.startsWith("tel") || href.endsWith(".pdf")) return;
      a.addEventListener("click", e => {
        e.preventDefault();
        gsap.to(overlay, {
          scaleY: 1, transformOrigin: "bottom", duration: 0.5, ease: "power3.in",
          onComplete: () => { window.location.href = href; }
        });
      });
    });
  }

  /* ══════════════════════════════════════════════════
     13. PROJECT FILTER
  ══════════════════════════════════════════════════ */
  function initFilter() {
    const btns  = $$(".filter-btn");
    const cards = $$(".pcard");
    if (!btns.length) return;

    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        btns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.dataset.f;
        cards.forEach(c => {
          const show = f === "all" || (c.dataset.cat || "").includes(f);
          if (typeof gsap !== "undefined") {
            gsap.to(c, { opacity: show ? 1 : 0.15, scale: show ? 1 : 0.95, duration: 0.35, ease: "power2.out" });
          } else {
            c.style.opacity = show ? "1" : "0.15";
          }
          c.style.pointerEvents = show ? "auto" : "none";
        });
      });
    });
  }

  /* ══════════════════════════════════════════════════
     14. CONTACT FORM
  ══════════════════════════════════════════════════ */
  function initContactForm() {
    const form      = $("#contactForm");
    const nameEl    = $("#nameInput");
    const emailEl   = $("#emailInput");
    const msgEl     = $("#msgInput");
    const nameErr   = $("#nameError");
    const emailErr  = $("#emailError");
    const msgErr    = $("#msgError");
    const submitBtn = $("#submitBtn");
    if (!form) return;

    const validateEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const setError = (inp, err, show) => {
      if (inp) inp.classList.toggle("error", show);
      if (err) err.classList.toggle("show", show);
    };

    if (nameEl)  nameEl.addEventListener("input",  () => { if (nameEl.value.length  > 0) setError(nameEl,  nameErr,  nameEl.value.trim().length  < 2); });
    if (emailEl) emailEl.addEventListener("input", () => { if (emailEl.value.length > 0) setError(emailEl, emailErr, !validateEmail(emailEl.value.trim())); });
    if (msgEl)   msgEl.addEventListener("input",   () => { if (msgEl.value.length   > 0) setError(msgEl,   msgErr,   msgEl.value.trim().length   < 10); });

    form.addEventListener("submit", e => {
      e.preventDefault();
      const name  = nameEl  ? nameEl.value.trim()  : "";
      const email = emailEl ? emailEl.value.trim()  : "";
      const msg   = msgEl   ? msgEl.value.trim()    : "";

      let valid = true;
      if (name.length  < 2)         { setError(nameEl,  nameErr,  true); valid = false; }
      if (!validateEmail(email))    { setError(emailEl, emailErr, true); valid = false; }
      if (msg.length   < 10)       { setError(msgEl,   msgErr,   true); valid = false; }
      if (!valid) return;

      const btnText = submitBtn ? submitBtn.querySelector(".btn-text") : null;
      const origText = btnText ? btnText.textContent : "";
      if (btnText) btnText.textContent = "\uD83Ede4 Writing in the Note...";
      if (submitBtn) submitBtn.disabled = true;

      window.location.href = `mailto:joycesondanielraj@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + msg)}`;

      setTimeout(() => {
        if (btnText) btnText.textContent = "\u2726 Written in the Note";
        setTimeout(() => {
          if (btnText) btnText.textContent = origText;
          if (submitBtn) submitBtn.disabled = false;
          form.reset();
        }, 3500);
      }, 800);
    });
  }

  /* ══════════════════════════════════════════════════
     MAIN INIT
  ══════════════════════════════════════════════════ */
  async function init() {
    // Three.js background starts immediately (visible behind loader)
    initBackgroundThree();

    // Page transition entrance
    initPageTransitions();

    // Wait for loader to finish (max 4s failsafe)
    await initLoader();

    // Page-specific 3D scenes
    if (PAGE === "home")   initBookScene();
    if (PAGE === "about")  initAboutScene();
    if (PAGE === "skills") initChessScene();

    // UI setup
    initGSAP();
    initTyped();
    initCursor();
    initHeader();
    initScrollProgress();
    initBurger();
    initFilter();
    initContactForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
