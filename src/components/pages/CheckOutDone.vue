<template>
    <div class="checkout-done">
        <div class="ta-c fs-25">
            <p>{{ ee('Thank you for your order') }}</p>
            <p>{{ ee('Please check your email for order information') }}</p>
        </div>

        <a href="#" class="ta-c" @click.prevent="$router.push({ name:'Index' })">{{ ee('Back') }}</a>
    </div>
    
</template>

<script>
import $ from 'jquery';
import ee from '@/inc/lang';
import CheckoutModel from '@/models/checkout';

export default {
    data() {
        return {
            ee,
        }
    },

    computed: {
        userId() {
            return this.$store.state.userId;
        },

        user() {
            return this.$store.state.user;
        },

        orderId() {
            return this.$store.state.orderId;
        },

        checkoutMethod() {
            return this.$store.state.checkoutMethod;
        }
    },

    async mounted() {
        if (!this.userId) {
            return this.$router.go({ name: 'Index' });
        }

        var { status, data } = await CheckoutModel.useTransfer();
        if (status == 200) {
            this.$store.state.orderId = data;
            this.$store.state.checkoutMethod = 'transfer';
            this.$router.push({ name: 'CheckOutDone' });
        }
    },

    methods: {

    }
}
</script>

<style scoped>
a {
    display: block;
    color: #888;
    margin-bottom: 20px;
}
</style>


// WEBPACK FOOTER //
// src/components/pages/CheckOutDone.vue