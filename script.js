/**
 * The Scribe's Den - Main JavaScript
 * Version: 1.0
 * Description: Handles all interactive elements for The Scribe's Den website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Element references
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.overlay');
    const body = document.body;
    const nav = document.getElementById('main-nav');
    const scrollTopBtn = document.getElementById('scrollTop');
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // ================ MOBILE MENU TOGGLE ================
    function toggleMenu() {
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        } else {
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            body.style.overflow = ''; // Restore scrolling
        }
    }
    
    // Add event listeners for menu
    if (mobileMenuBtn && navLinks && overlay) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
        
        // Close menu when clicking on links
        const menuLinks = document.querySelectorAll('.nav-links a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }
    
    // ================ STICKY NAVIGATION ================
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class to change nav appearance
        if (nav) {
            if (scrollTop > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
        
        // Show/hide scroll to top button
        if (scrollTopBtn) {
            if (scrollTop > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ================ SCROLL TO TOP BUTTON ================
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ================ FADE-IN ANIMATIONS ================
    // Use Intersection Observer for better performance
    if (fadeElements.length > 0) {
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    fadeInObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
        });
        
        fadeElements.forEach(element => {
            element.style.opacity = 0;
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
            fadeInObserver.observe(element);
        });
    }
    
    // ================ TOUCH GESTURES FOR MOBILE ================
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 100;
        
        // Swipe right to open menu
        if (touchEndX - touchStartX > swipeThreshold && navLinks && !navLinks.classList.contains('active')) {
            toggleMenu();
        }
        
        // Swipe left to close menu
        if (touchStartX - touchEndX > swipeThreshold && navLinks && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    }
    
    // ================ ACCESSIBILITY SUPPORT ================
    // Add keyboard navigation support for mobile menu
    if (navLinks) {
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const firstFocusableElement = navLinks.querySelectorAll(focusableElements)[0];
        const focusableContent = navLinks.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1];
        
        document.addEventListener('keydown', function(e) {
            const isTabPressed = e.key === 'Tab' || e.keyCode === 9;
            const isEscPressed = e.key === 'Escape' || e.keyCode === 27;
            
            // Close menu with ESC key
            if (isEscPressed && navLinks.classList.contains('active')) {
                toggleMenu();
                return;
            }
            
            if (!isTabPressed || !navLinks.classList.contains('active')) {
                return;
            }
            
            // Trap focus in mobile menu when it's open
            if (e.shiftKey) { // Tab + Shift (backwards)
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else { // Tab (forwards)
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        });
    }
    
    // ================ FORM VALIDATION ================
    // Handle newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (isValidEmail(email)) {
                // Success - would normally send to server
                showFormMessage(newsletterForm, 'Thank you for subscribing!', 'success');
                emailInput.value = '';
            } else {
                // Error
                showFormMessage(newsletterForm, 'Please enter a valid email address.', 'error');
            }
        });
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }
    
    function showFormMessage(form, message, type) {
        // Remove any existing message
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        
        // Add to form
        form.appendChild(messageEl);
        
        // Remove after delay
        setTimeout(() => {
            messageEl.remove();
        }, 4000);
    }
    
    // ================ TESTIMONIAL SLIDER ================
    // Simple testimonial rotator - can be expanded for multiple testimonials
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider && testimonialSlider.querySelectorAll('.testimonial-card').length > 1) {
        let currentSlide = 0;
        const testimonials = testimonialSlider.querySelectorAll('.testimonial-card');
        const totalSlides = testimonials.length;
        
        // Hide all but first testimonial
        testimonials.forEach((testimonial, index) => {
            if (index > 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = i === 0 ? 'dot active' : 'dot';
            dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        
        testimonialSlider.appendChild(dotsContainer);
        
        // Auto-rotate testimonials
        setInterval(nextSlide, 6000);
        
        function nextSlide() {
            goToSlide((currentSlide + 1) % totalSlides);
        }
        
        function goToSlide(slideIndex) {
            // Hide current slide
            testimonials[currentSlide].style.display = 'none';
            
            // Show new slide
            currentSlide = slideIndex;
            testimonials[currentSlide].style.display = 'block';
            
            // Update dots
            document.querySelectorAll('.slider-dots .dot').forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }
    
    // ================ LAZY LOADING IMAGES ================
    // Use native lazy loading for browsers that support it
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if (lazyImages.length > 0) {
            const lazyImageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        lazyImageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(image => {
                lazyImageObserver.observe(image);
            });
        }
    }
    
    // ================ INITIALIZATION ================
    // Run any initialization code needed
    console.log('The Scribe\'s Den scripts initialized');
});