<template>
    <!-- <div class="background">
        <MTPEVideo 
            class="video" 
            src="/static/background.mp4" 
            animation="/static/background/BG_Mtp-2_$.jpg"
            :animationCount="192"
            :loop="true"
        /> -->

        <!-- <video ref="video" autoplay loop muted>
            <source ref="source" src="/static/background.mp4" type="video/mp4">
        </video> -->
    </div>
</template>

<script>
import MTPEVideo from './MTPEVideo';

export default {
    components: {
        MTPEVideo
    },

    data() {
        return {
        };
    },

    mounted() {

    }
}
</script>

<style scoped>
.background {
    width: 100%;
    height: 100%;
    /* padding-bottom: 56.25%; */
    left: 0px;
    top: 0px;
    position: absolute;
    z-index: 0; /* changed from -1 to 0 so content is not hidden or affected */
}

.video {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    background: transparent; /* changed from #000 to transparent */
    /* opacity: 0; */
    transition: opacity 1.5s;
    object-fit: cover;
}
</style>



// WEBPACK FOOTER //
// src/components/Background.vue