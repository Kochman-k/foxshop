/* Navbar scroll elevation + mega-menu open state */
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

  /* ===== Hover: adds .navbar--menu-open when any dropdown is active ===== */
  const dropdowns = navbar.querySelectorAll('.navbar__dropdown');

  dropdowns.forEach(function (dd) {
    dd.addEventListener('mouseenter', function () {
      navbar.classList.add('navbar--menu-open');
    });
    dd.addEventListener('mouseleave', function () {
      navbar.classList.remove('navbar--menu-open');
    });
  });
})();
