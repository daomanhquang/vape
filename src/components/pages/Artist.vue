<template>
    <PageContainer class="artist">
        <!-- <div class="placeholder" style="width:100vw;height:100vh">
        </div> -->

        <Page class="artists">
            <div class="artists-inner" style="position:relative">
                <div class="background">
                    <!-- <img 
                        v-for="(img, i) in imgs" 
                        :key="i" 
                        :src="img.src" 
                        :class="{ active: value == i}" 
                    /> -->

                    <MTPEImage2
                        class="img"
                        :class="{ active: true }"
                        :src="imgs[value].src" 
                        :imageX="imgs[value].imageX"
                        :images="imgs.map(i=> i.src)"
                    />
                </div>

                <div class="artists-carousel">
                    <div class="selected"></div> 
                    
                    <carousel 
                        :centerMode="true"
                        :perPage="1"
                        v-model="value"
                        :paginationEnabled="false"
                        :scrollPerPage="false"
                    >
                        <slide v-for="(item, i) in imgs" :key="i"><a class="artist-item" :class="{ active: value === i }" href="#" @click.prevent="()=> slide(i)">{{ item.title }}<span></span></a></slide>
                    </carousel>
                </div>
            </div>

            <!-- <div class="slide-intro">
                Slide to switch &lt;
            </div> -->
        </Page>

        <Page @pageScroll="(t,b)=> showPage(1, t, b)">
            <div style="height:100vh">
                <MTPEImage2
                    style="height:100vh"
                    :autoFading="true"
                    :src="details[value][0].back" 
                    :imageX="details[value][0].imageX"
                    :images="details.map(i=> i[0].back)"
                />

                <div 
                    class="textContainer"
                    :class="{ 'theme-light': !details[value][0].themeDark }"
                    style="
                        position: absolute;
                        text-transform: uppercase;
                    "

                    :style="{
                        color: details[value][0].themeDark? '#fff': '#000',
                        top: details[value][0].top,
                        left: details[value][0].left,
                    }"
                >
                    <template v-for="(text, i) in details[value][0].texts">
                        <div :key="value+'_'+i">
                            <TextE1
                                v-for="(seg, j) in text"
                                :key="j" 
                                class="text" 
                                :text="seg" 
                                :style="{
                                    fontWeight: ''
                                }" 
                            />

                            <br />    
                        </div>
                    </template>

                    <p v-if="details[value][0].socials" class="socials">
                        <a v-if="details[value][0].socials.fb" :href="details[value][0].socials.fb" target="_blank"><i class="fab fa-facebook-square"></i></a>
                        <a v-if="details[value][0].socials.ig" :href="details[value][0].socials.ig" target="_blank"><i class="fab fa-instagram-square"></i></a>
                        <a v-if="details[value][0].socials.yt" :href="details[value][0].socials.yt" target="_blank"><i class="fab fa-youtube-square"></i></a>
                        <a v-if="details[value][0].socials.tw" :href="details[value][0].socials.tw" target="_blank"><i class="fab fa-twitter-square"></i></a>
                    </p>
                </div>
            </div>
        </Page>

        <!--
        <template v-for="(pages, i) in details">
            <template v-if="i == value">
                <template
                    v-for="(page, j) in pages"
                >

                    <Page 
                        :key="i + '_' + j"
                        :background="page.back" 
                        :imageX="page.imageX"
                        @pageScroll="(t,b)=> showPage(j + 1, t, b)"
                    >
                        <div style="height:100vh">
                            
                        </div>
                    </Page>

                </template>
            </template>
        </template>

        -->
    </PageContainer>
</template>

<script>
import $ from 'jquery';
import PageContainer from '@/components/PageContainer';
import MTPEImage from '@/components/MTPEImage';
import MTPEImage2 from '@/components/MTPEImage2';
import Page from '@/components/Page';
import TextE1 from '@/components/text/e_1';
import ee from '@/inc/lang';

export default {
    components: {
        PageContainer,
        Page,
        TextE1,
        MTPEImage,
        MTPEImage2
    },

    data() {
        return {
            value: 0,
            imgs: [
                { src: './static/artists/mtp.png', themeDark: false, imageX: 80, imageCssY: true, title: 'Sơn Tùng M-TP' },
                // { src: './static/artists/kaytran.png', themeDark: true, imageX: 78, title: 'Kay Trần' },
                { src: './static/artists/haitu.jpg', themeDark: false, imageX: 20, title: 'HẢI TÚ' },
                // { src: './static/artists/onionn.png', themeDark: true, imageX: 80, title: 'Onionn.' },
                { src: './static/artists/longhalo.jpg', themeDark: false, imageX: 85, title: 'Long Halo' },
                // { src: './static/artists/ben.jpg', themeDark: true, imageX: 80, title: 'Ben Phạm' },
            ],

            details: [
                [
                    { back: './static/artists/mtp_1.jpg', themeDark: false, imageX: 40, top: '40%', left: '50%', texts: [
                        ['SƠN TÙNG M-TP'],
                        [ee('Full name: '), ee('Nguyễn Thanh Tùng')],
                        [ee('DOB: '), ee('July 05, 1994')],
                        [ee('Hometown: '), ee('Thai Binh, Vietnam')],
                        [ee('Occupation: '), ee('Singer, Composer, Actor')],
                    ], socials: {
                        fb: 'https://www.facebook.com/MTP.Fan',
                        ig: 'https://www.instagram.com/sontungmtp/',
                        yt: 'https://www.youtube.com/c/sontungmtp',
                        tw: 'https://twitter.com/sontungmtp777'
                    }},
                    // { back: './static/artists/mtp_2.jpg', themeDark: true, imageX: 40, top: '40%', left: '40%', texts: [
                    //     ['SƠN TÙNG M-TP'],
                    //     [ee('Full name')+ ': ', 'Nguyễn Thanh Tùng'],
                    //     [ee('DOB')+ ': ', 'July 05, 1994'],
                    //     [ee('Hometown')+ ': ', 'Thai Binh, Vietnam'],
                    //     [ee('Occupation')+ ': ', 'Singer, Composer, Actor'],
                    // ]},
                    // { back: './static/artists/mtp_3.jpg', themeDark: true, imageX: 40, top: '40%', left: '40%', texts: [
                    //     ['SƠN TÙNG M-TP'],
                    //     [ee('Full name')+ ': ', 'Nguyễn Thanh Tùng'],
                    //     [ee('DOB')+ ': ', 'July 05, 1994'],
                    //     [ee('Hometown')+ ': ', 'Thai Binh, Vietnam'],
                    //     [ee('Occupation')+ ': ', 'Singer, Composer, Actor'],
                    // ]},
                ],
                
                // [
                //     { back: './static/artists/kaytran_1.jpg', themeDark: true, imageX: 40, top: '40%', left: '50%', texts: [
                //         ['KAY TRẦN'],
                //         [ee('Full name: '), ee('Trần Anh Khoa')],
                //         [ee('DOB: '), ee('May 06, 1994')],
                //         [ee('Hometown: '), ee('Ho Chi Minh city, Vietnam')],
                //         [ee('Occupation: '), ee('Singer, Composer, Actor')],
                //     ], socials: {
                //         fb: 'https://www.facebook.com/tuitenlakay',
                //         ig: 'https://www.instagram.com/kaytran65/',
                //         yt: 'https://www.youtube.com/c/KayTranOfficial',
                //         tw: 'https://twitter.com/kaytran0605'
                //     }}
                // ],


                [
                    { back: './static/artists/haitu_1.jpg', themeDark: true, imageX: 70, top: '40%', left: '20%', texts: [
                        ['HẢI TÚ'],
                        [ee('Full name: '), ee('Lê Quang Hải Tú')],
                        [ee('DOB: '), ee('November 12, 1997')],
                        [ee('Hometown: '), ee('Ho Chi Minh city, Vietnam')],
                        [ee('Occupation: '), ee('Actress')],
                    ], socials: {
                        fb: 'https://www.facebook.com/lqdna',
                        ig: 'https://www.instagram.com/lq.haitu/',
                        tw: 'https://twitter.com/haitu_lq'
                    }}
                ],
                
                // [
                //     { back: './static/artists/onionn_1.jpg', themeDark: false, imageX: 20, top: '40%', left: '50%', texts: [
                //         ['ONIONN.'],
                //         [ee('Full name: '), ee('Nguyễn Ngọc Hoàng Anh')],
                //         [ee('DOB: '), ee('October 9,1993')],
                //         [ee('Hometown: '), ee('Hanoi, Vietnam')],
                //         [ee('Occupation: '), ee('Music Producer, DJ')],
                //     ], socials: {
                //         fb: 'https://www.facebook.com/therealonionn',
                //         ig: 'https://www.instagram.com/therealonionn/',
                //         tw: 'https://twitter.com/therealonionn'
                //     }}
                // ],
                
                [
                    { back: './static/artists/longhalo_1.jpg', themeDark: true, imageX: 70, top: '40%', left: '10%', texts: [
                        ['LONG HALO'],
                        [ee('Full name: '), ee('Nguyễn Hàm Long')],
                        [ee('DOB: '), ee('August 29, 1988')],
                        [ee('Hometown: '), ee('Hanoi, Vietnam')],
                        [ee('Occupation: '), ee('Event/Show Director, Music Producer')],
                    ], socials: {
                        fb: 'https://www.facebook.com/halo.long'
                    }}
                ],
                
                // [
                //     { back: './static/artists/ben_1.jpg', themeDark: false, imageX: 20, top: '40%', left: '50%', texts: [
                //         ['BEN PHẠM'],
                //         [ee('Full name: '), ee('Phạm Bá Trường Quang')],
                //         [ee('DOB: '), ee('September 06, 1998')],
                //         [ee('Hometown: '), ee('Ho Chi Minh city, Vietnam')],
                //         [ee('Occupation: '), ee('Creative/Art Director, Actor')],
                //     ], socials: {
                //         fb: 'https://www.facebook.com/BenPham1998',
                //         ig: 'https://www.instagram.com/bnphm0609/'
                //     }}
                // ],
                
            ]
        };
    },

    async mounted() {
        $(this.$el).find('.VueCarousel-wrapper').css('overflow', 'visible');
        this.$store.state.themeDark = false;

        (()=> {
            var pos;

            $(this.$el).find('.page.artists').on('touchstart', (e)=> {
                pos = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY,
                };
            });

            $(this.$el).find('.page.artists').on('touchend', (e)=> {
                // console.log(e);
                
                var cpos = {
                    x: e.changedTouches[0].clientX,
                    y: e.changedTouches[0].clientY,
                };

                var mx = $(this.$el).width() / 10;
                var x = cpos.x - pos.x;

                // console.log(x, mx);

                if (x > mx) {
                    var value = Math.max(0, this.value - 1);
                } else if (x < -mx) {
                    var value = Math.min(this.value + 1, this.imgs.length - 1);
                }

                this.slide(value);
            });
        })();
    },

    watch: {
        value() {
            this.slide(this.value);
        }
    },

    methods: {
        log(...args) {
            console.log(args);
        },

        async slide(i) {
            if (this.value != i) {
                $('.slide-intro').hide();
                this.$store.state.themeDark = this.imgs[i].themeDark;
                this.value = i;

                setTimeout(()=> $(this.$el).trigger('scroll'), 100);
            }
        },

        async showPage(i, t, b) {
            var $page = $($(this.$el).find('.page').get(i)).find('.textContainer');

            var l = $page.offset().top + $page.height() / 2;

            if (b > l) {
                var texts = $page.find('.text'); 

                const fi = (i=0)=> {
                    if (i >= texts.length) return; 
                    $(texts.get(i)).trigger('show');
                    setTimeout(fi, 500, i+1);
                };
                fi();
            }
        }
    }
}
</script>

<style scoped>
.page {
    height: 100vh;
}

.artists-inner {
    height: calc(100% - 100px);
}

.artist {
    /* background: #fff; */
}

@keyframes slide {
    from {background-position-x: 0px;}
    to {background-position-x: -170px;}
}

.artist-item.active {
    background-clip: text;
    -webkit-background-clip: text;
    background-image: url(/static/text-slide.jpg);
    background-size: 100% 110%;
    color: transparent !important;
    animation: slide 3s infinite;
}

.slide-intro {
    font-size: 20px;
    background-clip: text;
    -webkit-background-clip: text;
    background-image: url(/static/text-slide.jpg);
    background-size: 100% 110%;
    color: transparent;
    animation: slide 3s infinite;
    -webkit-text-stroke: 1px rgba(255,255,255,0.5);
    font-weight: bold;
    /* text-shadow: 0px 0px 20px #fff; */
    position: absolute;
    right: 30px;
    bottom: 200px;
    z-index: 998;
    display: none;
}

.socials a {
    color: #fff;
    font-size: 25px;
    text-shadow: 0px 0px 10px #fff;
}

.theme-light .socials a {
    color: #333;
}

.scroll-container,
.background,
.background .img,
.transferer {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.background .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 1s;
}

.background .img.active {
    opacity: 1;
}

.scroll-container {
    z-index: 10;
}

.artists-carousel {
    position: absolute;
    left: 50vw;
    bottom: -70px;
    z-index: 10;

    width: 30vw;
    transform: translateX(-50%);
}

.artists-carousel .selected {
    position: absolute;
    width: 200px;
    height: 100%;
    left: 50%;
    margin-left: -100px;
    border: 3px solid #333;
    border-radius: 5px;
    /* transition: all 0.5s; */
}

.theme-light .artists-carousel .selected {
    border-color: #333;
}

.VueCarousel-slide {
    text-align: center;
}

.VueCarousel-slide + .VueCarousel-slide:before {
    content: '';
    position: absolute;
    display: block;
    content: '';
    /* height: 1px; */
    /* background: #fff; */
    border-top: 1px solid #666;
    border-bottom: 1px solid #ccc;
    width: calc(100% - 250px);
    top: 50%;
    transform: translateX(-50%);
}

.theme-light .VueCarousel-slide + .VueCarousel-slide:before {
    /* background: #333; */
}

.artist-item {
    display: inline-block;
    width: 200px;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 30px;
    /* line-height: 36px; */
    color: #333;
    /* filter: drop-shadow(0px 0px 6px white); */
    /* text-shadow: 1px 0px 0px #fff; */
    /* font-family: 'Open Sans Condensed', sans-serif; */
    /* font-weight: bold; */
    font-family: SFUDinCons;
    /* text-shadow: 
        0px 0px 2px #333, 
        1px 0px 0px #333, 
        0px 1px 0px #333, 
        1px 1px 0px #333, 
        -1px 0px 0px #333,
        0px -1px 0px #333,
        -1px -1px 0px #333; */

    text-shadow: 0px 0px 10px #fff;
    /* border: 1px solid #fff; */
    outline: none;
    border-radius: 5px;
}

.theme-light .artist-item {
    color: #000;
    /* text-shadow: 1px 0px 0px #333; */
    /* text-shadow: 
        0px 0px 2px #fff, 
        1px 0px 0px #fff, 
        0px 1px 0px #fff, 
        1px 1px 0px #fff, 
        -1px 0px 0px #fff,
        0px -1px 0px #fff,
        -1px -1px 0px #fff; */
}

.artist-item + .artist-item {

}

.theme-light .artist-item:hover,
.artist-item:hover {
    text-shadow: none;
    color: #0c7b79;
}

.zoomed-text {
    width: auto;
    white-space: nowrap;
}

.zoomed-text span {
    display: inline-block;
    padding: 20px;
    opacity: 0;
    font-size: 60px;
    transition: all 1s ease;
}

.active .zoomed-text span {
    padding: 3px;
    font-size: 25px;
    opacity: 1;
}

.section2 img {
    /* transform: scale(1.3); */
    /* transition: all 1.2s ease; */
    opacity: 1;
}

/* .section2.active img {
    transform: scale(1);
    opacity: 1;
} */

.text {
    /* font-family: 'Open Sans Condensed', sans-serif; */
    font-family: SFUDinCons;
    font-size: 30px;
    padding-right: 20px;
    /* filter: drop-shadow(0px 0px 6px white); */
    text-shadow: 0px 0px 10px #fff;
    /* text-shadow: 
        0px 0px 2px #333, 
        1px 0px 0px #333, 
        0px 1px 0px #333, 
        1px 1px 0px #333, 
        -1px 0px 0px #333,
        0px -1px 0px #333,
        -1px -1px 0px #333; */
}

.textContainer.theme-light .text {
    /* text-shadow: 
        0px 0px 2px #fff, 
        1px 0px 0px #fff, 
        0px 1px 0px #fff, 
        1px 1px 0px #fff, 
        -1px 0px 0px #fff,
        0px -1px 0px #fff,
        -1px -1px 0px #fff; */
}

.text_e_1 {
    padding-right: 10px;
}

@media screen and (max-width: 1200px) {
    .text {
        font-size: 20px;
    }
}  

@media screen and (max-width: 800px) {
    @keyframes slide {
        from {background-position-x: 0px;}
        to {background-position-x: -120px;}
    }

    .slide-intro {
        display: block;
    }

    .page {
        height: calc(100% - 75px);
    }

    .background .img {
        /* height: calc(100% - 150px); */
    }

    .background .img.img-css-y {
        top: 130px;
        width: 100%;
        height: calc(100% - 130px);
    }

    .artist-item {
        font-size: 25px;
        width: 150px;
        color: #333;
    }

    .artists-carousel .selected {
        width: 50%;
        min-width: 150px;
        transform: translateX(-50%);
        margin-left: 0px;
        border-color: #333;
    }
    
    .artists-carousel {
        width: 50vw;
        /* bottom: 100px; */
    }

    .text {
        font-size: 15px;
    }

    .VueCarousel-slide + .VueCarousel-slide:before {
        /* width: 10%; */
    }
}
</style>


// WEBPACK FOOTER //
// src/components/pages/Artist.vue