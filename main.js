document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll effects
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    const logoImg = navbar?.querySelector('.navbar-brand img');

    // Logo URLs
    const logoWhiteUrl = "https://i.postimg.cc/mZcC64jS/palta-hub-logo-white-transparent.png";
    const logoDarkUrl = "https://i.postimg.cc/Fzy2TNc9/palta-hub-logo-transparent.png";

    if (navbar && hero && logoImg) {
        function updateNavbar() {
            const heroRect = hero.getBoundingClientRect();
            const switchPoint = heroRect.bottom - navbar.offsetHeight;

            if (window.scrollY < switchPoint) {
                navbar.classList.remove('light-bg');
                logoImg.src = logoWhiteUrl;
            } else {
                navbar.classList.add('light-bg');
                logoImg.src = logoDarkUrl;
            }
        }

        // Initial call and event listeners
        updateNavbar();
        window.addEventListener('scroll', updateNavbar);
        window.addEventListener('resize', updateNavbar);
    }

    // CTA button interactions
    document.querySelectorAll('.btn-accent, .btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const modal = document.getElementById('booking-modal');
            if (modal) {
                e.preventDefault();
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Modal handling
    const bookingModal = document.getElementById('booking-modal');
    if (bookingModal) {
        bookingModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === "Escape" && bookingModal.style.display === 'flex') {
                bookingModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form submission handling
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Basic email validation
            if (email && email.includes('@')) {
                // Here you would typically send the data to your server
                console.log('Email submitted:', email);
                alert('Thank you for your interest! We\'ll be in touch soon.');
                this.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    });
});
</parameter>
