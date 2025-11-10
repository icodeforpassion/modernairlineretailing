const products = [
  { id: 'base', name: 'Right to Fly (Base Fare)', price: 120, defaultSelected: true, trackInventory: false, description: 'Required core flight entitlement.' },
  { id: 'seat', name: 'Seat', price: 25, defaultSelected: true, trackInventory: true, inventory: 42, description: 'Preferred seat with extra legroom.' },
  { id: 'bag', name: 'Bag', price: 30, defaultSelected: true, trackInventory: true, inventory: 38, description: 'One checked bag up to 23kg.' },
  { id: 'meal', name: 'Meal', price: 10, defaultSelected: false, trackInventory: true, inventory: 60, description: 'Chef-curated hot meal.' },
  { id: 'refund', name: 'Refundability', price: 40, defaultSelected: false, trackInventory: false, description: 'Full refund permitted before departure.' },
  { id: 'change', name: 'Changeability', price: 15, defaultSelected: false, trackInventory: false, description: 'One free itinerary change.' }
];

const productMap = Object.fromEntries(products.map(p => [p.id, p]));
const inventoryState = Object.fromEntries(products.map(p => [p.id, p.inventory || 0]));
const selectedProducts = new Set(products.filter(p => p.defaultSelected).map(p => p.id));

function hydrateInventoryDefaults() {
  selectedProducts.forEach(id => {
    const product = productMap[id];
    if (product?.trackInventory) {
      inventoryState[id] = Math.max(0, (product.inventory || 0) - 1);
    }
  });
}

const legacyFlowConfig = {
  id: 'legacy',
  color: '#f87171',
  nodes: [
    { id: 'request', label: 'Availability &\nFare Request' },
    { id: 'pnr', label: 'PNR Creation' },
    { id: 'ticket', label: 'Ticket Issuance' },
    { id: 'emd', label: 'EMD Issuance' },
    { id: 'delivery', label: 'Document Delivery' },
    { id: 'servicing', label: 'Servicing /\nIrregular Ops' }
  ],
  highlightMap: {
    product: ['pnr', 'emd', 'servicing'],
    pricing: ['request', 'ticket']
  }
};

const modernFlowConfig = {
  id: 'modern',
  color: '#34d399',
  nodes: [
    { id: 'shop', label: 'Offer Discovery' },
    { id: 'build', label: 'Offer Build &\nPricing' },
    { id: 'present', label: 'Offer Present' },
    { id: 'order', label: 'Order Create' },
    { id: 'deliver', label: 'Delivery &\nSettlement' },
    { id: 'post', label: 'Post-Order Service' }
  ],
  highlightMap: {
    product: ['build', 'order', 'post'],
    pricing: ['build', 'present']
  }
};

let legacyFlowNodes;
let modernFlowNodes;

const offerTemplate = {
  offerId: 'OFR123456',
  airline: 'ModernAirline',
  createdAt: new Date().toISOString(),
  itinerary: {
    origin: 'LHR',
    destination: 'JFK',
    departure: '2024-11-04T10:35:00Z',
    cabin: 'Economy'
  },
  passenger: {
    id: 'PAX001',
    type: 'ADT'
  },
  currency: 'GBP',
  offerItems: [],
  totalAmount: 0,
  dynamicPriceFactors: {
    demand: 0,
    daysToDeparture: 0,
    competitorIndex: 0
  }
};

const legacyTemplate = {
  recordLocator: 'X9TZ4M',
  itinerary: {
    origin: 'LHR',
    destination: 'JFK',
    flightNumber: 'MA123',
    departure: '2024-11-04T10:35:00Z'
  },
  passengerName: 'DOE/JOHN',
  ticketDocument: {
    number: '1234567890123',
    status: 'OPEN'
  },
  emds: [],
  balanceDue: 0
};

const formatCurrency = value => `£${value.toFixed(2)}`;

function renderProducts() {
  const list = document.getElementById('productList');
  const fragment = document.createDocumentFragment();

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `product-${product.id}`;
    checkbox.checked = product.defaultSelected;
    checkbox.disabled = product.id === 'base';

    const label = document.createElement('label');
    label.setAttribute('for', checkbox.id);
    label.innerHTML = `<strong>${product.name}</strong><br><span class="price">${formatCurrency(product.price)}</span>`;

    const description = document.createElement('p');
    description.textContent = product.description;

    const inventoryBadge = document.createElement('span');
    inventoryBadge.className = 'inventory';
    inventoryBadge.id = `inventory-${product.id}`;
    inventoryBadge.textContent = product.trackInventory ? `${inventoryState[product.id]} left` : 'Available';

    checkbox.addEventListener('change', () => handleProductToggle(product, checkbox));

    card.appendChild(checkbox);
    card.appendChild(label);
    card.appendChild(description);
    card.appendChild(inventoryBadge);

    fragment.appendChild(card);
  });

  list.appendChild(fragment);
}

function handleProductToggle(product, checkbox) {
  const isSelected = checkbox.checked;
  if (isSelected) {
    if (product.trackInventory && inventoryState[product.id] <= 0) {
      checkbox.checked = false;
      badgeFlashUnavailable(product.id);
      return;
    }
    selectedProducts.add(product.id);
    if (product.trackInventory && inventoryState[product.id] > 0) {
      inventoryState[product.id] = Math.max(0, inventoryState[product.id] - 1);
    }
  } else {
    selectedProducts.delete(product.id);
    if (product.trackInventory) {
      inventoryState[product.id] = Math.min(product.inventory, inventoryState[product.id] + 1);
    }
  }

  updateInventoryBadge(product.id);
  updatePricing();
  pulseFlows('product');
}

function updateInventoryBadge(productId) {
  const badge = document.getElementById(`inventory-${productId}`);
  const product = productMap[productId];
  if (!badge || !product) return;

  if (product.trackInventory) {
    badge.textContent = `${inventoryState[productId]} left`;
  } else {
    badge.textContent = 'Available';
  }

  badge.classList.remove('animate');
  void badge.offsetWidth;
  badge.classList.add('animate');
}

function badgeFlashUnavailable(productId) {
  const badge = document.getElementById(`inventory-${productId}`);
  if (!badge) return;
  badge.textContent = 'Sold out';
  badge.classList.remove('animate');
  void badge.offsetWidth;
  badge.classList.add('animate');
}

function renderFlowDiagram(containerId, config) {
  const container = document.getElementById(containerId);
  const width = container.clientWidth || 320;
  const height = container.clientHeight || 360;

  const svg = d3.select(container)
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');

  const nodeSpacing = height / (config.nodes.length + 1);

  const nodes = config.nodes.map((node, index) => ({
    ...node,
    x: width / 2,
    y: nodeSpacing * (index + 1),
    active: false
  }));

  const links = nodes.slice(0, -1).map((node, index) => ({
    source: node,
    target: nodes[index + 1]
  }));

  svg.selectAll('path.link')
    .data(links)
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', d => `M${d.source.x} ${d.source.y} C ${d.source.x + 40} ${d.source.y + nodeSpacing / 2}, ${d.target.x - 40} ${d.target.y - nodeSpacing / 2}, ${d.target.x} ${d.target.y}`);

  const nodeGroup = svg.selectAll('g.node')
    .data(nodes)
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', d => `translate(${d.x}, ${d.y})`);

  nodeGroup.append('circle')
    .attr('r', 36)
    .on('click', (_, d) => toggleNodeActive(nodeGroup, d));

  nodeGroup.append('text')
    .attr('dy', '.35em')
    .text(d => d.label);

  return { svg, nodes: nodeGroup };
}

function toggleNodeActive(nodeGroup, datum) {
  datum.active = !datum.active;
  nodeGroup.classed('active', d => d.active);
}

function pulseFlows(type) {
  const applyPulse = (selection, nodeIds) => {
    if (!selection || !Array.isArray(nodeIds)) return;
    selection.each(function(d) {
      if (nodeIds.includes(d.id)) {
        const node = d3.select(this);
        node.classed('pulse', true);
        setTimeout(() => node.classed('pulse', false), 1200);
      }
    });
  };

  applyPulse(legacyFlowNodes, legacyFlowConfig.highlightMap[type]);
  applyPulse(modernFlowNodes, modernFlowConfig.highlightMap[type]);
}

function computeDynamicPrice() {
  const demand = Number(document.getElementById('demandSlider').value);
  const time = Number(document.getElementById('timeSlider').value);
  const competition = Number(document.getElementById('competitionSlider').value);
  const base = productMap.base.price;

  const dynamicPrice = base + (demand / 100 * 50) - (time / 90 * 20) + ((competition - 100) / 5);
  return {
    value: Math.max(0, dynamicPrice),
    factors: { demand, daysToDeparture: time, competitorIndex: competition }
  };
}

function updatePricing() {
  const { value: dynamicBase, factors } = computeDynamicPrice();

  document.getElementById('demandValue').textContent = factors.demand;
  document.getElementById('timeValue').textContent = factors.daysToDeparture;
  document.getElementById('competitionValue').textContent = factors.competitorIndex;

  const optionalItems = [...selectedProducts].filter(id => id !== 'base');
  const optionalTotal = optionalItems.reduce((total, id) => total + productMap[id].price, 0);

  const legacyTotal = dynamicBase + optionalTotal;
  const modernTotal = dynamicBase + optionalTotal;

  document.getElementById('legacyDynamicPrice').textContent = formatCurrency(dynamicBase);
  document.getElementById('modernDynamicPrice').textContent = formatCurrency(dynamicBase);
  document.getElementById('legacyTotal').textContent = formatCurrency(legacyTotal);
  document.getElementById('modernTotal').textContent = formatCurrency(modernTotal);

  renderBreakdown('legacyBreakdown', dynamicBase, optionalItems, 'Legacy');
  renderBreakdown('modernBreakdown', dynamicBase, optionalItems, 'Modern');

  renderJsonPreviews(dynamicBase, optionalItems, optionalTotal, factors);
}

function renderBreakdown(elementId, base, optionalItems, labelPrefix) {
  const list = document.getElementById(elementId);
  list.innerHTML = '';

  const baseItem = document.createElement('li');
  baseItem.innerHTML = `<span>${labelPrefix} Base Fare</span><span>${formatCurrency(base)}</span>`;
  list.appendChild(baseItem);

  optionalItems.forEach(id => {
    const product = productMap[id];
    const li = document.createElement('li');
    li.innerHTML = `<span>${product.name}</span><span>${formatCurrency(product.price)}</span>`;
    list.appendChild(li);
  });
}

function renderJsonPreviews(dynamicBase, optionalItems, optionalTotal, factors) {
  const modernOffer = {
    ...offerTemplate,
    createdAt: new Date().toISOString(),
    totalAmount: Number((dynamicBase + optionalTotal).toFixed(2)),
    offerItems: [
      {
        itemId: 'BASE-1',
        description: 'Right to Fly',
        price: Number(dynamicBase.toFixed(2)),
        services: ['flight']
      },
      ...optionalItems.map((id, index) => ({
        itemId: `OPT-${index + 1}`,
        description: productMap[id].name,
        price: productMap[id].price,
        services: id === 'refund' ? ['refundability'] : id === 'change' ? ['changes'] : ['ancillary']
      }))
    ],
    dynamicPriceFactors: factors
  };

  const legacyDocument = {
    ...legacyTemplate,
    emds: optionalItems.map(id => ({
      emdNumber: `876543210${id.toUpperCase()}`,
      type: productMap[id].name,
      amount: productMap[id].price,
      status: 'OPEN'
    })),
    balanceDue: Number((dynamicBase + optionalTotal).toFixed(2))
  };

  document.getElementById('offerJson').textContent = JSON.stringify(modernOffer, null, 2);
  document.getElementById('pnrJson').textContent = JSON.stringify(legacyDocument, null, 2);
}

function bindSliderEvents() {
  ['demandSlider', 'timeSlider', 'competitionSlider'].forEach(id => {
    const slider = document.getElementById(id);
    slider.addEventListener('input', () => {
      updatePricing();
      pulseFlows('pricing');
    });
  });
}

function init() {
  hydrateInventoryDefaults();
  renderProducts();
  legacyFlowNodes = renderFlowDiagram('legacyFlow', legacyFlowConfig).nodes;
  modernFlowNodes = renderFlowDiagram('modernFlow', modernFlowConfig).nodes;
  bindSliderEvents();
  updatePricing();
}

document.addEventListener('DOMContentLoaded', init);
