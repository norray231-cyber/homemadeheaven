/**
 * Handmade Haven SPA Router
 */

class Router {
  constructor() {
    this.routes = {};
    this.currentPage = null;
    this.isHomePage = true;
    this.init();
  }

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
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
      // Show home page and scroll to section
      this.showHomePage();
      
      if (page === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const section = document.getElementById(page);
        if (section) {
          setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
      this.updateActiveNav(page);
      return;
    }

    // Other pages (cart, checkout, collection, product)
    if (this.routes[page]) {
      this.hideHomePage();
      this.routes[page](params);
      window.scrollTo(0, 0);
      this.updateActiveNav(page);
    }
  }

  showHomePage() {
    if (!this.isHomePage) {
      // Restore home sections
      document.querySelectorAll('.home-section').forEach(s => {
        s.style.display = '';
      });
      
      // Clear any dynamically added content (but keep home sections)
      const mainContent = document.getElementById('mainContent');
      const dynamicContent = mainContent.querySelectorAll('section:not(.home-section)');
      dynamicContent.forEach(el => el.remove());
      
      this.isHomePage = true;
    }
  }

  hideHomePage() {
    document.querySelectorAll('.home-section').forEach(s => {
      s.style.display = 'none';
    });
    this.isHomePage = false;
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
