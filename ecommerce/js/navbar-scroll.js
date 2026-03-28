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

  /* ===== Mega-menu: set --menu-height for ::after background extension ===== */
  const dropdowns = navbar.querySelectorAll('.navbar__dropdown');

  dropdowns.forEach(function (dd) {
    dd.addEventListener('mouseenter', function () {
      var menu = dd.querySelector('.mega-menu');
      if (!menu) return;
      navbar.classList.add('navbar--menu-open');
      // Measure the mega-menu height and set CSS variable
      requestAnimationFrame(function () {
        var h = menu.offsetHeight;
        navbar.style.setProperty('--menu-height', h + 'px');
      });
    });
    dd.addEventListener('mouseleave', function () {
      navbar.classList.remove('navbar--menu-open');
    });
  });
})();
