/**
 * Product Detail Page
 */

function renderProductPage(params) {
  const productId = params[0];
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) { router.navigate('home'); return; }

  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const mainContent = document.getElementById('mainContent');
  
  mainContent.innerHTML = `
    <section class="product-detail section">
      <div class="container">
        <nav class="breadcrumb">
          <a href="#home">Home</a> / <a href="#collection/${product.category}">${product.category}</a> / <span>${product.name}</span>
        </nav>

        <div class="product-detail-grid">
          <div class="product-gallery">
            <div class="product-main-image">
              <img src="${product.images[0]}" alt="${product.name}" id="mainProductImage">
              ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
          </div>

          <div class="product-info-detail">
            <div class="product-meta">
              <span class="product-category-tag">${product.category}</span>
              <div class="product-rating-detail">
                <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
                <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
              </div>
            </div>

            <h1 class="product-title">${product.name}</h1>
            <div class="product-price-detail">
              <span class="current-price">${formatPrice(product.price)}</span>
            </div>
            <p class="product-description">${product.description}</p>

            ${product.colors.length > 1 ? `
              <div class="product-option">
                <label>Option: <span id="selectedColor">${product.colors[0]}</span></label>
                <div class="variant-options">
                  ${product.colors.map((c, i) => `
                    <button class="variant-btn ${i === 0 ? 'active' : ''}" onclick="selectVariant('${c}', this)">${c}</button>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <div class="product-option">
              <label>Quantity:</label>
              <div class="quantity-selector">
                <button class="qty-btn" onclick="changeProductQty(-1)">−</button>
                <input type="number" id="productQty" value="1" min="1" max="20" readonly>
                <button class="qty-btn" onclick="changeProductQty(1)">+</button>
              </div>
            </div>

            <div class="product-actions-detail">
              <button class="btn btn-primary btn-lg" onclick="addProductToCart('${product.id}')">🛒 Add to Cart</button>
              <button class="btn btn-secondary btn-lg" onclick="buyProductNow('${product.id}')">Order Now</button>
            </div>

            <a href="https://wa.me/923347942135?text=${encodeURIComponent(`Hi! I want to order: ${product.name} (${formatPrice(product.price)})`)}" class="whatsapp-order" target="_blank">💬 Order via WhatsApp</a>

            <div class="product-details-accordion">
              <div class="accordion-item active">
                <button class="accordion-header" onclick="this.parentElement.classList.toggle('active')"><span>Details</span><span>▼</span></button>
                <div class="accordion-content">
                  <table class="details-table">
                    ${Object.entries(product.details).map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('')}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        ${related.length ? `
          <div class="related-products">
            <h2>You May Also Like</h2>
            <div class="grid grid-4">${related.map(p => renderProductCard(p)).join('')}</div>
          </div>
        ` : ''}
        
        <div style="text-align:center;margin-top:2rem;">
          <a href="#home" class="btn btn-secondary">← Back to Home</a>
        </div>
      </div>
    </section>
  `;

  initProductCardClicks();
  initScrollAnimations();
}

let selectedVariant = null;

function selectVariant(variant, btn) {
  selectedVariant = variant;
  document.getElementById('selectedColor').textContent = variant;
  document.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function changeProductQty(delta) {
  const input = document.getElementById('productQty');
  input.value = Math.max(1, Math.min(20, parseInt(input.value) + delta));
}

function addProductToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  const qty = parseInt(document.getElementById('productQty').value);
  const variant = selectedVariant || product.colors[0];
  cart.addItem(product, qty, variant);
  showNotification(`${product.name} added to cart!`);
}

function buyProductNow(productId) {
  addProductToCart(productId);
  router.navigate('cart');
}

router.register('product', renderProductPage);
