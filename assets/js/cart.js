/**
 * INFLUQO - Shopping Cart Module
 * Recalculates all prices from products catalogue (tamper-proof).
 * Supports variants, quantity increments/decrements, removal, and coupons.
 */

(function() {
  'use strict';

  function calculateCartTotals() {
    const rawCart = InfluqoStorage.getCart();
    let subtotalKobo = 0;
    const validatedItems = [];

    rawCart.forEach(item => {
      const product = getProductById(item.productId);
      if (product) {
        const qty = Math.max(1, Math.min(item.quantity, product.stock));
        const lineTotalKobo = product.priceKobo * qty;
        subtotalKobo += lineTotalKobo;

        validatedItems.push({
          productId: product.id,
          name: product.name,
          categoryName: product.categoryName,
          image: product.image,
          unitPriceKobo: product.priceKobo,
          stock: product.stock,
          variantId: item.variantId || 'default',
          variantName: item.variantName || '',
          quantity: qty,
          lineTotalKobo: lineTotalKobo
        });
      }
    });

    const coupon = InfluqoStorage.getCoupon();
    let discountKobo = 0;
    if (coupon && coupon.code === 'INFLUQO10' && subtotalKobo > 0) {
      discountKobo = Math.round(subtotalKobo * (coupon.discountPercent / 100));
    }

    return {
      items: validatedItems,
      subtotalKobo,
      discountKobo,
      coupon,
      estimatedTotalKobo: Math.max(0, subtotalKobo - discountKobo)
    };
  }

  function renderCart() {
    const tableBody = document.getElementById('cartTableBody');
    const emptyState = document.getElementById('cartEmptyState');
    const mainSection = document.getElementById('cartMainContent');
    const subtotalEl = document.getElementById('cartSubtotalAmount');
    const discountRow = document.getElementById('cartDiscountRow');
    const discountEl = document.getElementById('cartDiscountAmount');
    const totalEl = document.getElementById('cartEstimatedTotal');
    const appliedCouponNotice = document.getElementById('appliedCouponNotice');
    const couponInput = document.getElementById('couponCodeInput');

    if (!mainSection) return;

    const data = calculateCartTotals();

    if (data.items.length === 0) {
      mainSection.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    mainSection.style.display = 'grid';

    // Render Cart Items
    if (tableBody) {
      tableBody.innerHTML = data.items.map(item => `
        <tr class="cart-item-row" data-product-id="${item.productId}" data-variant-id="${item.variantId}">
          <td class="cart-col-product">
            <div class="cart-product-cell">
              <a href="product.html?id=${encodeURIComponent(item.productId)}" class="cart-item-img-link">
                <img src="${item.image}" alt="${InfluqoShared.escapeHtml(item.name)}" class="cart-item-thumb">
              </a>
              <div class="cart-item-meta">
                <h4 class="cart-item-name">
                  <a href="product.html?id=${encodeURIComponent(item.productId)}">${InfluqoShared.escapeHtml(item.name)}</a>
                </h4>
                ${item.variantName ? `<span class="cart-item-variant">Variant: ${InfluqoShared.escapeHtml(item.variantName)}</span>` : ''}
                <span class="cart-item-unit-price">${formatKobo(item.unitPriceKobo)}</span>
              </div>
            </div>
          </td>
          <td class="cart-col-qty">
            <div class="quantity-control-wrap">
              <button type="button" class="qty-btn btn-cart-qty-minus" aria-label="Decrease quantity for ${InfluqoShared.escapeHtml(item.name)}" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
              <input type="number" class="qty-input cart-qty-input" value="${item.quantity}" min="1" max="${item.stock}" aria-label="Quantity">
              <button type="button" class="qty-btn btn-cart-qty-plus" aria-label="Increase quantity for ${InfluqoShared.escapeHtml(item.name)}" ${item.quantity >= item.stock ? 'disabled' : ''}>+</button>
            </div>
          </td>
          <td class="cart-col-total">
            <span class="cart-line-total">${formatKobo(item.lineTotalKobo)}</span>
          </td>
          <td class="cart-col-remove">
            <button type="button" class="btn-remove-cart-item" aria-label="Remove ${InfluqoShared.escapeHtml(item.name)} from cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </td>
        </tr>
      `).join('');

      // Wire Row Actions
      tableBody.querySelectorAll('.cart-item-row').forEach(row => {
        const pId = row.getAttribute('data-product-id');
        const vId = row.getAttribute('data-variant-id');
        const minusBtn = row.querySelector('.btn-cart-qty-minus');
        const plusBtn = row.querySelector('.btn-cart-qty-plus');
        const qtyInp = row.querySelector('.cart-qty-input');
        const removeBtn = row.querySelector('.btn-remove-cart-item');

        if (minusBtn) {
          minusBtn.addEventListener('click', () => {
            const current = parseInt(qtyInp.value, 10) || 1;
            InfluqoStorage.updateCartQuantity(pId, vId, current - 1);
            renderCart();
          });
        }
        if (plusBtn) {
          plusBtn.addEventListener('click', () => {
            const current = parseInt(qtyInp.value, 10) || 1;
            InfluqoStorage.updateCartQuantity(pId, vId, current + 1);
            renderCart();
          });
        }
        if (qtyInp) {
          qtyInp.addEventListener('change', () => {
            const current = parseInt(qtyInp.value, 10) || 1;
            InfluqoStorage.updateCartQuantity(pId, vId, current);
            renderCart();
          });
        }
        if (removeBtn) {
          removeBtn.addEventListener('click', () => {
            InfluqoStorage.removeFromCart(pId, vId);
            InfluqoShared.showToast("Item removed from cart", "info");
            renderCart();
          });
        }
      });
    }

    // Update Summary Figures
    if (subtotalEl) subtotalEl.textContent = formatKobo(data.subtotalKobo);
    if (totalEl) totalEl.textContent = formatKobo(data.estimatedTotalKobo);

    // Discount Display
    if (data.discountKobo > 0 && data.coupon) {
      if (discountRow) discountRow.style.display = 'flex';
      if (discountEl) discountEl.textContent = `-${formatKobo(data.discountKobo)}`;
      if (appliedCouponNotice) {
        appliedCouponNotice.style.display = 'flex';
        appliedCouponNotice.innerHTML = `
          <span>Coupon <strong>${InfluqoShared.escapeHtml(data.coupon.code)}</strong> applied (-10%)</span>
          <button type="button" class="btn-remove-coupon" id="btnRemoveCoupon" aria-label="Remove coupon">Remove</button>
        `;
        const remBtn = document.getElementById('btnRemoveCoupon');
        if (remBtn) {
          remBtn.addEventListener('click', () => {
            InfluqoStorage.clearCoupon();
            InfluqoShared.showToast("Coupon removed", "info");
            renderCart();
          });
        }
      }
    } else {
      if (discountRow) discountRow.style.display = 'none';
      if (appliedCouponNotice) appliedCouponNotice.style.display = 'none';
    }
  }

  function initCouponForm() {
    const form = document.getElementById('cartCouponForm');
    const input = document.getElementById('couponCodeInput');
    const feedback = document.getElementById('couponFeedbackMessage');

    if (!form || !input) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const code = input.value.trim().toUpperCase();

      if (!code) {
        showCouponFeedback("Please enter a coupon code.", "error");
        return;
      }

      const activeCoupon = InfluqoStorage.getCoupon();
      if (activeCoupon && activeCoupon.code === code) {
        showCouponFeedback(`Coupon ${code} is already applied.`, "info");
        return;
      }

      if (code === "INFLUQO10") {
        InfluqoStorage.saveCoupon({
          code: "INFLUQO10",
          discountPercent: 10,
          description: "10% off merchandise subtotal"
        });
        showCouponFeedback("Success! 10% discount applied to your order.", "success");
        input.value = '';
        renderCart();
      } else {
        showCouponFeedback(`Invalid code "${code}". Try "INFLUQO10" for 10% off.`, "error");
      }
    });

    function showCouponFeedback(msg, type) {
      if (feedback) {
        feedback.textContent = msg;
        feedback.className = `coupon-feedback ${type}`;
        feedback.style.display = 'block';
      }
      InfluqoShared.showToast(msg, type);
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('cartMainContent')) {
      renderCart();
      initCouponForm();
      window.addEventListener('influqo:cart-updated', renderCart);
    }
  });

  if (typeof window !== 'undefined') {
    window.calculateCartTotals = calculateCartTotals;
  }
  if (typeof globalThis !== 'undefined') {
    globalThis.calculateCartTotals = calculateCartTotals;
  }

})();
