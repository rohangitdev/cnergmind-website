/* ==================== HERO CAROUSEL ==================== */
class HeroCarousel {
    constructor() {
        this.slides = [];
        this.currentSlide = 0;
        this.slideContainer = document.querySelector('.hero-slides');
        this.dotsContainer = document.getElementById('hero-dots');
        this.heroTitle = document.getElementById('hero-title');
        this.heroSubtitle = document.getElementById('hero-subtitle');
        this.autoplayInterval = null;
        
        if (this.slideContainer && HERO_SLIDES) {
            this.init();
        }
    }
    
    init() {
        this.createSlides();
        this.createDots();
        this.startAutoplay();
    }
    
    createSlides() {
        HERO_SLIDES.forEach((slide, index) => {
            const slideEl = document.createElement('div');
            slideEl.className = `hero-slide ${index === 0 ? 'active' : ''}`;
            slideEl.style.background = slide.gradient;
            this.slideContainer.appendChild(slideEl);
            this.slides.push(slideEl);
        });
    }
    
    createDots() {
        HERO_SLIDES.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlides();
        this.resetAutoplay();
    }
    
    updateSlides() {
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
        const slide = HERO_SLIDES[this.currentSlide];
        this.heroTitle.textContent = slide.title;
        this.heroSubtitle.textContent = slide.subtitle;
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % HERO_SLIDES.length;
        this.updateSlides();
    }
    
    startAutoplay() {
        this.autoplayInterval = setInterval(() => this.nextSlide(), 5000);
    }
    
    resetAutoplay() {
        clearInterval(this.autoplayInterval);
        this.startAutoplay();
    }
}

/* ==================== MOBILE MENU ==================== */
class MobileMenu {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.nav = document.getElementById('main-nav');
        
        if (this.hamburger && this.nav) {
            this.init();
        }
    }
    
    init() {
        this.hamburger.addEventListener('click', () => this.toggle());
        this.nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.close());
        });
        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) && !this.nav.contains(e.target)) {
                this.close();
            }
        });
    }
    
    toggle() {
        this.nav.classList.toggle('active');
    }
    
    close() {
        this.nav.classList.remove('active');
    }
}

/* ==================== SMOOTH SCROLL ==================== */
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
}

/* ==================== SCROLL ANIMATIONS ==================== */
class ScrollAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.scroll-animate').forEach(el => {
            observer.observe(el);
        });
    }
}

/* ==================== ACTIVE NAV LINK ==================== */
class ActiveNavLink {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section');
        
        if (this.navLinks.length && this.sections.length) {
            this.init();
        }
    }
    
    init() {
        window.addEventListener('scroll', () => this.updateActiveLink());
        this.updateActiveLink();
    }
    
    updateActiveLink() {
        let current = '';
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
}

/* ==================== RENDER DYNAMIC CONTENT ==================== */
class ContentRenderer {
    constructor() {
        this.init();
    }
    
    init() {
        this.renderServices();
        this.renderBenefits();
        this.renderExpertise();
        this.renderGallery();
        this.renderTestimonials();
        this.renderSocialLinks();
    }
    
    renderServices() {
        const grid = document.getElementById('services-grid');
        if (!grid || !SERVICES) return;
        grid.innerHTML = SERVICES.map(service => `
            <div class="service-card scroll-animate">
                <div class="icon">${service.icon}</div>
                <h3>${service.title}</h3>
                <p>${service.shortDesc}</p>
                <ul class="service-features">
                    ${service.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }
    
    renderBenefits() {
        const grid = document.getElementById('benefits-grid');
        if (!grid || !BENEFITS) return;
        grid.innerHTML = BENEFITS.map(benefit => `
            <div class="benefit-box scroll-animate">
                <div class="benefit-number">${benefit.number}</div>
                <h3>${benefit.title}</h3>
                <p>${benefit.description}</p>
            </div>
        `).join('');
    }
    
    renderExpertise() {
        const grid = document.getElementById('expertise-grid');
        if (!grid || !EXPERTISE_AREAS) return;
        grid.innerHTML = EXPERTISE_AREAS.map(area => `
            <div class="expertise-item scroll-animate">
                <div class="icon">${area.icon}</div>
                <h4>${area.name}</h4>
            </div>
        `).join('');
    }
    
    renderGallery() {
        const grid = document.getElementById('gallery-grid');
        if (!grid || !GALLERY_PROJECTS) return;
        grid.innerHTML = GALLERY_PROJECTS.map(project => `
            <div class="gallery-item scroll-animate">
                <div>
                    <h3>${project.title}</h3>
                    <p>${project.caption}</p>
                </div>
            </div>
        `).join('');
    }
    
    renderTestimonials() {
        const grid = document.getElementById('testimonials-grid');
        if (!grid || !TESTIMONIALS) return;
        grid.innerHTML = TESTIMONIALS.map(testimonial => `
            <div class="testimonial-card scroll-animate">
                <div class="testimonial-text">"${testimonial.text}"</div>
                <div class="testimonial-stars">${'★'.repeat(testimonial.rating)}${'☆'.repeat(5-testimonial.rating)}</div>
                <div class="testimonial-author">${testimonial.author}</div>
                <div class="testimonial-company">${testimonial.company}</div>
            </div>
        `).join('');
    }
    
    renderSocialLinks() {
        const container = document.getElementById('social-links');
        if (!container || !SOCIAL_LINKS) return;
        container.innerHTML = `
            <a href="${SOCIAL_LINKS.facebook}" target="_blank" title="Facebook">f</a>
            <a href="${SOCIAL_LINKS.linkedin}" target="_blank" title="LinkedIn">in</a>
            <a href="${SOCIAL_LINKS.instagram}" target="_blank" title="Instagram">📷</a>
            <a href="${SOCIAL_LINKS.twitter}" target="_blank" title="Twitter">𝕏</a>
            <a href="${SOCIAL_LINKS.youtube}" target="_blank" title="YouTube">▶</a>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new HeroCarousel();
    new MobileMenu();
    new SmoothScroll();
    new ScrollAnimations();
    new ActiveNavLink();
    new ContentRenderer();
    console.log('✓ All modules initialized successfully');
});
