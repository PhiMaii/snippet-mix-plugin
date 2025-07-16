import streamDeck, { action, JsonObject, KeyDownEvent, SingletonAction } from "@elgato/streamdeck";

import { WEBSOCKET_MANAGER } from "../plugin";

@action({ UUID: "net.phimai.snippet-mix-plugin.start" })
export class Start extends SingletonAction<JsonObject> {
	override async onKeyDown(ev: KeyDownEvent<JsonObject>): Promise<void> {
		streamDeck.logger.warn("Starting Snippet-Mix");
		// Update the count from the settings.

		streamDeck.profiles.switchToProfile(ev.action.device.id, "SnippetMix-Default", 0);

		WEBSOCKET_MANAGER.CONNECT_WEBSOCKET("localhost", 8080, "default");
	}
}
