import api from '../inc/api';

export default {
    async getPrivacyPolicy() {
        return await api.call('pages/policy', 'GET');
    }
};



// WEBPACK FOOTER //
// ./src/models/pages.js