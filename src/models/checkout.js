import api from '../inc/api';

export default {
    async useTransfer(name) {
        return await api.call('checkout/transfer', 'POST', {
            name
        });
    }
};



// WEBPACK FOOTER //
// ./src/models/checkout.js