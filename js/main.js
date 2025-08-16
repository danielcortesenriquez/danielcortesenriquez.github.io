// --- Año actual ---
  const yearEl = document.getElementById('y');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // --- Menú móvil ---
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn && mobileMenu) {
    // Estado inicial aria
    if (!menuBtn.hasAttribute('aria-expanded')) {
      menuBtn.setAttribute('aria-expanded', String(!mobileMenu.classList.contains('hidden')));
    }
    menuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.toggle('hidden');
      menuBtn.setAttribute('aria-expanded', String(!isHidden));
    });
  }

  // --- Tema oscuro con localStorage ---
  const themeBtn = document.getElementById('themeBtn');
  const sun = document.getElementById('sun');
  const moon = document.getElementById('moon');

  // Si no hay preferencia guardada, usa la del sistema
  const storedTheme = storage.get('theme'); // 'dark' | 'light' | null
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  function setTheme(dark) {
    document.documentElement.classList.toggle('dark', dark);
    if (sun) sun.classList.toggle('hidden', !dark);  // Mostrar sol en modo oscuro (para indicar que puedes pasar a claro)
    if (moon) moon.classList.toggle('hidden', dark); // Mostrar luna en modo claro (para indicar que puedes pasar a oscuro)
    storage.set('theme', dark ? 'dark' : 'light');
  }

  // Aplica tema inicial
  setTheme(
    storedTheme === 'dark' ? true :
    storedTheme === 'light' ? false :
    systemPrefersDark
  );

  // Botón de tema
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(!isDark);
    });
  }