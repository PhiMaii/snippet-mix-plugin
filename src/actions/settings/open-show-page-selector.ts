import streamDeck, {
	action,
	DidReceiveSettingsEvent,
	JsonObject,
	KeyDownEvent,
	SingletonAction,
	WillAppearEvent,
} from "@elgato/streamdeck";

@action({ UUID: "net.phimai.snippet-mix-plugin.settings.open-show-or-page-selector" })
export class OpenShowOrPageSelector extends SingletonAction<JsonObject> {
	override async onKeyDown(ev: KeyDownEvent<JsonObject>): Promise<void> {
		streamDeck.logger.info("OpenShowOrPageSelector button pressed");

		streamDeck.profiles.switchToProfile(ev.action.device.id, "SnippetMix-Default", 3);
	}

	override onDidReceiveSettings(ev: DidReceiveSettingsEvent<ShowPageSelectorSettings>): Promise<void> | void {
		streamDeck.logger.info(ev.payload.settings);
	}
}

type ShowPageSelectorSettings = {
	open_submenu: string;
};
