// Contact functionality

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initFAQ();
    initPriceCalculator();
});

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleContactSubmission);
    
    // Initialize file upload if exists
    const fileInput = contactForm.querySelector('input[type="file"]');
    if (fileInput) {
        initFileUpload(fileInput);
    }
}

function handleContactSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Validation
    if (!validateContactForm(form)) {
        return;
    }
    
    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    form.classList.add('loading');
    
    // Submit to Formspree
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showNotification('Thank you for your inquiry! We\'ll get back to you within 24 hours.', 'success');
            form.reset();
            // Redirect to thank you page after a delay
            setTimeout(() => {
                window.location.href = 'thank-you.html';
            }, 2000);
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('There was an error sending your message. Please try again or contact us directly.', 'error');
    })
    .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        form.classList.remove('loading');
    });
}

function validateContactForm(form) {
    const name = form.querySelector('#name')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const service = form.querySelector('#service')?.value;
    const message = form.querySelector('#message')?.value.trim();
    
    if (!name || !email || !service || !message) {
        showNotification('Please fill in all required fields marked with *.', 'error');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    if (message.length < 10) {
        showNotification('Please provide more details about your project (at least 10 characters).', 'error');
        return false;
    }
    
    return true;
}

// File upload functionality
function initFileUpload(fileInput) {
    const maxFiles = 5;
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    fileInput.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        
        if (files.length > maxFiles) {
            showNotification(`Maximum ${maxFiles} files allowed.`, 'error');
            e.target.value = '';
            return;
        }
        
        for (let file of files) {
            if (file.size > maxSize) {
                showNotification(`File "${file.name}" is too large. Maximum size is 10MB.`, 'error');
                e.target.value = '';
                return;
            }
            
            if (!file.type.startsWith('image/')) {
                showNotification(`File "${file.name}" is not an image.`, 'error');
                e.target.value = '';
                return;
            }
        }
        
        // Show file preview
        showFilePreview(files, fileInput);
    });
}

function showFilePreview(files, input) {
    let preview = input.parentElement.querySelector('.file-preview');
    
    if (!preview) {
        preview = document.createElement('div');
        preview.className = 'file-preview';
        input.parentElement.appendChild(preview);
    }
    
    preview.innerHTML = '';
    
    files.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <i class="fas fa-image"></i>
            <span>${file.name}</span>
            <span class="file-size">(${formatFileSize(file.size)})</span>
            <button type="button" onclick="removeFile(${index})" class="remove-file">
                <i class="fas fa-times"></i>
            </button>
        `;
        preview.appendChild(fileItem);
    });
    
    // Add preview styles
    if (!document.querySelector('#file-preview-styles')) {
        const styles = document.createElement('style');
        styles.id = 'file-preview-styles';
        styles.textContent = `
            .file-preview {
                margin-top: 1rem;
                padding: 1rem;
                background: #f8f8f8;
                border-radius: 8px;
            }
            .file-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 0;
                border-bottom: 1px solid #e0e0e0;
            }
            .file-item:last-child {
                border-bottom: none;
            }
            .file-size {
                color: #666;
                font-size: 0.9rem;
            }
            .remove-file {
                background: none;
                border: none;
                color: #999;
                cursor: pointer;
                margin-left: auto;
                padding: 0.25rem;
            }
            .remove-file:hover {
                color: #ff5311;
            }
        `;
        document.head.appendChild(styles);
    }
}

// FAQ functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                toggleFAQ(item);
            });
        }
    });
}

function toggleFAQ(item) {
    const isActive = item.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('active');
    });
    
    // Open clicked item if it wasn't already active
    if (!isActive) {
        item.classList.add('active');
    }
}

// Price calculator
function initPriceCalculator() {
    const serviceSelect = document.querySelector('#service');
    const peopleSelect = document.querySelector('#number-of-people');
    const sizeSelect = document.querySelector('#portrait-size');
    const budgetSelect = document.querySelector('#budget');
    
    if (serviceSelect) {
        serviceSelect.addEventListener('change', updatePriceEstimate);
    }
    if (peopleSelect) {
        peopleSelect.addEventListener('change', updatePriceEstimate);
    }
    if (sizeSelect) {
        sizeSelect.addEventListener('change', updatePriceEstimate);
    }
}

function updatePriceEstimate() {
    const service = document.querySelector('#service')?.value;
    const people = document.querySelector('#number-of-people')?.value;
    const size = document.querySelector('#portrait-size')?.value;
    const budgetSelect = document.querySelector('#budget');
    
    if (!service || !budgetSelect) return;
    
    let basePrice = 0;
    let peopleMultiplier = 1;
    
    // Base prices by size
    const sizePrices = {
        'a4': 2800,
        'a3': 4500,
        'a2': 6500,
        'a1': 15000,
        'a0': 25000
    };
    
    if (size && sizePrices[size]) {
        basePrice = sizePrices[size];
    }
    
    // Adjust for number of people
    if (people) {
        const peopleMultipliers = {
            '1': 1,
            '2': 1.5,
            '3': 2,
            '4': 2.5,
            '5+': 3
        };
        peopleMultiplier = peopleMultipliers[people] || 1;
    }
    
    if (basePrice > 0) {
        const estimatedPrice = Math.round(basePrice * peopleMultiplier);
        const minPrice = Math.round(estimatedPrice * 0.9);
        const maxPrice = Math.round(estimatedPrice * 1.1);
        
        // Update budget options
        const newOptions = [
            `<option value="${minPrice}-${maxPrice}">Estimated: KSH ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}</option>`,
            '<option value="1000-2800">KSH 1,000 - 2,800 (A4 Size)</option>',
            '<option value="4500-6000">KSH 4,500 - 6,000 (A3 Size)</option>',
            '<option value="6000-7000">KSH 6,000 - 7,000 (A2 Size)</option>',
            '<option value="10000-20000">KSH 10,000 - 20,000 (A1 Size)</option>',
            '<option value="20000-30000">KSH 20,000 - 30,000 (A0 Size)</option>',
            '<option value="custom">Custom project (Let\'s discuss)</option>'
        ];
        
        budgetSelect.innerHTML = newOptions.join('');
        
        // Show price update notification
        showPriceUpdate(minPrice, maxPrice);
    }
}

function showPriceUpdate(minPrice, maxPrice) {
    const existingNotice = document.querySelector('.price-notice');
    if (existingNotice) {
        existingNotice.remove();
    }
    
    const notice = document.createElement('div');
    notice.className = 'price-notice';
    notice.innerHTML = `
        <i class="fas fa-calculator"></i>
        Estimated price: KSH ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}
    `;
    
    const budgetGroup = document.querySelector('#budget')?.parentElement;
    if (budgetGroup) {
        budgetGroup.appendChild(notice);
        
        // Add styles
        if (!document.querySelector('#price-notice-styles')) {
            const styles = document.createElement('style');
            styles.id = 'price-notice-styles';
            styles.textContent = `
                .price-notice {
                    background: #e8f5e8;
                    color: #2d5016;
                    padding: 0.75rem 1rem;
                    border-radius: 6px;
                    margin-top: 0.5rem;
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    animation: slideDown 0.3s ease;
                }
                .price-notice i {
                    color: #10b981;
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Remove after 5 seconds
        setTimeout(() => {
            notice.remove();
        }, 5000);
    }
}

// Weather widget (simplified, fallback only)
function initWeatherWidget() {
    const weatherData = document.getElementById('weather-data');
    if (!weatherData) return;
    
    // Show fallback weather data for Nairobi
    const temp = 22 + Math.floor(Math.random() * 6); // 22-27°C
    const conditions = ['Sunny', 'Partly Cloudy', 'Clear'][Math.floor(Math.random() * 3)];
    const feelsLike = temp + Math.floor(Math.random() * 3) - 1;
    const humidity = 60 + Math.floor(Math.random() * 20);
    
    weatherData.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <i class="fas fa-sun" style="font-size: 2.5rem; color: #ffa500;"></i>
            <div>
                <div style="font-size: 1.3rem; font-weight: 600;">${temp}°C</div>
                <div style="text-transform: capitalize; font-weight: 500;">${conditions}</div>
                <small>Feels like ${feelsLike}°C • Humidity: ${humidity}%</small>
            </div>
        </div>
        <div style="margin-top: 0.5rem; font-size: 0.8rem; color: #666;">
            <i class="fas fa-info-circle"></i> Sample Nairobi weather
        </div>
    `;
}

// Utility functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function removeFile(index) {
    // This would need to be implemented to actually remove files from input
    showNotification('File removal feature needs to be implemented for production use.', 'info');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Use the notification system from main.js
    if (window.showNotification) {
        window.showNotification(message, type);
    } else {
        alert(message); // Fallback
    }
}

// Initialize weather widget if on contact page
if (document.getElementById('weather-data')) {
    initWeatherWidget();
}