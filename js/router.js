/**
 * Handmade Haven SPA Router
 */

class Router {
  constructor() {
    this.routes = {};
    this.currentPage = null;
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
    
    // For home page sections, just scroll to section
    if (['collections', 'products', 'testimonials', 'contact'].includes(page) && !params.length) {
      this.showHomeSections();
      const section = document.getElementById(page);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
      this.updateActiveNav(page);
      return;
    }

    // For home, show home sections
    if (page === 'home') {
      this.showHomeSections();
      window.scrollTo(0, 0);
      this.updateActiveNav('home');
      return;
    }

    // For other pages, hide home sections and render page
    if (this.routes[page]) {
      this.hideHomeSections();
      this.routes[page](params);
      window.scrollTo(0, 0);
    }

    this.updateActiveNav(page);
  }

  showHomeSections() {
    document.querySelectorAll('.home-section').forEach(s => s.style.display = '');
    document.getElementById('mainContent').dataset.page = 'home';
  }

  hideHomeSections() {
    document.querySelectorAll('.home-section').forEach(s => s.style.display = 'none');
    document.getElementById('mainContent').dataset.page = 'other';
  }

  updateActiveNav(page) {
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href').slice(1);
      const isActive = href === page || 
        (page === 'home' && href === 'home') ||
        (page === 'collection' && href === 'collections');
      link.classList.toggle('active', isActive);
    });
  }
}

const router = new Router();
