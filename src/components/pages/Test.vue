<template>
    <div>
        <ImageM ref="img" src="./static/disp1.jpg" class="img" />
    </div>
</template>

<script>
import ImageM from '../MTPEImage2';

export default {
    components: {
        ImageM
    },

    mounted() {
        window.img = this.$refs.img;
    },
}
</script>

<style scoped>
.img {
    width: 100vw;
    height: 100vh;
}
</style>


// WEBPACK FOOTER //
// src/components/pages/Test.vue