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

    // --- Glass navbar & logo swap on scroll ---
    var navbar = document.querySelector('.navbar');
    var hero = document.querySelector('.hero');
    var logoImg = navbar ? navbar.querySelector('.navbar-brand img') : null;

    // Put your actual logo URLs here:
    var logoWhiteUrl = "https://i.postimg.cc/mZcC64jS/palta-hub-logo-white-transparent.png";
    var logoDarkUrl = "YOUR_DARK_LOGO_URL_HERE"; // Put your dark logo or colored logo URL here

    if (navbar && hero) {
        // Helper: how far from top is bottom of hero?
        function heroEnd() {
            var rect = hero.getBoundingClientRect();
            return rect.bottom + window.scrollY;
        }

        function updateNavbar() {
            // If nav is over hero (dark): glass + white
            // If nav is over light bg: .light-bg (white)
            var switchPoint = heroEnd() - navbar.offsetHeight;

            if (window.scrollY < switchPoint) {
                navbar.classList.remove('light-bg');
                if (logoImg) logoImg.src = logoWhiteUrl;
            } else {
                navbar.classList.add('light-bg');
                if (logoImg) logoImg.src = logoDarkUrl;
            }
        }

        updateNavbar();
        window.addEventListener('scroll', updateNavbar);
        window.addEventListener('resize', updateNavbar);
    }
});
