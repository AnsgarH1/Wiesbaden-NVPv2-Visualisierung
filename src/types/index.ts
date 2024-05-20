import { Geometry } from "geojson";

export enum PlanVersion {
  V1 = "Oktober 2023",
  V2 = "Mai 2024",
}

export type SelectablePlanVersion = "v1" | "both" | "v2";

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
