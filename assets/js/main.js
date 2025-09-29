// Main JavaScript - Core functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initNavigation();
    initScrollEffects();
    initAnimations();
    initNewsletterForm();
    initSupportModal();
    updateCurrentYear();
    handlePageLoad();
}

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleMobileMenu);
        
        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
    
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                smoothScrollTo(href);
            }
        });
    });
}

function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const icon = navToggle.querySelector('i');
    
    navMenu.classList.toggle('active');
    
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden';
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto';
    }
}

function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const icon = navToggle?.querySelector('i');
    
    if (navMenu) {
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Scroll effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Header background change
        if (header) {
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        lastScrollY = currentScrollY;
    });
}

// Animation on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that need animation
    document.querySelectorAll('.section__header, .portfolio-card, .service-card, .blog-card, .about-preview__text, .about-preview__image, .support__text, .support__image, .cta__content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Newsletter form
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSubmission(this);
        });
    }
}

function handleNewsletterSubmission(form) {
    const emailInput = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button');
    const originalText = submitBtn.textContent;
    
    if (!emailInput.value) {
        showNotification('Please enter your email address', 'error');
        return;
    }
    
    if (!isValidEmail(emailInput.value)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Support modal functionality
function initSupportModal() {
    const modal = document.getElementById('support-modal');
    const closeBtn = modal?.querySelector('.modal__close');
    const paymentMethods = document.querySelectorAll('.payment-method');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSupportModal);
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeSupportModal();
            }
        });
    }
    
    // Handle payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            const selectedMethod = this.dataset.method;
            selectPaymentMethod(selectedMethod);
        });
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal?.classList.contains('show')) {
            closeSupportModal();
        }
    });
}

function openSupportModal(method = null) {
    const modal = document.getElementById('support-modal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        if (method) {
            selectPaymentMethod(method);
        }
    }
}

function closeSupportModal() {
    const modal = document.getElementById('support-modal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Clear selections
        document.querySelectorAll('.payment-method').forEach(m => {
            m.classList.remove('selected');
        });
        
        const paymentDetails = document.getElementById('payment-details');
        if (paymentDetails) {
            paymentDetails.classList.remove('show');
            paymentDetails.innerHTML = '';
        }
    }
}

function selectPaymentMethod(method) {
    // Clear previous selections
    document.querySelectorAll('.payment-method').forEach(m => {
        m.classList.remove('selected');
    });
    
    // Select current method
    const selectedMethod = document.querySelector(`[data-method="${method}"]`);
    if (selectedMethod) {
        selectedMethod.classList.add('selected');
        showPaymentDetails(method);
    }
}

function showPaymentDetails(method) {
    const paymentDetails = document.getElementById('payment-details');
    if (!paymentDetails) return;
    
    let content = '';
    
    if (method === 'mpesa') {
        content = `
            <div style="text-align: center;">
                <h4>M-Pesa Donation</h4>
                <div style="background: white; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: left; border-left: 4px solid var(--primary-color);">
                    <p style="margin-bottom: 1rem;"><strong>Follow these steps:</strong></p>
                    <ol style="margin: 0; padding-left: 1.5rem; line-height: 1.6;">
                        <li>Go to <strong>M-Pesa</strong> on your phone</li>
                        <li>Select <strong>"Lipa Na M-Pesa"</strong></li>
                        <li>Select <strong>"Pay Bill"</strong></li>
                        <li>Business No: <strong>000000</strong></li>
                        <li>Account No: <strong>LEVIART</strong></li>
                        <li>Enter amount & PIN</li>
                        <li>Confirm payment</li>
                    </ol>
                </div>
                <button onclick="handleMpesaConfirmation()" class="btn btn--primary" style="margin: 1rem 0;">
                    <i class="fas fa-check"></i> I'll Complete on My Phone
                </button>
                <p style="font-size: 0.9rem; color: #666; margin: 0;">
                    You'll receive an M-Pesa confirmation immediately
                </p>
            </div>
        `;
    } else if (method === 'paypal') {
        content = `
            <div style="text-align: center;">
                <h4>PayPal Donation</h4>
                <div style="background: white; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; border-left: 4px solid #0070ba;">
                    <p><strong>PayPal Email:</strong> leviart9@gmail.com</p>
                    <p style="margin-bottom: 1rem;">Or click below to be redirected</p>
                </div>
                <button onclick="handlePayPalRedirect()" class="btn" style="background: #0070ba; color: white; margin: 1rem 0;">
                    <i class="fab fa-paypal"></i> Continue to PayPal
                </button>
                <p style="font-size: 0.9rem; color: #666; margin: 0;">
                    Secure payment processed by PayPal
                </p>
            </div>
        `;
    }
    
    paymentDetails.innerHTML = content;
    paymentDetails.classList.add('show');
}

function handleMpesaConfirmation() {
    closeSupportModal();
    showNotification('Thank you! Please complete the M-Pesa transaction as instructed. We appreciate your support! 🎨', 'success');
}

function handlePayPalRedirect() {
    window.open('https://paypal.me/leviart9', '_blank');
    closeSupportModal();
    showNotification('Thank you for your support! Complete your donation on PayPal.', 'success');
}

// Utility functions
function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function handlePageLoad() {
    // Remove loading class if exists
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
    
    // Add greeting based on time
    updateGreeting();
}

function updateGreeting() {
    const hour = new Date().getHours();
    const heroDescription = document.querySelector('.hero__description');
    
    if (heroDescription) {
        let greeting = '';
        
        if (hour < 12) {
            greeting = 'Good morning! ';
        } else if (hour < 18) {
            greeting = 'Good afternoon! ';
        } else {
            greeting = 'Good evening! ';
        }
        
        const currentText = heroDescription.textContent;
        if (!currentText.startsWith('Good morning!') && 
            !currentText.startsWith('Good afternoon!') && 
            !currentText.startsWith('Good evening!')) {
            heroDescription.textContent = greeting + currentText;
        }
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                max-width: 400px;
                padding: 1rem;
                border-radius: 8px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                animation: slideInRight 0.3s ease;
                font-family: 'Poppins', sans-serif;
            }
            .notification--success { background: #10b981; color: white; }
            .notification--error { background: #ef4444; color: white; }
            .notification--info { background: #3b82f6; color: white; }
            .notification__content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }
            .notification__close {
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                padding: 0;
                font-size: 1rem;
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Global functions for inline event handlers
window.openSupportModal = openSupportModal;
window.handleMpesaConfirmation = handleMpesaConfirmation;
window.handlePayPalRedirect = handlePayPalRedirect;