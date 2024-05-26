import { BusCategory, Line, PlanVersion, SelectablePlanVersion } from "@/types";
import { LinePaint } from "mapbox-gl";

const standardHexColors = [
  "#f10ecb",
  "#c20eef",
  "#6e0dec",
  "#1c0dea",
  "#0c4de7",
  "#0c9be5",
  "#0be2dd",
  "#0be08d",
  "#0bdd3e",
  "#23db0a",
  "#6ed80a",
  "#b7d609",
  "#d3a709",
];

const metroBusHexColors = [
  "#e0b829",
  "#88c52f",
  "#00c76f",
  "#00b6ad",
  "#00aacc",
  "#009fed",
  "#7c78ff",
  "#d43bcd",
  "#ed0075",
  "#d71919",
];

const expressBusHexColors = [
  "#f10ecd",
  "#ea0d6d",
  "#e20b12",
  "#db590a",
  "#d3a709",
];

export const getLineColorByLineNameAndCategory = (
  category: BusCategory,
  lineName: string
) => {
  if (category === BusCategory.METRO) {
    return getMetroBusColor(lineName);
  } else if (
    category === BusCategory.EXPRESS ||
    category === BusCategory.SPRINTER
  ) {
    return getExpressBusColor(lineName);
  } else {
    return getStandardBusColor(lineName);
  }
};

export function getLineNumberByLineName(lineName: string): number {
  const numberResults = lineName.match(/\d+/);
  if (numberResults) {
    return parseInt(numberResults[0]);
  }
  return 0;
}

//get the color of standard bus by line number hash
export function getStandardBusColor(lineName: string): string {
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
export function getMetroBusColor(lineName: string): string {
  const lineNumber = getLineNumberByLineName(lineName) || 0;
  const hash = lineNumber % metroBusHexColors.length;
  const color = metroBusHexColors[hash];
  return color;
}

export const getLinePaint = (
  line: Line,
  distinctVersion: boolean
): LinePaint => {
  if (distinctVersion) {
    if (line.planVersion == PlanVersion.V1) {
      return {
        "line-color": "#b91c1c",
        "line-width": 4,
        "line-dasharray": [2, 2],
      };
    } else {
      return {
        "line-color": "#1e40af",
        "line-width": 5,
      };
    }
  } else {
    switch (line.category) {
      case BusCategory.METRO:
        return {
          "line-color": getMetroBusColor(line.name),
          "line-width": distinctVersion ? 2 : 5,
          "line-dasharray": distinctVersion ? [5, 2] : [],
        };
      case BusCategory.EXPRESS:
      case BusCategory.REGIONAL:
        return {
          "line-color": getExpressBusColor(line.name),
          "line-width": 4,
          "line-dasharray": [2, 4],
        };
      default:
        return {
          "line-color": getStandardBusColor(line.name),
          "line-width": 2,
          "line-dasharray": [0.05, 1],
        };
    }
  }
};
