<template>
    <div class="login">
        <form @submit.prevent="login">
            <div style="color: #F40" v-if="error" v-html="error"></div>

            <input type="text" v-model="username" :placeholder="ee('Username')" required>
            <input type="password" v-model="password" :placeholder="ee('Password')" required>

            <router-link 
                :to="{ name: 'ResetPassword' }"
                style="text-align: right; font-size: 12px"
            >{{ ee('Forgot your password?') }}</router-link>

            <button type="submit" class="btn btn-black" style="width:100%">{{ ee('Login') }}</button>

            <router-link 
                :to="{ name: 'CreateNewAccount' }"
                style="text-align: center"
            >
                {{ ee('Create a new account') }}
            </router-link>
        </form>

        <a href="#" style="text-align:center" @click.prevent="$router.go(-1)">{{ ee('Back') }}</a>
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
            username: '',
            password: '',
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
            if (this.isGoBack) {
                this.$router.go(-1);
            } else {
                this.$router.push({ name: 'Index' });
            }
        }
    },

    methods: {
        async login() {
            var { status, data, message } = await AuthenModel.login(this.username, this.password);
            
            if (status == 200) {
                this.$store.state.userId = data;
                
                var { status, data } = await AuthenModel.get();
                if (status == 200) {
                    this.$store.state.user = data;
                }

                if (this.isGoBack) {
                    this.$router.go(-1);
                } else {
                    this.$router.push({ name: 'Index' });
                }
            } else {
                this.error = data || message;
            }
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
// src/components/pages/Login.vue