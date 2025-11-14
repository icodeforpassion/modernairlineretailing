(function(){
  const headerMarkup = `
    <div class="container site-nav">
      <a class="nav-brand" href="/index.html">
        <span class="brand-mark">MR</span>
        <span>Modern Airline Retailing</span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav-links">
        <span class="sr-only">Toggle navigation</span>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav class="nav-links" id="site-nav-links" data-open="false">
        <a href="/index.html">Home</a>
        <a href="/blog/index.html">Blog</a>
        <a href="/tools/index.html">Tools</a>
        <a href="/enterprise.html">OTA Architecture</a>
        <a href="/about.html">About</a>
        <a href="/privacy.html">Privacy &amp; Cookies</a>
      </nav>
    </div>`;

  const footerMarkup = `
    <div class="container">
      <p><strong>Modern Airline Retailing</strong> – Offer &amp; Order, NDC, Merchandising, and Airline Commerce Made Practical</p>
      <p>&copy; ${new Date().getFullYear()} Modern Airline Retailing. Built for builders, product leads and airline teams.</p>
      <p><a href="/privacy.html">Privacy &amp; Cookies Policy</a></p>
    </div>`;

  // --- Privacy preference banner ---
  const CONSENT_STORAGE_KEY = 'cookiePreferences';
  const GA_MEASUREMENT_ID = 'G-L4958PW125';
  const DEFAULT_PREFERENCES = {
    analyticsEnabled: true,
    countryTracking: true,
    consentGiven: false
  };

  /**
   * Safely read stored privacy preferences from localStorage.
   * @returns {typeof DEFAULT_PREFERENCES | null}
   */
  function readStoredPreferences() {
    try {
      const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return Object.assign({}, DEFAULT_PREFERENCES, parsed);
      }
      return null;
    } catch (err) {
      return null;
    }
  }

  /**
   * Persist the user's privacy preferences.
   * @param {typeof DEFAULT_PREFERENCES} value
   */
  function storePreferences(value) {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value));
    } catch (err) {
      /* localStorage unavailable */
    }
  }

  /**
   * Inject CSS for the banner so that the component is self-contained.
   */
  function injectBannerStyles() {
    if (document.getElementById('cookie-consent-styles')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'cookie-consent-styles';
    style.textContent = `
      /* Offset floating share widget whenever the banner is visible */
      body[data-cookie-banner="visible"] .share-widget {
        bottom: 120px;
      }

      @media (max-width: 520px) {
        body[data-cookie-banner="visible"] .share-widget {
          bottom: 140px;
        }
      }

      .cookie-consent-banner {
        position: fixed;
        right: 20px;
        bottom: 20px;
        z-index: 2147483000;
        max-width: 320px;
        width: calc(100vw - 32px);
        background: #f9fff9;
        color: #333;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-size: 13px;
        line-height: 1.5;
        border-radius: 10px;
        padding: 14px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 220ms ease, transform 220ms ease;
      }

      .cookie-consent-banner[data-visible="true"] {
        opacity: 1;
        transform: translateY(0);
      }

      .cookie-consent-banner__title {
        margin: 0 0 4px;
        font-weight: 600;
        font-size: 14px;
      }

      .cookie-consent-banner__message {
        margin: 0 0 12px;
      }

      .cookie-consent-banner__toggles {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 12px;
      }

      .cookie-consent-banner__toggle {
        display: grid;
        grid-template-columns: 36px 1fr;
        align-items: center;
        column-gap: 10px;
        cursor: pointer;
      }

      .cookie-consent-banner__toggle input[type="checkbox"] {
        appearance: none;
        width: 36px;
        height: 20px;
        border-radius: 999px;
        background: rgba(60, 120, 90, 0.25);
        border: 1px solid rgba(76, 175, 80, 0.35);
        position: relative;
        cursor: pointer;
        transition: background 160ms ease, border-color 160ms ease;
      }

      .cookie-consent-banner__toggle input[type="checkbox"]::after {
        content: "";
        position: absolute;
        top: 2px;
        left: 2px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        transition: transform 160ms ease;
      }

      .cookie-consent-banner__toggle input[type="checkbox"]:checked {
        background: #4caf50;
        border-color: #4caf50;
      }

      .cookie-consent-banner__toggle input[type="checkbox"]:checked::after {
        transform: translateX(16px);
      }

      .cookie-consent-banner__toggle input[type="checkbox"]:focus-visible {
        outline: 2px solid rgba(76, 175, 80, 0.6);
        outline-offset: 2px;
      }

      .cookie-consent-banner__toggle-label {
        display: block;
        font-weight: 500;
      }

      .cookie-consent-banner__actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      .cookie-consent-banner__button {
        flex: 1;
        border: none;
        border-radius: 999px;
        background: #4caf50;
        color: #fff;
        font-weight: 600;
        padding: 8px 14px;
        cursor: pointer;
        transition: filter 160ms ease;
      }

      .cookie-consent-banner__button:hover,
      .cookie-consent-banner__button:focus-visible {
        filter: brightness(0.95);
        outline: none;
      }

      .cookie-consent-banner__link {
        color: #2e7d32;
        text-decoration: underline;
        white-space: nowrap;
      }

      @media (max-width: 520px) {
        .cookie-consent-banner {
          right: 16px;
          left: 16px;
          max-width: none;
        }

        .cookie-consent-banner__actions {
          flex-direction: column;
          align-items: stretch;
        }

        .cookie-consent-banner__link {
          text-align: center;
        }
      }
    `;

    document.head.appendChild(style);
  }

  /**
   * Dynamically load the Google Analytics library with privacy guards in place.
   */
  function loadGoogleAnalytics() {
    if (window.__modernRetailingAnalyticsLoaded) {
      return;
    }
    window.__modernRetailingAnalyticsLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      allow_ad_personalization_signals: false
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  /**
   * Fire a lightweight country-level tracking ping when analytics are disabled.
   */
  async function runCountryTracking() {
    if (window.__modernRetailingCountryLogged) {
      return;
    }
    window.__modernRetailingCountryLogged = true;

    try {
      const geoResponse = await fetch('https://ipapi.co/json/');
      if (!geoResponse.ok) {
        return;
      }
      const geoData = await geoResponse.json();
      const userCountry = geoData && (geoData.country_name || geoData.country);
      if (!userCountry) {
        return;
      }

      await fetch('https://regionlog.modernretailing.com/logCountry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ country: userCountry })
      });
    } catch (err) {
      /* Swallow network errors to avoid breaking the experience. */
    }
  }

  /**
   * Apply preferences by conditionally loading integrations.
   * @param {typeof DEFAULT_PREFERENCES} prefs
   */
  function applyPreferences(prefs) {
    if (prefs.analyticsEnabled) {
      loadGoogleAnalytics();
    } else if (prefs.countryTracking) {
      runCountryTracking();
    }
  }

  /**
   * Build and wire the banner element.
   * @param {typeof DEFAULT_PREFERENCES} prefs
   */
  function buildConsentBanner(prefs) {
    injectBannerStyles();

    const banner = document.createElement('section');
    banner.className = 'cookie-consent-banner';
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Cookie consent');
    // Inline markup for the banner; mirrors the snippet requested for insertion before </body>.
    banner.innerHTML = `
      <h2 class="cookie-consent-banner__title">Cookie Preferences</h2>
      <p class="cookie-consent-banner__message">We use limited cookies to understand visits and improve this site. You can choose your privacy level below.</p>
      <div class="cookie-consent-banner__toggles">
        <label class="cookie-consent-banner__toggle">
          <input type="checkbox" name="analytics" checked>
          <span class="cookie-consent-banner__toggle-label">Enable analytics (No IP is tracked)</span>
        </label>
        <label class="cookie-consent-banner__toggle">
          <input type="checkbox" name="country" checked>
          <span class="cookie-consent-banner__toggle-label">Allow country-level tracking only</span>
        </label>
      </div>
      <div class="cookie-consent-banner__actions">
        <button type="button" class="cookie-consent-banner__button">OK</button>
        <a class="cookie-consent-banner__link" href="/privacy.html" target="_blank" rel="noopener">Privacy Policy</a>
      </div>
    `;

    const analyticsToggle = banner.querySelector('input[name="analytics"]');
    const countryToggle = banner.querySelector('input[name="country"]');
    const okButton = banner.querySelector('.cookie-consent-banner__button');

    if (analyticsToggle) {
      analyticsToggle.checked = Boolean(prefs.analyticsEnabled);
    }
    if (countryToggle) {
      countryToggle.checked = Boolean(prefs.countryTracking);
    }

    function closeBanner() {
      banner.setAttribute('data-visible', 'false');
      banner.addEventListener('transitionend', function handleTransitionEnd(evt) {
        if (evt.propertyName === 'opacity') {
          banner.removeEventListener('transitionend', handleTransitionEnd);
          banner.remove();
        }
      });
      window.setTimeout(function(){
        if (banner.parentElement) {
          banner.remove();
        }
      }, 400);
      if (document.body) {
        document.body.removeAttribute('data-cookie-banner');
      }
    }

    if (okButton) {
      okButton.addEventListener('click', function(){
        const updatedPrefs = {
          analyticsEnabled: analyticsToggle ? analyticsToggle.checked : DEFAULT_PREFERENCES.analyticsEnabled,
          countryTracking: countryToggle ? countryToggle.checked : DEFAULT_PREFERENCES.countryTracking,
          consentGiven: true
        };

        storePreferences(updatedPrefs);
        applyPreferences(updatedPrefs);
        closeBanner();
      });
    }

    banner.setAttribute('data-visible', 'false');
    if (document.body) {
      document.body.setAttribute('data-cookie-banner', 'visible');
    }

    requestAnimationFrame(function(){
      banner.setAttribute('data-visible', 'true');
    });

    return banner;
  }

  /**
   * Initialise the privacy banner lifecycle.
   */
  function initCookieConsentBanner() {
    const storedPrefs = readStoredPreferences();
    const prefs = storedPrefs ? storedPrefs : Object.assign({}, DEFAULT_PREFERENCES);

    if (prefs.consentGiven) {
      applyPreferences(prefs);
      return;
    }

    const banner = buildConsentBanner(prefs);
    document.body.appendChild(banner);
  }

  document.addEventListener('DOMContentLoaded', function(){
    document.body.classList.add('has-site-chrome');

    let header = document.querySelector('.site-header');
    if (!header) {
      header = document.createElement('header');
      header.className = 'site-header';
      document.body.insertBefore(header, document.body.firstChild);
    }
    if (!header.innerHTML.trim()) {
      header.innerHTML = headerMarkup;
    }

    let footer = document.querySelector('.site-footer');
    if (!footer) {
      footer = document.createElement('footer');
      footer.className = 'site-footer';
      document.body.appendChild(footer);
    }
    if (!footer.innerHTML.trim()) {
      footer.innerHTML = footerMarkup;
    }

    // Kick off the privacy preference workflow once the DOM is ready.
    initCookieConsentBanner();

    const nav = header.querySelector('.nav-links');
    const toggle = header.querySelector('.nav-toggle');
    if (!nav) {
      return;
    }
    const links = Array.from(nav.querySelectorAll('a'));

    function setNavOpen(open) {
      nav.setAttribute('data-open', String(open));
      if (toggle) {
        toggle.setAttribute('aria-expanded', String(open));
      }
      if (open) {
        document.addEventListener('keydown', handleKeydown);
        document.addEventListener('click', handleDocumentClick);
        if (links.length) {
          links[0].focus();
        }
      } else {
        document.removeEventListener('keydown', handleKeydown);
        document.removeEventListener('click', handleDocumentClick);
        if (toggle && document.activeElement !== toggle) {
          toggle.focus();
        }
      }
    }

    function handleKeydown(evt) {
      if (evt.key === 'Escape' && nav.getAttribute('data-open') === 'true') {
        setNavOpen(false);
      }
    }

    function handleDocumentClick(evt) {
      if (!header.contains(evt.target)) {
        setNavOpen(false);
      }
    }

    const currentPath = window.location.pathname.replace(/index\.html$/, '');
    links.forEach(function(link){
      const linkHref = link.getAttribute('href');
      const linkPath = linkHref.replace(/index\.html$/, '').split('#')[0];
      const isBlog = currentPath.startsWith('/blog/') && linkPath === '/blog/';
      const isTools = currentPath.startsWith('/tools/') && linkPath === '/tools/';
      const isEnterprise = currentPath === '/enterprise.html' && linkPath === '/enterprise.html';
      const isPrivacy = currentPath === '/privacy.html' && linkPath === '/privacy.html';
      if (currentPath === linkPath || isBlog || isTools || isEnterprise || isPrivacy) {
        link.classList.add('is-active');
        if (isEnterprise && !link.hasAttribute('aria-current')) {
          link.setAttribute('aria-current', 'page');
        }
        if (isPrivacy && !link.hasAttribute('aria-current')) {
          link.setAttribute('aria-current', 'page');
        }
      }
    });

    if (toggle) {
      toggle.addEventListener('click', function(){
        const open = nav.getAttribute('data-open') === 'true';
        setNavOpen(!open);
      });
    }

    nav.addEventListener('click', function(evt){
      if (evt.target.tagName === 'A' && nav.getAttribute('data-open') === 'true') {
        setNavOpen(false);
      }
    });

    const shareWrapper = document.createElement('div');
    shareWrapper.className = 'share-widget';
    shareWrapper.innerHTML = `
      <button type="button" class="share-fab" aria-expanded="false" aria-controls="share-panel">
        <span class="sr-only">Share this page</span>
        <svg class="share-fab__icon" width="22" height="22" viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
          <path d="M13.5 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm-7 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm11 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm-.87-18.4-6.44 3.22a3 3 0 1 0 0 4.36l6.44 3.22a3 3 0 1 0 1.34-2.68l-6.44-3.22a2.98 2.98 0 0 0 .05-.5 2.98 2.98 0 0 0-.05-.5l6.44-3.22a3 3 0 1 0-1.34-2.68Z" fill="currentColor" />
        </svg>
      </button>
      <div class="share-panel" id="share-panel" data-open="false">
        <p class="share-panel__status" role="status" aria-live="polite">Share this page</p>
        <ul class="share-panel__links">
          <li><a class="share-link share-link--whatsapp" target="_blank" rel="noopener">WhatsApp</a></li>
          <li><a class="share-link share-link--x" target="_blank" rel="noopener">X (Twitter)</a></li>
          <li><a class="share-link share-link--instagram" target="_blank" rel="noopener">Instagram</a></li>
          <li><a class="share-link share-link--facebook" target="_blank" rel="noopener">Facebook</a></li>
        </ul>
      </div>
    `;

    const encodedUrl = encodeURIComponent(window.location.href);
    const encodedTitle = encodeURIComponent(document.title);

    const shareLinks = shareWrapper.querySelectorAll('.share-link');
    shareLinks.forEach(function(link){
      if (link.classList.contains('share-link--whatsapp')) {
        link.href = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
      } else if (link.classList.contains('share-link--x')) {
        link.href = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
      } else if (link.classList.contains('share-link--instagram')) {
        link.href = `https://www.instagram.com/?url=${encodedUrl}`;
      } else if (link.classList.contains('share-link--facebook')) {
        link.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      }
    });

    const sharePanel = shareWrapper.querySelector('.share-panel');
    const shareFab = shareWrapper.querySelector('.share-fab');
    const shareStatus = shareWrapper.querySelector('.share-panel__status');

    function setShareOpen(open) {
      sharePanel.setAttribute('data-open', String(open));
      shareFab.setAttribute('aria-expanded', String(open));
      if (open) {
        document.addEventListener('click', handleOutsideClick);
        document.addEventListener('keydown', handleEscape);
        const firstLink = sharePanel.querySelector('.share-link');
        if (firstLink) {
          window.requestAnimationFrame(function(){
            firstLink.focus();
          });
        }
      } else {
        document.removeEventListener('click', handleOutsideClick);
        document.removeEventListener('keydown', handleEscape);
      }
    }

    function handleOutsideClick(evt) {
      if (!shareWrapper.contains(evt.target)) {
        setShareOpen(false);
      }
    }

    function handleEscape(evt) {
      if (evt.key === 'Escape') {
        setShareOpen(false);
        shareFab.focus();
      }
    }

    function copyCurrentUrl() {
      const url = window.location.href;
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        return navigator.clipboard.writeText(url);
      }
      return new Promise(function(resolve, reject){
        try {
          const tempInput = document.createElement('textarea');
          tempInput.value = url;
          tempInput.setAttribute('readonly', '');
          tempInput.style.position = 'absolute';
          tempInput.style.left = '-9999px';
          document.body.appendChild(tempInput);
          tempInput.select();
          const successful = document.execCommand('copy');
          document.body.removeChild(tempInput);
          if (successful) {
            resolve();
          } else {
            reject();
          }
        } catch (err) {
          reject(err);
        }
      });
    }

    shareFab.addEventListener('click', function(){
      const isOpen = sharePanel.getAttribute('data-open') === 'true';
      if (isOpen) {
        setShareOpen(false);
        return;
      }

      copyCurrentUrl().then(function(){
        shareStatus.textContent = 'Link copied! Share using the options below:';
      }).catch(function(){
        shareStatus.textContent = 'Share using the options below:';
      }).finally(function(){
        setShareOpen(true);
      });
    });

    sharePanel.addEventListener('click', function(evt){
      if (evt.target.classList && evt.target.classList.contains('share-link')) {
        setShareOpen(false);
      }
    });

    const isOfferOrderLabPage = currentPath === '/tools/offer-order-visualizer.html';
    let labShortcutDismissed = false;

    try {
      labShortcutDismissed = window.sessionStorage && window.sessionStorage.getItem('labShortcutDismissed') === 'true';
    } catch (err) {
      labShortcutDismissed = false;
    }

    if (!isOfferOrderLabPage && (!labShortcutDismissed || currentPath === '/')) {
      const labShortcut = document.createElement('a');
      labShortcut.className = 'lab-shortcut';
      labShortcut.href = '/tools/offer-order-visualizer.html';
      labShortcut.setAttribute('aria-label', 'Launch the Offer & Order Retailing Lab');
      labShortcut.setAttribute('aria-haspopup', 'true');
      labShortcut.setAttribute('data-state', 'collapsed');
      labShortcut.innerHTML = `
        <span class="lab-shortcut__pulse" aria-hidden="true"></span>
        <span class="lab-shortcut__icon" aria-hidden="true">⚡</span>
        <span class="lab-shortcut__content">
          <span class="lab-shortcut__eyebrow">Try now</span>
          <span class="lab-shortcut__title">Offer &amp; Order Retailing Lab</span>
        </span>
      `;

      let appendedToHero = false;

      if (currentPath === '/') {
        labShortcut.classList.add('lab-shortcut--home');
        labShortcut.setAttribute('data-state', 'expanded');
        labShortcut.setAttribute('aria-expanded', 'true');
        const heroContainer = document.querySelector('.hero.is-landing .container');

        if (heroContainer) {
          let heroActions = heroContainer.querySelector('.hero-actions');

          if (!heroActions) {
            heroActions = document.createElement('div');
            heroActions.className = 'hero-actions';

            const existingCta = heroContainer.querySelector('.hero-cta');
            if (existingCta) {
              heroActions.appendChild(existingCta);
            }

            heroContainer.appendChild(heroActions);
          }

          heroActions.appendChild(labShortcut);
          appendedToHero = true;
        }
      }

      function storeLabShortcutDismissal() {
        try {
          if (window.sessionStorage) {
            window.sessionStorage.setItem('labShortcutDismissed', 'true');
          }
        } catch (err) {
          // Ignore storage failures (private browsing, etc.)
        }
      }

      function expandLabShortcut() {
        if (labShortcut.classList.contains('lab-shortcut--home')) {
          return;
        }

        labShortcut.classList.remove('lab-shortcut--collapsed');
        labShortcut.classList.add('lab-shortcut--expanded');
        labShortcut.setAttribute('data-state', 'expanded');
        labShortcut.setAttribute('aria-expanded', 'true');
      }

      function collapseLabShortcut() {
        if (labShortcut.classList.contains('lab-shortcut--home')) {
          return;
        }

        if (!labShortcut.classList.contains('lab-shortcut--collapsed')) {
          labShortcut.classList.remove('lab-shortcut--expanded');
          labShortcut.classList.add('lab-shortcut--collapsed');
          labShortcut.setAttribute('data-state', 'collapsed');
          labShortcut.setAttribute('aria-expanded', 'false');
        }
      }

      function handleLabShortcutClick(evt) {
        if (labShortcut.classList.contains('lab-shortcut--home')) {
          return;
        }

        const isCollapsed = labShortcut.classList.contains('lab-shortcut--collapsed');
        const isModified = evt.metaKey || evt.ctrlKey || evt.shiftKey || evt.altKey || evt.button !== 0;

        if (isCollapsed && !isModified) {
          evt.preventDefault();
          expandLabShortcut();
          window.requestAnimationFrame(function(){
            labShortcut.focus();
          });
          return;
        }

        if (!isCollapsed && !isModified) {
          storeLabShortcutDismissal();
        }
      }

      function handleLabShortcutKeydown(evt) {
        if (labShortcut.classList.contains('lab-shortcut--home')) {
          return;
        }

        if (labShortcut.classList.contains('lab-shortcut--collapsed') && (evt.key === 'Enter' || evt.key === ' ')) {
          evt.preventDefault();
          expandLabShortcut();
        } else if (evt.key === 'Escape') {
          collapseLabShortcut();
        }
      }

      function handleDocumentClick(evt) {
        if (!labShortcut.classList.contains('lab-shortcut--home') && !labShortcut.classList.contains('lab-shortcut--collapsed') && !labShortcut.contains(evt.target)) {
          collapseLabShortcut();
        }
      }

      function handleDocumentKeydown(evt) {
        if (evt.key === 'Escape') {
          collapseLabShortcut();
        }
      }

      labShortcut.addEventListener('click', handleLabShortcutClick);

      labShortcut.addEventListener('keydown', handleLabShortcutKeydown);

      labShortcut.addEventListener('click', function(evt){
        if (evt.defaultPrevented) {
          return;
        }

        if (typeof window.gtag === 'function') {
          window.gtag('event', 'lab_shortcut_click', {
            event_category: 'engagement',
            event_label: 'Offer & Order Retailing Lab'
          });
        }
      });

      if (!appendedToHero) {
        labShortcut.classList.add('lab-shortcut--collapsed');
        labShortcut.setAttribute('aria-expanded', 'false');
        document.addEventListener('click', handleDocumentClick);
        document.addEventListener('keydown', handleDocumentKeydown);
        document.body.appendChild(labShortcut);
      }
    }
    document.body.appendChild(shareWrapper);
  });
})();
