import api from '../inc/api';

export default {
    async addToCart(productId, quantity) {
        return await api.call('cart', 'PUT', {
            product_id: productId, 
            quantity
        });
    },

    async get() {
        return await api.call('cart/items');
    },

    async update(itemId, quantity) {
        return await api.call('cart/'+ itemId, 'PUT', {
            quantity
        });
    }
};



// WEBPACK FOOTER //
// ./src/models/cart.js