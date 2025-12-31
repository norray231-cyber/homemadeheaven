/**
 * Handmade Haven SPA Router
 */

class Router {
  constructor() {
    this.routes = {};
    this.currentPage = null;
    this.isHomePage = true;
    this.homeContent = null;
    this.init();
  }

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => {
      this.saveHomeContent();
      this.handleRoute();
    });
  }

  saveHomeContent() {
    const mainContent = document.getElementById('mainContent');
    if (mainContent && !this.homeContent) {
      this.homeContent = mainContent.innerHTML;
    }
  }

  register(route, handler) {
    this.routes[route] = handler;
  }

  navigate(route) {
    window.location.hash = route;
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    const [page, ...params] = hash.split('/');
    
    // Home page sections (scroll to them)
    const homeSections = ['home', 'collections', 'products', 'testimonials', 'contact'];
    
    if (homeSections.includes(page) && params.length === 0) {
      this.showHomePage();
      
      if (page === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setTimeout(() => {
          const section = document.getElementById(page);
          if (section) section.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      this.updateActiveNav(page);
      return;
    }

    // Other pages (cart, checkout, collection, product)
    if (this.routes[page]) {
      this.isHomePage = false;
      this.routes[page](params);
      window.scrollTo(0, 0);
      this.updateActiveNav(page);
    }
  }

  showHomePage() {
    if (!this.isHomePage && this.homeContent) {
      const mainContent = document.getElementById('mainContent');
      mainContent.innerHTML = this.homeContent;
      
      // Re-initialize home page functionality
      if (typeof renderHomeProducts === 'function') renderHomeProducts();
      if (typeof initHeroSlider === 'function') initHeroSlider();
      if (typeof initProductFilter === 'function') initProductFilter();
      if (typeof initScrollAnimations === 'function') initScrollAnimations();
      if (typeof initContactForm === 'function') initContactForm();
    }
    this.isHomePage = true;
  }

  updateActiveNav(page) {
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href').slice(1);
      const isActive = href === page || 
        (page === 'home' && href === 'home') ||
        (page === 'collection' && href === 'collections') ||
        (page === 'product' && href === 'products');
      link.classList.toggle('active', isActive);
    });
  }
}

const router = new Router();
