/* ============================================================
   RESPIRE MEDICAL — main.js
   Sticky nav, scroll animations, mobile menu, form handling
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky Nav ─────────────────────────────────────────── */
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Active Nav Link ─────────────────────────────────────── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(link => {
    const linkPath = link.getAttribute('href').split('/').pop();
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

  /* ── Mobile Hamburger ───────────────────────────────────── */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ── Hero Background Ken Burns ──────────────────────────── */
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    setTimeout(() => heroBg.classList.add('loaded'), 100);
  }

  /* ── Scroll Reveal (Intersection Observer) ──────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });
    revealEls.forEach(el => observer.observe(el));
  }

  /* ── Contact Form ───────────────────────────────────────── */
  const form = document.querySelector('.contact-form form');
  const successMsg = document.querySelector('.form-success');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      const data = new FormData(form);

      try {
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(data).toString()
        });

        if (res.ok) {
          form.style.display = 'none';
          if (successMsg) successMsg.style.display = 'block';
        } else {
          btn.textContent = 'Send Message';
          btn.disabled = false;
          alert('Something went wrong. Please try again.');
        }
      } catch {
        btn.textContent = 'Send Message';
        btn.disabled = false;
        alert('Something went wrong. Please try again.');
      }
    });
  }

});