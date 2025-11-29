<template>
    <div style="height:100%">
        <div class="multimedia-carousel">
            <transition name="slide-fade">
                <div class="fsl" v-if="slide_o==1 || isMobile">
                    <carousel 
                        :centerMode="true"
                        :perPage="1"
                        v-model="value"
                        :paginationEnabled="false"
                        :scrollPerPage="false"
                        :mouseDrag="false"
                        :speed="1500"
                    >
                        <slide v-for="(item, i) in items" :key="i">
                            <a 
                                :href="item.url" 
                                @click.prevent="()=> value == i? open(item): null"
                                target="_blank"
                                @mouseenter="()=> slide(i)"
                                class="item" 
                                :class="{ active: value == i }"
                            >
                                <img :src="item.src" class="img" />
                                <!-- <MTPEImage class="img active" :src="item.src" /> -->

                                <h3 v-if="value==i">{{ item.title }}</h3>
                            </a>
                        </slide>
                    </carousel>
                </div>
            </transition>

            <transition name="slide-fade">
                <div class="ssl" v-if="slide_o==2 || isMobile">
                    <carousel 
                        :centerMode="true"
                        :perPage="1"
                        v-model="value2"
                        :paginationEnabled="false"
                        :scrollPerPage="false"
                        :mouseDrag="false"
                        :speed="1500"
                    >
                        <slide v-for="(item, i) in items2" :key="i">
                            <a 
                                :href="item.url" 
                                @click.prevent="()=> value2 == i? open(item): null"
                                target="_blank"
                                @mouseenter="()=> slide2(i)"
                                class="item" 
                                :class="{ active: value2 == i }"
                            >
                                <img :src="item.src" class="img" />
                                <!-- <MTPEImage class="img active" :src="item.src" /> -->

                                <!-- <h3 v-if="value2==i">{{ item.title }}</h3> -->
                            </a>
                        </slide>
                    </carousel>
                </div>
            </transition>

            <div v-if="embed" class="embed-yt">
                <div class="overlay" @click="()=> embed = null"></div>

                <iframe width="420" height="315" frameBorder="0" allowfullscreen="allowfullscreen"
                    :src="'https://www.youtube.com/embed/' + embed +'?autoplay=1'">

                </iframe>
            </div>
        </div>

        <!-- <div class="dots">
            <a href="#" class="dot" :class="{ active: slide_o == 1 }" @click.prevent="showSlider(1)"></a>
            <a href="#" class="dot" :class="{ active: slide_o == 2 }" @click.prevent="showSlider(2)"></a>
        </div> -->
    </div>
</template>

<script>
import $ from 'jquery';
import MTPEImage from '@/components/MTPEImage';

export default {
    components: {
        MTPEImage
    },

    data() {
        return {
            value: 0,
            value2: 0,
            embed: null,
            slide_o: 1,
            isMobile: $(window).width() <= 800,
            items: [
                { src: './static/multimedia/ccyld.jpg', title: 'Có chắc yêu là đây', embed: '6t-MjBazs3o', url: 'https://www.youtube.com/watch?v=6t-MjBazs3o&list=PLBcAa442MLAqQaCQQZVQDrAMKA8-e-8s3&index=1' },
                { src: './static/multimedia/htca.jpg', title: 'Hãy trao cho anh', embed: 'knW7-x7Y7RE', url: 'https://www.youtube.com/watch?v=knW7-x7Y7RE&list=PLBcAa442MLAqQaCQQZVQDrAMKA8-e-8s3&index=4' },
                { src: './static/multimedia/cnd.jpg', title: 'Chạy ngay đi', embed: '32sYGCOYJUM', url: 'https://www.youtube.com/watch?v=32sYGCOYJUM&list=PLBcAa442MLAqQaCQQZVQDrAMKA8-e-8s3&index=6' },
                { src: './static/multimedia/nnca.jpg', title: 'Nơi này có anh', embed: 'FN7ALfpGxiI', url: 'https://www.youtube.com/watch?v=FN7ALfpGxiI&list=PLBcAa442MLAqQaCQQZVQDrAMKA8-e-8s3&index=2' },
                { src: './static/multimedia/lt.jpg', title: 'Lạc trôi', embed: 'Llw9Q6akRo4', url: 'https://www.youtube.com/watch?v=Llw9Q6akRo4&list=PLBcAa442MLAqQaCQQZVQDrAMKA8-e-8s3&index=3' },
                { src: './static/multimedia/ctktvn.jpg', title: 'Chúng ta không thuộc về nhau', embed: 'qGRU3sRbaYw', url: 'https://www.youtube.com/watch?v=qGRU3sRbaYw&list=PLBcAa442MLAqQaCQQZVQDrAMKA8-e-8s3&index=5' },
            ],
            // items2: [
            //     { src: './static/multimedia/v-1.jpg', title: '', embed: 'voM1DhG4BkU', url: 'https://www.youtube.com/watch?v=voM1DhG4BkU&feature=youtu.be&ab_channel=KayTranOfficial' },
            //     { src: './static/multimedia/v-2.jpg', title: '', embed: 'RQAwtijO_GI', url: 'https://www.youtube.com/watch?v=RQAwtijO_GI&feature=youtu.be&ab_channel=KayTranOfficial' },
            // ]
        };
    },
    
    async mounted() {
        window.test = this;

        $(this.$el).find('.VueCarousel-wrapper').css('overflow', 'visible');

        $(document).on('mousewheel', (e)=> {
            if(e.originalEvent.wheelDelta /120 > 0) {
                this.showSlider(1);
            }
            else{
                this.showSlider(2);
            }
        });

        $(window).resize(()=> this.isMobile = $(window).width() <= 800);
    },

    methods: {
        slide(i) {
            setTimeout(()=> this.value = i, 100);
        },
        slide2(i) {
            setTimeout(()=> this.value2 = i, 100);
        },

        showSlider(i) {
            // this.slide_o = i;
            // setTimeout(()=> $(this.$el).find('.VueCarousel-wrapper').css('overflow', 'visible'), 300);
        },

        open(item) {
            if ($(window).width() < 800) {
                window.open(item.url, '_blank');
            } else {
                this.embed = item.embed;
            }
        }
    }
}
</script>

<style scoped>
.secondary {
    display: none;
}

.slide-fade-enter-active {
    transition: all .5s;
    height: auto;
}
.slide-fade-leave-active {
    transition: all .5s;
    height: 0px;
}
.slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(300px);
    opacity: 0;
}

.dots {
    position: fixed;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 40;
}

.dot {
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 1);
    border-radius: 50%;
    border: 2px solid #333;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 1);
    margin: 10px;
    display: block;
    opacity: 0.2;
    transition: all 0.5s;
}
.dot.active {
    background: #333;
    border: 2px solid #fff;
    opacity: 1;
}

.embed-yt {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 9999999;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
}

.embed-yt .overlay {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
}

.embed-yt iframe {
    position: absolute;
    width: 60vw;
    height: 60vh;
    top: 20vh;
    left: 20vw;
}

.multimedia-carousel {
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

.item {
    vertical-align: middle;
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
    .VueCarousel {
        position: absolute;
        transform: translate(0%, -50%);
    }

    .multimedia-carousel {
        /* top: 100px; */
        width: 50%;
        height: 100%;
        transform: translate(-50%, 0%);
    }

    .item.active h3 {
        font-size: 20px;
    }

    .secondary {
        display: block;
        margin-top: 100px;
    }

    .dots {
        display: none;
    }


    .fsl,
    .ssl {
        position: absolute;
        left: 0;
        top: 20%;
        width: 100%;
        height: 1px;
    }

    .ssl {
        top: 60%;
    }
}
</style>


// WEBPACK FOOTER //
// src/components/pages/Multimedia.vue