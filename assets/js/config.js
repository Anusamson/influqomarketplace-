/**
 * INFLUQO - Central Configuration
 * All prices in kobo (1 NGN = 100 kobo).
 */
const INFLUQO_CONFIG = {
  storeName: "Influqo",
  legalName: "Influqo Ltd",
  tagline: "Everyday finds. Exceptional style.",
  demoNotice: "Client demo • Sample products and prices • No real purchases",

  // WhatsApp Configuration
  // Official Influqo WhatsApp Customer Support Number
  whatsappNumber: "08065741674", 
  whatsappDefaultMessage: "Hello Influqo, I would like to inquire about your products.",

  // Payment Configuration
  // 'simulator' (default) or 'paystack-test'
  paymentMode: "simulator",
  
  // Paystack Test Public Key (MUST start with 'pk_test_')
  // Never place secret keys (sk_*) in frontend code!
  paystackTestPublicKey: "",

  // Standard Demo Delivery Fees in kobo
  deliveryFees: {
    lagos: 350000,    // ₦3,500
    abuja: 400000,    // ₦4,000 (FCT Abuja)
    other: 550000     // ₦5,500 (All other 35 states)
  },

  // Active Demo Coupons
  coupons: {
    "INFLUQO10": {
      code: "INFLUQO10",
      type: "percent",
      discountPercent: 10,
      description: "10% discount on merchandise subtotal"
    }
  },

  // Currency & Locale
  currency: {
    code: "NGN",
    symbol: "₦",
    locale: "en-NG"
  },

  // 6 Core Sourcing Categories
  categories: [
    {
      id: "gadgets",
      name: "Gadgets & Accessories",
      description: "Smart audio, desktop stands & daily tech essentials",
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>`
    },
    {
      id: "home",
      name: "Home & Kitchen",
      description: "Rechargeable appliances, airtight food storage & prep tools",
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`
    },
    {
      id: "fashion",
      name: "Fashion & Bags",
      description: "Commuter backpacks, everyday slings & UV sunglasses",
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`
    },
    {
      id: "beauty",
      name: "Beauty & Personal Care",
      description: "LED vanity mirrors, rotary organizers & grooming tools",
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z"></path><circle cx="12" cy="9" r="2.5"></circle></svg>`
    },
    {
      id: "lighting",
      name: "Lighting & Power",
      description: "Multiport USB-C hubs, study lamps & rechargeable fans",
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`
    },
    {
      id: "lifestyle",
      name: "Lifestyle & Travel",
      description: "Compression packing cubes, memory foam pillows & duffels",
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`
    }
  ]
};

// Freeze config to prevent accidental runtime mutation
if (typeof Object.freeze === 'function') {
  Object.freeze(INFLUQO_CONFIG);
}

if (typeof window !== 'undefined') {
  window.INFLUQO_CONFIG = INFLUQO_CONFIG;
}
if (typeof globalThis !== 'undefined') {
  globalThis.INFLUQO_CONFIG = INFLUQO_CONFIG;
}
