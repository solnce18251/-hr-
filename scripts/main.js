// ===================================
// HR News Russia — Main JavaScript
// With Advanced Animations
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // ===== Theme Toggle =====
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = themeToggle?.querySelector('.sun-icon');
    const moonIcon = themeToggle?.querySelector('.moon-icon');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.add(`theme-${currentTheme}`);
    updateThemeIcons(currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = document.documentElement.classList.contains('theme-dark');
            const newTheme = isDark ? 'light' : 'dark';
            
            document.documentElement.classList.remove(`theme-${isDark ? 'dark' : 'light'}`);
            document.documentElement.classList.add(`theme-${newTheme}`);
            localStorage.setItem('theme', newTheme);
            updateThemeIcons(newTheme);
        });
    }
    
    function updateThemeIcons(theme) {
        if (!sunIcon || !moonIcon) return;
        
        if (theme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }
    
    // ===== Mobile Menu Toggle =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (nav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    }
    
    // Close mobile menu on link click
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && nav) {
                nav.classList.remove('active');
                const spans = mobileMenuBtn?.querySelectorAll('span');
                if (spans) {
                    spans[0].style.transform = '';
                    spans[1].style.opacity = '';
                    spans[2].style.transform = '';
                }
            }
        });
    });
    
    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== Active Nav Link =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
    
    // ===== Scroll Animations for News Cards =====
    const newsCards = document.querySelectorAll('.news-card');
    
    const newsCardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
                newsCardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    newsCards.forEach(card => {
        newsCardObserver.observe(card);
    });
    
    // ===== Scroll Animations for Sections =====
    const scrollElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('active', 'visible');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };
    
    // Initial check
    handleScrollAnimation();
    
    // Scroll event listener
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // ===== Intersection Observer for Category Cards =====
    const categoryCards = document.querySelectorAll('.category-card');
    
    const categoryObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    categoryCards.forEach(function(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        categoryObserver.observe(card);
    });
    
    // ===== Ripple Effect for Buttons =====
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // ===== Mark Fresh News (Today/Yesterday) =====
    function markFreshNews() {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        const monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                           'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        
        newsCards.forEach(card => {
            const dateElement = card.querySelector('.news-date');
            if (!dateElement) return;
            
            const dateText = dateElement.textContent.trim();
            const day = parseInt(dateText.split(' ')[0]);
            const monthName = dateText.split(' ')[1];
            const monthIndex = monthNames.indexOf(monthName);
            
            if (monthIndex !== -1) {
                const cardDate = new Date(today.getFullYear(), monthIndex, day);
                
                // Check if today or yesterday
                const isToday = cardDate.toDateString() === today.toDateString();
                const isYesterday = cardDate.toDateString() === yesterday.toDateString();
                
                if (isToday || isYesterday) {
                    dateElement.classList.add('fresh');
                    dateElement.setAttribute('title', isToday ? 'Сегодня' : 'Вчера');
                }
            }
        });
    }
    
    markFreshNews();
    
    // ===== Parallax Effect for Hero =====
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
            }
        });
    }
    
    // ===== Hover Effect for Category Cards =====
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // ===== Add Loading Class to Page =====
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // ===== Add Visible Class to Sections on Scroll =====
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // ===== Logo Animation on Click =====
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const logoIcon = this.querySelector('.logo-icon');
            logoIcon.style.animation = 'bounceIn 0.6s ease-out';
            
            // Determine correct path based on current location
            const currentPath = window.location.pathname;
            let targetPath = 'index.html';
            
            if (currentPath.includes('/pages/')) {
                targetPath = '../index.html';
            }
            
            setTimeout(() => {
                window.location.href = targetPath;
            }, 300);
        });
        
        logo.style.cursor = 'pointer';
    }
    
    // ===== Tooltip for Theme Toggle =====
    if (themeToggle) {
        themeToggle.setAttribute('title', 'Переключить тему');
    }
    
    // ===== Console Easter Egg =====
    console.log('%c👋 HR News Russia', 'font-size: 24px; font-weight: bold; color: #7700FF;');
    console.log('%cBuilt with Rostelecom Design System', 'font-size: 12px; color: #666;');
});
