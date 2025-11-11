const ARCH_DATA = {
  categories: [
    { id: "customer-interface", label: "Customer Interface" },
    { id: "integration-block", label: "Integration Block" },
    { id: "back-office", label: "Back Office & Business Rules" },
    { id: "communication-social", label: "Communication & Social" },
    { id: "products-services", label: "Products & Services" },
    { id: "affiliate", label: "Affiliate / Partners" }
  ],
  nodes: [
    // --- CUSTOMER INTERFACE ---
    {
      id: "b2c-web", category: "customer-interface",
      title: "B2C (Web)",
      description: "Consumer web experience for searching, booking, servicing and loyalty management.",
      items: ["Registration","Flight","Car","Hotel","Insurance","Other Products","Payment","Change/Refund","Loyalty Statement","Loyalty Redemption"]
    },
    {
      id: "b2c-mobile", category: "customer-interface",
      title: "B2C – Mobile",
      description: "Native/hybrid mobile channels mirroring B2C feature set with push, wallet, and biometric sign-in.",
      items: ["Registration","Flight","Car","Hotel","Insurance","Other Products","Payment","Change/Refund","Loyalty Statement","Loyalty Redemption"]
    },
    {
      id: "b2b-white-label", category: "customer-interface",
      title: "B2B – White Label",
      description: "Agency/partner front-ends branded to the reseller, with centralized credit and office controls.",
      items: ["Registration","Flight","Car","Hotel","Insurance","Other Products","Payment","Change/Refund","Loyalty Statement","Loyalty Redemption","Office/User Management","Finance/Credit Mgt"]
    },
    {
      id: "b2b", category: "customer-interface",
      title: "B2B",
      description: "Professional/agent UI with negotiated content, fare rules, and financial governance.",
      items: ["Registration","Flight","Car","Hotel","Insurance","Other Products","Payment","Change/Refund","Loyalty Statement","Loyalty Redemption","Office/User Management","Finance/Credit Mgt"]
    },
    {
      id: "corporate-native", category: "customer-interface",
      title: "Native Screen – Corporates",
      description: "Corporate self-service with policy, approvals, entitlements and expense alignment.",
      items: ["Registration","Flight","Car","Hotel","Insurance","Other Products","Payment","Change/Refund","Loyalty Statement","Loyalty Redemption","Org Structure","Employee Entitlement","Approval Workflow","Travel Expenses","Management Dashboard"]
    },
    {
      id: "affiliate-search", category: "customer-interface",
      title: "Affiliate Search Panel",
      description: "Affiliate widget/panel for meta and partner distribution.",
      items: ["Flight","Hotel","Car","Packages"]
    },

    // --- INTEGRATION BLOCK ---
    {
      id: "search-engine", category: "integration-block",
      title: "Search Engine",
      description: "High-performance search orchestration across multiple sources.",
      items: ["Flight","Car","Hotel","Insurance","Other"]
    },
    {
      id: "booking-engine", category: "integration-block",
      title: "Booking Engine",
      description: "Atomic booking with PNR/order creation, pricing, and policy validation.",
      items: ["Flight","Car","Hotel","Insurance"]
    },
    {
      id: "gds-connectivity", category: "integration-block",
      title: "GDS/Host Connectivity",
      description: "Downstream connectivity to host/GDS providers.",
      items: ["1A (Amadeus)","1B (Abacus)","1S (Sabre)","1G (Travelport)","LC (Local/Host)"]
    },
    {
      id: "payment-gateway", category: "integration-block",
      title: "Payment Gateway",
      description: "Multi-tender routing with fraud screens and reconciliation.",
      items: ["VISA","MASTER","AMEX","Bank","Aggregator","Cash","Prepaid card","Account Credit"]
    },

    // --- BACK OFFICE & BUSINESS RULES ---
    { id: "back-office-mgmt", category: "back-office", title: "Back-office Management", description: "Operational workflows, post-booking servicing, and fulfillment.", items: [] },
    { id: "supplier-contract", category: "back-office", title: "Supplier / Contract", description: "Contract ingest, negotiated rates, and content controls.", items: [] },
    { id: "online-products", category: "back-office", title: "Online Products", description: "Digital catalog governance and lifecycle management.", items: [] },
    { id: "offline-products", category: "back-office", title: "Offline Products", description: "Manual products and exception handling.", items: [] },
    { id: "agency-subagency", category: "back-office", title: "Agency/Sub-Agency", description: "Hierarchy, overrides, commissions, and permissions.", items: [] },
    { id: "administration", category: "back-office", title: "Administration", description: "System configuration, roles, tenants, and compliance.", items: [] },
    { id: "sales-force", category: "back-office", title: "Sales Force", description: "Account management, pipelines, and performance KPIs.", items: [] },
    { id: "finance", category: "back-office", title: "Finance", description: "AR/AP, settlement, refunds, and reconciliation.", items: [] },
    { id: "report-dss", category: "back-office", title: "Report/DSS", description: "BI dashboards, DSS, and operational reporting.", items: [] },
    { id: "travel-support", category: "back-office", title: "Travel Support Services", description: "24x7 support, disruptions, and service recovery.", items: [] },
    { id: "product-packaging", category: "back-office", title: "Product Packaging", description: "Bundles, ancillaries, and merchandising rules.", items: [] },
    { id: "corporate-mgmt", category: "back-office", title: "Corporate Management", description: "Policies, deal structures, and enterprise configuration.", items: [] },
    { id: "markup-rev-mgmt", category: "back-office", title: "Markup/Revenue Management", description: "Markups, commissions, dynamic revenue controls.", items: [] },
    {
      id: "payment-security-fraud", category: "back-office",
      title: "Payment Security & Fraud Management",
      description: "Fraud screening, 3DS, velocity checks, and risk scoring.",
      items: []
    },
    {
      id: "loyalty", category: "back-office",
      title: "Loyalty",
      description: "Program configuration across accrual/redemption with social profiles.",
      items: ["Profile using Social Media","Accrual","Redemption"]
    },

    // --- COMMUNICATION & SOCIAL ---
    {
      id: "communication", category: "communication-social",
      title: "Communication",
      description: "Omnichannel notifications and service messaging.",
      items: ["Email","SMS","Teletype","Voice/Telephony","Fax","Email/Chat"]
    },
    {
      id: "social-media", category: "communication-social",
      title: "Social Media",
      description: "Social presence and engagement across global/local channels.",
      items: ["Facebook","Twitter","Google+","LinkedIn","YouTube","Local Social Media"]
    },

    // --- PRODUCTS & SERVICES ---
    {
      id: "products-services", category: "products-services",
      title: "Products / Services",
      description: "Core product catalog across travel verticals.",
      items: ["Flight","Car","Hotel","Insurance","Events","Other"]
    },

    // --- AFFILIATE / PARTNERS ---
    {
      id: "affiliate-partners", category: "affiliate",
      title: "Products & Integration Partners",
      description: "Core partner catalogues, bed banks, rail and tours surfaced for cross-sell.",
      items: ["Priceline","Hotels.com","Orbitz","Rail Europe","Tour Operators"]
    },
    {
      id: "affiliate-marketplaces", category: "affiliate",
      title: "Affiliate Marketplaces",
      description: "Meta, media and marketplace connections that amplify reach and conversions.",
      items: ["Google Travel","Kayak","Skyscanner","Travel media","Co-brands"]
    },
    {
      id: "affiliate-tracking", category: "affiliate",
      title: "Partner Tracking & Attribution",
      description: "Performance tracking, payouts and compliance for affiliates and influencers.",
      items: ["Click tracking","Conversion pixels","Commission rules","Payment cycles"]
    },
    {
      id: "affiliate-connectivity", category: "affiliate",
      title: "Partner API Connectivity",
      description: "API gateway, caching and throttling for supplier and reseller integrations.",
      items: ["REST/GraphQL","NDC","Cache refresh","Throttling","Sandbox"]
    }
  ]
};

const CATEGORY_COLORS = {
  "customer-interface": "#d9d1ff",
  "integration-block": "#cfd9ff",
  "back-office": "#f4dfff",
  "communication-social": "#dff0ff",
  "products-services": "#ffe7d9",
  "affiliate": "#dfffe8"
};

const nodeRegistry = new Map();
let activeNodeId = null;

function createSvgElement(type) {
  return document.createElementNS("http://www.w3.org/2000/svg", type);
}

function renderJsonLd() {
  const jsonLdEl = document.getElementById("enterprise-jsonld");
  if (!jsonLdEl) return;
  const today = new Date();
  const isoDate = today.toISOString().split("T")[0];
  const canonical = document.querySelector('link[rel="canonical"]').href || `${window.location.origin}/enterprise.html`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "System Blocks: The OTA Enterprise Solution",
    description: "Interactive OTA enterprise architecture featuring customer interfaces, integration blocks, business rules, communications, products, and partner ecosystems.",
    about: ARCH_DATA.categories.map((cat) => cat.label),
    author: {
      "@type": "Organization",
      name: "Modern Airline Retailing"
    },
    inLanguage: "en",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical
    },
    datePublished: isoDate,
    dateModified: isoDate
  };
  jsonLdEl.textContent = JSON.stringify(jsonLd, null, 2);
}

function ensureNavigation() {
  const siteNav = document.querySelector(".site-header .nav-links");
  if (siteNav) {
    const siteLinks = Array.from(siteNav.querySelectorAll("a"));
    let siteLink = siteLinks.find((link) => (link.getAttribute("href") || "").startsWith("/enterprise.html"));
    if (!siteLink) {
      siteLink = document.createElement("a");
      siteLink.href = "/enterprise.html";
      siteLink.textContent = "OTA Architecture";
      siteNav.appendChild(siteLink);
    }
    if (window.location.pathname.endsWith("/enterprise.html")) {
      siteLink.classList.add("is-active");
      siteLink.setAttribute("aria-current", "page");
    }
  }

  let nav = document.querySelector("#main-nav");
  if (!siteNav && !nav) {
    const navWrapper = document.createElement("nav");
    navWrapper.className = "auto-nav";
    nav = document.createElement("ul");
    nav.id = "main-nav";
    navWrapper.appendChild(nav);
    document.body.insertBefore(navWrapper, document.body.firstChild);
  }

  if (nav) {
    const existing = Array.from(nav.querySelectorAll("a"));
    let link = existing.find((item) => (item.getAttribute("href") || "").startsWith("/enterprise.html"));
    if (!link) {
      const li = document.createElement("li");
      link = document.createElement("a");
      link.href = "/enterprise.html";
      link.textContent = "OTA Architecture";
      li.appendChild(link);
      nav.appendChild(li);
    }
    if (window.location.pathname.endsWith("/enterprise.html")) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  }
}

function ensureFooterNote() {
  const footer = document.querySelector(".site-footer");
  if (!footer || footer.querySelector(".footer-reference-note")) return;
  const note = document.createElement("p");
  note.className = "footer-reference-note";
  note.textContent = "Reference courtesy, and for more conversations, contact subash.maret@gmail.com.";
  footer.appendChild(note);
}

function populateSections() {
  ARCH_DATA.categories.forEach((category) => {
    const section = document.getElementById(category.id);
    if (!section) return;
    if (section.querySelector("ul")) return;
    const intro = document.createElement("p");
    intro.textContent = `Explore ${ARCH_DATA.nodes.filter((node) => node.category === category.id).length} building blocks that shape the ${category.label.toLowerCase()} layer.`;
    const list = document.createElement("ul");
    ARCH_DATA.nodes
      .filter((node) => node.category === category.id)
      .forEach((node) => {
        const li = document.createElement("li");
        li.textContent = node.title;
        list.appendChild(li);
      });
    section.append(intro, list);
  });
}

function createLegend() {
  const legend = document.querySelector(".legend");
  if (!legend) return;
  legend.innerHTML = "";
  ARCH_DATA.categories.forEach((category) => {
    const item = document.createElement("span");
    item.className = "legend__item";
    const swatch = document.createElement("span");
    swatch.className = "legend__swatch";
    swatch.style.background = CATEGORY_COLORS[category.id] || "#ebe9ff";
    item.appendChild(swatch);
    item.append(category.label);
    legend.appendChild(item);
  });
}

function buildDiagram() {
  const svg = document.getElementById("architecture-map");
  if (!svg) return;
  svg.innerHTML = "";
  nodeRegistry.clear();

  const title = createSvgElement("title");
  title.id = "architecture-map-title";
  title.textContent = "OTA enterprise system blocks map";
  const desc = createSvgElement("desc");
  desc.id = "architecture-map-desc";
  desc.textContent = "Interactive diagram of OTA enterprise architecture grouped by customer interface, integration, back-office, communications, products, and partners.";
  svg.append(title, desc);

  const padding = 40;
  const columnWidth = 200;
  const columnGap = 60;
  const nodeHeight = 90;
  const rowGap = 28;
  const maxNodes = Math.max(
    ...ARCH_DATA.categories.map((category) => ARCH_DATA.nodes.filter((node) => node.category === category.id).length)
  );
  const width = padding * 2 + ARCH_DATA.categories.length * columnWidth + (ARCH_DATA.categories.length - 1) * columnGap;
  const height = padding * 2 + maxNodes * nodeHeight + (maxNodes - 1) * rowGap;
  svg.setAttribute("viewBox", `0 0 ${width} ${Math.max(height, 480)}`);
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

  const columnLayer = createSvgElement("g");
  columnLayer.setAttribute("fill", "none");
  svg.appendChild(columnLayer);

  ARCH_DATA.categories.forEach((category, columnIndex) => {
    const nodes = ARCH_DATA.nodes.filter((node) => node.category === category.id);
    const columnX = padding + columnIndex * (columnWidth + columnGap);
    const columnRect = createSvgElement("rect");
    columnRect.setAttribute("x", columnX - 20);
    columnRect.setAttribute("y", padding - 30);
    columnRect.setAttribute("width", columnWidth + 40);
    columnRect.setAttribute("height", Math.max(height - padding, nodes.length * (nodeHeight + rowGap)));
    columnRect.setAttribute("rx", "28");
    columnRect.setAttribute("fill", (CATEGORY_COLORS[category.id] || "#ede9ff") + "33");
    columnRect.setAttribute("stroke", (CATEGORY_COLORS[category.id] || "#ede9ff") + "77");
    columnRect.setAttribute("stroke-width", "1");
    columnLayer.appendChild(columnRect);

    nodes.forEach((node, nodeIndex) => {
      const nodeY = padding + nodeIndex * (nodeHeight + rowGap);
      const fo = createSvgElement("foreignObject");
      fo.setAttribute("x", columnX);
      fo.setAttribute("y", nodeY);
      fo.setAttribute("width", columnWidth);
      fo.setAttribute("height", nodeHeight);

      const button = document.createElement("button");
      button.className = "arch-node";
      button.id = `node-${node.id}`;
      button.setAttribute("type", "button");
      button.setAttribute("aria-pressed", "false");
      button.dataset.nodeId = node.id;
      button.dataset.category = node.category;
      button.innerHTML = `<span class="node-title">${node.title}</span><span class="node-category">${ARCH_DATA.categories.find((cat) => cat.id === node.category)?.label || ""}</span>`;

      button.addEventListener("click", () => {
        toggleNode(node.id);
      });

      button.addEventListener("mouseenter", (event) => {
        showTooltip(event, node.title);
      });

      button.addEventListener("mousemove", (event) => {
        showTooltip(event, node.title);
      });

      button.addEventListener("mouseleave", hideTooltip);

      button.addEventListener("focus", (event) => {
        showTooltip(event, node.title);
      });

      button.addEventListener("blur", hideTooltip);

      fo.appendChild(button);
      svg.appendChild(fo);
      nodeRegistry.set(node.id, { data: node, button });
    });
  });
}

function showTooltip(event, text) {
  const tooltip = document.getElementById("tooltip");
  if (!tooltip) return;
  tooltip.textContent = text;
  tooltip.hidden = false;
  const bounds = tooltip.offsetParent?.getBoundingClientRect();
  let x;
  let y;
  if (typeof event.clientX === "number" && typeof event.clientY === "number") {
    x = event.clientX - (bounds?.left || 0);
    y = event.clientY - (bounds?.top || 0);
  } else if (event.target) {
    const targetRect = event.target.getBoundingClientRect();
    x = targetRect.left + targetRect.width / 2 - (bounds?.left || 0);
    y = targetRect.top - 8 - (bounds?.top || 0);
  }
  if (typeof x === "number" && typeof y === "number") {
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  }
}

function hideTooltip() {
  const tooltip = document.getElementById("tooltip");
  if (!tooltip) return;
  tooltip.hidden = true;
}

function toggleNode(nodeId) {
  if (activeNodeId === nodeId) {
    clearSelection();
  } else {
    openNode(nodeId);
  }
}

function openNode(nodeId, pushState = true) {
  const record = nodeRegistry.get(nodeId);
  if (!record) return;
  const { data, button } = record;
  if (activeNodeId && nodeRegistry.has(activeNodeId)) {
    const current = nodeRegistry.get(activeNodeId);
    current.button.dataset.active = "false";
    current.button.setAttribute("aria-pressed", "false");
  }
  activeNodeId = nodeId;
  button.dataset.active = "true";
  button.setAttribute("aria-pressed", "true");
  if (typeof button.focus === "function") {
    try {
      button.focus({ preventScroll: true });
    } catch (error) {
      button.focus();
    }
  }
  updatePanel(data);
  updateDownloadState(true);
  syncHash(nodeId, pushState);
  setPanelOpenState(true);
}

function clearSelection(pushState = true) {
  if (activeNodeId && nodeRegistry.has(activeNodeId)) {
    const current = nodeRegistry.get(activeNodeId);
    current.button.dataset.active = "false";
    current.button.setAttribute("aria-pressed", "false");
  }
  activeNodeId = null;
  resetPanel();
  updateDownloadState(false);
  setPanelOpenState(false);
  hideTooltip();
  if (pushState) {
    history.pushState(null, "", window.location.pathname + window.location.search);
  }
}

function updatePanel(node) {
  const title = document.getElementById("panel-title");
  const body = document.getElementById("panel-body");
  if (!title || !body) return;
  title.textContent = node.title;
  body.innerHTML = "";
  const description = document.createElement("p");
  description.textContent = node.description;
  body.appendChild(description);

  if (node.items && node.items.length) {
    const listHeading = document.createElement("p");
    listHeading.className = "panel-subheading";
    listHeading.textContent = "Key capabilities:";
    const list = document.createElement("ul");
    node.items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
    body.append(listHeading, list);
  }

  const impact = document.createElement("p");
  impact.className = "panel-impact";
  impact.textContent = `Why it matters: ${deriveImpact(node)}`;
  body.appendChild(impact);
}

function resetPanel() {
  const title = document.getElementById("panel-title");
  const body = document.getElementById("panel-body");
  if (!title || !body) return;
  title.textContent = "Explore a block to view details";
  body.innerHTML = "<p>Select a block from the map to see its role, key features, and impact on enterprise travel retailing.</p>";
}

function deriveImpact(node) {
  switch (node.category) {
    case "customer-interface":
      return "Delivers consistent, policy-aware experiences for travelers across channels.";
    case "integration-block":
      return "Connects core search, booking, and payment flows with resilient orchestration.";
    case "back-office":
      return "Governs business policies, revenue, and servicing to keep operations compliant.";
    case "communication-social":
      return "Extends messaging reach and community engagement across every stage.";
    case "products-services":
      return "Curates the offer portfolio that powers differentiated retailing.";
    case "affiliate":
      return "Expands distribution and sourcing through trusted partners.";
    default:
      return "Supports a connected OTA ecosystem.";
  }
}

function updateDownloadState(enabled) {
  const downloadBtn = document.getElementById("download-node");
  if (!downloadBtn) return;
  downloadBtn.disabled = !enabled;
  downloadBtn.setAttribute("aria-disabled", String(!enabled));
}

function setPanelOpenState(open) {
  const panel = document.querySelector(".side-panel");
  if (!panel) return;
  if (open) {
    panel.hidden = false;
    panel.dataset.open = "true";
    panel.setAttribute("aria-hidden", "false");
    panel.setAttribute("aria-modal", window.matchMedia("(max-width: 1024px)").matches ? "true" : "false");
  } else {
    panel.removeAttribute("data-open");
    panel.setAttribute("aria-modal", "false");
    panel.setAttribute("aria-hidden", "true");
    panel.hidden = true;
  }
}

function syncHash(nodeId, pushState) {
  if (!pushState) return;
  const hash = `#node=${encodeURIComponent(nodeId)}`;
  if (window.location.hash !== hash) {
    history.pushState(null, "", window.location.pathname + window.location.search + hash);
  }
}

function handleHashChange() {
  const match = window.location.hash.match(/#node=([^&]+)/);
  if (match && match[1]) {
    const nodeId = decodeURIComponent(match[1]);
    if (nodeRegistry.has(nodeId)) {
      openNode(nodeId, false);
    }
  } else {
    clearSelection(false);
  }
}

function applySearch(term) {
  const lower = term.trim().toLowerCase();
  const hasTerm = lower.length > 0;
  nodeRegistry.forEach(({ data, button }) => {
    if (!hasTerm) {
      button.removeAttribute("data-dim");
      button.classList.remove("highlight");
      return;
    }
    const inTitle = data.title.toLowerCase().includes(lower);
    const inItems = (data.items || []).some((item) => item.toLowerCase().includes(lower));
    if (inTitle || inItems) {
      button.removeAttribute("data-dim");
      button.classList.add("highlight");
    } else {
      button.setAttribute("data-dim", "true");
      button.classList.remove("highlight");
    }
  });
}

function bindLegacyToggle() {
  const container = document.querySelector(".legacy-future");
  if (!container) return;
  const buttons = container.querySelectorAll(".legacy-toggle__button");
  const legacyColumn = container.querySelector(".split-panel__column--legacy");
  const futureColumn = container.querySelector(".split-panel__column--future");
  const updateView = (view, activeButton) => {
    container.dataset.view = view;
    buttons.forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn === activeButton));
    });
    if (legacyColumn && futureColumn) {
      const showLegacy = view !== "future";
      const showFuture = view !== "legacy";
      legacyColumn.setAttribute("aria-hidden", String(!showLegacy));
      futureColumn.setAttribute("aria-hidden", String(!showFuture));
    }
  };
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const view = button.dataset.view || "compare";
      updateView(view, button);
    });
    button.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        const arr = Array.from(buttons);
        const index = arr.indexOf(button);
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const target = arr[(index + direction + arr.length) % arr.length];
        target.focus();
      }
    });
  });
  const pressedButton = Array.from(buttons).find((btn) => btn.getAttribute("aria-pressed") === "true") || buttons[0];
  updateView(pressedButton?.dataset.view || "compare", pressedButton);
}

function bindToolbar() {
  const search = document.getElementById("architecture-search");
  const reset = document.getElementById("reset-view");
  const download = document.getElementById("download-node");
  if (search) {
    search.addEventListener("input", (event) => {
      applySearch(event.target.value);
    });
  }
  if (reset) {
    reset.addEventListener("click", () => {
      if (search) {
        search.value = "";
        applySearch("");
      }
      clearSelection();
    });
  }
  if (download) {
    download.addEventListener("click", () => {
      if (!activeNodeId || !nodeRegistry.has(activeNodeId)) return;
      const node = nodeRegistry.get(activeNodeId).data;
      const fileContents = JSON.stringify(node, null, 2);
      const blob = new Blob([fileContents], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${node.id}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }
}

function bindPanelControls() {
  const closeBtn = document.querySelector(".side-panel__close");
  const panel = document.querySelector(".side-panel");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      clearSelection();
    });
  }
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      clearSelection();
      hideTooltip();
    }
  });
  if (panel) {
    let startY = null;
    panel.addEventListener("touchstart", (event) => {
      if (!window.matchMedia("(max-width: 1024px)").matches) return;
      startY = event.touches[0].clientY;
    });
    panel.addEventListener("touchmove", (event) => {
      if (!startY) return;
      const currentY = event.touches[0].clientY;
      if (currentY - startY > 60) {
        clearSelection();
        startY = null;
      }
    });
    panel.addEventListener("touchend", () => {
      startY = null;
    });
  }
}

function bindFocusManagement() {
  const svg = document.getElementById("architecture-map");
  if (!svg) return;
  svg.addEventListener("keydown", (event) => {
    if (!["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    const buttons = Array.from(nodeRegistry.values()).map((entry) => entry.button);
    const currentIndex = buttons.findIndex((button) => button.dataset.nodeId === activeNodeId);
    const fallbackIndex = Math.max(currentIndex, 0);
    let targetIndex = fallbackIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      targetIndex = (fallbackIndex + 1) % buttons.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      targetIndex = (fallbackIndex - 1 + buttons.length) % buttons.length;
    }
    const targetButton = buttons[targetIndex];
    if (targetButton) {
      targetButton.focus();
    }
  });
}

function init() {
  renderJsonLd();
  ensureNavigation();
  ensureFooterNote();
  populateSections();
  createLegend();
  buildDiagram();
  updateDownloadState(false);
  bindLegacyToggle();
  bindToolbar();
  bindPanelControls();
  bindFocusManagement();
  bindHashNavigation();
}

function bindHashNavigation() {
  window.addEventListener("hashchange", handleHashChange);
  handleHashChange();
}

document.addEventListener("DOMContentLoaded", init);

// Add menu item if top nav exists
(function addNavItem() {
  const nav = document.querySelector('#main-nav');
  if (!nav) return;
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = '/enterprise.html';
  a.textContent = 'Enterprise Architecture';
  li.appendChild(a);
  nav.appendChild(li);
})();
