// Gestión de Favoritos / Wishlist de SELENIVO

const FAVORITES_STORAGE_KEY = 'selenivo_favorites_v1';

const Favorites = {
    getItems() {
        try {
            const data = localStorage.getItem(FAVORITES_STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error leyendo favoritos de localStorage', e);
            return [];
        }
    },

    saveItems(items) {
        try {
            localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(items));
            this.notify();
        } catch (e) {
            console.error('Error guardando favoritos en localStorage', e);
        }
    },

    toggle(productId) {
        let items = this.getItems();
        const index = items.indexOf(productId);
        let added = false;

        if (index > -1) {
            items.splice(index, 1);
            added = false;
        } else {
            items.push(productId);
            added = true;
        }

        this.saveItems(items);
        return added;
    },

    has(productId) {
        return this.getItems().includes(productId);
    },

    getDetailedItems() {
        const ids = this.getItems();
        return ids.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
    },

    notify() {
        window.dispatchEvent(new CustomEvent('favorites:updated', {
            detail: {
                count: this.getItems().length,
                items: this.getDetailedItems()
            }
        }));
    }
};
