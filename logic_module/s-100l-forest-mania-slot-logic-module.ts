/// <reference path="commands/s-100l-forest-mania-initialize-slot-logic-module-command.ts"/>
/**
 *  iSOFTBET
 *  Copyright 2017 iSOFTBET
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 *
 *  Created by Kirill Primachov on 30/04/2018.
 */
module Slot.LogicModule {
	/**
	 * Module that dictates the behaviour of a slot type game.
	 */
	export class S100LForestManiaSlotLogic extends SlotLogic {
		constructor(name: string) {
			super(name);
		}

		/**
		 * @inheritDoc
		 */
		registerCommands() {
			super.registerCommands();
			//initialize
			this.replaceCommand(Notifications.Global.INITIALIZE_MODULE, S100LForestManiaInitializeSlotLogicModuleCommand);
		}

		registerProxies() {
			super.registerProxies();
		}

		registerViews() {
			super.registerViews();
		}

		registerMediators() {
			super.registerMediators();
		}
	}
}