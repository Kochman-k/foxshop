// ===== Mobile Navigation Drawer =====
const menuToggle = document.getElementById('menuToggle');
const drawerClose = document.getElementById('drawerClose');
const navDrawer = document.getElementById('navDrawer');
const navScrim = document.getElementById('navScrim');

function openDrawer() {
  navDrawer.classList.add('open');
  navScrim.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  navDrawer.classList.remove('open');
  navScrim.classList.remove('active');
  document.body.style.overflow = '';
}

menuToggle.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);
navScrim.addEventListener('click', closeDrawer);

// ===== Carousels =====
function setupCarousel(carouselId, visibleItems) {
  const carousel = document.getElementById(carouselId);
  const track = carousel.querySelector('.carousel__track');
  const items = track.children;
  let currentIndex = 0;

  function getVisibleCount() {
    if (window.innerWidth <= 480) return Math.max(1, visibleItems - 2);
    if (window.innerWidth <= 768) return Math.max(1, visibleItems - 1);
    return visibleItems;
  }

  function getItemWidth() {
    if (items.length === 0) return 0;
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.gap) || 16;
    const item = items[0];
    return item.offsetWidth + gap;
  }

  function slide(direction) {
    const visible = getVisibleCount();
    const maxIndex = Math.max(0, items.length - visible);
    currentIndex = Math.max(0, Math.min(currentIndex + direction, maxIndex));
    const offset = currentIndex * getItemWidth();
    track.style.transform = `translateX(-${offset}px)`;
  }

  // Bind nav buttons
  document.querySelectorAll(`[data-carousel="${carouselId.replace('Carousel', '')}"]`).forEach(btn => {
    btn.addEventListener('click', () => {
      const dir = parseInt(btn.dataset.dir);
      slide(dir);
    });
  });

  // Touch/swipe support
  let startX = 0;
  let isDragging = false;

  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      slide(diff > 0 ? 1 : -1);
    }
  }, { passive: true });

  // Reset on resize
  window.addEventListener('resize', () => {
    currentIndex = 0;
    track.style.transform = 'translateX(0)';
  });
}

setupCarousel('categoriesCarousel', 7);
setupCarousel('productsCarousel', 2);
