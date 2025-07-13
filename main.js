// main.js

document.addEventListener('DOMContentLoaded', () => {
  // Modal logic unchanged...

  // Improved navbar color/theme switch using IntersectionObserver
  const navbar = document.querySelector('.navbar');
  const hero   = document.querySelector('.hero');
  const logoImg = navbar.querySelector('.navbar-brand img');
  const whiteLogo = 'https://i.postimg.cc/mZcC64jS/palta-hub-logo-white-transparent.png';
  const darkLogo  = 'https://i.postimg.cc/Fzy2TNc9/palta-hub-logo-transparent.png';

  if (navbar && hero) {
    // Observe hero bottom to toggle .light-bg
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          navbar.classList.remove('light-bg');
          logoImg.src = whiteLogo;
        } else {
          navbar.classList.add('light-bg');
          logoImg.src = darkLogo;
        }
      }, {
        rootMargin: `-${navbar.offsetHeight}px 0px 0px 0px`,
        threshold: 0
      }
    );
    observer.observe(hero);
  }
});
