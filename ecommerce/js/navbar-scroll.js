/* Navbar scroll elevation + mega-menu with delay & animation */
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

  /* ===== Mega-menu: hover with delay to prevent flicker ===== */
  const CLOSE_DELAY = 220; // ms before closing — gives time to reach submenu
  const dropdowns = navbar.querySelectorAll('.navbar__dropdown');
  let closeTimer = null;
  let activeDD = null;

  function openMenu(dd) {
    // Cancel any pending close
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }

    // Close previous if different
    if (activeDD && activeDD !== dd) {
      var prevMenu = activeDD.querySelector('.mega-menu');
      if (prevMenu) prevMenu.classList.remove('mega-menu--visible');
    }

    activeDD = dd;
    var menu = dd.querySelector('.mega-menu');
    if (!menu) return;

    navbar.classList.add('navbar--menu-open');
    menu.classList.add('mega-menu--visible');

    // Measure height for ::before glass
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
      navbar.classList.remove('navbar--menu-open');
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

  // Also keep menu open when hovering over the mega-menu itself
  // (it's positioned outside the dropdown due to position:absolute on navbar)
  navbar.addEventListener('mouseenter', function (e) {
    if (e.target.closest && e.target.closest('.mega-menu') && closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
  });
})();
