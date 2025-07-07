import streamDeck, { LogLevel } from "@elgato/streamdeck";

import { IncrementCounter } from "./actions/increment-counter";
import { LoadSnippet } from "./actions/load-snippet";
import { RowDown } from "./actions/row-down";
import { RowUp } from "./actions/row-up";
import { OpenMore } from "./actions/open-more";

// We can enable "trace" logging so that all messages between the Stream Deck, and the plugin are recorded. When storing sensitive information
streamDeck.logger.setLevel(LogLevel.DEBUG);

// Register the increment action.
streamDeck.actions.registerAction(new IncrementCounter());
streamDeck.actions.registerAction(new LoadSnippet());
streamDeck.actions.registerAction(new RowDown());
streamDeck.actions.registerAction(new RowUp());
streamDeck.actions.registerAction(new OpenMore());


// Finally, connect to the Stream Deck.
streamDeck.connect();
