/**
 * INFLUQO - Checkout Management Module
 * Handles guest checkout, sample details autofill, state-based delivery fees,
 * accessible form validation, and payment adapter dispatch.
 */

(function() {
  'use strict';

  // 36 Nigerian States + Federal Capital Territory
  const NIGERIAN_STATES = [
    "Lagos",
    "FCT Abuja",
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara"
  ];

  let selectedState = "Lagos";
  let currentDeliveryKobo = INFLUQO_CONFIG.deliveryFees.lagos;

  function getDeliveryKoboForState(state) {
    if (!state) return INFLUQO_CONFIG.deliveryFees.lagos;
    const lower = state.toLowerCase();
    if (lower === 'lagos') {
      return INFLUQO_CONFIG.deliveryFees.lagos;
    } else if (lower.includes('abuja') || lower.includes('fct')) {
      return INFLUQO_CONFIG.deliveryFees.abuja;
    } else {
      return INFLUQO_CONFIG.deliveryFees.other;
    }
  }

  function renderStateSelect() {
    const select = document.getElementById('checkoutStateSelect');
    if (!select) return;

    select.innerHTML = `
      <option value="">Select your delivery state</option>
      ${NIGERIAN_STATES.map(st => `
        <option value="${st}" ${st === selectedState ? 'selected' : ''}>${st}</option>
      `).join('')}
    `;

    select.addEventListener('change', function() {
      selectedState = this.value;
      currentDeliveryKobo = getDeliveryKoboForState(selectedState);
      updateOrderSummary();
    });
  }

  function updateOrderSummary() {
    const cartTotals = window.calculateCartTotals ? window.calculateCartTotals() : null;
    if (!cartTotals || cartTotals.items.length === 0) {
      showEmptyCartState();
      return;
    }

    const itemsList = document.getElementById('checkoutOrderItemsList');
    const subtotalEl = document.getElementById('checkoutSubtotal');
    const discountRow = document.getElementById('checkoutDiscountRow');
    const discountEl = document.getElementById('checkoutDiscount');
    const deliveryFeeEl = document.getElementById('checkoutDeliveryFee');
    const totalEl = document.getElementById('checkoutTotal');

    // Render items list
    if (itemsList) {
      itemsList.innerHTML = cartTotals.items.map(item => `
        <div class="checkout-item-row">
          <div class="checkout-item-details">
            <span class="checkout-item-name">${InfluqoShared.escapeHtml(item.name)}</span>
            <span class="checkout-item-sub">
              ${item.variantName ? `${InfluqoShared.escapeHtml(item.variantName)} • ` : ''}Qty: ${item.quantity}
            </span>
          </div>
          <span class="checkout-item-price">${formatKobo(item.lineTotalKobo)}</span>
        </div>
      `).join('');
    }

    if (subtotalEl) subtotalEl.textContent = formatKobo(cartTotals.subtotalKobo);

    // Discount
    if (cartTotals.discountKobo > 0 && cartTotals.coupon) {
      if (discountRow) discountRow.style.display = 'flex';
      if (discountEl) discountEl.textContent = `-${formatKobo(cartTotals.discountKobo)}`;
    } else {
      if (discountRow) discountRow.style.display = 'none';
    }

    // Delivery Fee
    if (deliveryFeeEl) deliveryFeeEl.textContent = formatKobo(currentDeliveryKobo);

    // Final Total = (Subtotal - Discount) + Delivery
    const finalTotalKobo = Math.max(0, cartTotals.subtotalKobo - cartTotals.discountKobo) + currentDeliveryKobo;
    if (totalEl) totalEl.textContent = formatKobo(finalTotalKobo);
  }

  function showEmptyCartState() {
    const mainWrap = document.getElementById('checkoutMainContainer');
    const emptyWrap = document.getElementById('checkoutEmptyCartNotice');
    if (mainWrap) mainWrap.style.display = 'none';
    if (emptyWrap) emptyWrap.style.display = 'block';
  }

  function initSampleAutofill() {
    const autofillBtn = document.getElementById('btnAutofillSampleDetails');
    if (!autofillBtn) return;

    autofillBtn.addEventListener('click', function() {
      const nameInput = document.getElementById('checkoutName');
      const emailInput = document.getElementById('checkoutEmail');
      const phoneInput = document.getElementById('checkoutPhone');
      const addressInput = document.getElementById('checkoutAddress');
      const stateSelect = document.getElementById('checkoutStateSelect');
      const cityInput = document.getElementById('checkoutCity');
      const noteInput = document.getElementById('checkoutNote');

      if (nameInput) nameInput.value = "Chioma Adebayo";
      if (emailInput) emailInput.value = "chioma.adebayo@example.com";
      if (phoneInput) phoneInput.value = "0803 123 4567";
      if (addressInput) addressInput.value = "14 Admiralty Way, Lekki Phase 1";
      if (cityInput) cityInput.value = "Lekki, Lagos";
      if (noteInput) noteInput.value = "Please call customer on arrival at security gate.";

      if (stateSelect) {
        stateSelect.value = "Lagos";
        selectedState = "Lagos";
        currentDeliveryKobo = getDeliveryKoboForState("Lagos");
      }

      // Clear any validation warnings
      document.querySelectorAll('.field-error-msg').forEach(el => el.textContent = '');
      document.querySelectorAll('.form-control').forEach(el => el.removeAttribute('aria-invalid'));

      updateOrderSummary();
      InfluqoShared.showToast("Sample fictional details filled!", "info");
    });
  }

  function validateCheckoutForm() {
    let isValid = true;

    function checkField(id, errorId, errorMsg) {
      const el = document.getElementById(id);
      const err = document.getElementById(errorId);
      if (!el) return true;

      const val = el.value.trim();
      if (!val) {
        if (err) err.textContent = errorMsg;
        el.setAttribute('aria-invalid', 'true');
        return false;
      } else {
        if (err) err.textContent = '';
        el.removeAttribute('aria-invalid');
        return true;
      }
    }

    if (!checkField('checkoutName', 'errCheckoutName', 'Please provide a recipient name.')) isValid = false;
    if (!checkField('checkoutEmail', 'errCheckoutEmail', 'Please provide a valid demo email address.')) isValid = false;
    if (!checkField('checkoutPhone', 'errCheckoutPhone', 'Please provide a contact phone number.')) isValid = false;
    if (!checkField('checkoutAddress', 'errCheckoutAddress', 'Please provide a delivery street address.')) isValid = false;
    if (!checkField('checkoutStateSelect', 'errCheckoutState', 'Please select a delivery state.')) isValid = false;
    if (!checkField('checkoutCity', 'errCheckoutCity', 'Please enter your town or city.')) isValid = false;

    return isValid;
  }

  function initCheckoutForm() {
    const form = document.getElementById('checkoutForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Check cart
      const cartTotals = window.calculateCartTotals ? window.calculateCartTotals() : null;
      if (!cartTotals || cartTotals.items.length === 0) {
        InfluqoShared.showToast("Your cart is empty. Please add products before checking out.", "error");
        return;
      }

      if (!validateCheckoutForm()) {
        InfluqoShared.showToast("Please complete the required shipping fields.", "error");
        // Focus first invalid element
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const customer = {
        name: document.getElementById('checkoutName').value.trim(),
        email: document.getElementById('checkoutEmail').value.trim(),
        phone: document.getElementById('checkoutPhone').value.trim(),
        address: document.getElementById('checkoutAddress').value.trim(),
        state: document.getElementById('checkoutStateSelect').value.trim(),
        city: document.getElementById('checkoutCity').value.trim(),
        note: (document.getElementById('checkoutNote') ? document.getElementById('checkoutNote').value.trim() : '')
      };

      const finalTotalKobo = Math.max(0, cartTotals.subtotalKobo - cartTotals.discountKobo) + currentDeliveryKobo;

      const orderPayload = {
        customer: customer,
        items: cartTotals.items,
        subtotalKobo: cartTotals.subtotalKobo,
        discountKobo: cartTotals.discountKobo,
        deliveryKobo: currentDeliveryKobo,
        totalKobo: finalTotalKobo,
        coupon: cartTotals.coupon
      };

      // Launch payment adapter
      InfluqoPayments.initiatePayment(orderPayload);
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('checkoutForm')) {
      renderStateSelect();
      updateOrderSummary();
      initSampleAutofill();
      initCheckoutForm();
    }
  });

})();
