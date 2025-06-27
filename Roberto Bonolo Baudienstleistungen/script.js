// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Animated hamburger
hamburger.addEventListener('click', function() {
    const spans = this.querySelectorAll('span');
    if (this.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(9px, 9px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        // Reset hamburger
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Industrial scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add construction-style reveal effect
            if (entry.target.classList.contains('service-card')) {
                entry.target.style.borderTop = '6px solid #ffa726';
                setTimeout(() => {
                    entry.target.style.borderTop = '6px solid #ff5722';
                }, 300);
            }
        }
    });
}, observerOptions);

// Elements to animate with staggered timing
const animateElements = document.querySelectorAll('.service-card, .feature-item, .contact-item');
animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
    observer.observe(el);
});

// Rotating construction icon animation
const heroImage = document.querySelector('.hero-image .image-placeholder');
if (heroImage) {
    let rotation = 45;
    setInterval(() => {
        rotation += 0.5;
        heroImage.style.transform = `rotate(${rotation}deg)`;
    }, 100);
}

// Contact form with construction-style validation
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Construction-style loading indicator
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'VERARBEITUNG...';
        submitBtn.style.background = '#37474f';
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // Simulate processing time
        setTimeout(() => {
            // Basic validation
            if (!name || !email || !message) {
                alert('ACHTUNG: Alle Pflichtfelder müssen ausgefüllt werden!');
                submitBtn.textContent = originalText;
                submitBtn.style.background = '#ff5722';
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('FEHLER: Ungültige E-Mail-Adresse!');
                submitBtn.textContent = originalText;
                submitBtn.style.background = '#ff5722';
                return;
            }
            
            // Success message
            alert('AUFTRAG ERHALTEN! Wir melden uns binnen 24 Stunden bei Ihnen.');
            
            // Reset form
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.style.background = '#ff5722';
        }, 1500);
    });
}

// Industrial navbar effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = '#1a1a1a';
        navbar.style.borderBottom = '4px solid #ffa726';
    } else {
        navbar.style.background = '#263238';
        navbar.style.borderBottom = '4px solid #ff5722';
    }
});

// Service card industrial hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, #455a64, #37474f)';
        this.style.borderTop = '6px solid #ffa726';
        
        // Add construction beam effect
        const beam = document.createElement('div');
        beam.style.position = 'absolute';
        beam.style.top = '0';
        beam.style.left = '0';
        beam.style.width = '100%';
        beam.style.height = '2px';
        beam.style.background = 'linear-gradient(90deg, transparent, #ffa726, transparent)';
        beam.style.animation = 'beam-scan 1s ease-in-out';
        this.appendChild(beam);
        
        setTimeout(() => beam.remove(), 1000);
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.background = '#37474f';
        this.style.borderTop = '6px solid #ff5722';
    });
});

// Add industrial sound effect simulation (visual feedback)
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create multiple ripple effects for industrial feel
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height) * (1 + i * 0.2);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('industrial-ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 800);
            }, i * 100);
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Construction progress bar effect
const progressBars = document.querySelectorAll('.feature-item');
progressBars.forEach((item, index) => {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'absolute';
    progressBar.style.bottom = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '4px';
    progressBar.style.background = '#ff5722';
    progressBar.style.width = '0%';
    progressBar.style.transition = 'width 2s ease';
    item.style.position = 'relative';
    item.appendChild(progressBar);
    
    // Animate progress bar when item is visible
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    progressBar.style.width = '100%';
                }, index * 200);
            }
        });
    });
    
    progressObserver.observe(item);
});

// Add CSS for industrial animations
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .industrial-ripple {
        position: absolute;
        border-radius: 0;
        background: rgba(255, 167, 38, 0.3);
        transform: scale(0);
        animation: industrial-ripple-animation 0.8s linear;
        pointer-events: none;
        border: 1px solid rgba(255, 167, 38, 0.5);
    }
    
    @keyframes industrial-ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes beam-scan {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(9px, 9px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style); 