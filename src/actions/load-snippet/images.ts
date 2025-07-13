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
    default:
      return `<path fill="${color ?? "#ffffff"}" d="M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6l0 242.9c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4L0 134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1 0-188L288 246.6l0 188z" />`;
  }
}

/*
Fa-cube

Fa-music
Fa-microphone-lines
Fa-user-large
*/

export function getIconSVG(
  id: number,
  channels: number,
  name: string,
  color: string,
  active: boolean,
  icon?: string
): string {
  let textColor: string = getTextColor(color);
  return `<?xml version="1.0" encoding="utf-8"?>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">

        <g transform="scale(0.45) translate(510, 75)">
        ${svg(icon ?? "", color)}
        </g>

        <text style="fill: rgb(255, 255, 255); font-family: Arial, sans-serif; font-size: 90px; font-weight: 700; text-anchor: middle; white-space: pre;" x="256.275" y="376.951">${name || "Unnamed"}</text>
        <rect y="422" width="512" height="90" style="stroke: rgb(0, 0, 0); fill:${color || "#ffffff"};"/>
        <text style="fill: ${textColor}; font-family: Arial, sans-serif; font-size: 65px; font-weight: 700; text-anchor: end; white-space: pre;" x="462.898" y="487.796">${channels || 0} CH</text>
        <text style="fill: ${textColor}; font-family: Arial, sans-serif; font-size: 65px; font-weight: 700; white-space: pre;" x="51.392" y="488.675">ID ${id || "NaN"}</text>
        <ellipse style="fill: none; stroke-width: 5px; stroke: rgb(255, 255, 255); ${active ? "visibility: hidden;" : ""}" cx="80" cy="80" rx="40" ry="40"/>
        ${active ? '<ellipse style="fill: rgb(42, 255, 0);" cx="80" cy="80" rx="40" ry="40"/>' : ""}
        </svg>`;
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
