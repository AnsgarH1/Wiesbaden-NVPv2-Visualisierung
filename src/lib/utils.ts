import { BusCategory, Line, LineGroup } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const lineSort = (a: Line, b: Line): number => {
  if (a.name > b.name) {
    return 1;
  } else if (a.name < b.name) {
    return -1;
  } else {
    return 0;
  }
};

const BusCategoryPrioMap: Record<BusCategory, number> = {
  [BusCategory.METRO]: 10,
  [BusCategory.EXPRESS]: 20,
  [BusCategory.SPRINTER]: 30,
  [BusCategory.STADT]: 40,
  [BusCategory.QUARTIER]: 50,
  [BusCategory.REGIONAL]: 60,
  [BusCategory.STADTBUS_MAINZ]: 70,
};

export const lineGroupSort = (a: LineGroup, b: LineGroup): number => {
  if (BusCategoryPrioMap[a.category] > BusCategoryPrioMap[b.category]) {
    return 1;
  } else if (BusCategoryPrioMap[a.category] < BusCategoryPrioMap[b.category]) {
    return -1;
  } else {
    return 0;
  }
};
