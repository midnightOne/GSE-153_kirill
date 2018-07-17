/**
 * Created by me on 31.10.2017.
 */

module Slot.BackgroundModule {
    import ParticleContainer = PIXI.particles.ParticleContainer;
    import Emitter = PIXI.particles.Emitter;
    import Container = PIXI.Container;
    import AnimatedParticle = PIXI.particles.AnimatedParticle;
    import AnimatedSprite = PIXI.extras.AnimatedSprite;
    import Point = PIXI.Point;
    import Sprite = PIXI.Sprite;
    import Container = PIXI.Container;
    import Sprite = PIXI.Sprite;
    import Device = Utils.Device;

    export class S100LForestManiaAnimatedBackgroundView extends AbstractBackgroundView {

        private birdIdleAnimation:AnimatedSprite;
        private catIdleAnimation:AnimatedSprite;
        private crocIdleAnimation:AnimatedSprite;

        private birdAttackAnimation:AnimatedSprite;
        private catAttackAnimation:AnimatedSprite;
        private crocAttackAnimation:AnimatedSprite;

        private smokeAttackAnimation:AnimatedSprite;
        private dustAnimation:AnimatedSprite;
        private critterAnimation:AnimatedSprite;

        private critterBucket:Sprite;
        private coinSprite:Sprite;
        private coinBlink:Sprite;

        private critterAnimationHelper:AnimatedSpriteTweenHelper;
        private birdAttackAnimationHelper:AnimatedSpriteTweenHelper;
        private catAttackAnimationHelper:AnimatedSpriteTweenHelper;
        private crocAttackAnimationHelper:AnimatedSpriteTweenHelper;
        private smokeAttackAnimationHelper:AnimatedSpriteTweenHelper;
        private dustAnimationHelper:AnimatedSpriteTweenHelper;


        private birdIdlePosition:Point = new Point(350, 450);
        private catIdlePosition:Point =  new Point(520, 440);
        private crocIdlePosition:Point = new Point(630, 460);

        private bucketPosition:Point = new Point(590, 630);

        private birdAttackPosition:Point = new Point(350, 450);
        private catAttackPosition:Point =  new Point(500, 440);
        private crocAttackPosition:Point = new Point(800, 460);

        private critterPosition:Point = new Point(500, -65);
        private smokePosition:Point = new Point(250, 250);

        private bucketStartY:number = 260;

        private clockContainer:Container;
        //private clockBg:Sprite;
        private clockMinuteHand:Sprite;
        private clockHourHand:Sprite;
        private clockButton:Sprite;

        private skipAnimations:boolean = false;

        private animationTimeline = new TimelineLite();

        //x@0.5_Watch-Bighand-Small.png
        //x@0.5_Watch-Face-Small.png
        //x@0.5_Watch-Middle-Small.png
        //x@0.5_Watch-Plunger-Small.png
        //x@0.5_Watch-Smallhand-Small.png


        //BG-Main-Particle.png
        //Dust-Particle.png
        //Leaf-Particle.png

        protected _particleSystem: Emitter;
        protected _particleSystemContainer: PIXI.Container;
        protected _particleSystemTimer: number;

        protected _particleSystem_leaves: Emitter;
        protected _particleSystemContainer_leaves: PIXI.Container;
        protected _particleSystemTimer_leaves: number;
        protected fsBackgroundEnbaled:boolean = false;

        protected currentAnimationType:number = 0;
        public static AnimationWild:number = 0;
        public static AnimationFS:number = 1;


        protected postRegister(): void {
            super.postRegister();
            if(Device.instance().mobile){
                this.setupMobilePositions();
            }
            this.addIdleAnimations();
            this.initAttackAnimations();
            this.initBgAnimationParticleSystem();
            this.initBgFsAnimationParticleSystem();
            this.playParticleSystemAnimation();
        }

        /**
         * To change the displayed frame
         * @param indexFrame Index of the Frame to display
         * @param immediate To execute the change immediately(=true_ or as a animation (=false)
         */
        public switchFrame(indexFrame: number, immediate: boolean = true): void {
            //super.switchFrame(indexFrame,immediate);
            if(indexFrame == 0){
                this.stopParticleSystemAnimation_leaves();
            }
        }

        private setupMobilePositions(){
            let mobileYshift:number = 30;

            this.birdIdlePosition = new Point(350, 450+mobileYshift);
            this.catIdlePosition =  new Point(520, 440+mobileYshift);
            this.crocIdlePosition = new Point(630, 460+mobileYshift);

            this.bucketPosition = new Point(590, 630+mobileYshift);

            this.birdAttackPosition = new Point(350, 450+mobileYshift);
            this.catAttackPosition =  new Point(500, 440+mobileYshift);
            this.crocAttackPosition = new Point(800, 460+mobileYshift);

            this.critterPosition = new Point(500, -65);
            this.smokePosition = new Point(250, 250+mobileYshift);

            this.bucketStartY = 260;
        }

        private initAttackAnimations():void{

            this.birdAttackAnimation=  Utils.TextureUtil.instance().createAnimatedSprite("x@0.5_Character-Bird-Attack-");
            this.birdAttackAnimation.position.set(this.birdAttackPosition.x, this.birdAttackPosition.y);
            this.birdAttackAnimation.animationSpeed = 0.5;
            this.birdAttackAnimation.scale = new Point(1.35, 1.35);
            //this.birdAttackAnimation.visible = false;
            //this.display.addChild(this.birdAttackAnimation);
            //this.birdAttackAnimation.play();

            this.catAttackAnimation=  Utils.TextureUtil.instance().createAnimatedSprite("x@0.5_Character-Cat-Attack-");
            this.catAttackAnimation.position.set(this.catAttackPosition.x, this.catAttackPosition.y);
            this.catAttackAnimation.animationSpeed = 0.5;
            this.catAttackAnimation.scale = new Point(1.35, 1.35);
            //this.catAttackAnimation.visible = false;
            //this.display.addChild(this.catAttackAnimation);
            //this.catAttackAnimation.play();

            this.crocAttackAnimation = Utils.TextureUtil.instance().createAnimatedSprite("x@0.5_Character-Croc-Attack-");
            this.crocAttackAnimation.position.set(this.crocAttackPosition.x, this.crocAttackPosition.y);
            this.crocAttackAnimation.animationSpeed = 0.5;
            this.crocAttackAnimation.scale = new Point(-1.35, 1.35);
            //this.crocAttackAnimation.visible = false;
            //this.display.addChild(this.crocAttackAnimation);
           // this.crocAttackAnimation.play();


            this.critterAnimation = Utils.TextureUtil.instance().createAnimatedSprite("x@0.5_Critter-Animation-");
            this.critterAnimation.position.set(this.critterPosition.x, this.critterPosition.y);
            this.critterAnimation.animationSpeed = 0.5;
            this.critterAnimation.scale = new Point(1, 1);

            //TweenMax.to(this.critterAnimationHelper, 1, {progress:1,repeatDelay : 0, repeat : -1,yoyo : true});
           // this.critterAnimation.visible = true;
            //this.display.addChild(this.critterAnimation);
            //this.critterAnimation.play();

            this.critterBucket = Utils.TextureUtil.instance().createImageFromTexture("x@0.5_Critter-Bucket.png");
            this.critterBucket.anchor.set(0.5);
            this.critterBucket.scale = new Point(1, 1);
            this.critterBucket.position.set(this.bucketPosition.x, this.bucketPosition.y);
            //this.display.addChild(this.critterBucket);

            this.coinSprite = Utils.TextureUtil.instance().createImageFromTexture("flyingSymbol13.png");
            this.coinSprite.anchor.set(0.5);
            this.coinSprite.scale = new Point(0.5, 0.5);
            this.coinSprite.position.set(this.bucketPosition.x, this.bucketPosition.y);

            this.smokeAttackAnimation = Utils.TextureUtil.instance().createAnimatedSprite("x@0.5_Smoke-Battle-");
            this.smokeAttackAnimation.position.set(this.smokePosition.x, this.smokePosition.y);
            this.smokeAttackAnimation.animationSpeed = 0.5;
            this.smokeAttackAnimation.scale = new Point(2.5, 2.5);
            //this.smokeAttackAnimation.alpha = 0.5;
            //this.display.addChild(this.smokeAttackAnimation);
           // this.smokeAttackAnimation.play();

            this.dustAnimation = Utils.TextureUtil.instance().createAnimatedSprite("x@0.5_Smoke-Cauldron-");
            this.dustAnimation.position.set(this.smokePosition.x, this.smokePosition.y+200);
            this.dustAnimation.animationSpeed = 0.5;
            this.dustAnimation.scale = new Point(2.5, 2.5);


            this.clockContainer = new Container();
            let tempSprite:Sprite = Utils.TextureUtil.instance().createImageFromTexture("x@0.5_Watch-Face-Small.png");

            this.clockMinuteHand = Utils.TextureUtil.instance().createImageFromTexture("x@0.5_Watch-Bighand-Small.png");
            this.clockHourHand = Utils.TextureUtil.instance().createImageFromTexture("x@0.5_Watch-Smallhand-Small.png");
            this.clockButton = Utils.TextureUtil.instance().createImageFromTexture("x@0.5_Watch-Plunger-Small.png");

            this.clockMinuteHand.anchor.set(0.5);
            this.clockHourHand.anchor.set(0.5);
            tempSprite.anchor.set(0.5);
            this.clockButton.anchor.set(0.5);
            this.clockButton.position.set(0,-38);
            this.clockContainer.addChild(this.clockButton);
            this.clockContainer.addChild(tempSprite);
            this.clockContainer.addChild(this.clockHourHand);
            this.clockContainer.addChild(this.clockMinuteHand);

            tempSprite = Utils.TextureUtil.instance().createImageFromTexture("x@0.5_Watch-Middle-Small.png");
            tempSprite.anchor.set(0.5);
            this.clockContainer.addChild(tempSprite);

            //x@0.5_Watch-Bighand-Small.png
            //x@0.5_Watch-Face-Small.png
            //x@0.5_Watch-Middle-Small.png
            //x@0.5_Watch-Plunger-Small.png
            //x@0.5_Watch-Smallhand-Small.png

            this.critterAnimationHelper = new AnimatedSpriteTweenHelper(this.critterAnimation);
            this.birdAttackAnimationHelper = new AnimatedSpriteTweenHelper(this.birdAttackAnimation);
            this.catAttackAnimationHelper = new AnimatedSpriteTweenHelper(this.catAttackAnimation);
            this.crocAttackAnimationHelper = new AnimatedSpriteTweenHelper(this.crocAttackAnimation);
            this.smokeAttackAnimationHelper = new AnimatedSpriteTweenHelper(this.smokeAttackAnimation);
            this.dustAnimationHelper = new AnimatedSpriteTweenHelper(this.dustAnimation);



        }

        public skipAnimation(params:Object){
            console.log("SKIP ANIMATION");
            TweenLite.killTweensOf(this.critterBucket);
            TweenLite.killTweensOf(this.critterBucket.position);
            TweenLite.killTweensOf(this.coinSprite.position);
            TweenLite.killTweensOf(this.clockContainer.position);

            this.skipAnimations = true;


                this.coinSprite.visible = false;
                this.clockContainer.visible = false;

            this.birdIdleAnimation.visible = true;
            this.catIdleAnimation.visible = true;
            this.crocIdleAnimation.visible = true;

            this.birdAttackAnimation.visible = false;
            this.catAttackAnimation.visible = false;
            this.crocAttackAnimation.visible = false;

            this.critterBucket.visible = false;

            this.birdIdleAnimation.position.y =this.birdIdlePosition.y;
            this.crocIdleAnimation.position.y =this.crocIdlePosition.y;

            this.birdIdleAnimation.visible = true;
            this.crocIdleAnimation.visible = true;

            this.endIntroWildAnimation();

            if(this.currentAnimationType == 1) {
                this.switchToFsBG();
            }
        }

        protected switchToFsBG(){
            this.dispatchSignal("switchToFsBG");
            this.playParticleSystemAnimation_leaves();
        }



        public playCharacterAnimations(){

            this.skipAnimations = false;

            this.birdAttackAnimation.visible = false;
            this.catAttackAnimation.visible = false;
            this.crocAttackAnimation.visible = false;
            this.critterBucket.visible = false;
            this.smokeAttackAnimation.visible = false;
            this.critterAnimation.visible = false;
            this.coinSprite.visible = false;
            this.dustAnimation.visible = false;
            this.clockContainer.visible = false;

            this.coinSprite.position.set(this.bucketPosition.x, this.bucketPosition.y);
            this.coinSprite.scale = new Point(0.5, 0.5);
            //this.clockContainer.scale = new Point(0.5, 0.5);
            this.clockContainer.position.set(this.bucketPosition.x, this.bucketPosition.y);
            //this.clockContainer.scale = new Point(0.5, 0.5);

            this.clockHourHand.rotation = 0;
            this.clockMinuteHand.rotation = 0;

            this.display.addChild(this.birdAttackAnimation);
            this.display.addChild(this.catAttackAnimation);
            this.display.addChild(this.crocAttackAnimation);
            this.display.addChild(this.critterBucket);
            this.display.addChild(this.dustAnimation);

            if(this.currentAnimationType == 0){
                this.display.addChild(this.coinSprite);
            } else {
                this.display.addChild(this.clockContainer);
            }

            this.display.addChild(this.smokeAttackAnimation);
            this.display.addChild(this.critterAnimation);




            this.dustAnimation.loop = false;
            this.birdAttackAnimation.loop = false;
            this.catAttackAnimation.loop = false;
            this.crocAttackAnimation.loop = false;
            this.smokeAttackAnimation.loop = false;

            this.dustAnimationHelper.progress = 0;
            this.critterAnimationHelper.progress = 0;
            this.critterAnimation.loop = false;

            this.critterAnimation.visible = true;
            this.critterAnimation.play();
            //this.critterBucket.visible = true;
            //this.critterAnimation.onComplete = this.playAttackAnimation.bind(this);
            this.critterBucket.position.set(this.bucketPosition.x,this.bucketStartY);

            this.animationTimeline.to(this.critterAnimationHelper, 1.3, {progress:1, ease:Linear.easeNone});

            this.animationTimeline.set(this.critterBucket, {visible: true},1.3);
            this.animationTimeline.to(this.critterBucket.position, 0.5, {ease:Expo.easeIn,y:this.bucketPosition.y},0.9); //onComplete: () => {this.playAttackAnimation();}


            this.critterAnimation.visible = false;
            this.birdIdleAnimation.visible = false;
            this.catIdleAnimation.visible = false;
            this.crocIdleAnimation.visible = false;
            this.birdAttackAnimation.visible = true;
            this.catAttackAnimation.visible = true;
            this.crocAttackAnimation.visible = true;
            this.dustAnimation.visible = true;


            this.animationTimeline.to(this.dustAnimationHelper, 1, {progress:1, ease:Linear.easeNone}, "dust");
            this.animationTimeline.to(this.birdAttackAnimationHelper, 1, {progress:1, ease:Linear.easeNone}, 1);
            this.animationTimeline.to(this.catAttackAnimationHelper, 1, {progress:1, ease:Linear.easeNone}, 1);
            this.animationTimeline.to(this.crocAttackAnimationHelper, 1, {progress:1, ease:Linear.easeNone}, 1);
            this.smokeAttackAnimation.visible = true;
            this.animationTimeline.to(this.smokeAttackAnimationHelper, 1, {progress:1, ease:Linear.easeNone}, 1);

            TweenLite.delayedCall(1.5,() => { // TODO CHeck if we can do this consistently across browsers (scope)
                if(this.skipAnimations){
                    return;
                }
                this.smokeAttackAnimation.visible = true;
                this.smokeAttackAnimation.gotoAndPlay(0);
                this.smokeAttackAnimation.onComplete = this.afterSmoke.bind(this);
            });
            TweenLite.delayedCall(2,() => {
                if(this.skipAnimations){
                    return;
                }

                if(this.currentAnimationType == 0){
                    this.coinSprite.visible = true;
                } else {
                    this.clockContainer.visible = true;
                }

                this.birdIdleAnimation.visible = false;
                this.catIdleAnimation.visible = true;
                this.crocIdleAnimation.visible = false;

                this.birdAttackAnimation.visible = false;
                this.catAttackAnimation.visible = false;
                this.crocAttackAnimation.visible = false;

                this.critterBucket.visible = false;
            });



            //use position parameter "+=0.5" to schedule next tween 0.5 seconds after previous tweens end
            //tl.from(feature, 0.5, {scale:.5, autoAlpha:0}, "+=0.5");

//use position parameter "-=0.5" to schedule next tween 0.25 seconds before previous tweens end.
//great for overlapping
            //tl.from(description, 0.5, {left:100, autoAlpha:0}, "-=0.25");


            TweenMax.to(this.critterAnimationHelper, 1.1, {progress:1, ease:Linear.easeNone});


            TweenLite.to(this.critterBucket.position, 0.5, {ease:Expo.easeIn, delay: 0.9,y:this.bucketPosition.y, onComplete: () => {this.playAttackAnimation();}});
            TweenLite.set(this.critterBucket, {delay: 1.3, visible: true}); // TODO CHANGE TO FRAME CHECKING ON BUCKET ANIMATION



        }

        public startBucketAnimation(params:Object){
            if(params["type"] == 1){
                this.currentAnimationType = 1;
            } else {
                this.currentAnimationType = 0;
            }

            this.skipAnimations = false;

            this.birdAttackAnimation.visible = false;
            this.catAttackAnimation.visible = false;
            this.crocAttackAnimation.visible = false;
            this.critterBucket.visible = false;
            this.smokeAttackAnimation.visible = false;
            this.critterAnimation.visible = false;
            this.coinSprite.visible = false;
            this.dustAnimation.visible = false;
            this.clockContainer.visible = false;

            this.coinSprite.position.set(this.bucketPosition.x, this.bucketPosition.y);
            this.coinSprite.scale = new Point(0.5, 0.5);
            //this.clockContainer.scale = new Point(0.5, 0.5);
            this.clockContainer.position.set(this.bucketPosition.x, this.bucketPosition.y);
            //this.clockContainer.scale = new Point(0.5, 0.5);

            this.clockHourHand.rotation = 0;
            this.clockMinuteHand.rotation = 0;

            this.display.addChild(this.birdAttackAnimation);
            this.display.addChild(this.catAttackAnimation);
            this.display.addChild(this.crocAttackAnimation);
            this.display.addChild(this.critterBucket);
            this.display.addChild(this.dustAnimation);
            if(this.currentAnimationType == 0){
                this.display.addChild(this.coinSprite);
            } else {
                this.display.addChild(this.clockContainer);
            }
            this.display.addChild(this.smokeAttackAnimation);
            this.display.addChild(this.critterAnimation);




            this.dustAnimation.loop = false;
            this.birdAttackAnimation.loop = false;
            this.catAttackAnimation.loop = false;
            this.crocAttackAnimation.loop = false;
            this.smokeAttackAnimation.loop = false;

            this.dustAnimation.gotoAndStop(0);

            this.critterAnimation.loop = false;
            this.critterAnimation.gotoAndStop(0);
            this.critterAnimation.visible = true;
            this.critterAnimation.play();
            this.playSound('feature_critter_appear');


            //this.critterBucket.visible = true;
            //this.critterAnimation.onComplete = this.playAttackAnimation.bind(this);

            this.critterBucket.position.set(this.bucketPosition.x,this.bucketStartY);
            TweenLite.to(this.critterBucket.position, 0.5, {ease:Expo.easeIn, delay: 0.9,y:this.bucketPosition.y, onComplete: () => {this.playAttackAnimation();}});
            TweenLite.set(this.critterBucket, {delay: 1.3, visible: true}); // TODO CHANGE TO FRAME CHECKING ON BUCKET ANIMATION
            //this.smokeAttackAnimation.play();

        }

        private playAttackAnimation(){
            this.playSound('feature_bucket_drop');


            this.critterAnimation.visible = false;

            this.birdIdleAnimation.visible = false;
            this.catIdleAnimation.visible = false;
            this.crocIdleAnimation.visible = false;

            this.birdAttackAnimation.visible = true;
            this.catAttackAnimation.visible = true;
            this.crocAttackAnimation.visible = true;

            this.dustAnimation.visible = true;
            this.dustAnimation.play();

            this.critterBucket.visible = true;

            this.birdAttackAnimation.gotoAndPlay(0);
            this.catAttackAnimation.gotoAndPlay(0);
            this.crocAttackAnimation.gotoAndPlay(0);

            TweenLite.delayedCall(1.5,() => { // TODO CHeck if we can do this consistently across browsers (scope)
                if(this.skipAnimations){
                    return;
                }
                this.playSound('feature_battle_start');
                this.smokeAttackAnimation.visible = true;
                this.smokeAttackAnimation.gotoAndPlay(0);
                this.smokeAttackAnimation.onComplete = this.afterSmoke.bind(this);
            });
            TweenLite.delayedCall(2,() => {
                if(this.skipAnimations){
                    return;
                }

                if(this.currentAnimationType == 0){
                    this.coinSprite.visible = true;
                } else {
                    this.clockContainer.visible = true;
                }

                this.birdIdleAnimation.visible = false;
                this.catIdleAnimation.visible = true;
                this.crocIdleAnimation.visible = false;

                this.birdAttackAnimation.visible = false;
                this.catAttackAnimation.visible = false;
                this.crocAttackAnimation.visible = false;

                this.critterBucket.visible = false;
            });
        }

        private afterSmoke(){
            if(this.skipAnimations){
                return;
            }
            this.smokeAttackAnimation.visible = false;

            if(this.currentAnimationType == 0){
                TweenLite.to(this.coinSprite.position,0.7,{x:900, y:350, ease: Sine.easeInOut});
                TweenLite.to(this.coinSprite.scale,0.7,{x:1, y:1, ease: Sine.easeInOut});
                TweenLite.to(this.coinSprite.position,0.7,{x:650, y:300, ease: Sine.easeInOut, delay:1.1, onComplete:() => {this.endIntroWildAnimation();}});
                TweenLite.to(this.coinSprite.scale,0.7,{x:0, y:0, ease: Sine.easeInOut, delay:1.1});
            } else {
                TweenLite.to(this.clockContainer.position,0.7,{x:900, y:350, ease: Sine.easeInOut});
                TweenLite.to(this.clockContainer.scale,0.7,{x:2, y:2, ease: Sine.easeInOut});

                TweenLite.to(this.clockButton.position,0.2,{delay:0.7,y:-30});
                TweenLite.to(this.clockButton.position,0.2,{delay:0.9, y:-38});

                TweenLite.to(this.clockHourHand,2,{delay:1,rotation:10, ease: Sine.easeInOut});
                TweenLite.to(this.clockMinuteHand,2,{delay:1,rotation:20, ease: Sine.easeInOut});

                TweenLite.delayedCall(1.5,()=>{this.switchToFsBG();});

                TweenLite.to(this.clockContainer.position,0.7,{y:1000, ease: Sine.easeInOut, delay:1.1+2+0.5, onComplete:() => {this.endIntroWildAnimation();}});
                TweenLite.to(this.clockContainer.scale,0.7,{x:0, y:0, ease: Sine.easeInOut, delay:1.1+2+0.5});
                this.playSound('feature_clock_effect');
                //feature_clock_effect
            }

        }

        private startClockAnimation(){

        }


        private endIntroWildAnimation(){
            //TweenLite.to(this.coinSprite,0.7,{alpha:0, ease: Sine.easeInOut});
            this.display.removeChild(this.birdAttackAnimation);
            this.display.removeChild(this.catAttackAnimation);
            this.display.removeChild(this.crocAttackAnimation);
            this.display.removeChild(this.critterBucket);
            this.display.removeChild(this.smokeAttackAnimation);
            this.display.removeChild(this.critterAnimation);

            if(this.currentAnimationType == 0){
                this.display.removeChild(this.coinSprite);
            } else {
                this.display.removeChild(this.clockContainer);
            }

            if(!this.skipAnimations){
                this.birdIdleAnimation.position.y += 500;
                this.crocIdleAnimation.position.y += 500;

                this.birdIdleAnimation.visible = true;
                this.crocIdleAnimation.visible = true;

                TweenLite.to(this.birdIdleAnimation.position,1,{y:this.birdIdlePosition.y, ease: Sine.easeInOut});
                TweenLite.to(this.crocIdleAnimation.position,1,{y:this.crocIdlePosition.y, ease: Sine.easeInOut});
            }

            if(this.currentAnimationType == 0){
                this.dispatchSignal("characterAnimationDone"); // TODO MAKE CONSTANTS
            } else {
                this.dispatchSignal("characterAnimationDone_fs"); // TODO MAKE CONSTANTS
            }



        }


        private addIdleAnimations():void {
            this.birdIdleAnimation =  Utils.TextureUtil.instance().createAnimatedSprite("Bird-Idle-Animation_");
            this.display.addChild(this.birdIdleAnimation);
            this.birdIdleAnimation.position.set(this.birdIdlePosition.x, this.birdIdlePosition.y);
            this.birdIdleAnimation.animationSpeed = 0.5;
            this.birdIdleAnimation.scale = new Point(1.35, 1.35);
            this.birdIdleAnimation.play();

            this.catIdleAnimation =  Utils.TextureUtil.instance().createAnimatedSprite("Cat-Idle-Animation_");
            this.display.addChild(this.catIdleAnimation);
            this.catIdleAnimation.position.set(this.catIdlePosition.x, this.catIdlePosition.y);
            this.catIdleAnimation.animationSpeed = 0.5;
            this.catIdleAnimation.scale = new Point(1.35, 1.35);
            this.catIdleAnimation.play();

            this.crocIdleAnimation =  Utils.TextureUtil.instance().createAnimatedSprite("Croc-Idle-Animation_");
            this.display.addChild(this.crocIdleAnimation);
            this.crocIdleAnimation.position.set(this.crocIdlePosition.x, this.crocIdlePosition.y);
            this.crocIdleAnimation.animationSpeed = 0.5;
            this.crocIdleAnimation.scale = new Point(1.35, 1.35);
            this.crocIdleAnimation.play();
        }

        protected initBgAnimationParticleSystem() {
            this._particleSystemContainer = new PIXI.Container();
            this._particleSystem = new Emitter(
                // The PIXI.Container to put the emitter in
                // if using blend modes, it's important to put this
                // on top of a bitmap, and not use the root stage Container
                this._particleSystemContainer,
                // The collection of particle images to use
                [
                    {
                        "textures" : [
                            {
                                texture : 'BG-Main-Particle.png',
                                count   : 1
                            }

                        ]
                    }/*,
                    {
                        "textures" : [
                            {
                                texture : 'Glow-worm.png',
                                count   : 1
                            }

                        ]
                    },
                    {
                        "textures" : [
                            {
                                texture : 'Dust-Particle.png',
                                count   : 1
                            }

                        ]
                    }*/


                ],
                // Emitter configuration, edit this to change the look
                // of the emitter
                {
                    "alpha": {
                        "start": 0,
                        "end": 1
                    },
                    "scale": {
                        "start": 3,
                        "end": 0.1,
                        "minimumScaleMultiplier": 0.5
                    },
                    "color": {
                        "start": "#e4f9ff",
                        "end": "#3fcbff"
                    },
                    "speed": {
                        "start": 50,
                        "end": 50,
                        "minimumSpeedMultiplier": 0.2
                    },
                    "acceleration": {
                        "x": 0,
                        "y": 0
                    },
                    "maxSpeed": 0,
                    "startRotation": {
                        "min": 0,
                        "max": 360
                    },
                    "noRotation": true,
                    "rotationSpeed": {
                        "min": 0,
                        "max": 0
                    },
                    "lifetime": {
                        "min": 2,
                        "max": 8
                    },
                    "blendMode": "normal",
                    "frequency": 0.001,
                    "emitterLifetime": -1,
                    "maxParticles": 100,
                    "pos": {
                        "x": 0,
                        "y": 0
                    },
                    "addAtBack": false,
                    "spawnType": "rect",
                    "spawnRect": {
                        "x": 0,
                        "y": 0,
                        "w": 1600,
                        "h": 800
                    }
                }
            );
            // Calculate the current time
            this._particleSystem["particleConstructor"] = AnimatedParticle;
            this._particleSystemTimer = Date.now();
            this._particleSystem.emit = false;
            this.updateEmitter_default()
        }

        protected initBgFsAnimationParticleSystem() {
            this._particleSystemContainer_leaves = new PIXI.Container();
            this._particleSystem_leaves = new Emitter(
                // The PIXI.Container to put the emitter in
                // if using blend modes, it's important to put this
                // on top of a bitmap, and not use the root stage Container
                this._particleSystemContainer_leaves,
                // The collection of particle images to use
                [
                    {
                        "textures" : [
                            {
                                texture : 'Leaf-Particle.png',
                                count   : 1
                            }
                        ]
                    }
                ],
                // Emitter configuration, edit this to change the look
                // of the emitter
                {
                    "alpha": {
                        "start": 0.5,
                        "end": 0.5
                    },
                    "scale": {
                        "start": 0.6,
                        "end": 0.6,
                        "minimumScaleMultiplier": 0.3
                    },
                    "color": {
                        "start": "#e4f9ff",
                        "end": "#3fcbff"
                    },
                    "speed": {
                        "start": 50,
                        "end": 50,
                        "minimumSpeedMultiplier": 0.2
                    },
                    "acceleration": {
                        "x": 0,
                        "y": 30
                    },
                    "maxSpeed": 0,
                    "startRotation": {
                        "min": 0,
                        "max": 360
                    },
                    "noRotation": false,
                    "rotationSpeed": {
                        "min": 10,
                        "max": 50
                    },
                    "lifetime": {
                        "min": 6,
                        "max": 10
                    },
                    "blendMode": "normal",
                    "frequency": 0.3,
                    "emitterLifetime": -1,
                    "maxParticles": 50,
                    "pos": {
                        "x": 0,
                        "y": -100
                    },
                    "addAtBack": false,
                    "spawnType": "rect",
                    "spawnRect": {
                        "x": 0,
                        "y": 0,
                        "w": 1600,
                        "h": 10
                    }
                }
            );
            // Calculate the current time
            this._particleSystem_leaves["particleConstructor"] = AnimatedParticle;
            this._particleSystemTimer_leaves = Date.now();
            this._particleSystem_leaves.emit = false;
        }

        /*

         protected _particleSystem_leaves: Emitter;
         protected _particleSystemContainer_leaves: PIXI.Container;
         protected _particleSystemTimer_leaves: number;
         */

        updateEmitter_default() {
            if (this._particleSystem.emit) {
                requestAnimationFrame(this.updateEmitter_default.bind(this));
                let now = Date.now();
                // The emitter requires the elapsed
                // number of seconds since the last update
                if (this._particleSystem) {
                    this._particleSystem.update((now - this._particleSystemTimer) * 0.001);
                }
                this._particleSystemTimer = now;
            }

            if (!_.isUndefined(this._particleSystem_leaves) &&  this._particleSystem_leaves.emit) {
                let now = Date.now();
                // The emitter requires the elapsed
                // number of seconds since the last update
                if (this._particleSystem_leaves) {
                    this._particleSystem_leaves.update((now - this._particleSystemTimer_leaves) * 0.001);
                }
                this._particleSystemTimer_leaves = now;
            }
        }
        protected playParticleSystemAnimation() {
            this.display.addChildAt(this._particleSystemContainer, 0);
            this._particleSystemTimer = Date.now();
            this._particleSystem.emit = true;
            this.updateEmitter_default();
        }
        protected stopParticleSystemAnimation() {
            this.display.removeChild(this._particleSystemContainer);
            this._particleSystem.cleanup();
            this._particleSystem.emit = false;
        }

        protected playParticleSystemAnimation_leaves() {
            this.display.addChild(this._particleSystemContainer_leaves);
            this._particleSystemTimer_leaves = Date.now();
            this._particleSystem_leaves.emit = true;
            this.updateEmitter_default();
        }
        protected stopParticleSystemAnimation_leaves() {
            if(this._particleSystem_leaves.emit == false){
                return;
            }
            this.display.removeChild(this._particleSystemContainer_leaves);
            this._particleSystem_leaves.cleanup();
            this._particleSystem_leaves.emit = false;
        }
    }
}