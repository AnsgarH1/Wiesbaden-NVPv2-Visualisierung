import { BusCategory, LineGroup, PlanVersion } from "@/types";

import { v1_metroBusse } from "./version_01/v1_metrobusse";
import { v1_quartiersBusse } from "./version_01/v1_quartiersbusse";
import { v1_stadtBusse } from "./version_01/v1_stadtbusse";

import { v2_expressBusse } from "./version_02/v2_expressbusse";
import { v2_metroBusse } from "./version_02/v2_metrobusse";
import { v2_regionalBusse } from "./version_02/v2_regionalbusse";
import { v2_sprinterBusse } from "./version_02/v2_sprinterbusse";
import { v2_stadtbusse } from "./version_02/v2_stadtbusse";

export const busLineData: LineGroup[] = [
  {
    category: BusCategory.METRO,
    id: "v1_metroBusse",
    lines: v1_metroBusse,
    planVersion: PlanVersion.V1,
  },
  {
    category: BusCategory.QUARTIER,
    id: "v1_quartiersBusse",
    lines: v1_quartiersBusse,
    planVersion: PlanVersion.V1,
  },
  {
    category: BusCategory.STADT,
    id: "v1_stadtBusse",
    lines: v1_stadtBusse,
    planVersion: PlanVersion.V1,
  },
  {
    category: BusCategory.EXPRESS,
    id: "v2_expressBusse",
    lines: v2_expressBusse,
    planVersion: PlanVersion.V2,
  },
  {
    category: BusCategory.METRO,
    id: "v2_metroBusse",
    lines: v2_metroBusse,
    planVersion: PlanVersion.V2,
  },
  {
    category: BusCategory.REGIONAL,
    id: "v2_regionalBusse",
    lines: v2_regionalBusse,
    planVersion: PlanVersion.V2,
  },
  {
    category: BusCategory.SPRINTER,
    id: "v2_sprinterBusse",
    lines: v2_sprinterBusse,
    planVersion: PlanVersion.V2,
  },
  {
    category: BusCategory.STADT,
    id: "v2_stadtbusse",
    lines: v2_stadtbusse,
    planVersion: PlanVersion.V2,
  },
];
