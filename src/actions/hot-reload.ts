import streamDeck, { action, JsonObject, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";

@action({ UUID: "net.phimai.snippet-mix-plugin.hot-reload" })
export class HotReload extends SingletonAction<JsonObject> {
	override async onKeyDown(ev: KeyDownEvent<JsonObject>): Promise<void> {
		streamDeck.logger.info("HotReload button pressed");
	}
}
