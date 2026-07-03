/**
 * JOYCESON PORTFOLIO — script.js
 * Powered by: Three.js · GSAP · Lenis · ScrollTrigger · TextPlugin
 */
(function () {
  "use strict";

  /* ─────────────────────────────────────────────────
     HELPERS
  ───────────────────────────────────────────────── */
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  /* ─────────────────────────────────────────────────
     1. LOADER  (fake progress with promise)
  ───────────────────────────────────────────────── */
  function initLoader() {
    return new Promise((resolve) => {
      const bar  = $("#loaderBar");
      const text = $("#loaderText");
      const msgs = ["Initializing Domain...", "Summoning Cursed Energy...", "Expanding Barriers...", "Domain Open."];
      let progress = 0;

      const step = () => {
        progress += Math.random() * 18 + 4;
        if (progress >= 100) progress = 100;
        bar.style.width = progress + "%";
        const idx = Math.min(Math.floor(progress / 25), msgs.length - 1);
        text.textContent = msgs[idx];
        if (progress < 100) {
          setTimeout(step, 80 + Math.random() * 80);
        } else {
          setTimeout(() => {
            gsap.to("#loader", {
              opacity: 0, duration: 0.8, ease: "power2.inOut",
              onComplete: () => {
                $("#loader").classList.add("hidden");
                resolve();
              }
            });
          }, 400);
        }
      };
      step();
    });
  }

  /* ─────────────────────────────────────────────────
     2. THREE.JS — Cursed Energy Background
  ───────────────────────────────────────────────── */
  function initThreeBackground() {
    const canvas = $("#threeCanvas");
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.z = 80;

    /* ── Cursed Smoke Particles ── */
    const PCOUNT = window.innerWidth < 768 ? 3000 : 8000;
    const positions = new Float32Array(PCOUNT * 3);
    const colors    = new Float32Array(PCOUNT * 3);
    const sizes     = new Float32Array(PCOUNT);

    for (let i = 0; i < PCOUNT; i++) {
      const i3 = i * 3;
      positions[i3]     = (Math.random() - 0.5) * 200;
      positions[i3 + 1] = (Math.random() - 0.5) * 200;
      positions[i3 + 2] = (Math.random() - 0.5) * 200;
      sizes[i] = Math.random() * 2 + 0.5;

      // JJK Color: deep red OR hollow purple
      if (Math.random() > 0.5) {
        colors[i3] = 0.9;  colors[i3+1] = 0.0;  colors[i3+2] = 0.22; // Red
      } else {
        colors[i3] = 0.42; colors[i3+1] = 0.05; colors[i3+2] = 0.68; // Purple
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size",     new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    /* ── Glowing Wireframe Ring Seals ── */
    function makeRingSeal(radius, color, opacity = 0.4) {
      const geo = new THREE.TorusGeometry(radius, 0.15, 6, 64);
      const mat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity });
      return new THREE.Mesh(geo, mat);
    }

    const ring1 = makeRingSeal(30, 0xe60039, 0.25);
    const ring2 = makeRingSeal(22, 0x6a0dad, 0.2);
    const ring3 = makeRingSeal(15, 0xff3374, 0.15);
    ring1.rotation.x = Math.PI / 4;
    ring2.rotation.y = Math.PI / 3;
    ring3.rotation.z = Math.PI / 6;
    scene.add(ring1, ring2, ring3);

    /* ── Mouse interaction ── */
    const mouse3D = { x: 0, y: 0 };
    window.addEventListener("mousemove", (e) => {
      mouse3D.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse3D.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    });

    /* ── Resize ── */
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    /* ── Animate ── */
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Drift particles
      particles.rotation.y = t * 0.012;
      particles.rotation.x = t * 0.006;

      // Mouse parallax on camera
      camera.position.x += (mouse3D.x * 8 - camera.position.x) * 0.04;
      camera.position.y += (mouse3D.y * 6 - camera.position.y) * 0.04;

      // Rotate seals
      ring1.rotation.x = t * 0.2;
      ring1.rotation.z = t * 0.1;
      ring2.rotation.y = t * 0.15;
      ring2.rotation.x = t * 0.08;
      ring3.rotation.z = -t * 0.25;
      ring3.rotation.y = t * 0.12;

      // Pulsing opacity
      mat.opacity = 0.45 + Math.sin(t * 0.8) * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    return { renderer, scene, camera };
  }

  /* ─────────────────────────────────────────────────
     3. THREE.JS — About Section Sigil
  ───────────────────────────────────────────────── */
  function initAboutSigil() {
    const container = $("#about3d");
    if (!container) return;

    const w = container.clientWidth || 300;
    const h = container.clientHeight || 300;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 4;

    /* Outer Cursed Cube */
    const outerGeo = new THREE.BoxGeometry(2, 2, 2);
    const outerMat = new THREE.MeshBasicMaterial({ color: 0xe60039, wireframe: true, transparent: true, opacity: 0.5 });
    const outerCube = new THREE.Mesh(outerGeo, outerMat);
    scene.add(outerCube);

    /* Inner Purple Cube */
    const innerGeo = new THREE.BoxGeometry(1, 1, 1);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x6a0dad, wireframe: true, transparent: true, opacity: 0.7 });
    const innerCube = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerCube);

    /* Hollow Purple Ring */
    const torusGeo = new THREE.TorusGeometry(1.6, 0.04, 8, 48);
    const torusMat = new THREE.MeshBasicMaterial({ color: 0x6a0dad, transparent: true, opacity: 0.55 });
    const torus1 = new THREE.Mesh(torusGeo, torusMat);
    torus1.rotation.x = Math.PI / 2;
    scene.add(torus1);

    const torus2 = torus1.clone();
    torus2.rotation.set(Math.PI / 4, Math.PI / 4, 0);
    const torus2Mat = new THREE.MeshBasicMaterial({ color: 0xe60039, transparent: true, opacity: 0.4 });
    torus2.material = torus2Mat;
    scene.add(torus2);

    /* Glowing Core Sphere */
    const coreGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xff3374 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    /* Animate */
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      outerCube.rotation.x = t * 0.4;
      outerCube.rotation.y = t * 0.6;
      innerCube.rotation.x = -t * 0.6;
      innerCube.rotation.y = t * 0.5;
      innerCube.rotation.z = t * 0.3;
      torus1.rotation.z = t * 0.3;
      torus2.rotation.x = t * 0.25;
      torus2.rotation.y = t * 0.35;

      core.scale.setScalar(1 + Math.sin(t * 3) * 0.3);
      outerMat.opacity = 0.35 + Math.sin(t * 1.2) * 0.15;
      innerMat.opacity = 0.5 + Math.sin(t * 2) * 0.2;

      renderer.render(scene, camera);
    };
    animate();
  }

  /* ─────────────────────────────────────────────────
     4. LENIS SMOOTH SCROLL
  ───────────────────────────────────────────────── */
  function initLenis() {
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
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Scroll progress bar
    const scrollBar = $("#scroll-bar");
    lenis.on("scroll", ({ scroll, limit }) => {
      const pct = (scroll / limit) * 100;
      if (scrollBar) scrollBar.style.width = pct + "%";
    });

    return lenis;
  }

  /* ─────────────────────────────────────────────────
     5. GSAP ANIMATIONS
  ───────────────────────────────────────────────── */
  function initGSAP(lenis) {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Connect Lenis to ScrollTrigger
    ScrollTrigger.scrollerProxy("#smooth-wrapper", {
      scrollTop(value) {
        if (arguments.length) lenis.scrollTo(value);
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    /* ── HERO entrance ── */
    const heroTl = gsap.timeline({ delay: 0.2 });
    heroTl
      .from(".hero-badge",  { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" })
      .from(".ht-hello",    { opacity: 0, x: -30, duration: 0.7, ease: "power3.out" }, "-=0.3")
      .from(".ht-name",     { opacity: 0, x: -50, duration: 0.8, ease: "power3.out", skewX: -5 }, "-=0.4")
      .from(".ht-role",     { opacity: 0, x: -30, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .from(".hero-desc",   { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" }, "-=0.3")
      .from(".hero-stats",  { opacity: 0, y: 20, duration: 0.5, ease: "power2.out" }, "-=0.2")
      .from(".hero-btns",   { opacity: 0, y: 20, duration: 0.5, ease: "power2.out" }, "-=0.2")
      .from(".domain-orb",  { opacity: 0, scale: 0.7, duration: 1.2, ease: "elastic.out(1, 0.5)" }, 0.4)
      .from(".scroll-hint", { opacity: 0, y: 10, duration: 0.4, ease: "power2.out" }, "-=0.3");

    /* ── Stat counter animation ── */
    $$(".stat-num[data-count]").forEach((el) => {
      const target = parseInt(el.dataset.count);
      gsap.fromTo(el, { textContent: 0 }, {
        textContent: target,
        duration: 2.5,
        ease: "power2.out",
        delay: 1.5,
        snap: { textContent: 1 },
        onUpdate: function () { el.textContent = Math.round(this.targets()[0].textContent); }
      });
    });

    /* ── Section reveal helper ── */
    function revealSection(sectionId, elements) {
      elements.forEach(({ sel, from, delay = 0 }) => {
        $$(sel).forEach((el) => {
          if (!el.closest(sectionId)) return;
          gsap.from(el, {
            ...from,
            duration: 0.8,
            ease: "power3.out",
            delay,
            scrollTrigger: {
              trigger: el,
              scroller: "#smooth-wrapper",
              start: "top 85%",
              toggleActions: "play none none none",
            }
          });
        });
      });
    }

    /* About */
    revealSection("#about", [
      { sel: ".section-head", from: { opacity: 0, y: 40 } },
      { sel: ".about-vis",    from: { opacity: 0, x: -60 }, delay: 0.2 },
      { sel: ".about-content",from: { opacity: 0, x: 60 }, delay: 0.3 },
    ]);

    /* Skills */
    $$(".skill-card").forEach((card, i) => {
      gsap.from(card, {
        opacity: 0, x: -40, duration: 0.7,
        ease: "power3.out", delay: i * 0.1,
        scrollTrigger: {
          trigger: card, scroller: "#smooth-wrapper",
          start: "top 88%", toggleActions: "play none none none",
          onEnter: () => {
            const fill = card.querySelector(".skill-fill");
            if (fill) fill.style.width = fill.dataset.w + "%";
          }
        }
      });
    });

    /* Projects */
    $$(".pcard").forEach((card, i) => {
      gsap.from(card, {
        opacity: 0, y: 60, duration: 0.8,
        ease: "power3.out", delay: i * 0.15,
        scrollTrigger: {
          trigger: card, scroller: "#smooth-wrapper",
          start: "top 88%", toggleActions: "play none none none",
        }
      });
    });

    /* Contact */
    revealSection("#contact", [
      { sel: ".contact-info", from: { opacity: 0, x: -50 }, delay: 0.1 },
      { sel: ".contact-form", from: { opacity: 0, x: 50 }, delay: 0.2 },
    ]);
  }

  /* ─────────────────────────────────────────────────
     6. TYPED TEXT EFFECT
  ───────────────────────────────────────────────── */
  function initTyped() {
    const el = $("#typedText");
    if (!el) return;
    const phrases = ["Frontend Developer", "UI Enthusiast", "React Learner", "Problem Solver"];
    let pi = 0, ci = 0, deleting = false;

    function type() {
      const word = phrases[pi];
      el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);

      const pause = deleting ? (ci < 0 ? 500 : 50) : ci > word.length ? 2000 : 90;
      if (!deleting && ci > word.length) { deleting = true; }
      if (deleting && ci < 0)          { deleting = false; pi = (pi + 1) % phrases.length; ci = 0; }
      setTimeout(type, pause);
    }
    setTimeout(type, 1200);
  }

  /* ─────────────────────────────────────────────────
     7. CUSTOM CURSOR
  ───────────────────────────────────────────────── */
  function initCursor() {
    const isMobile = window.matchMedia("(hover: none)").matches;
    if (isMobile) return;

    const outer = $("#cursor-outer");
    const inner = $("#cursor-inner");
    let mx = -100, my = -100, ox = -100, oy = -100;

    document.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      inner.style.left = mx + "px";
      inner.style.top  = my + "px";
    });

    (function followOuter() {
      ox += (mx - ox) * 0.1;
      oy += (my - oy) * 0.1;
      outer.style.left = ox + "px";
      outer.style.top  = oy + "px";
      requestAnimationFrame(followOuter);
    })();

    $$("a, button, .skill-card, .pcard, .clink, .filter-btn").forEach((el) => {
      el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });

    document.addEventListener("mouseleave", () => { inner.style.opacity = "0"; outer.style.opacity = "0"; });
    document.addEventListener("mouseenter", () => { inner.style.opacity = "1"; outer.style.opacity = "1"; });
  }

  /* ─────────────────────────────────────────────────
     8. HEADER SCROLL STATE
  ───────────────────────────────────────────────── */
  function initHeader(lenis) {
    const header = $("header");
    lenis.on("scroll", ({ scroll }) => {
      header.classList.toggle("scrolled", scroll > 30);
    });

    /* Active nav based on section in view */
    const sections = $$("section[id]");
    const links    = $$(".nav-link");
    lenis.on("scroll", ({ scroll }) => {
      const halfway = window.innerHeight / 2;
      sections.forEach((sec) => {
        const top    = sec.offsetTop - 100;
        const bottom = top + sec.offsetHeight;
        if (scroll + halfway >= top && scroll + halfway < bottom) {
          links.forEach(l => l.classList.remove("active-nav"));
          const link = links.find(l => l.getAttribute("href") === `#${sec.id}`);
          if (link) link.classList.add("active-nav");
        }
      });
    });
  }

  /* ─────────────────────────────────────────────────
     9. MOBILE BURGER
  ───────────────────────────────────────────────── */
  function initBurger() {
    const burger = $("#burger");
    const nav    = $("#mainNav");
    if (!burger || !nav) return;

    burger.addEventListener("click", () => {
      burger.classList.toggle("open");
      nav.classList.toggle("open");
    });

    // Close on link click
    $$(".nav-link").forEach((l) => {
      l.addEventListener("click", () => {
        burger.classList.remove("open");
        nav.classList.remove("open");
      });
    });
  }

  /* ─────────────────────────────────────────────────
     10. SMOOTH NAV LINKS (Lenis scroll-to)
  ───────────────────────────────────────────────── */
  function initNavLinks(lenis) {
    $$("a[href^='#']").forEach((a) => {
      a.addEventListener("click", (e) => {
        const target = $(a.getAttribute("href"));
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -68, duration: 1.6 });
        }
      });
    });
  }

  /* ─────────────────────────────────────────────────
     11. PROJECT FILTER
  ───────────────────────────────────────────────── */
  function initFilter() {
    const btns  = $$(".filter-btn");
    const cards = $$(".pcard");

    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.dataset.f;

        cards.forEach((card) => {
          const show = f === "all" || (card.dataset.cat || "").includes(f);
          gsap.to(card, {
            opacity: show ? 1 : 0.2,
            scale:   show ? 1 : 0.95,
            duration: 0.35, ease: "power2.out",
            pointerEvents: show ? "auto" : "none",
          });
        });
      });
    });
  }

  /* ─────────────────────────────────────────────────
     12. CONTACT FORM — Validation + Google Sheets
  ───────────────────────────────────────────────── */
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

    function validateEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
    function setError(input, errEl, show) {
      input.classList.toggle("error", show);
      errEl.classList.toggle("show", show);
    }

    // Real-time feedback
    nameEl.addEventListener("input",  () => setError(nameEl,  nameErr,  nameEl.value.trim().length < 2 && nameEl.value.trim().length > 0));
    emailEl.addEventListener("input", () => setError(emailEl, emailErr, !validateEmail(emailEl.value.trim()) && emailEl.value.trim().length > 0));
    msgEl.addEventListener("input",   () => setError(msgEl,   msgErr,   msgEl.value.trim().length < 10 && msgEl.value.trim().length > 0));

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name  = nameEl.value.trim();
      const email = emailEl.value.trim();
      const msg   = msgEl.value.trim();

      let valid = true;
      if (name.length  < 2)           { setError(nameEl, nameErr, true);   valid = false; }
      if (!validateEmail(email))       { setError(emailEl, emailErr, true); valid = false; }
      if (msg.length   < 10)          { setError(msgEl, msgErr, true);     valid = false; }
      if (!valid) return;

      const SCRIPT_URL = "https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_URL/exec";

      const origText = submitBtn.querySelector(".btn-text").textContent;
      submitBtn.querySelector(".btn-text").textContent = "Sending...";
      submitBtn.disabled = true;

      const data = new FormData();
      data.append("Name", name);
      data.append("Email", email);
      data.append("Message", msg);

      try {
        await fetch(SCRIPT_URL, { method: "POST", body: data, mode: "no-cors" });
        submitBtn.querySelector(".btn-text").textContent = "Message Sent!";
        gsap.to(submitBtn, { backgroundColor: "#059669", duration: 0.4 });
        setTimeout(() => {
          submitBtn.querySelector(".btn-text").textContent = origText;
          gsap.to(submitBtn, { backgroundColor: "", duration: 0.4 });
          submitBtn.disabled = false;
          form.reset();
        }, 3000);
      } catch (err) {
        console.error(err);
        submitBtn.querySelector(".btn-text").textContent = "Error! Try Again.";
        setTimeout(() => {
          submitBtn.querySelector(".btn-text").textContent = origText;
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  }

  /* ─────────────────────────────────────────────────
     13. HERO ORB — mouse parallax
  ───────────────────────────────────────────────── */
  function initOrbParallax() {
    const orb = $("#domainOrb");
    if (!orb || window.matchMedia("(hover: none)").matches) return;

    document.addEventListener("mousemove", (e) => {
      const rx = ((e.clientX / window.innerWidth)  - 0.5) * 20;
      const ry = ((e.clientY / window.innerHeight) - 0.5) * -20;
      gsap.to(orb, { rotateX: ry, rotateY: rx, duration: 0.6, ease: "power2.out", transformPerspective: 1000 });
    });
  }

  /* ─────────────────────────────────────────────────
     INIT (after loader)
  ───────────────────────────────────────────────── */
  async function init() {
    // Start Three.js background immediately (visible behind loader)
    initThreeBackground();

    // Wait for loader
    await initLoader();

    // Init everything else
    initAboutSigil();
    const lenis = initLenis();
    initGSAP(lenis);
    initTyped();
    initCursor();
    initHeader(lenis);
    initBurger();
    initNavLinks(lenis);
    initFilter();
    initContactForm();
    initOrbParallax();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  /* ===================================================
     13. SCROLL PROGRESS BAR
     =================================================== */
  const progressBar = $("#scrollProgressBar");
  if (progressBar) {
    window.addEventListener("scroll", () => {
      const scrollTotal = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollTotal / height) * 100;
      progressBar.style.width = scrolled + "%";
    }, { passive: true });
  }

  /* ===================================================
     14. DARK/LIGHT THEME TOGGLE
     =================================================== */
  const themeToggle = $("#themeToggle");
  if (themeToggle) {
    const icon = themeToggle.querySelector("i");
    const currentTheme = localStorage.getItem("portfolio_theme");
    
    if (currentTheme === "light") {
      document.body.classList.add("light-mode");
      icon.className = "fas fa-sun";
    } else {
      icon.className = "fas fa-moon";
    }

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      if (document.body.classList.contains("light-mode")) {
        icon.className = "fas fa-sun";
        localStorage.setItem("portfolio_theme", "light");
      } else {
        icon.className = "fas fa-moon";
        localStorage.setItem("portfolio_theme", "dark");
      }
    });
  }

})();
