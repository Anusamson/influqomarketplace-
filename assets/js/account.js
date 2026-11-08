/**
 * INFLUQO - Simulated Account & Auth Module
 * Manages demo login, profile display, order history, and demo logout.
 * All data strictly ephemeral in sessionStorage.
 */

(function() {
  'use strict';

  const DEFAULT_DEMO_USER = {
    name: "Chioma Adebayo",
    email: "demo@influqo.com",
    phone: "0803 123 4567",
    city: "Lagos",
    isDemo: true
  };

  function initLoginPage() {
    const form = document.getElementById('demoLoginForm');
    const quickLoginBtn = document.getElementById('btnQuickDemoLogin');

    function performDemoLogin(userObj) {
      InfluqoStorage.saveDemoUser(userObj || DEFAULT_DEMO_USER);
      InfluqoShared.showToast("Signed in as Demo Customer", "success");
      setTimeout(() => {
        window.location.href = 'account.html';
      }, 400);
    }

    if (quickLoginBtn) {
      quickLoginBtn.addEventListener('click', function() {
        performDemoLogin(DEFAULT_DEMO_USER);
      });
    }

    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = document.getElementById('loginEmail');
        const enteredEmail = emailInput ? emailInput.value.trim() : '';

        performDemoLogin({
          name: DEFAULT_DEMO_USER.name,
          email: enteredEmail || DEFAULT_DEMO_USER.email,
          phone: DEFAULT_DEMO_USER.phone,
          city: DEFAULT_DEMO_USER.city,
          isDemo: true
        });
      });
    }
  }

  function initAccountPage() {
    const signedInView = document.getElementById('accountSignedInView');
    const signedOutView = document.getElementById('accountSignedOutView');

    if (!signedInView || !signedOutView) return;

    const user = InfluqoStorage.getDemoUser();

    if (!user) {
      signedInView.style.display = 'none';
      signedOutView.style.display = 'block';
      return;
    }

    signedInView.style.display = 'block';
    signedOutView.style.display = 'none';

    // Populate profile fields
    const nameEl = document.getElementById('accountProfileName');
    const emailEl = document.getElementById('accountProfileEmail');
    const phoneEl = document.getElementById('accountProfilePhone');

    if (nameEl) nameEl.textContent = user.name;
    if (emailEl) emailEl.textContent = user.email;
    if (phoneEl) phoneEl.textContent = user.phone;

    // Render Orders from sessionStorage
    const ordersContainer = document.getElementById('accountOrdersList');
    const emptyOrdersNotice = document.getElementById('accountEmptyOrdersNotice');
    const orders = InfluqoStorage.getDemoOrders();

    if (ordersContainer) {
      if (orders.length === 0) {
        if (emptyOrdersNotice) emptyOrdersNotice.style.display = 'block';
        ordersContainer.innerHTML = '';
      } else {
        if (emptyOrdersNotice) emptyOrdersNotice.style.display = 'none';
        ordersContainer.innerHTML = orders.map(order => {
          const dateStr = new Date(order.date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          });

          return `
            <div class="account-order-card">
              <div class="account-order-header">
                <div>
                  <span class="order-id-label">${InfluqoShared.escapeHtml(order.orderId)}</span>
                  <span class="order-date-label">Placed on ${dateStr}</span>
                </div>
                <span class="order-status-pill status-completed">Demo Payment Completed</span>
              </div>
              <div class="account-order-items">
                ${order.items.map(i => `
                  <div class="account-order-item-row">
                    <span>${InfluqoShared.escapeHtml(i.name)} ${i.variantName ? `(${InfluqoShared.escapeHtml(i.variantName)})` : ''} &times; ${i.quantity}</span>
                    <span>${formatKobo(i.lineTotalKobo)}</span>
                  </div>
                `).join('')}
              </div>
              <div class="account-order-footer">
                <span class="order-ref-note">Ref: ${InfluqoShared.escapeHtml(order.payment ? order.payment.reference : 'N/A')}</span>
                <span class="order-total-amount">Total: <strong>${formatKobo(order.totalKobo)}</strong></span>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // Sign out button
    const logoutBtn = document.getElementById('btnAccountLogout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function() {
        InfluqoStorage.clearDemoUser();
        InfluqoShared.showToast("Signed out of demo session", "info");
        initAccountPage();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('demoLoginForm')) {
      initLoginPage();
    }
    if (document.getElementById('accountSignedInView')) {
      initAccountPage();
    }
  });

})();
