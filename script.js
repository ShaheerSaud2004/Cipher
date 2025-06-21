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
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileNav = document.getElementById('mobile-nav');
if (hamburgerBtn && mobileNav) {
  hamburgerBtn.addEventListener('click', function() {
    mobileNav.classList.toggle('open');
  });
  // Close mobile nav when a link is clicked
  mobileNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  });
}

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
