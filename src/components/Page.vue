<template>
    <div class="page" :data-top="t" :data-bottom="b">
        <!-- <img v-if="background" class="page-background" :class="{ show: showed }" :src="background"> -->

        <!--
        <MTPEImage 
            ref="background"
            :imageX="imageX" 
            v-if="background" 
            class="page-background active" 
            :class="{ show: showed }" 
            :src="background" 
        />
        -->

        <slot></slot>
    </div>
</template>

<script>
import $ from 'jquery';
import MTPEImage from '@/components/MTPEImage';

export default {
    components: {
        MTPEImage
    },

    props: [
        'background',
        'imageX'
    ],

    data() {
        return {
            showed: false,
            t: 0,
            b: 0
        };
    },

    watch: {
        background() {
            setTimeout(()=> {
                $(this.$el).find('.page-background').css('transition', 'none');
                this.showed = false;
            }, 100);

            setTimeout(()=> {
                $(this.$el).find('.page-background').css('transition', '');
                this.showed = true;
            }, 200);
        }
    },

    mounted() {
        $(this.$el).on('pageScroll', this.pageScroll);
        $(this.$el).on('pageOut', this.pageOut);
    },

    methods: {
        pageScroll(e, t, b) {
            this.t = t;
            this.b = b;

            if (b > 50) this.showed = true;

            // console.log(this.$refs);

            // if (this.$refs.background) this.$refs.background.start();
            this.$emit('pageScroll', t, b);
        },

        pageOut() {
            // if (this.$refs.background) this.$refs.background.stop();
        }
    }
}
</script>

<style scoped>
.page {
    position: relative;
    width: 100vw;
}

.page-background {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    right: 0px;
    z-index: -1;
    object-fit: cover;
    /* transform: scale(1.2); */
    transition: 
        transform 1s,
        opacity 2s;
}

.page-background.show {
    opacity: 1;
    /* transform: scale(1); */
}
</style>



// WEBPACK FOOTER //
// src/components/Page.vue