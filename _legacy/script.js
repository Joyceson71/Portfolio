/**
 * ╔══════════════════════════════════════════════════════╗
 * ║   JOYCESON PORTFOLIO — script.js                    ║
 * ║   JUJUTSU KAISEN THEME (CURSED ENERGY)              ║
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
     1. DOMAIN EXPANSION LOADER
  ══════════════════════════════════════════════════ */
  function initLoader() {
    return new Promise((resolve) => {
      const loader = $("#loader");

      // We have a glitch effect for 2-3 seconds, then hide
      const failsafe = setTimeout(hideLoader, 3000);

      function hideLoader() {
        clearTimeout(failsafe);
        if (!loader) { resolve(); return; }
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        loader.style.pointerEvents = "none";
        setTimeout(resolve, 600); // Wait for transition
      }
    });
  }

  /* ══════════════════════════════════════════════════
     2. THREE.JS — CURSED ENERGY BACKGROUND
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

    const PCOUNT = isMobile ? 600 : 1500;
    const positions = new Float32Array(PCOUNT * 3);
    const colors    = new Float32Array(PCOUNT * 3);
    const speeds    = new Float32Array(PCOUNT);
    const swayOff   = new Float32Array(PCOUNT);

    for (let i = 0; i < PCOUNT; i++) {
      positions[i*3]     = (Math.random() - 0.5) * 160;
      positions[i*3 + 1] = (Math.random() - 0.5) * 160;
      positions[i*3 + 2] = (Math.random() - 0.5) * 100;
      speeds[i]  = 0.05 + Math.random() * 0.1; // Chaotic speed
      swayOff[i] = Math.random() * Math.PI * 2;

      const rand = Math.random();
      if (rand > 0.3) {
        // Cursed Purple
        colors[i*3] = 0.6; colors[i*3+1] = 0.0; colors[i*3+2] = 1.0;
      } else {
        // Pitch black / Dark Grey
        colors[i*3] = 0.1; colors[i*3+1] = 0.1; colors[i*3+2] = 0.1;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
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
        // Swirling erratic motion
        posArr[i*3 + 1] += speeds[i];
        posArr[i*3]     += Math.sin(t * 2 + swayOff[i]) * 0.05;
        posArr[i*3 + 2] += Math.cos(t * 1.5 + swayOff[i]) * 0.05;
        
        if (posArr[i*3 + 1] > 80) {
          posArr[i*3 + 1] = -80;
          posArr[i*3]     = (Math.random() - 0.5) * 160;
        }
      }
      geo.attributes.position.needsUpdate = true;

      if (!isMobile) {
        camera.position.x += (mouse.x * 5 - camera.position.x) * 0.05;
        camera.position.y += (mouse.y * 5 - camera.position.y) * 0.05;
      }

      mat.opacity = 0.3 + Math.sin(t * 3) * 0.2;
      renderer.render(scene, camera);
    })();
  }

  /* ══════════════════════════════════════════════════
     3. THREE.JS — PRISON REALM CUBE (HOME)
  ══════════════════════════════════════════════════ */
  function initPrisonRealm() {
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

    scene.add(new THREE.AmbientLight(0x111111, 2));
    const pLight = new THREE.PointLight(0x9d00ff, 4, 20);
    pLight.position.set(3, 4, 5); scene.add(pLight);
    const rLight = new THREE.PointLight(0xff0033, 2, 20);
    rLight.position.set(-3, -4, -3); scene.add(rLight);

    const boxGroup = new THREE.Group();

    // Base Cube
    const cubeGeo = new THREE.BoxGeometry(3, 3, 3);
    const cubeMat = new THREE.MeshPhongMaterial({
      color: 0x050505, shininess: 80, specular: 0x9d00ff
    });
    const cube = new THREE.Mesh(cubeGeo, cubeMat);
    boxGroup.add(cube);

    // Inner Glowing Core (Visible through gaps)
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 0);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xff0033, wireframe: true });
    const core = new THREE.Mesh(coreGeo, coreMat);
    boxGroup.add(core);

    // Floating outer fragments
    const fragments = new THREE.Group();
    for(let i=0; i<8; i++) {
      const fGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const fMat = new THREE.MeshPhongMaterial({ color: 0x111111, emissive: 0x220033, specular: 0xff0000 });
      const f = new THREE.Mesh(fGeo, fMat);
      f.position.set((Math.random()-0.5)*5, (Math.random()-0.5)*5, (Math.random()-0.5)*5);
      fragments.add(f);
    }
    boxGroup.add(fragments);

    scene.add(boxGroup);

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
      
      boxGroup.position.y = Math.sin(t * 2) * 0.3;
      cube.rotation.y = t * 0.5 + mouse.x * 0.5;
      cube.rotation.x = t * 0.3 + mouse.y * 0.5;
      
      core.rotation.z = -t;
      core.scale.setScalar(1 + Math.sin(t * 5) * 0.1); // Pulse
      
      fragments.rotation.y = -t * 0.2;
      fragments.children.forEach((f, idx) => {
        f.rotation.x += 0.02 + idx*0.01;
        f.rotation.y += 0.02;
      });
      
      renderer.render(scene, camera);
    })();
  }

  /* ══════════════════════════════════════════════════
     4. THREE.JS — HOLLOW PURPLE ORB (ABOUT)
  ══════════════════════════════════════════════════ */
  function initCursedOrb() {
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

    // Inner red orb (Reversal Red)
    const redGeo = new THREE.SphereGeometry(1, 32, 32);
    const redMat = new THREE.MeshBasicMaterial({ color: 0xff0033 });
    const redOrb = new THREE.Mesh(redGeo, redMat);

    // Outer blue/purple orb (Lapse Blue -> Hollow Purple)
    const purpGeo = new THREE.SphereGeometry(1.5, 32, 32);
    const purpMat = new THREE.MeshBasicMaterial({ color: 0x4400ff, transparent: true, opacity: 0.6, wireframe: true });
    const purpOrb = new THREE.Mesh(purpGeo, purpMat);

    // Chaotic rings
    const ringGeo = new THREE.TorusGeometry(2, 0.05, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x9d00ff });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.x = Math.PI / 2;

    group.add(redOrb, purpOrb, ring1, ring2);
    scene.add(group);

    const clock = new THREE.Clock();
    (function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      
      purpOrb.rotation.y = t * 2;
      purpOrb.rotation.x = t * 1.5;
      
      ring1.rotation.y = t * 3;
      ring1.rotation.x = Math.sin(t) * 0.5;
      ring2.rotation.z = -t * 3;
      
      // Merge simulation (pulsing scale)
      redOrb.scale.setScalar(1 + Math.sin(t * 8) * 0.1);
      purpOrb.scale.setScalar(1 + Math.cos(t * 6) * 0.05);
      
      renderer.render(scene, camera);
    })();
  }

  /* ══════════════════════════════════════════════════
     5. THREE.JS — DOMAIN STRUCTURE (SKILLS)
  ══════════════════════════════════════════════════ */
  function initDomainScene() {
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
    camera.position.set(0, -3, 10);
    camera.lookAt(0,0,0);

    const group = new THREE.Group();

    // Concentric glowing squares (Domain floor)
    for(let i=1; i<=5; i++) {
      const sGeo = new THREE.BoxGeometry(i*1.5, 0.05, i*1.5);
      const edges = new THREE.EdgesGeometry(sGeo);
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x9d00ff, transparent: true, opacity: 1 - (i*0.15) }));
      group.add(line);
    }
    
    // Floating Shrine / Eye at center
    const eyeGeo = new THREE.OctahedronGeometry(0.8, 0);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xff0033, wireframe: true });
    const eye = new THREE.Mesh(eyeGeo, eyeMat);
    eye.position.y = 2;
    group.add(eye);

    scene.add(group);

    const clock = new THREE.Clock();
    (function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      
      group.rotation.y = t * 0.2;
      eye.rotation.y = -t;
      eye.position.y = 2 + Math.sin(t * 3) * 0.3;
      
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
      const tl = gsap.timeline({ delay: 0.5 });
      tl.from(".hero-eyebrow", { opacity:0, y:20,  duration:0.6, ease:"power3.out" })
        .from(".hero-title",   { opacity:0, x:-50, duration:0.8, ease:"power3.out", skewX: -5 }, "-=0.3")
        .from(".hero-role",    { opacity:0, x:-20, duration:0.6, ease:"power3.out" }, "-=0.4")
        .from(".hero-desc",    { opacity:0, y:15,  duration:0.6, ease:"power2.out" }, "-=0.3")
        .from(".hero-btns",    { opacity:0, y:20,  duration:0.5, ease:"power2.out" }, "-=0.2")
        .from(".hero-right",   { opacity:0, scale:0.8, duration:1.2, ease:"elastic.out(1,0.6)" }, 0.2)
        .from(".scroll-hint",  { opacity:0, y:10,  duration:0.4 }, "-=0.3");
    } else {
      gsap.from(".section-head", { opacity:0, y:30, duration:0.7, ease:"power3.out", delay:0.3 });
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
     7. TYPED TEXT (Simple Version)
  ══════════════════════════════════════════════════ */
  function initTyped() {
    const el = $("#typedText");
    if (!el) return;
    const phrases = ["Frontend Developer", "UI/UX Engineer", "Web Architect"];
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
      gsap.set(overlay, { scaleX: 1, transformOrigin: "right" });
      gsap.to(overlay, { scaleX: 0, duration: 0.6, ease: "power3.out", delay: 0.1 });

      $$("a[href]").forEach(a => {
        const href = a.getAttribute("href");
        if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto")) return;
        a.addEventListener("click", e => {
          e.preventDefault();
          gsap.to(overlay, {
            scaleX: 1, transformOrigin: "left", duration: 0.4, ease: "power3.in",
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

    if (PAGE === "home")   initPrisonRealm();
    if (PAGE === "about")  initCursedOrb();
    if (PAGE === "skills") initDomainScene();

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
