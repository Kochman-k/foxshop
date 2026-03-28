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

  /* ===== Mega-menu: position to match navbar bounds ===== */
  const dropdowns = navbar.querySelectorAll('.navbar__dropdown');

  function positionMegaMenu(dd) {
    const menu = dd.querySelector('.mega-menu');
    if (!menu) return;
    const navRect = navbar.getBoundingClientRect();
    menu.style.top = navRect.bottom + 'px';
    menu.style.left = navRect.left + 'px';
    menu.style.right = (window.innerWidth - navRect.right) + 'px';
  }

  dropdowns.forEach(function (dd) {
    dd.addEventListener('mouseenter', function () {
      navbar.classList.add('navbar--menu-open');
      positionMegaMenu(dd);
    });
    dd.addEventListener('mouseleave', function () {
      navbar.classList.remove('navbar--menu-open');
    });
  });

  /* Reposition on scroll/resize while open */
  function repositionOpen() {
    var openDd = navbar.querySelector('.navbar__dropdown:hover');
    if (openDd) positionMegaMenu(openDd);
  }
  window.addEventListener('scroll', repositionOpen, { passive: true });
  window.addEventListener('resize', repositionOpen, { passive: true });
})();
