/**
 * Menu Overview Page
 */

function renderCollectionsPage() {
  const mainContent = document.getElementById('mainContent');
  
  mainContent.innerHTML = `
    <section class="collections-hero">
      <div class="container">
        <nav class="breadcrumb"><a href="#home">Home</a> / <span>Full Menu</span></nav>
        <h1>Our Full Menu</h1>
        <p>Fresh homemade treats baked with love</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="collections-grid">
          ${COLLECTIONS.map((col, i) => `
            <a href="#collection/${col.id}" class="collection-card fade-in ${i === 0 ? 'featured' : ''}">
              <div class="collection-card-image">
                <img src="${col.image}" alt="${col.name}" loading="lazy">
                <div class="collection-card-overlay"></div>
              </div>
              <div class="collection-card-content">
                <span class="collection-tagline">${col.tagline}</span>
                <h2>${col.name}</h2>
                <p>${col.description}</p>
                <div class="collection-card-footer">
                  <span>${col.productCount} Items</span>
                  <span class="explore-link">View Menu →</span>
                </div>
              </div>
            </a>
          `).join('')}
        </div>
        
        <div style="text-align:center;margin-top:3rem;">
          <a href="#home" class="btn btn-secondary">← Back to Home</a>
        </div>
      </div>
    </section>

    <section class="section bg-alt">
      <div class="container">
        <div class="section-header">
          <h2>Bestsellers</h2>
          <p>Our most loved items</p>
        </div>
        <div class="grid grid-4">
          ${PRODUCTS.filter(p => p.badge === 'Bestseller').map(p => renderProductCard(p)).join('')}
        </div>
      </div>
    </section>
  `;

  initProductCardClicks();
  initScrollAnimations();
}

router.register('collections', renderCollectionsPage);
