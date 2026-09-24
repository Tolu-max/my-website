/**
 * main.js — Interactive UI & Smooth Scroll Motion
 * Portfolio: Toluwalope Samuel Oyelola (Full Stack Developer)
 */

(function () {
    'use strict';

    // 1. Mobile Navigation Drawer Toggle
    function initNavigation() {
        const toggle = document.querySelector('.menu-toggle');
        const drawer = document.querySelector('.mobile-drawer, .mobile-menu');
        const isMobileMenu = drawer && drawer.classList.contains('mobile-menu');

        if (!toggle || !drawer) return;
        // Blog pages wire their own drawer controls in blog-tools.js.
        if (isMobileMenu && document.querySelector('script[src*="blog-tools.js"]')) return;

        const toggleMenu = () => {
            const isOpen = drawer.classList.contains('is-open') || drawer.classList.contains('open');
            if (isOpen) {
                drawer.classList.remove('is-open');
                drawer.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            } else {
                drawer.classList.add('is-open');
                toggle.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
            }
        };

        toggle.addEventListener('click', toggleMenu);

        const overlay = isMobileMenu ? drawer.querySelector('.mobile-menu-overlay') : null;
        if (overlay) overlay.addEventListener('click', toggleMenu);

        drawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                drawer.classList.remove('is-open');
                drawer.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        window.addEventListener('keydown', e => {
            if (e.key === 'Escape' && (drawer.classList.contains('is-open') || drawer.classList.contains('open'))) {
                toggleMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 720 && drawer.classList.contains('is-open')) {
                drawer.classList.remove('is-open');
                drawer.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // 2. Active Navigation Highlight (Supports both .html and clean extensionless URLs)
    function initActiveNav() {
        const path = window.location.pathname.replace(/\/$/, '') || '/';
        const rawSegment = path.split('/').pop() || 'index';
        const currentName = rawSegment.replace(/\.html$/, '') || 'index';

        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#')) return;
            const targetSegment = href.split('/').pop() || 'index';
            const targetName = targetSegment.replace(/\.html$/, '') || 'index';

            if (targetName === currentName) {
                link.classList.add('active');
            }
        });
    }

    // 3. Header Behavior on Scroll (Scroll Direction & Shrink)
    function initHeaderScroll() {
        const header = document.querySelector('.site-header');
        if (!header) return;

        let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
        let isTicking = false;

        const handleScroll = () => {
            const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;

            // Reduce height / add shadow when scrolled past top
            if (currentScrollY > 40) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }

            // Directional detection: hide on scroll down (after 180px threshold), reveal on scroll up
            if (currentScrollY > 200 && currentScrollY > lastScrollY) {
                // Scrolling DOWN
                header.classList.add('header-hidden');
            } else {
                // Scrolling UP or near top
                header.classList.remove('header-hidden');
            }

            lastScrollY = Math.max(0, currentScrollY);
            isTicking = false;
        };

        window.addEventListener('scroll', () => {
            if (!isTicking) {
                window.requestAnimationFrame(handleScroll);
                isTicking = true;
            }
        }, { passive: true });
    }

    // 4. Subtle, Accurate Scroll Progress Bar
    function initScrollProgress() {
        const progressBar = document.getElementById('scroll-progress');
        if (!progressBar) return;

        let isTicking = false;

        const updateProgress = () => {
            const winScroll = window.pageYOffset || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
            progressBar.style.width = Math.min(100, Math.max(0, scrolled)) + '%';
            isTicking = false;
        };

        window.addEventListener('scroll', () => {
            if (!isTicking) {
                window.requestAnimationFrame(updateProgress);
                isTicking = true;
            }
        }, { passive: true });

        updateProgress();
    }

    // 5. High-Performance IntersectionObserver Scroll Reveals & Stagger
    function initScrollReveal() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const revealElements = document.querySelectorAll(
            '.reveal-on-scroll, .project-editorial, .timeline-card, .info-card, .contact-card, .bento-item, .skill-facet-card, .standards-item, ' +
            '.sa-fade-up, .sa-slide-up, .sa-slide-left, .sa-slide-right, .sa-pop, .sa-stagger-item, .sa-line, ' +
            '.contact-panel, .about-timeline, .about-timeline-item, .case-hero-media, .case-meta-item'
        );

        if (revealElements.length === 0) return;

        // Older portfolio pages use sa-* motion hooks; route them through one observer
        // so their movement stays consistent and can be disabled in one place.
        revealElements.forEach(el => el.classList.add('reveal-on-scroll'));
        const staggerIndexes = new Map();
        revealElements.forEach(el => {
            if (!el.matches('.sa-stagger-item, .about-timeline-item, .case-meta-item')) return;
            const parent = el.parentElement;
            const index = staggerIndexes.get(parent) || 0;
            staggerIndexes.set(parent, index + 1);
            el.style.setProperty('--reveal-delay', `${Math.min(index * 65, 260)}ms`);
        });

        if (prefersReducedMotion) {
            revealElements.forEach(el => el.classList.add('is-visible'));
            return;
        }

        if (!('IntersectionObserver' in window)) {
            revealElements.forEach(el => el.classList.add('is-visible'));
            return;
        }

        document.documentElement.classList.add('motion-ready');

        const observerOptions = {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.classList.add('is-visible');

                    // Stagger badge pops for lively bounce
                    const badges = el.querySelectorAll('.tech-tag, .skill-badge');
                    if (badges.length > 0) {
                        badges.forEach((b, idx) => {
                            b.style.animation = `badgePop 0.42s cubic-bezier(0.34, 1.56, 0.64, 1) ${Math.min(idx * 45, 360)}ms both`;
                        });
                    }

                    // If it has staggered children (e.g. tag clusters or card lists)
                    const staggerChildren = el.querySelectorAll('.tech-tag, .skill-badge, .pill, .mini-list li');
                    if (staggerChildren.length > 0) {
                        staggerChildren.forEach((child, idx) => {
                            child.style.transitionDelay = `${Math.min(idx * 35, 300)}ms`;
                        });
                    }

                    obs.unobserve(el);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // If in initial viewport, stagger slightly on load so user perceives entrance animation
                setTimeout(() => {
                    el.classList.add('is-visible');
                }, 60);
            } else {
                observer.observe(el);
            }
        });
    }

    // 7. Micro-Interactions (Navbar, buttons, skill hover dim)
    function initMicroInteractions() {
        // Nav hover — dim inactive links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                navLinks.forEach(other => {
                    if (other !== link && !other.classList.contains('active')) {
                        other.style.opacity = '0.5';
                    }
                });
            });
            link.addEventListener('mouseleave', () => {
                navLinks.forEach(other => { other.style.opacity = ''; });
            });
        });

        // Button press ripple feedback (subtle scale on mousedown)
        document.querySelectorAll('.btn-primary, .btn-secondary, .filter-tab').forEach(btn => {
            btn.addEventListener('mousedown', () => {
                btn.style.transition = 'transform 0.08s ease, box-shadow 0.08s ease';
            });
            btn.addEventListener('mouseup', () => {
                btn.style.transition = '';
            });
        });
    }

    // 8. FAQ Accordion
    function initFAQ() {
        document.querySelectorAll('.faq-toggle').forEach(toggle => {
            toggle.addEventListener('click', () => {
                const item = toggle.closest('.faq-item');
                if (!item) return;
                const isOpen = item.classList.contains('is-open');

                // Close all others
                document.querySelectorAll('.faq-item.is-open').forEach(open => {
                    if (open !== item) open.classList.remove('is-open');
                });

                item.classList.toggle('is-open', !isOpen);
            });
        });
    }

    // 9. Clipboard Email Copy
    function initClipboard() {
        const copyBtns = document.querySelectorAll('[data-copy]');
        if (copyBtns.length === 0) return;

        // Toast element
        let toast = document.querySelector('.copy-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'copy-toast';
            toast.innerHTML = '<span class="toast-dot"></span> Copied to clipboard';
            document.body.appendChild(toast);
        }

        const showToast = () => {
            toast.classList.add('show');
            clearTimeout(toast._timer);
            toast._timer = setTimeout(() => toast.classList.remove('show'), 2400);
        };

        copyBtns.forEach(btn => {
            btn.addEventListener('click', async () => {
                const text = btn.getAttribute('data-copy');
                try {
                    await navigator.clipboard.writeText(text);
                    const orig = btn.textContent;
                    btn.textContent = '✓ Copied';
                    btn.style.color = 'var(--green)';
                    btn.style.borderColor = 'var(--green)';
                    showToast();
                    setTimeout(() => {
                        btn.textContent = orig;
                        btn.style.color = '';
                        btn.style.borderColor = '';
                    }, 2000);
                } catch (_) {
                    // Fallback: select text
                    const ta = document.createElement('textarea');
                    ta.value = text;
                    ta.style.position = 'fixed';
                    ta.style.opacity = '0';
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand('copy');
                    document.body.removeChild(ta);
                    showToast();
                }
            });
        });
    }

    // 10. Contact Form — report the actual Formspree response
    function initContactForm() {
        const form = document.querySelector('form[action*="formspree"]');
        if (!form) return;

        const submitBtn = form.querySelector('button[type="submit"]');
        const status = form.querySelector('[data-form-status]');
        if (!submitBtn || !status) return;

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            submitBtn.disabled = true;
            submitBtn.classList.add('is-loading');
            submitBtn.textContent = 'Sending...';
            status.textContent = '';
            status.removeAttribute('data-state');

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { Accept: 'application/json' }
                });
                const contentType = response.headers.get('content-type') || '';
                const result = contentType.includes('application/json')
                    ? await response.json().catch(() => null)
                    : null;
                if (!response.ok || !result || result.ok === false || (Array.isArray(result.errors) && result.errors.length > 0)) {
                    throw new Error('Form service rejected the message.');
                }

                form.reset();
                status.dataset.state = 'success';
                status.textContent = 'Message sent. Thanks — I’ll get back to you soon.';
            } catch (error) {
                status.dataset.state = 'error';
                status.textContent = 'Your message could not be sent. Please check your connection and try again, or use the email link under Direct Communication.';
            } finally {
                submitBtn.disabled = false;
                submitBtn.classList.remove('is-loading');
                submitBtn.textContent = 'Send Message';
            }
        });
    }

    // 11. Filter Tabs — Category filter with data-filter attribute
    function initFilterTabs() {
        const tabs = document.querySelectorAll('.filter-tab');
        if (tabs.length === 0) return;

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const filter = tab.getAttribute('data-filter');
                if (!filter) return;

                const targets = document.querySelectorAll('[data-category]');
                targets.forEach(el => {
                    if (filter === 'all' || el.getAttribute('data-category') === filter) {
                        el.style.display = '';
                        requestAnimationFrame(() => {
                            el.style.opacity = '1';
                            el.style.transform = '';
                        });
                    } else {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(8px) scale(0.98)';
                        setTimeout(() => { el.style.display = 'none'; }, 200);
                    }
                });
            });
        });
    }

    // 12. Stat card — subtle hover sound (web audio, optional, restrained)
    // Deliberately omitted — keeps professionalism.

    // Initialize on DOM Ready
    document.addEventListener('DOMContentLoaded', () => {
        initNavigation();
        initActiveNav();
        initHeaderScroll();
        initScrollProgress();
        initScrollReveal();
        initMicroInteractions();
        initFAQ();
        initClipboard();
        initContactForm();
        initFilterTabs();
        initHeroAtmosphere();
        initHeroStackInspector();
        initSkillsExplorer();
        initCounterAnimation();
        initBackToTop();
        initInteractiveDrawings();
        initMagneticButtons();
    });

    // 12. Hero Atmosphere & Mouse Parallax Orbs
    function initHeroAtmosphere() {
        const hero = document.querySelector('.section-hero');
        const orbs = document.querySelectorAll('.parallax-orb');
        if (!hero || orbs.length === 0) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let targetX = 0, targetY = 0;
        let currentX = 0, currentY = 0;
        let animationFrame = 0;

        const scheduleAnimation = () => {
            if (!animationFrame) animationFrame = requestAnimationFrame(animateOrbs);
        };

        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            targetX = x * 45;
            targetY = y * 35;
            scheduleAnimation();
        });

        hero.addEventListener('mouseleave', () => {
            targetX = 0;
            targetY = 0;
            scheduleAnimation();
        });

        function animateOrbs() {
            animationFrame = 0;
            currentX += (targetX - currentX) * 0.08;
            currentY += (targetY - currentY) * 0.08;

            orbs.forEach((orb, i) => {
                const speed = parseFloat(orb.dataset.speed) || (i === 0 ? 0.35 : -0.25);
                orb.style.transform = `translate3d(${currentX * speed}px, ${currentY * speed}px, 0)`;
            });

            if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
                scheduleAnimation();
            }
        }
    }

    // Let visitors inspect the real systems behind the featured TConnect build.
    function initHeroStackInspector() {
        const inspector = document.querySelector('.hero-stack-inspector');
        if (!inspector) return;

        const note = inspector.querySelector('.hero-stack-note');
        const controls = inspector.querySelectorAll('.hero-stack-controls button[data-detail]');
        if (!note || controls.length === 0) return;

        controls.forEach(button => {
            button.addEventListener('click', () => {
                if (button.getAttribute('aria-pressed') === 'true') return;

                controls.forEach(control => control.setAttribute('aria-pressed', String(control === button)));
                note.textContent = button.dataset.detail;
            });
        });
    }

    // Reveal a focused skill story on hover, click, or keyboard focus.
    function initSkillsExplorer() {
        const explorer = document.querySelector('.skills-explorer');
        if (!explorer) return;

        const controls = explorer.querySelectorAll('.skills-explorer-index button[data-panel]');
        const panels = explorer.querySelectorAll('.skills-explorer-panel');
        const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

        const selectArea = (button) => {
            const panelId = button.dataset.panel;
            const selectedPanel = explorer.querySelector(`#${panelId}`);
            if (!selectedPanel) return;
            if (button.getAttribute('aria-pressed') === 'true' && !selectedPanel.hidden) return;

            controls.forEach(control => control.setAttribute('aria-pressed', String(control === button)));
            panels.forEach(panel => {
                const isSelected = panel === selectedPanel;
                panel.hidden = !isSelected;
                if (isSelected) {
                    panel.classList.remove('is-active');
                    void panel.offsetWidth;
                    panel.classList.add('is-active');
                }
            });
        };

        controls.forEach(button => {
            button.addEventListener('click', () => selectArea(button));
            button.addEventListener('focus', () => selectArea(button));
            if (canHover) button.addEventListener('pointerenter', () => selectArea(button));
        });
    }

    // 13. Dynamic Numbers Count-Up Animation
    function initCounterAnimation() {
        const statNums = document.querySelectorAll('.stat-num, [data-target]');
        if (statNums.length === 0) return;

        const animateCount = (el) => {
            if (el.dataset.hasCounted) return;
            el.dataset.hasCounted = 'true';

            const rawTarget = el.getAttribute('data-target') || el.textContent.replace(/[^0-9]/g, '');
            const target = parseInt(rawTarget, 10);
            if (isNaN(target)) return;

            const suffix = el.getAttribute('data-suffix') !== null ? el.getAttribute('data-suffix') : (el.textContent.includes('+') ? '+' : '');
            const prefix = el.getAttribute('data-prefix') || '';
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                const finalFormatted = target >= 1000 ? target.toLocaleString('en-US') : target;
                el.textContent = `${prefix}${finalFormatted}${suffix}`;
                return;
            }
            const duration = Math.min(1800, Math.max(1000, target > 100 ? 1600 : 900));
            const startTime = performance.now();

            const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

            const update = (now) => {
                const elapsed = now - startTime;
                const progress = Math.min(1, elapsed / duration);
                const eased = easeOutExpo(progress);
                const current = Math.floor(eased * target);

                const formatted = target >= 1000 ? current.toLocaleString('en-US') : current;
                el.textContent = `${prefix}${formatted}${suffix}`;

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    const finalFormatted = target >= 1000 ? target.toLocaleString('en-US') : target;
                    el.textContent = `${prefix}${finalFormatted}${suffix}`;

                    // Trigger scribble animation if inside stat card
                    const card = el.closest('.interactive-stat-card');
                    if (card) {
                        const scribble = card.querySelector('.stat-scribble path');
                        if (scribble) {
                            scribble.style.animation = 'none';
                            scribble.offsetHeight;
                            scribble.style.animation = 'marker-loop 620ms var(--ease-out) both';
                        }
                    }
                }
            };

            requestAnimationFrame(update);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        statNums.forEach(el => observer.observe(el));
    }

    // 14. Floating Back-to-Top Button with Circular Scroll Progress
    function initBackToTop() {
        let btt = document.querySelector('.back-to-top');
        if (!btt) {
            btt = document.createElement('button');
            btt.className = 'back-to-top';
            btt.setAttribute('aria-label', 'Back to top');
            btt.innerHTML = `
                <svg class="progress-ring" viewBox="0 0 52 52">
                    <circle cx="26" cy="26" r="25" />
                </svg>
                <span class="btt-arrow">&uarr;</span>
            `;
            document.body.appendChild(btt);
        }

        const circle = btt.querySelector('circle');
        const radius = 25;
        const circumference = 2 * Math.PI * radius;
        circle.style.strokeDasharray = `${circumference}`;
        circle.style.strokeDashoffset = `${circumference}`;

        let isTicking = false;
        const handleScroll = () => {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = height > 0 ? Math.min(1, Math.max(0, scrollY / height)) : 0;

            circle.style.strokeDashoffset = `${circumference * (1 - progress)}`;

            if (scrollY > 280) {
                btt.classList.add('is-shown');
            } else {
                btt.classList.remove('is-shown');
            }
            isTicking = false;
        };

        window.addEventListener('scroll', () => {
            if (!isTicking) {
                window.requestAnimationFrame(handleScroll);
                isTicking = true;
            }
        }, { passive: true });

        btt.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
            });
        });

        handleScroll();
    }

    // 16. Interactive SVG Marker Drawings Replay
    function initInteractiveDrawings() {
        const toluMark = document.querySelector('.home-title-name-mark');
        if (toluMark) {
            const path = toluMark.querySelector('svg path');
            if (path) {
                toluMark.addEventListener('mouseenter', () => {
                    path.style.animation = 'none';
                    path.offsetHeight;
                    path.style.animation = 'marker-circle 650ms var(--ease-out) both';
                });
            }
        }

        const handnote = document.querySelector('.project-handnote');
        if (handnote) {
            const arrowPath = handnote.querySelector('svg path');
            if (arrowPath) {
                handnote.addEventListener('mouseenter', () => {
                    arrowPath.style.animation = 'none';
                    arrowPath.offsetHeight;
                    arrowPath.style.animation = 'marker-arrow 450ms var(--ease-out) both';
                });
            }
        }

        document.querySelectorAll('.interactive-stat-card').forEach(card => {
            const scribblePath = card.querySelector('.stat-scribble path');
            if (scribblePath) {
                card.addEventListener('mouseenter', () => {
                    scribblePath.style.animation = 'none';
                    scribblePath.offsetHeight;
                    scribblePath.style.animation = 'marker-loop 620ms var(--ease-out) both';
                });
            }
        });
    }

    // 17. Magnetic Button Micro-Interaction
    function initMagneticButtons() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const magnets = document.querySelectorAll('.btn-primary, .btn-secondary, .brand-symbol, .footer-btn-primary');
        magnets.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.16}px, ${y * 0.16}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }


})();
