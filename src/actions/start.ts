import streamDeck, { action, JsonObject, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";

@action({ UUID: "net.phimai.snippet-mix-plugin.start" })
export class Start extends SingletonAction<JsonObject> {
	override async onKeyDown(ev: KeyDownEvent<JsonObject>): Promise<void> {
		streamDeck.logger.warn("Starting Snippet-Mix");
		// Update the count from the settings.

		streamDeck.profiles.switchToProfile(ev.action.device.id, "SnippetMix-Default", 0);
	}
}
