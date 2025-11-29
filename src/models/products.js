import api from '../inc/api';

export default {
    async getAll() {
        return await api.call('products');
    },

    async getById(id) {
        return await api.call('products/'+ id);
    }
};



// WEBPACK FOOTER //
// ./src/models/products.js