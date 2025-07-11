import streamDeck, {
  action,
  type KeyDownEvent,
  KeyUpEvent,
  SingletonAction,
  WillAppearEvent,
} from "@elgato/streamdeck";

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
  LONG_PRESS_THRESHOLD = 350; // Threshold for long press in milliseconds
  longPressTimer: ReturnType<typeof setTimeout> | null = null; // Timer for long press
  longPressFired = false; // Flag to check if long press was fired

  // static handleGlobalSettingsChanged(ev: any) {
  //   streamDeck.logger.info("Global settings received", ev);
  // }

  override onWillAppear(
    ev: WillAppearEvent<LoadSnippetSettings>
  ): Promise<void> | void {
    streamDeck.logger.debug("WillAppear event received", ev);
    // @ts-ignore
    ev.action.setState(0);
    ev.action.setSettings({
      used: false,
      loaded: false,
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
      const svg = getIconSVG(1, 69, "Scene an", "#0000ff", true);
      ev.action.setImage(`data:image/svg+xml,${encodeURIComponent(svg)}`);
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
  // loaded: boolean;
  // id: number;
  row: number;
  column: number;
};
