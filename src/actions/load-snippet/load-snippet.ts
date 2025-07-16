import streamDeck, {
	action,
	type KeyDownEvent,
	KeyUpEvent,
	SingletonAction,
	WillAppearEvent,
	WillDisappearEvent,
} from "@elgato/streamdeck";
import path from "path";

import { PAGES_DATA, PUSH_LOAD_SNIPPET_ACTION, REMOVE_LOAD_SNIPPET_ACTION, SCROLL_OFFSET } from "../../plugin";
import { getIconSVG } from "../../utils/Images";
import "../../utils/JSONUtils";
import { getJsonData, getJsonDataSync, getSnippetIDAtCoordinates, getSnippetInfo } from "../../utils/JSONUtils";

@action({ UUID: "net.phimai.snippet-mix-plugin.load-snippet" })
export class LoadSnippet extends SingletonAction<LoadSnippetSettings> {
	LONG_PRESS_THRESHOLD = 350; // Threshold for long press in milliseconds
	longPressTimer: ReturnType<typeof setTimeout> | null = null; // Timer for long press
	longPressFired = false; // Flag to check if long press was fired

	PATH_PAGES: string = "data/pages.json";
	PATH_SNIPPETS: string = "data/snippets.json";

	GLOBAL_SETTINGS = {};

	PAGES_DATA: any[];

	constructor() {
		super();

		//this.actions;

		this.PAGES_DATA = getJsonDataSync(this.PATH_PAGES);

		streamDeck.logger.info("CONSTRUCTOR CALLED", JSON.stringify(this.PAGES_DATA, null, "\t"));

		//SET_LOAD_SNIPPET_ACTIONS(this.actions);
	}

	override async onWillAppear(ev: WillAppearEvent<LoadSnippetSettings>): Promise<void> {
		PUSH_LOAD_SNIPPET_ACTION(ev.action);

		RenderSnippet(ev.action);
	}

	override async onWillDisappear(ev: WillDisappearEvent<LoadSnippetSettings>) {
		REMOVE_LOAD_SNIPPET_ACTION(ev.action);
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

	override onKeyDown(ev: KeyDownEvent<LoadSnippetSettings>): void | Promise<void> {
		this.longPressFired = false;
		this.longPressTimer = setTimeout(() => {
			this.longPressFired = true;
			this.longPress(ev);
		}, this.LONG_PRESS_THRESHOLD);
	}

	// #####################

	async shortPress(ev: KeyUpEvent<LoadSnippetSettings>): Promise<void> {
		streamDeck.logger.info("LoadSnippet button pressed", ev);

		if (ev.payload.settings.button_used === true) {
			if (ev.payload.settings.snippet_active === false) {
				// let PATH_SNIPPETS = "data/snippets.json";
				// let snippet_id = ev.payload.settings.snippet_id;
				// let snippet: Snippet | null = getSnippetInfo(PATH_SNIPPETS, snippet_id);
				// // SET ACTIVE
				// const svg = getIconSVG(
				// 	snippet_id,
				// 	snippet?.snippet_channels.length ?? 0,
				// 	snippet?.snippet_name ?? "null",
				// 	snippet?.snippet_color[1] ?? "NaN",
				// 	true,
				// 	snippet?.snippet_icon ?? "fa-cube",
				// );
				// ev.action.setImage(`data:image/svg+xml,${encodeURIComponent(svg)}`);

				ev.action.setSettings({
					snippet_active: true,
				});
				//@ts-ignore
				RenderSnippet(ev.action, await ev.action.getSettings());
			}
		}
	}

	longPress(ev: KeyDownEvent<LoadSnippetSettings>): void {
		streamDeck.logger.info("LoadSnippet button long-pressed");

		if (ev.payload.settings.button_used === true) {
			streamDeck.profiles.switchToProfile(ev.action.device.id, "SnippetMix-Default", 2);
		}
	}

	async loadPage(ev: WillAppearEvent<LoadSnippetSettings>) {
		return;
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

		//const pagesData = await getJsonData(this.PATH_PAGES);

		const id: number | null = getSnippetIDAtCoordinates(this.PAGES_DATA, row, column);

		streamDeck.logger.info("Snipped with id: ", id);

		if (id === null) {
			ev.action.setSettings({
				button_used: false,
				//load_snippet_from_column: column,
				//load_snippet_from_row: row,
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
}

type LoadSnippetSettings = {
	button_used: boolean;
	snippet_active: boolean;
	snippet_id: number;
	load_snippet_from_row: number;
	load_snippet_from_column: number;
	firstTimeRendered: boolean;
};

export type Snippet = {
	snippet_id: number;
	snippet_name: string;
	snippet_icon: string;
	snippet_color: [string, string];
	snippet_channels: string[];
};

export async function RenderSnippet(action: any, snippetSettings?: LoadSnippetSettings) {
	if (action.coordinates === undefined) {
		action.showAlert();
		throw new Error("Coordinates undefined!");
	}
	//await action.showAlert();

	streamDeck.logger.info("SHOULDRENDER:", action.coordinates, "OFFSET", SCROLL_OFFSET, "NEW:", [
		action.coordinates.row + SCROLL_OFFSET,
		action.coordinates.column,
	]);

	const id: number | null = getSnippetIDAtCoordinates(
		PAGES_DATA,
		action.coordinates.row + SCROLL_OFFSET,
		action.coordinates.column,
	);

	//action.setState("0");

	if (id !== null) {
		let PATH_SNIPPETS = "data/snippets.json";
		let snippet: Snippet | null = getSnippetInfo(PATH_SNIPPETS, id);

		streamDeck.logger.info(snippetSettings);

		const svg = getIconSVG(
			id,
			snippet?.snippet_channels.length ?? 0,
			snippet?.snippet_name ?? "null",
			snippet?.snippet_color[1] ?? "NaN",
			snippetSettings?.snippet_active ?? false,
			snippet?.snippet_icon ?? "fa-cube",
		);

		await action.setImage(`data:image/svg+xml,${encodeURIComponent(svg)}`);

		//action.setState("1");
		action.setSettings({
			button_used: true,
			snippet_id: id,
			snippet_active: false,
		});
	} else {
		//action.setState("0");
		action.setImage("");
		action.setSettings({
			button_used: false,
			//load_snippet_from_column: column,
			//load_snippet_from_row: row,
			snippet_active: false,
		});
	}
}
