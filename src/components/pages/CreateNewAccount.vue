<template>
    <div class="login">
        <template v-if="step1">
            <form @submit.prevent="signup">
                <div style="color: #F40" v-if="error">{{ error }}</div>

                <input type="text" v-model="username" placeholder="Username" required>
                <input type="email" v-model="email" placeholder="Email" required>
                <input type="password" v-model="password" placeholder="Password" required>
                
                <button type="submit" class="btn btn-black">{{ ee('Submit') }}</button>
            </form>
        </template>

        <div class="ta-c fs-25" v-else>
            <h2>{{ ee('VERIFY EMAIL') }}</h2>
            <p>{{ ee('Please click the link that') }}</p>
            <p>{{ ee('has been sent to your email') }}</p>
        </div>

        <a href="#" class="ta-c" @click.prevent="$router.go(-1)">{{ ee('Back') }}</a>
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
            username: '',
            password: '',
            email: '',
            step1: true,
            error: ''
        }
    },

    computed: {
        userId() {
            return this.$store.state.userId;
        }
    },

    async mounted() {
        if (this.userId) {
            return this.$router.go(-1);
        }
    },

    methods: {
        async signup() {
            var { status, data, message } = await UserModel.create(this.username, this.email, this.password);
            if (status == 201) {
                this.step1 = false;
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

button {
    width: 100%;
}

a {
    display: block;
    color: #888;
    margin-bottom: 20px;
}
</style>


// WEBPACK FOOTER //
// src/components/pages/CreateNewAccount.vue