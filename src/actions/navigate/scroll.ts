import streamDeck, {
	action,
	DidReceiveSettingsEvent,
	type KeyDownEvent,
	SingletonAction,
	WillAppearEvent,
} from "@elgato/streamdeck";

import { SCROLL_OFFSET, SCROLL_RERENDER_ACTIONS, SET_SCROLL_OFFSET } from "../../plugin";

/**
 * An action that logs a Stream Deck key press.
 */
@action({ UUID: "net.phimai.snippet-mix-plugin.navigate.scroll" })
export class Scroll extends SingletonAction {
	/**
	 * Handles the user pressing a Stream Deck key (pedal, G-key, etc).
	 * @param ev Information about the event.
	 */

	scrollAmount: number = 1; // Default scroll amount

	constructor() {
		super();
		//Reset scroll_offset to 0 on plugin restart/streamdeck software start
	}

	override async onKeyDown(ev: KeyDownEvent<ScrollSettings>) {
		streamDeck.logger.info("Scroll button pressed");
		/*const scrollSettings =
            await streamDeck.settings.getGlobalSettings<GlobalScrollSettings>();*/
		/* const newNbr = {
            scroll_offset: Math.random(),
        };
        await streamDeck.settings.setGlobalSettings(newNbr);
        streamDeck.logger.info("SET", newNbr); */

		//@ts-ignore
		/* SET_SCROLL_OFFSET(SCROLL_OFFSET - 1);
        streamDeck.logger.info("ACTIONS: ", LOAD_SNIPPET_ACTIONS);
        for (const action of LOAD_SNIPPET_ACTIONS) {
            // RERENDER
            //action.setTitle("RR");
            //action.setImage(" ");
            RenderSnippet(action);
            //action.
        }
        return; */

		/* streamDeck.logger.info("ScrollSettings", scrollSettings);

        if (scrollSettings.scroll_offset === undefined) {
            scrollSettings.scroll_offset = 0;
        } */

		if (ev.payload.settings.scroll_direction === "up") {
			if (SCROLL_OFFSET <= 0) {
				ev.action.showAlert();
				return;
			}

			SET_SCROLL_OFFSET(SCROLL_OFFSET - 1);
			SCROLL_RERENDER_ACTIONS();
		} else if (ev.payload.settings.scroll_direction === "down") {
			SET_SCROLL_OFFSET(SCROLL_OFFSET + 1);
			SCROLL_RERENDER_ACTIONS();
		} else {
			streamDeck.logger.warn("Unknown scroll direction", ev.payload.settings.scroll_direction);
		}

		RenderScroll(ev.action);
	}

	override onWillAppear(ev: WillAppearEvent<ScrollSettings>): Promise<void> | void {
		// const scroll_offset = streamDeck.settings.getGlobalSettings();
		// streamDeck.logger.info(scroll_offset);
		RenderScroll(ev.action);
	}

	override onDidReceiveSettings(ev: DidReceiveSettingsEvent<ScrollSettings>): Promise<void> | void {
		let settings: ScrollSettings = ev.payload.settings;
		streamDeck.logger.info("Scroll settings received", settings);

		/* if (settings.scroll_amount != undefined) {
			streamDeck.logger.info("Global Scroll amount set to", settings.scroll_amount);
			//@ts-ignore
			streamDeck.settings.setGlobalSettings({
				scroll_amount: settings.scroll_amount,
			});
			this.scrollAmount = settings.scroll_amount;
		} */

		// You can also update the UI or perform other actions based on the settings
		if (ev.payload.settings.scroll_direction === "up") {
			streamDeck.logger.info("Scrolling up");
			//@ts-ignore
			// ev.action.setState(0);
		} else if (ev.payload.settings.scroll_direction === "down") {
			streamDeck.logger.info("Scrolling down");
			//@ts-ignore
			// ev.action.setState(1);
		} else {
			streamDeck.logger.warn("Unknown scroll direction", ev.payload.settings.scroll_direction);
		}

		return Promise.resolve();
	}
}

export async function RenderScroll(action: any) {
	streamDeck.logger.info("Current Scorll Offset: ", SCROLL_OFFSET);
	// streamDeck.logger.info("Current Scorll Offset: ", await action.getSettings());

	let settings: ScrollSettings = await action.getSettings();

	let svgUp = `<svg viewBox="0 0 512 512"> <path d="M 341.202 187.277 C 349.571 178.908 363.162 178.908 371.53 187.277 L 478.649 294.395 C 487.018 302.764 487.018 316.355 478.649 324.724 C 470.281 333.092 456.69 333.092 448.321 324.724 L 356.333 232.735 L 264.345 324.657 C 255.976 333.025 242.385 333.025 234.017 324.657 C 225.648 316.288 225.648 302.697 234.017 294.329 L 341.135 187.21 L 341.202 187.277 Z" style="stroke-width: 1; fill: rgb(255, 255, 255);"/> <rect width="200" height="512" style="fill: rgb(216, 216, 216);"/> <text style="font-family: Arial, sans-serif; font-size: 130px; font-weight: 700; white-space: pre; stroke-width: 1; text-anchor: middle;" x="104.299" y="300.597">${SCROLL_OFFSET + 2}</text> </svg>`;
	let svgDown = `<svg viewBox="0 0 512 512" width="512px" height="512px" xmlns:bx="https://boxy-svg.com"> <rect width="200" height="512" style="fill: rgb(216, 216, 216);" transform="matrix(1, 0, 0, 1, 5.684341886080802e-14, 0)"/> <text style="font-family: Arial, sans-serif; font-size: 130px; font-weight: 700; white-space: pre; stroke-width: 1; text-anchor: middle;" x="104.412" y="300.796">${SCROLL_OFFSET + 3}</text> <path d="M 341.162 324.724 C 349.531 333.092 363.122 333.092 371.49 324.724 L 478.609 217.605 C 486.978 209.236 486.978 195.645 478.609 187.277 C 470.241 178.908 456.65 178.908 448.281 187.277 L 356.293 279.265 L 264.305 187.343 C 255.936 178.975 242.345 178.975 233.977 187.343 C 225.608 195.712 225.608 209.303 233.977 217.672 L 341.095 324.79 L 341.162 324.724 Z" style="stroke-width: 1; fill: rgb(255, 255, 255);"/> </svg>`;

	await action.setImage(
		`data:image/svg+xml,${encodeURIComponent(settings?.scroll_direction === "up" ? svgUp : svgDown)}`,
	);

	// action.setState(settings?.scroll_direction === "up" ? 0 : 1);
}

type ScrollSettings = {
	scroll_direction: "up" | "down";
	scroll_amount: number;
};

export type GlobalScrollSettings = {
	scroll_offset: number;
};
