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
    streamDeck.settings.setGlobalSettings({
      messageReceived: true,
    });

    if (ev.payload.settings.scroll_direction === "up") {
      streamDeck.logger.info("Requesting scroll up");
      streamDeck.settings.setGlobalSettings({
        request_scroll_up: true,
      });
    } else if (ev.payload.settings.scroll_direction === "down") {
      streamDeck.logger.info("Requesting scroll down");
      streamDeck.settings.setGlobalSettings({
        request_scroll_down: true,
      });
    } else {
      streamDeck.logger.warn(
        "Unknown scroll direction",
        ev.payload.settings.scroll_direction
      );
    }

    streamDeck.actions.forEach((action) => {});

    // streamDeck.settings.getGlobalSettings<ScrollSettings>().then((settings) => {
    //   streamDeck.logger.info("Current scroll settings", settings);
    // });
  }

  override onWillAppear(
    ev: WillAppearEvent<JsonObject>
  ): Promise<void> | void {}

  override onDidReceiveSettings(
    ev: DidReceiveSettingsEvent<ScrollSettings>
  ): Promise<void> | void {
    let settings: ScrollSettings = ev.payload.settings;
    streamDeck.logger.info("Scroll settings received", settings);

    if (settings.scroll_amount != undefined) {
      streamDeck.logger.info(
        "Global Scroll amount set to",
        settings.scroll_amount
      );
      //@ts-ignore
      streamDeck.settings.setGlobalSettings({
        scroll_amount: settings.scroll_amount,
      });
    }

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
  scroll_amount: number;
};
