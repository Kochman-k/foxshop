/* Navbar scroll elevation + morphing mega-menu with directional slide */
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

  /* ===== Morphing mega-menu with directional slide ===== */
  const CLOSE_DELAY = 250;
  const dropdowns = Array.from(navbar.querySelectorAll('.navbar__dropdown'));
  let closeTimer = null;
  let activeDD = null;
  let activeIndex = -1;
  let isOpen = false;

  function openMenu(dd) {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }

    var newIndex = dropdowns.indexOf(dd);
    var isSwitching = isOpen && activeDD && activeDD !== dd;
    var direction = 'right'; // default for first open

    if (isSwitching && activeIndex >= 0) {
      direction = newIndex > activeIndex ? 'right' : 'left';

      // Hide previous menu
      var prevMenu = activeDD.querySelector('.mega-menu');
      if (prevMenu) {
        prevMenu.classList.remove('mega-menu--visible', 'mega-menu--enter-left', 'mega-menu--enter-right');
      }
    }

    activeDD = dd;
    activeIndex = newIndex;
    var menu = dd.querySelector('.mega-menu');
    if (!menu) return;

    if (!isOpen) {
      navbar.classList.add('navbar--menu-open');
      isOpen = true;
    }

    // Remove old direction classes then add new one
    menu.classList.remove('mega-menu--enter-left', 'mega-menu--enter-right');

    if (isSwitching) {
      // Force reflow to restart animation
      void menu.offsetWidth;
      menu.classList.add('mega-menu--enter-' + direction);
    }

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
        if (menu) {
          menu.classList.remove('mega-menu--visible', 'mega-menu--enter-left', 'mega-menu--enter-right');
        }
      }
      activeDD = null;
      activeIndex = -1;
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
