// ===== DOM ELEMENTS =====
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const allNavLinks = document.querySelectorAll('.nav-link');
const planToggle = document.getElementById('planToggle');
const monthlyLabel = document.getElementById('monthlyLabel');
const annualLabel = document.getElementById('annualLabel');
const toast = document.getElementById('toast');
const waFloat = document.getElementById('waFloat');

// ===== SCROLL PROGRESS BAR =====
const progressBar = document.createElement('div');
progressBar.classList.add('scroll-progress');
document.body.appendChild(progressBar);

// ===== HEADER SCROLL EFFECT + PROGRESS =====
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);

    // WhatsApp floating button visibility
    if (waFloat) {
        waFloat.classList.toggle('visible', window.scrollY > 400);
    }

    // Progress bar
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// ===== MOBILE NAV =====
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            allNavLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===== STAT COUNTER ANIMATION =====
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        function update() {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(update);
            } else {
                stat.textContent = target.toLocaleString();
            }
        }
        update();
    });
}

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.getElementById('hero');
if (heroSection) heroObserver.observe(heroSection);

// ==================================================
// SCROLL REVEAL — MULTIPLE ANIMATION TYPES
// ==================================================
function initScrollAnimations() {
    // Section headers — fade in + slide up
    document.querySelectorAll('.section-header').forEach(el => {
        el.classList.add('scroll-animate', 'anim-fade-up');
    });

    // Section tags
    document.querySelectorAll('.section-tag').forEach(el => {
        el.classList.add('scroll-animate', 'anim-zoom-in');
    });

    // Sede cards — staggered slide-up
    document.querySelectorAll('.sede-card').forEach((el, i) => {
        el.classList.add('scroll-animate', 'anim-fade-up');
        el.style.transitionDelay = `${(i % 3) * 120}ms`;
    });

    // Plan cards — staggered scale-up
    document.querySelectorAll('.plan-card').forEach((el, i) => {
        el.classList.add('scroll-animate', 'anim-scale-up');
        el.style.transitionDelay = `${i * 150}ms`;
    });

    // Service slides already handled by carousel

    // Testimonio section
    document.querySelectorAll('.testimonios-carousel').forEach(el => {
        el.classList.add('scroll-animate', 'anim-fade-up');
    });

    // Contact items
    document.querySelectorAll('.contacto-info').forEach(el => {
        el.classList.add('scroll-animate', 'anim-slide-left');
    });
    document.querySelectorAll('.whatsapp-card').forEach(el => {
        el.classList.add('scroll-animate', 'anim-slide-right');
    });

    // Info items — staggered
    document.querySelectorAll('.info-item').forEach((el, i) => {
        el.classList.add('scroll-animate', 'anim-fade-up');
        el.style.transitionDelay = `${i * 100}ms`;
    });

    // Finder card
    document.querySelectorAll('.finder-card').forEach(el => {
        el.classList.add('scroll-animate', 'anim-fade-up');
    });

    // Footer columns
    document.querySelectorAll('.footer-brand, .footer-links-col').forEach((el, i) => {
        el.classList.add('scroll-animate', 'anim-fade-up');
        el.style.transitionDelay = `${i * 80}ms`;
    });

    // Now observe all scroll-animate elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
}

initScrollAnimations();

// Also keep data-aos for backward compatibility
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('[data-aos]').forEach((el, index) => {
    el.style.transitionDelay = `${(index % 4) * 100}ms`;
    revealObserver.observe(el);
});

// ===== PARALLAX EFFECT ON HERO =====
const heroBg = document.querySelector('.hero-bg-image');
if (heroBg) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroBg.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
        }
    });
}

// ===== PLAN TOGGLE (MONTHLY / ANNUAL) =====
planToggle.addEventListener('change', () => {
    const isAnnual = planToggle.checked;
    monthlyLabel.classList.toggle('active', !isAnnual);
    annualLabel.classList.toggle('active', isAnnual);
    document.querySelectorAll('.monthly-price').forEach(el => {
        el.style.display = isAnnual ? 'none' : 'inline';
    });
    document.querySelectorAll('.annual-price').forEach(el => {
        el.style.display = isAnnual ? 'inline' : 'none';
    });
});

// ===== TESTIMONIALS (Migrated to Grid - No JS needed) =====
// The testimonial carousel was removed in favor of a responsive CSS grid block.

// ===== HERO PARTICLES =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (4 + Math.random() * 4) + 's';
        const colors = ['#ff6b35', '#a855f7', '#00b894', '#fdcb6e'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}
createParticles();

// ========================================
// SERVICES CAROUSEL — SIMPLE & ROBUST
// ========================================
(function () {
    const track = document.getElementById('carouselTrack');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const indicatorsContainer = document.getElementById('carouselIndicators');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;

    // Create indicator dots
    indicatorsContainer.innerHTML = '';
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        indicatorsContainer.appendChild(dot);
    });

    function goTo(index) {
        currentIndex = Math.max(0, Math.min(index, slides.length - 1));

        // Calculate simple offset: slide i * slideWidth
        const slideEl = slides[currentIndex];
        const trackRect = track.getBoundingClientRect();
        const slideRect = slideEl.getBoundingClientRect();
        const containerW = track.parentElement.offsetWidth;

        // Position: center the target slide in the container
        const slideLeft = slideEl.offsetLeft;
        const slideW = slideEl.offsetWidth;
        let targetOffset = slideLeft - (containerW / 2) + (slideW / 2);

        // Clamp
        const maxOffset = track.scrollWidth - containerW;
        targetOffset = Math.max(0, Math.min(targetOffset, maxOffset));

        track.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
        track.style.transform = `translateX(${-targetOffset}px)`;

        // Update active states
        slides.forEach((s, i) => s.classList.toggle('active', i === currentIndex));

        // Update indicators
        const allDots = indicatorsContainer.querySelectorAll('.carousel-dot');
        allDots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));

        // Arrow states
        prevBtn.style.opacity = currentIndex === 0 ? '0.35' : '1';
        prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        nextBtn.style.opacity = currentIndex === slides.length - 1 ? '0.35' : '1';
        nextBtn.style.pointerEvents = currentIndex === slides.length - 1 ? 'none' : 'auto';
    }

    // Arrow buttons
    prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
    nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

    // Drag support
    function getX(e) {
        return e.touches ? e.touches[0].clientX : e.clientX;
    }

    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = getX(e);
        track.style.transition = 'none';
        track.style.cursor = 'grabbing';
    });

    track.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = getX(e);
        track.style.transition = 'none';
    }, { passive: true });

    const onMove = (e) => {
        if (!isDragging) return;
        // Just track movement, we'll snap on end
    };

    const onEnd = (e) => {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = 'grab';

        const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const diff = endX - startX;
        const threshold = 50;

        if (diff < -threshold && currentIndex < slides.length - 1) {
            goTo(currentIndex + 1);
        } else if (diff > threshold && currentIndex > 0) {
            goTo(currentIndex - 1);
        } else {
            goTo(currentIndex); // Snap back
        }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    track.addEventListener('touchmove', onMove, { passive: true });
    track.addEventListener('touchend', onEnd);

    // Prevent image drag
    track.addEventListener('dragstart', e => e.preventDefault());

    // Keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
        if (e.key === 'ArrowRight') goTo(currentIndex + 1);
    });

    // Init — use setTimeout to ensure layout is computed
    setTimeout(() => goTo(0), 50);
    window.addEventListener('resize', () => goTo(currentIndex));
})();

// ========================================
// GEOLOCATION — FIND NEAREST SEDE
// ========================================
const findNearestBtn = document.getElementById('findNearestBtn');
const finderResult = document.getElementById('finderResult');
const nearestName = document.getElementById('nearestName');
const nearestAddress = document.getElementById('nearestAddress');
const nearestDistance = document.getElementById('nearestDistance');

const sedesData = [
    { name: 'Copil Centro', address: 'Av. Principal 1234, Centro', lat: 19.4326, lng: -99.1332 },
    { name: 'Copil Norte', address: 'Calle Norte 567, Zona Norte', lat: 19.5000, lng: -99.1500 },
    { name: 'Copil Sur', address: 'Blvd. Sur 890, Zona Sur', lat: 19.3600, lng: -99.1400 },
    { name: 'Copil Este', address: 'Av. Oriental 321, Zona Este', lat: 19.4200, lng: -99.0800 },
    { name: 'Copil Oeste', address: 'Calle Oeste 654, Zona Oeste', lat: 19.4400, lng: -99.2100 },
];

function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

findNearestBtn.addEventListener('click', () => {
    const btn = findNearestBtn;
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span>Buscando...</span>';
    btn.style.opacity = '0.7';
    btn.style.pointerEvents = 'none';

    if (!navigator.geolocation) {
        alert('Tu navegador no soporta geolocalización.');
        btn.innerHTML = originalHTML;
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            let minDist = Infinity;
            let closest = null;
            let closestIndex = -1;

            sedesData.forEach((sede, i) => {
                const dist = haversineDistance(userLat, userLng, sede.lat, sede.lng);
                if (dist < minDist) {
                    minDist = dist;
                    closest = sede;
                    closestIndex = i;
                }
            });

            nearestName.textContent = closest.name;
            nearestAddress.textContent = '📍 ' + closest.address;
            nearestDistance.textContent = `📏 A ${minDist.toFixed(1)} km de ti`;
            finderResult.style.display = 'block';

            const sedeCards = document.querySelectorAll('.sede-card');
            sedeCards.forEach(c => c.classList.remove('nearest'));
            if (sedeCards[closestIndex]) {
                sedeCards[closestIndex].classList.add('nearest');
                sedeCards[closestIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            btn.innerHTML = originalHTML;
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
        },
        (error) => {
            let msg = 'No se pudo obtener tu ubicación.';
            if (error.code === 1) msg = 'Permiso de ubicación denegado. Actívalo en tu navegador.';
            alert(msg);
            btn.innerHTML = originalHTML;
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========================================
// SCHEDULE TABS LOGIC
// ========================================
const tabBtns = document.querySelectorAll('.tab-btn');
const scheduleContents = document.querySelectorAll('.schedule-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        scheduleContents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Show corresponding schedule
        const day = btn.getAttribute('data-day');
        document.getElementById(day).classList.add('active');
    });
});

// ========================================
// BMI CALCULATOR LOGIC
// ========================================
const bmiForm = document.getElementById('bmiForm');
const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const bmiScore = document.getElementById('bmiScore');
const bmiText = document.getElementById('bmiText');

if (bmiForm) {
    bmiForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const heightInMeters = parseFloat(heightInput.value) / 100;
        const weight = parseFloat(weightInput.value);

        if (heightInMeters > 0 && weight > 0) {
            const bmi = weight / (heightInMeters * heightInMeters);
            bmiScore.textContent = bmi.toFixed(1);

            let category = '';
            let message = '';
            let color = '';

            if (bmi < 18.5) {
                category = 'Bajo peso';
                message = 'Te recomendamos nuestro plan de Hipertrofia y Nutrición.';
                color = '#00e5ff'; // Cyan
            } else if (bmi >= 18.5 && bmi <= 24.9) {
                category = 'Peso Normal';
                message = '¡Excelente! Mantente en forma con nuestras clases funcionales.';
                color = '#00e676'; // Green
            } else if (bmi >= 25 && bmi <= 29.9) {
                category = 'Sobrepeso';
                message = 'El Plan Premium con rutinas HIIT es ideal para ti.';
                color = '#ff9800'; // Orange
            } else {
                category = 'Obesidad';
                message = 'Nuestros entrenadores personales diseñarán un plan seguro para ti.';
                color = '#f44336'; // Red
            }

            bmiText.innerHTML = `<h3 style="color:${color};">${category}</h3><p>${message}</p>`;
        }
    });
}

// ========================================
// FAQ ACCORDION LOGIC
// ========================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all items
        faqItems.forEach(faq => {
            faq.classList.remove('active');
            faq.querySelector('.faq-answer').style.maxHeight = null;
        });

        // If it wasn't active, open it
        if (!isActive) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});
