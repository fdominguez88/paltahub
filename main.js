// IntersectionObserver for navbar light/dark swap
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const hero   = document.querySelector('.hero');
  const logo   = navbar.querySelector('.navbar-brand img');
  const logoWhite = 'https://i.postimg.cc/mZcC64jS/palta-hub-logo-white-transparent.png';
  const logoDark  = 'https://i.postimg.cc/Fzy2TNc9/palta-hub-logo-transparent.png';

  if (navbar && hero) {
    new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          navbar.classList.remove('light-bg');
          logo.src = logoWhite;
        } else {
          navbar.classList.add('light-bg');
          logo.src = logoDark;
        }
      },
      { rootMargin: `-${navbar.offsetHeight}px 0 0 0`, threshold: 0 }
    ).observe(hero);
  }

  // Toggle backdrop blur when menu opens/closes
  const collapseEl = document.getElementById('mainNavbar');
  collapseEl.addEventListener('show.bs.collapse', () => {
    document.body.classList.add('menu-open');
  });
  collapseEl.addEventListener('hide.bs.collapse', () => {
    document.body.classList.remove('menu-open');
  });
});
