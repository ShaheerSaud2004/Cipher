// Hide Loading Screen After Page Load
window.addEventListener("load", function () {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
        loadingScreen.style.display = "none";
    }, 500);
});

// Smooth Scroll for Navigation Links
document.querySelectorAll(".nav-link[data-scroll]").forEach((link) => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Smooth scroll for 'Get Started' button with even slower scroll
const getStartedBtn = document.querySelector('.hero-cta');
if (getStartedBtn) {
    getStartedBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector('#services');
        if (target) {
            const yOffset = -40; // Offset for sticky header
            const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
            slowScrollTo(y, 1200); // 1200ms for a slower scroll
        }
    });
}

function slowScrollTo(targetY, duration) {
    const startY = window.pageYOffset;
    const diff = targetY - startY;
    let start;
    function step(timestamp) {
        if (!start) start = timestamp;
        const time = timestamp - start;
        const percent = Math.min(time / duration, 1);
        window.scrollTo(0, startY + diff * percent);
        if (time < duration) {
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}

// AJAX Formspree submission with feedback
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('i');
    formStatus.innerHTML = '<span class="status-icon"><i class="fas fa-spinner fa-spin"></i></span> Sending message...';
    formStatus.className = 'form-status';
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    btnIcon.style.transform = 'translateX(8px)';

    const formData = new FormData(contactForm);
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        formStatus.innerHTML = '<span class="status-icon"><i class="fas fa-check-circle"></i></span> Thank you! Your message was sent successfully. We\'ll be in touch soon.';
        formStatus.className = 'form-status success';
        contactForm.reset();
        submitBtn.style.background = '#1e7e34';
        btnText.textContent = 'Sent!';
        btnIcon.className = 'fas fa-check';
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.style.background = '#003366';
          btnText.textContent = 'Send Message';
          btnIcon.className = 'fas fa-paper-plane';
          btnIcon.style.transform = '';
          formStatus.innerHTML = '';
        }, 3000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (err) {
      formStatus.innerHTML = '<span class="status-icon"><i class="fas fa-times-circle"></i></span> Failed to send the message. Please try again.';
      formStatus.className = 'form-status error';
      submitBtn.disabled = false;
      btnText.textContent = 'Send Message';
      btnIcon.style.transform = '';
    }
  });
}

// Remove ripple effect for service cards
// document.querySelectorAll('.service-tile').forEach(card => {
//   card.addEventListener('click', function(e) {
//     const ripple = document.createElement('span');
//     ripple.className = 'ripple';
//     const rect = card.getBoundingClientRect();
//     ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
//     ripple.style.left = (e.clientX - rect.left - rect.width / 2) + 'px';
//     ripple.style.top = (e.clientY - rect.top - rect.height / 2) + 'px';
//     card.appendChild(ripple);
//     ripple.addEventListener('animationend', () => ripple.remove());
//   });
// });

// Flip service cards on click with flip flash effect
document.querySelectorAll('.service-tile.flippable').forEach(card => {
  card.addEventListener('click', function(e) {
    // Flip on any click, including the indicator
    card.classList.toggle('flipped');
    card.classList.add('flip-flash');
    setTimeout(() => card.classList.remove('flip-flash'), 350);
  });
});

// Animated count-up for stats in Project Impact panels
function animateCountUp(el, target, duration = 1200) {
  let start = 0;
  let startTime = null;
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    el.textContent = Math.floor(progress * (target - start) + start);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target;
    }
  }
  requestAnimationFrame(step);
}

function handleCountUp(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'), 10);
      if (!el.classList.contains('counted')) {
        animateCountUp(el, target);
        el.classList.add('counted');
      }
      observer.unobserve(el);
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const countups = document.querySelectorAll('.countup');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(handleCountUp, { threshold: 0.6 });
    countups.forEach(el => observer.observe(el));
  } else {
    // Fallback for old browsers
    countups.forEach(el => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      animateCountUp(el, target);
    });
  }
});

// Hamburger menu for mobile nav
document.addEventListener('DOMContentLoaded', function() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  console.log('Hamburger button:', hamburgerBtn);
  console.log('Mobile nav:', mobileNav);

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('Hamburger clicked!');
      
      mobileNav.classList.toggle('open');
      hamburgerBtn.classList.toggle('is-active');
      
      console.log('Mobile nav classes:', mobileNav.className);
      console.log('Hamburger classes:', hamburgerBtn.className);
    });

    // Close mobile nav when a link is clicked
    mobileNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        console.log('Nav link clicked, closing menu');
        mobileNav.classList.remove('open');
        hamburgerBtn.classList.remove('is-active');
      });
    });
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
      if (!hamburgerBtn.contains(e.target) && !mobileNav.contains(e.target)) {
        if (mobileNav.classList.contains('open')) {
          console.log('Clicking outside, closing menu');
          mobileNav.classList.remove('open');
          hamburgerBtn.classList.remove('is-active');
        }
      }
    });
  } else {
    console.error('Hamburger menu elements not found!');
    if (!hamburgerBtn) console.error('hamburger-btn not found');
    if (!mobileNav) console.error('mobile-nav not found');
  }
});

// Calendly floating button popup
// (Removed: now handled by Calendly badge widget)

document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    function changeNav() {
        let index = sections.length;

        while(--index && window.scrollY + 50 < sections[index].offsetTop) {}
        
        navLinks.forEach((link) => link.classList.remove('active'));
        navLinks[index].classList.add('active');
    }

    changeNav();
    window.addEventListener('scroll', changeNav);
});

// Chatbot Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbotWidget = document.getElementById('chatbot-widget');
    const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
    const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSendBtn = document.getElementById('chatbot-send-btn');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const contactForm = document.getElementById('chatbot-contact-form');
    const contactSubmitBtn = document.getElementById('contact-submit-btn');
    
    let isContactFormVisible = false;
    let userInfo = { name: '', email: '' };
    
    // Initialize chatbot state - ensure it starts minimized
    if (chatbotWidget) {
        if (!chatbotWidget.classList.contains('minimized') && !chatbotWidget.classList.contains('show')) {
            chatbotWidget.classList.add('minimized');
        }
    }
    
    // Ensure toggle button is visible when chatbot is minimized
    if (chatbotToggleBtn && chatbotWidget && chatbotWidget.classList.contains('minimized')) {
        chatbotToggleBtn.style.display = 'flex';
    }
    
    // Initialize EmailJS
    // To set up EmailJS:
    // 1. Go to https://www.emailjs.com/ and create a free account
    // 2. Create an email service (Gmail, Outlook, etc.)
    // 3. Create an email template
    // 4. Get your Public Key, Service ID, and Template ID
    // 5. Uncomment and update the line below with your Public Key
    // 6. Update the service ID and template ID in the send function below
    
    // emailjs.init("YOUR_PUBLIC_KEY"); // Add your EmailJS public key here
    
    // Toggle chatbot visibility
    function toggleChatbot() {
        if (!chatbotWidget) return;
        
        if (chatbotWidget.classList.contains('minimized') || !chatbotWidget.classList.contains('show')) {
            // Show the chatbot
            chatbotWidget.classList.remove('minimized');
            chatbotWidget.classList.add('show');
            if (chatbotToggleBtn) {
                chatbotToggleBtn.style.display = 'none';
            }
            if (chatbotInput) {
                setTimeout(() => chatbotInput.focus(), 300);
            }
        } else {
            // Hide the chatbot
            chatbotWidget.classList.remove('show');
            chatbotWidget.classList.add('minimized');
            if (chatbotToggleBtn) {
                chatbotToggleBtn.style.display = 'flex';
            }
        }
    }
    
    // Show chatbot on toggle button click
    if (chatbotToggleBtn) {
        chatbotToggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleChatbot();
        });
    }
    
    // Close chatbot
    if (chatbotCloseBtn) {
        chatbotCloseBtn.addEventListener('click', function() {
            chatbotWidget.classList.remove('show');
            chatbotWidget.classList.add('minimized');
            chatbotToggleBtn.style.display = 'flex';
        });
    }
    
    // Add message to chat
    function addMessage(text, isBot = true, showScheduleButton = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${isBot ? 'bot-message' : 'user-message'}`;
        
        if (isBot) {
            let buttonHTML = '';
            if (showScheduleButton) {
                buttonHTML = `
                    <div class="chatbot-action-buttons">
                        <button class="chatbot-schedule-btn" onclick="openCalendlyScheduling()">
                            <span>📅 Schedule a Free Consultation</span>
                        </button>
                    </div>
                `;
            }
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <img src="images/your-photo.png" alt="Bot" class="avatar-img">
                </div>
                <div class="message-content">
                    <div class="message-bubble">
                        <p>${text}</p>
                        ${buttonHTML}
                    </div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="message-bubble">
                        <p>${text}</p>
                    </div>
                </div>
            `;
        }
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Open Calendly scheduling popup
    function openCalendlyScheduling() {
        if (typeof Calendly !== 'undefined') {
            Calendly.initPopupWidget({
                url: 'https://calendly.com/shaheersaud2004'
            });
        } else {
            // Fallback: open in new tab if Calendly not loaded
            window.open('https://calendly.com/shaheersaud2004', '_blank');
        }
    }
    
    // Make function globally available
    window.openCalendlyScheduling = openCalendlyScheduling;
    
    // Process user message and generate response
    function processMessage(userMessage) {
        const message = userMessage.toLowerCase().trim();
        
        // Check for greetings
        if (message.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/)) {
            return "Hello! 👋 I'm here to help you learn about Cipher Consulting's services. We specialize in custom business websites and Shopify store development. What would you like to know?";
        }
        
        // Check for service inquiries
        if (message.match(/(website|web development|web design|site)/)) {
            addMessage("We create custom business websites that are responsive, SEO-optimized, and designed to convert visitors into customers. Our websites include modern design, fast loading times, and mobile-friendly layouts. Would you like to discuss your website project?", true, true);
            return null;
        }
        
        if (message.match(/(shopify|e-commerce|online store|store)/)) {
            addMessage("We specialize in Shopify store development! We can set up your complete Shopify store, customize themes, integrate payment systems, manage product catalogs, and optimize for sales. Have you thought about what products you'd like to sell? Would you like to schedule a consultation to discuss your store?", true, true);
            return null;
        }
        
        // Check for pricing
        if (message.match(/(price|cost|pricing|how much|budget|afford)/)) {
            addMessage("Great question! We have transparent pricing:\n\n• Shopify Websites: $150-$500 (includes full frontend, backend, and 1 month free support)\n• Business Websites: $100-$700 (most commonly $150)\n• Custom Apps: Custom pricing based on requirements\n\nCheck out our Pricing section above for full details, or schedule a free consultation to discuss your specific project!", true, true);
            return null; // Return null to prevent default message
        }
        
        // Check for contact/help requests
        if (message.match(/(contact|reach|email|phone|call|speak|talk|help|support|consultation|meet|discuss|schedule|book|appointment)/)) {
            addMessage("I'd be happy to help you schedule a meeting! You can book a free 30-minute consultation to discuss your project. Would you like to schedule now?", true, true);
            return null; // Return null to prevent default message
        }
        
        // Check for portfolio/past work
        if (message.match(/(portfolio|past work|examples|projects|show|see|previous|work)/)) {
            return "Great question! We've built websites for businesses like Ara's Hot Chicken (e-commerce), Z&Z Renewable (solar company), and Shopify stores like Mxtivoanal. You can see all our past work in the 'Past Work' section above. Would you like to know more about any specific project?";
        }
        
        // Check for timeline
        if (message.match(/(how long|timeline|time|when|delivery|deadline|duration|weeks|days|months)/)) {
            addMessage("Timeline depends on project complexity. A simple business website typically takes 2-4 weeks, while a Shopify store can take 3-6 weeks. Custom features may extend the timeline. We'll provide a detailed timeline after discussing your specific needs. Would you like to schedule a consultation?", true, true);
            return null; // Return null to prevent default message
        }
        
        // Check for questions that might need scheduling
        if (message.match(/(question|questions|ask|wonder|curious|interested|want to know|need help|need assistance)/)) {
            addMessage("I'm here to help! If you have any questions about our services, pricing, or how we can help with your project, feel free to ask. You can also schedule a free consultation to discuss your needs in detail.", true, true);
            return null; // Return null to prevent default message
        }
        
        // Default response
        addMessage("I understand you're interested in learning more! We specialize in custom websites and Shopify stores. You can ask me about:\n• Our services (websites, Shopify stores)\n• Pricing and timelines\n• Past work and examples\n• How to get started\n\nOr schedule a free consultation to discuss your project!", true, true);
        return null;
    }
    
    // Show contact form
    function showContactForm() {
        if (!isContactFormVisible) {
            contactForm.style.display = 'block';
            isContactFormVisible = true;
            chatbotInput.style.display = 'none';
            chatbotSendBtn.style.display = 'none';
        }
    }
    
    // Hide contact form
    function hideContactForm() {
        contactForm.style.display = 'none';
        isContactFormVisible = false;
        chatbotInput.style.display = 'block';
        chatbotSendBtn.style.display = 'block';
    }
    
    // Send message
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, false);
        chatbotInput.value = '';
        
        // Process and add bot response
        setTimeout(() => {
            const response = processMessage(message);
            if (response !== null) {
                addMessage(response);
            }
        }, 500);
    }
    
    // Send message on button click
    if (chatbotSendBtn) {
        chatbotSendBtn.addEventListener('click', sendMessage);
    }
    
    // Send message on Enter key
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !isContactFormVisible) {
                sendMessage();
            }
        });
    }
    
    // Handle contact form submission
    if (contactSubmitBtn) {
        contactSubmitBtn.addEventListener('click', function() {
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-message').value.trim();
            
            if (!name || !email || !message) {
                addMessage("Please fill in all fields before sending.", true);
                return;
            }
            
            // Send email via EmailJS
            const templateParams = {
                from_name: name,
                from_email: email,
                message: message,
                to_email: 'shaheersaud2004@gmail.com'
            };
            
            // EmailJS Configuration
            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs from EmailJS dashboard
            // If EmailJS is not set up, it will fall back to mailto link
            if (typeof emailjs !== 'undefined' && emailjs.send) {
                emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
                .then(function(response) {
                    addMessage("Thank you! Your message has been sent. We'll get back to you soon! 📧", true);
                    document.getElementById('contact-name').value = '';
                    document.getElementById('contact-email').value = '';
                    document.getElementById('contact-message').value = '';
                    hideContactForm();
                }, function(error) {
                    // Fallback: Use mailto link if EmailJS fails
                    const mailtoLink = `mailto:shaheersaud2004@gmail.com?subject=Contact from Website&body=Name: ${name}%0AEmail: ${email}%0A%0AMessage: ${message}`;
                    window.location.href = mailtoLink;
                    addMessage("Opening your email client to send the message...", true);
                    hideContactForm();
                });
            } else {
                // Fallback: Use mailto link if EmailJS is not configured
                const mailtoLink = `mailto:shaheersaud2004@gmail.com?subject=Contact from Website&body=Name: ${name}%0AEmail: ${email}%0A%0AMessage: ${message}`;
                window.location.href = mailtoLink;
                addMessage("Opening your email client to send the message...", true);
                hideContactForm();
            }
        });
    }
    
    // Auto-minimize after 10 seconds if not interacted with
    let interactionTimeout;
    function resetInteractionTimeout() {
        clearTimeout(interactionTimeout);
        interactionTimeout = setTimeout(() => {
            if (chatbotWidget && chatbotWidget.classList.contains('show')) {
                chatbotWidget.classList.add('minimized');
                chatbotWidget.classList.remove('show');
                chatbotToggleBtn.style.display = 'flex';
            }
        }, 10000);
    }
    
    // Reset timeout on any interaction
    if (chatbotInput) {
        chatbotInput.addEventListener('focus', resetInteractionTimeout);
    }
    if (chatbotSendBtn) {
        chatbotSendBtn.addEventListener('click', resetInteractionTimeout);
    }
    
    // Initial timeout
    resetInteractionTimeout();
});

// Project Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectNavButtons = document.querySelectorAll('.project-nav-btn');
    const projectSlides = document.querySelectorAll('.project-slide');
    const projectGridCards = document.querySelectorAll('.project-grid-card');
    const projectCounter = document.querySelector('.project-counter .total-projects');
    
    // Initialize filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects based on category
            filterProjects(category);
        });
    });
    
    function filterProjects(category) {
        let visibleProjects = 0;
        let firstVisibleProject = null;
        
        // Filter project grid cards
        projectGridCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const shouldShow = category === 'all' || cardCategory === category;
            
            if (shouldShow) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                visibleProjects++;
                if (!firstVisibleProject) {
                    firstVisibleProject = card;
                }
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Filter project navigation buttons (if they exist)
        projectNavButtons.forEach(button => {
            const buttonCategory = button.getAttribute('data-category');
            const shouldShow = category === 'all' || buttonCategory === category;
            
            if (shouldShow) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        });
        
        // Filter project slides (if they exist)
        projectSlides.forEach(slide => {
            const slideCategory = slide.getAttribute('data-category');
            const shouldShow = category === 'all' || slideCategory === category;
            
            if (shouldShow) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
                slide.classList.remove('active');
            }
        });
        
        // Update project counter
        if (projectCounter) {
            projectCounter.textContent = visibleProjects;
        }
        
        // Activate first visible project
        if (firstVisibleProject) {
            const projectIndex = firstVisibleProject.getAttribute('data-project');
            activateProject(projectIndex);
        }
    }
    
    function activateProject(projectIndex) {
        // Remove active class from all navigation buttons
        projectNavButtons.forEach(btn => btn.classList.remove('active'));
        
        // Remove active class from all slides
        projectSlides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to selected navigation button
        const activeNavBtn = document.querySelector(`[data-project="${projectIndex}"]`);
        if (activeNavBtn) {
            activeNavBtn.classList.add('active');
        }
        
        // Add active class to selected slide
        const activeSlide = document.querySelector(`.project-slide[data-project="${projectIndex}"]`);
        if (activeSlide) {
            activeSlide.classList.add('active');
        }
        
        // Update project counter - calculate position within visible/filtered projects
        const currentProjectSpan = document.querySelector('.project-counter .current-project');
        const totalProjectsSpan = document.querySelector('.project-counter .total-projects');
        
        if (currentProjectSpan && totalProjectsSpan) {
            // Get the active filter category
            const activeFilter = document.querySelector('.filter-btn.active');
            const filterCategory = activeFilter ? activeFilter.getAttribute('data-category') : 'all';
            
            // Count visible projects up to and including the current one
            let position = 0;
            let found = false;
            
            projectGridCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                const cardProjectIndex = card.getAttribute('data-project');
                const shouldShow = filterCategory === 'all' || cardCategory === filterCategory;
                
                if (shouldShow && !found) {
                    position++;
                    if (cardProjectIndex === projectIndex) {
                        found = true;
                    }
                }
            });
            
            if (found) {
                currentProjectSpan.textContent = position;
            } else {
                // Fallback to absolute index if not found in filtered set
                currentProjectSpan.textContent = parseInt(projectIndex) + 1;
            }
        }
    }
    
    // Keep existing project navigation functionality
    projectNavButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectIndex = this.getAttribute('data-project');
            activateProject(projectIndex);
        });
    });
});

// Chatbot Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatMessagesContainer = document.querySelector('.chat-messages-container');
    
    if (!chatInput || !chatSendBtn || !chatMessagesContainer) return;
    
    // Bot responses based on keywords
    const botResponses = {
        greeting: [
            "Hello! 👋 I'm here to help you learn more about Cipher Consulting. What would you like to know?",
            "Hi there! How can I assist you today?",
            "Hey! Welcome to Cipher Consulting. What questions do you have?"
        ],
        services: [
            "We specialize in custom website development and Shopify store setup. We create professional, responsive websites that convert visitors into customers. Would you like to know more about our services?",
            "Our main services include: Custom Website Development, Shopify Store Development, E-commerce Development, and Web Design & Redesign. Which one interests you?",
            "We offer custom business websites and Shopify stores. We can help you build a professional online presence that drives results!"
        ],
        pricing: [
            "Pricing varies based on your project needs. We offer a free 30-minute consultation to discuss your requirements and provide a custom quote. Would you like to schedule a call?",
            "Every project is unique, so we provide custom quotes after understanding your needs. Book a free consultation to get started!",
            "We'd love to discuss pricing with you! Schedule a free 30-minute consultation and we'll provide a custom quote for your project."
        ],
        contact: [
            "You can reach us at +1 (732) 314-8699 or email shaheersaud2004@gmail.com. You can also schedule a free consultation using the contact section above!",
            "Feel free to call us at +1 (732) 314-8699, or schedule a call using the contact form on our website. We're here to help!",
            "Contact us at +1 (732) 314-8699 or book a free consultation. We'd love to discuss your project!"
        ],
        portfolio: [
            "We've worked on various projects including Z&Z Renewable, Ara's Hot Chicken, Rutgers MSA Website, and more. Check out our Past Work section to see examples!",
            "Our portfolio includes custom websites, Shopify stores, and automation solutions. Scroll up to see our Past Work section!",
            "We've completed projects for solar companies, restaurants, student organizations, and more. Take a look at our Past Work section above!"
        ],
        about: [
            "Cipher Consulting is founded by Shaheer Saud, a Computer Science student at Rutgers University with Fortune 500 experience at AT&T and Colgate-Palmolive. We deliver enterprise-quality results with personalized service.",
            "I'm Shaheer Saud, Founder & Principal Consultant. I'm a Rutgers CS student with experience at AT&T and Colgate-Palmolive. Click my photo in the chat to learn more about my background!",
            "We're a web development consultancy specializing in custom websites and Shopify stores. Founded by Shaheer Saud with Fortune 500 experience. Want to know more about our expertise?"
        ],
        default: [
            "That's a great question! I'd be happy to help. Could you tell me more about what you're looking for?",
            "I'm here to help! You can ask me about our services, pricing, portfolio, or contact information. What would you like to know?",
            "Let me help you with that! Feel free to ask about our services, past work, pricing, or how to get in touch. What interests you?"
        ]
    };
    
    // Function to get bot response
    function getBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Check for greetings
        if (message.match(/\b(hi|hello|hey|greetings|good morning|good afternoon|good evening)\b/)) {
            return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
        }
        
        // Check for services
        if (message.match(/\b(service|services|what do you do|what can you do|website|shopify|e-commerce|development|design)\b/)) {
            return botResponses.services[Math.floor(Math.random() * botResponses.services.length)];
        }
        
        // Check for pricing
        if (message.match(/\b(price|pricing|cost|how much|quote|estimate|budget)\b/)) {
            return botResponses.pricing[Math.floor(Math.random() * botResponses.pricing.length)];
        }
        
        // Check for contact
        if (message.match(/\b(contact|phone|email|reach|call|schedule|meeting|consultation)\b/)) {
            return botResponses.contact[Math.floor(Math.random() * botResponses.contact.length)];
        }
        
        // Check for portfolio
        if (message.match(/\b(portfolio|work|projects|examples|past work|showcase|case study)\b/)) {
            return botResponses.portfolio[Math.floor(Math.random() * botResponses.portfolio.length)];
        }
        
        // Check for about
        if (message.match(/\b(about|who|founder|shaheer|background|experience|expertise)\b/)) {
            return botResponses.about[Math.floor(Math.random() * botResponses.about.length)];
        }
        
        // Default response
        return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
    }
    
    // Function to add user message
    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message user-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-bubble">
                    <p>${escapeHtml(message)}</p>
                </div>
            </div>
        `;
        chatMessagesContainer.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Function to add bot message
    function addBotMessage(message) {
        // Remove typing indicator if present
        const typingIndicator = chatMessagesContainer.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message bot-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <img src="images/your-photo.png" alt="Shaheer Saud" class="avatar-img">
            </div>
            <div class="message-content">
                <div class="message-bubble">
                    <div class="message-header">
                        <span class="sender-name">Shaheer Saud</span>
                        <span class="message-time">now</span>
                    </div>
                    <p>${escapeHtml(message)}</p>
                </div>
            </div>
        `;
        chatMessagesContainer.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Function to show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot-message';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <img src="images/your-photo.png" alt="Shaheer Saud" class="avatar-img">
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatMessagesContainer.appendChild(typingDiv);
        scrollToBottom();
    }
    
    // Function to scroll to bottom
    function scrollToBottom() {
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }
    
    // Function to escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Function to send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addUserMessage(message);
        
        // Clear input
        chatInput.value = '';
        
        // Disable send button
        chatSendBtn.disabled = true;
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate bot thinking time (500-1500ms)
        const delay = 500 + Math.random() * 1000;
        
        setTimeout(() => {
            // Get bot response
            const botResponse = getBotResponse(message);
            addBotMessage(botResponse);
            
            // Re-enable send button
            chatSendBtn.disabled = false;
            chatInput.focus();
        }, delay);
    }
    
    // Event listeners
    chatSendBtn.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Focus input when chat opens
    const chatWidget = document.getElementById('floating-chat-widget');
    if (chatWidget) {
        const observer = new MutationObserver(function(mutations) {
            if (chatWidget.classList.contains('show') && !chatWidget.classList.contains('minimized')) {
                setTimeout(() => {
                    chatInput.focus();
                }, 300);
            }
        });
        
        observer.observe(chatWidget, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
});

// Secret Modal for Treasurer System
document.addEventListener('DOMContentLoaded', function() {
    const secretModal = document.getElementById('secret-modal');
    const secretModalClose = document.getElementById('secret-modal-close');
    const treasurerButtons = document.querySelectorAll('#treasurer-view-system-1, #treasurer-view-system-2');
    
    // Function to show the secret modal
    function showSecretModal() {
        if (secretModal) {
            secretModal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }
    
    // Function to hide the secret modal
    function hideSecretModal() {
        if (secretModal) {
            secretModal.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }
    
    // Add click event listeners to both "View System" buttons
    treasurerButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showSecretModal();
            });
        }
    });
    
    // Close modal when clicking the close button
    if (secretModalClose) {
        secretModalClose.addEventListener('click', hideSecretModal);
    }
    
    // Close modal when clicking outside the modal content
    if (secretModal) {
        secretModal.addEventListener('click', function(e) {
            if (e.target === secretModal || e.target.classList.contains('secret-modal-overlay')) {
                hideSecretModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && secretModal && secretModal.classList.contains('show')) {
            hideSecretModal();
        }
    });
});

// LoanTicks "Coming Soon" functionality
document.addEventListener('DOMContentLoaded', function() {
    // Find the LoanTicks project slide
    const loanTicksSlide = document.querySelector('.project-slide[data-project="7"]');
    
    if (loanTicksSlide) {
        // Find all website links within the LoanTicks project
        const loanTicksLinks = loanTicksSlide.querySelectorAll('.website-link');
        
        loanTicksLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Coming Soon! 🚀\n\nThis feature is currently under development. Check back soon!');
            });
        });
    }
    
    // Handle coming soon links in grid view
    const comingSoonLinks = document.querySelectorAll('.coming-soon-link');
    comingSoonLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Coming Soon! 🚀\n\nThis feature is currently under development. Check back soon!');
        });
    });
    
    // Handle treasurer system modal in grid view
    const treasurerGridLink = document.getElementById('treasurer-view-system-grid');
    if (treasurerGridLink) {
        treasurerGridLink.addEventListener('click', function(e) {
            e.preventDefault();
            const secretModal = document.getElementById('secret-modal');
            if (secretModal) {
                secretModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    // Grid Card Click to Open Detailed View
    const projectGridCards = document.querySelectorAll('.project-grid-card');
    const projectsGridView = document.querySelector('.projects-grid-view');
    const projectContainer = document.getElementById('project-container');
    const backToGridBtn = document.getElementById('back-to-grid-btn');
    const prevProjectBtn = document.getElementById('prev-project-btn');
    const nextProjectBtn = document.getElementById('next-project-btn');
    let currentProjectIndex = 0;
    
    // Open detailed view when grid card is clicked (but not when overlay link is clicked)
    projectGridCards.forEach((card, index) => {
        // Make the card clickable (except for the overlay area)
        const cardContent = card.querySelector('.project-grid-content');
        if (cardContent) {
            cardContent.style.cursor = 'pointer';
            cardContent.addEventListener('click', function(e) {
                e.stopPropagation();
                currentProjectIndex = index;
                showProjectDetail(index);
            });
        }
        
        // Also make the image area clickable (but not the overlay)
        const cardImage = card.querySelector('.project-grid-image');
        if (cardImage) {
            cardImage.addEventListener('click', function(e) {
                // Don't open if clicking on the overlay or link
                if (e.target.closest('.project-grid-overlay') || e.target.closest('.project-grid-link')) {
                    return;
                }
                currentProjectIndex = index;
                showProjectDetail(index);
            });
        }
    });
    
    // Back to grid button
    if (backToGridBtn) {
        backToGridBtn.addEventListener('click', function() {
            hideProjectDetail();
        });
    }
    
    // Previous project button
    if (prevProjectBtn) {
        prevProjectBtn.addEventListener('click', function() {
            if (currentProjectIndex > 0) {
                currentProjectIndex--;
            } else {
                currentProjectIndex = projectGridCards.length - 1;
            }
            showProjectDetail(currentProjectIndex);
        });
    }
    
    // Next project button
    if (nextProjectBtn) {
        nextProjectBtn.addEventListener('click', function() {
            if (currentProjectIndex < projectGridCards.length - 1) {
                currentProjectIndex++;
            } else {
                currentProjectIndex = 0;
            }
            showProjectDetail(currentProjectIndex);
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (projectContainer && projectContainer.style.display !== 'none') {
            if (e.key === 'ArrowLeft') {
                if (currentProjectIndex > 0) {
                    currentProjectIndex--;
                } else {
                    currentProjectIndex = projectGridCards.length - 1;
                }
                showProjectDetail(currentProjectIndex);
            } else if (e.key === 'ArrowRight') {
                if (currentProjectIndex < projectGridCards.length - 1) {
                    currentProjectIndex++;
                } else {
                    currentProjectIndex = 0;
                }
                showProjectDetail(currentProjectIndex);
            } else if (e.key === 'Escape') {
                hideProjectDetail();
            }
        }
    });
    
    function showProjectDetail(index) {
        // Hide grid view
        if (projectsGridView) {
            projectsGridView.style.display = 'none';
        }
        
        // Show detailed view
        if (projectContainer) {
            projectContainer.style.display = 'block';
        }
        
        // Show the correct project slide
        const projectSlides = document.querySelectorAll('.project-slide');
        projectSlides.forEach((slide, slideIndex) => {
            if (slideIndex === index) {
                slide.classList.add('active');
                slide.style.display = 'block';
            } else {
                slide.classList.remove('active');
                slide.style.display = 'none';
            }
        });
        
        // Scroll to top of project container
        if (projectContainer) {
            projectContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // Update navigation buttons state
        updateNavigationButtons();
    }
    
    function hideProjectDetail() {
        // Show grid view
        if (projectsGridView) {
            projectsGridView.style.display = 'grid';
        }
        
        // Hide detailed view
        if (projectContainer) {
            projectContainer.style.display = 'none';
        }
        
        // Scroll back to projects section
        const pastWorkSection = document.getElementById('past-work');
        if (pastWorkSection) {
            pastWorkSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    function updateNavigationButtons() {
        if (prevProjectBtn && nextProjectBtn) {
            // Buttons are always enabled (circular navigation)
            prevProjectBtn.disabled = false;
            nextProjectBtn.disabled = false;
        }
    }
});
