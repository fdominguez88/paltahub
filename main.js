document.addEventListener('DOMContentLoaded', () => {
  // 1) Scroll‑reveal
  const reveals = document.querySelectorAll('.fade-up');
  const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => revealObs.observe(el));

  // 2) Active‑link on scroll
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const id = e.target.id;
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (e.isIntersecting && link) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });
  sections.forEach(sec => sectionObs.observe(sec));

  // 3) Smooth scroll (if you remove Bootstrap JS)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(a.getAttribute('href'))
        .scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 4) Hero form submit
  document.querySelector('.hero-form').addEventListener('submit', e => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    if (email.includes('@')) {
      alert('Thanks! We’ll be in touch soon.');
      e.target.reset();
    } else {
      alert('Please enter a valid email.');
    }
  });
});
