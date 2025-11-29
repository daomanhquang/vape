<template>
    <div class="schedule">
        <div class="schedule-container">
            <div class="schedule-carousel">
                <carousel 
                    :centerMode="true"
                    :perPage="1"
                    v-model="imonth"
                    :paginationEnabled="false"
                    :scrollPerPage="false"
                >
                    <slide v-for="(month, i) in months" :key="month">
                        <a 
                            :class="{ selected: imonth == i }" 
                            class="month-item" 
                            href="#" 
                            @click.prevent="()=> selectMonth(i)"
                        >
                            {{ ee(imonth == i? month: month.substring(0, 3)) }}
                        </a>
                    </slide>
                </carousel>
            </div>
        </div>

        <div class="diw-title diw-row">
            <div v-for="diw in diws" :key="diw" class="diw">{{ diw }}</div>
        </div>

        <div class="diw-dates diw-row">
            <div v-for="d in ldate" :key="d" class="diw">
                <div>{{ d - sdate > 0? d - sdate: '' }}</div>

                <!-- <a href="#" @click.prevent v-if="d - sdate == 2" class="diw-note">
                    <h5>Sơn Tùng M-TP</h5>
                    <h5>Oppo</h5>
                    <div>20:00 Văn hóa lao động</div>
                </a> -->
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import ee from '@/inc/lang';

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const DIW = [ee('Mon'),ee('Tue'),ee('Wed'),ee('Thu'),ee('Fri'),ee('Sat'),ee('Sun')];

export default {
    data() {
        return {
            months: [],
            imonth: 0,
            diws: DIW,
            sdate: 0,
            ldate: 0,
            ee
        };
    },

    mounted() {
        this.months = MONTHS.slice(new Date().getMonth(), new Date().getMonth() + 3);
        $(this.$el).find('.VueCarousel-wrapper').css('overflow', 'visible');

        this.buildMonth(0);
    },

    methods: {
        selectMonth(i) {
            this.imonth = i;
            this.buildMonth(i);
        },

        getDIW(i) {
            return i - 1 >= 0? i-1: 6;
        },

        buildMonth(i) {
            var c = new Date();
            var yyyy = c.getFullYear();
            var cdate = c.getDate();
            var mm = c.getMonth();

            var fdomw = new Date(yyyy, mm+i, 1).getDay();
            var ldom = new Date(yyyy, mm+i+1, 0).getDate();
            
            this.sdate = this.getDIW(fdomw);
            this.ldate = ldom + this.sdate;
        }
    }
}
</script>

<style scoped>
.schedule {
    padding-top: 300px;
    color: #333;
}

.schedule-container {
    position: relative;
    height: 50px;
    margin-bottom: 50px;
}

.schedule-carousel {
    position: absolute;
    left: 50%;
    top: 0px;
    z-index: 10;
    text-align: center;
    width: 20%;
    min-width: 200px;
    transform: translateX(-50%);
    vertical-align:bottom;
}

.month-item {
    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translateX(-50%);

    display: inline-block;
    width: 150px;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 20px;
    color: #333;
    /* font-family: 'Open Sans Condensed', sans-serif; */
    text-shadow: 0px 0px 0px #333;
    border: 1px solid #333;
    outline: none;
    border-radius: 5px;
    vertical-align:bottom;
    transition: width 0.5s;
}

.month-item.selected {
    font-size: 30px;
    width: 200px;
}

.VueCarousel-slide {
    position: relative;
    height: 50px;
}

.diw {
    position: relative;
    text-align: right;
    width: 14.28%;
    height: 70px;
    float: left;
    font-size: 20px;
    text-transform: uppercase;
    /* font-family: 'Open Sans Condensed', sans-serif; */
}

.diw-title .diw {
    font-size: 25px;
}

.diw-dates {
    height: 600px;
}

.diw-note {
    position: absolute;
    bottom: 30px;
    right: 0px;
    height: 0px;
    width: 50px;
    background: #666;
    overflow: hidden;
    border-radius: 5px;
    z-index: 99;
    padding: 5px 10px;
    /* transition: all 0.5s; */
    font-size: 15px;
    color: #fff;
    text-decoration: none;
}

.diw-note:hover {
    height: auto;
    width: 200px;
}

@media screen and (max-width: 1200px) and (max-height: 900px){
    .diw {
        font-size: 15px;
        height: 60px;
    }

    .diw-note {
        width: 50%;
        bottom: 20px;
        font-size: 15px;
    }

    .diw-dates {
        height: auto;
    }

    h5 {
        font-size: 20px;
    }

    .diw-note:hover {
        /* width: 300%; */
    }

    .diw-title .diw {
        font-size: 20px;
    }

    .month-item {
        font-size: 15px;
        width: 100px;
    }

    .month-item.selected {
        font-size: 20px;
        width: 150px;
    }

    .schedule-container {
        margin-bottom: 30px;
    }
}

@media screen and (max-width: 800px) {
    .diw-title .diw {
        font-size: 15px;
    }

    .diw-dates {
        height: auto;
    }

    .schedule-carousel {
        width: 50%;
    }

    .schedule {
        padding-top: 0px;
    }
}
</style>


// WEBPACK FOOTER //
// src/components/pages/Schedule.vue