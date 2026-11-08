/**
 * INFLUQO - Storage Abstraction Layer
 * Safe wrapper for localStorage and sessionStorage with memory fallback.
 * Strictly enforces privacy: no passwords, no credit cards, no real customer data.
 */

const InfluqoStorage = (function() {
  // In-memory fallback if storage is disabled (e.g. strict private browsing or disabled cookies)
  const memoryStore = {
    local: {},
    session: {}
  };

  function isStorageAvailable(type) {
    try {
      const storage = window[type];
      const testKey = '__influqo_storage_test__';
      storage.setItem(testKey, testKey);
      storage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  const hasLocalStorage = isStorageAvailable('localStorage');
  const hasSessionStorage = isStorageAvailable('sessionStorage');

  function getItem(type, key) {
    try {
      if (type === 'local' && hasLocalStorage) {
        return window.localStorage.getItem(key);
      } else if (type === 'session' && hasSessionStorage) {
        return window.sessionStorage.getItem(key);
      }
    } catch (e) {
      console.warn('Storage read failed, using memory fallback:', e);
    }
    return memoryStore[type][key] !== undefined ? memoryStore[type][key] : null;
  }

  function setItem(type, key, value) {
    try {
      if (type === 'local' && hasLocalStorage) {
        window.localStorage.setItem(key, value);
        return;
      } else if (type === 'session' && hasSessionStorage) {
        window.sessionStorage.setItem(key, value);
        return;
      }
    } catch (e) {
      console.warn('Storage write failed, saving to memory fallback:', e);
    }
    memoryStore[type][key] = String(value);
  }

  function removeItem(type, key) {
    try {
      if (type === 'local' && hasLocalStorage) {
        window.localStorage.removeItem(key);
        return;
      } else if (type === 'session' && hasSessionStorage) {
        window.sessionStorage.removeItem(key);
        return;
      }
    } catch (e) {
      console.warn('Storage remove failed:', e);
    }
    delete memoryStore[type][key];
  }

  function safeJsonParse(jsonString, fallback) {
    if (!jsonString) return fallback;
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      console.error('Corrupted storage data detected, reverting to fallback:', e);
      return fallback;
    }
  }

  // Storage Keys
  const KEYS = {
    CART: 'influqo_cart_v1',
    WISHLIST: 'influqo_wishlist_v1',
    THEME: 'influqo_theme_v1',
    COUPON: 'influqo_coupon_v1',
    DEMO_USER: 'influqo_demo_user_v1',
    DEMO_ORDERS: 'influqo_demo_orders_v1'
  };

  return {
    // 1. Cart Management (localStorage)
    // Structure: [{ productId, variantId, variantName, quantity }]
    getCart: function() {
      const raw = getItem('local', KEYS.CART);
      const items = safeJsonParse(raw, []);
      if (!Array.isArray(items)) return [];
      // Clean and sanitize item structures
      return items.filter(item => item && typeof item.productId === 'string' && item.quantity > 0);
    },

    saveCart: function(items) {
      if (!Array.isArray(items)) items = [];
      const clean = items.map(item => ({
        productId: String(item.productId),
        variantId: item.variantId ? String(item.variantId) : 'default',
        variantName: item.variantName ? String(item.variantName) : '',
        quantity: Math.max(1, parseInt(item.quantity, 10) || 1)
      }));
      setItem('local', KEYS.CART, JSON.stringify(clean));
      // Dispatch custom event for UI updates
      window.dispatchEvent(new CustomEvent('influqo:cart-updated', { detail: { count: this.getCartTotalUnits() } }));
    },

    addToCart: function(productId, variantId, variantName, quantity = 1) {
      const product = getProductById(productId);
      if (!product) return { success: false, message: "Product not found" };

      const cart = this.getCart();
      const targetVariantId = variantId || (product.variants && product.variants[0] ? product.variants[0].id : 'default');
      const targetVariantName = variantName || (product.variants && product.variants[0] ? product.variants[0].name : '');

      const existingIndex = cart.findIndex(i => i.productId === productId && i.variantId === targetVariantId);
      const addedQty = Math.max(1, parseInt(quantity, 10) || 1);

      if (existingIndex > -1) {
        const newQty = cart[existingIndex].quantity + addedQty;
        if (newQty > product.stock) {
          cart[existingIndex].quantity = product.stock;
          this.saveCart(cart);
          return { success: true, clamped: true, maxStock: product.stock, message: `Updated to maximum available stock (${product.stock})` };
        }
        cart[existingIndex].quantity = newQty;
      } else {
        const safeQty = Math.min(addedQty, product.stock);
        cart.push({
          productId: productId,
          variantId: targetVariantId,
          variantName: targetVariantName,
          quantity: safeQty
        });
      }

      this.saveCart(cart);
      return { success: true, message: `Added to cart` };
    },

    updateCartQuantity: function(productId, variantId, newQuantity) {
      const cart = this.getCart();
      const product = getProductById(productId);
      const stockLimit = product ? product.stock : 99;

      const idx = cart.findIndex(i => i.productId === productId && i.variantId === variantId);
      if (idx === -1) return;

      const qty = parseInt(newQuantity, 10);
      if (qty <= 0) {
        cart.splice(idx, 1);
      } else {
        cart[idx].quantity = Math.min(qty, stockLimit);
      }
      this.saveCart(cart);
    },

    removeFromCart: function(productId, variantId) {
      const cart = this.getCart();
      const updated = cart.filter(i => !(i.productId === productId && i.variantId === variantId));
      this.saveCart(updated);
    },

    clearCart: function() {
      this.saveCart([]);
      this.clearCoupon();
    },

    getCartTotalUnits: function() {
      const cart = this.getCart();
      return cart.reduce((sum, item) => sum + (parseInt(item.quantity, 10) || 0), 0);
    },

    // 2. Wishlist Management (localStorage)
    getWishlist: function() {
      const raw = getItem('local', KEYS.WISHLIST);
      const list = safeJsonParse(raw, []);
      return Array.isArray(list) ? list : [];
    },

    saveWishlist: function(list) {
      if (!Array.isArray(list)) list = [];
      setItem('local', KEYS.WISHLIST, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('influqo:wishlist-updated', { detail: { count: list.length } }));
    },

    toggleWishlist: function(productId) {
      let list = this.getWishlist();
      const exists = list.includes(productId);
      if (exists) {
        list = list.filter(id => id !== productId);
      } else {
        list.push(productId);
      }
      this.saveWishlist(list);
      return !exists; // returns true if now in wishlist, false if removed
    },

    isInWishlist: function(productId) {
      return this.getWishlist().includes(productId);
    },

    // 3. Theme Preferences (localStorage)
    getTheme: function() {
      const theme = getItem('local', KEYS.THEME);
      return theme === 'dark' || theme === 'light' ? theme : null;
    },

    saveTheme: function(theme) {
      if (theme === 'dark' || theme === 'light') {
        setItem('local', KEYS.THEME, theme);
      }
    },

    // 4. Active Coupon (localStorage)
    getCoupon: function() {
      const raw = getItem('local', KEYS.COUPON);
      return safeJsonParse(raw, null);
    },

    saveCoupon: function(couponData) {
      setItem('local', KEYS.COUPON, JSON.stringify(couponData));
    },

    clearCoupon: function() {
      removeItem('local', KEYS.COUPON);
    },

    // 5. Demo Customer Profile (sessionStorage only - strictly temporary demo session)
    getDemoUser: function() {
      const raw = getItem('session', KEYS.DEMO_USER);
      return safeJsonParse(raw, null);
    },

    saveDemoUser: function(userData) {
      // Store fictional profile only
      setItem('session', KEYS.DEMO_USER, JSON.stringify(userData));
      window.dispatchEvent(new CustomEvent('influqo:auth-updated', { detail: { user: userData } }));
    },

    clearDemoUser: function() {
      removeItem('session', KEYS.DEMO_USER);
      window.dispatchEvent(new CustomEvent('influqo:auth-updated', { detail: { user: null } }));
    },

    // 6. Demo Orders History (sessionStorage only)
    getDemoOrders: function() {
      const raw = getItem('session', KEYS.DEMO_ORDERS);
      const orders = safeJsonParse(raw, []);
      return Array.isArray(orders) ? orders : [];
    },

    saveDemoOrder: function(order) {
      const orders = this.getDemoOrders();
      orders.unshift(order); // newest order first
      setItem('session', KEYS.DEMO_ORDERS, JSON.stringify(orders));
      return order;
    },

    getDemoOrderById: function(orderId) {
      const orders = this.getDemoOrders();
      return orders.find(o => o.orderId === orderId) || null;
    }
  };
})();

if (typeof window !== 'undefined') {
  window.InfluqoStorage = InfluqoStorage;
}
if (typeof globalThis !== 'undefined') {
  globalThis.InfluqoStorage = InfluqoStorage;
}
