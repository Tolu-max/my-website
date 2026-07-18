/**
 * main.js — Anime.js scroll animation engine
 * Portfolio: Toluwalope Samuel Oyelola
 *
 * Approach:
 *  - No Lenis (lighter, faster cold start)
 *  - No cursor effects
 *  - Preloader → body fade-in → hero timeline
 *  - IntersectionObserver drives all scroll reveals
 *  - Anime.js handles sequencing, springs, and stagger
 */

;(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasAnime = typeof anime !== 'undefined';

    /* ─── Show body immediately on reduced-motion ──────────── */
    if (prefersReducedMotion) {
        document.body.style.opacity = '1';
        // Make sure all SA elements are visible
        document.querySelectorAll(
            '.sa-fade-up,.sa-word,.sa-pop,.sa-slide-left,.sa-slide-right,.sa-slide-up,.sa-line,.sa-footer,.sa-stagger-row > *'
        ).forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        initNavAndMenu();
        return;
    }

    /* ─── ACTIVE NAV ────────────────────────────────────────── */
    function initNavAndMenu() {
        const path = window.location.pathname;
        const current = path.split('/').pop() || 'index.html';
        const isBlogPost = /\/blog\/[^/]+\.html$/i.test(path);

        document.querySelectorAll('.nav-link, .mobile-menu-link').forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            const tp = new URL(href, window.location.href).pathname.split('/').pop() || 'index.html';
            const active = isBlogPost ? link.dataset.nav === 'blog' : tp === current;
            link.classList.toggle('active', active);
        });

        /* Mobile menu */
        const toggle = document.querySelector('.menu-toggle');
        const menu   = document.getElementById('mobile-menu');
        const overlay = menu?.querySelector('.mobile-menu-overlay');

        if (toggle && menu) {
            const openMenu = () => {
                menu.classList.add('is-open');
                toggle.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
            };
            const closeMenu = () => {
                menu.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            };

            toggle.addEventListener('click', () => {
                toggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
            });
            overlay?.addEventListener('click', closeMenu);
            menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
            window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
            window.addEventListener('resize', () => { if (window.innerWidth > 720) closeMenu(); });
        }
    }

    /* ─── TOPBAR HIDE-ON-SCROLL-DOWN ───────────────────────── */
    function initTopbarScroll() {
        const topbar = document.getElementById('topbar');
        if (!topbar || !hasAnime) return;

        let prevY = 0;
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (ticking) return;
            requestAnimationFrame(() => {
                const y = window.scrollY;
                if (y > 120) {
                    if (y > prevY + 6) {
                        anime({ targets: topbar, translateY: '-130%', duration: 260, easing: 'easeInCubic' });
                    } else if (y < prevY - 6) {
                        anime({ targets: topbar, translateY: '0%',    duration: 340, easing: 'spring(1, 90, 14, 0)' });
                    }
                }
                prevY = y;
                ticking = false;
            });
            ticking = true;
        }, { passive: true });
    }

    /* ─── PRELOADER ─────────────────────────────────────────── */
    function runPreloader(onComplete) {
        const preloader = document.getElementById('preloader');
        const progress  = document.getElementById('loader-progress');
        const logo      = preloader?.querySelector('.loader-logo');
        const text      = document.getElementById('loader-text');

        if (!preloader || !hasAnime) {
            if (preloader) preloader.style.display = 'none';
            onComplete();
            return;
        }

        /* Set initial state */
        anime.set(logo, { opacity: 0, translateY: '16px' });
        anime.set(text, { opacity: 0 });

        const tl = anime.timeline({ easing: 'easeOutCubic' });

        tl
            .add({ targets: logo, opacity: [0, 1], translateY: ['16px', '0px'], duration: 480 })
            .add({ targets: text, opacity: [0, 0.7], duration: 300 }, '-=240')
            .add({ targets: progress, width: ['0%', '100%'], duration: 900, easing: 'easeInOutQuart' }, '-=200')
            .add({
                targets: preloader,
                opacity: [1, 0],
                duration: 360,
                easing: 'easeInCubic',
                complete() {
                    preloader.style.display = 'none';
                    onComplete();
                }
            }, '+=120');
    }

    /* ─── HERO ENTRANCE TIMELINE ────────────────────────────── */
    function animateHero() {
        if (!hasAnime) {
            document.body.style.opacity = '1';
            return;
        }

        /* Body fade in */
        anime({ targets: document.body, opacity: [0, 1], duration: 400, easing: 'easeOutCubic' });

        /* New centered hero elements */
        const badge   = document.querySelector('.hero-badge');
        const lines   = document.querySelectorAll('.hero-line');
        const sub     = document.querySelector('.hero-sub');
        const lead    = document.querySelector('.hero-lead');
        const actions = document.querySelector('.hero-actions');
        const proofs  = document.querySelectorAll('.proof-card');

        /* Also handle old .sa-word pattern for inner pages */
        const words   = document.querySelectorAll('.sa-word:not(.hero-line)');

        /* Set initial invisible states */
        if (badge)  anime.set(badge,   { opacity: 0, translateY: '16px' });
        if (lines.length) anime.set(lines, { opacity: 0, translateY: '48px' });
        if (sub)    anime.set(sub,     { opacity: 0, translateY: '20px' });
        if (lead)   anime.set(lead,    { opacity: 0, translateY: '20px' });
        if (actions) anime.set(actions, { opacity: 0, translateY: '20px' });
        if (proofs.length) anime.set(proofs, { opacity: 0, translateY: '24px' });
        if (words.length)  anime.set(words,  { opacity: 0, translateY: '36px' });

        const tl = anime.timeline({ easing: 'easeOutCubic' });

        if (badge) {
            tl.add({ targets: badge, opacity: [0,1], translateY: ['16px','0px'], duration: 500 });
        }

        if (lines.length) {
            tl.add({
                targets: lines,
                opacity: [0,1], translateY: ['48px','0px'],
                duration: 700, delay: anime.stagger(110),
                easing: 'spring(1, 68, 10, 0)'
            }, badge ? '-=300' : 0);
        } else if (words.length) {
            tl.add({
                targets: words,
                opacity: [0,1], translateY: ['36px','0px'],
                duration: 680, delay: anime.stagger(90),
                easing: 'spring(1, 72, 10, 0)'
            }, 0);
        }

        if (sub)     tl.add({ targets: sub,     opacity: [0,1], translateY: ['20px','0px'], duration: 480 }, '-=400');
        if (lead)    tl.add({ targets: lead,    opacity: [0,1], translateY: ['20px','0px'], duration: 520 }, '-=380');
        if (actions) tl.add({ targets: actions, opacity: [0,1], translateY: ['20px','0px'], duration: 460, easing: 'spring(1, 90, 12, 0)' }, '-=360');

        if (proofs.length) {
            tl.add({
                targets: proofs,
                opacity: [0,1], translateY: ['24px','0px'],
                duration: 480, delay: anime.stagger(70),
                easing: 'spring(1, 90, 12, 0)'
            }, '-=280');
        }
    }

    /* ─── INTERSECTION OBSERVER FACTORY ────────────────────── */
    function makeObserver(callback, threshold = 0.12) {
        if (!('IntersectionObserver' in window)) return null;
        return new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold });
    }

    /* ─── SCROLL ANIMATIONS INIT ────────────────────────────── */
    function initScrollAnimations() {
        if (!hasAnime) return;

        /* ── FADE UP ── */
        {
            const els = document.querySelectorAll('.sa-fade-up:not(.hero-center .sa-fade-up)');
            els.forEach(el => anime.set(el, { opacity: 0, translateY: '28px' }));
            const obs = makeObserver(el => {
                const delay = parseInt(el.dataset.delay || '0', 10);
                anime({ targets: el, opacity: [0,1], translateY: ['28px','0px'], duration: 620, delay, easing: 'spring(1, 80, 10, 0)' });
            });
            if (obs) els.forEach(el => obs.observe(el));
        }

        /* ── SLIDE UP (cards, project rows) ── */
        {
            const els = document.querySelectorAll('.sa-slide-up');
            els.forEach(el => anime.set(el, { opacity: 0, translateY: '40px' }));
            const obs = makeObserver(el => {
                const delay = parseInt(el.dataset.delay || '0', 10);
                anime({ targets: el, opacity: [0,1], translateY: ['40px','0px'], duration: 680, delay, easing: 'spring(1, 76, 10, 0)' });
            }, 0.10);
            if (obs) els.forEach(el => obs.observe(el));
        }

        /* ── SLIDE LEFT (aside) ── */
        {
            const els = document.querySelectorAll('.sa-slide-left:not(.hero-center .sa-slide-left)');
            els.forEach(el => anime.set(el, { opacity: 0, translateX: '36px' }));
            const obs = makeObserver(el => {
                const delay = parseInt(el.dataset.delay || '0', 10);
                anime({ targets: el, opacity: [0,1], translateX: ['36px','0px'], duration: 660, delay, easing: 'spring(1, 76, 10, 0)' });
            });
            if (obs) els.forEach(el => obs.observe(el));
        }

        /* ── SLIDE RIGHT (recruiter card) ── */
        {
            const els = document.querySelectorAll('.sa-slide-right');
            els.forEach(el => anime.set(el, { opacity: 0, translateX: '-36px' }));
            const obs = makeObserver(el => {
                const delay = parseInt(el.dataset.delay || '0', 10);
                anime({ targets: el, opacity: [0,1], translateX: ['-36px','0px'], duration: 660, delay, easing: 'spring(1, 76, 10, 0)' });
            });
            if (obs) els.forEach(el => obs.observe(el));
        }

        /* ── POP (metrics, stats) ── */
        {
            const els = document.querySelectorAll('.sa-pop');
            els.forEach(el => anime.set(el, { opacity: 0, scale: 0.88 }));
            const obs = makeObserver(el => {
                const delay = parseInt(el.dataset.delay || '0', 10);
                anime({ targets: el, opacity: [0,1], scale: [0.88, 1], duration: 500, delay, easing: 'spring(1, 90, 14, 0)' });
            }, 0.15);
            if (obs) els.forEach(el => obs.observe(el));
        }

        /* ── DIVIDER LINE ── */
        {
            const els = document.querySelectorAll('.sa-line');
            els.forEach(el => anime.set(el, { scaleX: 0, transformOrigin: 'left center' }));
            const obs = makeObserver(el => {
                anime({ targets: el, scaleX: [0, 1], duration: 900, easing: 'easeInOutQuart' });
            }, 0.5);
            if (obs) els.forEach(el => obs.observe(el));
        }

        /* ── STAGGER ROW (stack tags) ── */
        {
            const rows = document.querySelectorAll('.sa-stagger-row');
            rows.forEach(row => {
                const children = Array.from(row.children);
                children.forEach(c => anime.set(c, { opacity: 0, translateY: '14px' }));
                const obs = makeObserver(() => {
                    anime({
                        targets: children,
                        opacity: [0, 1], translateY: ['14px', '0px'],
                        duration: 440, delay: anime.stagger(50),
                        easing: 'spring(1, 90, 12, 0)'
                    });
                }, 0.15);
                if (obs) obs.observe(row);
            });
        }

        /* ── FOOTER ── */
        {
            const footer = document.querySelector('.sa-fade-up.footer-shell, .footer-shell.sa-fade-up');
            if (footer) {
                anime.set(footer, { opacity: 0, translateY: '36px' });
                const obs = makeObserver(el => {
                    anime({ targets: el, opacity: [0,1], translateY: ['36px','0px'], duration: 800, easing: 'spring(1, 72, 10, 0)' });
                }, 0.08);
                if (obs) obs.observe(footer);
            }
        }
    }

    /* ─── STAT COUNTER ──────────────────────────────────────── */
    function initStatCounters() {
        if (!hasAnime) return;
        const obs = makeObserver(el => {
            const target = parseInt(el.dataset.target, 10);
            anime({
                targets: el,
                innerHTML: [0, target],
                duration: 1200,
                delay: parseInt(el.closest('.sa-pop')?.dataset.delay || '0', 10),
                easing: 'easeOutCubic',
                round: 1
            });
        }, 0.5);
        document.querySelectorAll('.stat-number').forEach(n => obs?.observe(n));
    }

    /* ─── MOUSE FOLLOW EFFECT ─────────────────────────────── */
    function initMouseFollow() {
        if (prefersReducedMotion) return;

        const cards = document.querySelectorAll('.hero-panel, .feature-card, .bento-item, .project-row, .info-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    /* ─── BOOT ──────────────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', () => {
        initNavAndMenu();
        initTopbarScroll();
        initScrollAnimations();
        initStatCounters();
        initMouseFollow();

        runPreloader(() => {
            animateHero();
        });
    });

})();
