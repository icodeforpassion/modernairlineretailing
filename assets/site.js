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

  // --- Cookie consent helpers ---
  const CONSENT_STORAGE_KEY = 'cookieConsent';
  const CONSENT_ACCEPTED = 'accepted';
  const CONSENT_REJECTED = 'rejected';
  const ANALYTICS_ID = 'G-L4958PW125';

  /**
   * Safely reads the stored cookie consent preference.
   */
  function getStoredConsent() {
    try {
      return window.localStorage.getItem(CONSENT_STORAGE_KEY);
    } catch (err) {
      return null;
    }
  }

  /**
   * Persists the user's cookie consent preference.
   * @param {string} value
   */
  function setStoredConsent(value) {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    } catch (err) {
      /* localStorage unavailable */
    }
  }

  /**
   * Injects the Google Analytics / Tag Manager script after consent is granted.
   */
  function loadAnalytics() {
    if (window.__analyticsLoaded) {
      return;
    }
    window.__analyticsLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', ANALYTICS_ID);

    const gaScript = document.createElement('script');
    gaScript.id = 'google-analytics-loader';
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`;
    document.head.appendChild(gaScript);
  }

  /**
   * Builds the consent banner element and wires up button handlers.
   * @param {Function} onAccept
   * @param {Function} onReject
   */
  function createCookieBanner(onAccept, onReject) {
    const banner = document.createElement('section');
    banner.className = 'cookie-consent';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML = `
      <div class="cookie-consent__inner">
        <p class="cookie-consent__message">This site uses cookies to analyse traffic via Google Tag Manager and Google Analytics. You can accept or reject analytics cookies at any time. Essential cookies are always enabled.</p>
        <div class="cookie-consent__actions">
          <button type="button" class="cookie-consent__button cookie-consent__button--accept">Accept All Cookies</button>
          <button type="button" class="cookie-consent__button cookie-consent__button--reject">Reject Non-Essential</button>
        </div>
      </div>
    `;

    const acceptButton = banner.querySelector('.cookie-consent__button--accept');
    const rejectButton = banner.querySelector('.cookie-consent__button--reject');

    if (acceptButton) {
      acceptButton.addEventListener('click', function(){
        onAccept();
        if (document.body) {
          document.body.classList.remove('cookie-consent-visible');
        }
        banner.remove();
      });
    }

    if (rejectButton) {
      rejectButton.addEventListener('click', function(){
        onReject();
        if (document.body) {
          document.body.classList.remove('cookie-consent-visible');
        }
        banner.remove();
      });
    }

    return banner;
  }

  /**
   * Shows the banner or loads analytics depending on stored preference.
   */
  function initCookieConsent() {
    const stored = getStoredConsent();

    if (stored === CONSENT_ACCEPTED) {
      loadAnalytics();
      return;
    }

    if (stored === CONSENT_REJECTED) {
      return;
    }

    const banner = createCookieBanner(
      function(){
        setStoredConsent(CONSENT_ACCEPTED);
        loadAnalytics();
      },
      function(){
        setStoredConsent(CONSENT_REJECTED);
      }
    );

    document.body.appendChild(banner);
    if (document.body) {
      document.body.classList.add('cookie-consent-visible');
    }
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

    // Kick off the cookie consent workflow once the DOM is ready.
    initCookieConsent();

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
