// IntersectionObserver for three‐state navbar (transparent → frosted white → solid dark)
document.addEventListener('DOMContentLoaded', () => {
  const navbar    = document.querySelector('.navbar');
  const logoImg   = navbar.querySelector('.navbar-brand img');
  const hero      = document.querySelector('.hero');
  const features  = document.getElementById('features');
  const offcanvas = document.getElementById('offcanvasNavbar');

  const logoWhite = 'https://i.postimg.cc/mZcC64jS/palta-hub-logo-white-transparent.png';
  const logoDark  = 'https://i.postimg.cc/Fzy2TNc9/palta-hub-logo-transparent.png';
  // swap in your multi-colour logo here:
  const logoColor = 'https://i.postimg.cc/Y9PmYp3X/palta-hub-logo-colored.png';

  // OBSERVE hero & features to toggle .light-bg / .dark-bg
  if (navbar && hero && features) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
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
            navbar.classList.remove('light-bg');
          } else {
            navbar.classList.remove('dark-bg');
          }
        }
      });
    }, {
      rootMargin: `-${navbar.offsetHeight}px 0 0 0`,
      threshold: 0
    });
    observer.observe(hero);
    observer.observe(features);
  }

  // OFFCANVAS open/close → add menu-open + swap logo
  if (offcanvas) {
    offcanvas.addEventListener('show.bs.offcanvas', () => {
      document.body.classList.add('menu-open');
      logoImg.src = logoColor;
    });
    offcanvas.addEventListener('hide.bs.offcanvas', () => {
      document.body.classList.remove('menu-open');
      // restore based on scroll state
      if (navbar.classList.contains('light-bg') || navbar.classList.contains('dark-bg')) {
        logoImg.src = logoDark;
      } else {
        logoImg.src = logoWhite;
      }
    });
  }
});
