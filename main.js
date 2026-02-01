document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Sent!';
            btn.style.backgroundColor = '#72BF44';
            btn.style.color = '#fff';

            setTimeout(() => {
                contactForm.reset();
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
                btn.style.color = '';
            }, 3000);
        });
    }

    // Leaflet Map Initialization
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        // Initialize map centered on India
        const map = L.map('map', {
            center: [22.0, 78.9629], // Geographic center of India
            zoom: 5,
            scrollWheelZoom: false,
            zoomControl: false
        });

        // Add Zoom Control to bottom right
        L.control.zoom({
            position: 'bottomright'
        }).addTo(map);

        // Add CartoDB Voyager tiles (Lighter, clean aesthetic)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

        // Custom Logo Pin (No Pulse)
        const logoIcon = L.divIcon({
            className: 'custom-logo-icon',
            html: `
                <div class="logo-pin-wrapper">
                    <img src="images/mnemonic_logo.png"  style="height: 25px; width: auto;" alt="Pin">
                </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20]
        });

        // Locations Data
        const locations = [
            {
                name: "New Delhi (DEL)",
                airport: "Indira Gandhi International Airport",
                coords: [28.5562, 77.1000],
                desc: ""
            },
            {
                name: "Hyderabad (HYD)",
                airport: "Rajiv Gandhi International Airport",
                coords: [17.2403, 78.4294],
                desc: ""
            },
            {
                name: "North Goa,Mopa (GOX)",
                airport: "Manohar International Airport",
                coords: [15.7661, 73.8681],
                desc: ""
            }
        ];

        // Add Markers to Map
        locations.forEach(loc => {
            const marker = L.marker(loc.coords, { icon: logoIcon }).addTo(map);

            const popupContent = `
                <div class="popup-content">
                    <h4>${loc.name}</h4>
                    <p><strong>${loc.airport}</strong></p>
                    <p>${loc.desc}</p>
                </div>
            `;

            marker.bindPopup(popupContent, {
                maxWidth: 250,
                className: 'custom-popup'
            });

            // Hover effects
            marker.on('mouseover', function (e) {
                this.openPopup();
            });
        });

        // Responsive Map Centering
        window.addEventListener('resize', () => {
            map.invalidateSize();
        });
    }
});
