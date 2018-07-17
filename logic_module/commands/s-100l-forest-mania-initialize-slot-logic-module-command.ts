
/**
 *  iSOFTBET
 *  Copyright 2017 iSOFTBET
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 *
 *  Created by  Kirill Primachov on 30/04/2018.
 */
module Slot.LogicModule {
	import Log = Utils.Log;
	import INotification = MVC.Core.INotification;

	/**
	 * Command used to initialize the module.
	 */
	export class S100LForestManiaInitializeSlotLogicModuleCommand extends InitializeSlotLogicModuleCommand {

		execute(notification: INotification) {
			super.execute(notification);
		}


		/**
		 * Spin command actions, concact coin value [debugCommand] and bet value.
		 */
		protected sendSpinCommand() {
			//only for test
			// this.endGameDecisionProxy.resetEndGameActions();
			//Since the server doesn't seems to accept separate command for the spin
			//For now I put the cheatTool sendCommand here (but the Command Utils.ServerActions.SEND_DEBUG_COMMAND
			// has been register and is called on spin if isDebugCommandPresent return true)
			if (this.settings.getValue("ALLOW_CHEAT_TOOL") == true && this.cheatToolProxy &&
			    (this.cheatToolProxy.isDebugCommandPresent() || this.cheatToolProxy.isSpecialDebugCommandPresent())) {
				let commandSentToServer: any;
				if (!this.cheatToolProxy.isSpecialDebugCommandPresent()) {
					let debugCommandArr = this.cheatToolProxy.getDebugCommand().split("&");
					let debugCommand: any = [this.DEBUG_COMMAND, debugCommandArr[0], this.DEBUG_COMMAND, debugCommandArr[1]];
					commandSentToServer = this.getCoinValueCommand().concat(debugCommand)
					                          .concat(this.getBetCommand());
					Log.info("Sending Debug command " + debugCommand);
				} else {
					let specialDebugSymbolsCombination: string[] = this.cheatToolProxy.getDebugSpecialCommand();
					let debugCommand: any;
					if (this.cheatToolProxy.isDebugCommandPresent()) {
						let debugCommandArr = this.cheatToolProxy.getDebugCommand().split("&");
                        debugCommand =[this.DEBUG_COMMAND, debugCommandArr[0], this.DEBUG_COMMAND, debugCommandArr[1]]
							.concat(specialDebugSymbolsCombination);

                        Log.info("Sending Debug command + special" + debugCommand);
					} else {
                        debugCommand =specialDebugSymbolsCombination;
						Log.info("Sending only SPECIAL Debug command " + debugCommand);
					}
					commandSentToServer = this.getCoinValueCommand().concat(debugCommand)
					                          .concat(this.getBetCommand());
				}
				this.connectionProxy.send(commandSentToServer);
			} else {
				this.connectionProxy.send(this.getCoinValueCommand().concat(this.getBetCommand()));
			}
			this.connectionProxy.resetServerData();
		}
	}
}