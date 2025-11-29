<template>
    <div class="purchase-transfer">
        <div class="ta-c fs-25">
            <p>Bạn vui lòng thanh toán chuyển khoản vào thông tin sau:</p>
            <p>• Chủ tài khoản : <strong>CÔNG TY CP M-TP TALENT</strong></p>
            <p>• Ngân hàng: <strong>TECHCOMBANK - Ngân hàng TMCP Kỹ thương Việt Nam</strong></p>
            <p>• Số tài khoản: <strong>19134215577888</strong></p>
            <p>• Chi nhánh: <strong>Phú Mỹ Hưng</strong></p>
        </div>

        <a href="#" class="ta-c" @click.prevent="$router.push({ name:'CheckOutDone' })">{{ ee('Next') }}</a>
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

        username() {
            return this.$store.state.username || this.user.name;
        }
    },

    async mounted() {
        if (!this.userId) {
            return this.$router.go({ name: 'Index' });
        }

        var { status, data } = await CheckoutModel.useTransfer(this.username);
        if (status == 200) {
            this.$store.state.orderId = data;
            this.$store.state.checkoutMethod = 'transfer';
            // this.$router.push({ name: 'CheckOutDone' });
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
// src/components/pages/PurchaseTransfer.vue