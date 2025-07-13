// main.js
document.addEventListener('DOMContentLoaded', function() {
    // --- Modal logic (unchanged, assuming a modal element is added later) ---
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

    // Define your logo URLs clearly
    // Dark logo for light navbar background, white logo for dark navbar background
    var logoDarkUrl = "https://i.postimg.cc/Fzy2TNc9/palta-hub-logo-transparent.png"; 
    var logoWhiteUrl = "https://i.postimg.cc/mZcC64jS/palta-hub-logo-white-transparent.png";

    if (navbar && hero && logoImg) {
        // Function to calculate the point where the navbar should change
        function getSwitchPoint() {
            // The point where the navbar should change is when its bottom edge
            // aligns with the bottom edge of the hero section.
            // This ensures the navbar changes after it has fully cleared the hero.
            const heroRect = hero.getBoundingClientRect();
            return heroRect.bottom + window.scrollY - navbar.offsetHeight; 
        }

        // Function to update the navbar state
        function updateNavbar() {
            const currentScrollPos = window.scrollY;
            const switchPoint = getSwitchPoint();

            // Logic:
            // If current scroll position is *before* the switch point (i.e., over the hero or above it)
            // AND the hero is currently visible on screen (meaning we are in the 'dark' section)
            // OR if the hero is below the fold, but we are still scrolling through the dark hero area.
            // The condition below simplifies to: if we are within the bounds where the hero affects the navbar
            // (i.e., before the navbar has scrolled past the hero's bottom edge).
            if (currentScrollPos < switchPoint) {
                // Navbar is over the hero section (dark background area)
                navbar.classList.add('dark-mode'); // Add dark-mode class
                if (logoImg.src !== logoWhiteUrl) {
                    logoImg.src = logoWhiteUrl; // Use white logo
                }
            } else {
                // Navbar has scrolled past the hero section (over light background area)
                navbar.classList.remove('dark-mode'); // Remove dark-mode class (revert to default light)
                if (logoImg.src !== logoDarkUrl) {
                    logoImg.src = logoDarkUrl; // Use dark logo
                }
            }
        }

        // Initial call to set the correct state on load
        // This ensures the navbar starts correctly based on initial scroll position.
        updateNavbar();

        // Add event listeners for scroll and resize
        window.addEventListener('scroll', updateNavbar);
        window.addEventListener('resize', updateNavbar);
    }
});
