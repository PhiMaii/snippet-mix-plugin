import streamDeck, {
  action,
  type JsonObject,
  type KeyDownEvent,
  SingletonAction,
  WillAppearEvent,
  WillDisappearEvent,
} from "@elgato/streamdeck";
/**
 * An action that logs a Stream Deck key press.
 */
@action({ UUID: "net.phimai.snippet-mix-plugin.clear-all" })
export class ClearAll extends SingletonAction {
  /**
   * Handles the user pressing a Stream Deck key (pedal, G-key, etc).
   * @param ev Information about the event.
   */

  constructor() {
    super();
    this.confirmed = false;
  }

  confirmed = false;

  override onKeyDown(ev: KeyDownEvent<JsonObject>): void | Promise<void> {
    if (this.confirmed) {
      streamDeck.logger.info("ClearAll button already confirmed");
      ev.action.showOk();
    }
    this.confirmed = true;
    streamDeck.logger.info("ClearAll button pressed");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font
    Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License -
    https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
    <g transform="scale(0.65) translate(120.6, 137.8)">

        <path fill="${this.confirmed ? "red" : "#ffffff"}"
            d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
    </g>
</svg>`;
    ev.action.setImage(`data:image/svg+xml,${encodeURIComponent(svg)}`);
  }

  override onWillAppear(ev: WillAppearEvent<JsonObject>): Promise<void> | void {
    this.confirmed = false;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font
    Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License -
    https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
    <g transform="scale(0.65) translate(120.6, 137.8)">

        <path fill="#ffffff"
            d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
    </g>
</svg>`;
    ev.action.setImage(`data:image/svg+xml,${encodeURIComponent(svg)}`);
  }
}
