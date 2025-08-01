import streamDeck, {
	action,
	type JsonObject,
	type KeyDownEvent,
	SingletonAction,
	WillAppearEvent,
} from "@elgato/streamdeck";

import { SCROLL_OFFSET, WEBSOCKET_MANAGER } from "../../plugin";

/**
 * An action that logs a Stream Deck key press.
 */
@action({ UUID: "net.phimai.snippet-mix-plugin.navigate.open-more" })
export class OpenMore extends SingletonAction {
	/**
	 * Handles the user pressing a Stream Deck key (pedal, G-key, etc).
	 * @param ev Information about the event.
	 */
	override onKeyDown(ev: KeyDownEvent<JsonObject>): void | Promise<void> {
		streamDeck.logger.info("OpenMore button pressed");

		streamDeck.profiles.switchToProfile(ev.action.device.id, "SnippetMix-Default", 1);
	}

	override onWillAppear(ev: WillAppearEvent<JsonObject>): Promise<void> | void {
		RenderMore(ev.action);
	}
}

export async function RenderMore(action: any) {
	let connected: boolean = WEBSOCKET_MANAGER.ws !== null;
	let svg: string = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  		<path d="M 237.004 242.439 C 237.004 232.971 244.604 225.322 254.015 225.322 L 458.138 225.322 C 467.547 225.322 475.148 232.971 475.148 242.439 C 475.148 251.909 467.547 259.557 458.138 259.557 L 254.015 259.557 C 244.604 259.557 237.004 251.909 237.004 242.439 Z M 237.004 328.031 C 237.004 318.563 244.604 310.914 254.015 310.914 L 458.138 310.914 C 467.547 310.914 475.148 318.563 475.148 328.031 C 475.148 337.501 467.547 345.15 458.138 345.15 L 254.015 345.15 C 244.604 345.15 237.004 337.501 237.004 328.031 Z M 475.148 413.625 C 475.148 423.093 467.547 430.743 458.138 430.743 L 254.015 430.743 C 244.604 430.743 237.004 423.093 237.004 413.625 C 237.004 404.156 244.604 396.506 254.015 396.506 L 458.138 396.506 C 467.547 396.506 475.148 404.156 475.148 413.625 Z" style="stroke-width: 1; fill: rgb(255, 255, 255);"/>
  		<rect width="512" height="150" style="fill: rgb(216, 216, 216);"/>
  		<path d="M 479.483 77.986 C 493.506 63.57 493.506 40.223 479.483 25.808 C 467.072 13.05 447.514 11.391 433.243 21.878 L 432.846 22.159 C 429.272 24.788 428.452 29.889 431.009 33.538 C 433.566 37.186 438.529 38.055 442.079 35.427 L 442.476 35.146 C 450.443 29.304 461.34 30.221 468.239 37.34 C 476.057 45.377 476.057 58.39 468.239 66.428 L 440.391 95.107 C 432.573 103.144 419.914 103.144 412.097 95.107 C 405.171 87.988 404.278 76.787 409.962 68.623 L 410.235 68.214 C 412.791 64.54 411.948 59.436 408.398 56.833 C 404.849 54.231 399.86 55.073 397.329 58.722 L 397.055 59.13 C 386.829 73.776 388.442 93.882 400.854 106.639 C 414.877 121.056 437.586 121.056 451.61 106.639 L 479.483 77.986 Z M 350.518 72.014 C 336.494 86.432 336.494 109.778 350.518 124.193 C 362.927 136.951 382.486 138.609 396.757 128.122 L 397.155 127.842 C 400.729 125.215 401.547 120.112 398.992 116.462 C 396.434 112.814 391.47 111.946 387.921 114.574 L 387.524 114.855 C 379.558 120.698 368.661 119.779 361.761 112.66 C 353.943 104.598 353.943 91.585 361.761 83.548 L 389.609 54.895 C 397.428 46.858 410.086 46.858 417.904 54.895 C 424.83 62.013 425.722 73.214 420.038 81.404 L 419.765 81.813 C 417.209 85.488 418.054 90.589 421.602 93.193 C 425.152 95.796 430.14 94.953 432.673 91.305 L 432.945 90.896 C 443.171 76.224 441.557 56.12 429.148 43.362 C 415.125 28.946 392.414 28.946 378.39 43.362 L 350.518 72.014 Z" style="stroke-width: 1; fill: rgb(0, 255, 0); ${connected ? "" : "visibility: hidden;"}"/>
  		<path d="M 345.897 12.631 C 343.342 10.593 339.631 11.065 337.616 13.651 C 335.601 16.235 336.067 19.989 338.624 22.028 L 484.102 137.37 C 486.658 139.409 490.369 138.936 492.384 136.351 C 494.399 133.765 493.932 130.012 491.377 127.974 L 456.604 100.406 L 478.844 77.91 C 492.728 63.865 492.728 41.119 478.844 27.074 C 466.556 14.645 447.192 13.029 433.062 23.246 L 432.669 23.519 C 429.13 26.079 428.319 31.052 430.85 34.606 C 433.381 38.161 438.297 39.006 441.81 36.446 L 442.203 36.172 C 450.092 30.48 460.879 31.374 467.712 38.31 C 475.453 46.14 475.453 58.818 467.712 66.649 L 444.12 90.512 L 436.281 84.298 C 442.253 70.924 439.599 54.891 429.008 44.177 C 416.179 31.176 395.955 30.206 381.997 41.268 L 345.897 12.631 Z M 395.095 51.634 C 402.492 47.931 411.731 49.173 417.9 55.437 C 422.814 60.409 424.657 67.444 423.233 73.957 L 395.095 51.634 Z M 436.281 114.873 L 390.647 78.481 C 390.131 88.374 393.646 98.393 401.018 105.825 C 410.577 115.495 424.215 118.503 436.305 114.849 L 436.281 114.873 Z M 365.016 58.073 L 351.157 72.092 C 337.272 86.137 337.272 108.883 351.157 122.928 C 363.443 135.356 382.808 136.973 396.938 126.756 L 397.331 126.482 C 400.87 123.921 401.68 118.95 399.149 115.395 C 396.618 111.841 391.704 110.995 388.19 113.556 L 387.797 113.829 C 379.908 119.522 369.12 118.627 362.289 111.691 C 354.547 103.836 354.547 91.158 362.289 83.329 L 377.475 67.966 L 365.041 58.047 L 365.016 58.073 Z" style="stroke-width: 1; fill: rgb(255, 0, 0); ${!connected ? "" : "visibility: hidden;"}"/>
  		<rect width="200" height="512" style="fill: rgb(216, 216, 216);"/>
  		<text style="font-family: Arial, sans-serif; font-size: 130px; font-weight: 700; white-space: pre; text-anchor: middle;" x="100.716" y="300.852">${SCROLL_OFFSET + 1}</text>
		</svg>`;

	await action.setImage(`data:image/svg+xml,${encodeURIComponent(svg)}`);
}
