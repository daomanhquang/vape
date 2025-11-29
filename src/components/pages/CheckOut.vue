<template>
    <div class="check-out ta-c">
        <h3>{{ ee('Please choose your method for purchasing') }}</h3>

        <div class="methods">
            <router-link :to="{ name: 'PurchaseTransfer' }">
                <div class="btn btn-black">{{ ee('Transfer') }}</div>
            </router-link>
        </div>

        <a href="#" @click.prevent="$router.go(-1)">{{ ee('Back') }}</a>
    </div>
</template>

<script>
import $ from 'jquery';
import ee from '@/inc/lang';
import AuthenModel from '@/models/authen';

export default {
    data() {
        return {
            ee,
        }
    },

    computed: {
        userId() {
            return this.$store.state.userId;
        }
    },

    async mounted() {
        
    },

    methods: {

    }
}
</script>

<style scoped>
.methods {
    width: 320px;
    margin: auto;
}

.methods .btn {
    width: 100%;
}

a {
    display: block;
    color: #888;
    margin-bottom: 20px;
}
</style>


// WEBPACK FOOTER //
// src/components/pages/CheckOut.vue