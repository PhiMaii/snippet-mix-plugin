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

  timestamp: number = 0;

  constructor() {
    super();
    streamDeck.logger.info("LoadSnippet : Constructor called");
  }

  override onWillAppear(
    ev: WillAppearEvent<LoadSnippetSettings>
  ): Promise<void> | void {
    ev.action.setTitle(
      ev.action.coordinates?.row + " " + ev.action.coordinates?.column
      //   ev.payload.settings.used?.toString()
    );
  }

  override async onKeyUp(ev: KeyUpEvent<LoadSnippetSettings>): Promise<void> {
    let duration = Date.now() - this.timestamp;
    streamDeck.logger.info("Duration: " + duration);
    if (duration < 500) {
      // Short Press
      this.shortPress(ev);
      // streamDeck.logger.info(ev.payload.settings.used);
    } else {
      this.longPress(ev);
      // Long Press
    }
  }

  override onKeyDown(
    ev: KeyDownEvent<LoadSnippetSettings>
  ): void | Promise<void> {
    // streamDeck.logger.info("LoadSnippet button pressed");
    // streamDeck.logger.info(ev.action.coordinates);

    this.timestamp = Date.now();
  }

  // #####################
  async shortPress(ev: KeyUpEvent<LoadSnippetSettings>): Promise<void> {
    streamDeck.logger.info("LoadSnippet button pressed");
    let currentState = ev.payload.state;
    streamDeck.logger.info("Current state: " + currentState);

    if (ev.payload.settings.used === true) {
      streamDeck.logger.info("LOAD SNIPPET");
      ev.action.showOk();
      return;
    }

    if (currentState == 0) {
      ev.action.setState(1);
      await ev.action.setSettings({
        used: true,
      });
    } else if (currentState == 1) {
      ev.action.setState(0);
      await ev.action.setSettings({
        used: false,
      });
    }
  }

  async longPress(ev: KeyUpEvent<LoadSnippetSettings>): Promise<void> {
    streamDeck.logger.info("LoadSnippet button long pressed");
    streamDeck.profiles.switchToProfile(
      ev.action.device.id,
      "SnippetMix-Default",
      2
    );
  }
}

type LoadSnippetSettings = {
  used: boolean;
  id: number;
  position: [number, number];
};
