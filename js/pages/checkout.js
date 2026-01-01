/**
 * Checkout Page - WhatsApp Order Only
 */

function renderCheckoutPage() {
  const items = cart.getItems();
  if (!items.length) { router.navigate('cart'); return; }

  document.getElementById('mainContent').innerHTML = `
    <section class="checkout-page section">
      <div class="container">
        <nav class="breadcrumb"><a href="#home">Home</a> / <a href="#cart">Cart</a> / <span>Checkout</span></nav>
        <h1 class="page-title">Checkout</h1>

        <div class="checkout-layout">
          <div class="checkout-form-wrapper">
            <form id="checkoutForm">
              <div class="checkout-section">
                <h3>Your Details</h3>
                <div class="form-row">
                  <div class="form-group"><label>Name *</label><input type="text" id="custName" placeholder="Your name" required></div>
                  <div class="form-group"><label>Phone *</label><input type="tel" id="custPhone" placeholder="03001234567" required></div>
                </div>
              </div>

              <div class="checkout-section">
                <h3>Delivery Address</h3>
                <div class="form-group"><label>Full Address *</label><input type="text" id="custAddress" placeholder="House #, Street, Area" required></div>
                <div class="form-row">
                  <div class="form-group"><label>City *</label>
                    <select id="custCity" required>
                      <option value="">Select City</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div class="form-group"><label>Delivery Time</label><input type="text" id="custTime" placeholder="e.g. Tomorrow 5 PM"></div>
                </div>
                <div class="form-group"><label>Special Instructions</label><textarea id="custNotes" placeholder="Any special requests..."></textarea></div>
              </div>

              <div class="checkout-section">
                <h3>Payment Method</h3>
                <div class="payment-options">
                  <label class="payment-option active">
                    <input type="radio" name="payment" value="cod" checked>
                    <div class="payment-option-content"><span>💵</span><div><strong>Cash on Delivery</strong><p>Pay when you receive your order</p></div></div>
                  </label>
                </div>
              </div>

              <button type="submit" class="btn btn-primary btn-lg btn-block">
                💬 Complete Order via WhatsApp
              </button>
              <p style="text-align:center;margin-top:1rem;color:#666;font-size:0.9rem;">You'll be redirected to WhatsApp to confirm your order</p>
            </form>
          </div>

          <div class="checkout-summary">
            <h3>Order Summary</h3>
            <div class="checkout-items">
              ${items.map(item => `
                <div class="checkout-item">
                  <div class="checkout-item-image"><img src="${item.image}"><span class="checkout-item-qty">${item.quantity}</span></div>
                  <div class="checkout-item-info"><h4>${item.name}</h4></div>
                  <div class="checkout-item-price">${formatPrice(item.price * item.quantity)}</div>
                </div>
              `).join('')}
            </div>
            <div class="summary-divider"></div>
            <div class="summary-row"><span>Subtotal</span><span>${formatPrice(cart.getSubtotal())}</span></div>
            <div class="summary-row"><span>Delivery</span><span>${cart.getShipping() === 0 ? 'FREE' : formatPrice(cart.getShipping())}</span></div>
            <div class="summary-divider"></div>
            <div class="summary-row total"><span>Total</span><span>${formatPrice(cart.getTotal())}</span></div>
            <div style="margin-top:1rem;padding:1rem;background:#f5f5f5;border-radius:8px;text-align:center;">
              <p style="margin:0;font-size:0.85rem;">🚚 Free delivery on orders over RS 1,000</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Form submission - redirect to WhatsApp
  document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const address = document.getElementById('custAddress').value;
    const city = document.getElementById('custCity').value;
    const time = document.getElementById('custTime').value;
    const notes = document.getElementById('custNotes').value;
    
    // Build WhatsApp message
    let msg = `🍪 *HANDMADE HAVEN ORDER*\n\n`;
    msg += `👤 *Customer:* ${name}\n`;
    msg += `📞 *Phone:* ${phone}\n`;
    msg += `📍 *Address:* ${address}, ${city}\n`;
    if (time) msg += `⏰ *Delivery Time:* ${time}\n`;
    if (notes) msg += `📝 *Notes:* ${notes}\n`;
    msg += `\n━━━━━━━━━━━━━━━━\n`;
    msg += `📦 *ORDER ITEMS:*\n\n`;
    
    cart.getItems().forEach(item => {
      msg += `• ${item.name} × ${item.quantity} = ${formatPrice(item.price * item.quantity)}\n`;
    });
    
    msg += `\n━━━━━━━━━━━━━━━━\n`;
    msg += `📦 Subtotal: ${formatPrice(cart.getSubtotal())}\n`;
    msg += `🚚 Delivery: ${cart.getShipping() === 0 ? 'FREE' : formatPrice(cart.getShipping())}\n`;
    msg += `💰 *TOTAL: ${formatPrice(cart.getTotal())}*\n`;
    msg += `\n💵 Payment: Cash on Delivery\n`;
    msg += `\n✅ Please confirm my order!`;
    
    // Clear cart
    cart.clearCart();
    
    // Open WhatsApp
    const whatsappUrl = `https://wa.me/923347942135?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
    
    // Show success and redirect
    showNotification('Redirecting to WhatsApp...');
    setTimeout(() => {
      router.navigate('home');
    }, 1000);
  });
}

router.register('checkout', renderCheckoutPage);
