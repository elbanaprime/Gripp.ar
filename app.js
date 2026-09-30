// ==========================================================================
// GRIP — Aplicación Principal, Control de Vistas, UI y Flujo de Compra
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // Estado de la Aplicación
    // ----------------------------------------------------------------------
    const state = {
        currentView: 'home', // 'home' | 'product'
        activeProduct: null,
        selectedSize: null, // Obligatorio seleccionar antes de agregar al carrito
        selectedQty: 1,
        activeFilter: 'all'
    };

    // ----------------------------------------------------------------------
    // Referencias al DOM
    // ----------------------------------------------------------------------
    // Vistas
    const homeView = document.getElementById('homeView');
    const productView = document.getElementById('productView');
    const productsGrid = document.getElementById('productsGrid');
    const catalogCount = document.getElementById('catalogProductCount');

    // Header & Badges
    const cartCountBadge = document.getElementById('cartCountBadge');
    const btnOpenCart = document.getElementById('btnOpenCart');
    const btnMobileToggle = document.getElementById('btnMobileToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const btnCloseMobileDrawer = document.getElementById('btnCloseMobileDrawer');

    // Cart Drawer
    const cartDrawer = document.getElementById('cartDrawer');
    const cartBackdrop = document.getElementById('cartBackdrop');
    const btnCloseCartDrawer = document.getElementById('btnCloseCartDrawer');
    const drawerCartCount = document.getElementById('drawerCartCount');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartEmptyState = document.getElementById('cartEmptyState');
    const cartDrawerFooter = document.getElementById('cartDrawerFooter');
    const btnEmptyCartViewProducts = document.getElementById('btnEmptyCartViewProducts');

    // Envío y Totales en Cart
    const freeShippingTracker = document.getElementById('freeShippingTracker');
    const shippingTrackerMsg = document.getElementById('shippingTrackerMsg');
    const shippingTrackerBar = document.getElementById('shippingTrackerBar');
    const cartDrawerSubtotal = document.getElementById('cartDrawerSubtotal');
    const cartDrawerShippingStatus = document.getElementById('cartDrawerShippingStatus');
    const cartDrawerTotal = document.getElementById('cartDrawerTotal');
    const btnWhatsAppCheckout = document.getElementById('btnWhatsAppCheckout');

    // Página Individual de Producto
    const btnBackToCatalog = document.getElementById('btnBackToCatalog');
    const productBreadcrumbTitle = document.getElementById('productBreadcrumbTitle');
    const detailMainImg = document.getElementById('detailMainImg');
    const detailBadge = document.getElementById('detailBadge');
    const detailThumbnailsRow = document.getElementById('detailThumbnailsRow');
    const detailTitle = document.getElementById('detailTitle');
    const detailPrice = document.getElementById('detailPrice');
    const detailOriginalPrice = document.getElementById('detailOriginalPrice');
    const selectedSizeText = document.getElementById('selectedSizeText');
    const detailSizesGrid = document.getElementById('detailSizesGrid');
    const sizeWarningMsg = document.getElementById('sizeWarningMsg');
    const btnQtyMinus = document.getElementById('btnQtyMinus');
    const btnQtyPlus = document.getElementById('btnQtyPlus');
    const detailQtyValue = document.getElementById('detailQtyValue');
    const btnAddToCart = document.getElementById('btnAddToCart');
    const detailDescriptionText = document.getElementById('detailDescriptionText');
    const detailSpecsList = document.getElementById('detailSpecsList');

    // Modal Guía de Talles
    const sizeGuideModal = document.getElementById('sizeGuideModal');
    const btnNavSizeGuide = document.getElementById('btnNavSizeGuide');
    const btnMobileSizeGuide = document.getElementById('btnMobileSizeGuide');
    const btnOpenSizeGuideInline = document.getElementById('btnOpenSizeGuideInline');
    const btnCloseSizeGuideModal = document.getElementById('btnCloseSizeGuideModal');

    // Toast Container
    const toastContainer = document.getElementById('toastContainer');

    // ----------------------------------------------------------------------
    // Sistema de Notificaciones Toast
    // ----------------------------------------------------------------------
    function showToast(message, isError = false) {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = `toast ${isError ? 'toast-error' : ''}`;
        
        const iconSvg = isError ? `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
        ` : `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
        `;

        toast.innerHTML = `
            ${iconSvg}
            <span>${message}</span>
        `;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('toast-removing');
            setTimeout(() => toast.remove(), 250);
        }, 3200);
    }

    // ----------------------------------------------------------------------
    // Renderizado del Catálogo de Productos
    // ----------------------------------------------------------------------
    function renderCatalog() {
        if (!productsGrid) return;

        let filtered = PRODUCTS;
        if (state.activeFilter !== 'all') {
            filtered = PRODUCTS.filter(p => {
                const searchKey = state.activeFilter.toLowerCase();
                return p.id.includes(searchKey) || 
                       p.name.toLowerCase().includes(searchKey) ||
                       (p.badge && p.badge.toLowerCase().includes(searchKey));
            });
        }

        catalogCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'Producto' : 'Productos'}`;

        if (filtered.length === 0) {
            productsGrid.innerHTML = `
                <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; color: var(--text-muted);">
                    <p style="font-size: 1.1rem; margin-bottom: 12px;">No se encontraron remeras en esta categoría.</p>
                    <button class="btn btn-secondary btn-sm" onclick="window.GRIP_APP.setFilter('all')">VER TODOS LOS PRODUCTOS</button>
                </div>
            `;
            return;
        }

        productsGrid.innerHTML = filtered.map(product => {
            const badgeHTML = product.badge 
                ? `<span class="card-badge">${product.badge}</span>` 
                : '';
            
            const origPriceHTML = product.originalPrice > product.price 
                ? `<span class="card-original-price">${formatARS(product.originalPrice)}</span>` 
                : '';

            return `
                <article class="product-card" onclick="window.GRIP_APP.openProduct('${product.id}')" data-id="${product.id}">
                    <div class="card-image-box">
                        ${badgeHTML}
                        <img src="${product.images[0]}" alt="${product.name}" class="card-img" loading="lazy">
                    </div>
                    <div class="card-info">
                        <div>
                            <h3 class="card-title">${product.name}</h3>
                            <div class="card-price-row">
                                <span class="card-price">${formatARS(product.price)}</span>
                                ${origPriceHTML}
                            </div>
                        </div>
                        <button type="button" class="card-cta-btn" onclick="event.stopPropagation(); window.GRIP_APP.openProduct('${product.id}')">
                            VER PRODUCTO
                        </button>
                    </div>
                </article>
            `;
        }).join('');
    }

    // ----------------------------------------------------------------------
    // Navegación: Vista de Catálogo / Inicio
    // ----------------------------------------------------------------------
    function showHomeView(scrollToCatalog = false) {
        state.currentView = 'home';
        homeView.classList.add('active');
        productView.classList.remove('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Actualizar links activos
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
            const nav = link.dataset.nav;
            link.classList.toggle('active', nav === 'home' || (scrollToCatalog && nav === 'catalog'));
        });

        if (scrollToCatalog) {
            const catElem = document.getElementById('catalogo');
            if (catElem) {
                setTimeout(() => {
                    catElem.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }

    // ----------------------------------------------------------------------
    // Navegación: Vista Individual de Producto (Car Gallery Style)
    // ----------------------------------------------------------------------
    function showProductView(productId) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) {
            showHomeView();
            return;
        }

        state.currentView = 'product';
        state.activeProduct = product;
        state.selectedSize = null; // Siempre solicitar selección de talle
        state.selectedQty = 1;

        // Ocultar home y mostrar vista de producto
        homeView.classList.remove('active');
        productView.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Actualizar URL hash de forma limpia
        if (window.location.hash !== `#producto/${product.id}`) {
            history.pushState(null, '', `#producto/${product.id}`);
        }

        // Breadcrumb
        productBreadcrumbTitle.textContent = product.name;

        // Galería: Imagen principal
        detailMainImg.src = product.images[0];
        detailMainImg.alt = product.name;

        // Badge
        if (product.badge) {
            detailBadge.textContent = product.badge;
            detailBadge.style.display = 'block';
        } else {
            detailBadge.style.display = 'none';
        }

        // Miniaturas de la galería
        detailThumbnailsRow.innerHTML = product.images.map((imgSrc, idx) => `
            <button type="button" class="gallery-thumb-btn ${idx === 0 ? 'active' : ''}" 
                    onclick="window.GRIP_APP.changeMainImage('${imgSrc}', this)">
                <img src="${imgSrc}" alt="${product.name} ángulo ${idx + 1}" loading="lazy">
            </button>
        `).join('');

        // Título y Precios (centralizados desde products.js)
        detailTitle.textContent = product.name;
        detailPrice.textContent = formatARS(product.price);
        if (product.originalPrice > product.price) {
            detailOriginalPrice.textContent = formatARS(product.originalPrice);
            detailOriginalPrice.style.display = 'inline';
        } else {
            detailOriginalPrice.style.display = 'none';
        }

        // Selector de Talle (Reset a no seleccionado para forzar selección)
        selectedSizeText.textContent = 'Seleccioná un talle';
        selectedSizeText.style.color = 'var(--text-secondary)';
        sizeWarningMsg.style.display = 'none';

        // Botones de Talles (S, M, L, XL)
        const sizeButtons = detailSizesGrid.querySelectorAll('.size-btn');
        sizeButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.onclick = () => {
                const size = btn.dataset.size;
                selectSize(size, btn);
            };
        });

        // Selector de Cantidad (Reset a 1)
        detailQtyValue.textContent = '1';

        // Descripción y Especificaciones
        detailDescriptionText.textContent = product.description;
        detailSpecsList.innerHTML = product.details.map(item => `<li>${item}</li>`).join('');
    }

    // ----------------------------------------------------------------------
    // Selección de Talle
    // ----------------------------------------------------------------------
    function selectSize(size, btnElement) {
        state.selectedSize = size;
        selectedSizeText.textContent = size;
        selectedSizeText.style.color = '#ffffff';
        sizeWarningMsg.style.display = 'none';

        detailSizesGrid.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        if (btnElement) {
            btnElement.classList.add('active');
        }
    }

    // ----------------------------------------------------------------------
    // Manejo de Cantidad en la Página de Producto
    // ----------------------------------------------------------------------
    if (btnQtyMinus) {
        btnQtyMinus.addEventListener('click', () => {
            if (state.selectedQty > 1) {
                state.selectedQty--;
                detailQtyValue.textContent = state.selectedQty;
            }
        });
    }

    if (btnQtyPlus) {
        btnQtyPlus.addEventListener('click', () => {
            state.selectedQty++;
            detailQtyValue.textContent = state.selectedQty;
        });
    }

    // ----------------------------------------------------------------------
    // Acción: Agregar al Carrito desde la Página de Producto
    // ----------------------------------------------------------------------
    if (btnAddToCart) {
        btnAddToCart.addEventListener('click', () => {
            if (!state.activeProduct) return;

            // VALIDACIÓN ESTRICTA DE TALLE
            if (!state.selectedSize) {
                sizeWarningMsg.style.display = 'block';
                showToast('Por favor seleccioná un talle (S, M, L, XL) antes de agregar al carrito', true);
                const block = document.getElementById('sizeSelectorBlock');
                if (block) {
                    block.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            const result = Cart.addItem(state.activeProduct.id, state.selectedSize, state.selectedQty);
            if (result.success) {
                showToast(`¡Agregado al carrito: ${state.activeProduct.name} (Talle: ${state.selectedSize})!`);
                openCartDrawer();
            } else {
                showToast(result.error || 'Error al agregar al carrito', true);
            }
        });
    }

    // ----------------------------------------------------------------------
    // Carrito: Actualización de Interfaz Reactiva
    // ----------------------------------------------------------------------
    function updateCartUI(totals) {
        // Contador en Header
        if (cartCountBadge) {
            cartCountBadge.textContent = totals.totalItems;
            cartCountBadge.style.display = totals.totalItems > 0 ? 'flex' : 'none';
        }

        // Contador en Drawer
        if (drawerCartCount) {
            drawerCartCount.textContent = `(${totals.totalItems})`;
        }

        // Estado Vacío vs Con Productos
        if (totals.totalItems === 0) {
            if (cartEmptyState) cartEmptyState.style.display = 'flex';
            if (cartItemsList) cartItemsList.innerHTML = '';
            if (cartDrawerFooter) cartDrawerFooter.style.display = 'none';
            if (freeShippingTracker) freeShippingTracker.style.display = 'none';
            return;
        }

        if (cartEmptyState) cartEmptyState.style.display = 'none';
        if (cartDrawerFooter) cartDrawerFooter.style.display = 'flex';
        if (freeShippingTracker) freeShippingTracker.style.display = 'block';

        // Barra de Envío Gratis
        if (shippingTrackerBar && shippingTrackerMsg) {
            shippingTrackerBar.style.width = `${totals.freeShippingPercent}%`;

            if (totals.isFreeShipping) {
                shippingTrackerMsg.className = 'tracker-message free-achieved';
                shippingTrackerMsg.innerHTML = '¡TENÉS ENVÍO GRATIS A TODO EL PAÍS!';
            } else {
                shippingTrackerMsg.className = 'tracker-message';
                shippingTrackerMsg.innerHTML = `Te faltan <strong>${formatARS(totals.freeShippingDiff)}</strong> para <strong>ENVÍO GRATIS</strong>`;
            }
        }

        // Lista de Ítems en el Carrito
        if (cartItemsList) {
            cartItemsList.innerHTML = totals.items.map(item => `
                <div class="cart-item-card" data-cart-id="${item.cartItemId}">
                    <div class="cart-item-thumb">
                        <img src="${item.product.images[0]}" alt="${item.product.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-name">${item.product.name}</h4>
                        <div class="cart-item-meta">Talle: <strong>${item.size}</strong></div>
                        <div class="cart-item-unit-price">Unitario: ${formatARS(item.unitPrice)}</div>
                        <div class="cart-item-stepper-row">
                            <div class="cart-mini-stepper">
                                <button type="button" class="mini-stepper-btn" onclick="Cart.updateQuantity('${item.cartItemId}', -1)" aria-label="Menos">−</button>
                                <span class="mini-stepper-qty">${item.quantity}</span>
                                <button type="button" class="mini-stepper-btn" onclick="Cart.updateQuantity('${item.cartItemId}', 1)" aria-label="Más">+</button>
                            </div>
                            <span class="cart-item-subtotal">${formatARS(item.lineTotal)}</span>
                        </div>
                    </div>
                    <button type="button" class="cart-item-remove-btn" title="Eliminar del carrito" onclick="Cart.removeItem('${item.cartItemId}')">
                        &times;
                    </button>
                </div>
            `).join('');
        }

        // Totales en Drawer
        if (cartDrawerSubtotal) {
            cartDrawerSubtotal.textContent = formatARS(totals.subtotal);
        }

        if (cartDrawerShippingStatus) {
            cartDrawerShippingStatus.textContent = totals.shippingStatus;
            cartDrawerShippingStatus.className = `shipping-status-tag ${totals.isFreeShipping ? 'is-free' : ''}`;
        }

        if (cartDrawerTotal) {
            cartDrawerTotal.textContent = formatARS(totals.total);
        }

        // Configurar Botón Final de WhatsApp
        if (btnWhatsAppCheckout) {
            const waUrl = Cart.getWhatsAppUrl();
            if (waUrl) {
                btnWhatsAppCheckout.href = waUrl;
                btnWhatsAppCheckout.style.display = 'flex';
            } else {
                btnWhatsAppCheckout.style.display = 'none';
            }
        }
    }

    // ----------------------------------------------------------------------
    // Manejo de Drawers y Modales
    // ----------------------------------------------------------------------
    function openCartDrawer() {
        closeMobileDrawer();
        if (cartDrawer && cartBackdrop) {
            cartDrawer.classList.add('active');
            cartBackdrop.classList.add('active');
            document.body.classList.add('drawer-open');
        }
    }

    function closeCartDrawer() {
        if (cartDrawer && cartBackdrop) {
            cartDrawer.classList.remove('active');
            cartBackdrop.classList.remove('active');
            document.body.classList.remove('drawer-open');
        }
    }

    function openMobileDrawer() {
        closeCartDrawer();
        if (mobileDrawer && cartBackdrop) {
            mobileDrawer.classList.add('active');
            cartBackdrop.classList.add('active');
            document.body.classList.add('drawer-open');
        }
    }

    function closeMobileDrawer() {
        if (mobileDrawer && cartBackdrop) {
            mobileDrawer.classList.remove('active');
            cartBackdrop.classList.remove('active');
            document.body.classList.remove('drawer-open');
        }
    }

    function closeAllOverlays() {
        closeCartDrawer();
        closeMobileDrawer();
        if (sizeGuideModal) sizeGuideModal.classList.remove('active');
    }

    // ----------------------------------------------------------------------
    // Listeners de Eventos
    // ----------------------------------------------------------------------
    if (btnOpenCart) btnOpenCart.addEventListener('click', openCartDrawer);
    if (btnCloseCartDrawer) btnCloseCartDrawer.addEventListener('click', closeCartDrawer);
    if (cartBackdrop) cartBackdrop.addEventListener('click', closeAllOverlays);

    if (btnMobileToggle) btnMobileToggle.addEventListener('click', openMobileDrawer);
    if (btnCloseMobileDrawer) btnCloseMobileDrawer.addEventListener('click', closeMobileDrawer);

    if (btnEmptyCartViewProducts) {
        btnEmptyCartViewProducts.addEventListener('click', () => {
            closeCartDrawer();
            showHomeView(true);
        });
    }

    if (btnBackToCatalog) {
        btnBackToCatalog.addEventListener('click', (e) => {
            e.preventDefault();
            history.pushState(null, '', '#catalogo');
            showHomeView(true);
        });
    }

    // Logo click
    const logoHome = document.getElementById('logoHome');
    if (logoHome) {
        logoHome.addEventListener('click', (e) => {
            e.preventDefault();
            history.pushState(null, '', '#inicio');
            showHomeView();
        });
    }

    // Botones Hero
    const heroBtnCatalog = document.getElementById('heroBtnCatalog');
    if (heroBtnCatalog) {
        heroBtnCatalog.addEventListener('click', (e) => {
            e.preventDefault();
            showHomeView(true);
        });
    }

    // Enlaces de Navegación del Header y Menú Móvil
    document.querySelectorAll('[data-nav]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            closeMobileDrawer();
            const target = link.dataset.nav;
            if (target === 'home') {
                history.pushState(null, '', '#inicio');
                showHomeView();
            } else if (target === 'catalog') {
                history.pushState(null, '', '#catalogo');
                showHomeView(true);
            }
        });
    });

    // Enlaces con Filtros Directos (Porsche, BMW, Colapinto, etc.)
    document.querySelectorAll('[data-filter]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            closeMobileDrawer();
            const filterTag = link.dataset.filter;
            window.GRIP_APP.setFilter(filterTag);
            showHomeView(true);
        });
    });

    // Filtros de Pills en Catálogo
    document.querySelectorAll('.filter-pill').forEach(btn => {
        btn.addEventListener('click', () => {
            const filterTag = btn.dataset.filterTag;
            window.GRIP_APP.setFilter(filterTag);
        });
    });

    // Acordeones de la Página de Producto
    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const item = trigger.closest('.accordion-item');
            const isActive = item.classList.contains('active');
            item.classList.toggle('active', !isActive);
            const icon = trigger.querySelector('.accordion-icon');
            if (icon) {
                icon.textContent = isActive ? '+' : '−';
            }
        });
    });

    // Modal Guía de Talles
    function openSizeGuide() {
        if (sizeGuideModal) sizeGuideModal.classList.add('active');
    }
    function closeSizeGuide() {
        if (sizeGuideModal) sizeGuideModal.classList.remove('active');
    }
    if (btnNavSizeGuide) btnNavSizeGuide.addEventListener('click', (e) => { e.preventDefault(); openSizeGuide(); });
    if (btnMobileSizeGuide) btnMobileSizeGuide.addEventListener('click', (e) => { e.preventDefault(); closeMobileDrawer(); openSizeGuide(); });
    if (btnOpenSizeGuideInline) btnOpenSizeGuideInline.addEventListener('click', openSizeGuide);
    if (btnCloseSizeGuideModal) btnCloseSizeGuideModal.addEventListener('click', closeSizeGuide);

    // Tecla Escape para cerrar modales
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllOverlays();
        }
    });

    // Sincronización continua de carrito
    window.addEventListener('cart:updated', (e) => {
        updateCartUI(e.detail);
    });

    // Manejo de Rutas Hash (Permite refrescar en una página de producto o compartir link)
    function handleRouting() {
        const hash = window.location.hash;
        if (hash.startsWith('#producto/')) {
            const productId = hash.replace('#producto/', '').trim();
            showProductView(productId);
        } else if (hash === '#catalogo') {
            showHomeView(true);
        } else {
            showHomeView();
        }
    }

    window.addEventListener('hashchange', handleRouting);

    // ----------------------------------------------------------------------
    // API Global GRIP_APP
    // ----------------------------------------------------------------------
    window.GRIP_APP = {
        openProduct(productId) {
            showProductView(productId);
        },

        changeMainImage(imgSrc, thumbElem) {
            if (detailMainImg) {
                detailMainImg.src = imgSrc;
            }
            document.querySelectorAll('.gallery-thumb-btn').forEach(btn => btn.classList.remove('active'));
            if (thumbElem) {
                thumbElem.classList.add('active');
            }
        },

        setFilter(filterTag) {
            state.activeFilter = filterTag;
            document.querySelectorAll('.filter-pill').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.filterTag === filterTag);
            });
            renderCatalog();
        },

        openCart() {
            openCartDrawer();
        },

        closeCart() {
            closeCartDrawer();
        }
    };

    // ----------------------------------------------------------------------
    // Inicialización al Cargar
    // ----------------------------------------------------------------------
    renderCatalog();
    updateCartUI(Cart.getTotals());
    handleRouting();
});