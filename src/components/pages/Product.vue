<template>
    <div class="product" v-if="product">
        <div class="thumbnail">
            <img :src="product.thumbnail" :alt="product.title">
        </div>

        <!-- <div class="quantity quantity-mobile">
            <a href="#" class="btn" @click.prevent="downQuan">-</a>
            <input type="number" style="width:50px" class="mb-20 mt-0 va-m ta-c" v-model="quantity" step="1" min="1">
            <a href="#" class="btn" @click.prevent="upQuan">+</a>
        </div> -->

        <!-- <div class="tools tools-mobile">
            <a href="#" class="btn" @click.prevent="addToCart">{{ ee('Add to cart') }}</a>
            <a href="#" class="btn btn-black" @click.prevent="checkout">{{ ee('Check out') }}</a>

            <a :href="product.redirect" target="_blank" v-if="product.redirect" class="btn btn-black">{{ ee('Check out') }}</a>

            <span style="color: #0a4" v-if="message">{{ message }}</span>
        </div> -->

        <div class="info">
            <h1 class="title">{{ product.title }}</h1>
            <div class="price price-regular" v-if="product.sale_price"><span class="c-c">VND</span> {{ fmt.price(product.regular_price) }}</div>
            <div class="price"><span class="c-c">VND</span> {{ fmt.price(product.price) }}</div>
            <div class="product-info">
                <h3>{{ ee('Product Information') }}: </h3>
                <div v-html="product.content"></div>
            </div>
            <div class="quantity quantity-desktop">
                <a href="#" class="btn" @click.prevent="downQuan">-</a>
                <input type="number" style="width:50px" class="mb-20 mt-0 va-m ta-c" v-model="quantity" step="1" min="1">
                <a href="#" class="btn" @click.prevent="upQuan">+</a>
            </div>

            <div class="tools tools-desktop">
                <a href="#" class="btn" @click.prevent="addToCart">{{ ee('Add to cart') }}</a>
                <a href="#" class="btn btn-black" @click.prevent="checkout">{{ ee('Check out') }}</a>

                <a :href="product.redirect" target="_blank" v-if="product.redirect" class="btn btn-black">{{ ee('Check out') }}</a>
                <!-- <strong v-else>{{ ee('Coming soon') }}</strong> -->

                <span style="color: #0a4" v-if="message">{{ message }}</span>
            </div>

            <a href="#" class="ta-c d-b" @click.prevent="$router.go(-1)">{{ ee('Back') }}</a>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import ee from '@/inc/lang';
import fmt from '@/inc/fmt';
import ProductModel from '@/models/products';
import CartModel from '@/models/cart';

export default {
    data() {
        return {
            ee,
            fmt,
            product: null,
            quantity: 1,
            message: '',
            messageTimeout: 0
        }
    },

    computed: {
        productId() {
            return this.$route.params.productId;
        }
    },

    async mounted() {
        var { status, data } = await ProductModel.getById(this.productId);

        if (status == 200) {
            this.product = data;
            if (data.redirect) {
                window.open(data.redirect, '_blank');
                history.back();
            }
        }
    },

    methods: {
        upQuan() {
            this.quantity += 1;
        },

        downQuan() {
            this.quantity = Math.max(1, this.quantity - 1);
        },

        async addToCart() {
            var { status, data } = await CartModel.addToCart(this.productId, this.quantity);
            
            if (status == 200) {
                this.message = "Added to your cart";
                clearTimeout(this.messageTimeout);
                this.messageTimeout = setTimeout(() => this.message = '', 5000);
            }
        },

        async checkout() {
            await this.addToCart();
            this.$router.push({ name: 'Cart' });
        }
    }
}
</script>

<style scoped>
.thumbnail {
    float: left;
    width: 50%;
    padding-right: 10px;
}

.info {
    float: left;
    width: 50%;
    padding-left: 10px;
}

.thumbnail img {
    width: 100%;
    height: 500px;
    object-fit: contain;
}

h1, .price {
    font-size: 20px;
}

.price.price-regular {
    font-size: 15px;
    text-decoration: line-through;
}

h3 {
    font-size: 18px;
    color: #999;
}

input {
    margin-bottom: 20px;
    border: 1px solid #ccc;
    line-height: 30px;
}

.quantity-mobile,
.tools-mobile {
    display: none;
}

.product-info {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 10px 0px;
    margin: 10px 0px;
    max-height: 250px;
    overflow: auto;
}

a {
    color: #888;
}

@media screen and (max-width: 800px) {
    .thumbnail {
        float: none;
        width: 80%;
        margin: auto;
    }

    .thumbnail img {
        width: 100%;
        height: auto;
        margin-bottom: 20px;
    }

    .info {
        float: none;
        width: 100%;
    }

    .product-info { 
        max-height: none;
    }

    .quantity-mobile,
    .tools-mobile {
        display: block;
    }

    .quantity-desktop,
    .tools-desktop {
        display: none;
    }
}
</style>



// WEBPACK FOOTER //
// src/components/pages/Product.vue