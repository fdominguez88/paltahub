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

  // 1) Transparent ↔ frosted-white at hero boundary
  // 2) Frosted-white ↔ solid-dark at features boundary
  if (navbar && hero && features) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // hero boundary
        if (entry.target === hero) {
          if (entry.isIntersecting) {
            navbar.classList.remove('light-bg', 'dark-bg');
            logoImg.src = logoWhite;
          } else {
            navbar.classList.add('light-bg');
            logoImg.src = logoDark;
          }
        }
        // features boundary
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

  // OFFCANVAS open/close → add menu-open backdrop & swap logo
  if (offcanvas) {
    offcanvas.addEventListener('show.bs.offcanvas', () => {
      document.body.classList.add('menu-open');
      logoImg.src = logoColor;
    });
    offcanvas.addEventListener('hide.bs.offcanvas', () => {
      document.body.classList.remove('menu-open');
      // restore logo based on current navbar state
      if (navbar.classList.contains('dark-bg') || navbar.classList.contains('light-bg')) {
        logoImg.src = logoDark;
      } else {
        logoImg.src = logoWhite;
      }
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const hero   = document.querySelector('.hero');

  if (!navbar || !hero) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navbar.classList.remove('frosted');
        } else {
          navbar.classList.add('frosted');
        }
      });
    },
    {
      // when the hero scrolls completely out of view (minus navbar height)
      rootMargin: `-${navbar.offsetHeight}px 0 0 0`,
      threshold: 0
    }
  );

  observer.observe(hero);
});
