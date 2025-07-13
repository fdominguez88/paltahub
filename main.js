// IntersectionObserver for three-state navbar (transparent → frosted white → solid dark)
document.addEventListener('DOMContentLoaded', () => {
  const navbar    = document.querySelector('.navbar');
  const logoImg   = navbar.querySelector('.navbar-brand img');
  const hero      = document.querySelector('.hero');
  const features  = document.getElementById('features');
  const logoWhite = 'https://i.postimg.cc/mZcC64jS/palta-hub-logo-white-transparent.png';
  const logoDark  = 'https://i.postimg.cc/Fzy2TNc9/palta-hub-logo-transparent.png';

  if (navbar && hero && features) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // 1) Transparent ↔ frosted-white toggle at hero boundary
        if (entry.target === hero) {
          if (entry.isIntersecting) {
            navbar.classList.remove('light-bg', 'dark-bg');
            logoImg.src = logoWhite;
          } else {
            navbar.classList.add('light-bg');
            logoImg.src = logoDark;
          }
        }
        // 2) Frosted-white → solid-dark toggle at features boundary
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
      rootMargin: `-${navbar.offsetHeight}px 0px 0px 0px`,
      threshold: 0
    });

    observer.observe(hero);
    observer.observe(features);
  }

  // Toggle mobile‐sheet backdrop blur
  const collapseEl = document.getElementById('mainNavbar');
  if (collapseEl) {
    collapseEl.addEventListener('show.bs.collapse', () => {
      document.body.classList.add('menu-open');
    });
    collapseEl.addEventListener('hide.bs.collapse', () => {
      document.body.classList.remove('menu-open');
    });
  }
});
