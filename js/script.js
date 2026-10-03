/* ==================== SCRIPT.JS - PAGE INTERACTIONS ==================== */
/* All page content lives in index.html. This file only adds behaviour. */

(function () {
    'use strict';

    /* ---------- Mobile menu ---------- */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    function setMenu(open) {
        if (!hamburger || !navMenu) return;
        navMenu.classList.toggle('active', open);
        hamburger.classList.toggle('active', open);
        hamburger.setAttribute('aria-expanded', String(open));
        hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            setMenu(!navMenu.classList.contains('active'));
        });
        navMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) setMenu(false);
        });
    }

    /* ---------- Header shadow on scroll ---------- */
    const header = document.getElementById('header');
    const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- Active nav link ---------- */
    const links = Array.from(document.querySelectorAll('.nav-link'));
    const sections = links
        .map((l) => document.querySelector(l.getAttribute('href')))
        .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const id = '#' + entry.target.id;
                links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === id));
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        sections.forEach((s) => navObserver.observe(s));
    }

    /* ---------- Reveal on scroll ---------- */
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        document.documentElement.classList.add('js-reveal');
        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach((el) => revealObserver.observe(el));
    }

    /* ---------- Lightbox for photos & diagrams ---------- */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    let lastFocus = null;

    function openLightbox(src, alt) {
        if (!lightbox) return;
        lastFocus = document.activeElement;
        lightboxImg.src = src;
        lightboxImg.alt = alt || '';
        lightbox.hidden = false;
        document.body.classList.add('no-scroll');
        lightboxClose.focus();
    }

    function closeLightbox() {
        if (!lightbox || lightbox.hidden) return;
        lightbox.hidden = true;
        lightboxImg.removeAttribute('src');
        document.body.classList.remove('no-scroll');
        if (lastFocus) lastFocus.focus();
    }

    document.querySelectorAll('[data-full]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const img = btn.querySelector('img');
            openLightbox(btn.dataset.full, img ? img.alt : '');
        });
    });
    if (lightbox) {
        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') { closeLightbox(); setMenu(false); }
        });
    }

    /* ---------- Footer year ---------- */
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
})();
