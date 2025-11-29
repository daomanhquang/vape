<template>
    <div :class="{ 
                'theme-light': $route.meta && $route.meta.themeDark !== undefined
                    ? !$route.meta.themeDark
                    : !$store.state.themeDark 
            }">

        <Background v-show="defaultBackground || !$store.state.endLoading" />

        <a 
            v-if="$route.meta.logo !== false && $store.state.logo !== false" 
            class="logo" 
            @click="()=> null? goHome(): null"
        >
            <img 
                v-if="
                    $route.meta && $route.meta.themeDark !== undefined
                    ? $route.meta.themeDark
                    : $store.state.themeDark" 
                    
                src="@/assets/logo-white.png" 
            />

            <img v-else src="@/assets/logo-black.png" />
        </a>
        
        <h1 class="title">{{ ee($route.meta.title) }}</h1>

        <div id="extools">
            <router-link :to="{ name:'Cart' }" v-if="userId"><i class="fa fa-shopping-cart"></i></router-link>
            
            <a 
                href="#" 
                class="account" 
                v-show="userId" 
                @mouseover="showProfile"
                @mouseleave="hideProfile"
                @click.prevent="showProfile"
            >
                <i class="far fa-user-circle"></i>

                <ul ref="profile">
                    <li><a href="#" @click.prevent="$router.push({ name: 'UpdateAccount' })">Profile</a></li>
                    <li><a href="#" @click.prevent="$router.push({ name: 'Logout' })">Logout</a></li>
                </ul>
            </a>

            <a href="#" @click.prevent="$router.push({ name: 'Login' })" v-if="!userId"><i class="fas fa-sign-in-alt"></i></a>

            <a href="#" @click.prevent="switchLang">
                <span :style="{ 'color': isVni? 'rgba(0,0,0,0.3)': '#000' }">EN</span>
                /
                <span :style="{ 'color': isVni? '#000': 'rgba(0,0,0,0.3)' }">VN</span>
            </a>
        </div>
        
        <Menu ref="menu" />

        <main :class="{ 'extended-theme': defaultBackground }">
            <router-view v-if="$route.name != 'Artist'" />
        </main>
    </div>
</template>

<script>
import Menu from './Menu';
import Background from './Background';

import ee from '@/inc/lang';

import AboutUsPage from './pages/AboutUs';
import ContactPage from './pages/Contact';
import SchedulePage from './pages/Schedule';
import MultimediaPage from './pages/Multimedia';
import ArtistPage from './pages/Artist';
import $ from 'jquery';

export default {
    components: {
        Menu,
        Background,
        AboutUsPage,
        ContactPage,
        SchedulePage,
        MultimediaPage,
        ArtistPage
    },

    data() {
        return {
            cback: true,
            ee
        };
    },

    mounted() {
        // setTimeout(()=> {
        //     $(this.$el).find('.account').hover(
        //         ()=> $(this.$el).find('.account ul').stop().fadeIn(300),
        //         ()=> $(this.$el).find('.account ul').stop().fadeOut(300),
        //     )
        //     .click(()=> $(this.$el).find('.account ul').stop().fadeIn(300));

        //     console.log($(this.$el).find('.account ul'));
    
        //     $(this.$el).find('.account li a').click(()=> $(this.$el).find('.account ul').stop().fadeOut(300));
        // }, 100);
    },

    computed: {
        defaultBackground() {
            return this.cback = this.$route.meta && this.$route.meta.background !== undefined
                    ? typeof this.$route.meta.background === 'string'? false: this.$route.meta.background
                    : this.cback;
        },

        isVni() {
            return localStorage.vni == 1;
        },

        userId() {
            return this.$store.state.userId;
        }
    },

    methods: {
        async goHome() {
            await this.$refs.menu.openMenu();
            this.$router.push({ name: 'Index' });
            await this.$refs.menu.closeMenu();
        },

        switchLang() {
            localStorage.vni = this.isVni? 0: 1;
            location.reload();
        },

        showProfile() {
            $(this.$refs.profile).stop().fadeIn(300);
        },

        hideProfile() {
            $(this.$refs.profile).stop().fadeOut(300);
        },
    }
}
</script>

<style scoped>
.logo {
    position: absolute;
    display: block;
    left: 70px;
    top: 50px;
    height: 120px;
    z-index: 19;
    cursor: pointer;
}

#extools {
    position: absolute;
    right: 50px;
    top: 120px;
    z-index: 20;
    font-size: 20px;
    font-weight: bold;
}

#extools a {
    color: #000;
    text-shadow: 0px 0px 10px #fff;
}

#extools a + a {
    margin-left: 20px;
}

.account {
    position: relative;
}

.account ul {
    display: none;
    position: absolute;
    right: 0px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.3);
}

.account ul,
.account li {
    margin: 0px;
    padding: 0px;
    list-style-type:none;
}

.account li {
    padding: 5px 20px;
}

/* .account:hover ul {
    display: block;
} */

.logo img {
    height: 100%;
    widows: auto;
}

h1.title {
    position: absolute;
    left: 200px;
    top: 120px;
    z-index: 20;

    font-weight: normal;
    margin: 0px;
    color: #fff;
    display: inline-block;
    vertical-align: bottom;
    margin-left: 100px;
    font-size: 30px;
    text-transform: uppercase;
    /* text-shadow: 
        0px 0px 0px #333, 
        1px 0px 0px #333, 
        0px 1px 0px #333, 
        1px 1px 0px #333, 
        -1px 0px 0px #333,
        0px -1px 0px #333,
        -1px -1px 0px #333; */

    /* filter: drop-shadow(0px 0px 6px white); */

    text-shadow: 0px 0px 10px #fff;

    /* mix-blend-mode: difference; */
}

main.extended-theme {
    position: absolute;
    z-index: 10;
    width: 100%;
    padding: 0px 200px 0px 300px;
    color: #fff;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
}

.theme-light main {
    color: #000;
}

.theme-light h1.title {
    color: #000;
    /* text-shadow: 
        0px 0px 0px #fff, 
        1px 0px 0px #fff, 
        0px 1px 0px #fff, 
        1px 1px 0px #fff, 
        -1px 0px 0px #fff,
        0px -1px 0px #fff,
        -1px -1px 0px #fff; */
}

@media screen and (max-width: 1200px) {
    .logo {
        height: 100px;
        top: 30px;
    }

    h1.title {
        font-size: 25px;
        left: 100px;
        top: 90px;
    }

    main.extended-theme {
        padding-left: 200px;
        padding-right: 100px;
    }
}

@media screen and (max-width: 800px) {
    .logo {
        height: 80px;
        left: 20px;
        top: 10px;
    }

    #extools {
        top: 50px;
        right: 20px;
        font-size: 15px;
    }

    #extools a + a {
        margin-left: 5px;
    }

    h1.title {
        left: 50%;
        margin: 0px;
        transform: translateX(-50%);
        font-size: 20px;
        text-align: center;
    }

    main.extended-theme {
        padding: 20px;
        top: 160px;
        transform: none;
        overflow-x: hidden;
        overflow-y: auto;
        height: calc(100% - 160px);
    }
}
</style>


// WEBPACK FOOTER //
// src/components/Layout.vue