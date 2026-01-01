/**
 * Handmade Haven Main App
 */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initHeader();
  initMobileMenu();
  initHeroSlider();
  initScrollAnimations();
  initScrollTop();
  initProductFilter();
  initContactForm();
  initNewsletterForm();
  renderHomeProducts();
});

function initLoader() {
  const loader = document.getElementById('loader');
  if (loader) setTimeout(() => loader.classList.add('hidden'), 500);
}

function initHeader() {
  const header = document.getElementById('header');
  if (header) window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 50), { passive: true });
}

function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;
  
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
  
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
}

function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;
  
  let current = 0, interval;
  const show = (i) => {
    slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
    dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
    current = i;
  };
  const next = () => show((current + 1) % slides.length);
  const start = () => { interval = setInterval(next, 5000); };
  
  dots.forEach((d, i) => d.addEventListener('click', () => { clearInterval(interval); show(i); start(); }));
  start();
}

function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-in:not(.visible)');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 500), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initProductFilter() {
  const btns = document.querySelectorAll('.categories-nav .category-btn');
  const grid = document.getElementById('productsGrid');
  if (!btns.length || !grid) return;
  
  btns.forEach(btn => btn.addEventListener('click', () => {
    const cat = btn.dataset.category;
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    let items;
    if (cat === 'all') {
      items = PRODUCTS.slice(0, 8);
    } else {
      items = PRODUCTS.filter(p => p.category === cat);
    }
    
    grid.innerHTML = items.map(p => renderHomeCard(p)).join('');
    initHomeCardClicks();
    initScrollAnimations();
  }));
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value;
    const phone = form.querySelector('[name="phone"]').value;
    const message = form.querySelector('[name="message"]').value;
    
    const msg = `Hi! I'm ${name}.\nPhone: ${phone}\n\n${message}`;
    window.open(`https://wa.me/923347942135?text=${encodeURIComponent(msg)}`, '_blank');
    showNotification('Opening WhatsApp...');
    form.reset();
  });
}

function initNewsletterForm() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Thanks for subscribing! 🎉');
    form.reset();
  });
}

function renderHomeCard(p) {
  return `
    <div class="product-card fade-in visible" data-id="${p.id}" data-category="${p.category}">
      <div class="product-image">
        <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <div class="product-actions">
          <button class="product-action-btn" onclick="event.stopPropagation();quickView('${p.id}')">👁</button>
          <button class="product-action-btn" onclick="event.stopPropagation();addToCartQuick('${p.id}')">🛒</button>
        </div>
      </div>
      <div class="product-info">
        <span class="product-category">${p.category}</span>
        <h4 class="product-name"><a href="#product/${p.id}">${p.name}</a></h4>
        <div class="product-rating">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5-Math.floor(p.rating))} <span>(${p.reviews})</span></div>
        <div class="product-price">${formatPrice(p.price)}</div>
      </div>
    </div>
  `;
}

function renderHomeProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid || typeof PRODUCTS === 'undefined') return;
  grid.innerHTML = PRODUCTS.slice(0, 8).map(p => renderHomeCard(p)).join('');
  initHomeCardClicks();
}

function initHomeCardClicks() {
  document.querySelectorAll('.product-card').forEach(card => {
    card.onclick = (e) => {
      if (!e.target.closest('.product-action-btn') && !e.target.closest('a')) {
        router.navigate(`product/${card.dataset.id}`);
      }
    };
  });
}

function quickView(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal quick-view-modal">
      <button class="modal-close" onclick="this.closest('.modal-overlay').remove();document.body.style.overflow=''">×</button>
      <div class="quick-view-content">
        <div class="quick-view-image"><img src="${p.images[0]}" alt="${p.name}"></div>
        <div class="quick-view-info">
          <span class="product-category">${p.category}</span>
          <h2>${p.name}</h2>
          <div class="product-rating">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5-Math.floor(p.rating))} (${p.reviews})</div>
          <div class="product-price-detail"><span class="current-price">${formatPrice(p.price)}</span></div>
          <p>${p.description}</p>
          <div class="quick-view-actions">
            <a href="#product/${p.id}" class="btn btn-primary" onclick="this.closest('.modal-overlay').remove();document.body.style.overflow=''">View Details</a>
            <button class="btn btn-secondary" onclick="addToCartQuick('${p.id}');this.closest('.modal-overlay').remove();document.body.style.overflow=''">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  modal.addEventListener('click', (e) => { if (e.target === modal) { modal.remove(); document.body.style.overflow = ''; }});
}

function addToCartQuick(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (p) { cart.addItem(p, 1, p.colors[0]); showNotification(`${p.name} added!`); }
}

function showNotification(msg) {
  let c = document.querySelector('.notifications-container');
  if (!c) { c = document.createElement('div'); c.className = 'notifications-container'; document.body.appendChild(c); }
  const n = document.createElement('div');
  n.className = 'notification success';
  n.innerHTML = `<span>✓</span><p>${msg}</p>`;
  c.appendChild(n);
  setTimeout(() => n.classList.add('show'), 10);
  setTimeout(() => { n.classList.remove('show'); setTimeout(() => n.remove(), 300); }, 3000);
}
