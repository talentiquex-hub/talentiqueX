/* ==========================================
   SCROLL ANIMATIONS - AOS (Animate On Scroll)
   ========================================== */

class ScrollAnimations {
    constructor() {
        this.animatedElements = [];
        this.init();
    }

    init() {
        // Select all elements that should be animated
        const elements = document.querySelectorAll(
            '.service-card, .feature-card, .portfolio-card, .testimonial-card, ' +
            '.timeline-item, .stat, section h2, section p'
        );

        elements.forEach(el => {
            el.classList.add('fade-in');
            el.style.opacity = '0';
            el.style.animationPlayState = 'paused';
            this.animatedElements.push(el);
        });

        this.observeElements();
    }

    observeElements() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        this.animatedElements.forEach(el => observer.observe(el));
    }

    animateElement(element) {
        // Determine animation type based on position
        const rect = element.getBoundingClientRect();
        
        if (rect.left > window.innerWidth / 2) {
            element.classList.remove('fade-in');
            element.classList.add('slide-in-right');
        } else {
            element.classList.remove('fade-in');
            element.classList.add('slide-in-left');
        }

        element.style.opacity = '1';
        element.style.animationPlayState = 'running';
    }
}

// Initialize scroll animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ScrollAnimations();
    });
} else {
    new ScrollAnimations();
}

/* ==========================================
   REVEAL ANIMATIONS ON SCROLL
   ========================================== */

class RevealOnScroll {
    constructor() {
        this.reveals = document.querySelectorAll('.reveal');
        this.observeReveals();
    }

    observeReveals() {
        const options = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        this.reveals.forEach(reveal => observer.observe(reveal));
    }
}

// Initialize reveal on scroll
document.addEventListener('DOMContentLoaded', () => {
    new RevealOnScroll();
});

/* ==========================================
   TEXT ANIMATION ON SCROLL
   ========================================== */

function animateTextOnScroll() {
    const textElements = document.querySelectorAll('.section-title, .hero-title');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateText(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    textElements.forEach(el => observer.observe(el));
}

function animateText(element) {
    const text = element.children;
    
    Array.from(text).forEach((char, index) => {
        char.style.animation = `fadeIn 0.5s ease-out ${index * 0.05}s forwards`;
    });
}

document.addEventListener('DOMContentLoaded', animateTextOnScroll);

/* ==========================================
   CARDS STAGGER ANIMATION
   ========================================== */

function staggerCardsAnimation() {
    const cardContainers = document.querySelectorAll(
        '.services-grid, .portfolio-grid, .testimonials-grid, .features-grid'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll(
                    '.service-card, .portfolio-card, .testimonial-card, .feature-card'
                );

                cards.forEach((card, index) => {
                    card.style.setProperty('--delay', index * 0.1 + 's');
                    card.classList.add('stagger-animation');
                });

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    cardContainers.forEach(container => observer.observe(container));
}

// Add stagger animation CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes staggerIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .stagger-animation {
        animation: staggerIn 0.6s ease-out var(--delay, 0s) forwards;
        opacity: 0;
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', staggerCardsAnimation);

/* ==========================================
   SCROLL PROGRESS BAR
   ========================================== */

function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #00d4ff, #00ff88);
        z-index: 2000;
        width: 0%;
        transition: width 0.1s ease;
    `;

    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

document.addEventListener('DOMContentLoaded', createScrollProgressBar);

/* ==========================================
   FLOAT UP ANIMATION FOR ELEMENTS
   ========================================== */

class FloatAnimation {
    constructor(selector = '.service-card, .feature-card') {
        this.elements = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        this.elements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
            el.classList.add('float-animation');
        });
    }
}

// Add float animation CSS
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes floatUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .float-animation {
        animation: floatUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) var(--delay, 0s) forwards;
    }
`;
document.head.appendChild(floatStyle);

document.addEventListener('DOMContentLoaded', () => {
    new FloatAnimation();
});

/* ==========================================
   MOUSE MOVE PARALLAX EFFECT
   ========================================== */

document.addEventListener('mousemove', (e) => {
    const blobs = document.querySelectorAll('.gradient-blob');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    blobs.forEach((blob, index) => {
        const moveX = mouseX * 50 * (index + 1);
        const moveY = mouseY * 50 * (index + 1);
        blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

/* ==========================================
   GSAP-LIKE SCROLL ANIMATION (No Dependencies)
   ========================================== */

function createFluidScroll() {
    let lastScrollTop = 0;
    const scrollElements = document.querySelectorAll('.timeline-item, .portfolio-card');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;

        scrollElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const elementDistance = elementCenter - window.innerHeight / 2;

            if (Math.abs(elementDistance) < window.innerHeight) {
                const perspective = 1 - Math.abs(elementDistance) / (window.innerHeight);
                element.style.opacity = Math.min(1, 0.3 + perspective);
            }
        });

        lastScrollTop = scrollTop;
    });
}

document.addEventListener('DOMContentLoaded', createFluidScroll);

/* ==========================================
   COUNTER ANIMATION WITH INTERSECTION OBSERVER
   ========================================== */

function initCounters() {
    const counters = document.querySelectorAll('.stat h3');
    let animated = false;

    const options = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                const counter = entry.target;
                const target = parseInt(counter.textContent);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, options);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

document.addEventListener('DOMContentLoaded', initCounters);

/* ==========================================
   SMOOTH PAGE LOAD ANIMATION
   ========================================== */

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading animation CSS
const loadStyle = document.createElement('style');
loadStyle.textContent = `
    body {
        opacity: 0;
    }

    body.loaded {
        animation: pageLoad 0.8s ease-out forwards;
    }

    @keyframes pageLoad {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(loadStyle);

/* ==========================================
   TILT EFFECT ON CARDS (HOVER)
   ========================================== */

class TiltCard {
    constructor(element) {
        this.element = element;
        this.init();
    }

    init() {
        this.element.addEventListener('mousemove', (e) => this.tilt(e));
        this.element.addEventListener('mouseleave', () => this.resetTilt());
    }

    tilt(e) {
        const rect = this.element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 5;
        const rotateY = ((centerX - x) / centerX) * 5;

        this.element.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.02)
        `;
    }

    resetTilt() {
        this.element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.service-card, .portfolio-card');
    cards.forEach(card => new TiltCard(card));
});
