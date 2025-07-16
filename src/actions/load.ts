import streamDeck, { action, JsonObject, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";

@action({ UUID: "net.phimai.snippet-mix-plugin.load" })
export class Load extends SingletonAction<JsonObject> {
	override async onKeyDown(ev: KeyDownEvent<JsonObject>): Promise<void> {
		streamDeck.logger.info("Load button pressed");
	}
}
