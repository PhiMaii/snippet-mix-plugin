import streamDeck, {
	action,
	DidReceiveSettingsEvent,
	JsonObject,
	KeyDownEvent,
	SingletonAction,
} from "@elgato/streamdeck";

import { WEBSOCKET_MANAGER } from "../plugin";

@action({ UUID: "net.phimai.snippet-mix-plugin.start" })
export class Start extends SingletonAction<JsonObject> {
	override async onKeyDown(ev: KeyDownEvent<StartSettings>): Promise<void> {
		streamDeck.logger.warn("Starting Snippet-Mix", await streamDeck.settings.getGlobalSettings());
		// Update the count from the settings.

		streamDeck.profiles.switchToProfile(ev.action.device.id, "SnippetMix-Default", 0);

		let settings = ev.payload.settings;

		WEBSOCKET_MANAGER.CONNECT_WEBSOCKET(settings.ws.host, settings.ws.port, settings.ws.show_name);
	}

	override async onDidReceiveSettings(ev: DidReceiveSettingsEvent<StartSettings>): Promise<void> {
		let settings = ev.payload.settings;

		await streamDeck.settings.setGlobalSettings({
			ws: {
				host: settings.ws.host,
				port: settings.ws.port,
				show_name: settings.ws.show_name,
			},
		});
	}
}

type StartSettings = {
	ws: {
		host: string;
		port: number;
		show_name: string;
	};
};
