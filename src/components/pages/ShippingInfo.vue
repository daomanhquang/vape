<template>
    <div class="purchase-transfer">
        <table>
            <tbody>
                <tr>
                    <th>{{ ee('Name') }}</th>
                    <td><input type="text" v-model="name" required></td>
                </tr>
                <tr>
                    <th>{{ ee('Email') }}</th>
                    <td><input type="text" disabled :value="user.email"></td>
                </tr>
                <tr>
                    <th>{{ ee('Phone') }}</th>
                    <td><input type="text" disabled :value="user.phone"></td>
                </tr>
                <tr>
                    <th>{{ ee('Address') }}</th>
                    <td><input type="text" disabled :value="user.address"></td>
                </tr>
            </tbody>
        </table>

        <div class="ta-c">
            <a href="#" class="d-ib" @click.prevent="$router.go(-1)">{{ ee('Back') }}</a>
            <a href="#" class="d-ib ml-20" v-if="user.phone && user.address" @click.prevent="next">{{ ee('Next') }}</a>
            <a href="#" class="d-ib ml-20" @click.prevent="$router.push({ name: 'UpdateAccount' })">{{ ee('Update Account') }}</a>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import ee from '@/inc/lang';

export default {
    data() {
        return {
            ee,
            name: ''
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

        this.name = this.username;
    },

    methods: {
        next() {
            this.$store.state.username = this.name;
            this.$router.push({ name: 'CheckOut' });
        }
    }
}
</script>

<style scoped>
table {
    width: 320px;
    margin: auto;
}

th {
    width: 75px;
    display: block;
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
// src/components/pages/ShippingInfo.vue