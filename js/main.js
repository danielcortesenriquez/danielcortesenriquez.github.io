// Año actual
document.getElementById('y').textContent = new Date().getFullYear();

// Menú móvil
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

// Tema oscuro con localStorage
const themeBtn = document.getElementById('themeBtn');
const sun = document.getElementById('sun');
const moon = document.getElementById('moon');

function setTheme(dark){
  if(dark){
    document.documentElement.classList.add('dark');
    sun.classList.remove('hidden');
    moon.classList.add('hidden');
    localStorage.setItem('theme','dark');
  } else {
    document.documentElement.classList.remove('dark');
    sun.classList.add('hidden');
    moon.classList.remove('hidden');
    localStorage.setItem('theme','light');
  }
}

setTheme(localStorage.getItem('theme') === 'dark');

themeBtn.addEventListener('click', () => 
  setTheme(!document.documentElement.classList.contains('dark'))
);
