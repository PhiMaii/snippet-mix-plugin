import streamDeck from "@elgato/streamdeck";

streamDeck.settings.onDidReceiveGlobalSettings((ev) => {
	streamDeck.logger.info("Global settings received", ev);
});
