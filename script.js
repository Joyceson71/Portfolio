/* =============================================
   JOYCESON PORTFOLIO — MAIN SCRIPT
   Cosmic / Tech Theme
   3D Particles · Magnetic Cursor · Typed Text
   ============================================= */

(function () {
  "use strict";

  /* ===================================================
     1. HELPERS
     =================================================== */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const isMobile = window.matchMedia("(hover: none)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ===================================================
     2. CUSTOM MAGNETIC CURSOR WITH TRAIL
     =================================================== */
  if (!isMobile) {
    const dot   = $("#cursorDot");
    const ring  = $("#cursorRing");
    const trail = $("#cursorTrail");

    let mx = -200, my = -200;
    let rx = -200, ry = -200;
    let trailDots = [];
    const TRAIL_LENGTH = 8;

    // Initialize trail dots
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const t = document.createElement("div");
      t.className = "trail-dot";
      t.style.opacity = 0;
      t.style.width  = `${Math.max(2, 5 - i * 0.4)}px`;
      t.style.height = t.style.width;
      trail.appendChild(t);
      trailDots.push({ el: t, x: -200, y: -200 });
    }

    document.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top  = my + "px";
    });

    // Smooth ring follow
    function animateCursor() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + "px";
      ring.style.top  = ry + "px";

      // Trail: each dot follows the next with delay
      for (let i = TRAIL_LENGTH - 1; i > 0; i--) {
        trailDots[i].x += (trailDots[i - 1].x - trailDots[i].x) * 0.28;
        trailDots[i].y += (trailDots[i - 1].y - trailDots[i].y) * 0.28;
      }
      trailDots[0].x = mx;
      trailDots[0].y = my;

      trailDots.forEach((t, idx) => {
        t.el.style.left    = t.x + "px";
        t.el.style.top     = t.y + "px";
        t.el.style.opacity = `${(1 - idx / TRAIL_LENGTH) * 0.45}`;
        t.el.style.background = idx < TRAIL_LENGTH / 2
          ? "rgba(99,102,241,0.9)"
          : "rgba(6,182,212,0.7)";
      });

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover states
    const hoverEls = $$("a, button, .skill-card, .project-card, .contact-link-item, .filter-btn");
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("is-hovered"));
      el.addEventListener("mouseleave", () => ring.classList.remove("is-hovered"));
    });

    document.addEventListener("mousedown", () => ring.classList.add("is-clicked"));
    document.addEventListener("mouseup",   () => ring.classList.remove("is-clicked"));

    // Hide when leaving window
    document.addEventListener("mouseleave", () => {
      dot.style.opacity  = "0";
      ring.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
      dot.style.opacity  = "1";
      ring.style.opacity = "1";
    });
  }

  /* ===================================================
     3. 3D PARTICLE SYSTEM (WebGL-inspired Canvas)
     =================================================== */
  const canvas = $("#bgCanvas");
  const ctx = canvas.getContext("2d");

  let W = 0, H = 0;
  function resizeCanvas() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const mouse = { x: W / 2, y: H / 2, vx: 0, vy: 0 };
  window.addEventListener("mousemove", (e) => {
    mouse.vx = e.clientX - mouse.x;
    mouse.vy = e.clientY - mouse.y;
    mouse.x  = e.clientX;
    mouse.y  = e.clientY;
  });

  // Cursed Energy Particles
  class CursedParticle {
    constructor() {
      this.init();
      this.y = Math.random() * H; // initial random spread
    }
    init() {
      this.x = Math.random() * W;
      this.y = H + Math.random() * 100;
      this.r = 4 + Math.random() * 20;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = -(1 + Math.random() * 4);
      this.alpha = 0.2 + Math.random() * 0.6;
      this.life = 1;
      this.decay = 0.003 + Math.random() * 0.015;
      this.hue = Math.random() > 0.5 ? 345 : 280; // Red or Deep Purple
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life -= this.decay;
      
      // Turbulence
      this.vx += (Math.random() - 0.5) * 0.6;
      this.r += 0.1; // Expand as it dissipates

      if (this.life <= 0 || this.r > 50) {
        this.init();
      }

      // Mouse repulsion (Curse aura avoiding mouse)
      if (!isMobile) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (1 - dist / 200) * 3;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
        }
      }
    }
    draw() {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = this.alpha * this.life;
      
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
      grad.addColorStop(0, `hsla(${this.hue}, 100%, 50%, 0.8)`);
      grad.addColorStop(0.4, `hsla(${this.hue}, 80%, 30%, 0.4)`);
      grad.addColorStop(1, "transparent");
      
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const PARTICLE_COUNT = isMobile ? 60 : 150;
  const particles = Array.from({ length: PARTICLE_COUNT }, () => new CursedParticle());

  function renderFrame() {
    // Trailing dark smoke effect instead of clearRect
    ctx.fillStyle = "rgba(5, 2, 2, 0.15)";
    ctx.fillRect(0, 0, W, H);

    if (!reducedMotion) {
      particles.forEach((p) => { p.update(); p.draw(); });
    }

    requestAnimationFrame(renderFrame);
  }
  renderFrame();

  /* ===================================================
     4. TYPED TEXT EFFECT
     =================================================== */
  const typedEl = $("#typedText");
  const phrases = [
    "Frontend Developer",
    "UI Enthusiast",
    "React Learner",
    "Problem Solver",
  ];
  let pIdx = 0, cIdx = 0, isDeleting = false;

  function type() {
    const phrase = phrases[pIdx];
    if (!typedEl) return;

    if (isDeleting) {
      typedEl.textContent = phrase.substring(0, --cIdx);
    } else {
      typedEl.textContent = phrase.substring(0, ++cIdx);
    }

    let delay = isDeleting ? 45 : 85;

    if (!isDeleting && cIdx === phrase.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && cIdx === 0) {
      isDeleting = false;
      pIdx = (pIdx + 1) % phrases.length;
      delay = 300;
    }

    setTimeout(type, delay);
  }
  type();

  /* ===================================================
     5. HEADER SCROLL EFFECT
     =================================================== */
  const header = $("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  /* ===================================================
     6. SCROLL REVEAL
     =================================================== */
  function setupReveal() {
    const revealEls = $$(
      ".reveal-up, .reveal-left, .reveal-right, .reveal-scale"
    );

    if (reducedMotion) {
      revealEls.forEach((el) => {
        el.classList.add("visible");
        activateSkills(el);
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            activateSkills(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => io.observe(el));
  }

  function activateSkills(el) {
    $$(".skill-fill", el).forEach((fill) => {
      fill.style.width = (fill.dataset.width || 0) + "%";
    });
    // Also check parent cards
    if (el.classList.contains("skill-card")) {
      const fill = $(".skill-fill", el);
      if (fill) fill.style.width = (fill.dataset.width || 0) + "%";
    }
  }

  setupReveal();

  /* ===================================================
     7. MOBILE MENU
     =================================================== */
  const menuBtn = $("#menuToggle");
  const mainNav = $("#mainNav");

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      mainNav.classList.toggle("open");
      menuBtn.classList.toggle("is-open");
    });

    $$(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuBtn.classList.remove("is-open");
      });
    });
  }

  /* ===================================================
     8. PROJECT FILTERING
     =================================================== */
  $$(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const f = btn.dataset.f;
      $$(".project-card").forEach((card) => {
        const cats = (card.dataset.cat || "").split(" ");
        const show = f === "all" || cats.includes(f);
        card.style.display = show ? "" : "none";
        if (show) {
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "none";
          }, 20);
        }
      });
    });
  });

  /* ===================================================
     9. CONTACT FORM VALIDATION
     =================================================== */
  const contactForm = $("#contactForm");
  const submitBtn   = $("#submitBtn");
  const nameInput   = $("#nameInput");
  const emailInput  = $("#emailInput");
  const msgInput    = $("#messageInput");

  const nameError   = $("#nameError");
  const emailError  = $("#emailError");
  const msgError    = $("#messageError");

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      let isValid = true;

      // Validate Name
      if (nameInput.value.trim().length < 2) {
        nameInput.classList.add("input-error");
        nameError.style.display = "block";
        isValid = false;
      } else {
        nameInput.classList.remove("input-error");
        nameError.style.display = "none";
      }

      // Validate Email
      if (!validateEmail(emailInput.value.trim())) {
        emailInput.classList.add("input-error");
        emailError.style.display = "block";
        isValid = false;
      } else {
        emailInput.classList.remove("input-error");
        emailError.style.display = "none";
      }

      // Validate Message
      if (msgInput.value.trim().length < 10) {
        msgInput.classList.add("input-error");
        msgError.style.display = "block";
        isValid = false;
      } else {
        msgInput.classList.remove("input-error");
        msgError.style.display = "none";
      }

      if (!isValid) return;

      const origText = submitBtn.querySelector(".btn-text").textContent;
      const origIcon = submitBtn.querySelector(".btn-icon").innerHTML;

      // 1. Setup the Web App URL here from your Google Apps Script
      // Replace this string with the URL you get after deploying your Google Apps Script
      const scriptURL = "https://script.google.com/u/0/home/projects/1jQVhY4NL99K73S3hk9pMhQ12v_s7bdmLFmd4gt87k9ucuAY0U5hBAKBR/edit";

      // Show sending state
      submitBtn.querySelector(".btn-text").textContent = "Sending...";
      submitBtn.disabled = true;

      // Prepare form data
      const formData = new FormData();
      formData.append("Name", nameInput.value.trim());
      formData.append("Email", emailInput.value.trim());
      formData.append("Message", msgInput.value.trim());

      // Send the data
      fetch(scriptURL, { method: "POST", body: formData, mode: "no-cors" })
        .then(() => {
          // Success state
          submitBtn.querySelector(".btn-text").textContent = "Message Sent!";
          submitBtn.querySelector(".btn-icon").innerHTML = '<i class="fas fa-check"></i>';
          submitBtn.style.background = "linear-gradient(135deg, #059669, #10b981)";
          submitBtn.style.boxShadow  = "0 4px 24px rgba(16, 185, 129, 0.4)";

          setTimeout(() => {
            submitBtn.querySelector(".btn-text").textContent = origText;
            submitBtn.querySelector(".btn-icon").innerHTML   = origIcon;
            submitBtn.style.background = "";
            submitBtn.style.boxShadow  = "";
            submitBtn.disabled = false;
            contactForm.reset();
          }, 3000);
        })
        .catch(error => {
          console.error("Error!", error.message);
          submitBtn.querySelector(".btn-text").textContent = "Error! Try Again.";
          setTimeout(() => {
            submitBtn.querySelector(".btn-text").textContent = origText;
            submitBtn.disabled = false;
          }, 3000);
        });
    });
  }

  /* ===================================================
     10. HERO AVATAR 3D PARALLAX
     =================================================== */
  const avatarContainer = $("#avatarContainer");
  if (avatarContainer && !isMobile) {
    document.addEventListener("mousemove", (e) => {
      const rect   = avatarContainer.getBoundingClientRect();
      const cx     = rect.left + rect.width / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (window.innerWidth / 2);
      const dy     = (e.clientY - cy) / (window.innerHeight / 2);
      const rotX   = dy * -12;
      const rotY   = dx * 12;

      avatarContainer.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });

    document.addEventListener("mouseleave", () => {
      avatarContainer.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    });
  }

  /* ===================================================
     11. HERO SCENE PARALLAX (subtle)
     =================================================== */
  const heroScene = $("#heroScene");
  if (heroScene && !isMobile) {
    window.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      heroScene.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  /* ===================================================
     12. 3D UNIVERSE NAVIGATION (DOMAIN EXPANSION)
     =================================================== */
  const prisonRealm = $("#prison-realm");
  const sectionsList = ['home', 'about', 'skills', 'project', 'contact'];
  const navLinksList = $$(".nav-link");
  let currentSectionIdx = 0;

  function goToSection(index) {
    if (index < 0 || index >= sectionsList.length || !prisonRealm) return;
    currentSectionIdx = index;
    const secId = sectionsList[index];
    
    // Update Prison Realm Rotation Class
    prisonRealm.className = `show-${secId}`;
    
    // Update Nav active states
    navLinksList.forEach(l => l.classList.remove("active-nav"));
    const targetHref = secId === 'project' ? '#projects' : `#${secId}`;
    const activeLink = Array.from(navLinksList).find(l => l.getAttribute('href') === targetHref || l.getAttribute('href') === `#${secId}`);
    if (activeLink) activeLink.classList.add("active-nav");

    // Close mobile menu if open
    if (typeof nav !== 'undefined' && nav.classList.contains("open")) {
      nav.classList.remove("open");
      menuToggle.classList.remove("is-open");
    }
  }

  // Handle Nav Clicks
  navLinksList.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        let targetId = href.substring(1);
        if (targetId === 'projects') targetId = 'project'; // id mismatch mapping
        const idx = sectionsList.indexOf(targetId);
        if (idx !== -1) goToSection(idx);
      }
    });
  });

  // Handle Wheel Scroll (Debounced to match CSS transition)
  let isScrolling3D = false;
  window.addEventListener("wheel", (e) => {
    // Only intercept if we are at the top/bottom of the current section's internal scroll, or simply just override entirely.
    // For simplicity, we just use wheel to switch scenes and rely on users dragging the scrollbar if internal content overflows.
    if (isScrolling3D) return;
    
    if (e.deltaY > 50) {
      if (currentSectionIdx < sectionsList.length - 1) {
        goToSection(currentSectionIdx + 1);
        isScrolling3D = true;
        setTimeout(() => isScrolling3D = false, 1200);
      }
    } else if (e.deltaY < -50) {
      if (currentSectionIdx > 0) {
        goToSection(currentSectionIdx - 1);
        isScrolling3D = true;
        setTimeout(() => isScrolling3D = false, 1200);
      }
    }
  }, { passive: true });

  // Init First Scene
  goToSection(0);

})();
