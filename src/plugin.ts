import streamDeck, { LogLevel } from "@elgato/streamdeck";

import { LoadSnippet } from "./actions/load-snippet/load-snippet";
import { OpenMore } from "./actions/navigate/open-more";
import { CloseSubmenu } from "./actions/navigate/close-submenu";
import { ClearAll } from "./actions/clear-all";
import { ToggleSave } from "./actions/toggle-save";
import { Scroll } from "./actions/navigate/scroll";

// We can enable "trace" logging so that all messages between the Stream Deck, and the plugin are recorded. When storing sensitive information
streamDeck.logger.setLevel(LogLevel.INFO);

// Register the increment action.
streamDeck.actions.registerAction(new LoadSnippet());
streamDeck.actions.registerAction(new Scroll());
streamDeck.actions.registerAction(new OpenMore());
streamDeck.actions.registerAction(new CloseSubmenu());
streamDeck.actions.registerAction(new ClearAll());
streamDeck.actions.registerAction(new ToggleSave());

streamDeck.settings.onDidReceiveGlobalSettings((ev) => {
  streamDeck.logger.info("Global settings received", ev);
});

// Finally, connect to the Stream Deck.
streamDeck.connect();
