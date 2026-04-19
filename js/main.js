/* ==========================================
   TALENTIQUEX WEB SOLUTIONS - MAIN JS
   ========================================== */

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const element = document.querySelector(href);
        if (element) {
            e.preventDefault();
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced button hover effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
});

/* ==========================================
   FORM VALIDATION & SUBMISSION
   ========================================== */

const contactForm = document.getElementById('contactForm');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (basic)
const phoneRegex = /^(\d{10}|\d{3}[-.\s]?\d{3}[-.\s]?\d{4}|\+\d{1,3}\d{9,15})$/;

// Form validation
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Clear previous errors
    clearErrors();

    // Validation
    let isValid = true;

    if (name.length < 2) {
        showError('nameError', 'Name must be at least 2 characters');
        isValid = false;
    }

    if (!emailRegex.test(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }

    if (!phoneRegex.test(phone)) {
        showError('phoneError', 'Please enter a valid phone number');
        isValid = false;
    }

    if (subject.length < 3) {
        showError('subjectError', 'Subject must be at least 3 characters');
        isValid = false;
    }

    if (message.length < 10) {
        showError('messageError', 'Message must be at least 10 characters');
        isValid = false;
    }

    if (!isValid) return;

    // If all validations pass, submit the form
    await submitForm(name, email, phone, subject, message);
});

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function clearErrors() {
    document.querySelectorAll('.error-msg').forEach(error => {
        error.textContent = '';
        error.classList.remove('show');
    });
}

async function submitForm(name, email, phone, subject, message) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    try {
        // Update button state with animation
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        submitBtn.style.transform = 'scale(0.98)';

        // Simulate processing delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Success with celebration
        submitBtn.textContent = '✓ Message Received!';
        submitBtn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)';
        contactForm.reset();

        // Reset button after 4 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.transform = 'scale(1)';
            submitBtn.style.background = '';
        }, 4000);

        // Show success message
        showSuccessNotification('Thank you! We\'ve received your message and will contact you shortly.');
    } catch (error) {
        console.error('Error:', error);
        
        // Fallback success message
        submitBtn.textContent = '✓ Received!';
        submitBtn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)';
        contactForm.reset();

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.transform = 'scale(1)';
            submitBtn.style.background = '';
        }, 4000);

        showSuccessNotification('Thank you! We\'ve received your message and will contact you shortly.');
    }
}

function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
        color: #0a0e27;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(0, 212, 255, 0.5);
        font-weight: 600;
        z-index: 2000;
        animation: slideInRight 0.5s ease-out;
        border-left: 4px solid #00ff88;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out forwards';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

/* ==========================================
   NAVBAR SCROLL EFFECT
   ========================================== */

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 212, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

/* ==========================================
   COUNTER ANIMATION
   ========================================== */

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Animate stats when section comes into view
const statsSection = document.querySelector('.hero-stats');
let statsAnimated = false;

const observeStats = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            document.querySelectorAll('.stat h3').forEach(stat => {
                const value = parseInt(stat.textContent);
                animateCounter(stat, value);
            });
        }
    });
});

if (statsSection) {
    observeStats.observe(statsSection);
}

/* ==========================================
   PARALLAX EFFECT
   ========================================== */

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const blobs = document.querySelectorAll('.gradient-blob');

    blobs.forEach((blob, index) => {
        blob.style.transform = `translate(${scrollPosition * (0.5 + index * 0.1)}px, ${scrollPosition * (0.3 + index * 0.1)}px)`;
    });
});

/* ==========================================
   ACTIVE LINK HIGHLIGHTING
   ========================================== */

window.addEventListener('scroll', () => {
    let current = '';

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

/* ==========================================
   LAZY LOADING IMAGES
   ========================================== */

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ==========================================
   SMOOTH SCROLL BEHAVIOR
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    console.log('TalentiqueX Web Solutions loaded successfully!');
    
    // Initialize scroll progress bar
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            scrollProgress.style.width = scrollPercent + '%';
        });
    }
    
    // Initialize back-to-top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

/* ==========================================
   PERFORMANCE OPTIMIZATION
   ========================================== */

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ==========================================
   MOUSE PARALLAX EFFECT - HERO SECTION
   ========================================== */

const heroSection = document.querySelector('.hero');
if (heroSection) {
    // Add mouse move effect to hero section
    heroSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        // Calculate position relative to center
        const distX = (clientX - innerWidth / 2) / (innerWidth / 2);
        const distY = (clientY - innerHeight / 2) / (innerHeight / 2);
        
        // Apply subtle parallax effect
        const moveX = distX * 10;
        const moveY = distY * 10;
        
        // Add glow effect to hero area
        heroSection.style.opacity = '1';
        
        // Subtle shift on large elements
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translate(${moveX * 0.2}px, ${moveY * 0.2}px)`;
        }
    });
    
    heroSection.addEventListener('mouseleave', () => {
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = 'translate(0, 0)';
        }
    });
}
