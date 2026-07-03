/**
 * ╔══════════════════════════════════════════════════════╗
 * ║   JOYCESON PORTFOLIO — script.js                    ║
 * ║   DEATH NOTE THEME                                  ║
 * ║   Stack: Three.js · GSAP · ScrollTrigger · Lenis    ║
 * ╚══════════════════════════════════════════════════════╝
 */
(function () {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const PAGE = document.body.dataset.page || "home";
  const isMobile = window.matchMedia("(hover:none)").matches;

  /* ══════════════════════════════════════════════════
     1. LOADER
  ══════════════════════════════════════════════════ */
  function initLoader() {
    return new Promise((resolve) => {
      const bar  = $("#loaderBar");
      const text = $("#loaderText");
      const msgs = {
        home:     ["Opening the notebook...", "Writing your name...", "Cause of death:", "Heart attack."],
        about:    ["Entering Shinigami Realm...", "Locating the suspect...", "Profile confirmed.", "Proceed."],
        skills:   ["Analyzing the suspect...", "Cross-referencing data...", "Intelligence: SUPERIOR.", "Proceed."],
        projects: ["Retrieving case files...", "Decrypting evidence...", "Files unlocked.", "Proceed."],
        contact:  ["Preparing the note...", "Feather pen ready...", "Write carefully.", "…or else."],
      };
      const pageM = msgs[PAGE] || msgs.home;
      let progress = 0;

      const step = () => {
        progress += Math.random() * 16 + 5;
        if (progress >= 100) progress = 100;
        if (bar) bar.style.width = progress + "%";
        if (text) text.textContent = pageM[Math.min(Math.floor(progress / 25), pageM.length - 1)];
        if (progress < 100) {
          setTimeout(step, 90 + Math.random() * 70);
        } else {
          setTimeout(() => {
            gsap.to("#loader", {
              opacity: 0, duration: 0.9, ease: "power2.inOut",
              onComplete: () => {
                const loader = $("#loader");
                if (loader) loader.classList.add("hidden");
                resolve();
              }
            });
          }, 400);
        }
      };
      step();
    });
  }

  /* ══════════════════════════════════════════════════
     2. THREE.JS — SHARED BACKGROUND (Falling Particles)
     Rose petals + feathers drifting from top
  ══════════════════════════════════════════════════ */
  function initBackgroundThree() {
    const canvas = $("#threeCanvas");
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 300);
    camera.position.z = 60;

    /* ── Particle Geometry (rose petals / feathers) ── */
    const PCOUNT = isMobile ? 600 : 1400;
    const positions = new Float32Array(PCOUNT * 3);
    const colors    = new Float32Array(PCOUNT * 3);
    const speeds    = new Float32Array(PCOUNT);
    const offsets   = new Float32Array(PCOUNT);

    for (let i = 0; i < PCOUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 140;
      positions[i * 3 + 1] = Math.random() * 140 - 10;   // start above view
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

      speeds[i]  = 0.03 + Math.random() * 0.06;
      offsets[i] = Math.random() * Math.PI * 2;

      // Gold petals or dark red feathers
      if (Math.random() > 0.35) {
        const t = 0.5 + Math.random() * 0.5;
        colors[i * 3]     = 0.78 * t;
        colors[i * 3 + 1] = 0.66 * t;
        colors[i * 3 + 2] = 0.30 * t;  // Gold
      } else {
        colors[i * 3]     = 0.55;
        colors[i * 3 + 1] = 0.0;
        colors[i * 3 + 2] = 0.0;  // Dark Red
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    /* ── Mouse interaction ── */
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

    const animate = () => {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Drift particles downward with gentle sway
      for (let i = 0; i < PCOUNT; i++) {
        const i3 = i * 3;
        posArr[i3 + 1] -= speeds[i];
        posArr[i3]     += Math.sin(t * 0.4 + offsets[i]) * 0.015;

        // Reset when off screen
        if (posArr[i3 + 1] < -80) {
          posArr[i3 + 1] = 80;
          posArr[i3]     = (Math.random() - 0.5) * 140;
        }
      }
      geo.attributes.position.needsUpdate = true;

      // Mouse camera parallax
      if (!isMobile) {
        camera.position.x += (mouse.x * 6 - camera.position.x) * 0.03;
        camera.position.y += (mouse.y * 4 - camera.position.y) * 0.03;
      }

      mat.opacity = 0.35 + Math.sin(t * 0.5) * 0.07;
      renderer.render(scene, camera);
    };
    animate();
  }

  /* ══════════════════════════════════════════════════
     3. THREE.JS — FLOATING DEATH NOTE BOOK (home)
  ══════════════════════════════════════════════════ */
  function initBookScene() {
    const canvas = $("#bookCanvas");
    if (!canvas) return;

    const W = canvas.clientWidth  || 460;
    const H = canvas.clientHeight || 520;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.setSize(W, H);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
    camera.position.set(0, 0, 8);

    /* ── Lights ── */
    const ambient = new THREE.AmbientLight(0x1a0a00, 0.8);
    scene.add(ambient);
    const pointGold = new THREE.PointLight(0xc9a84c, 3, 20);
    pointGold.position.set(3, 4, 5);
    scene.add(pointGold);
    const pointRed = new THREE.PointLight(0x8b0000, 2, 20);
    pointRed.position.set(-3, -2, 4);
    scene.add(pointRed);

    /* ── Book cover ── */
    const bookGroup = new THREE.Group();

    // Cover (front)
    const coverGeo = new THREE.BoxGeometry(2.6, 3.6, 0.22);
    const coverMat = new THREE.MeshPhongMaterial({
      color: 0x0d0a0d,
      shininess: 40,
      specular: 0xc9a84c,
    });
    const cover = new THREE.Mesh(coverGeo, coverMat);
    bookGroup.add(cover);

    // Pages block
    const pagesGeo = new THREE.BoxGeometry(2.35, 3.45, 0.18);
    const pagesMat = new THREE.MeshPhongMaterial({ color: 0xf5e6c8, shininess: 5 });
    const pages    = new THREE.Mesh(pagesGeo, pagesMat);
    pages.position.set(0.08, 0, 0);
    bookGroup.add(pages);

    // Spine
    const spineGeo = new THREE.BoxGeometry(0.22, 3.6, 0.22);
    const spineMat = new THREE.MeshPhongMaterial({ color: 0x080608, shininess: 60, specular: 0xc9a84c });
    const spine = new THREE.Mesh(spineGeo, spineMat);
    spine.position.set(-1.41, 0, 0);
    bookGroup.add(spine);

    // Gold title stripe
    const stripeGeo = new THREE.BoxGeometry(2.6, 0.04, 0.23);
    const stripeMat = new THREE.MeshPhongMaterial({ color: 0xc9a84c, shininess: 100, specular: 0xffd700, emissive: 0x3a2800 });
    const stripe1 = new THREE.Mesh(stripeGeo, stripeMat);
    stripe1.position.set(0, 1.1, 0);
    const stripe2 = stripe1.clone();
    stripe2.position.set(0, 1.4, 0);
    bookGroup.add(stripe1, stripe2);

    // Death Note embossed rectangle (simulated)
    const embossGeo = new THREE.BoxGeometry(1.8, 0.3, 0.23);
    const embossMat = new THREE.MeshPhongMaterial({ color: 0xc9a84c, shininess: 80, emissive: 0x2a1500 });
    const emboss = new THREE.Mesh(embossGeo, embossMat);
    emboss.position.set(0, 1.25, 0);
    bookGroup.add(emboss);

    // Small "death note" text plane (bottom area, smaller rect)
    const dnGeo = new THREE.BoxGeometry(1.4, 0.12, 0.23);
    const dnMat = new THREE.MeshPhongMaterial({ color: 0xc9a84c, shininess: 40, emissive: 0x1a0d00 });
    const dn = new THREE.Mesh(dnGeo, dnMat);
    dn.position.set(0, 0.8, 0);
    bookGroup.add(dn);

    // Ryuk eye symbol (circle + lines)
    const eyeGeo = new THREE.TorusGeometry(0.25, 0.015, 8, 32);
    const eyeMat = new THREE.MeshPhongMaterial({ color: 0xc9a84c, emissive: 0x3a2200, shininess: 60 });
    const eye = new THREE.Mesh(eyeGeo, eyeMat);
    eye.position.set(0, -0.2, 0.115);
    bookGroup.add(eye);

    const pupilGeo = new THREE.SphereGeometry(0.07, 8, 8);
    const pupilMat = new THREE.MeshPhongMaterial({ color: 0x8b0000, emissive: 0x3a0000 });
    const pupil = new THREE.Mesh(pupilGeo, pupilMat);
    pupil.position.set(0, -0.2, 0.13);
    bookGroup.add(pupil);

    bookGroup.rotation.y = 0.4;
    bookGroup.rotation.x = -0.05;
    scene.add(bookGroup);

    /* ── Mouse parallax ── */
    const mouse = { x: 0, y: 0 };
    if (!isMobile) {
      window.addEventListener("mousemove", (e) => {
        mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
        mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
      });
    }

    window.addEventListener("resize", () => {
      const nw = canvas.clientWidth;
      const nh = canvas.clientHeight;
      if (nw && nh) {
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      }
    });

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Floating bob
      bookGroup.position.y = Math.sin(t * 0.7) * 0.12;

      // Gentle rotation + mouse influence
      bookGroup.rotation.y = 0.4 + mouse.x * 0.18 + Math.sin(t * 0.3) * 0.04;
      bookGroup.rotation.x = -0.05 + mouse.y * 0.1;

      // Gold light pulsing
      pointGold.intensity = 2.5 + Math.sin(t * 1.2) * 0.5;

      renderer.render(scene, camera);
    };
    animate();
  }

  /* ══════════════════════════════════════════════════
     4. THREE.JS — SHINIGAMI EYE SIGIL (about page)
  ══════════════════════════════════════════════════ */
  function initAboutScene() {
    const canvas = $("#aboutCanvas");
    if (!canvas) return;

    const W = 300, H = 300;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 5;

    const ambient = new THREE.AmbientLight(0x1a0505, 1);
    scene.add(ambient);
    const light = new THREE.PointLight(0x8b0000, 4, 15);
    light.position.set(2, 2, 3);
    scene.add(light);
    const lightGold = new THREE.PointLight(0xc9a84c, 2, 12);
    lightGold.position.set(-2, -1, 3);
    scene.add(lightGold);

    const group = new THREE.Group();

    // Outer Eye oval frame (torus stretched)
    const eyeFrameGeo = new THREE.TorusGeometry(1.5, 0.04, 8, 64);
    const eyeFrameMat = new THREE.MeshPhongMaterial({ color: 0xc9a84c, shininess: 80, emissive: 0x2a1500 });
    const eyeFrame = new THREE.Mesh(eyeFrameGeo, eyeFrameMat);
    eyeFrame.scale.set(1, 0.5, 1); // Squish into eye oval
    group.add(eyeFrame);

    // Pupil (dark red elongated)
    const pupilGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const pupilMat = new THREE.MeshPhongMaterial({ color: 0x6b0000, shininess: 100, emissive: 0x3a0000, specular: 0xff2020 });
    const pupil = new THREE.Mesh(pupilGeo, pupilMat);
    pupil.scale.set(0.5, 1.4, 0.5);
    group.add(pupil);

    // Iris glow
    const irisGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const irisMat = new THREE.MeshPhongMaterial({ color: 0xff2020, emissive: 0x8b0000 });
    const iris = new THREE.Mesh(irisGeo, irisMat);
    iris.scale.set(0.5, 1.4, 0.5);
    group.add(iris);

    // Rotating rings
    function makeRing(r, c, opacity) {
      const geo = new THREE.TorusGeometry(r, 0.02, 6, 64);
      const mat = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity });
      return new THREE.Mesh(geo, mat);
    }
    const r1 = makeRing(2.0, 0x8b0000, 0.5);
    const r2 = makeRing(1.7, 0xc9a84c, 0.35);
    const r3 = makeRing(1.3, 0x8b0000, 0.25);
    r1.rotation.x = Math.PI / 3;
    r2.rotation.y = Math.PI / 4;
    r3.rotation.x = Math.PI / 2;
    group.add(r1, r2, r3);

    // Radiating lines from eye
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const lineGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.8, 4);
      const lineMat = new THREE.MeshBasicMaterial({ color: 0xc9a84c, transparent: true, opacity: 0.3 });
      const line = new THREE.Mesh(lineGeo, lineMat);
      line.position.set(Math.cos(angle) * 1.9, Math.sin(angle) * 0.95, 0);
      line.rotation.z = -angle - Math.PI / 2;
      group.add(line);
    }

    scene.add(group);

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      group.rotation.z = t * 0.12;
      r1.rotation.z = t * 0.2;
      r2.rotation.z = -t * 0.15;
      r3.rotation.z = t * 0.25;
      pupil.scale.set(0.5, 1.2 + Math.sin(t * 1.8) * 0.3, 0.5);
      iris.scale.set(0.5, 1.2 + Math.sin(t * 1.8) * 0.3, 0.5);
      light.intensity = 3 + Math.sin(t * 2) * 1.5;
      renderer.render(scene, camera);
    };
    animate();
  }

  /* ══════════════════════════════════════════════════
     5. THREE.JS — CHESS KINGS (skills page)
     Light (white) vs L (dark)
  ══════════════════════════════════════════════════ */
  function initChessScene() {
    const canvas = $("#chessCanvas");
    if (!canvas) return;

    const W = canvas.clientWidth  || 440;
    const H = canvas.clientHeight || 440;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.setSize(W, H);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 3, 8);
    camera.lookAt(0, 0, 0);

    const ambient = new THREE.AmbientLight(0x0d0810, 1);
    scene.add(ambient);
    const goldLight = new THREE.PointLight(0xc9a84c, 4, 20);
    goldLight.position.set(4, 6, 4);
    scene.add(goldLight);
    const redLight = new THREE.PointLight(0x8b0000, 3, 15);
    redLight.position.set(-4, 2, 2);
    scene.add(redLight);

    /* ── Simple Chess King (stacked cylinders) ── */
    function makeKing(color, emissive) {
      const g = new THREE.Group();
      const mat = new THREE.MeshPhongMaterial({ color, shininess: 80, emissive, specular: 0xffffff });

      const base  = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 0.2, 16), mat);
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 1.0, 16), mat);
      const neck  = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.22, 0.2, 16), mat);
      const head  = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 16), mat);
      const cross1= new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.36, 0.08), mat);
      const cross2= new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.08, 0.08), mat);

      shaft.position.y  = 0.6;
      neck.position.y   = 1.2;
      head.position.y   = 1.5;
      cross1.position.y = 1.8;
      cross2.position.y = 1.94;

      g.add(base, shaft, neck, head, cross1, cross2);
      return g;
    }

    const lightKing = makeKing(0xfaf0e0, 0x3a2800);  // Light Yagami — ivory
    const darkKing  = makeKing(0x1a1018, 0x0a0005);   // L — near black

    lightKing.position.set(-1.8, 0, 0);
    darkKing.position.set( 1.8, 0, 0);
    scene.add(lightKing, darkKing);

    /* ── Chess Board ── */
    const boardGeo = new THREE.BoxGeometry(6, 0.1, 6);
    const boardMat = new THREE.MeshPhongMaterial({ color: 0x0d0810, shininess: 20 });
    const board = new THREE.Mesh(boardGeo, boardMat);
    board.position.y = -0.1;
    board.receiveShadow = true;
    scene.add(board);

    // Board squares
    for (let x = -3; x < 3; x++) {
      for (let z = -3; z < 3; z++) {
        const isGold = (x + z) % 2 === 0;
        const sqGeo = new THREE.BoxGeometry(0.98, 0.05, 0.98);
        const sqMat = new THREE.MeshPhongMaterial({
          color: isGold ? 0x1e1520 : 0x0a080c,
          shininess: isGold ? 30 : 5,
        });
        const sq = new THREE.Mesh(sqGeo, sqMat);
        sq.position.set(x + 0.5, 0, z + 0.5);
        scene.add(sq);
      }
    }

    /* ── Dividing Light ── */
    const divGeo = new THREE.BoxGeometry(0.02, 2.2, 6);
    const divMat = new THREE.MeshBasicMaterial({ color: 0xc9a84c, transparent: true, opacity: 0.3 });
    const divLine = new THREE.Mesh(divGeo, divMat);
    scene.add(divLine);

    const mouse = { x: 0, y: 0 };
    if (!isMobile) {
      window.addEventListener("mousemove", (e) => {
        mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
        mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
      });
    }

    window.addEventListener("resize", () => {
      const nw = canvas.clientWidth;
      const nh = canvas.clientHeight;
      if (nw && nh) { camera.aspect = nw / nh; camera.updateProjectionMatrix(); renderer.setSize(nw, nh); }
    });

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      lightKing.position.y = Math.sin(t * 0.8) * 0.12;
      darkKing.position.y  = Math.cos(t * 0.8) * 0.12;
      lightKing.rotation.y = t * 0.25 + mouse.x * 0.4;
      darkKing.rotation.y  = -t * 0.3 + mouse.x * 0.4;

      camera.position.x = mouse.x * 2;
      camera.position.y = 3 + mouse.y * 1;
      camera.lookAt(0, 0.5, 0);

      goldLight.intensity = 3.5 + Math.sin(t * 1.5) * 0.8;
      renderer.render(scene, camera);
    };
    animate();
  }

  /* ══════════════════════════════════════════════════
     6. LENIS SMOOTH SCROLL
  ══════════════════════════════════════════════════ */
  function initLenis() {
    if (!window.Lenis) return null;

    const lenis = new Lenis({
      wrapper: $("#smooth-wrapper"),
      content: $("#smooth-content"),
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      if (window.ScrollTrigger) ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const scrollBar = $("#scroll-bar");
    lenis.on("scroll", ({ scroll, limit }) => {
      if (scrollBar) scrollBar.style.width = ((scroll / limit) * 100) + "%";
    });

    return lenis;
  }

  /* ══════════════════════════════════════════════════
     7. GSAP SCROLL ANIMATIONS
  ══════════════════════════════════════════════════ */
  function initGSAP(lenis) {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    // Connect Lenis to ScrollTrigger
    if (lenis) {
      ScrollTrigger.scrollerProxy("#smooth-wrapper", {
        scrollTop(v) {
          if (arguments.length) lenis.scrollTo(v);
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return { top:0, left:0, width:window.innerWidth, height:window.innerHeight };
        },
      });
    }

    /* ── Hero entrance ── */
    if (PAGE === "home") {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(".hero-eyebrow", { opacity:0, y:30, duration:0.7, ease:"power3.out" })
        .from(".hero-title",   { opacity:0, x:-50, duration:0.9, ease:"power3.out", skewX:-3 }, "-=0.4")
        .from(".hero-role",    { opacity:0, x:-30, duration:0.6, ease:"power3.out" }, "-=0.4")
        .from(".hero-desc",    { opacity:0, y:20, duration:0.6, ease:"power2.out" }, "-=0.3")
        .from(".hero-rule",    { scaleX:0, duration:0.8, ease:"power3.out" }, "-=0.3")
        .from(".hero-stats",   { opacity:0, y:20, duration:0.5, ease:"power2.out" }, "-=0.2")
        .from(".hero-btns",    { opacity:0, y:20, duration:0.5, ease:"power2.out" }, "-=0.2")
        .from(".hero-right",   { opacity:0, scale:0.8, duration:1.2, ease:"elastic.out(1,0.6)" }, 0.4)
        .from(".scroll-hint",  { opacity:0, y:10, duration:0.4 }, "-=0.3");

      // Stat counter
      $$(".stat-num[data-count]").forEach(el => {
        const target = parseInt(el.dataset.count);
        gsap.fromTo(el, { textContent: 0 }, {
          textContent: target, duration: 2.5, ease: "power2.out", delay: 1.6,
          snap: { textContent: 1 },
          onUpdate() { el.textContent = Math.round(this.targets()[0].textContent); }
        });
      });
    }

    /* ── Universal scroll reveals ── */
    $$(".reveal").forEach(el => {
      gsap.from(el, {
        opacity: 0, y: 50, duration: 0.9, ease: "power3.out",
        scrollTrigger: {
          trigger: el, scroller: "#smooth-wrapper",
          start: "top 85%", toggleActions: "play none none none",
        }
      });
    });
    $$(".reveal-left").forEach(el => {
      gsap.from(el, {
        opacity: 0, x: -60, duration: 0.9, ease: "power3.out",
        scrollTrigger: {
          trigger: el, scroller: "#smooth-wrapper",
          start: "top 85%", toggleActions: "play none none none",
        }
      });
    });
    $$(".reveal-right").forEach(el => {
      gsap.from(el, {
        opacity: 0, x: 60, duration: 0.9, ease: "power3.out",
        scrollTrigger: {
          trigger: el, scroller: "#smooth-wrapper",
          start: "top 85%", toggleActions: "play none none none",
        }
      });
    });
    $$(".reveal-scale").forEach(el => {
      gsap.from(el, {
        opacity: 0, scale: 0.85, duration: 1.0, ease: "power3.out",
        scrollTrigger: {
          trigger: el, scroller: "#smooth-wrapper",
          start: "top 85%", toggleActions: "play none none none",
        }
      });
    });

    /* ── Skill fills ── */
    $$(".skill-fill").forEach(fill => {
      gsap.to(fill, {
        width: fill.dataset.w + "%",
        duration: 1.4, ease: "power2.out",
        scrollTrigger: {
          trigger: fill, scroller: "#smooth-wrapper",
          start: "top 88%", toggleActions: "play none none none",
        }
      });
    });

    /* ── Skill cards ── */
    $$(".skill-card").forEach((c, i) => {
      gsap.from(c, {
        opacity: 0, x: -40, duration: 0.7, ease: "power3.out", delay: i * 0.1,
        scrollTrigger: {
          trigger: c, scroller: "#smooth-wrapper",
          start: "top 88%", toggleActions: "play none none none",
        }
      });
    });

    /* ── Project cards ── */
    $$(".pcard").forEach((c, i) => {
      gsap.from(c, {
        opacity: 0, y: 60, duration: 0.8, ease: "power3.out", delay: i * 0.12,
        scrollTrigger: {
          trigger: c, scroller: "#smooth-wrapper",
          start: "top 88%", toggleActions: "play none none none",
        }
      });
    });

    /* ── Timeline ── */
    $$(".timeline-item").forEach((item, i) => {
      const isRight = item.classList.contains("is-right");
      gsap.from(item, {
        opacity: 0, x: isRight ? 50 : -50, duration: 0.8, ease: "power3.out", delay: i * 0.15,
        scrollTrigger: {
          trigger: item, scroller: "#smooth-wrapper",
          start: "top 85%", toggleActions: "play none none none",
        }
      });
    });
  }

  /* ══════════════════════════════════════════════════
     8. TYPED TEXT
  ══════════════════════════════════════════════════ */
  function initTyped() {
    const el = $("#typedText");
    if (!el) return;
    const phrases = [
      "Frontend Developer",
      "UI Architect",
      "React Learner",
      "God of the New Web",
    ];
    let pi = 0, ci = 0, deleting = false;

    function type() {
      const word = phrases[pi];
      el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
      const pause = deleting ? (ci < 0 ? 500 : 45) : ci > word.length ? 2200 : 80;
      if (!deleting && ci > word.length) deleting = true;
      if (deleting && ci < 0) { deleting = false; pi = (pi + 1) % phrases.length; ci = 0; }
      setTimeout(type, pause);
    }
    setTimeout(type, 1400);
  }

  /* ══════════════════════════════════════════════════
     9. CUSTOM CURSOR — Golden feather
  ══════════════════════════════════════════════════ */
  function initCursor() {
    if (isMobile) return;
    const outer = $("#cursor-outer");
    const inner = $("#cursor-inner");
    let mx = -100, my = -100, ox = -100, oy = -100;

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
    document.addEventListener("mouseleave", () => { inner.style.opacity="0"; outer.style.opacity="0"; });
    document.addEventListener("mouseenter", () => { inner.style.opacity="1"; outer.style.opacity="1"; });
  }

  /* ══════════════════════════════════════════════════
     10. HEADER SCROLL + ACTIVE NAV
  ══════════════════════════════════════════════════ */
  function initHeader(lenis) {
    const header = $("header");
    const onScroll = (scroll) => {
      if (header) header.classList.toggle("scrolled", scroll > 30);
    };
    if (lenis) {
      lenis.on("scroll", ({ scroll }) => onScroll(scroll));
    } else {
      window.addEventListener("scroll", () => onScroll(window.scrollY));
    }
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
     12. PAGE TRANSITIONS
  ══════════════════════════════════════════════════ */
  function initPageTransitions() {
    const overlay = $("#page-transition");
    if (!overlay || !window.gsap) return;

    $$("a[href]").forEach(a => {
      const href = a.getAttribute("href");
      // Internal page links only
      if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto")) return;
      a.addEventListener("click", e => {
        e.preventDefault();
        gsap.to(overlay, {
          scaleY: 1, transformOrigin: "bottom", duration: 0.5, ease: "power3.in",
          onComplete: () => { window.location.href = href; }
        });
      });
    });

    // Entrance animation — slide up overlay
    gsap.set(overlay, { scaleY: 1, transformOrigin: "top" });
    gsap.to(overlay, { scaleY: 0, duration: 0.7, ease: "power3.out", delay: 0.1 });
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
          gsap.to(c, {
            opacity: show ? 1 : 0.15, scale: show ? 1 : 0.95,
            duration: 0.35, ease: "power2.out",
          });
          c.style.pointerEvents = show ? "auto" : "none";
        });
      });
    });
  }

  /* ══════════════════════════════════════════════════
     14. CONTACT FORM
  ══════════════════════════════════════════════════ */
  function initContactForm() {
    const form    = $("#contactForm");
    const nameEl  = $("#nameInput");
    const emailEl = $("#emailInput");
    const msgEl   = $("#msgInput");
    const nameErr = $("#nameError");
    const emailErr= $("#emailError");
    const msgErr  = $("#msgError");
    const submitBtn = $("#submitBtn");
    if (!form) return;

    const validateEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const setError = (input, errEl, show) => {
      input.classList.toggle("error", show);
      errEl.classList.toggle("show", show);
    };

    nameEl.addEventListener("input",  () => { if (nameEl.value.trim().length  > 0) setError(nameEl,  nameErr,  nameEl.value.trim().length  < 2); });
    emailEl.addEventListener("input", () => { if (emailEl.value.trim().length > 0) setError(emailEl, emailErr, !validateEmail(emailEl.value.trim())); });
    msgEl.addEventListener("input",   () => { if (msgEl.value.trim().length   > 0) setError(msgEl,   msgErr,   msgEl.value.trim().length   < 10); });

    form.addEventListener("submit", e => {
      e.preventDefault();
      const name  = nameEl.value.trim();
      const email = emailEl.value.trim();
      const msg   = msgEl.value.trim();
      let valid = true;
      if (name.length  < 2)          { setError(nameEl,  nameErr,  true); valid = false; }
      if (!validateEmail(email))      { setError(emailEl, emailErr, true); valid = false; }
      if (msg.length   < 10)         { setError(msgEl,   msgErr,   true); valid = false; }
      if (!valid) return;

      const btnText = submitBtn.querySelector(".btn-text");
      const orig = btnText.textContent;
      btnText.textContent = "🪶 Writing...";
      submitBtn.disabled = true;

      const mailtoLink = `mailto:joycesondanielraj@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + msg)}`;
      window.location.href = mailtoLink;

      setTimeout(() => {
        btnText.textContent = "✦ Sent to the Shinigami Realm";
        if (window.gsap) gsap.to(submitBtn, { backgroundColor: "#1a3300", duration: 0.4 });
        setTimeout(() => {
          btnText.textContent = orig;
          if (window.gsap) gsap.to(submitBtn, { backgroundColor: "", duration: 0.4 });
          submitBtn.disabled = false;
          form.reset();
        }, 3500);
      }, 600);
    });
  }

  /* ══════════════════════════════════════════════════
     MAIN INIT
  ══════════════════════════════════════════════════ */
  async function init() {
    // Start background immediately (visible behind loader)
    initBackgroundThree();
    initPageTransitions();

    await initLoader();

    // Page-specific 3D scenes
    if (PAGE === "home")     initBookScene();
    if (PAGE === "about")    initAboutScene();
    if (PAGE === "skills")   initChessScene();

    const lenis = initLenis();
    initGSAP(lenis);
    initTyped();
    initCursor();
    initHeader(lenis);
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
