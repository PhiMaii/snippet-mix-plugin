import streamDeck, { LogLevel } from "@elgato/streamdeck";

import { ClearAll } from "./actions/clear-all";
import { Load } from "./actions/load";
import { LoadSnippet, RenderSnippet } from "./actions/load-snippet/load-snippet";
import { CloseSubmenu } from "./actions/navigate/close-submenu";
import { OpenMore, RenderMore } from "./actions/navigate/open-more";
import { RenderScroll, Scroll } from "./actions/navigate/scroll";
import { Start, StartSettings } from "./actions/start";
import { Stop } from "./actions/stop";
import { ToggleSave } from "./actions/toggle-save";
import { WebSocketManager } from "./websocket/WebSocketManager";

const PATH_PAGES = "data/pages.json";
//export const PAGES_DATA = getJsonDataSync(PATH_PAGES);
export let PAGES_DATA: any[] = [];
export let SNIPPET_DATA: any[] = [];
export let SCROLL_OFFSET = 0;

export const WEBSOCKET_MANAGER = new WebSocketManager();

export function SET_SCROLL_OFFSET(scroll_offset: number) {
	SCROLL_OFFSET = scroll_offset;
}

export function SET_PAGES_DATA(NEW_PAGES_DATA: any[]) {
	PAGES_DATA = NEW_PAGES_DATA;
}

export function SET_SNIPPET_DATA(NEW_SNIPPET_DATA: any[]) {
	SNIPPET_DATA = NEW_SNIPPET_DATA;
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

export function RERENDER_SNIPPET_ACTIONS() {
	for (const action of streamDeck.actions) {
		if (action.manifestId === "net.phimai.snippet-mix-plugin.load-snippet") {
			RenderSnippet(action);
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

// TODO: FIX: Zerstört evtl mehrere START btns
streamDeck.actions.onWillAppear(async (ev) => {
	if (WEBSOCKET_MANAGER.ws === null) {
		streamDeck.logger.info("GET GLOBAL SETTINGS");
		const globalSettings = await streamDeck.settings.getGlobalSettings<StartSettings>();
		const host = globalSettings?.ws?.host;
		const port = globalSettings?.ws?.port;

		streamDeck.logger.info("GLOBAL SETTINGS: ", globalSettings);

		if (host && port) {
			streamDeck.logger.info("CONNECT WS AUTOMATICLY");
			WEBSOCKET_MANAGER.CONNECT_WEBSOCKET(host, port, "Show 1");
		}
	}
});

// Finally, connect to the Stream Deck.
streamDeck.connect();
