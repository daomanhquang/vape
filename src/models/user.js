import api from '../inc/api';

export default {
    async create(username, email, password) {
        return await api.call('users', 'POST', {
            username, email, password
        });
    },

    async verify(userId, verifyCode) {
        return await api.call('users/verify', 'POST', {
            user_id: userId,
            verify_code: verifyCode
        });
    },

    async update(password, phone, address) {
        return await api.call('users', 'PUT', {
            password, phone, address
        });
    }
};



// WEBPACK FOOTER //
// ./src/models/user.js