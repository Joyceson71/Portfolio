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

  // Particle class with simulated 3D depth
  class Particle {
    constructor() {
      this.init();
    }
    init() {
      this.x   = Math.random() * W;
      this.y   = Math.random() * H;
      this.z   = Math.random();          // depth 0–1 (1 = close, 0 = far)
      this.vx  = (Math.random() - 0.5) * 0.25 * (this.z + 0.3);
      this.vy  = (Math.random() - 0.5) * 0.25 * (this.z + 0.3);
      this.baseR = (this.z * 1.8) + 0.4;
      this.r   = this.baseR;
      this.alpha = 0.15 + this.z * 0.55;
      this.hue = 220 + this.z * 60; // indigo to cyan
    }
    update() {
      // Subtle parallax based on depth + mouse velocity
      const parallax = (1 - this.z) * 0.012;
      this.x += this.vx + mouse.vx * parallax * 0.4;
      this.y += this.vy + mouse.vy * parallax * 0.4;

      // Slow drift oscillation
      this.x += Math.sin(Date.now() * 0.0003 + this.z * 10) * 0.06;
      this.y += Math.cos(Date.now() * 0.0004 + this.z * 8) * 0.04;

      // Wrap around edges
      if (this.x < -10) this.x = W + 10;
      if (this.x > W + 10) this.x = -10;
      if (this.y < -10) this.y = H + 10;
      if (this.y > H + 10) this.y = -10;

      // Mouse repulsion (stronger for close particles)
      if (!isMobile) {
        const dx   = this.x - mouse.x;
        const dy   = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelR = 80 + this.z * 80;
        if (dist < repelR) {
          const force = (1 - dist / repelR) * (0.5 + this.z * 1.5);
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
        }
      }
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      // Glow
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 3);
      grad.addColorStop(0, `hsl(${this.hue}, 80%, 72%)`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * 3, 0, Math.PI * 2);
      ctx.fill();
      // Core dot
      ctx.globalAlpha = this.alpha * 1.5;
      ctx.fillStyle = `hsl(${this.hue}, 90%, 78%)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Draw connecting lines between close particles
  function connectParticles(particles) {
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i], p2 = particles[j];
        const dx   = p1.x - p2.x;
        const dy   = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const depthFactor = (p1.z + p2.z) / 2;
          const alpha = (1 - dist / maxDist) * 0.22 * depthFactor;
          const hue = 220 + depthFactor * 55;
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = `hsl(${hue}, 75%, 65%)`;
          ctx.lineWidth = depthFactor * 0.8;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  const PARTICLE_COUNT = isMobile ? 40 : 80;
  const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

  // Floating geometric shapes (3D wireframe feel)
  class Shape {
    constructor() {
      this.reset();
    }
    reset() {
      this.x     = Math.random() * W;
      this.y     = Math.random() * H;
      this.size  = 20 + Math.random() * 50;
      this.angle = Math.random() * Math.PI * 2;
      this.speed = (Math.random() - 0.5) * 0.3;
      this.rotSpeed = (Math.random() - 0.5) * 0.008;
      this.alpha = 0.05 + Math.random() * 0.08;
      this.type  = Math.floor(Math.random() * 3); // 0=square, 1=triangle, 2=hex
      this.drift = { x: (Math.random() - 0.5) * 0.15, y: (Math.random() - 0.5) * 0.1 };
    }
    update() {
      this.angle += this.rotSpeed;
      this.x += this.drift.x;
      this.y += this.drift.y;
      if (this.x < -100) this.x = W + 100;
      if (this.x > W + 100) this.x = -100;
      if (this.y < -100) this.y = H + 100;
      if (this.y > H + 100) this.y = -100;
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.globalAlpha = this.alpha;
      ctx.strokeStyle = "rgba(99, 102, 241, 0.8)";
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      if (this.type === 0) {
        // Square
        ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size);
      } else if (this.type === 1) {
        // Triangle
        ctx.moveTo(0, -this.size * 0.6);
        ctx.lineTo(this.size * 0.5, this.size * 0.4);
        ctx.lineTo(-this.size * 0.5, this.size * 0.4);
        ctx.closePath();
      } else {
        // Hexagon
        for (let i = 0; i < 6; i++) {
          const a = (i * Math.PI) / 3;
          if (i === 0) ctx.moveTo(Math.cos(a) * this.size / 2, Math.sin(a) * this.size / 2);
          else ctx.lineTo(Math.cos(a) * this.size / 2, Math.sin(a) * this.size / 2);
        }
        ctx.closePath();
      }
      ctx.stroke();
      ctx.restore();
    }
  }

  const SHAPE_COUNT = isMobile ? 6 : 14;
  const shapes = Array.from({ length: SHAPE_COUNT }, () => new Shape());

  function renderFrame() {
    ctx.clearRect(0, 0, W, H);

    if (!reducedMotion) {
      shapes.forEach((s) => { s.update(); s.draw(); });
      particles.forEach((p) => { p.update(); p.draw(); });
      connectParticles(particles);
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
     12. SMOOTH ACTIVE NAV
     =================================================== */
  const sections = $$("section[id]");
  const navLinks = $$(".nav-link");

  function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach((sec) => {
      const top    = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach((l) => l.classList.remove("active-nav"));
        const activeLink = $(`a[href="#${sec.id}"]`);
        if (activeLink) activeLink.classList.add("active-nav");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

})();
