import streamDeck, { LogLevel } from "@elgato/streamdeck";

import { ClearAll } from "./actions/clear-all";
import { Load } from "./actions/load";
import { LoadSnippet, RenderSnippet } from "./actions/load-snippet/load-snippet";
import { CloseSubmenu } from "./actions/navigate/close-submenu";
import { OpenMore, RenderMore } from "./actions/navigate/open-more";
import { RenderScroll, Scroll } from "./actions/navigate/scroll";
import { Start } from "./actions/start";
import { Stop } from "./actions/stop";
import { ToggleSave } from "./actions/toggle-save";
import { getJsonDataSync } from "./utils/JSONUtils";

const PATH_PAGES = "data/pages.json";
export const PAGES_DATA = getJsonDataSync(PATH_PAGES);

export let SCROLL_OFFSET = 0;

export function SET_SCROLL_OFFSET(scroll_offset: number) {
	SCROLL_OFFSET = scroll_offset;
}

export function SCROLL_RERENDER_ACTIONS() {
	for (const action of streamDeck.actions) {
		if (action.manifestId === "net.phimai.snippet-mix-plugin.load-snippet") {
			RenderSnippet(action);
		} else if (action.manifestId === "net.phimai.snippet-mix-plugin.navigate.scroll") {
			RenderScroll(action);
		} else if (action.manifestId === "net.phimai.snippet-mix-plugin.navigate.open-more") {
			RenderMore(action);
		}
	}
}

// We can enable "trace" logging so that all messages between the Stream Deck, and the plugin are recorded. When storing sensitive information
streamDeck.logger.setLevel(LogLevel.INFO);

// Register the increment action.
streamDeck.actions.registerAction(new LoadSnippet());
streamDeck.actions.registerAction(new Scroll());
streamDeck.actions.registerAction(new OpenMore());
streamDeck.actions.registerAction(new CloseSubmenu());
streamDeck.actions.registerAction(new ClearAll());
streamDeck.actions.registerAction(new ToggleSave());
streamDeck.actions.registerAction(new Start());
streamDeck.actions.registerAction(new Stop());
streamDeck.actions.registerAction(new Load());

// Finally, connect to the Stream Deck.
streamDeck.connect();
