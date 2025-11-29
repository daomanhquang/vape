<template>
    <div id="app">
        <div v-if="!loaded" class="loading" ref="loading">
            <MTPEVideo 
                class="video"
                src="/static/loading.mp4"
                animation="/static/loading/MTP_Logo__$.png" 
                :animationCount="75"
                :cursorEffect="false"
                :forceAnimation="true"
                :animationSpeed="0.2"
                @ended="endLoading"
            />

            <!-- <video muted autoplay class="video" @ended="endLoading" v-else>
                <source src="/static/loading.mp4" type="video/mp4" />
            </video> -->
        </div>

        <router-view v-if="stateLoaded" />

        <div v-if="isApiLoading" class="api-loading">
            <img src="/static/api-loading.svg" alt="">
        </div>
        
        <svg class="cursor" width="90" height="90" viewBox="0 0 140 140">
			<defs>
				<filter 
                    id="filter-1" 
                    x="-50%" y="-50%" 
                    width="200%" height="200%" 
				    filterUnits="objectBoundingBox"
                >
					<feTurbulence type="fractalNoise" baseFrequency="0" numOctaves="10" result="warp" />
					<feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="60" in="SourceGraphic" in2="warp" />
				</filter>
			</defs>
			<circle class="cursor__inner" cx="70" cy="70" r="60"/>
		</svg>
    </div>
</template>

<script>
import Cursor from '@/inc/cursor';
import MTPEVideo from '@/components/MTPEVideo';
import AuthenModel from '@/models/authen';

import $ from 'jquery';

export default {
    name: "App",
    components: {
        MTPEVideo
    },

    watch: {
        $route() {
            try {
                window.gtag('event', 'page_view', { page_location: location.pathname+location.search+location.hash });
            } catch (e) {
                // ignore gtag errors
            }

            this.changeRoute();
        }
    },

    computed: {
        isApiLoading() {
            return this.$store.state.isApiLoading && this.loaded;
        }
    },

    data() {
        return {
            loaded: true, // temporarily true to bypass loading overlay for debugging
            stateLoaded: true,
            aEls: new Set(),
            isMobile: $(window).width() <= 800
        };
    },

    async mounted() {
        this.changeRoute();
        this.authen();
        this.stateLoaded = true;

        window.startLoading = ()=> this.$store.state.isApiLoading += 1;
        window.stopLoading = ()=> this.$store.state.isApiLoading = Math.max(0, this.$store.state.isApiLoading - 1);
    },

    methods: {
        async authen() {
            var { status, data } = await AuthenModel.get().catch(e=> ({ status: 0 }));
            if (status == 200) {
                this.$store.state.userId = data.id;
                this.$store.state.user = data;
            }
        },

        endLoading() {
            $(this.$refs.loading).fadeOut(500);
            setTimeout(()=> this.loaded = true, 1000);
            this.$store.state.endLoading = true;
        },

        changeRoute() {
            this.$nextTick(()=> {
                const cursor = new Cursor(document.querySelector('.cursor'));
    
                [...document.querySelectorAll('a')].forEach(el => {
                    el.addEventListener('mouseenter', () => cursor.emit('enter'));
                    el.addEventListener('mouseleave', () => cursor.emit('leave'));
                });
            });
        }
    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&display=swap');

.loadingfont {
    font-family: SFUDinCons;
}

* {
    cursor: default;
}

.fs-20 {
    font-size: 20px;
}
.fs-25 {
    font-size: 25px;
}
.fs-30 {
    font-size: 30px;
}

.d-ib {
    display: inline-block !important;
}

.ta-c {
    text-align: center !important;
}

.ta-r {
    text-align: right !important;
}

.ml-20 {
    margin-left: 20px !important;
}

.mb-20 {
    margin-bottom: 20px !important;
}

.mt-0 {
    margin-top: 0px !important;
}

.va-m {
    vertical-align: middle;
}

.pt-20 {
    padding-top: 20px !important;
}

.pt-100 {
    padding-top: 100px !important;
}

.c-c {
    color: #aaa !important;
}
.c-b {
    color: #333 !important;
}

.btn {
    border: 1px solid #ccc;
    margin-bottom: 20px;
    min-height: 30px;
    padding: 0px 20px;
    min-width: 30px;
    vertical-align: middle;
    background: #fff;
}

.btn.btn-black {
    background: #333;
    color: #fff;
}

html,
body {
    /* cursor: none; */
    position: relative;
    overflow: hidden;
    height: 100vh;
    margin: 0px;
    padding: 0px;
    font-weight: normal;
    font-family: SFUDin !important;
}

.api-loading {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 99999;
    text-align: center;
    background: rgba(255, 255, 255, 0.5);
}
.api-loading img {
    width: 50px;
    height: 50px;
    position: absolute;
    right: 20px;
    bottom: 20px;
}

.loading {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    object-fit: contain;
    z-index: 999;
    background: #000;
}

.loading .video {
    position: absolute;
    width: 320px;
    height: 180px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.cursor {
    position: fixed;
    top: 0;
    left: 0;
    display: block;
    pointer-events: none;
    opacity: 0;
    z-index: 999999;
}
.cursor__inner {
    fill: transparent;
    stroke: #aaa;
    stroke-width: 1;
}

img {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}

@media screen and (max-width: 1200px) and (max-height: 900px){
    
}

@media screen and (max-width: 800px) {
    .cursor {
        display: none;
    }
}
</style>



// WEBPACK FOOTER //
// src/App.vue