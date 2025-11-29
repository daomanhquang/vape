<template>
    <div class="reset-password ta-c">
        <p class="fs-25">Please enter your email that you have registered before.</p>

        <form @submit.prevent="resetPassword">
            <div style="color: #F40" v-if="error">{{ error }}</div>

            <input type="email" v-model="email" placeholder="Email" required>

            <button type="submit" class="btn btn-black" style="width:100%">Reset Password</button>
        </form>

        <a href="#" style="text-align:center" @click.prevent="$router.go(-1)">Back</a>
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
            email: '',
            error: '',
        }
    },

    computed: {
        userId() {
            return this.$store.state.userId;
        },

        isGoBack() {
            return this.$route.query.back == 1;
        }
    },

    async mounted() {
        if (this.userId) {
            this.$router.push({ name: 'Index' });
        }
    },

    methods: {
        async resetPassword() {

        }
    }
}
</script>

<style scoped>
form {
    width: 320px;
    margin: auto;
}

input {
    margin-bottom: 20px;
    width: 100%;
    border: 1px solid #ccc;
    line-height: 30px;
}

a {
    display: block;
    color: #888;
    margin-bottom: 20px;
}
</style>


// WEBPACK FOOTER //
// src/components/pages/ResetPassword.vue