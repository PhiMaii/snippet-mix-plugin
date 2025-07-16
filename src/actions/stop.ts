import streamDeck, { action, JsonObject, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";

@action({ UUID: "net.phimai.snippet-mix-plugin.stop" })
export class Stop extends SingletonAction<JsonObject> {
	override async onKeyDown(ev: KeyDownEvent<JsonObject>): Promise<void> {
		streamDeck.logger.warn("Stopping snippet mix!");
		// Update the count from the settings.
		streamDeck.profiles.switchToProfile(ev.action.device.id);
	}
}
