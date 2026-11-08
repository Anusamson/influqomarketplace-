# INFLUQO — Client Ecommerce Demo Prototype

A presentation-ready ecommerce prototype for **Influqo**, demonstrating the customer journey for importing quality consumer lifestyle goods from China for Nigerian customers.

Built with **HTML5, CSS3, and vanilla JavaScript**. No build steps, external frameworks, backend servers, or databases are required. Designed specifically for direct deployment on **GitHub Pages**.

---

## 1. Prototype Scope & Demo Purpose

This site is a **presentation prototype** designed to demonstrate the complete retail shopping workflow:
`Browse Catalogue` → `Product Details & Variants` → `Cart & Coupons` → `Checkout & State Shipping` → `Demo Payment Simulator` → `Order Confirmation`.

### Why this is a Client Demo:
- **No Real Purchases:** No actual credit card or bank funds are processed.
- **No Sensitive Data:** No real passwords, bank credentials, cards, or private customer records are gathered or stored.
- **Ephemeral State:** All cart and wishlist preferences are maintained locally in browser `localStorage`. Fictional demo login sessions and test orders are kept in `sessionStorage`.
- **Presentation Architecture:** GitHub Pages provides static hosting for prototype evaluation. The eventual production commercial store will require dedicated infrastructure, server-side inventory control, and PCI-compliant backend payment verification.

---

## 2. Key Features

- **Split Hero & Branded Typography:** Inspired by modern ecommerce visual hierarchy with deep navy background (`#172678`), warm gold accents (`#F6CD82`), and clean product showcases.
- **24 Curated Sample Products:** Spanning 6 core import categories:
  - *Gadgets & Accessories*
  - *Home & Kitchen*
  - *Fashion & Bags*
  - *Beauty & Personal Care*
  - *Lighting & Power*
  - *Lifestyle & Travel*
- **Integer Kobo Currency Math:** Tamper-proof money calculations calculated internally in integer kobo and formatted in Nigerian Naira (`₦`) via `Intl.NumberFormat('en-NG')`.
- **Dynamic Shop Filtering & Search:** Real-time search, category filters, price range slider, deal badges, and sorting with URL query parameter synchronization (`shop.html?category=gadgets&deal=true`).
- **Product Details & Variants:** Main images with thumbnail galleries, color/size variant selection, demo stock limiting, "Buy Now" direct flow, and product-specific WhatsApp inquiry links.
- **Robust Shopping Cart:** Variant item merging, quantity controls, auto-subtotals, and promo coupon support (`INFLUQO10` gives 10% off merchandise).
- **Nigerian State Delivery Calculations:** Selectable 36 states + FCT Abuja with clear demo delivery tiers:
  - Lagos: ₦3,500
  - FCT Abuja: ₦4,000
  - Other Nigerian States: ₦5,500
- **One-Click Sample Autofill:** "Fill sample details" button populates fictional Nigerian customer details (Chioma Adebayo, Lekki Phase 1, Lagos) to test checkout instantly.
- **Dual Payment Adapter:**
  - **Local Zero-Credential Simulator (Default):** Models approval, decline, and cancellation with zero accounts or API keys required.
  - **Optional Paystack Test Mode:** Official InlineJS v2 integration supporting public test keys (`pk_test_...`).
- **Simulated Customer Account & Session History:** Demonstrates signed-in profiles, active order history, and instant demo logout.
- **Light & Dark Mode:** Smooth CSS custom property transitions, initial system preference detection, and persistent theme toggle.
- **Floating WhatsApp Customer Care:** Floating quick-action button with a polished pre-launch notice modal.

---

## 3. Running Locally

Because the project uses standard relative paths and vanilla ES modules, you can serve it with any local HTTP server:

### Option A: Using Python (3.x)
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000/`

### Option B: Using Node.js (npx serve / http-server)
```bash
npx serve .
# or
npx http-server -p 8080
```
Then visit: `http://localhost:3000/` or `http://localhost:8080/`

### Option C: VS Code Live Server
Open the workspace folder in VS Code and click **"Go Live"** from the status bar.

---

## 4. Configuration Guide (`assets/js/config.js`)

All storewide settings are centralized in `assets/js/config.js`:

```javascript
const INFLUQO_CONFIG = {
  storeName: "Influqo",
  tagline: "Everyday finds. Exceptional style.",

  // 1. WhatsApp Configuration
  // Client's official WhatsApp number is not yet supplied.
  // When empty (""), clicking WhatsApp triggers a polished modal:
  // "WhatsApp contact will be connected before launch."
  // To connect, supply the international format number without '+' (e.g. "2348012345678"):
  whatsappNumber: "",

  // 2. Payment Adapter Selection
  // Options: 'simulator' (default local simulator) or 'paystack-test'
  paymentMode: "simulator",

  // 3. Paystack Test Public Key
  // MUST start with 'pk_test_'. NEVER place secret keys (sk_*) in frontend code!
  paystackTestPublicKey: "",

  // 4. Standard Demo Delivery Fees in kobo
  deliveryFees: {
    lagos: 350000,    // ₦3,500
    abuja: 400000,    // ₦4,000
    other: 550000     // ₦5,500
  },

  // 5. Active Demo Coupons
  coupons: {
    "INFLUQO10": {
      code: "INFLUQO10",
      type: "percent",
      discountPercent: 10,
      description: "10% discount on merchandise subtotal"
    }
  }
};
```

---

## 5. Editing Products & Visual Assets

- **Product Catalogue:** Defined in `assets/js/products.js`. Each entry includes `id`, `name`, `category`, `priceKobo`, `originalPriceKobo`, `specs`, `variants`, and stock quantities.
- **Brand Logos:** Stored in `assets/images/branding/`. Both original and trimmed versions are provided:
  - Light background surfaces: `influqo-logo-dark-trimmed.png`
  - Dark background surfaces & Dark mode: `influqo-logo-light-trimmed.png`
- **Product Photography:** See `IMAGE-SOURCES.md` for a complete inventory of vector SVG illustrations and instructions on swapping them with studio photography before commercial deployment.

---

## 6. GitHub Pages Deployment

The repository is structured with relative paths (e.g. `assets/css/styles.css`, `index.html`) to run cleanly under any repository subdirectory URL:
`https://<USERNAME>.github.io/<REPOSITORY>/`

### Deployment Steps:
1. Initialize a git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Influqo client demo prototype"
   ```
2. Push to your GitHub repository:
   ```bash
   git remote add origin https://github.com/<USERNAME>/<REPOSITORY>.git
   git branch -M main
   git push -u origin main
   ```
3. In your GitHub repository:
   - Navigate to **Settings** → **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select branch: `main`, folder: `/ (root)`.
   - Click **Save**.
4. GitHub Pages will build and publish your prototype at `https://<USERNAME>.github.io/<REPOSITORY>/`.
5. The included `.nojekyll` file ensures GitHub Pages serves all assets directly without Jekyll processing.

---

## 7. Production Roadmap (Beyond Client Demo)

To transition this presentation prototype into a full commercial enterprise store, the following production backend infrastructure will be required:

1. **Backend Server & Database:** PostgreSQL/MySQL or MongoDB to securely store customer accounts, hashed credentials (Argon2/bcrypt), and inventory levels.
2. **Server-Side Pricing & Cart Validation:** Never trust pricing calculations originating from the client browser. Totals and inventory locks must be calculated on an authenticated backend API.
3. **Verified Server Payment Webhooks:** Genuine Paystack payment verification requires calling Paystack's verification API (`https://api.paystack.co/transaction/verify/:ref`) server-side using your private secret key (`sk_live_...`), and listening to webhook events before releasing orders.
4. **Logistics & Warehousing Integration:** Direct API integration with local courier APIs (e.g. Terminal Africa, GIGL, Kwik) to fetch real-time dispatch waybills, live tracking codes, and automated dispatch requests.
5. **Production Hosting:** Migration from GitHub Pages to scalable cloud infrastructure (e.g. AWS, GCP, Vercel, or custom VPS with SSL certificates and CDN caching).
