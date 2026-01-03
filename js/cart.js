/**
 * Handmade Haven Shopping Cart
 */

class ShoppingCart {
  constructor() {
    this.items = this.load();
    this.listeners = [];
  }

  load() {
    try { return JSON.parse(localStorage.getItem('handmade_cart')) || []; }
    catch { return []; }
  }

  save() {
    localStorage.setItem('handmade_cart', JSON.stringify(this.items));
    this.listeners.forEach(cb => cb(this));
  }

  addItem(product, quantity = 1, color = null) {
    const idx = this.items.findIndex(i => i.id === product.id && i.color === color);
    if (idx > -1) this.items[idx].quantity += quantity;
    else this.items.push({
      id: product.id, name: product.name, price: product.price,
      image: product.images[0], quantity, color, category: product.category
    });
    this.save();
  }

  removeItem(id, color) {
    this.items = this.items.filter(i => !(i.id === id && i.color === color));
    this.save();
  }

  updateQuantity(id, color, qty) {
    const item = this.items.find(i => i.id === id && i.color === color);
    if (item) { item.quantity = Math.max(1, qty); this.save(); }
  }

  getItems() { return this.items; }
  getItemCount() { return this.items.reduce((s, i) => s + i.quantity, 0); }
  getSubtotal() { return this.items.reduce((s, i) => s + i.price * i.quantity, 0); }
  getShipping() { return this.getSubtotal() >= 1000 ? 0 : 250; }
  getTotal() { return this.getSubtotal() + this.getShipping(); }
  clearCart() { this.items = []; this.save(); }
  subscribe(cb) { this.listeners.push(cb); }
}

const cart = new ShoppingCart();

function updateCartBadge() {
  const count = cart.getItemCount();
  document.querySelectorAll('.cart-badge').forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'flex' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  cart.subscribe(updateCartBadge);
  updateCartBadge();
});

function formatPrice(price) {
  return 'RS ' + price.toLocaleString('en-PK');
}
