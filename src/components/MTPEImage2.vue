<template>
    <div class="mtpe-image">
        <canvas ref="main" />
    </div>
</template>

<script>
import * as PIXI from "pixi.js";
import $ from "jquery";

const DISP = './static/disp2.jpg';

// var isLoading = false;
// var waitings = [];

export default {
    props: [
        'src',
        'imageX',
        'images'
    ],

    data() {
        return {
            app: null,

            x1: null,
            x2: null,
            s1: null,
            s2: null,
            sa: 1,

            t1: null,
            t2: null,

            isLoading: false,
            waitings: [],
            loader: new PIXI.Loader(),
        };
    },

    watch: {
        src() {
            setTimeout(()=> this.setSrc(this.src, this.imageX));
        }
    },

    async mounted() {
        await this.startLoading();

        // const loader = PIXI.Loader.shared;
        const loader = this.loader;
        loader.add(DISP, DISP);

        if (Array.isArray(this.images) && this.images.length) {
            this.images.forEach(i=> loader.add(i, i));
        }

        loader.load((loader, res)=> {
            this.endLoading();
            this.init();
        });
    },

    methods: {
        startLoading() {
            return new Promise(resolve=> {
                if (this.isLoading) {
                    // console.log('waiting', this.src);
                    return this.waitings.push(resolve);
                }

                // console.log('start', this.src);
                this.isLoading = true;
                resolve();
            });
        },

        endLoading() {
            // console.log('release', this.src);
            if (!this.waitings.length) return this.isLoading = false;
            var f = this.waitings.shift();
            f();
        },

        fadeOut() {
            $(this.$refs.main).css('opacity', 0);
        },

        fadeIn() {
            $(this.$refs.main).css('opacity', 1);
        },

        async setSrc(src, x) {
            if (this.autoFading) this.fadeOut();
            await this.startLoading();

            const loader = this.loader;
            // const loader = PIXI.Loader.shared;
            
            if (!loader.resources[src]) {
                loader.add(src, src);
            }

            loader.load((loader, res)=> {
                if (this.autoFading) this.fadeIn();
                this.endLoading();
                if (this.src != src) return;

                if (this.s1) {
                    this.imgCont.removeChild(this.s1);
                }

                if (this.s2) {
                    this.x1 = this.x2;
                    this.t1 = this.t2;
                    this.s1 = this.s2;
                    this.sa = 0;

                    this.forg.removeChild(this.forgImg);
                }

                this.t2 = res[src].texture;
                
                this.x2 = x; 
                this.s2 = PIXI.Sprite.from(this.t2);
                this.forgImg = PIXI.Sprite.from(this.t2);

                this.imgCont.addChild(this.s2);
                this.forg.addChild(this.forgImg);

                this.app.start();
            });
        },

        init() {
            var app = this.app = new PIXI.Application({
                transparent: true,
                view: this.$refs.main,
                resizeTo: this.$refs.main,
                antialias: false
            });

            this.imgCont = new PIXI.Container();
            this.app.stage.addChild(this.imgCont);

            var forg = this.forg = this.createForegroundSprite();
            this.app.stage.addChild(forg);

            var focus = this.focus = this.createFocusSprite();
            this.app.stage.addChild(focus);

            forg.mask = focus;

            this.setSrc(this.src, this.imageX);

            app.stage.interactive = true;

            var cpos = null;
            var count = 1;
            var timer;

            app.stage.on('mousemove', (event) => {
                count = Math.min(count + 0.05, 3);
                cpos = { x: event.data.global.x, y: event.data.global.y };

                // this.forg.visible = true;

                this.app.start();

                clearInterval(timer);
                timer = setInterval(()=> {
                    count = Math.max(1, count - 0.2);
                    if (count === 1) clearInterval(timer);
                }, 50);
            });

            // app.stage.on('mouseout', ()=> this.forg.visible = false);

            app.ticker.add((delta)=> {
                if (!this.s1 && !this.s2) return this.app.stop();

                this.app.renderer.resize(this.width(), this.height());

                if (this.s1) {
                    this.s1.alpha = 1 - this.sa;
                    this.s1.position.x = (this.width() - this.s1.width) * (this.x1 || 50) / 100;
                }
                
                this.s2.alpha = this.sa;

                this.forgImg.height
                    = this.s2.height 
                    = this.height(); 

                this.forgImg.width 
                    = this.s2.width 
                    = this.t2.width * (this.height() / this.t2.height);

                if (this.s2.width < this.width()) {
                    this.forgImg.width 
                        = this.s2.width 
                        = this.width();

                    this.forgImg.height
                        = this.s2.height 
                        = this.t2.height * (this.width() / this.t2.width); 
                }

                this.forgImg.position.x
                    = this.s2.position.x 
                    = (this.width() - this.s2.width) * (this.x2 || 50) / 100;

                this.forgImg.position.y
                    = this.s2.position.y 
                    = (this.height() - this.s2.height) / 2;

                this.sa = Math.min(1, this.sa + 0.02 * delta);

                // count = Math.max(1, count - 0.05);
                focus.scale.set(count);

                if (cpos) {
                    focus.position.x = cpos.x - focus.width / 2;
                    focus.position.y = cpos.y - focus.height / 2;
                }

                if (this.sa === 1 && count === 1) {
                    // console.log('stop');
                    this.app.stop();
                }
            });

            this.resize();
        }, 

        width() {
            return $(this.$el).width();
        },

        height() {
            return $(this.$el).height();
        },

        resize() {
            if (this.width() != this._cw || this.height() != this._ch) {
                this._cw = this.width();
                this._ch = this.height();

                this.app.start();
            }

            setTimeout(this.resize, 500);
        },

        createForegroundSprite() {
            const loader = this.loader;

            var width = 1920;
            var height = 1080;

            var forg = new PIXI.Container();
            forg.sortableChildren = true;

            var matrix = this.createMatixTileSprite(width, height);
            matrix.zIndex = 99;
            matrix.alpha = 0.5;

            var disp = PIXI.Sprite.from(loader.resources[DISP].texture);
            var dispFilter = new PIXI.filters.DisplacementFilter(disp);
            disp.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
            
            forg.filters = [ 
                dispFilter,
            ];

            forg.addChild(matrix);

            return forg;
        },

        createFocusSprite() {
            var radius = 30;
            var blurSize = 20;

            var circle = new PIXI.Graphics()
                .lineStyle(0)
                .beginFill(0xFF0000)
                .drawCircle(radius + blurSize, radius + blurSize, radius)
                .endFill();

            circle.filters = [new PIXI.filters.BlurFilter(blurSize)];

            const bounds = new PIXI.Rectangle(0, 0, (radius + blurSize) * 2, (radius + blurSize) * 2);
            const texture = this.app.renderer.generateTexture(circle, PIXI.SCALE_MODES.NEAREST, 1, bounds);
            const focus = new PIXI.Sprite(texture);

            return focus;
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
    transition: opacity 0.5s;
}

@media screen and (max-width: 800px) {
    canvas {
        pointer-events: none;
    }
}
</style>



// WEBPACK FOOTER //
// src/components/MTPEImage2.vue