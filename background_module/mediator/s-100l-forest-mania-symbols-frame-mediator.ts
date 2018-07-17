/**
 * Created by me on 18.07.2017.
 */
/**
 *  iSOFTBET
 *  Copyright 2017 iSOFTBET
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 *
 *  Created by Usaniov Roman on 6/19/17.
 */
module Slot.BackgroundModule {
    import IAbstractView = TypeBetFramework.IAbstractView;
    import INotification = MVC.Core.INotification;
    import AbstractSymbolsFrameMediator = Slot.BackgroundModule.AbstractSymbolsFrameMediator;
    import Device = Utils.Device;

    export class S100LForestManiaSymbolsFrameMediator extends AbstractSymbolsFrameMediator {


        constructor(name: string, viewComponent: IAbstractView) {
            super(name, viewComponent);
        }

        public preRegister() {
            super.preRegister();
        }

        public get view(): S100LForestManiaSymbolsFrameView {
            return this.viewComponent as S100LForestManiaSymbolsFrameView;
        }

        protected changeBackground(notification:any) {
            super.changeBackground(notification);
        }

        protected onDeviceOrientationChanged(notification: INotification): void {
            super.onDeviceOrientationChanged(notification);
        }
    }
}