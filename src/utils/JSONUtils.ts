import streamDeck from "@elgato/streamdeck";
import * as fs from "fs";
import { readFile } from "fs/promises";
import * as path from "path";

import { Snippet } from "../actions/load-snippet/load-snippet";

let cachedData: any = null;

export async function getJsonData(filePath: string): Promise<any[]> {
	// if (cachedData === null) {
	const fileContents = await readFile(filePath, "utf-8");
	cachedData = JSON.parse(fileContents);
	// }
	return cachedData;
}

export function getJsonDataSync(filePath: string): any[] {
	// if (cachedData === null) {
	const fileContents = fs.readFileSync(filePath, "utf-8");
	const cachedData: any[] = JSON.parse(fileContents);
	// }
	return cachedData;
}

export function getSnippetIDAtCoordinates(pagesData: any[], row: number | null, column: number | null): number | null {
	for (const page of pagesData) {
		if (row === null || column === null) return null;
		const pageName = page.name;
		const rowData = page.data[row];

		if (rowData) {
			const cell = rowData[column];

			if (cell?.type === "snippet") {
				return cell.id;
			}
		}
	}

	return null; // No snippet found at the given coordinates
}

export function getSnippetInfo(filePath: string, id: number): Snippet | null {
	streamDeck.logger.info("Getting snippet with id: ", id);
	try {
		const fullPath = path.resolve(filePath);
		streamDeck.logger.info(fullPath);
		const rawData = fs.readFileSync(fullPath, "utf-8");
		const snippets = JSON.parse(rawData) as any[];

		const snippet = snippets.find((s) => s.snippetID === id);
		if (!snippet) {
			return null;
		}

		const result: Snippet = {
			snippet_id: snippet.snippetID,
			snippet_name: snippet.snippetName,
			snippet_icon: snippet.snippetIcon,
			snippet_color: snippet.snippetColor,
			snippet_channels: snippet.snippetChannels,
		};

		return result;
	} catch (error) {
		streamDeck.logger.error("Failed to read or parse file:", error);
		return null;
	}
}
