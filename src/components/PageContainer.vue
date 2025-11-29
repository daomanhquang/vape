<template>
    <div class="page-container">
        <slot></slot>
    </div>
</template>

<script>
import $ from 'jquery';

export default {
    mounted() {
        $(this.$el).on('scroll', this.onScroll);
    },

    methods: {
        onScroll(e) {
            var st = $(this.$el).scrollTop();

            this.$slots.default.forEach(page=> {
                if (page.elm.getClientRects) {
                    var t = -$(page.elm).offset().top;
                    var h = $(page.elm).height();

                    if (t > h) return $(page.elm).trigger('pageOut');

                    var b = Math.min(h - t, t + $(this.$el).height());
                    if (b < 0) return $(page.elm).trigger('pageOut');

                    $(page.elm).trigger('pageScroll', [t, b]);
                }
            });
        }
    }
}
</script>

<style scoped>
.page-container {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100vh;
}
</style>



// WEBPACK FOOTER //
// src/components/PageContainer.vue