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
  getJsonData,
  getSnippetIDAtCoordinates,
  getSnippetInfo,
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
  PATH_PAGES = path.join(process.cwd(), "../src/data/pages.json");
  PATH_SNIPPETS = path.join(process.cwd(), "../src/data/snippets.json");

  override async onWillAppear(
    ev: WillAppearEvent<LoadSnippetSettings>
  ): Promise<void> {
    // streamDeck.logger.info("WillAppear event received", ev);
    ev.action.setImage("");

    this.updateSettingsFromJSON(ev);

    streamDeck.logger.info(ev.payload.settings);

    let buttonUsed: boolean = ev.payload.settings.button_used;
    let snippetID: number = ev.payload.settings.snippet_id;

    if (buttonUsed) {
      //@ts-ignore
      ev.action.setState(1);
      // ev.action.setTitle(snippetID.toString());
      ev.action.setTitle("");

      let snippet: Snippet | null = getSnippetInfo(
        this.PATH_SNIPPETS,
        snippetID
      );

      // streamDeck.logger.info(snippet);

      const svg = getIconSVG(
        snippetID,
        snippet?.snippet_channels.length ?? NaN,
        snippet?.snippet_name ?? "null",
        snippet?.snippet_color[1] ?? "NaN",
        false,
        snippet?.snippet_icon ?? "fa-cube"
      );
      ev.action.setImage(`data:image/svg+xml,${encodeURIComponent(svg)}`);
    } else {
      //@ts-ignore
      ev.action.setState(0);
      ev.action.setTitle("");
    }

    let realRow: number = ev.action.coordinates?.row ?? -1;
    let realColumn: number = ev.action.coordinates?.column ?? -1;

    let loadRow: number = ev.payload.settings.load_snippet_from_row;

    // streamDeck.logger.info("Real Row: ", realRow, "Read Row: ", loadRow);
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
  shortPress(ev: KeyUpEvent<LoadSnippetSettings>): void {
    streamDeck.logger.info("LoadSnippet button pressed", ev);

    let snippetID = ev.payload.settings.snippet_id;

    if (ev.payload.settings.button_used === true) {
      if (ev.payload.settings.snippet_active === false) {
        let snippet: Snippet | null = getSnippetInfo(
          this.PATH_SNIPPETS,
          snippetID
        );

        const svg = getIconSVG(
          snippetID,
          snippet?.snippet_channels.length ?? NaN,
          snippet?.snippet_name ?? "null",
          snippet?.snippet_color[1] ?? "NaN",
          true,
          snippet?.snippet_icon ?? "fa-cube"
        );
        ev.action.setImage(`data:image/svg+xml,${encodeURIComponent(svg)}`);
      }
    }
  }

  longPress(ev: KeyDownEvent<LoadSnippetSettings>): void {
    streamDeck.logger.info("LoadSnippet button long-pressed");

    if (ev.payload.settings.button_used === true) {
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

    // const svg = getIconSVG(1, 11, "Scene an", "#0000ff", false);
    // ev.action.setImage(`data:image/svg+xml,${encodeURIComponent(svg)}`);
  }

  async updateSettingsFromJSON(ev: WillAppearEvent<LoadSnippetSettings>) {
    // if (ev.payload.settings.load_snippet_from_row === undefined) {
    //   ev.action.setSettings({
    //     load_snippet_from_row: ev.action.coordinates?.row,
    //   });
    // }

    let row: number | null = ev.payload.settings.load_snippet_from_row ?? null;
    let column: number = ev.action.coordinates?.column ?? -1;

    // if (ev.payload.settings.load_snippet_from_row === null) {
    //   streamDeck.logger.info("reading out rows direkliy");
    //   row = ev.action.coordinates?.row ?? -1;
    // }

    const pagesData = await getJsonData(this.PATH_PAGES);

    const id: number | null = getSnippetIDAtCoordinates(pagesData, row, column);

    streamDeck.logger.info("Snipped with id: ", id);

    if (id === null) {
      ev.action.setSettings({
        button_used: false,
        load_snippet_from_column: column,
        load_snippet_from_row: row,
        snippet_active: false,
      });
    } else {
      ev.action.setSettings({
        button_used: true,
        snippet_id: id,
        load_snippet_from_column: column,
        load_snippet_from_row: row,
        snippet_active: false,
      });
    }
  }

  updateReadFromRow(newRow: number) {
    streamDeck.logger.info("new Row:", newRow);
  }
}

type LoadSnippetSettings = {
  button_used: boolean;
  snippet_active: boolean;
  snippet_id: number;
  load_snippet_from_row: number;
  load_snippet_from_column: number;
};

export type Snippet = {
  snippet_id: number;
  snippet_name: string;
  snippet_icon: string;
  snippet_color: [string, string];
  snippet_channels: string[];
};
