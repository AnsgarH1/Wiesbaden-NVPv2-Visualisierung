import { Geometry } from "geojson";

export enum PlanVersion {
  V1 = "v1",
  V2 = "v2",
}

export type SelectablePlanVersion = PlanVersion.V1 | PlanVersion.V2 | "both";

export enum BusCategory {
  METRO = "Metrobus",
  STADT = "Stadtbus",
  SPRINTER = "Sprinter",
  QUARTIER = "Quartiersbus",
  EXPRESS = "Expressbus",
  STADTBUS_MAINZ = "Stadtbus-M",
  REGIONAL = "Regionalbus",
}

export type Route = {
  id: string;
  direction?: "INBOUND" | "OUTBOUND";
  geometry: Geometry;
};

export type Line = {
  id: string;
  name: string;
  lineName?: string;
  category: BusCategory;
  routes: Route[];
};

export type LineGroup = {
  id: string;
  lines: Line[];
  category: BusCategory;
  planVersion: PlanVersion;
};

export const v1_Categories = [
  BusCategory.METRO,
  BusCategory.STADT,
  BusCategory.QUARTIER,
];

export const v2_Categories = [
  BusCategory.METRO,
  BusCategory.EXPRESS,
  BusCategory.SPRINTER,
  BusCategory.STADT,
  BusCategory.REGIONAL,
];
