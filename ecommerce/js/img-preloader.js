/**
 * Image Skeleton Preloader
 * Adds shimmer effect to image containers until images are fully loaded.
 */
(function () {
  // Selectors for all image containers that should show a skeleton
  var containerSelectors = [
    '.hero-banner',
    '.product-card__media',
    '.plp-card__media',
    '.pdp__gallery-main',
    '.pdp__thumb',
    '.category-tile__img',
    '.popular-card',
    '.promo__mask',
    '.lastseen__item',
    '.lastseen-bar__item',
    '.lastseen-bubble__item'
  ];

  var selector = containerSelectors.join(',');
  var containers = document.querySelectorAll(selector);

  containers.forEach(function (container) {
    var img = container.querySelector('img');
    if (!img) return;

    // Add skeleton class
    container.classList.add('img-skeleton');

    function onLoaded() {
      container.classList.add('img-loaded');
    }

    // If already cached / complete
    if (img.complete && img.naturalWidth > 0) {
      onLoaded();
      return;
    }

    img.addEventListener('load', onLoaded);
    img.addEventListener('error', onLoaded); // remove skeleton even on error
  });
})();
