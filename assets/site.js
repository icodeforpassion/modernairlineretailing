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
      </nav>
    </div>`;

  const footerMarkup = `
    <div class="container">
      <p><strong>Modern Airline Retailing</strong> – Offer &amp; Order, NDC, Merchandising, and Airline Commerce Made Practical</p>
      <p>&copy; ${new Date().getFullYear()} Modern Airline Retailing. Built for builders, product leads and airline teams.</p>
    </div>`;

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
      if (currentPath === linkPath || isBlog || isTools || isEnterprise) {
        link.classList.add('is-active');
        if (isEnterprise && !link.hasAttribute('aria-current')) {
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

    if (!isOfferOrderLabPage) {
      const labShortcut = document.createElement('a');
      labShortcut.className = 'lab-shortcut';
      labShortcut.href = '/tools/offer-order-visualizer.html';
      labShortcut.setAttribute('aria-label', 'Launch the Offer & Order Retailing Lab');
      labShortcut.innerHTML = `
        <span class="lab-shortcut__pulse" aria-hidden="true"></span>
        <span class="lab-shortcut__icon" aria-hidden="true">⚡</span>
        <span class="lab-shortcut__content">
          <span class="lab-shortcut__eyebrow">Try now</span>
          <span class="lab-shortcut__title">Offer &amp; Order Retailing Lab</span>
        </span>
      `;

      if (currentPath === '/') {
        labShortcut.classList.add('lab-shortcut--home');
        if (header) {
          const headerHeight = header.getBoundingClientRect().height;
          if (headerHeight) {
            const homeOffset = Math.round(headerHeight + 24);
            labShortcut.style.setProperty('--lab-shortcut-home-offset', `${homeOffset}px`);
          }
        }
      }

      labShortcut.addEventListener('click', function(){
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'lab_shortcut_click', {
            event_category: 'engagement',
            event_label: 'Offer & Order Retailing Lab'
          });
        }
      });

      document.body.appendChild(labShortcut);
    }
    document.body.appendChild(shareWrapper);
  });
})();
