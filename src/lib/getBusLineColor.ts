import { BusCategory, Line } from "@/types";
import { LinePaint } from "mapbox-gl";

const standardHexColors = [
  "#22d3ee",
  "#06b6d4",
  "#0891b2",
  "#0e7490",
  "#155e75",
  "#164e63",
  "#38bdf8",
  "#0ea5e9",
  "#0284c7",
  "#0369a1",
  "#075985",
  "#0c4a6e",
  "#60a5fa",
  "#3b82f6",
  "#2563eb",
  "#1d4ed8",
  "#1e40af",
  "#1e3a8a",
  "#818cf8",
  "#6366f1",
  "#4f46e5",
  "#4338ca",
  "#3730a3",
  "#312e81",
  "#8b5cf6",
  "#7c3aed",
  "#6d28d9",
  "#5b21b6",
  "#4c1d95",
  "#a855f7",
  "#9333ea",
  "#7e22ce",
  "#6b21a8",
  "#581c87",
  "#d946ef",
  "#c026d3",
  "#a21caf",
  "#86198f",
  "#701a75",
];

const metroBusHexColors = [
  "#ff0000",
  "#d70000",
  "#c60000",
  "#b70000",
  "#9b0000",
];

const expressBusHexColors = [
  "#f59e0b",
  "#3f6212",
  "#4d7c0f",
  "#14532d",
  "#166534",
  "#15803d",
  "#064e3b",
  "#065f46",
  "#047857",
];

function getLineNumberByLineName(lineName: string): number | undefined {
  const numberResults = lineName.match(/\d+/);
  if (numberResults) {
    return parseInt(numberResults[0]);
  }
  return undefined;
}

//get the color of standard bus by line number hash
function getStandardBusColor(lineName: string): string {
  const lineNumber =
    getLineNumberByLineName(lineName) || standardHexColors.length - 1;
  const hash = lineNumber % standardHexColors.length;
  return standardHexColors[hash];
}

//get the color of express bus by line number hash
function getExpressBusColor(lineName: string): string {
  const lineNumber =
    getLineNumberByLineName(lineName) || expressBusHexColors.length - 1;

  const hash = lineNumber % expressBusHexColors.length;
  return expressBusHexColors[hash];
}

//get the color of metro bus by line number hash
function getMetroBusColor(lineName: string): string {
  const lineNumber = getLineNumberByLineName(lineName) || 0;
  const hash = lineNumber % metroBusHexColors.length;
  const color = metroBusHexColors[hash];
  return color;
}

const getOffsetByLineNumber = (lineName: string): number => {
  const lineNumber = getLineNumberByLineName(lineName) || 4;
  return (lineNumber * 1) % 8;
};

export const getLinePaint = (line: Line): LinePaint => {
  switch (line.category) {
    case BusCategory.METRO:
      return {
        "line-color": getMetroBusColor(line.lineName || line.name),
        "line-width": 3,
        "line-offset": getOffsetByLineNumber(line.lineName || line.name),
      };
    case BusCategory.EXPRESS:
    case BusCategory.REGIONAL:
      return {
        "line-color": getExpressBusColor(line.lineName || line.name),

        "line-width": 2,
        "line-dasharray": [5, 3],
        "line-offset": getOffsetByLineNumber(line.lineName || line.name),
      };
    default:
      return {
        "line-color": getStandardBusColor(line.lineName || line.name),

        "line-width": 2,
        "line-dasharray": [2, 2],
        "line-offset": getOffsetByLineNumber(line.lineName || line.name),
      };
  }
};
