<template>
    <div class="verify-account" v-if="loaded">
        <div class="ta-c fs-25">
            <span v-if="success">Congratulation! Your account has been verified. Now you can join with us.</span>
            <span v-else>Failed</span>
        </div>

        <a href="#" class="ta-c" @click.prevent="$router.push({ name: 'Login' })">Back</a>
    </div>
</template>

<script>
import $ from 'jquery';
import ee from '@/inc/lang';
import UserModel from '@/models/user';

export default {
    data() {
        return {
            ee,
            loaded: false,
            success: false
        }
    },

    computed: {
        verifyCode() {
            return this.$route.query.verify_code;
        },

        userId() {
            return this.$route.query.user_id;
        }
    },

    async mounted() {
        if (this.userId && this.verifyCode) {
            var { status, data } = await UserModel.verify(this.userId, this.verifyCode).catch(e=> ({}));
            if (status == 200) {
                this.success = true;
            }
        }

        this.loaded = true;
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
// src/components/pages/VerifyAccount.vue