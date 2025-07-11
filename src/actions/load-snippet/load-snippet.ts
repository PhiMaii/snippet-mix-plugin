import streamDeck, {
  action,
  DidReceiveGlobalSettingsEvent,
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
  Snippet,
  getJsonData,
  getSnippetAtCoordinates,
} from "../../utils/JSONUtils";
import { getIconSVG } from "./images";
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

  static handleGlobalSettingsChanged(ev: any) {
    streamDeck.logger.info("Global settings received", ev);
  }

  override onWillAppear(
    ev: WillAppearEvent<LoadSnippetSettings>
  ): Promise<void> | void {
    // @ts-ignore

    ev.action.setState(0);
    ev.action.setSettings({
      used: false,
      active: false,
      row: ev.action.coordinates?.row,
      column: ev.action.coordinates?.column,
    });

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
    streamDeck.logger.info("LoadSnippet button pressed", ev);

    if (ev.payload.settings.used === true) {
      const svg = getIconSVG(
        1,
        69,
        "Scene an",
        "#0000ff",
        ev.payload.settings.active ? false : true
      );
      ev.action.setImage(`data:image/svg+xml,${encodeURIComponent(svg)}`);
    }

    ev.action.setSettings({
      active: !ev.payload.settings.active,
    });
    // if (ev.payload.settings.used === false) {
    //   ev.action.setSettings({
    //     used: true,
    //   });
    //   ev.action.setState(1);
    // } else {
    //   ev.action.showOk();
    // }
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

    let row = ev.payload.settings.row;
    let column = ev.payload.settings.column;

    let snp: Snippet | null = getSnippetAtCoordinates(pagesData, row, column);

    if (snp === null) {
      streamDeck.logger.info(
        `No snippet found at row: ${ev.action.coordinates?.row}, column: ${ev.action.coordinates?.column}`
      );
      ev.action.setImage("");
      //@ts-ignore
      ev.action.setState(0);

      return;
    }

    streamDeck.logger.info(
      `Page: ${snp.pageName}, Snippet ID: ${snp.snippetId}, Row: ${snp.row}, Col: ${snp.col}`
    );

    //@ts-ignore
    ev.action.setState(1);
    ev.action.setSettings({
      used: true,
    });
    const svg = getIconSVG(1, 11, "Scene an", "#0000ff", false);
    ev.action.setImage(`data:image/svg+xml,${encodeURIComponent(svg)}`);
  }
}

type LoadSnippetSettings = {
  used: boolean;
  active: boolean;
  id: number;
  row: number;
  column: number;
};
