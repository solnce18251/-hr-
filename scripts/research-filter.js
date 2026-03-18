// ===================================
// Research Filter & Category Navigation
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const researchCategories = document.querySelectorAll('.research-category');
    
    // Filter functionality
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter categories
            researchCategories.forEach(category => {
                const categoryFilter = category.getAttribute('data-category');
                
                if (filter === 'all' || categoryFilter === filter) {
                    category.style.display = 'block';
                    category.style.animation = 'fadeInUp 0.6s ease-out forwards';
                } else {
                    category.style.display = 'none';
                    category.style.animation = '';
                }
            });
            
            // Scroll to first visible category
            const firstVisible = document.querySelector('.research-category[style*="display: block"]');
            if (firstVisible) {
                setTimeout(() => {
                    firstVisible.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            }
        });
    });
    
    // Add smooth hover effect to research cards
    const researchCards = document.querySelectorAll('.research-card');
    
    researchCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Add click animation to research links
    const researchLinks = document.querySelectorAll('.research-link');
    
    researchLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
                // Here you would normally navigate to the full translation
                alert('Перевод исследования готовится к публикации!');
            }, 600);
        });
    });
    
    // Add scroll animation for research categories
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    researchCategories.forEach(category => {
        observer.observe(category);
    });
    
    // Add counter animation for stats
    const stats = document.querySelectorAll('.research-highlight-stat');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + (element.getAttribute('data-suffix') || '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.getAttribute('data-suffix') || '');
            }
        }, 16);
    };
    
    // Initialize tooltips for research sources
    const researchSources = document.querySelectorAll('.research-source');
    
    researchSources.forEach(source => {
        source.setAttribute('title', 'Источник исследования');
    });
    
    // Add keyboard navigation for filter tabs
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const activeTab = document.querySelector('.filter-tab.active');
            const tabs = Array.from(filterTabs);
            const currentIndex = tabs.indexOf(activeTab);
            
            let nextIndex;
            if (e.key === 'ArrowLeft') {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
            } else {
                nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
            }
            
            tabs[nextIndex].click();
            tabs[nextIndex].focus();
        }
    });
    
    // Add URL hash support for direct category access
    const urlHash = window.location.hash.slice(1);
    if (urlHash) {
        const targetTab = document.querySelector(`.filter-tab[data-filter="${urlHash}"]`);
        if (targetTab) {
            setTimeout(() => {
                targetTab.click();
            }, 500);
        }
    }
    
    // Update URL hash when filter changes
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            if (filter !== 'all') {
                window.history.pushState(null, null, `#${filter}`);
            } else {
                window.history.pushState(null, null, window.location.pathname);
            }
        });
    });
    
    console.log('%c📚 Research Section Loaded', 'font-size: 16px; font-weight: bold; color: #7700FF;');
});
