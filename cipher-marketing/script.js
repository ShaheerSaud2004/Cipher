// Modern Portfolio Filtering and Animations
document.addEventListener('DOMContentLoaded', function() {
    // Portfolio Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach((item, index) => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory.includes(filterValue)) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100 + (index * 50)); // Staggered animation
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Portfolio overlay interactions
    portfolioItems.forEach(item => {
        const overlay = item.querySelector('.portfolio-overlay');
        const image = item.querySelector('.portfolio-image');
        
        if (overlay && image) {
            // Ensure overlay is properly positioned
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.right = '0';
            overlay.style.bottom = '0';
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.3s ease';
            
            // Add click handler to portfolio item
            item.addEventListener('click', (e) => {
                // Only trigger if not clicking on buttons
                if (!e.target.closest('.portfolio-btn')) {
                    const expandBtn = item.querySelector('.portfolio-btn .fa-expand');
                    if (expandBtn) {
                        expandBtn.click();
                    }
                }
            });
        }
    });

    // Smooth Scrolling for Navigation Links
    const navLinksForScroll = document.querySelectorAll('.nav-link');
    
    navLinksForScroll.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .client-card, .about-visual, .contact-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Counter Animation for Stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target) => {
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (target === 3 ? 'x' : '+');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (target === 3 ? 'x' : '+');
            }
        }, 20);
    };

    // Trigger counter animation when stats come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent.includes('x') ? 3 : parseInt(target.textContent);
                animateCounter(target, finalValue);
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Form Handling
    // (Removed simulation code for Formspree integration)

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a nav link (mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        const floatingElements = document.querySelectorAll('.float-item');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        floatingElements.forEach((element, index) => {
            const speed = 0.2 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Typing Effect for Hero Title
    const titleLines = document.querySelectorAll('.title-line');
    
    titleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        line.style.opacity = '1';
        
        setTimeout(() => {
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    line.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            typeWriter();
        }, index * 800);
    });

    // Add hover effects to portfolio items
    const portfolioImages = document.querySelectorAll('.portfolio-item');
    
    portfolioImages.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Portfolio button interactions
    const portfolioButtons = document.querySelectorAll('.portfolio-btn');
    
    portfolioButtons.forEach(button => {
        // Add keyboard support
        button.setAttribute('tabindex', '0');
        button.setAttribute('role', 'button');
        
        const handleClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const icon = button.querySelector('i');
            if (icon.classList.contains('fa-expand')) {
                // Handle expand functionality
                const portfolioItem = button.closest('.portfolio-item');
                const image = portfolioItem.querySelector('img');
                const iframe = portfolioItem.querySelector('iframe');
                
                if (image || iframe) {
                    // Create a modal or lightbox effect
                    const modal = document.createElement('div');
                    modal.className = 'portfolio-modal';
                    modal.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.95);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 10000;
                        cursor: pointer;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    `;
                    
                    const modalContent = document.createElement('div');
                    modalContent.style.cssText = `
                        max-width: 90%;
                        max-height: 90%;
                        position: relative;
                    `;
                    
                    if (image) {
                        const modalImg = document.createElement('img');
                        modalImg.src = image.src;
                        modalImg.alt = image.alt;
                        modalImg.style.cssText = `
                            width: 100%;
                            height: auto;
                            max-height: 90vh;
                            object-fit: contain;
                            border-radius: 10px;
                            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                        `;
                        modalContent.appendChild(modalImg);
                    } else if (iframe) {
                        const modalIframe = document.createElement('iframe');
                        modalIframe.src = iframe.src + '&autoplay=1';
                        modalIframe.style.cssText = `
                            width: 90vw;
                            height: 50vh;
                            border: none;
                            border-radius: 10px;
                        `;
                        modalContent.appendChild(modalIframe);
                    }
                    
                    // Add close button
                    const closeBtn = document.createElement('button');
                    closeBtn.innerHTML = '×';
                    closeBtn.style.cssText = `
                        position: absolute;
                        top: -40px;
                        right: 0;
                        background: rgba(255, 255, 255, 0.2);
                        border: none;
                        color: white;
                        font-size: 24px;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: background 0.3s ease;
                    `;
                    
                    closeBtn.addEventListener('mouseenter', () => {
                        closeBtn.style.background = 'rgba(255, 255, 255, 0.3)';
                    });
                    
                    closeBtn.addEventListener('mouseleave', () => {
                        closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
                    });
                    
                    modalContent.appendChild(closeBtn);
                    modal.appendChild(modalContent);
                    document.body.appendChild(modal);
                    
                    // Animate in
                    setTimeout(() => {
                        modal.style.opacity = '1';
                    }, 10);
                    
                    // Close handlers
                    const closeModal = () => {
                        modal.style.opacity = '0';
                        setTimeout(() => {
                            if (document.body.contains(modal)) {
                                document.body.removeChild(modal);
                            }
                        }, 300);
                    };
                    
                    modal.addEventListener('click', closeModal);
                    closeBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        closeModal();
                    });
                    
                    // Keyboard support
                    const handleKeydown = (e) => {
                        if (e.key === 'Escape') {
                            closeModal();
                            document.removeEventListener('keydown', handleKeydown);
                        }
                    };
                    document.addEventListener('keydown', handleKeydown);
                }
            } else if (icon.classList.contains('fa-heart')) {
                // Handle like functionality
                const isLiked = button.classList.contains('liked');
                if (isLiked) {
                    button.classList.remove('liked');
                    button.style.color = 'white';
                } else {
                    button.classList.add('liked');
                    button.style.color = '#ff6b6b';
                }
            } else if (icon.classList.contains('fa-play')) {
                // Handle video play functionality
                const portfolioItem = button.closest('.portfolio-item');
                const iframe = portfolioItem.querySelector('iframe');
                if (iframe) {
                    iframe.src = iframe.src + '&autoplay=1';
                }
            }
        };
        
        button.addEventListener('click', handleClick);
        
        // Keyboard support
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick(e);
            }
        });
    });

    // Smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}); 