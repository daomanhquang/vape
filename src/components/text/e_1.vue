<template>
    <div class="text_e_1" :class="{ loaded: loaded, trans: trans }">
        <span ref="c" class="c" :class="{ cs: c==' ' }" v-for="(c, i) in text" :key="i">{{ c }}</span>
    </div>
</template>

<script>
import $ from 'jquery';

export default {
    props: [
        'text',
    ],

    data() {
        return {
            loaded: false,
            trans: false,
            isShowed: false
        };
    },

    mounted() {
        setTimeout(()=> {
            // $(this.$el).css({
            //     width: $(this.$el).outerWidth(),
            //     height: $(this.$el).outerHeight(),
            // });

            $(this.$el)
                .on('show', this.show)
                .on('hide', this.hide);
        });
    },

    methods: {
        show(speed=10) {
            if (this.isShowed) return;
            this.isShowed = true;

            $(this.$el).css({
                width: $(this.$el).outerWidth(),
                height: $(this.$el).outerHeight(),
            });

            this.loaded = true;

            setTimeout(()=> {
                this.trans = true;

                const ic = (i=0)=> {
                    $(this.$refs.c[i]).addClass('s');
                    setTimeout(ic, speed, i+1);
                };
                ic();
            }, 100);
        },

        hide(speed=10) {
            if (!this.isShowed) return;
            this.isShowed = false;

            const ic = (i=0)=> {
                $(this.$refs.c[i]).removeClass('s');
                setTimeout(ic, speed, i+1);
            };
            ic();
        },

        toggle(speed=10) {
            if (this.isShowed) {
                this.hide(speed);
            } else {
                this.show(speed);
            }
        }
    }
}
</script>

<style scoped>
.text_e_1 {
    display: inline-block;
    white-space: nowrap;
    overflow: visible;
}

.c {
    display: inline-block;
    opacity: 0;
}

.c.cs {
    display: inline;
}

.text_e_1.loaded > .c {
    padding: 0px 1px;
    opacity: 0;
    transform: scale(2);
}

.text_e_1.loaded.trans > .c {
    transition: 
        transform 0.4s, 
        padding 1s, 
        opacity 1s;
}

.text_e_1.loaded > .c.s {
    padding: 0px;
    transform: scale(1);
    opacity: 1;
}
</style>


// WEBPACK FOOTER //
// src/components/text/e_1.vue