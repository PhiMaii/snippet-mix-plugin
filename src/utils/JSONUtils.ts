import { JsonObject } from "@elgato/streamdeck";
import { readFile } from "fs/promises";

let cachedData: any = null;

export async function getJsonData(filePath: string): Promise<any[]> {
  // if (cachedData === null) {
  const fileContents = await readFile(filePath, "utf-8");
  cachedData = JSON.parse(fileContents);
  // }
  return cachedData;
}

//@ts-ignore
export function getAllSnippetsWithCoordinates(pagesData: any[]): Snippet[] {
  const results: Snippet[] = [];

  for (const page of pagesData) {
    const pageName = page.name;

    for (const rowKey in page.data) {
      const row = parseInt(rowKey, 10);
      const rowData = page.data[rowKey];

      for (const colKey in rowData) {
        if (colKey === "textInserts") continue;

        const col = parseInt(colKey, 10);
        const cell = rowData[colKey];

        if (cell?.type === "snippet") {
          results.push({
            pageName,
            snippetId: cell.id,
            row,
            col,
          });
        }
      }
    }
  }

  return results;
}

type Snippet = {
  pageName: string;
  snippetId: number;
  row: number;
  col: number;
};
