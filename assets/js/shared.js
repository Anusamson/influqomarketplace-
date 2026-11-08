/**
 * INFLUQO - Shared Layout & UI Module
 * Handles themes, header badges, search, mobile drawer, WhatsApp button, and toasts.
 */

(function() {
  'use strict';

  // 1. Initial Theme Application (fast check)
  function initTheme() {
    const savedTheme = InfluqoStorage.getTheme();
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    applyTheme(initialTheme);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    InfluqoStorage.saveTheme(theme);
    updateThemeToggleUI(theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  }

  function updateThemeToggleUI(theme) {
    const buttons = document.querySelectorAll('.theme-toggle-btn');
    buttons.forEach(btn => {
      const isDark = theme === 'dark';
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      // SVG Icon swap
      btn.innerHTML = isDark
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    });
  }

  // 2. Header Badges Update
  function updateBadges() {
    const cartUnits = InfluqoStorage.getCartTotalUnits();
    const wishlistItems = InfluqoStorage.getWishlist().length;

    const cartBadges = document.querySelectorAll('.cart-count-badge');
    cartBadges.forEach(b => {
      b.textContent = String(cartUnits);
      b.style.display = cartUnits > 0 ? 'inline-flex' : 'none';
      b.setAttribute('aria-label', `${cartUnits} items in cart`);
    });

    const wishlistBadges = document.querySelectorAll('.wishlist-count-badge');
    wishlistBadges.forEach(b => {
      b.textContent = String(wishlistItems);
      b.style.display = wishlistItems > 0 ? 'inline-flex' : 'none';
      b.setAttribute('aria-label', `${wishlistItems} items in wishlist`);
    });
  }

  // 3. Mobile Navigation Drawer
  function initMobileNav() {
    const toggleBtn = document.getElementById('mobileMenuToggleBtn');
    const closeBtn = document.getElementById('mobileMenuCloseBtn');
    const drawer = document.getElementById('mobileNavDrawer');
    const backdrop = document.getElementById('mobileNavBackdrop');

    if (!toggleBtn || !drawer || !backdrop) return;

    function openDrawer() {
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('overflow-locked');
      if (closeBtn) closeBtn.focus();
    }

    function closeDrawer() {
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('overflow-locked');
      toggleBtn.focus();
    }

    toggleBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);

    // Escape key closes drawer
    window.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });
  }

  // 4. Header Search Form
  function initHeaderSearch() {
    const forms = document.querySelectorAll('.header-search-form');
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = form.querySelector('input[type="search"], input[type="text"]');
        const q = input ? input.value.trim() : '';
        // Redirect to shop.html with query param
        window.location.href = `shop.html?search=${encodeURIComponent(q)}`;
      });
    });
  }

  // 5. WhatsApp Floating Button & Modal
  function initWhatsApp() {
    const triggers = document.querySelectorAll('.whatsapp-trigger-btn');
    const modal = document.getElementById('whatsappModal');
    const modalBackdrop = document.getElementById('whatsappModalBackdrop');
    const closeBtn = document.getElementById('whatsappModalCloseBtn');

    function openNoticeModal(messageOverride) {
      if (modal && modalBackdrop) {
        if (messageOverride) {
          const textEl = modal.querySelector('.whatsapp-modal-text');
          if (textEl) textEl.textContent = messageOverride;
        }
        modal.classList.add('is-open');
        modalBackdrop.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('overflow-locked');
        if (closeBtn) closeBtn.focus();
      } else {
        alert("WhatsApp contact will be connected before launch.");
      }
    }

    function closeNoticeModal() {
      if (modal && modalBackdrop) {
        modal.classList.remove('is-open');
        modalBackdrop.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('overflow-locked');
      }
    }

    if (closeBtn) closeBtn.addEventListener('click', closeNoticeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeNoticeModal);

    window.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
        closeNoticeModal();
      }
    });

    triggers.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const customMsg = btn.getAttribute('data-whatsapp-msg');
        const num = (INFLUQO_CONFIG.whatsappNumber || '').trim();

        if (!num) {
          openNoticeModal("WhatsApp contact will be connected before launch.");
          return;
        }

        let cleanNum = num.replace(/[^0-9]/g, '');
        // Normalize Nigerian local format (e.g., 080... -> 23480...)
        if (cleanNum.startsWith('0') && cleanNum.length === 11) {
          cleanNum = '234' + cleanNum.slice(1);
        }

        const text = encodeURIComponent(customMsg || INFLUQO_CONFIG.whatsappDefaultMessage);
        const url = `https://wa.me/${cleanNum}?text=${text}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      });
    });

    window.openInfluqoWhatsAppModal = openNoticeModal;
  }

  // 6. Toast Notification Manager
  function showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'true');
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'status');

    const iconSvg = type === 'success'
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`
      : type === 'error'
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;

    toast.innerHTML = `
      <span class="toast-icon">${iconSvg}</span>
      <span class="toast-message"></span>
      <button type="button" class="toast-close" aria-label="Dismiss notification">&times;</button>
    `;

    // Safe text insertion prevents XSS
    toast.querySelector('.toast-message').textContent = message;

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      toast.classList.add('toast-hiding');
      setTimeout(() => toast.remove(), 250);
    });

    container.appendChild(toast);

    // Auto dismiss after 3.8s
    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add('toast-hiding');
        setTimeout(() => toast.remove(), 250);
      }
    }, 3800);
  }

  // Safe string escape helper
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Expose global helpers
  window.InfluqoShared = {
    showToast,
    escapeHtml,
    updateBadges,
    toggleTheme
  };
  if (typeof globalThis !== 'undefined') {
    globalThis.InfluqoShared = window.InfluqoShared;
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    updateBadges();
    initMobileNav();
    initHeaderSearch();
    initWhatsApp();

    // Listen to storage events across tabs or internal custom events
    window.addEventListener('influqo:cart-updated', updateBadges);
    window.addEventListener('influqo:wishlist-updated', updateBadges);
    window.addEventListener('storage', updateBadges);

    // Theme toggle button clicks
    const themeButtons = document.querySelectorAll('.theme-toggle-btn');
    themeButtons.forEach(btn => btn.addEventListener('click', toggleTheme));
  });

})();
