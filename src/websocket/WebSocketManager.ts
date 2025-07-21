import streamDeck from "@elgato/streamdeck";
import { MessageEvent, WebSocket } from "ws";

import { RERENDER_SNIPPET_ACTIONS, SET_PAGES_DATA, SET_SNIPPET_DATA } from "../plugin";
import { isJson } from "../utils/JSONUtils";

export class WebSocketManager {
	public ws: null | WebSocket = null;
	public isConnected = false;

	CONNECT_WEBSOCKET(host: string, port: number, showName: string) {
		if (this.ws !== null) {
			this.ws.close();
		}

		this.ws = new WebSocket(`ws://${host}:${port}`);
		this.ws.onopen = this.onOpen;
		this.ws.onmessage = this.onMessage;
		this.ws.onclose = this.onClose;
		this.ws.onerror = this.onError;
	}

	sendJSONMessage(msg: Object) {
		if (this.ws !== null) {
			this.ws.send(JSON.stringify(msg));
		} else {
			throw new Error("Can not send message, because WS is not connected");
		}
	}

	onOpen() {
		streamDeck.logger.info("WS Connected");
	}

	onMessage(event: MessageEvent) {
		streamDeck.logger.info("RECIEVED:", event.data);

		if (typeof event.data !== "string") {
			throw new Error("Non String based Json Message Recieved");
		}

		if (isJson(event.data) === false) {
			throw new Error("Non Json Message Recieved");
		}

		const message = JSON.parse(event.data);

		if (message.id === undefined || message.data === undefined) {
			streamDeck.logger.error("Message structure is invalid");
			return;
		}

		const id = message.id;
		const data = message.data;

		if (id === "Connected") {
			this.isConnected = true;

			SET_SNIPPET_DATA(data.snippets);
			SET_PAGES_DATA(data.pages);
			RERENDER_SNIPPET_ACTIONS();
		} else if (id === "SnippetsUpdate") {
			//setServerSnippets(data);
			//streamDeck.logger.info("SNIPPETSUPDATE", data);
			SET_SNIPPET_DATA(data);
			RERENDER_SNIPPET_ACTIONS();
		} else if (id === "PagesUpdate") {
			//setServerSnippets(data);
			SET_PAGES_DATA(data);
			RERENDER_SNIPPET_ACTIONS();
		} else {
			streamDeck.logger.error("MessageID is unknown for this plugin");
		}
	}

	onClose() {
		streamDeck.logger.info("WS Disconnected");
		this.ws = null;
		this.isConnected = false;
	}

	onError(event: WebSocket.ErrorEvent) {
		streamDeck.logger.error("WS ERROR:", event);
	}
}
