/**
 * INFLUQO - Payment Adapter & Simulator Module
 * Provides:
 * 1. Default local zero-credential payment simulator
 * 2. Optional Paystack test mode adapter (InlineJS v2)
 */

const InfluqoPayments = (function() {
  'use strict';

  let isProcessing = false;

  function generateDemoReference(prefix = 'INFL-TX') {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${timestamp}-${random}`;
  }

  function generateOrderId() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.floor(100 + Math.random() * 900);
    return `INFL-ORD-${timestamp}-${random}`;
  }

  /**
   * Finalizes successful order:
   * Saves order to sessionStorage, clears cart, redirects to confirmation.
   */
  function handleOrderSuccess(orderData, paymentMeta) {
    const orderId = generateOrderId();
    const finalOrder = {
      orderId: orderId,
      date: new Date().toISOString(),
      customer: orderData.customer,
      items: orderData.items,
      subtotalKobo: orderData.subtotalKobo,
      discountKobo: orderData.discountKobo,
      deliveryKobo: orderData.deliveryKobo,
      totalKobo: orderData.totalKobo,
      coupon: orderData.coupon || null,
      payment: {
        mode: paymentMeta.mode,
        reference: paymentMeta.reference,
        status: 'Demo Payment Completed',
        paidAt: new Date().toISOString(),
        channel: paymentMeta.channel || 'Local Simulator',
        verifiedOnServer: false,
        note: 'Fictional demo transaction. No real funds were charged.'
      }
    };

    // Save order in sessionStorage
    InfluqoStorage.saveDemoOrder(finalOrder);

    // Clear cart and coupons only after successful order storage
    InfluqoStorage.clearCart();

    // Redirect to order success page with orderId parameter
    window.location.href = `order-success.html?orderId=${encodeURIComponent(orderId)}`;
  }

  /**
   * 1. LOCAL PAYMENT SIMULATOR (Default Mode)
   */
  function openLocalSimulator(orderData, onCancel, onDecline) {
    let modal = document.getElementById('paymentSimulatorModal');
    let backdrop = document.getElementById('paymentSimulatorBackdrop');

    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'paymentSimulatorModal';
      modal.className = 'payment-modal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-labelledby', 'simModalTitle');

      backdrop = document.createElement('div');
      backdrop.id = 'paymentSimulatorBackdrop';
      backdrop.className = 'payment-modal-backdrop';

      document.body.appendChild(backdrop);
      document.body.appendChild(modal);
    }

    const txRef = generateDemoReference('SIM-TX');
    const formattedAmount = formatKobo(orderData.totalKobo);

    modal.innerHTML = `
      <div class="payment-modal-header">
        <div class="sim-badge">CLIENT DEMO SIMULATION</div>
        <h2 id="simModalTitle" class="payment-modal-title">Demo payment — no money will be charged</h2>
        <p class="payment-modal-subtitle">Fictional checkout environment for testing the Influqo store flow.</p>
      </div>

      <div class="payment-modal-body">
        <div class="sim-summary-box">
          <div class="sim-summary-row">
            <span>Transaction Reference:</span>
            <strong>${txRef}</strong>
          </div>
          <div class="sim-summary-row">
            <span>Customer:</span>
            <span>${InfluqoShared.escapeHtml(orderData.customer.name)}</span>
          </div>
          <div class="sim-summary-row">
            <span>Destination:</span>
            <span>${InfluqoShared.escapeHtml(orderData.customer.city)}, ${InfluqoShared.escapeHtml(orderData.customer.state)}</span>
          </div>
          <div class="sim-summary-row sim-total-row">
            <span>Total Payable:</span>
            <span class="sim-total-amount">${formattedAmount}</span>
          </div>
        </div>

        <div class="sim-security-callout">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          <div>
            <strong>Safe Demo Guarantee:</strong>
            <p>No card details, PINs, CVV codes, or banking information are required or stored. This simulator models order completion without initiating financial charges.</p>
          </div>
        </div>

        <div id="simFeedbackArea" class="sim-feedback-message" style="display:none;" role="alert"></div>

        <div class="sim-actions">
          <button type="button" class="btn btn-primary btn-block" id="btnSimulateSuccess">
            <span class="btn-text">Simulate Successful Payment (${formattedAmount})</span>
            <span class="btn-loader" style="display:none;">Processing...</span>
          </button>
          <button type="button" class="btn btn-secondary btn-block" id="btnSimulateDecline">
            Simulate Declined Payment
          </button>
          <button type="button" class="btn btn-ghost btn-block" id="btnSimulateCancel">
            Cancel & Return to Checkout
          </button>
        </div>
      </div>
    `;

    modal.classList.add('is-open');
    backdrop.classList.add('is-open');
    document.body.classList.add('overflow-locked');

    const successBtn = document.getElementById('btnSimulateSuccess');
    const declineBtn = document.getElementById('btnSimulateDecline');
    const cancelBtn = document.getElementById('btnSimulateCancel');
    const feedbackArea = document.getElementById('simFeedbackArea');

    function closeSimulator() {
      modal.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      document.body.classList.remove('overflow-locked');
      isProcessing = false;
    }

    function setButtonsDisabled(disabled) {
      successBtn.disabled = disabled;
      declineBtn.disabled = disabled;
      cancelBtn.disabled = disabled;
      const loader = successBtn.querySelector('.btn-loader');
      const text = successBtn.querySelector('.btn-text');
      if (loader && text) {
        loader.style.display = disabled ? 'inline' : 'none';
        text.style.display = disabled ? 'none' : 'inline';
      }
    }

    successBtn.addEventListener('click', function() {
      if (isProcessing) return;
      isProcessing = true;
      setButtonsDisabled(true);

      if (feedbackArea) {
        feedbackArea.style.display = 'block';
        feedbackArea.className = 'sim-feedback-message info';
        feedbackArea.textContent = 'Simulating instant bank confirmation...';
      }

      setTimeout(() => {
        closeSimulator();
        handleOrderSuccess(orderData, {
          mode: 'simulator',
          reference: txRef,
          channel: 'Local Demo Simulator'
        });
      }, 1200);
    });

    declineBtn.addEventListener('click', function() {
      if (isProcessing) return;
      isProcessing = true;
      setButtonsDisabled(true);

      if (feedbackArea) {
        feedbackArea.style.display = 'block';
        feedbackArea.className = 'sim-feedback-message error';
        feedbackArea.textContent = 'Simulation: Card declined by issuer (Insufficient demo funds). Your cart is preserved.';
      }

      setTimeout(() => {
        setButtonsDisabled(false);
        isProcessing = false;
        if (typeof onDecline === 'function') onDecline();
      }, 1500);
    });

    cancelBtn.addEventListener('click', function() {
      if (isProcessing) return;
      closeSimulator();
      InfluqoShared.showToast('Payment was cancelled. Your cart remains intact.', 'info');
      if (typeof onCancel === 'function') onCancel();
    });
  }

  /**
   * 2. PAYSTACK TEST MODE ADAPTER
   * Uses official InlineJS v2. Strictly requires a public key starting with 'pk_test_'.
   */
  function loadPaystackScript(callback) {
    if (window.PaystackPop) {
      callback(null);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v2/inline.js';
    script.async = true;
    script.onload = () => callback(null);
    script.onerror = () => callback(new Error('Failed to load Paystack Inline JS library.'));
    document.head.appendChild(script);
  }

  function startPaystackTest(orderData, onCancel, onDecline) {
    const key = (INFLUQO_CONFIG.paystackTestPublicKey || '').trim();

    // Security Check: Key MUST start with pk_test_
    if (!key || !key.startsWith('pk_test_')) {
      alert("Paystack Test Mode is not configured with a valid 'pk_test_' public key.\n\nOpening the built-in local simulator instead.");
      openLocalSimulator(orderData, onCancel, onDecline);
      return;
    }

    if (key.startsWith('pk_live_') || key.startsWith('sk_')) {
      alert("Error: Only Paystack TEST public keys ('pk_test_...') are permitted in this demo prototype.\nLive keys and secret keys are strictly blocked.");
      return;
    }

    InfluqoShared.showToast("Loading Paystack Test Gateway...", "info");

    loadPaystackScript(function(err) {
      if (err) {
        alert("Could not load Paystack InlineJS. Falling back to the local simulator.");
        openLocalSimulator(orderData, onCancel, onDecline);
        return;
      }

      const txRef = generateDemoReference('PSTK-TEST');

      try {
        const paystack = new PaystackPop();
        paystack.newTransaction({
          key: key,
          email: orderData.customer.email,
          amount: orderData.totalKobo, // Paystack expects integer kobo
          currency: 'NGN',
          ref: txRef,
          metadata: {
            custom_fields: [
              { display_name: "Customer Name", variable_name: "customer_name", value: orderData.customer.name },
              { display_name: "Delivery State", variable_name: "delivery_state", value: orderData.customer.state },
              { display_name: "Demo Order Note", variable_name: "demo_note", value: "Influqo Client Demo Order" }
            ]
          },
          onSuccess: function(transaction) {
            handleOrderSuccess(orderData, {
              mode: 'paystack-test',
              reference: transaction.reference || txRef,
              channel: 'Paystack Test Gateway'
            });
          },
          onCancel: function() {
            InfluqoShared.showToast("Paystack test transaction was cancelled.", "info");
            if (typeof onCancel === 'function') onCancel();
          },
          onError: function(error) {
            alert(`Paystack Test Error: ${error.message || 'Payment failed'}`);
            if (typeof onDecline === 'function') onDecline();
          }
        });
      } catch (e) {
        console.error("Paystack invocation error:", e);
        alert("Paystack error encountered. Offering the local simulator instead.");
        openLocalSimulator(orderData, onCancel, onDecline);
      }
    });
  }

  /**
   * Public Entrypoint
   */
  function initiatePayment(orderData, callbacks = {}) {
    if (isProcessing) return;

    const mode = INFLUQO_CONFIG.paymentMode || 'simulator';

    if (mode === 'paystack-test') {
      startPaystackTest(orderData, callbacks.onCancel, callbacks.onDecline);
    } else {
      openLocalSimulator(orderData, callbacks.onCancel, callbacks.onDecline);
    }
  }

  return {
    initiatePayment: initiatePayment,
    openLocalSimulator: openLocalSimulator
  };

})();

if (typeof window !== 'undefined') {
  window.InfluqoPayments = InfluqoPayments;
}
if (typeof globalThis !== 'undefined') {
  globalThis.InfluqoPayments = InfluqoPayments;
}
