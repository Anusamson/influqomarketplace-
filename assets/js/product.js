/**
 * INFLUQO - Product Details Page Module
 * Handles product resolution, image gallery, variants, quantity bounding,
 * Add to Cart, Buy Now, Wishlist, WhatsApp product enquiry, and related products.
 */

(function() {
  'use strict';

  let currentProduct = null;
  let selectedVariant = null;
  let selectedQuantity = 1;

  function initProductPage() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    const detailContainer = document.getElementById('productDetailContainer');
    const notFoundContainer = document.getElementById('productNotFoundContainer');

    if (!productId || !detailContainer) {
      showNotFound();
      return;
    }

    currentProduct = getProductById(productId);
    if (!currentProduct) {
      showNotFound();
      return;
    }

    // Hide Not Found, Show Detail
    if (notFoundContainer) notFoundContainer.style.display = 'none';
    detailContainer.style.display = 'block';

    // Set initial variant
    selectedVariant = (currentProduct.variants && currentProduct.variants.length > 0)
      ? currentProduct.variants[0]
      : { id: 'default', name: 'Standard' };

    selectedQuantity = 1;

    renderProductDetails();
    renderRelatedProducts();
  }

  function showNotFound() {
    const detailContainer = document.getElementById('productDetailContainer');
    const notFoundContainer = document.getElementById('productNotFoundContainer');
    if (detailContainer) detailContainer.style.display = 'none';
    if (notFoundContainer) notFoundContainer.style.display = 'block';
    document.title = "Product Not Found | Influqo";
  }

  function renderProductDetails() {
    const p = currentProduct;
    document.title = `${p.name} | Influqo`;

    // 1. Breadcrumbs
    const breadcrumbCategory = document.getElementById('breadcrumbCategory');
    const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');
    if (breadcrumbCategory) {
      breadcrumbCategory.textContent = p.categoryName;
      breadcrumbCategory.href = `shop.html?category=${encodeURIComponent(p.category)}`;
    }
    if (breadcrumbCurrent) {
      breadcrumbCurrent.textContent = p.name;
    }

    // 2. Images & Gallery
    const mainImg = document.getElementById('productMainImage');
    const galleryThumbs = document.getElementById('productGalleryThumbs');

    if (mainImg) {
      mainImg.src = p.image;
      mainImg.alt = p.alt || p.name;
    }

    if (galleryThumbs) {
      const images = (p.gallery && p.gallery.length > 0) ? p.gallery : [p.image];
      if (images.length > 1) {
        galleryThumbs.style.display = 'flex';
        galleryThumbs.innerHTML = images.map((imgSrc, idx) => `
          <button type="button" class="gallery-thumb-btn ${idx === 0 ? 'is-active' : ''}" data-img-src="${imgSrc}" aria-label="View product image ${idx + 1}">
            <img src="${imgSrc}" alt="" loading="lazy">
          </button>
        `).join('');

        galleryThumbs.querySelectorAll('.gallery-thumb-btn').forEach(btn => {
          btn.addEventListener('click', function() {
            galleryThumbs.querySelectorAll('.gallery-thumb-btn').forEach(b => b.classList.remove('is-active'));
            this.classList.add('is-active');
            const targetSrc = this.getAttribute('data-img-src');
            if (mainImg) mainImg.src = targetSrc;
          });
        });
      } else {
        galleryThumbs.style.display = 'none';
      }
    }

    // 3. Title & Badge
    const titleEl = document.getElementById('productTitle');
    const badgeEl = document.getElementById('productBadgeSlot');
    if (titleEl) titleEl.textContent = p.name;

    if (badgeEl) {
      if (p.isDeal) {
        badgeEl.innerHTML = `<span class="product-badge badge-deal">Limited Deal</span>`;
      } else if (p.isNewArrival) {
        badgeEl.innerHTML = `<span class="product-badge badge-new">New Arrival</span>`;
      } else {
        badgeEl.innerHTML = '';
      }
    }

    // 4. Prices
    const priceCurrent = document.getElementById('productPriceCurrent');
    const priceOriginal = document.getElementById('productPriceOriginal');
    const priceSavings = document.getElementById('productSavingsBadge');

    if (priceCurrent) priceCurrent.textContent = formatKobo(p.priceKobo);

    if (p.originalPriceKobo && p.originalPriceKobo > p.priceKobo) {
      if (priceOriginal) {
        priceOriginal.textContent = formatKobo(p.originalPriceKobo);
        priceOriginal.style.display = 'inline';
      }
      if (priceSavings) {
        const savedKobo = p.originalPriceKobo - p.priceKobo;
        priceSavings.textContent = `Save ${formatKobo(savedKobo)}`;
        priceSavings.style.display = 'inline-block';
      }
    } else {
      if (priceOriginal) priceOriginal.style.display = 'none';
      if (priceSavings) priceSavings.style.display = 'none';
    }

    // 5. Stock Indicator
    const stockEl = document.getElementById('productStockBadge');
    if (stockEl) {
      if (p.stock > 0) {
        stockEl.className = 'stock-badge in-stock';
        stockEl.textContent = `In Stock (${p.stock} units available)`;
      } else {
        stockEl.className = 'stock-badge out-of-stock';
        stockEl.textContent = 'Out of Stock';
      }
    }

    // 6. Descriptions
    const shortDesc = document.getElementById('productShortDesc');
    const fullDesc = document.getElementById('productFullDesc');
    if (shortDesc) shortDesc.textContent = p.shortDescription;
    if (fullDesc) fullDesc.textContent = p.description;

    // 7. Specifications Table
    const specsContainer = document.getElementById('productSpecsTable');
    if (specsContainer && p.specs) {
      const entries = Object.entries(p.specs);
      if (entries.length > 0) {
        specsContainer.innerHTML = `
          <table class="specs-table">
            <tbody>
              ${entries.map(([key, val]) => `
                <tr>
                  <th scope="row">${InfluqoShared.escapeHtml(key)}</th>
                  <td>${InfluqoShared.escapeHtml(val)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      }
    }

    // 8. Variants
    const variantsSection = document.getElementById('productVariantsSection');
    const variantsList = document.getElementById('productVariantsList');
    if (variantsSection && variantsList) {
      if (p.variants && p.variants.length > 0) {
        variantsSection.style.display = 'block';
        variantsList.innerHTML = p.variants.map((v, idx) => `
          <button type="button" class="variant-pill-btn ${idx === 0 ? 'is-selected' : ''}" data-variant-id="${v.id}" data-variant-name="${InfluqoShared.escapeHtml(v.name)}" role="radio" aria-checked="${idx === 0 ? 'true' : 'false'}">
            ${InfluqoShared.escapeHtml(v.name)}
          </button>
        `).join('');

        variantsList.querySelectorAll('.variant-pill-btn').forEach(btn => {
          btn.addEventListener('click', function() {
            variantsList.querySelectorAll('.variant-pill-btn').forEach(b => {
              b.classList.remove('is-selected');
              b.setAttribute('aria-checked', 'false');
            });
            this.classList.add('is-selected');
            this.setAttribute('aria-checked', 'true');
            selectedVariant = {
              id: this.getAttribute('data-variant-id'),
              name: this.getAttribute('data-variant-name')
            };
          });
        });
      } else {
        variantsSection.style.display = 'none';
      }
    }

    // 9. Quantity Selector
    const qtyInput = document.getElementById('productQtyInput');
    const qtyMinusBtn = document.getElementById('productQtyMinusBtn');
    const qtyPlusBtn = document.getElementById('productQtyPlusBtn');

    function updateQty(newVal) {
      let val = parseInt(newVal, 10) || 1;
      val = Math.max(1, Math.min(val, p.stock || 1));
      selectedQuantity = val;
      if (qtyInput) qtyInput.value = String(val);
      if (qtyMinusBtn) qtyMinusBtn.disabled = val <= 1;
      if (qtyPlusBtn) qtyPlusBtn.disabled = val >= (p.stock || 1);
    }

    if (qtyMinusBtn) {
      qtyMinusBtn.addEventListener('click', () => updateQty(selectedQuantity - 1));
    }
    if (qtyPlusBtn) {
      qtyPlusBtn.addEventListener('click', () => updateQty(selectedQuantity + 1));
    }
    if (qtyInput) {
      qtyInput.addEventListener('change', function() {
        updateQty(this.value);
      });
    }
    updateQty(1);

    // 10. Add to Cart & Buy Now Buttons
    const addToCartBtn = document.getElementById('btnProductAddToCart');
    const buyNowBtn = document.getElementById('btnProductBuyNow');

    if (addToCartBtn) {
      if (p.stock <= 0) {
        addToCartBtn.disabled = true;
        addToCartBtn.textContent = 'Out of Stock';
      } else {
        addToCartBtn.disabled = false;
        addToCartBtn.addEventListener('click', function() {
          const res = InfluqoStorage.addToCart(
            p.id,
            selectedVariant ? selectedVariant.id : 'default',
            selectedVariant ? selectedVariant.name : '',
            selectedQuantity
          );
          if (res.success) {
            InfluqoShared.showToast(`Added ${selectedQuantity}x "${p.name}" to your cart`, 'success');
          } else {
            InfluqoShared.showToast(res.message || 'Could not add to cart', 'error');
          }
        });
      }
    }

    if (buyNowBtn) {
      if (p.stock <= 0) {
        buyNowBtn.disabled = true;
      } else {
        buyNowBtn.disabled = false;
        buyNowBtn.addEventListener('click', function() {
          InfluqoStorage.addToCart(
            p.id,
            selectedVariant ? selectedVariant.id : 'default',
            selectedVariant ? selectedVariant.name : '',
            selectedQuantity
          );
          // Redirect immediately to checkout.html
          window.location.href = 'checkout.html';
        });
      }
    }

    // 11. Wishlist Button
    const wishlistBtn = document.getElementById('btnProductWishlist');
    if (wishlistBtn) {
      const inWishlist = InfluqoStorage.isInWishlist(p.id);
      updateWishlistBtnUI(wishlistBtn, inWishlist);

      wishlistBtn.addEventListener('click', function() {
        const nowIn = InfluqoStorage.toggleWishlist(p.id);
        updateWishlistBtnUI(this, nowIn);
        if (nowIn) {
          InfluqoShared.showToast(`Saved "${p.name}" to wishlist`, 'success');
        } else {
          InfluqoShared.showToast(`Removed "${p.name}" from wishlist`, 'info');
        }
      });
    }

    // 12. Product-Specific WhatsApp Enquiry Button
    const whatsappBtn = document.getElementById('btnProductWhatsapp');
    if (whatsappBtn) {
      const currentUrl = window.location.href;
      const customMessage = `Hello Influqo, I have an inquiry about "${p.name}" (${currentUrl}). Can you tell me more about delivery and specifications?`;
      whatsappBtn.setAttribute('data-whatsapp-msg', customMessage);
    }
  }

  function updateWishlistBtnUI(btn, isIn) {
    btn.classList.toggle('is-active', isIn);
    const label = btn.querySelector('.wishlist-btn-text');
    const svg = btn.querySelector('svg');
    if (label) label.textContent = isIn ? 'Saved in Wishlist' : 'Add to Wishlist';
    if (svg) {
      svg.setAttribute('fill', isIn ? '#D32F2F' : 'none');
      svg.setAttribute('stroke', isIn ? '#D32F2F' : 'currentColor');
    }
  }

  function renderRelatedProducts() {
    const container = document.getElementById('relatedProductsGrid');
    if (!container || !currentProduct) return;

    const related = getRelatedProducts(currentProduct.id, 4);
    if (related.length === 0) {
      const wrap = document.getElementById('relatedProductsSection');
      if (wrap) wrap.style.display = 'none';
      return;
    }

    container.innerHTML = related.map(p => `
      <article class="product-card">
        <div class="product-card-image-wrap">
          <a href="product.html?id=${encodeURIComponent(p.id)}" aria-label="View ${InfluqoShared.escapeHtml(p.name)}">
            <img src="${p.image}" alt="${InfluqoShared.escapeHtml(p.alt || p.name)}" loading="lazy" class="product-card-img">
          </a>
          ${p.isDeal ? `<span class="product-badge badge-deal">Deal</span>` : ''}
        </div>
        <div class="product-card-body">
          <span class="product-card-category">${InfluqoShared.escapeHtml(p.categoryName)}</span>
          <h4 class="product-card-title">
            <a href="product.html?id=${encodeURIComponent(p.id)}">${InfluqoShared.escapeHtml(p.name)}</a>
          </h4>
          <div class="product-card-price-row">
            <span class="price-current">${formatKobo(p.priceKobo)}</span>
            ${p.originalPriceKobo ? `<span class="price-original">${formatKobo(p.originalPriceKobo)}</span>` : ''}
          </div>
        </div>
      </article>
    `).join('');
  }

  document.addEventListener('DOMContentLoaded', initProductPage);

})();
