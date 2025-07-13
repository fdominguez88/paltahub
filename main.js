// main.js
document.addEventListener('DOMContentLoaded', function() {
    // --- Modal logic unchanged ---
    document.querySelectorAll('.cta-button, .btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            var modal = document.getElementById('booking-modal');
            if (modal) {
                e.preventDefault();
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    var bookingModal = document.getElementById('booking-modal');
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

    // --- Navbar background and logo swap on scroll ---
    var navbar = document.querySelector('.navbar');
    var hero = document.querySelector('.hero');
    var logoImg = navbar ? navbar.querySelector('.navbar-brand img') : null;

    // Define your logo URLs clearly:
    // This is the white logo (for dark navbar)
    var logoWhiteUrl = "https://i.postimg.cc/mZcC64jS/palta-hub-logo-white-transparent.png"; 
    // This is the dark (colored) logo (for light/white navbar)
    var logoDarkUrl = "https://i.postimg.cc/Fzy2TNc9/palta-hub-logo-transparent.png"; 

    if (navbar && hero && logoImg) {
        // Function to calculate the point where the navbar should change
        function getSwitchPoint() {
            // The navbar should change when its bottom edge aligns with the bottom of the hero section.
            const heroRect = hero.getBoundingClientRect();
            return heroRect.bottom + window.scrollY - navbar.offsetHeight; 
        }

        // Function to update the navbar state
        function updateNavbar() {
            const currentScrollPos = window.scrollY;
            const switchPoint = getSwitchPoint();

            // If current scroll position is *before* the switch point (i.e., over the hero section)
            if (currentScrollPos < switchPoint) {
                // Navbar is over the hero section (dark background area)
                navbar.classList.add('dark-mode'); // Add dark-mode class
                if (logoImg.src !== logoWhiteUrl) {
                    logoImg.src = logoWhiteUrl; // Use white logo for dark navbar
                }
            } else {
                // Navbar has scrolled past the hero section (over light background area)
                navbar.classList.remove('dark-mode'); // Remove dark-mode class (revert to default white)
                if (logoImg.src !== logoDarkUrl) {
                    logoImg.src = logoDarkUrl; // Use dark logo for white navbar
                }
            }
        }

        // Initial call to set the correct state on load
        updateNavbar();

        // Add event listeners for scroll and resize
        window.addEventListener('scroll', updateNavbar);
        window.addEventListener('resize', updateNavbar);
    }
});
