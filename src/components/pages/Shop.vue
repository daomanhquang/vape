<template>
    <div class="shop">
        <carousel 
            :centerMode="true"
            :perPage="1"
            v-model="productIdx"
            :paginationEnabled="false"
            :scrollPerPage="false"
            :mouseDrag="false"
            :speed="1500"
            class="products-slide"
        >
            <slide v-for="(item, i) in products" :key="i">
                <router-link v-if="!item.redirect" :to="{ name: 'Product', params: { productId: item.id } }">
                    <div
                        @mouseenter="()=> slide(i)"
                        class="item" 
                        :class="{ active: productIdx == i }"
                    >
                        <img :src="item.thumbnail" class="img" />
                        <h3 v-if="productIdx==i">{{ item.title }}</h3>
                    </div>
                </router-link>

                <a v-else :href="item.redirect" target="_blank">
                    <div
                        @mouseenter="()=> slide(i)"
                        class="item" 
                        :class="{ active: productIdx == i }"
                    >
                        <img :src="item.thumbnail" class="img" />
                        <h3 v-if="productIdx==i">{{ item.title }}</h3>
                    </div>
                </a>
            </slide>
        </carousel>

        <div class="products-list">
            <div class="product-item" v-for="(item, i) in products" :key="i">
                <router-link v-if="!item.redirect" :to="{ name: 'Product', params: { productId: item.id } }">
                    <img :src="item.thumbnail" class="img" />
                    <h3 class="ta-c c-b fs-20">{{ item.title }}</h3>
                </router-link>

                <a v-else :href="item.redirect" target="_blank">
                    <img :src="item.thumbnail" class="img" />
                    <h3 class="ta-c c-b fs-20">{{ item.title }}</h3>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import ee from '@/inc/lang';
import ProductModel from '@/models/products';

export default {
    data() {
        return {
            ee,
            products: [],
            productIdx: 0,
        }
    },

    async mounted() {
        var { status, data } = await ProductModel.getAll();

        if (status == 200) {
            this.products = data;
            console.log(this.products);
        }

        $(this.$el).find('.VueCarousel-wrapper').css('overflow', 'visible');
    },

    methods: {
        slide(i) {
            this.productIdx = i;
        }
    }
}
</script>

<style scoped>
.shop {
    position: absolute;
    left: 50vw;
    top: 0px;
    z-index: 10;

    width: 30%;
    transform: translate(-50%, -50%);
}

.VueCarousel-slide {
    text-align: center;
}

.products-list {
    display: none;
    margin: auto;
    width: 80%;
}

.products-list .img {
    margin-bottom: 20px;
    width: 100%;
}

.products-list .product-item {
    padding-bottom: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid #ccc;
}

.item {
    vertical-align: bottom;
    position: relative;
    display: inline-block;
    width: 70%;
    height: 100%;
    opacity: 0.5;
    transition: all 0.5s;
    color: #333;
    text-decoration: none;
    text-transform: capitalize;
    /* font-family: 'Open Sans Condensed', sans-serif; */
    font-family: SFUDinCons;
    font-weight: light;
}
.item h3 {
    font-size: 18px;
}

.item .img {
    vertical-align: middle;
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.item.active {
    opacity: 1;
    width: 100%;
}
.item.active h3 {
    font-size: 30px;
}

@media screen and (max-width: 800px) {
    .shop {
        position: relative;
        display: block;
        transform: none;
        left: 0px;
        top: 0px;
        width: auto;
    }

    .item.active h3 {
        font-size: 20px;
    }

    .products-slide {
        display: none;
    }

    .products-list {
        display: block;
    }
}
</style>


// WEBPACK FOOTER //
// src/components/pages/Shop.vue