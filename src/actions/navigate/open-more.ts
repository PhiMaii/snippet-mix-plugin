import streamDeck, { action, type JsonObject, type KeyDownEvent, SingletonAction } from "@elgato/streamdeck";

/**
 * An action that logs a Stream Deck key press.
 */
@action({ UUID: "net.phimai.snippet-mix-plugin.navigate.open-more" })
export class OpenMore extends SingletonAction {
	/**
	 * Handles the user pressing a Stream Deck key (pedal, G-key, etc).
	 * @param ev Information about the event.
	 */
	override onKeyDown(ev: KeyDownEvent<JsonObject>): void | Promise<void> {
		streamDeck.logger.info("OpenMore button pressed");

		streamDeck.profiles.switchToProfile(ev.action.device.id, "SnippetMix-Default", 1);
	}
}
