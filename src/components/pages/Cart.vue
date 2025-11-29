<template>
    <div class="cart" v-if="cart">
        <div class="cart-items">
            <table>
                <thead>
                    <tr>
                        <th>{{ ee('Name of product') }}</th>
                        <th class="ta-c">{{ ee('Amount') }}</th>
                        <th class="ta-r">{{ ee('Price') }}</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="item in cart" :key="item.cart_id">
                        <td>
                            <img :src="item.thumbnail" class="thumbnail" alt="">
                            <strong class="title">{{ item.title }}</strong>
                        </td>

                        <td class="ta-c">
                            <div v-if="editingId != item.cart_id">
                                {{ item.quantity }}
                                <a href="#" 
                                    v-if="!editingId" 
                                    @click.prevent="()=> (editingId=item.cart_id, quantity=item.quantity)"
                                ><i class="fas fa-pencil-alt"></i></a>
                            </div>

                            <div v-else>
                                <input 
                                    type="number" 
                                    style="width:50px;text-align:right" 
                                    v-model="quantity" min="0" step="1"
                                />

                                <div>
                                    <a href="#" @click.prevent="()=> editingId = null"><i class="fas fa-times"></i></a> 
                                    <span class="d-ib" style="width:10px"></span>
                                    <a href="#" @click.prevent="save"><i class="fas fa-check"></i></a> 
                                </div>
                            </div>
                        </td>

                        <td class="ta-r">
                            <span class="currency">VND</span>
                            {{ fmt.price(item.total_price) }}
                        </td>
                    </tr>
                </tbody>

                <tfoot>
                    <tr>
                        <td></td>
                        <td>{{ ee('Total') }}</td>
                        <td class="ta-r">
                            <span class="currency">VND</span>
                            {{ fmt.price(totalPrice) }}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <div class="ta-r pt-20">
            <a href="#" class="d-ib" @click.prevent="$router.go(-1)">{{ ee('Back') }}</a>
            <router-link v-if="cart.length" class="d-ib ml-20 btn btn-black" :to="{ name: 'ShippingInfo' }">{{ ee('Check out') }}</router-link>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import ee from '@/inc/lang';
import fmt from '@/inc/fmt';
import CartModel from '@/models/cart';

export default {
    data() {
        return {
            ee,
            fmt,
            cart: null,
            editingId: null,
            quantity: null,
        }
    },

    computed: {
        userId() {
            return this.$store.state.userId;
        },

        totalPrice() {
            var rs = 0; 
            this.cart.forEach(i=> rs += i.total_price);
            return rs;
        }
    },

    async mounted() {
        if (!this.userId) {
            return this.$router.push({ name: "Login" });
        }

        var { status, data } = await CartModel.get();

        if (status == 200) {
            this.cart = data;
        }
    },

    methods: {
        async save() {
            var { status, data } = await CartModel.update(this.editingId, this.quantity);
            if (status == 200) {
                var { status, data } = await CartModel.get();
                if (status == 200) {
                    this.editingId = null;
                    this.cart = data;
                }
            }
        }
    }
}
</script>

<style scoped>
.thumbnail {
    width: 100px;
    height: 100px;
    object-fit: contain;
}

table {
    width: 100%;
}

.cart-items {
    max-height: 400px;
    overflow: auto;
    display: block;
}

tr {
    border-bottom: 1px solid #ccc;
}

tfoot tr {
    border: none;
}

th, td {
    padding: 10px 0px;
}

.currency {
    color: #888;
}

a {
    color: #888;
    margin-bottom: 20px;
    vertical-align: middle;
}

@media screen and (max-width: 800px) {
    .cart-items {
        max-height: none;
    }

    .title {
        display: block;
        font-size: 14px;
    }
}
</style>


// WEBPACK FOOTER //
// src/components/pages/Cart.vue