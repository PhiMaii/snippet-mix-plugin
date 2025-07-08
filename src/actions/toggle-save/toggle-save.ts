import streamDeck, {
  action,
  DidReceiveSettingsEvent,
  JsonObject,
  KeyDownEvent,
  SingletonAction,
  WillAppearEvent,
} from "@elgato/streamdeck";

@action({ UUID: "net.phimai.snippet-mix-plugin.edit.toggle-save" })
export class ToggleSave extends SingletonAction<JsonObject> {
  override async onKeyDown(ev: KeyDownEvent<JsonObject>): Promise<void> {
    // Update the count from the settings.
  }

  override onDidReceiveSettings(
    ev: DidReceiveSettingsEvent<togggleSaveSettings>
  ): Promise<void> | void {
    streamDeck.logger.info("Settings received", ev.payload.settings);
    // ev.action.setSettings({
    //   functionality: ev.payload.settings.functionality,
    //   showTitle: ev.payload.settings.showTitle,
    // });
  }

  override onWillAppear(ev: WillAppearEvent<JsonObject>): Promise<void> | void {
    streamDeck.logger.info("Received settings", ev.payload.settings);

    if (ev.payload.settings.show_title === true) {
      switch (ev.payload.settings.toggle_function) {
        case "gain":
          ev.action.setTitle("Gain");
          break;
        case "fader":
          ev.action.setTitle("Fader");
          break;
        case "eq":
          ev.action.setTitle("EQ");
          break;
        case "state":
          ev.action.setTitle("State");
          break;
        default:
          ev.action.setTitle("");
          break;
      }
    } else ev.action.setTitle("");
  }
}

type togggleSaveSettings = {
  functionality: "gain" | "fader" | "eq" | "state";
  showTitle: boolean;
};
