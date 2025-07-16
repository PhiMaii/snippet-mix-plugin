import streamDeck, { action, JsonObject, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";

import { PAGES_DATA } from "../../plugin";

@action({ UUID: "net.phimai.snippet-mix-plugin.settings.load-show-or-page" })
export class LoadShowOrPage extends SingletonAction<JsonObject> {
	override async onKeyDown(ev: KeyDownEvent<JsonObject>): Promise<void> {
		streamDeck.logger.info("LoadShowOrPage button pressed");
	}

	override async onWillAppear(ev: WillAppearEvent<JsonObject>): Promise<void> {
		// for (const page of PAGES_DATA) {
		// 	page.name;
		// }

		await ev.action.setImage(" ");
		//@ts-ignore
		// ev.action.setState(1);
		return;

		const index = (ev.action.coordinates?.row ?? 0 + 1) * 5 + (ev.action.coordinates?.column ?? 0 + 1);
		const page = PAGES_DATA[index];

		if (page !== undefined) {
			ev.action.setTitle(page.name);
		} else {
			ev.action.setTitle("");
		}
	}
}
