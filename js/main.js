const yearEl = document.getElementById('y');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Menú móvil
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
}

// Tema oscuro con localStorage
const themeBtn = document.getElementById('themeBtn');
const sun = document.getElementById('sun');
const moon = document.getElementById('moon');

function setTheme(dark) {
  document.documentElement.classList.toggle('dark', dark);
  if (sun && moon) {
    sun.classList.toggle('hidden', !dark);
    moon.classList.toggle('hidden', dark);
  }
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

setTheme(localStorage.getItem('theme') === 'dark');

if (themeBtn) {
  themeBtn.addEventListener(
    'click',
    () => setTheme(!document.documentElement.classList.contains('dark'))
  );
}
