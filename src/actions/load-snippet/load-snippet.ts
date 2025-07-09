import streamDeck, {
  action,
  type JsonObject,
  type KeyDownEvent,
  KeyUpEvent,
  SingletonAction,
  WillAppearEvent,
} from "@elgato/streamdeck";

import fs from "fs";
import path from "path";
import "../../utils/JSONUtils";
import {
  getAllSnippetsWithCoordinates,
  getJsonData,
} from "../../utils/JSONUtils";
/**
 * An action that logs a Stream Deck key press.
 */
@action({ UUID: "net.phimai.snippet-mix-plugin.load-snippet" })
export class LoadSnippet extends SingletonAction<LoadSnippetSettings> {
  /**
   * Handles the user pressing a Stream Deck key (pedal, G-key, etc).
   * @param ev Information about the event.
   */

  LONG_PRESS_THRESHOLD = 350; // ms
  longPressTimer: ReturnType<typeof setTimeout> | null = null;
  longPressFired = false;

  id: number = 0;

  constructor() {
    super();
    streamDeck.logger.info("LoadSnippet : Constructor called");
  }

  override onWillAppear(
    ev: WillAppearEvent<LoadSnippetSettings>
  ): Promise<void> | void {
    // @ts-ignore
    ev.action.setState(0);
    ev.action.setSettings({
      used: false,
    });

    ev.action.setTitle(
      (
        (ev.action.coordinates?.column ?? 0) +
        1 +
        (ev.action.coordinates?.row ?? 0) * 4
      ).toString()
    );

    this.loadPage(ev);

    //   ev.payload.settings.used?.toString();
  }

  override async onKeyUp(ev: KeyUpEvent<LoadSnippetSettings>): Promise<void> {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }

    if (!this.longPressFired) {
      this.shortPress(ev);
    }
  }

  override onKeyDown(
    ev: KeyDownEvent<LoadSnippetSettings>
  ): void | Promise<void> {
    this.longPressFired = false;

    this.longPressTimer = setTimeout(() => {
      this.longPressFired = true;
      this.longPress(ev);
    }, this.LONG_PRESS_THRESHOLD);
  }

  // #####################
  async shortPress(ev: KeyUpEvent<LoadSnippetSettings>): Promise<void> {
    streamDeck.logger.info("LoadSnippet button pressed");
    if (ev.payload.settings.used === false) {
      ev.action.setSettings({
        used: true,
      });
      ev.action.setState(1);
    } else {
      ev.action.showOk();
    }
  }

  async longPress(ev: KeyDownEvent<LoadSnippetSettings>): Promise<void> {
    streamDeck.logger.info("LoadSnippet button long pressed");
    if (ev.payload.settings.used === true) {
      streamDeck.profiles.switchToProfile(
        ev.action.device.id,
        "SnippetMix-Default",
        2
      );
    }
  }

  async loadPage(ev: WillAppearEvent<LoadSnippetSettings>) {
    const PATH = path.join(process.cwd(), "../src/data/pages.json");
    const pagesData = await getJsonData(PATH);

    // streamDeck.logger.info(getAllSnippetsWithCoordinates(pagesData));

    getAllSnippetsWithCoordinates(pagesData).forEach((snippet) => {
      streamDeck.logger.info(
        `Page: ${snippet.pageName}, Snippet ID: ${snippet.snippetId}, Row: ${snippet.row}, Col: ${snippet.col}`
      );

      if (
        ev.action.coordinates?.column === snippet.col &&
        ev.action.coordinates?.row === snippet.row
      ) {
        //@ts-ignore
        ev.action.setState(1);
        ev.action.setSettings({
          used: true,
        });
      }
      //@ts-ignore
      // else ev.action.setState(0);
    });
  }
}

type LoadSnippetSettings = {
  used: boolean;
  id: number;
  position: [number, number];
};
