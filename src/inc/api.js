import axios from 'axios';

// base prefix (can be overridden with VUE_APP_API_URL)
const prefix = (process.env.VUE_APP_API_URL || '') + '/web/api/';

// Enable mock mode by setting VUE_APP_MOCK_API=true in .env or setting window.MOCK_API = true at runtime
const MOCK = (typeof process !== 'undefined' && process.env && process.env.VUE_APP_MOCK_API === 'true') || (typeof window !== 'undefined' && window.MOCK_API === true);

// simple mock database — extend as needed
const mockDB = {
    products: [
        {
            id: 22,
            thumbnail: "https://mtptalent.com/web/wp-content/uploads/2020/12/POSTER-PREMIUM-SQUARE.jpg",
            title: "PREMIUM DIGITAL PACKAGE",
            regular_price: 870000,
            content: "<p>G\u00f3i s\u1ea3n ph\u1ea9m g\u1ed3m c\u00f3:<\/p>\n<ul>\n<li>21 h\u00ecnh n\u1ec1n ch\u1ea5t l\u01b0\u1ee3ng cao d\u00e0nh cho \u0111i\u1ec7n tho\u1ea1i v\u00e0 laptop.<\/li>\n<li>Photobook phi\u00ean b\u1ea3n k\u1ef9 thu\u1eadt s\u1ed1<\/li>\n<li>Poster phi\u00ean b\u1ea3n k\u1ef9 thu\u1eadt s\u1ed1 k\u00e8m ch\u1eef k\u00fd c\u1ee7a ngh\u1ec7 s\u0129<\/li>\n<li>Video l\u1eddi c\u00e1m \u01a1n c\u1ee7a ngh\u1ec7 s\u0129 S\u01a1n T\u00f9ng M-TP v\u00e0 H\u1ea3i T\u00fa<\/li>\n<li>File M\/V Ch\u00fang Ta C\u1ee7a Hi\u1ec7n T\u1ea1i ch\u1ea5t l\u01b0\u1ee3ng cao, \u0111\u1ed9 ph\u00e2n gi\u1ea3i 4K<\/li>\n<li>File Audio Ch\u00fang Ta C\u1ee7a Hi\u1ec7n T\u1ea1i \u0111\u1ecbnh d\u1ea1ng WAV<\/li>\n<li>File video Behind The Scenes M\/V Ch\u00fang Ta C\u1ee7a Hi\u1ec7n T\u1ea1i<\/li>\n<li>File video ch\u1ea5t l\u01b0\u1ee3ng cao M\/V Ch\u00fang Ta C\u1ee7a Hi\u1ec7n T\u1ea1i phi\u00ean b\u1ea3n Karaoke<\/li>\n<\/ul>\n",
            regular_price_fmt: "870,000.00&#8363;",
            price: 870000,
            price_fmt: "870,000.00&#8363;",
            sale_price: 435000,
            sale_price_fmt: "435,000.00&#8363;",
            is_in_stock: true,
            redirect: ""
        },
        {
            id: 18,
            thumbnail: "https://mtptalent.com/web/wp-content/uploads/2020/12/POSTER-STANDARD-SQUARE.jpg",
            title: "STANDARD DIGITAL PACKAGE",
            regular_price: 450000,
            content: "<p>G\u00f3i s\u1ea3n ph\u1ea9m g\u1ed3m c\u00f3:<\/p>\n<ul>\n<li>21 h\u00ecnh n\u1ec1n ch\u1ea5t l\u01b0\u1ee3ng cao d\u00e0nh cho \u0111i\u1ec7n tho\u1ea1i v\u00e0 laptop.<\/li>\n<li>Photobook phi\u00ean b\u1ea3n k\u1ef9 thu\u1eadt s\u1ed1<\/li>\n<li>Poster phi\u00ean b\u1ea3n k\u1ef9 thu\u1eadt s\u1ed1 k\u00e8m ch\u1eef k\u00fd c\u1ee7a ngh\u1ec7 s\u0129<\/li>\n<li>Video l\u1eddi c\u00e1m \u01a1n c\u1ee7a ngh\u1ec7 s\u0129 S\u01a1n T\u00f9ng M-TP v\u00e0 H\u1ea3i T\u00fa<\/li>\n<li>File M\/V Ch\u00fang Ta C\u1ee7a Hi\u1ec7n T\u1ea1i ch\u1ea5t l\u01b0\u1ee3ng cao, \u0111\u1ed9 ph\u00e2n gi\u1ea3i 4K<\/li>\n<li>File Audio Ch\u00fang Ta C\u1ee7a Hi\u1ec7n T\u1ea1i \u0111\u1ecbnh d\u1ea1ng WAV<\/li>\n<li>File video Behind The Scenes M\/V Ch\u00fang Ta C\u1ee7a Hi\u1ec7n T\u1ea1i<\/li>\n<li>File video ch\u1ea5t l\u01b0\u1ee3ng cao M\/V Ch\u00fang Ta C\u1ee7a Hi\u1ec7n T\u1ea1i phi\u00ean b\u1ea3n Karaoke<\/li>\n<\/ul>\n",
            regular_price_fmt: "450,000.00&#8363;",
            price: 450000,
            price_fmt: "450,000.00&#8363;",
            sale_price: 225000,
            sale_price_fmt: "225,000.00&#8363;",
            is_in_stock: true,
            redirect: ""
        },
        {
            id: 14,
            thumbnail: "https://mtptalent.com/web/wp-content/uploads/2020/12/POSTER-BASIC-SQUARE.jpg",
            title: "BASIC DIGITAL PACKAGE",
            regular_price: 230000,
            content: "<p>G\u00f3i s\u1ea3n ph\u1ea9m g\u1ed3m c\u00f3:<\/p>\n<ul>\n<li>21 h\u00ecnh n\u1ec1n ch\u1ea5t l\u01b0\u1ee3ng cao d\u00e0nh cho \u0111i\u1ec7n tho\u1ea1i v\u00e0 laptop.<\/li>\n<li>Photobook phi\u00ean b\u1ea3n k\u1ef9 thu\u1eadt s\u1ed1<\/li>\n<li>Poster phi\u00ean b\u1ea3n k\u1ef9 thu\u1eadt s\u1ed1 k\u00e8m ch\u1eef k\u00fd c\u1ee7a ngh\u1ec7 s\u0129<\/li>\n<li>Video l\u1eddi c\u00e1m \u01a1n c\u1ee7a ngh\u1ec7 s\u0129 S\u01a1n T\u00f9ng M-TP v\u00e0 H\u1ea3i T\u00fa<\/li>\n<li>File M\/V Ch\u00fang Ta C\u1ee7a Hi\u1ec7n T\u1ea1i ch\u1ea5t l\u01b0\u1ee3ng cao, \u0111\u1ed9 ph\u00e2n gi\u1ea3i 4K<\/li>\n<li>File Audio Ch\u00fang Ta C\u1ee7a Hi\u1ec7n T\u1ea1i \u0111\u1ecbnh d\u1ea1ng WAV<\/li>\n<li>File video Behind The Scenes M\/V Ch\u00fang Ta C\u1ee7a Hi\u1ec7n T\u1ea1i<\/li>\n<li>File video ch\u1ea5t l\u01b0\u1ee3ng cao M\/V Ch\u00fang Ta C\u1ee7a Hi\u1ec7n T\u1ea1i phi\u00ean b\u1ea3n Karaoke<\/li>\n<\/ul>\n",
            regular_price_fmt: "230,000.00&#8363;",
            price: 230000,
            price_fmt: "230,000.00&#8363;",
            sale_price: 115000,
            sale_price_fmt: "115,000.00&#8363;",
            is_in_stock: true,
            redirect: ""
        }
    ],
    'auth/status': { id: 123, name: 'Demo User' },
};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
    /**
     * call(url, method = 'GET', body = {})
     * - url: relative path (no leading slash required)
     * - returns object compatible with axios response shape: { status, data }
     */
    async call(url, method = 'GET', body = {}) {
        if (typeof window !== 'undefined' && window.startLoading) window.startLoading();

        try {
            if (MOCK) {
                // simulate network latency
                await delay(250);

                const key = String(url || '').replace(/^\/|\/+$/g, '').toLowerCase();

                // simple routing for mock responses
                if (method === 'GET') {
                    if (key === '' || key === 'products' || key === '/products') {
                        return { status: 200, data: mockDB.products };
                    }

                    // handle product by id: /products/:id
                    const prodMatch = key.match(/^products\/(\d+)$/);
                    if (prodMatch) {
                        const id = Number(prodMatch[1]);
                        const item = mockDB.products.find(p => p.id === id);
                        if (item) return { status: 200, data: item };
                        return { status: 404, data: { error: 'Not found' } };
                    }

                    if (key === 'auth' || key === 'auth/status') {
                        return { status: 200, data: mockDB['auth/status'] };
                    }

                    // default mock GET
                    return { status: 200, data: { mock: true, url: key } };
                }

                // handle POST/PUT/DELETE in mock
                if (method === 'POST' || method === 'PUT') {
                    // echo back body for simple testing
                    return { status: 200, data: { ok: true, url: key, method, body } };
                }

                if (method === 'DELETE') {
                    return { status: 204, data: null };
                }

                return { status: 200, data: { mock: true, url: key, method } };
            }

            // real request
            const rs = await axios({
                method,
                url: prefix + url + '/',
                data: body,
                withCredentials: true
            }).catch(e => (e.response ? e.response : e));

            return rs;
        } finally {
            if (typeof window !== 'undefined' && window.stopLoading) window.stopLoading();
        }
    }
};



// WEBPACK FOOTER //
// ./src/inc/api.js