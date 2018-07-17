/**
 * Created by me on 31.10.2017.
 */

module Slot.BackgroundModule {
    import LayersProxy = Core.GameSetupModule.LayersProxy;
    import PIXILayerVO = Core.GameSetupModule.PIXILayerVO;
    import INotification = MVC.Core.INotification;
    import AbstractMediator = TypeBetFramework.AbstractMediator;
    import IAbstractView = TypeBetFramework.IAbstractView;
    import FreeSpinsProxy = Slot.FreeSpinModule.FreeSpinsProxy;
    import Log = Utils.Log;
    import INotification = MVC.Core.INotification;
    import UINotifications = Core.UserInterfaceModule.UINotifications;
    import UIButtonsNames = Core.UserInterfaceModule.UIButtonsNames;
    import ButtonStateVO = Core.UserInterfaceModule.ButtonStateVO;
    import UserInterfaceAction = Core.UserInterfaceModule.UserInterfaceAction;
    import ButtonBehaviorVO = Core.UserInterfaceModule.ButtonBehaviorVO;

    export class S100LForestManiaAnimatedBackgroundMediator extends AbstractMediator {
        private freeSpinsProxy: FreeSpinsProxy;
        private animationActive:boolean = false;

        constructor(name: string, viewComponent: IAbstractView) {
            super(name, viewComponent);
        }

        public get layer(): string {
            return "AnimatedBackgroundLayer";
        }

        public get view(): S100LForestManiaAnimatedBackgroundView {
            return this.viewComponent as S100LForestManiaAnimatedBackgroundView;
        }

        public preRegister(): void{
            this.initLayers();
            super.preRegister();
        }

        private initLayers(): void{
            let layersProxy: LayersProxy = this.retrieveGlobalProxy(Names.Proxies.LAYERS, Names.Modules.GAME_SETUP);
            (layersProxy.addPIXILayer("AnimatedBackgroundLayer", Names.Layers.LOGO, true));
        }

        protected postRegister(): void{
            super.postRegister();

        }

        public addNotifications(): void{
            super.addNotifications();
            this.addNotification("DropTheBucket", this.startBucketAnimation.bind(this));
            this.addNotification(Notifications.Global.SKIP, this.skip.bind(this));

            this.addNotification(Notifications.Global.CHANGE_BACKGROUND, this.changeBackground.bind(this));


            /*this.addNotification(Notifications.Global.START_FREE_SPINS_ROUND, this.stopParticles.bind(this));
            this.addNotification(Notifications.Global.END_FREE_SPINS_ROUND, this.startParticles.bind(this));
            this.addNotification(Notifications.Bonus.START_BONUS, this.stopParticles.bind(this));
            this.addNotification(Notifications.Bonus.BONUS_COMPLETE, this.startParticles.bind(this));*/
        }

        /**
         * Call switchFrame from the view when receiving the notification CHANGE_BACKGROUND
         * containing the index of the mode wanted
         */
        protected changeBackground(notification: INotification) {
            this.view.switchFrame(notification.body["frame"]);
        }

        public addSignalListeners(): void {
            super.addSignalListeners();
            this.addListenerToSignal("characterAnimationDone", this.characterAnimationDone, this);
            this.addListenerToSignal("characterAnimationDone_fs", this.characterAnimationDone_fs, this);
            this.addListenerToSignal("switchToFsBG", this.switchToFsBG, this);
        }

        private startBucketAnimation(notification: INotification): void{
            console.log("startBucketAnimation");
            this.view.startBucketAnimation(notification.body);
            this.animationActive = true;
            this.enableSkipButton();
        }

        private skip(notification: INotification){
            if(this.animationActive){
                this.view.skipAnimation(notification.body);

            }
        }

        private switchToFsBG(){
            this.sendGlobalNotification(Notifications.Global.CHANGE_BACKGROUND,
                                        {
                                            frame            : 1
                                        });
        }

        private enableSkipButton(){
            this.sendGlobalNotification(UINotifications.UPDATE_USER_INTERFACE_BUTTONS,
                                  [
                                      this.setButtonBehaviour(UIButtonsNames.SKIP,
                                                              ButtonStateVO.VISIBLE,
                                                              ButtonStateVO.ENABLE),
                                      this.setButtonBehaviour(UIButtonsNames.SPIN,
                                                              ButtonStateVO.INVISIBLE,
                                                              ButtonStateVO.DISABLE),
                                      this.setButtonBehaviour(UIButtonsNames.STOP_SPIN,
                                                              ButtonStateVO.INVISIBLE,
                                                              ButtonStateVO.DISABLE),
                                      this.setButtonBehaviour(UIButtonsNames.AUTO_PLAY,
                                                              ButtonStateVO.VISIBLE,
                                                              ButtonStateVO.ENABLE)
                                  ]);
            this.sendGlobalNotification(UINotifications.ACTIVATE_USER_SHORTCUT,
                                  {
                                      userAction : UserInterfaceAction.SKIP,
                                      activate   : true
                                  });
            this.sendGlobalNotification(UINotifications.ACTIVATE_USER_SHORTCUT,
                                  {
                                      userAction : UserInterfaceAction.SPIN,
                                      activate   : false
                                  });
            this.sendGlobalNotification(UINotifications.ENABLE_USER_INTERFACE_BUTTONS, true);
        }

        private disableSkipButton(){
            this.sendGlobalNotification(UINotifications.ENABLE_USER_INTERFACE_BUTTONS, false);
            this.sendGlobalNotification(UINotifications.UPDATE_USER_INTERFACE_BUTTONS,
                                  [
                                      this.setButtonBehaviour(UIButtonsNames.STOP_AUTO_PLAY,
                                                              ButtonStateVO.INVISIBLE,
                                                              ButtonStateVO.DISABLE),
                                      this.setButtonBehaviour(UIButtonsNames.SKIP,
                                                              ButtonStateVO.INVISIBLE,
                                                              ButtonStateVO.DISABLE),
                                      this.setButtonBehaviour(UIButtonsNames.STOP_SPIN,
                                                              ButtonStateVO.VISIBLE,
                                                              ButtonStateVO.DISABLE),
                                      this.setButtonBehaviour(UIButtonsNames.SPIN,
                                                              ButtonStateVO.INVISIBLE,
                                                              ButtonStateVO.DISABLE)
                                  ]);
            this.sendGlobalNotification(UINotifications.ACTIVATE_USER_SHORTCUT,
                                  {
                                      userAction : UserInterfaceAction.SKIP,
                                      activate   : false
                                  });
        }

        /**
         * Show/hide, enable/disable a button, or leave it unchanged.
         */
        protected setButtonBehaviour(buttonName: string, showButton: any = true,
                                     enableButton: any                   = true): ButtonBehaviorVO {
            return new ButtonBehaviorVO(buttonName, showButton, enableButton);
        }

        private characterAnimationDone(){
            this.sendGlobalNotification("characterAnimationDone");
            this.disableSkipButton();
            this.animationActive = false;
        }

        private characterAnimationDone_fs(){
            this.sendGlobalNotification("characterAnimationDone_fs");
            this.animationActive = false;
        }

        /*private startParticles(): void{
            this.view.startParticles();
        }

        private stopParticles(): void{
            if(this.freeSpinsProxy.freeSpinsInProgress && this.freeSpinsProxy["type"] === "cactus_cash"){
                return;
            }

            this.view.removeParticles();
        }*/
    }
}