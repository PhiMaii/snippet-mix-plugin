import { JsonObject } from "@elgato/streamdeck";
import { readFile } from "fs/promises";

let cachedData: any = null;

export async function getJsonData(filePath: string): Promise<any[]> {
  if (cachedData === null) {
    const fileContents = await readFile(filePath, "utf-8");
    cachedData = JSON.parse(fileContents);
  }
  return cachedData;
}

export function getSnippetAtCoordinates(
  pagesData: any[],
  row: number,
  column: number
): Snippet | null {
  for (const page of pagesData) {
    const pageName = page.name;
    const rowData = page.data[row];

    if (rowData) {
      const cell = rowData[column];

      if (cell?.type === "snippet") {
        return {
          pageName,
          snippetId: cell.id,
          row: row,
          col: column,
        };
      }
    }
  }

  return null; // No snippet found at the given coordinates
}

export type Snippet = {
  pageName: string;
  snippetId: number;
  row: number;
  col: number;
};
