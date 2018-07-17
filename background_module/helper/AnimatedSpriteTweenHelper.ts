/**
 * Created by Midnight on 27.06.2018.
 */

module Slot.BackgroundModule {
	import AnimatedSprite = PIXI.extras.AnimatedSprite;

	export class AnimatedSpriteTweenHelper {


		private _frame:number;
		private _progress:number=0;
		private _animation:AnimatedSprite;
		//private totalFrames:number;

		constructor(animation:AnimatedSprite){
			this._animation = animation;
			//this.totalFrames = this._animation.totalFrames;
		}

		public get progress(): number {
			return this._progress;
		}

		public set progress(value: number) {
			this._progress = value;
			this.frame = this._animation.totalFrames*value;
		}


		public get frame(): number {
			return this._frame;
		}

		public set frame(value: number) {
			this._frame = Math.round(value);
			this._animation.gotoAndStop(this._frame);
		}


	}

}


