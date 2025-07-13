// main.js
document.addEventListener('DOMContentLoaded', function() {
    // --- Modal logic (unchanged, assuming a modal element is added later) ---
    // You would typically define the modal HTML in index.html for this to work.
    // For now, these listeners will simply not fire if #booking-modal doesn't exist.
    document.querySelectorAll('.cta-button, .btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            var modal = document.getElementById('booking-modal');
            if (modal) {
                e.preventDefault();
                modal.style.display = 'flex'; // Assuming flex for centered modal
                document.body.style.overflow = 'hidden';
            }
        });
    });

    var bookingModal = document.getElementById('booking-modal');
    if (bookingModal) {
        bookingModal.addEventListener('click', function(e) {
            if (e.target === this) { // Check if the click was directly on the modal overlay
                this.style.display = 'none';
                document.body.style.overflow = ''; // Restore scroll
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
    var logoWhiteUrl = "https://i.postimg.cc/mZcC64jS/palta-hub-logo-white-transparent.png";
    var logoDarkUrl = "https://i.postimg.cc/Fzy2TNc9/palta-hub-logo-transparent.png"; 

    if (navbar && hero && logoImg) { // Ensure all elements exist before adding listeners
        // Function to calculate the point where the navbar should change
        function getSwitchPoint() {
            // The point where the navbar should change is when its bottom edge
            // aligns with the bottom edge of the hero section.
            // Consider the navbar's height so the change happens *after* it leaves the hero.
            const heroRect = hero.getBoundingClientRect();
            // Calculate absolute position of the bottom of the hero section
            // This is safer than window.scrollY + rect.bottom which can be less precise
            return heroRect.bottom + window.scrollY - navbar.offsetHeight; 
        }

        // Function to update the navbar state
        function updateNavbar() {
            const currentScrollPos = window.scrollY;
            const switchPoint = getSwitchPoint();

            if (currentScrollPos < switchPoint) {
                // Navbar is over the hero section (or before the switch point)
                navbar.classList.remove('light-bg');
                if (logoImg.src !== logoWhiteUrl) { // Only change if different
                    logoImg.src = logoWhiteUrl;
                }
            } else {
                // Navbar has scrolled past the hero section
                navbar.classList.add('light-bg');
                if (logoImg.src !== logoDarkUrl) { // Only change if different
                    logoImg.src = logoDarkUrl;
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
