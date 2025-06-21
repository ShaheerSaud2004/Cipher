// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    let currentSlide = 0;
    let slideInterval;
    const SLIDE_DURATION = 4000; // 4 seconds per slide

    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('carousel-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = document.querySelectorAll('.carousel-indicator');

    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
        });
        slides[index].classList.add('active');
        slides[index].style.opacity = '1';
        updateIndicators();
    }

    function goToSlide(index) {
        stopSlideShow();
        currentSlide = index;
        showSlide(currentSlide);
        startSlideShow();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-advance slides
    function startSlideShow() {
        stopSlideShow(); // Clear any existing interval
        slideInterval = setInterval(nextSlide, SLIDE_DURATION);
    }

    function stopSlideShow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        stopSlideShow();
        prevSlide();
        startSlideShow();
    });

    nextBtn.addEventListener('click', () => {
        stopSlideShow();
        nextSlide();
        startSlideShow();
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const carousel = document.querySelector('.hero-carousel');

    carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right
            prevSlide();
        }
    }

    // Start the slideshow
    startSlideShow();

    // Pause on hover/touch
    carousel.addEventListener('mouseenter', stopSlideShow);
    carousel.addEventListener('mouseleave', startSlideShow);
    carousel.addEventListener('touchstart', stopSlideShow);
    carousel.addEventListener('touchend', startSlideShow);
}); 