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

    // const svg = `<?xml version="1.0" encoding="utf-8"?>
    //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    //     <path d="M 351.501 26.845 C 358.289 24.385 365.711 24.385 372.547 26.845 L 466.296 60.591 C 478.7 65.068 487 76.924 487 90.255 L 487 209.745 C 487 223.027 478.7 234.932 466.247 239.409 L 372.499 273.156 C 365.711 275.615 358.289 275.615 351.453 273.156 L 257.704 239.409 C 245.3 234.883 237 223.027 237 209.696 L 237 90.255 C 237 76.973 245.3 65.068 257.753 60.591 L 351.501 26.845 Z M 362 56.508 L 277.186 87.008 L 362 117.508 L 446.814 87.008 L 362 56.508 Z M 377.626 237.835 L 455.75 209.745 L 455.75 117.262 L 377.626 145.351 L 377.626 237.835 Z" style="fill: rgb(255, 0, 0);"/>
    //     <text style="fill: rgb(255, 255, 255); font-family: Arial, sans-serif; font-size: 90px; font-weight: 700; text-anchor: middle; white-space: pre;" x="256.275" y="376.951">Scene an</text>
    //     <rect y="422" width="512" height="90" style="stroke: rgb(0, 0, 0); fill: rgb(255, 0, 0);"/>
    //     <text style="fill: rgb(255, 255, 255); font-family: Arial, sans-serif; font-size: 65px; font-weight: 700; text-anchor: end; white-space: pre;" x="462.898" y="487.796">32 CH</text>
    //     <text style="fill: rgb(255, 255, 255); font-family: Arial, sans-serif; font-size: 65px; font-weight: 700; white-space: pre;" x="51.392" y="488.675">ID 69</text>
    //     <ellipse style="fill: none; stroke-width: 5px; stroke: rgb(255, 255, 255);" cx="80" cy="80" rx="40" ry="40"/>
    //     </svg>`;
    // ev.action.setImage(`data:image/svg+xml,${encodeURIComponent(svg)}`);

    // ev.action.setTitle(
    //   (
    //     (ev.action.coordinates?.column ?? 0) +
    //     1 +
    //     (ev.action.coordinates?.row ?? 0) * 4
    //   ).toString()
    // );

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
    streamDeck.logger.info(
      "LoadSnippet button pressed" + ev.payload.settings.used
    );
    if (ev.payload.settings.used === true) {
      const svg = getIconSVG(1, 69, "Scene an", "#0000ff", true);
      ev.action.setImage(`data:image/svg+xml,${encodeURIComponent(svg)}`);
    }
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
        const svg = getIconSVG(1, 69, "Scene an", "#0000ff", false);
        ev.action.setImage(`data:image/svg+xml,${encodeURIComponent(svg)}`);
      }
      // ev.action.setImage("");
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
