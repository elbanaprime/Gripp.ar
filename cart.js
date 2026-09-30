// ==========================================================================
// GRIP — Carrito de Compras, Envío y Generación de Pedido por WhatsApp
// ==========================================================================

const CART_STORAGE_KEY = 'GRIP_cart_v1';

const Cart = {
    // ----------------------------------------------------------------------
    // Almacenamiento Local (Persistencia)
    // ----------------------------------------------------------------------
    getItems() {
        try {
            const data = localStorage.getItem(CART_STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error leyendo carrito de localStorage:', e);
            return [];
        }
    },

    saveItems(items) {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
            this.notify();
        } catch (e) {
            console.error('Error guardando carrito en localStorage:', e);
        }
    },

    // ----------------------------------------------------------------------
    // Agregar Producto al Carrito con Validación de Talle y Cantidad
    // ----------------------------------------------------------------------
    addItem(productId, size, quantity = 1) {
        if (!productId) return { success: false, error: 'Producto no especificado' };
        if (!size || typeof size !== 'string' || size.trim() === '') {
            return { success: false, error: 'Por favor seleccioná un talle antes de agregar al carrito.' };
        }
        if (quantity < 1) quantity = 1;

        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return { success: false, error: 'Producto no encontrado' };

        const normalizedSize = size.toUpperCase().trim();
        const items = this.getItems();

        // Buscar si ya existe la misma prenda con el mismo talle
        const existingIndex = items.findIndex(
            item => item.productId === productId && item.size === normalizedSize
        );

        if (existingIndex > -1) {
            items[existingIndex].quantity += quantity;
        } else {
            const cartItemId = `${productId}-${normalizedSize}-${Date.now()}`;
            items.push({
                cartItemId,
                productId,
                size: normalizedSize,
                quantity
            });
        }

        this.saveItems(items);
        return { success: true, product, size: normalizedSize, quantity };
    },

    // ----------------------------------------------------------------------
    // Modificar Cantidad (Delta: +1 o -1, sin permitir menores a 1)
    // ----------------------------------------------------------------------
    updateQuantity(cartItemId, delta) {
        let items = this.getItems();
        const item = items.find(i => i.cartItemId === cartItemId);
        if (!item) return;

        item.quantity += delta;
        if (item.quantity <= 0) {
            items = items.filter(i => i.cartItemId !== cartItemId);
        }
        this.saveItems(items);
    },

    // ----------------------------------------------------------------------
    // Eliminar Producto del Carrito
    // ----------------------------------------------------------------------
    removeItem(cartItemId) {
        const items = this.getItems().filter(i => i.cartItemId !== cartItemId);
        this.saveItems(items);
    },

    // ----------------------------------------------------------------------
    // Vaciar Carrito
    // ----------------------------------------------------------------------
    clear() {
        this.saveItems([]);
    },

    // ----------------------------------------------------------------------
    // Cálculo Centralizado de Subtotal, Envío y Totales
    // Reglas:
    // Subtotal >= 80.000 -> "GRATIS"
    // Subtotal < 80.000  -> "A organizar"
    // Total siempre es igual al Subtotal en pantalla
    // ----------------------------------------------------------------------
    getTotals() {
        const items = this.getItems();
        let subtotal = 0;
        let totalItems = 0;

        const detailedItems = items.map(cartItem => {
            const product = PRODUCTS.find(p => p.id === cartItem.productId);
            if (!product) return null;
            const lineTotal = product.price * cartItem.quantity;
            subtotal += lineTotal;
            totalItems += cartItem.quantity;
            return {
                ...cartItem,
                product,
                unitPrice: product.price,
                lineTotal
            };
        }).filter(Boolean);

        const threshold = STORE_CONFIG.freeShippingThreshold || 80000;
        const isFreeShipping = subtotal >= threshold;
        const shippingStatus = isFreeShipping ? 'GRATIS' : 'A organizar';
        const freeShippingDiff = Math.max(0, threshold - subtotal);
        const freeShippingPercent = Math.min(100, Math.round((subtotal / threshold) * 100));
        const total = subtotal; // Total = Subtotal (envío gratis o a coordinar por WhatsApp)

        return {
            items: detailedItems,
            totalItems,
            subtotal,
            isFreeShipping,
            shippingStatus,
            freeShippingDiff,
            freeShippingPercent,
            threshold,
            total
        };
    },

    // ----------------------------------------------------------------------
    // Generación Dinámica del Mensaje de WhatsApp
    // ----------------------------------------------------------------------
    generateWhatsAppMessage() {
        const totals = this.getTotals();
        if (totals.totalItems === 0) return '';

        const lines = [];
        lines.push(`Hola GRIP! Quiero realizar el siguiente pedido:`);
        lines.push('');
        lines.push('PRODUCTOS');

        totals.items.forEach(item => {
            lines.push(`• ${item.product.name}`);
            lines.push(`  Talle: ${item.size}`);
            lines.push(`  Cantidad: ${item.quantity}`);
            lines.push(`  Precio unitario: ${formatARS(item.unitPrice)}`);
            lines.push(`  Subtotal: ${formatARS(item.lineTotal)}`);
            lines.push('');
        });

        lines.push(`Subtotal: ${formatARS(totals.subtotal)}`);
        lines.push(`Envío: ${totals.shippingStatus}`);
        lines.push(`Total: ${formatARS(totals.total)}`);
        lines.push('');
        lines.push('Quisiera coordinar el pedido.');

        return lines.join('\n');
    },

    // ----------------------------------------------------------------------
    // Generar Enlace URL Directo de WhatsApp
    // Formato: https://wa.me/5493415998943?text=... (sin espacios ni caracteres inválidos)
    // ----------------------------------------------------------------------
    getWhatsAppUrl() {
        const phone = (STORE_CONFIG.whatsapp || '5493415998943').replace(/\D/g, '');
        const message = this.generateWhatsAppMessage();
        if (!message) return null;
        return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    },

    // ----------------------------------------------------------------------
    // Notificación de Cambio de Estado Global
    // ----------------------------------------------------------------------
    notify() {
        window.dispatchEvent(new CustomEvent('cart:updated', { detail: this.getTotals() }));
    }
};
