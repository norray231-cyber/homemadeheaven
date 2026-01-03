/**
 * Checkout Page - WhatsApp Order Only
 * Delivery within 15km radius of center point
 */

// Center point coordinates (Lahore - update to your exact location)
const DELIVERY_CENTER = { lat: 31.4697, lng: 74.2728 }; // Gulberg, Lahore
const DELIVERY_RADIUS_KM = 15;
const DELIVERY_FEE = 250;
const FREE_DELIVERY_MIN = 1000;

let deliveryStatus = { eligible: null, distance: null, fee: DELIVERY_FEE };

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function checkDeliveryLocation() {
  const statusEl = document.getElementById('deliveryStatus');
  const checkBtn = document.getElementById('checkLocationBtn');
  
  if (!navigator.geolocation) {
    statusEl.innerHTML = `<div class="delivery-error">❌ Geolocation not supported. Please contact us on WhatsApp.</div>`;
    return;
  }
  
  checkBtn.disabled = true;
  checkBtn.textContent = '📍 Checking...';
  statusEl.innerHTML = `<div class="delivery-checking">🔄 Getting your location...</div>`;
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;
      const distance = calculateDistance(DELIVERY_CENTER.lat, DELIVERY_CENTER.lng, userLat, userLng);
      
      deliveryStatus.distance = distance.toFixed(1);
      
      if (distance <= DELIVERY_RADIUS_KM) {
        deliveryStatus.eligible = true;
        deliveryStatus.fee = cart.getSubtotal() >= FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE;
        statusEl.innerHTML = `
          <div class="delivery-success">
            ✅ <strong>Delivery Available!</strong><br>
            You're ${distance.toFixed(1)} km away.<br>
            Delivery Fee: ${deliveryStatus.fee === 0 ? '<span style="color:green">FREE</span>' : 'RS ' + DELIVERY_FEE}
          </div>`;
        updateOrderSummary();
      } else {
        deliveryStatus.eligible = false;
        statusEl.innerHTML = `
          <div class="delivery-error">
            ⚠️ <strong>Outside Delivery Zone</strong><br>
            You're ${distance.toFixed(1)} km away (max ${DELIVERY_RADIUS_KM} km).<br>
            <a href="https://wa.me/923347942135?text=Hi! I'm outside your delivery zone (${distance.toFixed(1)} km). Can we arrange delivery?" target="_blank" class="btn btn-sm" style="margin-top:8px;background:#25D366;color:#fff;padding:8px 16px;border-radius:5px;display:inline-block;">💬 Contact for Custom Delivery</a>
          </div>`;
      }
      checkBtn.textContent = '📍 Check Again';
      checkBtn.disabled = false;
    },
    (error) => {
      let msg = 'Unable to get location.';
      if (error.code === 1) msg = 'Location access denied. Please enable location.';
      statusEl.innerHTML = `<div class="delivery-error">❌ ${msg}<br><a href="https://wa.me/923347942135?text=Hi! I want to place an order but couldn't share my location." target="_blank">Contact us on WhatsApp</a></div>`;
      checkBtn.textContent = '📍 Try Again';
      checkBtn.disabled = false;
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

function updateOrderSummary() {
  const fee = deliveryStatus.eligible ? deliveryStatus.fee : DELIVERY_FEE;
  const total = cart.getSubtotal() + fee;
  
  const deliveryEl = document.getElementById('summaryDelivery');
  const totalEl = document.getElementById('summaryTotal');
  
  if (deliveryEl) {
    deliveryEl.innerHTML = fee === 0 ? '<span style="color:green">FREE</span>' : formatPrice(fee);
  }
  if (totalEl) {
    totalEl.textContent = formatPrice(total);
  }
}

function renderCheckoutPage() {
  const items = cart.getItems();
  if (!items.length) { router.navigate('cart'); return; }
  
  deliveryStatus = { eligible: null, distance: null, fee: DELIVERY_FEE };
  const initialFee = cart.getSubtotal() >= FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE;

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
                  <div class="form-group"><label>Name *</label><input type="text" id="custName" required></div>
                  <div class="form-group"><label>Phone *</label><input type="tel" id="custPhone" placeholder="03XX XXXXXXX" required></div>
                </div>
              </div>
              <div class="checkout-section">
                <h3>📍 Check Delivery Availability</h3>
                <div class="delivery-notice" style="background:#e8f4fd;border:1px solid #0066cc;padding:15px;border-radius:8px;margin-bottom:1rem;">
                  <p style="margin:0 0 10px 0;font-size:0.95rem;"><strong>We deliver within ${DELIVERY_RADIUS_KM} km</strong> of our location in Lahore.</p>
                  <p style="margin:0 0 10px 0;font-size:0.85rem;">🚚 Delivery Fee: <strong>RS ${DELIVERY_FEE}</strong> | Free on orders over RS ${FREE_DELIVERY_MIN}</p>
                  <button type="button" id="checkLocationBtn" onclick="checkDeliveryLocation()" class="btn btn-primary" style="width:100%;">📍 Check My Location</button>
                </div>
                <div id="deliveryStatus"></div>
                <div class="form-group"><label>Full Address *</label><input type="text" id="custAddress" placeholder="House #, Street, Area, Lahore" required></div>
                <div class="form-group"><label>Preferred Delivery Time</label><input type="text" id="custTime" placeholder="e.g. Tomorrow 5 PM"></div>
                <div class="form-group"><label>Special Instructions</label><textarea id="custNotes" placeholder="Any special requests..."></textarea></div>
              </div>
              <div class="checkout-section">
                <h3>Payment Method</h3>
                <div class="payment-options">
                  <label class="payment-option active">
                    <input type="radio" name="payment" value="cod" checked>
                    <div class="payment-option-content"><span>💵</span><div><strong>Cash on Delivery</strong><p>Pay when you receive</p></div></div>
                  </label>
                </div>
              </div>
              <button type="submit" class="btn btn-primary btn-lg btn-block">💬 Complete Order via WhatsApp</button>
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
            <div class="summary-row"><span>Delivery</span><span id="summaryDelivery">${initialFee === 0 ? '<span style="color:green">FREE</span>' : formatPrice(initialFee)}</span></div>
            <div class="summary-divider"></div>
            <div class="summary-row total"><span>Total</span><span id="summaryTotal">${formatPrice(cart.getSubtotal() + initialFee)}</span></div>
            <div style="margin-top:1rem;padding:1rem;background:#fff3cd;border-radius:8px;text-align:center;">
              <p style="margin:0;font-size:0.85rem;">📍 Please check your location to confirm delivery availability</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (deliveryStatus.eligible === false) {
      showNotification('Please contact us for delivery outside our zone');
      return;
    }
    
    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const address = document.getElementById('custAddress').value;
    const time = document.getElementById('custTime').value;
    const notes = document.getElementById('custNotes').value;
    const fee = deliveryStatus.eligible ? deliveryStatus.fee : (cart.getSubtotal() >= FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE);
    const total = cart.getSubtotal() + fee;
    
    let msg = `🍪 *HANDMADE HAVEN ORDER*\n\n`;
    msg += `👤 *Customer:* ${name}\n`;
    msg += `📞 *Phone:* ${phone}\n`;
    msg += `📍 *Address:* ${address}\n`;
    if (deliveryStatus.distance) msg += `📏 *Distance:* ${deliveryStatus.distance} km\n`;
    if (time) msg += `⏰ *Delivery Time:* ${time}\n`;
    if (notes) msg += `📝 *Notes:* ${notes}\n`;
    msg += `\n━━━━━━━━━━━━━━━━\n📦 *ORDER ITEMS:*\n\n`;
    
    cart.getItems().forEach(item => {
      msg += `• ${item.name} × ${item.quantity} = ${formatPrice(item.price * item.quantity)}\n`;
    });
    
    msg += `\n━━━━━━━━━━━━━━━━\n`;
    msg += `📦 Subtotal: ${formatPrice(cart.getSubtotal())}\n`;
    msg += `🚚 Delivery: ${fee === 0 ? 'FREE' : formatPrice(fee)}\n`;
    msg += `💰 *TOTAL: ${formatPrice(total)}*\n`;
    msg += `\n💵 Payment: Cash on Delivery\n✅ Please confirm my order!`;
    
    cart.clearCart();
    window.open(`https://wa.me/923347942135?text=${encodeURIComponent(msg)}`, '_blank');
    showNotification('Redirecting to WhatsApp...');
    setTimeout(() => router.navigate('home'), 1000);
  });
}

router.register('checkout', renderCheckoutPage);
