/**
 * INFLUQO - Shop & Catalog Browsing Module
 * Full filtering, search, sorting, price range, and URL state sync.
 */

(function() {
  'use strict';

  let currentCategory = 'all';
  let searchQuery = '';
  let sortOption = 'featured';
  let onlyDeals = false;
  let onlyNewArrivals = false;
  let inStockOnly = false;
  let maxPriceNaira = 50000; // max slider ceiling in Naira

  function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      category: params.get('category') || 'all',
      search: (params.get('search') || params.get('q') || '').trim(),
      sort: params.get('sort') || 'featured',
      deal: params.get('deal') === 'true' || params.get('deal') === '1',
      newArrival: params.get('new') === 'true' || params.get('new') === '1',
      inStock: params.get('inStock') === 'true',
      maxPrice: parseInt(params.get('maxPrice'), 10) || 50000
    };
  }

  function syncFiltersFromUrl() {
    const params = getUrlParams();
    currentCategory = params.category;
    searchQuery = params.search;
    sortOption = params.sort;
    onlyDeals = params.deal;
    onlyNewArrivals = params.newArrival;
    inStockOnly = params.inStock;
    maxPriceNaira = params.maxPrice;

    // Update Form Controls to match URL
    const searchInputs = document.querySelectorAll('.shop-filter-search-input');
    searchInputs.forEach(input => input.value = searchQuery);

    const categoryRadios = document.querySelectorAll('input[name="shop-category"]');
    categoryRadios.forEach(radio => {
      radio.checked = radio.value === currentCategory;
    });

    const sortSelect = document.getElementById('shopSortSelect');
    if (sortSelect) sortSelect.value = sortOption;

    const dealsCheck = document.getElementById('filterDealsCheck');
    if (dealsCheck) dealsCheck.checked = onlyDeals;

    const inStockCheck = document.getElementById('filterInStockCheck');
    if (inStockCheck) inStockCheck.checked = inStockOnly;

    const priceSlider = document.getElementById('filterPriceRange');
    const priceDisplay = document.getElementById('filterPriceDisplay');
    if (priceSlider) priceSlider.value = maxPriceNaira;
    if (priceDisplay) priceDisplay.textContent = formatKobo(maxPriceNaira * 100);
  }

  function updateUrl() {
    const params = new URLSearchParams();
    if (currentCategory !== 'all') params.set('category', currentCategory);
    if (searchQuery) params.set('search', searchQuery);
    if (sortOption !== 'featured') params.set('sort', sortOption);
    if (onlyDeals) params.set('deal', 'true');
    if (onlyNewArrivals) params.set('new', 'true');
    if (inStockOnly) params.set('inStock', 'true');
    if (maxPriceNaira < 50000) params.set('maxPrice', String(maxPriceNaira));

    const newQuery = params.toString();
    const newUrl = newQuery ? `${window.location.pathname}?${newQuery}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }

  function getFilteredProducts() {
    const all = getAllProducts();
    const query = searchQuery.toLowerCase();

    return all.filter(p => {
      // Category filter
      if (currentCategory !== 'all' && p.category !== currentCategory) {
        return false;
      }
      // Deals filter
      if (onlyDeals && !p.isDeal) {
        return false;
      }
      // New arrivals filter
      if (onlyNewArrivals && !p.isNewArrival) {
        return false;
      }
      // In-stock filter
      if (inStockOnly && p.stock <= 0) {
        return false;
      }
      // Price ceiling filter (priceKobo <= maxPriceNaira * 100)
      if (p.priceKobo > (maxPriceNaira * 100)) {
        return false;
      }
      // Search query in title, shortDescription, categoryName, or specs
      if (query) {
        const titleMatch = p.name.toLowerCase().includes(query);
        const catMatch = p.categoryName.toLowerCase().includes(query);
        const descMatch = (p.shortDescription || '').toLowerCase().includes(query);
        if (!titleMatch && !catMatch && !descMatch) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.priceKobo - b.priceKobo;
      if (sortOption === 'price-desc') return b.priceKobo - a.priceKobo;
      if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
      if (sortOption === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      // 'featured' default: deals & featured first
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }

  function renderActiveFilterPills() {
    const pillContainer = document.getElementById('shopActiveFiltersContainer');
    if (!pillContainer) return;

    const pills = [];

    if (currentCategory !== 'all') {
      const catObj = INFLUQO_CONFIG.categories.find(c => c.id === currentCategory);
      pills.push({
        label: `Category: ${catObj ? catObj.name : currentCategory}`,
        clear: () => {
          currentCategory = 'all';
          const r = document.querySelector('input[name="shop-category"][value="all"]');
          if (r) r.checked = true;
          applyAndRender();
        }
      });
    }

    if (searchQuery) {
      pills.push({
        label: `Search: "${searchQuery}"`,
        clear: () => {
          searchQuery = '';
          const inputs = document.querySelectorAll('.shop-filter-search-input');
          inputs.forEach(i => i.value = '');
          applyAndRender();
        }
      });
    }

    if (onlyDeals) {
      pills.push({
        label: 'Limited Deals',
        clear: () => {
          onlyDeals = false;
          const d = document.getElementById('filterDealsCheck');
          if (d) d.checked = false;
          applyAndRender();
        }
      });
    }

    if (onlyNewArrivals) {
      pills.push({
        label: 'New Arrivals',
        clear: () => {
          onlyNewArrivals = false;
          applyAndRender();
        }
      });
    }

    if (inStockOnly) {
      pills.push({
        label: 'In Stock Only',
        clear: () => {
          inStockOnly = false;
          const s = document.getElementById('filterInStockCheck');
          if (s) s.checked = false;
          applyAndRender();
        }
      });
    }

    if (maxPriceNaira < 50000) {
      pills.push({
        label: `Under ${formatKobo(maxPriceNaira * 100)}`,
        clear: () => {
          maxPriceNaira = 50000;
          const sl = document.getElementById('filterPriceRange');
          const dp = document.getElementById('filterPriceDisplay');
          if (sl) sl.value = 50000;
          if (dp) dp.textContent = formatKobo(5000000);
          applyAndRender();
        }
      });
    }

    if (pills.length === 0) {
      pillContainer.innerHTML = '';
      pillContainer.style.display = 'none';
      return;
    }

    pillContainer.style.display = 'flex';
    pillContainer.innerHTML = `
      <div class="active-filter-pills-list">
        ${pills.map((p, idx) => `
          <button type="button" class="filter-pill" data-pill-index="${idx}">
            <span>${InfluqoShared.escapeHtml(p.label)}</span>
            <span class="pill-remove-icon" aria-hidden="true">&times;</span>
          </button>
        `).join('')}
        <button type="button" class="btn-clear-all-filters" id="btnClearAllFiltersBtn">Clear All</button>
      </div>
    `;

    // Attach pill click events
    const pillButtons = pillContainer.querySelectorAll('.filter-pill');
    pillButtons.forEach((btn, idx) => {
      btn.addEventListener('click', () => pills[idx].clear());
    });

    const clearAllBtn = document.getElementById('btnClearAllFiltersBtn');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', resetAllFilters);
    }
  }

  function resetAllFilters() {
    currentCategory = 'all';
    searchQuery = '';
    sortOption = 'featured';
    onlyDeals = false;
    onlyNewArrivals = false;
    inStockOnly = false;
    maxPriceNaira = 50000;

    syncFiltersFromUrl();
    applyAndRender();
  }

  function renderProductsGrid(products) {
    const grid = document.getElementById('shopProductsGrid');
    const countEl = document.getElementById('shopProductsCount');
    const emptyState = document.getElementById('shopEmptyState');

    if (!grid) return;

    if (countEl) {
      const totalAll = getAllProducts().length;
      countEl.textContent = `Showing ${products.length} of ${totalAll} products`;
    }

    if (products.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    grid.innerHTML = products.map(p => {
      const inWishlist = InfluqoStorage.isInWishlist(p.id);
      const isOutOfStock = p.stock <= 0;
      const formattedPrice = formatKobo(p.priceKobo);
      const formattedOriginal = p.originalPriceKobo ? formatKobo(p.originalPriceKobo) : null;
      
      const badgeHtml = p.isDeal
        ? `<span class="product-badge badge-deal">Deal</span>`
        : p.isNewArrival
        ? `<span class="product-badge badge-new">New</span>`
        : '';

      return `
        <article class="product-card" data-product-id="${p.id}">
          <div class="product-card-image-wrap">
            <a href="product.html?id=${encodeURIComponent(p.id)}" aria-label="View ${InfluqoShared.escapeHtml(p.name)}">
              <img src="${p.image}" alt="${InfluqoShared.escapeHtml(p.alt || p.name)}" loading="lazy" class="product-card-img">
            </a>
            ${badgeHtml}
            <button type="button" class="wishlist-btn-toggle ${inWishlist ? 'is-active' : ''}" data-product-id="${p.id}" aria-label="${inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}" title="${inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="${inWishlist ? '#D32F2F' : 'none'}" stroke="${inWishlist ? '#D32F2F' : 'currentColor'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
          </div>
          <div class="product-card-body">
            <span class="product-card-category">${InfluqoShared.escapeHtml(p.categoryName)}</span>
            <h3 class="product-card-title">
              <a href="product.html?id=${encodeURIComponent(p.id)}">${InfluqoShared.escapeHtml(p.name)}</a>
            </h3>
            <p class="product-card-desc">${InfluqoShared.escapeHtml(p.shortDescription)}</p>
            <div class="product-card-price-row">
              <span class="price-current">${formattedPrice}</span>
              ${formattedOriginal ? `<span class="price-original">${formattedOriginal}</span>` : ''}
            </div>
            <div class="product-card-actions">
              <button type="button" class="btn btn-secondary btn-quick-add" data-product-id="${p.id}" ${isOutOfStock ? 'disabled' : ''}>
                ${isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach Wishlist toggle listeners
    grid.querySelectorAll('.wishlist-btn-toggle').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const pId = this.getAttribute('data-product-id');
        const nowInWishlist = InfluqoStorage.toggleWishlist(pId);
        const product = getProductById(pId);
        const name = product ? product.name : 'Product';

        this.classList.toggle('is-active', nowInWishlist);
        const svg = this.querySelector('svg');
        if (nowInWishlist) {
          svg.setAttribute('fill', '#D32F2F');
          svg.setAttribute('stroke', '#D32F2F');
          InfluqoShared.showToast(`Saved "${name}" to wishlist`, 'success');
        } else {
          svg.setAttribute('fill', 'none');
          svg.setAttribute('stroke', 'currentColor');
          InfluqoShared.showToast(`Removed "${name}" from wishlist`, 'info');
        }
      });
    });

    // Attach Quick Add to Cart listeners
    grid.querySelectorAll('.btn-quick-add').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const pId = this.getAttribute('data-product-id');
        const res = InfluqoStorage.addToCart(pId, null, null, 1);
        const product = getProductById(pId);
        const name = product ? product.name : 'Product';

        if (res.success) {
          InfluqoShared.showToast(`Added "${name}" to cart`, 'success');
        } else {
          InfluqoShared.showToast(res.message || 'Could not add to cart', 'error');
        }
      });
    });
  }

  function applyAndRender() {
    updateUrl();
    renderActiveFilterPills();
    const products = getFilteredProducts();
    renderProductsGrid(products);
  }

  function initShopControls() {
    // Search input
    const searchInputs = document.querySelectorAll('.shop-filter-search-input');
    searchInputs.forEach(input => {
      input.addEventListener('input', function() {
        searchQuery = this.value.trim();
        applyAndRender();
      });
    });

    // Category radios
    const categoryRadios = document.querySelectorAll('input[name="shop-category"]');
    categoryRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        if (this.checked) {
          currentCategory = this.value;
          applyAndRender();
        }
      });
    });

    // Sort select
    const sortSelect = document.getElementById('shopSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', function() {
        sortOption = this.value;
        applyAndRender();
      });
    }

    // Deals check
    const dealsCheck = document.getElementById('filterDealsCheck');
    if (dealsCheck) {
      dealsCheck.addEventListener('change', function() {
        onlyDeals = this.checked;
        applyAndRender();
      });
    }

    // In-stock check
    const inStockCheck = document.getElementById('filterInStockCheck');
    if (inStockCheck) {
      inStockCheck.addEventListener('change', function() {
        inStockOnly = this.checked;
        applyAndRender();
      });
    }

    // Price range slider
    const priceSlider = document.getElementById('filterPriceRange');
    const priceDisplay = document.getElementById('filterPriceDisplay');
    if (priceSlider) {
      priceSlider.addEventListener('input', function() {
        maxPriceNaira = parseInt(this.value, 10);
        if (priceDisplay) priceDisplay.textContent = formatKobo(maxPriceNaira * 100);
      });
      priceSlider.addEventListener('change', function() {
        maxPriceNaira = parseInt(this.value, 10);
        applyAndRender();
      });
    }

    // Reset filters button in empty state
    const emptyResetBtn = document.getElementById('emptyStateResetBtn');
    if (emptyResetBtn) {
      emptyResetBtn.addEventListener('click', resetAllFilters);
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('shopProductsGrid')) {
      syncFiltersFromUrl();
      initShopControls();
      applyAndRender();
    }
  });

})();
