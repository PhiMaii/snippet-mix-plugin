import {
  action,
  JsonObject,
  KeyDownEvent,
  SingletonAction,
  WillAppearEvent,
} from "@elgato/streamdeck";

@action({ UUID: "net.phimai.snippet-mix-plugin.edit.toggle-save-fader" })
export class ToggleSaveFader extends SingletonAction<JsonObject> {
  override async onKeyDown(ev: KeyDownEvent<JsonObject>): Promise<void> {
    // Update the count from the settings.
  }
}
