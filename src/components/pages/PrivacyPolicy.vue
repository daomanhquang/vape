<template>
    <div class="privacy-policy">
        <div class="row">
            <div class="col-md-12" v-html="content"></div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import ee from '@/inc/lang';
import PagesModel from '@/models/pages';

export default {
    data() {
        return {
            ee,
            content: ''
        }
    },

    async mounted() {
        var { status, data } = await PagesModel.getPrivacyPolicy();

        if (status == 200) {
            this.content = data.content;
        }
    },

    methods: {
        
    }
}
</script>

<style scoped>


.privacy-policy {
    height: calc(100vh - 200px);
    overflow-x: hidden;
    overflow-y: auto;
    margin-top: 150px;
    color: #333;
}

h1 {
    /* font-family: 'Open Sans Condensed', sans-serif; */
    font-family: SFUDinCons;
}

hr {
    border: none;
    height: 5px;
    background: #666;
    border-radius: 2px;
    width: 100px;
    margin-left: 0px;
    margin-bottom: 50px;
}

a,
a:hover {
    color: #333;
    /* font-family: 'Open Sans Condensed', sans-serif; */
    font-family: SFUDinCons;
    text-decoration: underline;
}

.googlemap {
    height: 100vh;
    position: fixed;
    width: 30%;
    background: #333;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
}

#map {
    width:100%;
    height: 100vh;
}

@media screen and (max-width: 1200px) {
    .contact {
        font-size: 20px;
    }
}

@media screen and (max-width: 800px) {
    .privacy-policy {
        height: auto;
        margin-top: 0px;
        color: #333;
    }

    h1 {
        font-size: 25px;
    }

    .contact {
        font-size: 18px;
        position: relative;
        height: 100%;
    }

    .googlemap {
        position: relative;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        transform: none;
        background: transparent;
        padding-bottom: 20px;
    }

    #map {
        width:100%;
        height: 100%;
    }
}
</style>


// WEBPACK FOOTER //
// src/components/pages/PrivacyPolicy.vue