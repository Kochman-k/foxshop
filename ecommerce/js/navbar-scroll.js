/* Navbar scroll elevation + morphing mega-menu */
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

  /* ===== Morphing mega-menu with cross-fade & height animation ===== */
  const CLOSE_DELAY = 250;
  const dropdowns = navbar.querySelectorAll('.navbar__dropdown');
  let closeTimer = null;
  let activeDD = null;
  let isOpen = false;

  function openMenu(dd) {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }

    var isSwitching = isOpen && activeDD && activeDD !== dd;

    // Hide previous menu content
    if (activeDD && activeDD !== dd) {
      var prevMenu = activeDD.querySelector('.mega-menu');
      if (prevMenu) prevMenu.classList.remove('mega-menu--visible');
    }

    activeDD = dd;
    var menu = dd.querySelector('.mega-menu');
    if (!menu) return;

    // If first open (not switching), add the open class
    if (!isOpen) {
      navbar.classList.add('navbar--menu-open');
      isOpen = true;
    }

    // Show new menu content
    menu.classList.add('mega-menu--visible');

    // Measure and set height — this animates the glass ::before
    requestAnimationFrame(function () {
      navbar.style.setProperty('--menu-height', menu.offsetHeight + 'px');
    });
  }

  function scheduleClose() {
    closeTimer = setTimeout(function () {
      if (activeDD) {
        var menu = activeDD.querySelector('.mega-menu');
        if (menu) menu.classList.remove('mega-menu--visible');
      }
      activeDD = null;
      isOpen = false;
      navbar.classList.remove('navbar--menu-open');
      navbar.style.setProperty('--menu-height', '0px');
      closeTimer = null;
    }, CLOSE_DELAY);
  }

  dropdowns.forEach(function (dd) {
    dd.addEventListener('mouseenter', function () {
      openMenu(dd);
    });
    dd.addEventListener('mouseleave', function () {
      scheduleClose();
    });
  });

  // Keep menu open when hovering the mega-menu area
  navbar.addEventListener('mouseover', function (e) {
    if (e.target.closest && e.target.closest('.mega-menu') && closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
  });
})();
