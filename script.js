/* ========================================
   MIRADO RAZAFINDRATANDRA - PORTFOLIO
   JavaScript - Universe Theme with Day/Night
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== LOADER ==========
    const loader = document.querySelector('.loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 1500);
        });
    }

    // ========== THEME TOGGLE (Day/Night) ==========
    const createThemeToggle = () => {
        // Check if toggle already exists
        if (document.querySelector('.theme-toggle')) return;
        
        const toggle = document.createElement('button');
        toggle.className = 'theme-toggle';
        toggle.setAttribute('aria-label', 'Toggle theme');
        toggle.innerHTML = `
            <i class="fas fa-sun sun-icon"></i>
            <i class="fas fa-moon moon-icon"></i>
        `;
        document.body.appendChild(toggle);
        
        // Check saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        toggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    };
    
    createThemeToggle();

    // ========== SKY BACKGROUND ==========
    const createSkyBackground = () => {
        // Check if background exists
        if (document.querySelector('.sky-background')) return;
        
        const sky = document.createElement('div');
        sky.className = 'sky-background';
        sky.innerHTML = `
            <div class="sky-gradient"></div>
            <div class="celestial-body sun" style="top: 15%; right: 15%;"></div>
            <div class="celestial-body moon" style="top: 15%; right: 15%;"></div>
            <div class="clouds"></div>
            <div class="stars"></div>
        `;
        document.body.insertBefore(sky, document.body.firstChild);
        
        // Create clouds
        const cloudsContainer = sky.querySelector('.clouds');
        for (let i = 0; i < 6; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'cloud';
            cloud.style.cssText = `
                top: ${Math.random() * 40 + 5}%;
                left: ${Math.random() * 100 - 50}%;
                width: ${Math.random() * 150 + 100}px;
                height: ${Math.random() * 40 + 30}px;
                animation-delay: ${-Math.random() * 30}s;
                animation-duration: ${Math.random() * 20 + 25}s;
            `;
            cloudsContainer.appendChild(cloud);
        }
        
        // Create stars
        const starsContainer = sky.querySelector('.stars');
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = Math.random() * 3 + 1;
            star.style.cssText = `
                top: ${Math.random() * 70}%;
                left: ${Math.random() * 100}%;
                width: ${size}px;
                height: ${size}px;
                animation-delay: ${-Math.random() * 3}s;
                animation-duration: ${Math.random() * 2 + 2}s;
            `;
            starsContainer.appendChild(star);
        }
    };
    
    createSkyBackground();

    // ========== CUSTOM CURSOR (FIXED) ==========
    const createCursor = () => {
        // Only on non-touch devices
        if ('ontouchstart' in window) return;
        
        // Remove existing cursors if any
        document.querySelectorAll('.cursor-main, .cursor-dot').forEach(el => el.remove());
        
        const cursorMain = document.createElement('div');
        cursorMain.className = 'cursor-main';
        
        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        
        document.body.appendChild(cursorMain);
        document.body.appendChild(cursorDot);
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let dotX = 0, dotY = 0;
        
        // Track mouse globally
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Smooth cursor animation
        const animateCursor = () => {
            // Smooth follow for main cursor
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursorMain.style.left = cursorX + 'px';
            cursorMain.style.top = cursorY + 'px';
            
            // Faster follow for dot
            dotX += (mouseX - dotX) * 0.3;
            dotY += (mouseY - dotY) * 0.3;
            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top = dotY + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        
        animateCursor();
        
        // Hover effects on interactive elements
        const interactiveElements = 'a, button, input, textarea, .skill-card, .project-card, .timeline-content, .formation-card, .highlight-item, .contact-item, .social-link, .nav-links a, .btn';
        
        document.querySelectorAll(interactiveElements).forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorMain.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorMain.classList.remove('hover');
            });
        });
    };
    
    createCursor();

    // ========== NAVIGATION ==========
    const nav = document.querySelector('.nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Scroll effect on nav
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    const updateActiveLink = () => {
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinksItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', updateActiveLink);

    // ========== TYPING EFFECT ==========
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const texts = ['Full Stack Developer', 'Web Developer', 'Mobile Developer', 'Problem Solver'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        const typeText = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500;
            }
            
            setTimeout(typeText, typingSpeed);
        };
        
        typeText();
    }

    // ========== SCROLL REVEAL ==========
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 100;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // ========== COUNTER ANIMATION ==========
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;
    
    const animateCounters = () => {
        if (countersAnimated) return;
        
        const aboutSection = document.querySelector('#about');
        if (!aboutSection) return;
        
        const sectionTop = aboutSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            countersAnimated = true;
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            });
        }
    };
    
    window.addEventListener('scroll', animateCounters);
    animateCounters();

    // ========== MAGNETIC BUTTONS ==========
    const magneticElements = document.querySelectorAll('.btn-primary, .social-link');
    
    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            elem.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        
        elem.addEventListener('mouseleave', () => {
            elem.style.transform = '';
        });
    });

    // ========== TILT EFFECT ON CARDS ==========
    const tiltCards = document.querySelectorAll('.skill-card, .project-card, .formation-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== FORM HANDLING ==========
    const contactForm = document.querySelector('.contact-form');
    const formStatus = document.querySelector('.form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // FormSubmit handles the submission
            // Just show a status after form is submitted
            
            const submitBtn = contactForm.querySelector('.btn-primary');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            }
        });
    }

    // ========== PARALLAX EFFECT ON SCROLL ==========
    const celestialBodies = document.querySelectorAll('.celestial-body');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        celestialBodies.forEach(body => {
            const speed = 0.3;
            body.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ========== RESIZE HANDLER ==========
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Re-initialize cursor on resize
            if (!('ontouchstart' in window)) {
                createCursor();
            }
        }, 250);
    });

    // ========== ADD REVEAL CLASSES TO ELEMENTS ==========
    const addRevealClasses = () => {
        // Section headers
        document.querySelectorAll('.section-header').forEach(el => {
            if (!el.classList.contains('reveal')) el.classList.add('reveal');
        });
        
        // About content
        const aboutImage = document.querySelector('.about-image-card');
        const aboutContent = document.querySelector('.about-content');
        if (aboutImage && !aboutImage.classList.contains('reveal-left')) {
            aboutImage.classList.add('reveal-left');
        }
        if (aboutContent && !aboutContent.classList.contains('reveal-right')) {
            aboutContent.classList.add('reveal-right');
        }
        
        // Grids
        document.querySelectorAll('.skills-grid, .projects-grid, .formation-grid, .li-grid').forEach(el => {
            if (!el.classList.contains('stagger-children')) el.classList.add('stagger-children');
        });
        
        // Timeline items
        document.querySelectorAll('.timeline-item').forEach(el => {
            if (!el.classList.contains('reveal')) el.classList.add('reveal');
        });
        
        // Contact sections
        const contactInfo = document.querySelector('.contact-info');
        const contactFormWrapper = document.querySelector('.contact-form-wrapper');
        if (contactInfo && !contactInfo.classList.contains('reveal-left')) {
            contactInfo.classList.add('reveal-left');
        }
        if (contactFormWrapper && !contactFormWrapper.classList.contains('reveal-right')) {
            contactFormWrapper.classList.add('reveal-right');
        }
    };
    
    addRevealClasses();

    // ========== PRELOAD IMAGES ==========
    const preloadImages = () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.dataset.src) {
                const newImg = new Image();
                newImg.onload = () => {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                };
                newImg.src = img.dataset.src;
            }
        });
    };
    
    preloadImages();

    // ========== CONSOLE MESSAGE ==========
    console.log('%c✨ Portfolio Mirado Razafindratandra ✨', 'font-size: 20px; color: #6366f1; font-weight: bold;');
    console.log('%cThème Univers/Galaxie - Mode Jour/Nuit', 'font-size: 14px; color: #8b5cf6;');
    console.log('%cDéveloppé avec passion 💜', 'font-size: 12px; color: #ec4899;');

});
