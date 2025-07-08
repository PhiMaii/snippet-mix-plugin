import {
  action,
  JsonObject,
  KeyDownEvent,
  SingletonAction,
  WillAppearEvent,
} from "@elgato/streamdeck";

@action({ UUID: "net.phimai.snippet-mix-plugin.edit.toggle-save-eq" })
export class ToggleSaveEQ extends SingletonAction<JsonObject> {
  override async onKeyDown(ev: KeyDownEvent<JsonObject>): Promise<void> {
    // Update the count from the settings.
  }
}
