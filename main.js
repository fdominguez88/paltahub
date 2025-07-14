// IntersectionObserver for three-state navbar (transparent → frosted white → solid dark)
document.addEventListener('DOMContentLoaded', () => {
  const navbar    = document.querySelector('.navbar');
  const logoImg   = navbar.querySelector('.navbar-brand img');
  const hero      = document.querySelector('.hero');
  const features  = document.getElementById('features');
  // Changed from 'mainNavbar' (collapse) to 'offcanvasNavbar' (offcanvas)
  const offcanvasEl = document.getElementById('offcanvasNavbar');

  const logoWhite = 'https://i.postimg.cc/mZcC64jS/palta-hub-logo-white-transparent.png';
  const logoDark  = 'https://i.postimg.cc/Fzy2TNc9/palta-hub-logo-transparent.png';
  // Replace this with your full-color “palta hub” logo URL:
  const logoColor = 'https://i.postimg.cc/Y9PmYp3X/palta-hub-logo-colored.png';

  // 1) Transparent ↔ frosted-white at hero boundary
  // 2) Frosted-white ↔ solid-dark at features boundary
  if (navbar && hero && features) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Only apply these changes if the offcanvas is NOT open
        // This prevents the logo from changing when the mobile menu is active
        if (!offcanvasEl.classList.contains('show')) {
          if (entry.target === hero) {
            if (entry.isIntersecting) {
              navbar.classList.remove('light-bg','dark-bg');
              logoImg.src = logoWhite;
            } else {
              navbar.classList.add('light-bg');
              logoImg.src = logoDark;
            }
          }
          if (entry.target === features) {
            if (entry.isIntersecting) {
              navbar.classList.add('dark-bg');
              navbar.classList.remove('light-bg'); // Ensure light-bg is removed if features is reached
            } else {
              // This else block determines what happens when scrolling UP out of features
              // If we scroll up and are in the hero, it becomes transparent again.
              // If we scroll up and are between hero and features, it remains light-bg.
              if (!hero.getBoundingClientRect().top <= navbar.offsetHeight) { // Check if hero is visible above navbar
                navbar.classList.remove('dark-bg');
              }
            }
          }
        }
      });
    }, {
      rootMargin: `-${navbar.offsetHeight}px 0px 0px 0px`,
      threshold: 0
    });

    observer.observe(hero);
    observer.observe(features);
  }

  // Toggle mobile-sheet backdrop blur & switch logo for Offcanvas
  if (offcanvasEl) {
    offcanvasEl.addEventListener('show.bs.offcanvas', () => {
      document.body.classList.add('offcanvas-open'); // A more specific class for offcanvas
      logoImg.src = logoColor; // switch to colored logo when offcanvas is open
      // Optionally, if you want the navbar itself to change appearance when offcanvas is open:
      navbar.classList.add('offcanvas-active');
    });

    offcanvasEl.addEventListener('hide.bs.offcanvas', () => {
      document.body.classList.remove('offcanvas-open');
      navbar.classList.remove('offcanvas-active');

      // restore logo based on scroll state once offcanvas is closed
      // Re-evaluate current scroll position to set correct logo
      const rectHero = hero.getBoundingClientRect();
      const rectFeatures = features.getBoundingClientRect();

      if (rectHero.top <= navbar.offsetHeight && rectHero.bottom > navbar.offsetHeight) {
        // We are within the hero section, but scrolled past its top
        navbar.classList.add('light-bg');
        navbar.classList.remove('dark-bg'); // Ensure dark-bg is removed
        logoImg.src = logoDark;
      } else if (rectFeatures.top <= navbar.offsetHeight) {
        // We are scrolled into the features section
        navbar.classList.add('dark-bg');
        navbar.classList.remove('light-bg'); // Ensure light-bg is removed
        logoImg.src = logoDark; // Assuming dark logo for dark background
      } else {
        // We are at the very top, within the hero, or above it
        navbar.classList.remove('light-bg', 'dark-bg');
        logoImg.src = logoWhite;
      }
    });
  }
});
