import streamDeck, {
	action,
	DidReceiveSettingsEvent,
	JsonObject,
	KeyDownEvent,
	SingletonAction,
	WillAppearEvent,
} from "@elgato/streamdeck";

@action({ UUID: "net.phimai.snippet-mix-plugin.start" })
export class Start extends SingletonAction<JsonObject> {
	override async onKeyDown(ev: KeyDownEvent<JsonObject>): Promise<void> {
		streamDeck.logger.warn("Starting Snippet-Mix", await streamDeck.settings.getGlobalSettings());
		// Update the count from the settings.

		streamDeck.profiles.switchToProfile(ev.action.device.id, "SnippetMix-Default", 0);
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
