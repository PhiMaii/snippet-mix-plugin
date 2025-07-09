import streamDeck, {
  action,
  type JsonObject,
  type KeyDownEvent,
  SingletonAction,
  WillAppearEvent,
} from "@elgato/streamdeck";
/**
 * An action that logs a Stream Deck key press.
 */
@action({ UUID: "net.phimai.snippet-mix-plugin.row-up" })
export class RowUp extends SingletonAction {
  /**
   * Handles the user pressing a Stream Deck key (pedal, G-key, etc).
   * @param ev Information about the event.
   */
  override onKeyDown(ev: KeyDownEvent<JsonObject>): void | Promise<void> {
    streamDeck.logger.info("RowUp button pressed");
  }

  override onWillAppear(ev: WillAppearEvent<JsonObject>): Promise<void> | void {
    const svg = ``;
    ev.action.setImage(`data:image/svg+xml,${encodeURIComponent(svg)}`);
  }
}
