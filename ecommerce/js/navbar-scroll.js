/* Navbar scroll elevation + mega-menu unified layout */
(function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  /* ===== Scroll: adds .navbar--scrolled ===== */
  const THRESHOLD = 32;
  let ticking = false;

  function update() {
    if (window.scrollY > THRESHOLD) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();

  /* ===== Mega-menu: position fixed to match navbar bounds ===== */
  const dropdowns = navbar.querySelectorAll('.navbar__dropdown');
  let activeDD = null;

  function positionMenu(dd) {
    var menu = dd.querySelector('.mega-menu');
    if (!menu) return;
    var rect = navbar.getBoundingClientRect();
    menu.style.top = rect.bottom + 'px';
    menu.style.left = rect.left + 'px';
    menu.style.width = rect.width + 'px';
  }

  dropdowns.forEach(function (dd) {
    dd.addEventListener('mouseenter', function () {
      activeDD = dd;
      navbar.classList.add('navbar--menu-open');
      positionMenu(dd);
    });
    dd.addEventListener('mouseleave', function () {
      activeDD = null;
      navbar.classList.remove('navbar--menu-open');
    });
  });

  /* Keep position in sync on scroll/resize */
  function syncPosition() {
    if (activeDD) positionMenu(activeDD);
  }
  window.addEventListener('scroll', syncPosition, { passive: true });
  window.addEventListener('resize', syncPosition, { passive: true });
})();
