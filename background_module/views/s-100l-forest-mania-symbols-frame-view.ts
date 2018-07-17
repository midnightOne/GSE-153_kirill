/**
 * Created by me on 18.07.2017.
 */

module Slot.BackgroundModule {
    import AbstractSymbolsFrameView = Slot.BackgroundModule.AbstractSymbolsFrameView;
    import Container = PIXI.Container;

    //TODO throw out
    export class S100LForestManiaSymbolsFrameView extends AbstractSymbolsFrameView {

        constructor(name: string) {
            super(name);
        }

        postRegister(){

        }

        public switchFrame(indexFrame: number, immediate: boolean = true): void {
            super.switchFrame(indexFrame, immediate);
        }

        protected hideAllFrame(immediate: boolean): void {
            super.hideAllFrame(immediate);
        }
    }
}