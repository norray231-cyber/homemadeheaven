/**
 * Category Page Renderer
 */

function renderCollectionPage(params) {
  const collectionId = params[0];
  const collection = COLLECTIONS.find(c => c.id === collectionId);
  let products = PRODUCTS.filter(p => p.category === collectionId);
  
  if (!collection) { router.navigate('home'); return; }

  const mainContent = document.getElementById('mainContent');
  mainContent.innerHTML = `
    <section class="collection-hero">
      <div class="collection-hero-bg">
        <img src="${collection.image}" alt="${collection.name}">
        <div class="collection-hero-overlay"></div>
      </div>
      <div class="container">
        <div class="collection-hero-content">
          <nav class="breadcrumb">
            <a href="#home">Home</a> / <span>${collection.name}</span>
          </nav>
          <span class="collection-tagline">${collection.tagline}</span>
          <h1>${collection.name}</h1>
          <p>${collection.description}</p>
          <div class="collection-stats">
            <span>${products.length} Items</span>
            <span>•</span>
            <span>Delivery in Lahore Only</span>
            <span>•</span>
            <span>Free Delivery over RS 1,000</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="shop-toolbar">
          <div class="shop-results">Showing <strong>${products.length}</strong> items</div>
          <div class="shop-sort">
            <label>Sort by:</label>
            <select id="sortSelect">
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
        <div class="grid grid-4" id="collectionProducts">
          ${products.map(p => renderProductCard(p)).join('')}
        </div>
        <div class="products-footer" style="margin-top:2rem;text-align:center;">
          <a href="#home" class="btn btn-secondary">← Back to Home</a>
        </div>
      </div>
    </section>
  `;

  // Sort functionality
  document.getElementById('sortSelect').addEventListener('change', function() {
    let sorted = PRODUCTS.filter(p => p.category === collectionId);
    if (this.value === 'price-low') sorted.sort((a, b) => a.price - b.price);
    else if (this.value === 'price-high') sorted.sort((a, b) => b.price - a.price);
    document.getElementById('collectionProducts').innerHTML = sorted.map(p => renderProductCard(p)).join('');
    initProductCardClicks();
  });

  initProductCardClicks();
  initScrollAnimations();
}

function renderProductCard(product) {
  return `
    <div class="product-card fade-in" data-id="${product.id}">
      <div class="product-image">
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        <div class="product-actions">
          <button class="product-action-btn" onclick="event.stopPropagation();quickView('${product.id}')" title="Quick View">👁</button>
          <button class="product-action-btn" onclick="event.stopPropagation();addToCartQuick('${product.id}')" title="Add to Cart">🛒</button>
        </div>
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h4 class="product-name"><a href="#product/${product.id}">${product.name}</a></h4>
        <div class="product-rating">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))} <span>(${product.reviews})</span></div>
        <div class="product-price">${formatPrice(product.price)}</div>
      </div>
    </div>
  `;
}

function initProductCardClicks() {
  document.querySelectorAll('.product-card').forEach(card => {
    card.onclick = (e) => {
      if (!e.target.closest('.product-action-btn') && !e.target.closest('a')) {
        router.navigate(`product/${card.dataset.id}`);
      }
    };
  });
}

router.register('collection', renderCollectionPage);
