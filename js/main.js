'use strict';

document.addEventListener('DOMContentLoaded', () => {
// —— Preview modal (projects → slide 1) ——
const previewModal = document.getElementById('previewModal');
const openers = document.querySelectorAll('.preview-modal-trigger');

function openModal(e) {
  if (e) e.preventDefault(); // evita navegar; usamos el modal
  if (!previewModal) return;
  previewModal.classList.remove('hidden');
  previewModal.setAttribute('aria-hidden', 'false');
  // cerrar con ESC
  const onEsc = (ev) => { if (ev.key === 'Escape') closeModal(); };
  document.addEventListener('keydown', onEsc, { once: true });
}

function closeModal() {
  previewModal?.classList.add('hidden');
  previewModal?.setAttribute('aria-hidden', 'true');
}

openers.forEach(btn => btn.addEventListener('click', openModal));
previewModal?.querySelectorAll('[data-close-modal]').forEach(el => {
  el.addEventListener('click', closeModal);
});


  // Safe storage helpers
  const storage = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} }
  };

  // Year
  const yearEl = document.getElementById('y');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileDropdown = document.getElementById('mobileDropdown');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const open = !(mobileDropdown?.classList.contains('hidden'));
      mobileDropdown?.classList.toggle('hidden', open);
      menuBtn.setAttribute('aria-expanded', String(!open));
    });
  }

  // Theme
  const themeBtn = document.getElementById('themeBtn');
  const sun = document.getElementById('sun');
  const moon = document.getElementById('moon');

  function setTheme(dark) {
    document.documentElement.classList.toggle('dark', dark);
    if (sun) sun.classList.toggle('hidden', !dark);
    if (moon) moon.classList.toggle('hidden', dark);
    storage.set('theme', dark ? 'dark' : 'light');
  }

  const saved = storage.get('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(saved ? saved === 'dark' : prefersDark);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      setTheme(!document.documentElement.classList.contains('dark'));
    });
  }

  // ---- Projects Carousel (projects.html) ----
  const carousel = document.getElementById('projectCarousel');
  if (carousel) {
    const track = carousel.querySelector('.track');
    const slides = [...carousel.querySelectorAll('article')];
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    const dotsWrap = carousel.querySelector('.dots');

    let index = 0;
    const count = slides.length;

    // dots
    const dots = slides.map((_, i) => {
      const b = document.createElement('button');
      b.setAttribute('aria-label', `Go to slide ${i + 1}`);
      b.addEventListener('click', () => go(i));
      dotsWrap.appendChild(b);
      return b;
    });

    function update() {
      const offset = -index * 100;
      track.style.transform = `translateX(${offset}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }
    function go(i) {
      index = (i + count) % count;
      update();
    }

    prevBtn?.addEventListener('click', () => go(index - 1));
    nextBtn?.addEventListener('click', () => go(index + 1));

    // swipe
    let startX = null;
    track.addEventListener('pointerdown', (e) => (startX = e.clientX));
    track.addEventListener('pointerup', (e) => {
      if (startX == null) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      startX = null;
    });

    // auto-play (optional)
    let timer = setInterval(() => go(index + 1), 8000);
    carousel.addEventListener('pointerenter', () => clearInterval(timer));
    carousel.addEventListener('pointerleave', () => (timer = setInterval(() => go(index + 1), 8000)));

    update(); // init
  }
});
