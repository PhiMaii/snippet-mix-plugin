import streamDeck, {
  action,
  DidReceiveSettingsEvent,
  type JsonObject,
  type KeyDownEvent,
  SingletonAction,
  WillAppearEvent,
} from "@elgato/streamdeck";
import { LoadSnippet } from "../load-snippet/load-snippet";
/**
 * An action that logs a Stream Deck key press.
 */
@action({ UUID: "net.phimai.snippet-mix-plugin.navigate.scroll" })
export class Scroll extends SingletonAction {
  /**
   * Handles the user pressing a Stream Deck key (pedal, G-key, etc).
   * @param ev Information about the event.
   */

  scrollAmount: number = 1; // Default scroll amount

  override onKeyDown(ev: KeyDownEvent<JsonObject>): void | Promise<void> {
    streamDeck.logger.info("Scroll button pressed");
    const currentScrollAmount =
      streamDeck.settings.getGlobalSettings<ScrollSettings>();

    streamDeck.logger.info(currentScrollAmount);

    if (ev.payload.settings.scroll_direction === "up") {
      streamDeck.logger.info("Requesting scroll up");
      streamDeck.settings.setGlobalSettings({
        request_scroll: true,
      });
    } else if (ev.payload.settings.scroll_direction === "down") {
      streamDeck.logger.info("Requesting scroll down");
      streamDeck.settings.setGlobalSettings({
        request_scroll: true,
      });
    } else {
      streamDeck.logger.warn(
        "Unknown scroll direction",
        ev.payload.settings.scroll_direction
      );
    }

    streamDeck.actions.forEach((action) => {
      // streamDeck.logger.info(action);
      if (action.manifestId === "net.phimai.snippet-mix-plugin.load-snippet") {
        // streamDeck.logger.info("Updating action settings for scroll", action);
        //@ts-ignore
        // let currentRow = action.getSettings.load_snippet_from_row;
        // streamDeck.logger.info(currentRow);
        //@ts-ignore
        // action.setSettings({
        //@ts-ignore
        // row: action.getSettings().row + this.scrollAmount,
        //@ts-ignore
        // column: action.getSettings().column,
        // });
        // streamDeck.logger.info("updating scrolling for: ", action);
      }
    });

    // streamDeck.settings.getGlobalSettings<ScrollSettings>().then((settings) => {
    //   streamDeck.logger.info("Current scroll settings", settings);
    // });
  }

  override onWillAppear(ev: WillAppearEvent<JsonObject>): Promise<void> | void {
    // const scroll_offset = streamDeck.settings.getGlobalSettings();
    // streamDeck.logger.info(scroll_offset);
  }

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
      this.scrollAmount = settings.scroll_amount;
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

type globalSettings = {
  request_scroll: boolean;
  current_scroll_amount: number;
};
