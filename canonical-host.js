(() => {
    if (window.location.hostname.toLowerCase() !== 'www.toluoyelola.cv') return;

    const canonicalUrl = new URL(window.location.href);
    canonicalUrl.protocol = 'https:';
    canonicalUrl.hostname = 'toluoyelola.cv';
    canonicalUrl.port = '';
    window.location.replace(canonicalUrl.href);
})();
