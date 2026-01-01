/**
 * Shopping Cart Page
 */

function renderCartPage() {
  const items = cart.getItems();
  const mainContent = document.getElementById('mainContent');

  if (items.length === 0) {
    mainContent.innerHTML = `
      <section class="cart-empty section">
        <div class="container text-center">
          <div style="font-size:80px;margin-bottom:1rem;">🛒</div>
          <h1>Your Cart is Empty</h1>
          <p>Looks like you haven't added any treats yet!</p>
          <a href="#home" class="btn btn-primary">Browse Menu</a>
        </div>
      </section>
    `;
    return;
  }

  mainContent.innerHTML = `
    <section class="cart-page section">
      <div class="container">
        <nav class="breadcrumb"><a href="#home">Home</a> / <span>Cart</span></nav>
        <h1 class="page-title">Your Order</h1>

        <div class="cart-layout">
          <div class="cart-items">
            <div class="cart-header"><span>Item</span><span>Price</span><span>Qty</span><span>Total</span><span></span></div>
            ${items.map(item => `
              <div class="cart-item">
                <div class="cart-item-product">
                  <img src="${item.image}" alt="${item.name}">
                  <div class="cart-item-info">
                    <h4><a href="#product/${item.id}">${item.name}</a></h4>
                    <span class="cart-item-category">${item.category}</span>
                  </div>
                </div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
                <div class="cart-item-quantity">
                  <div class="quantity-selector small">
                    <button class="qty-btn" onclick="updateCartQty('${item.id}', '${item.color}', -1)">−</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateCartQty('${item.id}', '${item.color}', 1)">+</button>
                  </div>
                </div>
                <div class="cart-item-total">${formatPrice(item.price * item.quantity)}</div>
                <button class="cart-item-remove" onclick="removeCartItem('${item.id}', '${item.color}')">✕</button>
              </div>
            `).join('')}
            <div class="cart-actions">
              <a href="#home" class="btn btn-secondary">← Continue Shopping</a>
              <button class="btn btn-outline" onclick="if(confirm('Clear cart?')){cart.clearCart();renderCartPage();}">Clear</button>
            </div>
          </div>

          <div class="cart-summary">
            <h3>Order Summary</h3>
            <div class="summary-row"><span>Subtotal (${cart.getItemCount()} items)</span><span>${formatPrice(cart.getSubtotal())}</span></div>
            <div class="summary-row"><span>Delivery</span><span>${cart.getShipping() === 0 ? '<span class="free-shipping">FREE</span>' : formatPrice(cart.getShipping())}</span></div>
            ${cart.getSubtotal() < 1000 && cart.getSubtotal() > 0 ? `
              <div class="shipping-progress">
                <p>Add <strong>${formatPrice(1000 - cart.getSubtotal())}</strong> more for FREE delivery!</p>
                <div class="progress-bar"><div class="progress-fill" style="width:${(cart.getSubtotal()/1000)*100}%"></div></div>
              </div>
            ` : ''}
            <div class="summary-divider"></div>
            <div class="summary-row total"><span>Total</span><span>${formatPrice(cart.getTotal())}</span></div>
            <button class="btn btn-primary btn-lg btn-block" onclick="router.navigate('checkout')">Proceed to Checkout</button>
            <a href="https://wa.me/923347942135?text=${encodeURIComponent(generateWhatsAppOrder())}" class="whatsapp-checkout" target="_blank">💬 Quick Order via WhatsApp</a>
            <div class="trust-icons"><span>🚚 Fast Delivery</span><span>💵 Cash on Delivery</span></div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function updateCartQty(id, color, delta) {
  const item = cart.getItems().find(i => i.id === id && i.color === color);
  if (item) {
    if (item.quantity + delta < 1) removeCartItem(id, color);
    else { cart.updateQuantity(id, color, item.quantity + delta); renderCartPage(); }
  }
}

function removeCartItem(id, color) {
  cart.removeItem(id, color);
  renderCartPage();
  showNotification('Item removed');
}

function generateWhatsAppOrder() {
  let msg = '🍪 *Handmade Haven Order*\n\n';
  cart.getItems().forEach(item => {
    msg += `• ${item.name} × ${item.quantity} = ${formatPrice(item.price * item.quantity)}\n`;
  });
  msg += `\n💰 *Total: ${formatPrice(cart.getTotal())}*\n\nPlease confirm my order!`;
  return msg;
}

router.register('cart', renderCartPage);
cart.subscribe(() => { if (window.location.hash === '#cart') renderCartPage(); });
