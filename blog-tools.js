const BLOG_POSTS = [
    { slug: 'business-website-cost-in-nigeria', title: 'Business Website Cost in Nigeria', category: 'business' },
    { slug: 'why-every-business-needs-a-website-in-2026', title: 'Why Every Business Needs a Website in 2026', category: 'business' },
    { slug: 'website-redesign-vs-new-website', title: 'Website Redesign vs New Website', category: 'business' },
    { slug: 'service-page-structure-for-local-business', title: 'Service Page Structure for Local Business', category: 'business' },
    { slug: 'contact-page-best-practices-for-conversion', title: 'Contact Page Best Practices for Conversion', category: 'business' },
    { slug: 'about-page-copy-that-builds-trust', title: 'About Page Copy That Builds Trust', category: 'business' },
    { slug: 'website-content-checklist-for-business-owners', title: 'Website Content Checklist for Business Owners', category: 'business' },
    { slug: 'landing-page-vs-full-website', title: 'Landing Page vs Full Website', category: 'business' },
    { slug: 'how-long-to-build-a-business-website', title: 'How Long to Build a Business Website', category: 'business' },
    { slug: 'how-to-price-web-development-services', title: 'How to Price Web Development Services', category: 'business' },
    { slug: 'local-seo-basics-for-business-websites', title: 'Local SEO Basics for Business Websites', category: 'seo' },
    { slug: 'on-page-seo-checklist-for-static-websites', title: 'On-Page SEO Checklist for Static Websites', category: 'seo' },
    { slug: 'how-to-write-better-seo-title-tags', title: 'How to Write Better SEO Title Tags', category: 'seo' },
    { slug: 'meta-description-writing-guide', title: 'Meta Description Writing Guide', category: 'seo' },
    { slug: 'technical-seo-for-small-business-sites', title: 'Technical SEO for Small Business Sites', category: 'seo' },
    { slug: 'internal-linking-strategy-for-service-websites', title: 'Internal Linking Strategy for Service Websites', category: 'seo' },
    { slug: 'image-seo-guide-for-business-websites', title: 'Image SEO Guide for Business Websites', category: 'seo' },
    { slug: 'schema-markup-for-portfolio-websites', title: 'Schema Markup for Portfolio Websites', category: 'seo' },
    { slug: 'seo-blog-strategy-for-service-businesses', title: 'SEO Blog Strategy for Service Businesses', category: 'seo' },
    { slug: 'keyword-research-for-web-developers', title: 'Keyword Research for Web Developers', category: 'seo' },
    { slug: 'laravel-vs-wordpress-for-business-websites', title: 'Laravel vs WordPress for Business Websites', category: 'technical' },
    { slug: 'php-and-laravel-stack-explained', title: 'PHP and Laravel Stack Explained', category: 'technical' },
    { slug: 'mysql-best-practices-for-web-applications', title: 'MySQL Best Practices for Web Applications', category: 'technical' },
    { slug: 'api-integration-guide-for-business-platforms', title: 'API Integration Guide for Business Platforms', category: 'technical' },
    { slug: 'secure-contact-form-setup-for-static-sites', title: 'Secure Contact Form Setup for Static Sites', category: 'technical' },
    { slug: 'monthly-website-maintenance-checklist', title: 'Monthly Website Maintenance Checklist', category: 'technical' },
    { slug: 'website-performance-audit-guide', title: 'Website Performance Audit Guide', category: 'technical' },
    { slug: 'accessibility-basics-for-business-websites', title: 'Accessibility Basics for Business Websites', category: 'technical' },
    { slug: 'mobile-navigation-best-practices', title: 'Mobile Navigation Best Practices', category: 'technical' },
    { slug: 'how-to-plan-a-scalable-web-app-mvp', title: 'How to Plan a Scalable Web App MVP', category: 'technical' },
    { slug: 'how-to-hire-a-web-developer-without-wasting-budget', title: 'How to Hire a Web Developer Without Wasting Budget', category: 'hiring' },
    { slug: 'how-to-work-effectively-with-a-remote-web-developer', title: 'How to Work Effectively With a Remote Web Developer', category: 'hiring' },
    { slug: 'web-developer-interview-questions-for-business-owners', title: 'Web Developer Interview Questions for Business Owners', category: 'hiring' },
    { slug: 'what-recruiters-look-for-in-a-portfolio-website', title: 'What Recruiters Look For in a Portfolio Website', category: 'hiring' },
    { slug: 'how-to-stand-out-as-a-laravel-developer', title: 'How to Stand Out as a Laravel Developer', category: 'hiring' },
    { slug: 'client-onboarding-for-freelance-web-developers', title: 'Client Onboarding for Freelance Web Developers', category: 'hiring' },
    { slug: 'how-to-write-better-proposals-for-web-projects', title: 'How to Write Better Proposals for Web Projects', category: 'hiring' },
    { slug: 'remote-team-communication-for-web-projects', title: 'Remote Team Communication for Web Projects', category: 'hiring' },
    { slug: 'build-a-job-ready-developer-portfolio', title: 'Build a Job-Ready Developer Portfolio', category: 'hiring' },
    { slug: 'how-to-get-remote-web-development-jobs-faster', title: 'How to Get Remote Web Development Jobs Faster', category: 'hiring' },
    { slug: 'starter-business-website-from-naira30000', title: 'Starter Business Website from ₦250,000', category: 'offers' },
    { slug: 'responsive-website-checklist-for-business-owners', title: 'Responsive Website Checklist for Business Owners', category: 'offers' },
    { slug: 'seo-friendly-website-structure-that-works', title: 'SEO-Friendly Website Structure That Works', category: 'offers' },
    { slug: 'website-speed-optimization-for-small-businesses', title: 'Website Speed Optimization for Small Businesses', category: 'offers' },
    { slug: 'portfolio-website-tips-for-freelancers', title: 'Portfolio Website Tips for Freelancers', category: 'offers' },
    { slug: 'small-business-website-features-checklist', title: 'Small Business Website Features Checklist', category: 'offers' },
    { slug: 'how-to-evaluate-a-remote-full-stack-developer', title: 'How to Evaluate a Remote Full Stack Developer', category: 'offers' },
    { slug: 'how-to-present-projects-to-recruiters', title: 'How to Present Projects to Recruiters', category: 'offers' },
    { slug: 'business-website-feature-prioritization-guide', title: 'Business Website Feature Prioritization Guide', category: 'offers' },
    { slug: 'website-launch-checklist-for-service-businesses', title: 'Website Launch Checklist for Service Businesses', category: 'offers' }
];

const CATEGORY_LABELS = {
    all: 'All',
    business: 'Business',
    seo: 'SEO',
    technical: 'Technical',
    hiring: 'Hiring',
    offers: 'Offers'
};

const BLOG_MAP = new Map(BLOG_POSTS.map((post) => [post.slug, post]));

function getSlugFromHref(href) {
    if (!href) return '';
    const parts = href.split('/');
    const fileName = parts[parts.length - 1];
    return fileName.replace('.html', '').trim().toLowerCase();
}

function initBlogPageNav() {
    const pathname = window.location.pathname;
    const currentPath = pathname.split('/').pop() || 'index.html';
    const isBlogPost = /\/blog\/[^/]+\.html$/i.test(pathname);

    const isLinkActive = (href, dataNav) => {
        if (!href) return false;
        const targetPath = new URL(href, window.location.href).pathname.split('/').pop() || 'index.html';
        if (isBlogPost && dataNav === 'blog') return true;
        return targetPath === currentPath;
    };

    document.querySelectorAll('.nav-link, .mobile-menu-link').forEach((link) => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', isLinkActive(href, link.dataset.nav));
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    if (!menuToggle || !mobileMenu) return;

    const setMenuState = (isOpen) => {
        mobileMenu.classList.toggle('is-open', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        setMenuState(!isOpen);
    });

    overlay?.addEventListener('click', () => setMenuState(false));
    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setMenuState(false));
    });
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') setMenuState(false);
    });
}

function initBlogFilters() {
    const grid = document.querySelector('.blog-grid');
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('.info-card'));
    if (!cards.length) return;

    cards.forEach((card) => {
        const link = card.querySelector('a[href*="blog/"]');
        const slug = getSlugFromHref(link?.getAttribute('href') || '');
        const post = BLOG_MAP.get(slug);
        const category = post?.category || 'business';
        card.dataset.category = category;
        card.dataset.search = `${link?.textContent || ''} ${card.textContent || ''}`.toLowerCase();
    });

    const controls = document.createElement('section');
    controls.className = 'blog-controls info-card';
    controls.innerHTML = `
        <div class="blog-controls-top">
            <label class="mono" for="blog-search">Search blog topics</label>
            <input id="blog-search" class="blog-search-input" type="search" placeholder="Search by keyword, topic, or role">
        </div>
        <div class="blog-filter-row">
            <button type="button" class="blog-filter-btn active" data-filter="all">All</button>
            <button type="button" class="blog-filter-btn" data-filter="business">Business</button>
            <button type="button" class="blog-filter-btn" data-filter="seo">SEO</button>
            <button type="button" class="blog-filter-btn" data-filter="technical">Technical</button>
            <button type="button" class="blog-filter-btn" data-filter="hiring">Hiring</button>
            <button type="button" class="blog-filter-btn" data-filter="offers">Offers</button>
        </div>
        <p class="body-copy blog-results-text" id="blog-results-text">Showing all ${cards.length} posts.</p>
    `;

    grid.parentNode.insertBefore(controls, grid);

    const searchInput = controls.querySelector('#blog-search');
    const filterButtons = Array.from(controls.querySelectorAll('.blog-filter-btn'));
    const resultsText = controls.querySelector('#blog-results-text');
    let activeFilter = 'all';

    const applyFilters = () => {
        const query = (searchInput.value || '').trim().toLowerCase();
        let visibleCount = 0;

        cards.forEach((card) => {
            const categoryMatch = activeFilter === 'all' || card.dataset.category === activeFilter;
            const searchMatch = !query || (card.dataset.search || '').includes(query);
            const isVisible = categoryMatch && searchMatch;
            card.style.display = isVisible ? '' : 'none';
            if (isVisible) visibleCount += 1;
        });

        const label = CATEGORY_LABELS[activeFilter] || 'All';
        resultsText.textContent = activeFilter === 'all'
            ? `Showing ${visibleCount} of ${cards.length} posts.`
            : `Showing ${visibleCount} ${label} post${visibleCount === 1 ? '' : 's'}.`;
    };

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            activeFilter = button.dataset.filter || 'all';
            filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
            applyFilters();
        });
    });

    searchInput.addEventListener('input', applyFilters);
    applyFilters();
}

function initRelatedPosts() {
    const path = window.location.pathname.toLowerCase();
    if (!path.includes('/blog/') || path.endsWith('/blog.html')) return;

    const currentSlug = path.split('/').pop().replace('.html', '');
    const currentPost = BLOG_MAP.get(currentSlug);
    const blogContent = document.querySelector('.blog-content');
    if (!blogContent || !currentPost) return;

    const sameCategory = BLOG_POSTS.filter((post) => post.category === currentPost.category && post.slug !== currentSlug);
    const fallback = BLOG_POSTS.filter((post) => post.slug !== currentSlug && post.category !== currentPost.category);
    const related = [...sameCategory.slice(0, 2), ...fallback.slice(0, 2)].slice(0, 4);
    if (!related.length) return;

    const cta = blogContent.querySelector('.blog-cta');
    const hasExistingRelatedReads = Array.from(blogContent.querySelectorAll('.blog-related h2')).some((heading) =>
        heading.textContent.trim().toLowerCase() === 'related reads'
    );

    if (!hasExistingRelatedReads) {
        const relatedSection = document.createElement('section');
        relatedSection.className = 'blog-related';
        relatedSection.innerHTML = `
            <h2>Related reads</h2>
            <ul class="mini-list">
                ${related.map((post) => `<li><span>${CATEGORY_LABELS[post.category] || 'Guide'}</span><span><a class="text-link" href="../blog/${post.slug}.html">${post.title}</a></span></li>`).join('')}
            </ul>
        `;

        if (cta) {
            blogContent.insertBefore(relatedSection, cta);
        } else {
            blogContent.appendChild(relatedSection);
        }
    }

    const projectLinkMap = {
        business: [
            { label: 'See the TConnect fintech build', href: '../work.html#tconnect-project' },
            { label: 'Review ecommerce project work', href: '../work.html#aaiphones-project' }
        ],
        seo: [
            { label: 'See SEO-aware portfolio execution', href: '../work.html#portfolio-project' },
            { label: 'Review ecommerce structure example', href: '../work.html#aaiphones-project' }
        ],
        technical: [
            { label: 'Explore the Laravel TConnect platform', href: '../work.html#tconnect-project' },
            { label: 'See more Laravel project work', href: '../work.html' }
        ],
        hiring: [
            { label: 'Review my Laravel and fintech projects', href: '../work.html#tconnect-project' },
            { label: 'See complete project breakdowns', href: '../work.html' }
        ],
        offers: [
            { label: 'See business website project examples', href: '../work.html#aaiphones-project' },
            { label: 'See portfolio and bakery prototypes', href: '../work.html#portfolio-project' }
        ]
    };

    const projectLinks = projectLinkMap[currentPost.category] || projectLinkMap.business;
    const hasExistingProjectProof = Array.from(blogContent.querySelectorAll('.blog-related h2')).some((heading) =>
        heading.textContent.trim().toLowerCase() === 'relevant project proof'
    );

    if (!hasExistingProjectProof) {
        const proofSection = document.createElement('section');
        proofSection.className = 'blog-related';
        proofSection.innerHTML = `
            <h2>Relevant project proof</h2>
            <ul class="mini-list">
                ${projectLinks.map((link) => `<li><span>Project</span><span><a class="text-link" href="${link.href}">${link.label}</a></span></li>`).join('')}
            </ul>
        `;

        if (cta) {
            blogContent.insertBefore(proofSection, cta);
        } else {
            blogContent.appendChild(proofSection);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initBlogPageNav();
    initBlogFilters();
    initRelatedPosts();
});
