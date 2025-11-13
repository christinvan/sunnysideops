// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = mobileToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Smooth Scroll Navigation with Active Link Highlighting
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

// Close mobile menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Highlight active section in navigation
window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Newsletter Form Handling
const newsletterForm = document.getElementById('newsletter-form');
newsletterForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    const button = e.target.querySelector('button');
    const originalText = button.textContent;
    
    // Animate button
    button.textContent = 'Subscribing...';
    button.classList.add('loading');
    
    // Submit to Formspree (replace YOUR-FORM-ID with your actual Formspree ID)
    try {
        const response = await fetch('https://formspree.io/f/YOUR-FORM-ID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        });
        
        if (response.ok) {
            button.textContent = '✨ You\'re on the list!';
            button.classList.remove('loading');
            button.style.background = '#22c55e';
        
        // Show success message
        const successMessage = document.createElement('p');
        successMessage.textContent = 'Welcome to the Sunnyside family! Check your inbox for a confirmation email.';
        successMessage.style.color = 'var(--white)';
        successMessage.style.marginTop = '1rem';
        successMessage.style.animation = 'slideUp 0.5s ease-out';
        e.target.appendChild(successMessage);
        
        // Reset after delay
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            e.target.reset();
            successMessage.remove();
        }, 5000);
    }, 1500);
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const button = e.target.querySelector('button');
    const originalText = button.innerHTML;
    
    // Animate button
    button.innerHTML = 'Sending your message... ☀️';
    button.classList.add('loading');
    
    // Submit to Formspree (replace YOUR-FORM-ID with your actual Formspree ID)
    try {
        const response = await fetch('https://formspree.io/f/YOUR-FORM-ID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            button.innerHTML = '✅ Message sent!';
            button.classList.remove('loading');
            button.style.background = '#22c55e';
        
        // Show success message
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.innerHTML = `
            <h3>Thanks for reaching out, ${data.name}! 🎉</h3>
            <p>I'll get back to you within 24 hours. Looking forward to helping you bring more sunshine to your operations!</p>
        `;
        successDiv.style.cssText = `
            background: var(--primary-gold);
            color: var(--white);
            padding: 1.5rem;
            border-radius: 15px;
            margin-top: 1rem;
            animation: slideUp 0.5s ease-out;
        `;
        e.target.appendChild(successDiv);
        
        // Reset form after delay
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
            e.target.reset();
            successDiv.remove();
        }, 7000);
    }, 1500);
});

// Add playful animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add stagger effect for grid items
            if (entry.target.classList.contains('service-card') || 
                entry.target.classList.contains('case-card') ||
                entry.target.classList.contains('blog-card')) {
                const cards = entry.target.parentElement.querySelectorAll('.visible');
                const index = Array.from(cards).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .case-card, .blog-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    observer.observe(el);
});

// Add visible class styles
const style = document.createElement('style');
style.textContent = `
    .visible {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    .form-success {
        animation: slideUp 0.5s ease-out;
    }
`;
document.head.appendChild(style);

// Fun Easter Egg - Konami Code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    // Create sunshine explosion
    const sunshineContainer = document.createElement('div');
    sunshineContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(sunshineContainer);
    
    // Create multiple sun emojis
    for (let i = 0; i < 50; i++) {
        const sun = document.createElement('span');
        sun.textContent = '☀️';
        sun.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 30 + 20}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: sunFloat ${Math.random() * 3 + 2}s ease-out forwards;
        `;
        sunshineContainer.appendChild(sun);
    }
    
    // Add floating animation
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes sunFloat {
            0% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random() * 200 - 100}px, -100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(floatStyle);
    
    // Show message
    const message = document.createElement('div');
    message.textContent = '☀️ Maximum Sunshine Achieved! ☀️';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--primary-gold);
        color: var(--white);
        padding: 2rem 3rem;
        border-radius: 20px;
        font-size: 1.5rem;
        font-weight: 700;
        z-index: 10000;
        animation: pop 0.5s ease-out;
        box-shadow: 0 10px 30px rgba(254, 188, 89, 0.5);
    `;
    document.body.appendChild(message);
    
    // Clean up after animation
    setTimeout(() => {
        sunshineContainer.remove();
        message.remove();
    }, 3000);
}

// Add cursor follower for desktop (subtle and fun)
if (window.innerWidth > 768) {
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    cursorGlow.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-gold);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        transition: transform 0.1s ease-out;
        opacity: 0;
    `;
    document.body.appendChild(cursorGlow);
    
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.style.opacity = '0.5';
    });
    
    // Smooth animation loop
    function animateCursor() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        
        cursorGlow.style.left = glowX - 10 + 'px';
        cursorGlow.style.top = glowY - 10 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Make cursor glow bigger on hover over interactive elements
    document.querySelectorAll('a, button, .service-card, .case-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorGlow.style.transform = 'scale(2)';
            cursorGlow.style.borderColor = 'var(--primary-teal)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorGlow.style.transform = 'scale(1)';
            cursorGlow.style.borderColor = 'var(--primary-gold)';
        });
    });
}

// Fun 404 handler (for when you add routing)
function show404Page() {
    document.body.innerHTML = `
        <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            text-align: center;
            padding: 2rem;
            background: linear-gradient(135deg, rgba(254, 188, 89, 0.1) 0%, rgba(54, 101, 96, 0.05) 100%);
        ">
            <h1 style="font-size: 8rem; margin: 0;">404</h1>
            <h2 style="color: var(--primary-teal); margin: 1rem 0;">Oops! Looks like this page took a day off!</h2>
            <p style="font-size: 1.25rem; margin: 1rem 0;">
                Even automation needs a break sometimes. 🌴
            </p>
            <div style="font-size: 4rem; animation: bounce 2s ease-in-out infinite;">☀️</div>
            <a href="/" class="btn btn-primary" style="margin-top: 2rem;">
                Take me back to the sunshine
            </a>
        </div>
    `;
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌞 Welcome to Sunnyside Ops! Less chaos, more daylight.');
    console.log('💡 Psst... try the Konami Code for a surprise!');
    
    // Add smooth reveal for hero content
    document.querySelector('.hero-content')?.classList.add('animate-fade-in');
});

// Performance optimization - lazy load images when you add them
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