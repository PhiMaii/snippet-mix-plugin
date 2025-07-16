import streamDeck, {
  action,
  DidReceiveSettingsEvent,
  type JsonObject,
  type KeyDownEvent,
  SingletonAction,
  WillAppearEvent,
} from "@elgato/streamdeck";
import {
  LOAD_SNIPPET_ACTIONS,
  SCROLL_OFFSET,
  SET_SCROLL_OFFSET,
} from "../../plugin";
import { RenderSnippet } from "../load-snippet/load-snippet";
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

  constructor() {
    super();
    //Reset scroll_offset to 0 on plugin restart/streamdeck software start
  }

  override async onKeyDown(ev: KeyDownEvent<JsonObject>) {
    streamDeck.logger.info("Scroll button pressed");
    /*const scrollSettings =
            await streamDeck.settings.getGlobalSettings<GlobalScrollSettings>();*/
    /* const newNbr = {
            scroll_offset: Math.random(),
        };
        await streamDeck.settings.setGlobalSettings(newNbr);
        streamDeck.logger.info("SET", newNbr); */

    //@ts-ignore
    /* SET_SCROLL_OFFSET(SCROLL_OFFSET - 1);
        streamDeck.logger.info("ACTIONS: ", LOAD_SNIPPET_ACTIONS);
        for (const action of LOAD_SNIPPET_ACTIONS) {
            // RERENDER
            //action.setTitle("RR");
            //action.setImage(" ");
            RenderSnippet(action);
            //action.
        }
        return; */

    /* streamDeck.logger.info("ScrollSettings", scrollSettings);

        if (scrollSettings.scroll_offset === undefined) {
            scrollSettings.scroll_offset = 0;
        } */

    if (ev.payload.settings.scroll_direction === "up") {
      if (SCROLL_OFFSET <= 0) {
        ev.action.showAlert();
        return;
      }

      SET_SCROLL_OFFSET(SCROLL_OFFSET - 1);
      for (const action of LOAD_SNIPPET_ACTIONS) {
        RenderSnippet(action);
      }

      ev.action.showOk();
    } else if (ev.payload.settings.scroll_direction === "down") {
      SET_SCROLL_OFFSET(SCROLL_OFFSET + 1);
      for (const action of LOAD_SNIPPET_ACTIONS) {
        RenderSnippet(action);
      }

      await ev.action.showOk();
    } else {
      streamDeck.logger.warn(
        "Unknown scroll direction",
        ev.payload.settings.scroll_direction
      );
    }
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

export type GlobalScrollSettings = {
  scroll_offset: number;
};
