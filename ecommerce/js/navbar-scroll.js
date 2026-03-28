/* Navbar scroll elevation — adds .navbar--scrolled class after scrolling past threshold */
(function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const THRESHOLD = 32; // px from top before activating
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

  // Initial check (e.g. page reloaded while scrolled)
  update();
})();
