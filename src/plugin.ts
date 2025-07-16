import streamDeck, { LogLevel } from "@elgato/streamdeck";

import { ClearAll } from "./actions/clear-all";
import { LoadSnippet } from "./actions/load-snippet/load-snippet";
import { CloseSubmenu } from "./actions/navigate/close-submenu";
import { OpenMore } from "./actions/navigate/open-more";
import { Scroll } from "./actions/navigate/scroll";
import { ToggleSave } from "./actions/toggle-save";
import { getJsonDataSync } from "./utils/JSONUtils";

// We can enable "trace" logging so that all messages between the Stream Deck, and the plugin are recorded. When storing sensitive information
streamDeck.logger.setLevel(LogLevel.INFO);

// Register the increment action.
streamDeck.actions.registerAction(new LoadSnippet());
streamDeck.actions.registerAction(new Scroll());
streamDeck.actions.registerAction(new OpenMore());
streamDeck.actions.registerAction(new CloseSubmenu());
streamDeck.actions.registerAction(new ClearAll());
streamDeck.actions.registerAction(new ToggleSave());

// Finally, connect to the Stream Deck.
streamDeck.connect();

// streamDeck.settings.onDidReceiveGlobalSettings((ev) => {
//   streamDeck.logger.info("Global settings received", ev);
// });

streamDeck.settings.setGlobalSettings({
  scroll_offset: 0,
});

streamDeck.logger.info(
  "GLOBAL SETTINGS:",
  streamDeck.settings.getGlobalSettings()
);

const PATH_PAGES = "data/pages.json";
export const PAGES_DATA = getJsonDataSync(PATH_PAGES);

export let SCROLL_OFFSET = 0;

export function SET_SCROLL_OFFSET(scroll_offset: number) {
  SCROLL_OFFSET = scroll_offset;
}

export let LOAD_SNIPPET_ACTIONS: any[] = [];

export function PUSH_LOAD_SNIPPET_ACTION(value: any) {
  LOAD_SNIPPET_ACTIONS.push(value);
  LOAD_SNIPPET_ACTIONS.sort((actionA, actionB) => {
    const { row: rowA, column: columnA } = actionA.coordinates;
    const sortID_A = rowA * 4 + columnA;
    const { row: rowB, column: columnB } = actionB.coordinates;
    const sortID_B = rowB * 4 + columnB;
    return sortID_A - sortID_B;
  });
}

export function REMOVE_LOAD_SNIPPET_ACTION(value: any) {
  var i = 0;
  while (i < LOAD_SNIPPET_ACTIONS.length) {
    if (LOAD_SNIPPET_ACTIONS[i] === value) {
      LOAD_SNIPPET_ACTIONS.splice(i, 1);
    } else {
      ++i;
    }
  }
}

/* export function SET_LOAD_SNIPPET_ACTIONS(LOAD_SNIPPET_ACTIONS: any) {
    LOAD_SNIPPET_ACTIONS = LOAD_SNIPPET_ACTIONS;
}

export function GET_LOAD_SNIPPET_ACTIONS() {
    return LOAD_SNIPPET_ACTIONS;
}
 */
