// Modern Website JavaScript

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    const navLinkElements = document.querySelectorAll('.nav-link');
    navLinkElements.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#!') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Work Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workCards = document.querySelectorAll('.work-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter work cards
            workCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Initialize work cards with animation
    workCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// LoanTicks Coming Soon
document.addEventListener('DOMContentLoaded', function() {
    const loanTicksLinks = document.querySelectorAll('.work-link.coming-soon');
    
    loanTicksLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Coming Soon! 🚀\n\nThis feature is currently under development. Check back soon!');
        });
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Parallax Effect for Hero
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual && window.innerWidth > 1024) {
        heroVisual.style.transform = `translateY(calc(-50% + ${scrolled * 0.3}px))`;
    }
    
    lastScroll = scrolled;
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.modern-nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
        nav.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.background = 'rgba(10, 10, 10, 0.8)';
        nav.style.boxShadow = 'none';
    }
});

// Calendly Integration
window.onload = function() {
    if (typeof Calendly !== 'undefined') {
        Calendly.initBadgeWidget({
            url: 'https://calendly.com/shaheersaud2004',
            text: 'Schedule time with me',
            color: '#0066ff',
            textColor: '#ffffff',
            branding: true
        });
    }
};

// Add smooth fade-in for sections
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.modern-section');
    
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Enhanced hover effects for cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.service-card, .work-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
});

