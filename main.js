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
    var featuresSection = document.getElementById('features');
    var callToAction = document.querySelector('.call-to-action');
    var footer = document.querySelector('footer'); // Assuming footer is also dark
    var logoImg = navbar ? navbar.querySelector('.navbar-brand img') : null;

    // Define your logo URLs clearly:
    var logoWhiteUrl = "https://i.postimg.cc/mZcC64jS/palta-hub-logo-white-transparent.png"; // White logo for dark backgrounds
    var logoDarkUrl = "https://i.postimg.cc/Fzy2TNc9/palta-hub-logo-transparent.png"; // Dark (colored) logo for light backgrounds

    if (navbar && logoImg) { // Hero, features, cta, footer might be null on other pages
        function updateNavbar() {
            const currentScrollPos = window.scrollY;
            const navbarHeight = navbar.offsetHeight;

            // Get positions of sections that should trigger dark navbar mode
            // We use clientRect.top + window.scrollY for absolute position from top of document
            const featuresTop = featuresSection ? featuresSection.getBoundingClientRect().top + window.scrollY : Infinity;
            const featuresBottom = featuresSection ? featuresSection.getBoundingClientRect().bottom + window.scrollY : Infinity;
            
            const callToActionTop = callToAction ? callToAction.getBoundingClientRect().top + window.scrollY : Infinity;
            const callToActionBottom = callToAction ? callToAction.getBoundingClientRect().bottom + window.scrollY : Infinity;

            const footerTop = footer ? footer.getBoundingClientRect().top + window.scrollY : Infinity;
            const footerBottom = footer ? footer.getBoundingClientRect().bottom + window.scrollY : Infinity;

            // Determine if the navbar is currently over a "dark" background section
            // The navbar top edge should be considered
            const navbarTop = currentScrollPos;

            let isNavbarOverDarkSection = false;

            // Check if navbar is over the features section
            if (navbarTop + navbarHeight > featuresTop && navbarTop < featuresBottom) {
                isNavbarOverDarkSection = true;
            }
            // Check if navbar is over the call-to-action section
            if (navbarTop + navbarHeight > callToActionTop && navbarTop < callToActionBottom) {
                isNavbarOverDarkSection = true;
            }
            // Check if navbar is over the footer section
            if (navbarTop + navbarHeight > footerTop && navbarTop < footerBottom) {
                isNavbarOverDarkSection = true;
            }

            // Apply/remove dark-mode class and swap logo
            if (isNavbarOverDarkSection) {
                navbar.classList.add('dark-mode');
                if (logoImg.src !== logoWhiteUrl) {
                    logoImg.src = logoWhiteUrl;
                }
            } else {
                navbar.classList.remove('dark-mode');
                if (logoImg.src !== logoDarkUrl) {
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
