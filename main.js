// main.js
document.addEventListener('DOMContentLoaded', function() {
    // --- Modal logic unchanged and robust ---
    document.querySelectorAll('.cta-button, .btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            var modal = document.getElementById('booking-modal');
            if (modal) {
                e.preventDefault(); // Prevent default link/form submission
                modal.style.display = 'flex'; // Show the modal
                document.body.style.overflow = 'hidden'; // Prevent scrolling body when modal is open
            }
        });
    });

    var bookingModal = document.getElementById('booking-modal');
    if (bookingModal) {
        // Close modal when clicking outside content
        bookingModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = ''; // Restore body scrolling
            }
        });

        // Close modal on Escape key press
        document.addEventListener('keydown', function(e) {
            if (e.key === "Escape" && bookingModal.style.display === 'flex') {
                bookingModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // --- Glass navbar & logo swap on scroll ---
    var navbar = document.querySelector('.navbar');
    var hero = document.querySelector('.hero');
    var logoImg = navbar ? navbar.querySelector('.navbar-brand img') : null;

    // These are your actual logo URLs from your HTML
    var logoWhiteUrl = "https://i.postimg.cc/mZcC64jS/palta-hub-logo-white-transparent.png";
    var logoDarkUrl = "https://i.postimg.cc/Fzy2TNc9/palta-hub-logo-transparent.png"; 

    if (navbar && hero) {
        // Helper function to calculate the bottom edge of the hero section
        function heroEnd() {
            var rect = hero.getBoundingClientRect();
            // rect.bottom is relative to viewport. Add window.scrollY to get absolute document position.
            return rect.bottom + window.scrollY;
        }

        // Function to update navbar style based on scroll position
        function updateNavbar() {
            // The point at which the navbar should switch from dark to light background
            // This is the bottom of the hero section minus the height of the navbar itself
            var switchPoint = heroEnd() - navbar.offsetHeight;

            if (window.scrollY < switchPoint) {
                // If scroll position is above the switch point (still over hero)
                navbar.classList.remove('light-bg');
                if (logoImg) logoImg.src = logoWhiteUrl; // Show white logo
            } else {
                // If scroll position is below the switch point (over light background)
                navbar.classList.add('light-bg');
                if (logoImg) logoImg.src = logoDarkUrl; // Show dark logo
            }
        }

        // Initial check when the page loads
        updateNavbar();
        // Update navbar on scroll
        window.addEventListener('scroll', updateNavbar);
        // Update navbar on window resize (important for recalculating heroEnd and navbar.offsetHeight)
        window.addEventListener('resize', updateNavbar);
    }
});
