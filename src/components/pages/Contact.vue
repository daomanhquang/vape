<template>
    <div class="contact">
        <div class="row">
            <div class="col-md-12">
                <h1>M-TP TALENT</h1>

                <hr />

                <p>
                    <strong>{{ ee('Address') }}:</strong>
                    <span>{{ ee('77 Hoang Van Thai, District 7, Ho Chi Minh city, Vietnam') }}</span>
                </p>

                <p>
                    <strong>{{ ee('Email') }}:</strong>
                    <span>booking@mtptalent.com</span>
                </p>

                <p>
                    <strong>{{ ee('Phone') }}:</strong>
                    <!-- <span>+84 028 5410 2202</span> -->
                    <span>092 798 7919</span>
                </p>

                <p>
                    <a href="https://www.instagram.com/mtptalent/" target="_blank">INSTAGRAM</a>
                    <a href="https://www.facebook.com/mtptalent" target="_blank">FACEBOOK</a>
                </p>
            </div>
            <div class="col-4"></div>
        </div>

        <!-- <div class="googlemap">
            <div id="map"></div>
        </div> -->
    </div>
</template>

<script>
/* global google */
import $ from 'jquery';
import ee from '@/inc/lang'; 

export default {
    data() {
        return {
            ee
        }
    },

    mounted() {
        // this.initGGMap();
    },

    methods: {
        initGGMap() {
            var scrEl = document.createElement('script');
            scrEl.type = 'text/javascript';
            scrEl.defer = true;
            scrEl.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC4O5kYlz_m2FQd7Yrmhv27BYb-0Z0P1vE&callback=initMap';
            $(this.$el).append(scrEl);

            window.initMap = this.initMap;
        },

        initMap() {
            var mtpe = {lat: 10.730056, lng: 106.7200313};
            var map = new google.maps.Map(
                document.getElementById('map'), {zoom: 17, center: mtpe}
            );
            var marker = new google.maps.Marker({position: mtpe, map: map});
        }
    }
}
</script>

<style scoped>
.contact {
    font-size: 20px;
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
// src/components/pages/Contact.vue