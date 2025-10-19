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
        <a href="/about.html">About</a>
      </nav>
    </div>`;

  const footerMarkup = `
    <div class="container">
      <p><strong>Modern Airline Retailing</strong> – Offer & Order, NDC, merchandising and airline commerce made practical.</p>
      <p>Have a project or want to jam on architecture? <a href="mailto:hello@modernairlineretailing.com">hello@modernairlineretailing.com</a></p>
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
    const links = Array.from(nav.querySelectorAll('a'));

    const currentPath = window.location.pathname.replace(/index\.html$/, '');
    links.forEach(function(link){
      const linkPath = link.getAttribute('href').replace(/index\.html$/, '');
      const isBlog = currentPath.startsWith('/blog/') && linkPath === '/blog/';
      const isTools = currentPath.startsWith('/tools/') && linkPath === '/tools/';
      if (currentPath === linkPath || isBlog || isTools) {
        link.classList.add('is-active');
      }
    });

    if (toggle) {
      toggle.addEventListener('click', function(){
        const open = nav.getAttribute('data-open') === 'true';
        nav.setAttribute('data-open', String(!open));
        toggle.setAttribute('aria-expanded', String(!open));
      });
    }

    nav.addEventListener('click', function(evt){
      if (evt.target.tagName === 'A' && nav.getAttribute('data-open') === 'true') {
        nav.setAttribute('data-open', 'false');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();
