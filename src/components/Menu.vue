<template>
    <div class="menu">
        <div class="logo">
            <img src="../assets/logo-white.png" />
        </div>

        <a 
            class="menu-toggle" 
            @click="toggleMenu" 
            style="cursor:pointer"
        >
            <i class="fa fa-2x fa-bars" />
        </a>

        <div class="overlay"></div>
        <div v-show="isOpen" class="water"></div>

        <div class="content">
            <div class="content-inner content-inner-desktop visible-md align-items-center">
                <div class="col-menu">
                    <p><router-link :to="{ name: 'AboutUs' }">{{ ee('About Us') }}</router-link></p>
                </div>
                
                <!-- <div class="col-menu">
                    <p><router-link :to="{ name: 'Artist' }">{{ ee('Artist') }}</router-link></p>
                </div> -->

                <div class="col-menu">
                    <!-- <p>NEWS</p> -->
                    <!-- <p><router-link :to="{ name: 'Schedule' }">{{ ee('Schedule') }}</router-link></p>
                    <p><router-link :to="{ name: 'Multimedia' }">{{ ee('Multimedia') }}</router-link></p> -->
                    <p><router-link :to="{ name: 'Shop' }">{{ ee('Shop') }}</router-link></p>
                </div>

                <div class="col-menu">
                    <p><router-link :to="{ name: 'Contact' }">{{ ee('Contact') }}</router-link></p>
                    <p><router-link :to="{ name: 'PrivacyPolicy' }">{{ ee('Privacy Policy') }}</router-link></p>
                    <!-- <p v-if="isVni" @click="switchLang()"><a @click.prevent href="#">English</a></p>
                    <p v-else @click="switchLang()"><a @click.prevent href="#">Tiếng Việt</a></p> -->
                </div>
            </div>

            <div class="content-inner content-inner-mobile row hidden-md align-items-center">
                <div class="col-md-3">
                    <p><router-link :to="{ name: 'AboutUs' }">{{ ee('About Us') }}</router-link></p>
                </div>
                
                <!-- <div class="col-md-3">
                    <p><router-link :to="{ name: 'Artist' }">{{ ee('Artist') }}</router-link></p>
                </div> -->

                <div class="col-md-3">
                    <!-- <p>NEWS</p> -->
                    <!-- <p><router-link :to="{ name: 'Schedule' }">{{ ee('Schedule') }}</router-link></p>
                    <p><router-link :to="{ name: 'Multimedia' }">{{ ee('Multimedia') }}</router-link></p> -->
                    <p><router-link :to="{ name: 'Shop' }">{{ ee('Shop') }}</router-link></p>
                </div>

                <div class="col-md-3">
                    <p><router-link :to="{ name: 'Contact' }">{{ ee('Contact') }}</router-link></p>
                    <p><router-link :to="{ name: 'PrivacyPolicy' }">{{ ee('Privacy Policy') }}</router-link></p>
                    <!-- <p v-if="isVni" @click="switchLang()"><a @click.prevent href="#">English</a></p>
                    <p v-else @click="switchLang()"><a @click.prevent href="#">Tiếng Việt</a></p> -->
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import $ from 'jquery';
import ee from '@/inc/lang';

export default {
    data() {
        return {
            isOpen: false,
            isRunning: false,
            ee
        };
    },

    mounted() {
        $(this.$el).find('a').click(()=> this.closeMenu());
        $(window).on('resize', ()=> {
            $(this.$el).find('.overlay, .content, .content-inner').hide();
            this.closeMenu();
        });
    },

    watch: {
        $route() {
            if (this.$route.name !== 'Menu' && this.isOpen) {
                this.toggleMenu();
            }
        }
    },

    computed: {
        isVni() {
            return localStorage.vni == 1;
        }
    },

    methods: {
        openMenu() {
            return new Promise(resolve=> {
                if (this.isOpen || this.isRunning) return false;
                this.isRunning = true;
    
                var $$ = this.$el.querySelector.bind(this.$el);
    
                // this.$router.push({ name: 'Menu' }).catch(e=>{});
    
                window.$ = $;
    
                var mnu = $(this.$el).find('.menu-toggle');
                var mnuPoint = {
                    left: mnu.offset().left + mnu.width() / 2,
                    top: mnu.offset().top + mnu.height() / 2,
                };

                var size = Math.sqrt(
                    Math.pow(Math.max(mnuPoint.left, $(window).width() - mnuPoint.left), 2) +
                    Math.pow(Math.max(mnuPoint.top, $(window).height() - mnuPoint.top), 2)
                );
    
                $(this.$el).find('.overlay, .content, .content-inner').show();
                $$('.overlay').style.borderWidth = size +'px';

                $('.col-menu').css('margin-right', '0');

                $('.content-inner').hide();

                if ($(window).width() >= 800) {
                    $('.content-inner-desktop').show();

                    $$('.content').style.width = 
                        $$('.content-inner-desktop').style.width = ($(window).width() - $('.content').offset().left * 5/4) + 'px';

                    var menuWidth = 0;
                    $('.col-menu').each(function() {
                        menuWidth += $(this).width();
                    }).css('margin-right', (($(window).width() - $('.content').offset().left * 5/4) - menuWidth) / 4 + 'px');
                } else {
                    $('.content-inner-mobile').show();

                    $$('.content').style.height = 
                        $$('.content-inner-mobile').style.height = ($(window).height() - $('.content').offset().top) + 'px';
                }
    
                $(this.$el).find('.menu-toggle i').css({ color: '#fff' });
    
                setTimeout(()=> $(this.$el).find('.logo').show(), 200);
    
                setTimeout(()=> {
                    this.isRunning = false;
                    $$('.overlay').style.width =
                        $$('.overlay').style.height = (size * 2) +'px';

                    resolve();
                }, 700);
    
                this.isOpen = !this.isOpen;
                return true;
            })
        },

        closeMenu() {
            return new Promise(resolve=> {
                if (!this.isOpen || this.isRunning) return false;
                this.isRunning = true;
    
                var $$ = this.$el.querySelector.bind(this.$el);
    
                // $(this.$el).find('.content').fadeOut(100);
                $(this.$el).find('.content, .content-inner').hide();
    
                setTimeout(()=> {
                    $(this.$el).find('.menu-toggle i').css({ color: '' });
                    $(this.$el).find('.logo').hide();
                    $$('.overlay').style.borderWidth = '0px';
    
                    setTimeout(()=> {
                        this.isRunning = false;

                        $$('.content').style.width =
                            $$('.content').style.height =
                            $$('.content-inner').style.width =
                            $$('.content-inner').style.height = '';

                        $$('.overlay').style.width =
                            $$('.overlay').style.height = '0px';
    
                        $(this.$el).find('.content').show();

                        resolve();
                    }, 700);
                }, 100);
    
                this.isOpen = !this.isOpen;
                return true;
            });
        },

        toggleMenu() {
            if (this.isOpen) {
                this.closeMenu();
            } else {
                this.openMenu();
            }
        },

        switchLang() {
            localStorage.vni = this.isVni? 0: 1;
            this.$router.go();
        }

    }
}
</script>

<style scoped>
.menu {
    width: 150px;
    position: absolute;
    left: 0px;
    top: 200px;
    height: calc(100% - 400px);
    text-transform: uppercase;
    z-index: 20;
}

.logo {
    position: fixed;
    left: 70px;
    top: 50px;
    height: 120px;
    z-index: 30;
    display: none;
}

.logo img {
    height: 100%;
    widows: auto;
}

.menu-toggle {
    display: block;
    position: absolute;
    top: 50%;
    left: 70px;
    transform: translate(-50%, -50%);
    z-index: 22;
    color: #fff;
    /* text-shadow: 
        0px 0px 0px #333, 
        1px 0px 0px #333, 
        0px 1px 0px #333, 
        1px 1px 0px #333, 
        -1px 0px 0px #333,
        0px -1px 0px #333,
        -1px -1px 0px #333; */
    /* mix-blend-mode: exclusion; */

    filter: drop-shadow(0px 0px 6px white);
}

.content-inner-desktop {
    display: flex;
}

.col-menu {
    vertical-align: middle;
}

.menu-toggle:hover {
    color: #fff;
}

.theme-light .menu-toggle {
    color: #000;
    /* text-shadow: 
        0px 0px 0px #fff, 
        1px 0px 0px #fff, 
        0px 1px 0px #fff, 
        1px 1px 0px #fff, 
        -1px 0px 0px #fff,
        0px -1px 0px #fff,
        -1px -1px 0px #fff; */

    /* filter: drop-shadow(0px 0px 6px white); */
    text-shadow: 0px 0px 10px #fff;
}

.overlay {
    position: absolute;
    top: 50%;
    left: 70px;
    transform: translate(-50%, -50%);

    /* background: #000; */
    overflow: hidden;
    width: 0px;
    height: 0px;
    box-sizing: border-box;
    border-radius: 50%;
    z-index: 20;
    border: 0px solid #000;
    transition: border 0.7s;
}

.water {
    position: absolute;
    height:100%;
    width:100%;
    left: 0px;
    top: 0px;
    z-index: 21;
}

.content {
    position: absolute;
    color: #fff;
    background: transparent;
    z-index: 22;

    transform: translateY(-50%);
    top: 50%;
    left: 400px;

    width: 0px;
    transition: width 1.5s;
    overflow: hidden;
    display: none;
}

.content-inner {
    font-size: 25px;
    text-transform: uppercase;
}

a {
    color: #fff;
    text-decoration: none;
}

a:hover {
    color: #0c7b79;
    text-decoration: none;
}

@media screen and (max-width: 1200px) {
    .content {
        left: 200px;
    }

    .content-inner {
        font-size: 20px;
    }

    .logo {
        top: 30px;
        height: 100px;
    }
}

@media screen and (max-width: 800px) {
    .menu {
        width: 100%;
        height: auto;
        top: 40px;
    }

    .menu-toggle {
        top: 0px;
        left: 50%;
        transform: translateX(-50%);
    }

    .overlay {
        top: 17px;
        left: 50%;
    }

    .content {
        top: 70px;
        left: 0px;
        width: 100%;
        height: 0px;
        padding: 0px 20px;
        transform: none;
        text-align: center;
        transition: height 1.5s;
    }

    .content-inner {
        height: 0px;
    }

    .logo {
        height: 80px;
        left: 20px;
        top: 10px;
    }
}
</style>


// WEBPACK FOOTER //
// src/components/Menu.vue