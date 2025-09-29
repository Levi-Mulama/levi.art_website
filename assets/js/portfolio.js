// Portfolio functionality

document.addEventListener('DOMContentLoaded', function() {
    initPortfolioFilters();
    initPortfolioLightbox();
});

// Portfolio filtering
function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length === 0 || portfolioItems.length === 0) {
        return; // Exit if elements don't exist (not on portfolio page)
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio items
            filterPortfolioItems(portfolioItems, filterValue);
        });
    });
}

function filterPortfolioItems(items, filterValue) {
    items.forEach(item => {
        const category = item.getAttribute('data-category');
        const shouldShow = filterValue === 'all' || category === filterValue;
        
        if (shouldShow) {
            item.style.display = 'block';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            
            // Animate in
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 100);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// Portfolio lightbox functionality
function initPortfolioLightbox() {
    const portfolioItems = document.querySelectorAll('.portfolio-item, .portfolio-card');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            openPortfolioLightbox(this);
        });
    });
}

function openPortfolioLightbox(item) {
    const img = item.querySelector('img');
    const title = item.querySelector('h4')?.textContent || 'Portfolio Item';
    const description = item.querySelector('p')?.textContent || '';
    
    if (!img) return;
    
    const lightbox = createLightboxModal(img.src, img.alt, title, description);
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Close lightbox functionality
    const closeBtn = lightbox.querySelector('.lightbox__close');
    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        document.body.style.overflow = 'auto';
        lightbox.remove();
    }
}

function createLightboxModal(src, alt, title, description) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox__content">
            <button class="lightbox__close" aria-label="Close lightbox">&times;</button>
            <img src="${src}" alt="${alt}" class="lightbox__image">
            <div class="lightbox__info">
                <h3 class="lightbox__title">${title}</h3>
                <p class="lightbox__description">${description}</p>
                <div class="lightbox__actions">
                    <a href="../pages/contact.html" class="btn btn--primary">Commission Similar</a>
                </div>
            </div>
        </div>
    `;
    
    // Add lightbox styles
    if (!document.querySelector('#lightbox-styles')) {
        const styles = document.createElement('style');
        styles.id = 'lightbox-styles';
        styles.textContent = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(5px);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2rem;
                animation: fadeIn 0.3s ease;
            }
            
            .lightbox__content {
                position: relative;
                max-width: 90vw;
                max-height: 90vh;
                background: white;
                border-radius: 12px;
                overflow: hidden;
                animation: scaleIn 0.3s ease;
            }
            
            .lightbox__close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                z-index: 10;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-size: 1.5rem;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .lightbox__close:hover {
                background: var(--primary-color);
                transform: rotate(90deg);
            }
            
            .lightbox__image {
                width: 100%;
                max-width: 800px;
                height: auto;
                display: block;
            }
            
            .lightbox__info {
                padding: 2rem;
                text-align: center;
            }
            
            .lightbox__title {
                font-size: 1.5rem;
                margin-bottom: 0.5rem;
                color: var(--text-dark);
            }
            
            .lightbox__description {
                color: var(--text-light);
                margin-bottom: 1.5rem;
            }
            
            .lightbox__actions {
                display: flex;
                justify-content: center;
                gap: 1rem;
                flex-wrap: wrap;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes scaleIn {
                from { 
                    opacity: 0;
                    transform: scale(0.7);
                }
                to { 
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            @media (max-width: 768px) {
                .lightbox {
                    padding: 1rem;
                }
                
                .lightbox__info {
                    padding: 1.5rem;
                }
                
                .lightbox__title {
                    font-size: 1.3rem;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    return lightbox;
}

// Category card interactions (for portfolio page)
function initCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterPortfolioByCategory(category);
        });
    });
}

function filterPortfolioByCategory(category) {
    // Scroll to portfolio section
    const portfolioSection = document.querySelector('.portfolio-section');
    if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Activate corresponding filter button
    setTimeout(() => {
        const filterBtn = document.querySelector(`[data-filter="${category}"]`);
        if (filterBtn) {
            filterBtn.click();
        }
    }, 500);
}

// Portfolio preview interactions (for homepage)
function initPortfolioPreview() {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    portfolioCards.forEach(card => {
        card.addEventListener('click', function() {
            // Show preview modal or redirect to portfolio
            const category = this.getAttribute('data-category');
            if (category) {
                window.location.href = `pages/portfolio.html#${category}`;
            } else {
                window.location.href = 'pages/portfolio.html';
            }
        });
    });
}

// Initialize based on page
if (document.querySelector('.portfolio-section')) {
    // Portfolio page
    initCategoryCards();
} else if (document.querySelector('.portfolio-preview')) {
    // Homepage
    initPortfolioPreview();
}