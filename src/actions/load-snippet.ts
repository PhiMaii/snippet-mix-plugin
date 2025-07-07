import streamDeck, {
  action,
  type JsonObject,
  type KeyDownEvent,
  KeyUpEvent,
  SingletonAction,
  WillAppearEvent,
} from "@elgato/streamdeck";
/**
 * An action that logs a Stream Deck key press.
 */
@action({ UUID: "net.phimai.snippet-mix-plugin.load-snippet" })
export class LoadSnippet extends SingletonAction<LoadSnippetSettings> {
  /**
   * Handles the user pressing a Stream Deck key (pedal, G-key, etc).
   * @param ev Information about the event.
   */

  constructor() {
    super();
    streamDeck.logger.info("LoadSnippet : Constructor called");
  }

  override onWillAppear(
    ev: WillAppearEvent<LoadSnippetSettings>
  ): Promise<void> | void {
    ev.action.setTitle(
      ev.action.coordinates?.row + " " + ev.action.coordinates?.column
    );
  }

  override async onKeyUp(ev: KeyUpEvent<LoadSnippetSettings>): Promise<void> {
    let currentState = ev.payload.state;
    if (currentState == 1) {
      ev.action.setState(0);
      await ev.action.setSettings({
        used: true,
      });
    } else if (currentState == 0) {
      ev.action.setState(1);
      await ev.action.setSettings({
        used: false,
      });
    }
    streamDeck.logger.info(ev.payload.settings.used);
  }

  override onKeyDown(
    ev: KeyDownEvent<LoadSnippetSettings>
  ): void | Promise<void> {
    streamDeck.logger.info("LoadSnippet button pressed");
    streamDeck.logger.info(ev.action.coordinates);
  }
}

type LoadSnippetSettings = {
  used: boolean;
  id: number;
  position: [number, number];
};
