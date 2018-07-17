/**
 *  iSOFTBET
 *  Copyright 2016 iSOFTBET
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 *
 *  Created by Joshua Moore on 26/04/17.
 */
module Slot.BackgroundModule {
    import Background = Slot.BackgroundModule.Background;
    export class S100LForestManiaBackgroundModule extends Background {
        constructor(name: string) {
            super(name);
        }

        registerMediators() {
            super.registerMediators();
            this.addMediator(S100LForestManiaAnimatedBackgroundMediator, 'S100LForestManiaAnimatedBackgroundView');
        }

    }
}