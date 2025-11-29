<template>
    <div class="mtpe-image">
        <img class="image-background" v-if="!loaded || render===false" ref="image" :src="src" :alt="alt" />
        <canvas v-else ref="main" />
    </div>
</template>

<script>
import * as PIXI from "pixi.js";
// import { GlitchFilter } from '@pixi/filter-glitch';

import $ from "jquery";

export default {
    props: [
        'src',
        'alt',
        'glitch',
        'imageX',
        'render'
    ],

    data() {
        return {
            loaded: false,
            app: null,
            width: 0,
            height: 0,
            radio: 0,
            inited: false,
            showed: false, 
            first: true,
        };
    },

    watch: {
        src() {
            this.reloadPage();
        }
    },

    mounted() {
        this.reloadPage();
    },

    beforeDestroy() {
        this.cdestroy();
        this.stopped = true;
        this.loaded = false;
    },

    methods: {
        cdestroy() {
            if (!this.cdestroyed) {
                this.cdestroyed = true;
                if (this.app) {
                    this.app.stop();
                    this.app.destroy();
                }
            }
        },

        cstop() {
            if (this.app && !this.cdestroyed) {
                this.app.stop();
            }
        },

        reloadPage() {
            this.cdestroy();

            this.first = true;
            this.loaded = false;
            this.width = this.height = 0;

            this.$nextTick(()=> {
                this.$refs.image.onload = ()=> {
                    this.radio = 
                        $(this.$refs.image).width() /
                        $(this.$refs.image).height();

                    this.loaded = true;
                    this.$nextTick(this.init);

                    // console.log('load', this.src);
                };
            });
        },

        init() {
            if (this.stopped) return;

            this.cdestroyed = false;
            var app = (this.app = new PIXI.Application({
                transparent: true,
                view: this.$refs.main,
                resizeTo: this.$refs.main,
                antialias: false
            }));

            var radius = 30;
            var blurSize = 20;

            var circle = new PIXI.Graphics()
                .lineStyle(0)
                .beginFill(0xFF0000)
                .drawCircle(radius + blurSize, radius + blurSize, radius)
                .endFill();

            circle.filters = [new PIXI.filters.BlurFilter(blurSize)];

            const bounds = new PIXI.Rectangle(0, 0, (radius + blurSize) * 2, (radius + blurSize) * 2);
            const texture = app.renderer.generateTexture(circle, PIXI.SCALE_MODES.NEAREST, 1, bounds);
            const focus = new PIXI.Sprite(texture);

            var imgTexture = PIXI.Texture.from(this.src);

            var backg = this.backg = new PIXI.Sprite.from(imgTexture);

            var matrix = this.createMatixTileSprite(app.screen.width, app.screen.height);
            matrix.alpha = 0.5;

            var foreg = this.foreg = new PIXI.Sprite.from(imgTexture);
            // foreg.tint = 0xddfeff;

            var container = new PIXI.Container();
            container.addChild(foreg);
            container.addChild(matrix);

            app.stage.addChild(backg);
            app.stage.addChild(container);
            app.stage.addChild(focus);

            container.mask = focus;
            container.visible = false;
            
            var disp = PIXI.Sprite.from('/static/disp2.jpg');

            var dispFilter = new PIXI.filters.DisplacementFilter(disp);
            disp.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
            dispFilter.padding = disp.width;
            
            foreg.filters = [ 
                dispFilter,
            ];

            // if (this.glitch) {
            //     var glitchFilter = new GlitchFilter({
            //         offset: 1,
            //         red: [0, 0]
            //     });
    
            //     backg.filters = [ glitchFilter ];

            //     var randomGlitch = ()=> {
            //         if (!this.loaded) return;

            //         setTimeout(()=> {
            //             glitchFilter.red = [
            //                 Math.random() * 10,
            //                 Math.random() * 10,
            //             ];

            //             setTimeout(()=> glitchFilter.red=[0, 0], Math.min(Math.random() * 1000, 100));
            //             randomGlitch();
            //         }, Math.max(Math.random() * 5000, 1000));
            //     };
            //     randomGlitch();
            // }
            
            app.stage.interactive = true;

            var cpos = null;
            var count = 1;
            var timer = 0;

            app.stage.on('mousemove', (event) => {
                count = Math.min(count + 0.2, 3);
                cpos = { x: event.data.global.x, y: event.data.global.y };
                this.app.start();

                clearTimeout(timer);
                timer = setTimeout(()=> this.cstop(), 1000);
            });

            app.stage.on('mouseout', ()=> cpos = null);

            app.ticker.add((delta)=> {
                if (!cpos) {
                    return container.visible = false;
                }

                container.visible = true;

                focus.scale.set(count);

                focus.position.x = cpos.x - focus.width / 2;
                focus.position.y = cpos.y - focus.height / 2;

                count = Math.max(1, count / 1.05);
                if (this.first) {
                    this.first = false;
                    setTimeout(()=>  this.cstop());
                }
            });

            if (!this.inited) {
                this.inited = true;
                this.resize();
            }
        }, 

        resize() {
            if (!this.loaded) return this.inited = false;

            var offset = $(this.$el).offset();
            offset.right = offset.left + $(this.$el).width();
            offset.bottom = offset.top + $(this.$el).height();

            // if (
            //     this.render === false
            //     || offset.left >= $(window).width()
            //     || offset.top >= $(window).height()
            //     || offset.bottom <= 0
            //     || offset.bottom <= 0
            // ) {
            //     // if (this.showed) console.log(this.$el);
            //     if (this.showed) this.cstop();
            //     this.showed = false;
            // } else {
            //     if (!this.showed) this.app.start();
            //     this.showed = true;
            // }

            if (this.width != $(this.$el).width() || this.height != $(this.$el).height()) {
                this.app.start();

                this.width = $(this.$el).width();
                this.height = $(this.$el).height();

                var imgW = this.width;
                var imgH = imgW / this.radio;

                if (imgH < this.height) {
                    imgH = this.height;
                    imgW = imgH * this.radio;
                }

                // console.log(this.width, this.height);

                this.backg.width = this.foreg.width = imgW;
                this.backg.height = this.foreg.height = imgH;

                if (this.imageX == 'right') {
                    this.backg.x = this.foreg.x = this.width - imgW;
                } else if (this.imageX == 'left') {
                    this.backg.x = this.foreg.x = 0;
                } else if (typeof this.imageX == 'string' && this.imageX[0] == '+') {
                    this.backg.x = this.foreg.x = Number.parseFloat(this.imageX.substring(1));
                } else if (typeof this.imageX == 'number') {
                    this.backg.x = this.foreg.x = (this.width - imgW) * this.imageX / 100;
                } else {
                    this.backg.x = this.foreg.x = (this.width - imgW) / 2;
                }

                if (this.imageY == 'bottom') {
                    this.backg.y = this.foreg.y = this.height - imgH;
                } else if (this.imageY == 'top') {
                    this.backg.y = this.foreg.y = 0;
                } else if (typeof this.imageY == 'string' && this.imageY[0] == '+') {
                    this.backg.y = this.foreg.y = Number.parseFloat(this.imageY.substring(1));
                } else if (typeof this.imageY == 'number') {
                    this.backg.y = this.foreg.y = (this.height - imgH) * this.imageY / 100;
                } else {
                    this.backg.y = this.foreg.y = (this.height - imgH) / 2;
                }

                this.app.renderer.resize(this.width, this.height);

                if (!this.first) setTimeout(()=> this.cstop(), 1000);
            }
            
            setTimeout(this.resize, 1000);
        },

        createMatixTileSprite(width, height, tileSize=100) {
            var graph = new PIXI.Graphics();

            graph.lineStyle(1, 0xAAAAAA)
                .moveTo(0, 0)
                .lineTo(tileSize, tileSize)
                .moveTo(0, tileSize)
                .lineTo(tileSize, 0)

                .moveTo(tileSize, 0)
                .lineTo(tileSize, tileSize)
                .moveTo(0, tileSize)
                .lineTo(tileSize, tileSize);

            const bounds = new PIXI.Rectangle(0, 0, tileSize, tileSize);
            const texture = this.app.renderer.generateTexture(graph, PIXI.SCALE_MODES.NEAREST, 1, bounds);

            return new PIXI.TilingSprite(
                texture,
                width,
                height,
            );
        },
    },
};
</script>

<style scoped>
canvas {
    position: relative;
    width: 100%;
    height: 100%;
}

@media screen and (max-width: 800px) {
    canvas {
        pointer-events: none;
    }
}
</style>



// WEBPACK FOOTER //
// src/components/MTPEImage.vue