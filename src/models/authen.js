import api from '../inc/api';

export default {
    async login(username, password) {
        return await api.call('authen', 'POST', {
            username, password
        });
    },

    async get() {
        return await api.call('authen');
    },

    async logout() {
        return await api.call('authen', 'DELETE');
    }
};



// WEBPACK FOOTER //
// ./src/models/authen.js