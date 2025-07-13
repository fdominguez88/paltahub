// main.js

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const hero = document.querySelector('.hero');
  const logoImg = navbar.querySelector('img');
  const logoWhiteUrl = 'https://i.postimg.cc/mZcC64jS/palta-hub-logo-white-transparent.png';
  const logoDarkUrl = 'https://i.postimg.cc/Fzy2TNc9/palta-hub-logo-transparent.png';

  if (navbar && hero) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          navbar.classList.remove('light-bg');
          logoImg.src = logoWhiteUrl;
        } else {
          navbar.classList.add('light-bg');
          logoImg.src = logoDarkUrl;
        }
      },
      { rootMargin: `-${navbar.offsetHeight}px 0px 0px 0px`, threshold: 0 }
    );
    observer.observe(hero);
  }
});
