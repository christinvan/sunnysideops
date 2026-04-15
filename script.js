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
        const spans = mobileToggle?.querySelectorAll('span');
        if (spans) {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Highlight active nav link on scroll
const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -80% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            activeLink?.classList.add('active');
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Newsletter Form Handling
const newsletterForm = document.getElementById('newsletter-form');
newsletterForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = e.target.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Thanks! ☀️';
    button.disabled = true;
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        e.target.reset();
    }, 3000);
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

    try {
        const response = await fetch('https://formspree.io/f/xkgkgeqo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            button.innerHTML = "Message sent! I'll be in touch soon ☀️";
            button.style.background = '#366560';
            e.target.reset();
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                button.classList.remove('loading');
            }, 5000);
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Contact form error:', error);
        button.textContent = originalText;
        button.classList.remove('loading');
    }
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
