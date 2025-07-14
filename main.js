// main.js

document.addEventListener('DOMContentLoaded', () => {
  const navbar    = document.querySelector('.navbar');
  const logoImg   = navbar.querySelector('.navbar-brand img');
  const hero      = document.querySelector('.hero');
  const offcanvas = document.getElementById('offcanvasNavbar');

  const logoWhite = 'https://i.postimg.cc/mZcC64jS/palta-hub-logo-white-transparent.png';
  const logoDark  = 'https://i.postimg.cc/Fzy2TNc9/palta-hub-logo-transparent.png';
  const logoColor = 'https://i.postimg.cc/Y9PmYp3X/palta-hub-logo-colored.png';

  // Transparent ↔ Frosted at hero boundary, with logo swap
  if (navbar && hero) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target === hero) {
          if (entry.isIntersecting) {
            navbar.classList.remove('frosted');
            logoImg.src = logoWhite;
          } else {
            navbar.classList.add('frosted');
            logoImg.src = logoDark;
          }
        }
      });
    }, {
      rootMargin: `-${navbar.offsetHeight}px 0 0 0`,
      threshold: 0
    });
    observer.observe(hero);
  }

  // Offcanvas open/close: backdrop + colored logo
  if (offcanvas) {
    offcanvas.addEventListener('show.bs.offcanvas', () => {
      document.body.classList.add('menu-open');
      logoImg.src = logoColor;
    });
    offcanvas.addEventListener('hide.bs.offcanvas', () => {
      document.body.classList.remove('menu-open');
      // restore based on navbar state
      if (navbar.classList.contains('frosted')) {
        logoImg.src = logoDark;
      } else {
        logoImg.src = logoWhite;
      }
    });
  }
});
