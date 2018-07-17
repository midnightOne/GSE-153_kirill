///<reference path="../../../../../../framework_core/_classes/lib.d.ts/jquery.d.ts"/>
/**
 *  iSOFTBET
 *  Copyright 2016 iSOFTBET
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 *
 *  Created by Joshua Moore on 23/05/2017.
 */
module Slot.BackgroundModule {
    import ParticleContainer = PIXI.particles.ParticleContainer;
    import Emitter = PIXI.particles.Emitter;
    import Container = PIXI.Container;
    import AbstractView = TypeBetFramework.AbstractView;
    import TextureUtil = Utils.TextureUtil;
    import AnimatedParticle = PIXI.particles.AnimatedParticle;
    import Point = PIXI.Point;
    import PixiView = TypeBetFramework.PixiView;
    import Sprite = PIXI.Sprite;
    /**
     * Class comment
     */
    export class S100LForestManiaHtmlBackgroundView extends PixiView {
        private _particleSystemContainer: Container;
        private _emitter: Emitter;
        private _emitterTimer: number;

        private lightBackground: Sprite;
        private lightSprite1: Sprite;
        private lightSprite2: Sprite;

        private lightSpriteXPosition: number;
        private lightSpriteYPosition: number;

        private sceneWidth: number;
        private sceneHeight: number;

        private lightSpriteTweens: Array<TweenMax> = [];

        constructor(name: string) {
            super(name);
        }

        /**
         * @inheritDoc
         */
        protected postRegister() {
            super.postRegister();

            this.sceneWidth = MVC.GraphicsEngine.SceneManager.SCENE_WIDTH;
            this.sceneHeight = MVC.GraphicsEngine.SceneManager.SCENE_HEIGHT;

            //Create normal background animation
            this.createAnimatedBackground();

            //Create sprites that appear in freespins background
            this.createFreeSpinBackgroundSprites();
        }

        private createFreeSpinBackgroundSprites() {
            this.lightSprite1 = TextureUtil.instance().createImageFromTexture("FS-Background-Spot1");
            this.lightSprite1.anchor.set(0.5);
            this.lightSprite1.scale.set(2);
            this.lightSprite1.alpha = 0;
            this.lightSprite1.blendMode = PIXI.BLEND_MODES.SCREEN;

            this.lightSprite2 = TextureUtil.instance().createImageFromTexture("FS-Background-Spot2");
            this.lightSprite2.anchor.set(0.5);
            this.lightSprite2.scale.set(2);
            this.lightSprite2.alpha = 0;
            this.lightSprite2.blendMode = PIXI.BLEND_MODES.SCREEN;

            this.lightBackground = TextureUtil.instance().createImageFromTexture("FS-Background-Color-Full");
            this.lightBackground.anchor.set(0);
            this.lightBackground.position.set(-screen.width, -screen.height);
            this.lightBackground.scale.set(screen.width * 4, screen.height * 4);
            this.lightBackground.blendMode = PIXI.BLEND_MODES.ADD;
            this.lightBackground.alpha = 0;

            this.randomizeLightPositions();

            this.display.addChild(this.lightBackground);
            this.display.addChild(this.lightSprite1);
            this.display.addChild(this.lightSprite2);
        }

        /**
         * Move the two circle sprites in the freespins background to random positions
         */
        private randomizeLightPositions () {
            this.lightSpriteXPosition = _.random(-100, this.sceneWidth);
            this.lightSpriteYPosition = _.random(0, this.sceneHeight);

            this.lightSprite1.position.set(this.lightSpriteXPosition,this.lightSpriteYPosition);

            this.lightSpriteXPosition = _.random(-100, this.sceneWidth);
            this.lightSpriteYPosition = _.random(0, this.sceneHeight);

            this.lightSprite2.position.set(this.lightSpriteXPosition,this.lightSpriteYPosition);
        }


        public startFSBackgroundAnimations() {
            this.display.removeChild(this._particleSystemContainer);

            this.lightSpriteTweens.push(TweenMax.to(this.lightBackground, 0.1, {
                    alpha : 0.3,
                    repeat : -1,
                    yoyo : true
                }));

            this.lightSpriteTweens.push(TweenMax.to(this.lightSprite1, 0.2, {
                alpha : 0.1,
                repeat : -1,
                yoyo : true
            }));

            this.lightSpriteTweens.push(TweenMax.to(this.lightSprite2, 0.2, {
                alpha : 0.1,
                repeat : -1,
                yoyo : true,
                onRepeat : () => {this.randomizeLightPositions()}
            }));
        }

        public stopFSBackgroundAnimations(freeSpinsEnded: boolean = true) {

            if(freeSpinsEnded) {
                this.display.addChild(this._particleSystemContainer);
            }

            _.forEach(this.lightSpriteTweens, function (tween: TweenMax) {
                tween.kill();
            }.bind(this));

            this.lightSpriteTweens = [];

            this.lightBackground.alpha = 0;
            this.lightSprite1.alpha = 0;
            this.lightSprite2.alpha = 0;
        }

        /**
         * Add tweens with higher alpha values during double symbol animation
         */
        public startFSDoubleBackgroundAnimations(doubleAnimPlaying: boolean) {
            if(doubleAnimPlaying) {

                this.stopFSBackgroundAnimations(false);

                this.lightSpriteTweens.push(TweenMax.to(this.lightBackground, 0.1, {
                    alpha : 1,
                    repeat : -1,
                    yoyo : true
                }));

                this.lightSpriteTweens.push(TweenMax.to(this.lightSprite1, 0.2, {
                    alpha : 0.3,
                    repeat : -1,
                    yoyo : true
                }));

                this.lightSpriteTweens.push(TweenMax.to(this.lightSprite2, 0.2, {
                    alpha : 0.3,
                    repeat : -1,
                    yoyo : true,
                    onRepeat : () => {this.randomizeLightPositions()}
                }));

            } else {

                _.forEach(this.lightSpriteTweens, function (tween: TweenMax) {
                    tween.kill();
                }.bind(this));

                this.lightSpriteTweens = [];

                this.lightBackground.alpha = 0;
                this.lightSprite1.alpha = 0;
                this.lightSprite2.alpha = 0;

                this.startFSBackgroundAnimations();

            }

        }

        private createAnimatedBackground(): void {
            this._particleSystemContainer = new Container();
            this._emitter = new Emitter(
                this._particleSystemContainer,
                [{
                    "textures" : [
                        {
                            texture : 'Circle-Background.png',
                            count   : 1
                        }
                    ]
                },
                    {
                        "textures" : [
                            {
                                texture : 'Circle-Background2.png',
                                count   : 1
                            }
                        ]
                    }],
                {
                    "alpha"            : {
                        "start" : 0.3,
                        "end"   : 1
                    },
                    "scale"            : {
                        "start"                  : 0.1,
                        "end"                    : 0.2,
                        "minimumScaleMultiplier" : 8
                    },
                    "color"            : {
                        "start" : "#ffffff",
                        "end"   : "#ffffff"
                    },
                    "speed"            : {
                        "start"                  : 10,
                        "end"                    : 30,
                        "minimumSpeedMultiplier" : 0.9
                    },
                    "acceleration"     : {
                        "x" : 0,
                        "y" : 0
                    },
                    "maxSpeed"         : 0,
                    "startRotation"    : {
                        "min" : 0,
                        "max" : 0
                    },
                    "noRotation"       : true,
                    "rotationSpeed"    : {
                        "min" : 0,
                        "max" : 0
                    },
                    "lifetime"         : {
                        "min" : 60,
                        "max" : 80
                    },
                    "blendMode"        : "screen",
                    "frequency"        : 0.3,
                    "emitterLifetime"  : -1,
                    "maxParticles"     : 100,
                    "pos"              : {
                        "x" : 0,
                        "y" : 0
                    },
                    "addAtBack"        : false,
                    "spawnType"        : "burst",
                    "particlesPerWave" : 1,
                    "particleSpacing"  : 0,
                    "angleStart"       : 0
                }
            );
            this._emitter.emit = true;
            this._emitter['particleConstructor'] = AnimatedParticle;
            this._emitterTimer = Date.now();
            this.updateEmitter();
            this.display.addChild(this._particleSystemContainer);
        }

        private updateEmitter(): void {
            if (this._emitter.emit) {
                requestAnimationFrame(this.updateEmitter.bind(this));
                let now = Date.now();
                // The emitter requires the elapsed
                // number of seconds since the last update
                if (this._emitter) {
                    this._emitter.update((now - this._emitterTimer) * 0.001);
                    //randomly change emitter position
                    this._emitter.updateSpawnPos(this.getRandomInt(-200, 1000), this.getRandomInt(0, 600));
                }
                this._emitterTimer = now;
            }
        }

        getRandomInt(min: number, max: number): number {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
    }
}
