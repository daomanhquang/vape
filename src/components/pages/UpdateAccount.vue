<template>
    <div class="update-account" v-if="loaded">
        <form @submit.prevent="submit">
            <table>
                <tbody>
                    <tr>
                        <td style="width: 100px">{{ ee('Username') }}</td>
                        <td><input type="text" :value="user.name" disabled></td>
                    </tr>
                    <tr v-if="enableChangePassword">
                        <td>{{ ee('Password') }}</td>
                        <td><input type="password" v-model="password" :placeholder="ee('Enter the new password')"></td>
                    </tr>

                    <tr v-else>
                        <td colspan="2">
                            <a 
                                href="#" 
                                @click.prevent="()=> enableChangePassword=true"
                                style="text-align: right"
                            >{{ ee('Change password') }}</a>
                        </td>
                    </tr>
                    
                    <tr>
                        <td>{{ ee('Email') }}</td>
                        <td><input type="text" disabled :value="user.email"></td>
                    </tr>

                    <tr>
                        <td>{{ ee('Phone') }}</td>
                        <td><input type="text" v-model="phone" placeholder=""></td>
                    </tr>

                    <tr>
                        <td>{{ ee('Address') }}</td>
                        <td><input type="text" v-model="address" placeholder=""></td>
                    </tr>
                </tbody>
            </table>

            <div class="ta-c">
                <a href="#" class="d-ib" @click.prevent="$router.push({ name: 'Login' })">{{ ee('Back') }}</a>
                <a href="#" class="d-ib ml-20" @click.prevent="submit">{{ ee('Save') }}</a>
            </div>
        </form>
    </div>
</template>

<script>
import $ from 'jquery';
import ee from '@/inc/lang';
import UserModel from '@/models/user';
import AuthenModel from '@/models/authen';

export default {
    data() {
        return {
            ee,
            password: '',
            phone: '',
            address: '',
            enableChangePassword: false,
            loaded: false,
        }
    },

    computed: {

        userId() {
            return this.$store.state.userId;
        },

        user() {
            return this.$store.state.user;
        },
    },

    async mounted() {
        if (!this.userId) {
            return this.$router.push({ name: 'Index' });
        }

        this.phone = this.user.phone;
        this.address = this.user.address;
        this.loaded = true;
    },

    methods: {
        async submit() {
            var {status, data} = await UserModel.update(this.password, this.phone, this.address);
            if (status == 200) {
                var { status, data } = await AuthenModel.get().catch(e=> ({ status: 0 }));
                if (status == 200) {
                    this.$store.state.userId = data.id;
                    this.$store.state.user = data;
                }

                this.$router.go(-1);
            }
        }
    }
}
</script>

<style scoped>
table {
    width: 320px;
    margin: auto;
}

input {
    margin-bottom: 20px;
    width: 100%;
    border: 1px solid #ccc;
    line-height: 30px;
    vertical-align: middle;
}

td, th {
    vertical-align: middle;
}

a {
    display: block;
    color: #888;
    margin-bottom: 20px;
}
</style>


// WEBPACK FOOTER //
// src/components/pages/UpdateAccount.vue