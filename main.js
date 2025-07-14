document.addEventListener('DOMContentLoaded', () => {
  const navbar   = document.querySelector('.navbar');
  const logoImg  = navbar?.querySelector('.navbar-brand img');
  const hero     = document.querySelector('.hero');
  const features = document.getElementById('features');
  const menuId   = document.getElementById('mainNavbar');

  // logo URLs
  const logoWhite = 'https://i.postimg.cc/mZcC64jS/palta-hub-logo-white-transparent.png';
  const logoDark  = 'https://i.postimg.cc/Fzy2TNc9/palta-hub-logo-transparent.png';

  if (navbar && logoImg && hero) {
    // compute breakpoints
    const heroBottom    = hero.offsetTop + hero.offsetHeight - navbar.offsetHeight;
    const featuresStart = features
      ? features.offsetTop - navbar.offsetHeight
      : Infinity;

    // initial check
    onScroll();
    window.addEventListener('scroll', onScroll);

    function onScroll() {
      const y = window.scrollY;
      if (y < heroBottom) {
        // fully transparent over hero
        navbar.classList.remove('light-bg','dark-bg');
        logoImg.src = logoWhite;
      } else if (y < featuresStart) {
        // frosted white panel
        navbar.classList.add('light-bg');
        navbar.classList.remove('dark-bg');
        logoImg.src = logoDark;
      } else {
        // solid dark panel
        navbar.classList.add('dark-bg');
        navbar.classList.remove('light-bg');
        logoImg.src = logoDark;
      }
    }
  }

  // mobile-sheet backdrop toggle
  if (menuId) {
    menuId.addEventListener('show.bs.collapse', () =>
      document.body.classList.add('menu-open')
    );
    menuId.addEventListener('hide.bs.collapse', () =>
      document.body.classList.remove('menu-open')
    );
  }
});
