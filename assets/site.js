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
      <p><strong>Modern Airline Retailing</strong> – Offer & Order, NDC, merchandising and airline commerce made practical.</p>
      <p>Want to chat about architecture or have questions? Reach out at <a href="mailto:modernairlineretailing@gmail.com">modernairlineretailing@gmail.com</a> or connect on <a href="https://www.linkedin.com/in/neerej/" target="_blank" rel="noopener" class="linkedin-btn">LinkedIn</a> for brainstorming or an interesting discussion.</p>
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
  });
})();
