import streamDeck, {
  action,
  DidReceiveSettingsEvent,
  type JsonObject,
  type KeyDownEvent,
  SingletonAction,
  WillAppearEvent,
} from "@elgato/streamdeck";
/**
 * An action that logs a Stream Deck key press.
 */
@action({ UUID: "net.phimai.snippet-mix-plugin.navigate.scroll" })
export class Scroll extends SingletonAction {
  /**
   * Handles the user pressing a Stream Deck key (pedal, G-key, etc).
   * @param ev Information about the event.
   */
  override onKeyDown(ev: KeyDownEvent<JsonObject>): void | Promise<void> {
    streamDeck.logger.info("Scroll button pressed");
  }

  override onWillAppear(
    ev: WillAppearEvent<JsonObject>
  ): Promise<void> | void {}

  override onDidReceiveSettings(
    ev: DidReceiveSettingsEvent<ScrollSettings>
  ): Promise<void> | void {
    streamDeck.logger.info("Scroll settings received", ev.payload.settings);

    // Handle settings if needed
    // For example, you can access the settings like this:
    // const scrollSpeed = ev.settings.scrollSpeed || 1;

    // You can also update the UI or perform other actions based on the settings
    if (ev.payload.settings.scroll_direction === "up") {
      streamDeck.logger.info("Scrolling up");
      //@ts-ignore
      ev.action.setState(0);
    } else if (ev.payload.settings.scroll_direction === "down") {
      streamDeck.logger.info("Scrolling down");
      //@ts-ignore
      ev.action.setState(1);
    } else {
      streamDeck.logger.warn(
        "Unknown scroll direction",
        ev.payload.settings.scroll_direction
      );
    }

    return Promise.resolve();
  }
}

type ScrollSettings = {
  scroll_direction: "up" | "down";
};
