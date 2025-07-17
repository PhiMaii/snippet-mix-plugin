function svg(name: string, color: string): string {
	switch (name) {
		case "fa-music":
			return `<path fill="${color ?? "#ffffff"}" d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7l0 72 0 264c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L448 147 192 223.8 192 432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L128 200l0-72c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z" />`;
			break;
		case "fa-microphone-lines":
			return `<g transform="translate(64, 0)"><path fill="${color ?? "#ffffff"}" d="M96 96l0 160c0 53 43 96 96 96s96-43 96-96l-80 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l80 0 0-32-80 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l80 0 0-32-80 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l80 0c0-53-43-96-96-96S96 43 96 96zM320 240l0 16c0 70.7-57.3 128-128 128s-128-57.3-128-128l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 89.1 66.2 162.7 152 174.4l0 33.6-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l72 0 72 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-33.6c85.8-11.7 152-85.3 152-174.4l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 24z" /></g>`;
			break;
		case "fa-user-large":
			return `<g transform="translate(32, 0)"> <path fill="${color ?? "#ffffff"}" d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7l131.7 0c0 0 0 0 .1 0l5.5 0 112 0 5.5 0c0 0 0 0 .1 0l131.7 0c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2L224 304l-19.7 0c-12.4 0-20.1 13.6-13.7 24.2z" /> </g>`;
			break;
		case "fa-circle-play":
			return `<path fill="${color ?? "#ffffff"}" d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z" /> </svg>`;
			break;
		case "fa-circle-play":
			return `<path fill="${color ?? "#ffffff"}" d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9l0-176c0-8.7 4.7-16.7 12.3-20.9z" />`;
			break;
		case "fa-clipboard":
			return `<g transform="translate(64, 0)"> <path fill="${color ?? "#ffffff"}" d="M192 0c-41.8 0-77.4 26.7-90.5 64L64 64C28.7 64 0 92.7 0 128L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64l-37.5 0C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 192l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z" /> </g>`;
			break;
		case "fa-floppy-disk":
			return `<g transform="translate(32, 0)"> <path fill="${color ?? "#ffffff"}" d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-242.7c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32L64 32zm0 96c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32L96 224c-17.7 0-32-14.3-32-32l0-64zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /> </g>`;
			break;
		case "fa-layer-group":
			return `<g transform="translate(-32, 0)"> <path fill="${color ?? "#ffffff"}" d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z" /> </g>`;
			break;
		default: // fa-cube
			return `<path fill="${color ?? "#ffffff"}" d="M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6l0 242.9c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4L0 134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1 0-188L288 246.6l0 188z" />`;
	}
}

export function getIconSVG(
	id: number,
	channels: number,
	name: string,
	colorString: string,
	active: boolean,
	icon?: string,
): string {
	const color = convertToBeautifulColor(colorString);
	let textColor: string = getTextColor(color);
	return `<?xml version="1.0" encoding="utf-8"?>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
		
        <g transform="scale(0.45) translate(510, 75)">
        ${svg(icon ?? "none", color)}
        </g>

        <text style="fill: rgb(255, 255, 255); font-family: Arial, sans-serif; font-size: 90px; font-weight: 700; text-anchor: middle; white-space: pre;" x="256.275" y="376.951">${name || ""}</text>
        <rect y="422" width="512" height="90" style="stroke: rgb(0, 0, 0); fill:${color || "#ffffff"};"/>
        <text style="fill: ${textColor}; font-family: Arial, sans-serif; font-size: 65px; font-weight: 700; text-anchor: end; white-space: pre;" x="462.898" y="487.796">${channels || 0} CH</text>
        <text style="fill: ${textColor}; font-family: Arial, sans-serif; font-size: 65px; font-weight: 700; white-space: pre;" x="51.392" y="488.675">ID ${id || "NaN"}</text>
        <ellipse style="fill: none; stroke-width: 5px; stroke: rgb(255, 255, 255); ${active ? "visibility: hidden;" : ""}" cx="80" cy="80" rx="40" ry="40"/>
        ${active ? '<ellipse style="fill: rgb(42, 255, 0);" cx="80" cy="80" rx="40" ry="40"/>' : ""}
        </svg>`;
}

export function convertToBeautifulColor(color: string) {
	if (color === "cyan") {
		return "#4aa5e2";
	} else if (color === "green") {
		return "rgb(54, 179, 110)";
	}
	return color;

	// DISABLED
	if (color === "purple") {
		return "#651c8c";
	} else if (color === "magenta") {
		return "#e7268a";
	} else if (color === "red") {
		return "#d92b2b";
	} else if (color === "orange") {
		return "#e5742e";
	} else if (color === "blue") {
		return "#1745e2";
	} else if (color === "cyan") {
		return "#008ae7";
	} else if (color === "green") {
		return "#1ca36c";
	} else if (color === "gray") {
		return "#a1a1a5";
	} /* if(color === "yellow")*/ else {
		return "#e5cf2e";
	}
}

function getTextColor(backgroundColor: string): string {
	// Remove the hash if present
	if (backgroundColor.startsWith("#")) {
		backgroundColor = backgroundColor.slice(1);
	}

	// Parse the r, g, b components
	const r = parseInt(backgroundColor.substr(0, 2), 16);
	const g = parseInt(backgroundColor.substr(2, 2), 16);
	const b = parseInt(backgroundColor.substr(4, 2), 16);

	// Calculate relative luminance (per W3C standard)
	const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

	// Choose black or white text based on luminance threshold
	// 186
	return luminance > 130 ? "black" : "white";
}
