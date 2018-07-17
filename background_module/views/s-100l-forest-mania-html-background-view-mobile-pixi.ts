
/**
 *  iSOFTBET
 *  Copyright 2017 iSOFTBET
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 *
 *  Created by Sam Bellman on 15/11/2017.
 */
module Slot.BackgroundModule {
	import SceneManager = MVC.GraphicsEngine.SceneManager;
	import PIXIContainer = UI.Components.PIXIContainer;

	export class S100LBackgroundMobileViewPixi extends BackgroundViewPixi {
		public switchFrame(indexFrame: number, immediate: boolean = true): void {
			super.switchFrame(indexFrame,immediate);
			TweenMax.delayedCall(this.BACKGROUND_ANIMATION_DURATION, this.deviceScreenResized.bind(this));
		}

		public deviceScreenResized(): void {
			super.deviceScreenResized();
			if(this.currentIndex >= 0) {
				if (Utils.Device.isLandscape()) {
					this.display.children[this.currentIndex].x = 0;
					this.display.children[this.currentIndex].scale.x =
						this.display.children[this.currentIndex].scale.y = 1;

				} else {
					(this.display.children[this.currentIndex] as PIXIContainer).width = SceneManager.getScreenWidth;
					this.display.children[this.currentIndex].scale.y = (this.display.children[this.currentIndex].scale.x *= 1.7); //TODO Find where the "normal" layout is scaled down to 0.6 and remove this correction
					this.display.children[this.currentIndex].x = 0;
				}
			}
		}
	}
}