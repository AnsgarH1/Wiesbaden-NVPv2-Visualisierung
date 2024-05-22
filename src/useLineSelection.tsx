import { useMemo, useState } from "react";
import {
  BusCategory,
  Line,
  LineGroup,
  PlanVersion,
  SelectablePlanVersion,
} from "./types";

export const useSelectedLines = (initialLineGroups: LineGroup[]) => {
  const [selectedLineIdsByPlanVersion, setSelectedLineIdsByPlanVersion] =
    useState<{
      [key in SelectablePlanVersion]: string[];
    }>({
      v1: [],
      v2: [],
      both: [],
    });

  const [selectedPlanVersion, setSelectedPlanVersion] =
    useState<SelectablePlanVersion>(PlanVersion.V2);

  const selectLine = (lineId: string) => {
    setSelectedLineIdsByPlanVersion((prev) => ({
      ...prev,
      [selectedPlanVersion]: prev[selectedPlanVersion].includes(lineId)
        ? prev[selectedPlanVersion]
        : [...prev[selectedPlanVersion], lineId],
    }));
  };

  const deselectLine = (lineId: string) => {
    setSelectedLineIdsByPlanVersion((prev) => ({
      ...prev,
      [selectedPlanVersion]: prev[selectedPlanVersion].filter(
        (id) => id !== lineId
      ),
    }));
  };

  const selectCategory = (category: BusCategory) => {
    const linesToSelect = initialLineGroups
      .filter(
        (group) =>
          group.category === category &&
          group.planVersion === selectedPlanVersion
      )
      .flatMap((group) => group.lines.map((line) => line.id));

    setSelectedLineIdsByPlanVersion((prev) => ({
      ...prev,
      [selectedPlanVersion]: Array.from(
        new Set([...prev[selectedPlanVersion], ...linesToSelect])
      ),
    }));
  };

  const deselectCategory = (category: BusCategory) => {
    const linesToDeselect = initialLineGroups
      .filter(
        (group) =>
          group.category === category &&
          group.planVersion === selectedPlanVersion
      )
      .flatMap((group) => group.lines.map((line) => line.id));

    setSelectedLineIdsByPlanVersion((prev) => ({
      ...prev,
      [selectedPlanVersion]: prev[selectedPlanVersion].filter(
        (id) => !linesToDeselect.includes(id)
      ),
    }));
  };

  const setPlanVersion = (version: SelectablePlanVersion) => {
    setSelectedPlanVersion(version);
  };

  const selectedCategories = useMemo(() => {
    const categories = new Set<BusCategory>();
    selectedLineIdsByPlanVersion[selectedPlanVersion].forEach((lineId) => {
      const line = initialLineGroups
        .flatMap((group) => group.lines)
        .find((l) => l.id === lineId);
      if (line) {
        categories.add(line.category);
      }
    });
    return Array.from(categories);
  }, [selectedLineIdsByPlanVersion, selectedPlanVersion, initialLineGroups]);

  const selectedLines: Line[] = selectedLineIdsByPlanVersion[
    selectedPlanVersion
  ]
    .map((lineId) => {
      return initialLineGroups
        .flatMap((group) => group.lines)
        .find((line) => line.id === lineId);
    })
    .filter((line): line is Line => line !== undefined);

  const visibleLines: Line[] = initialLineGroups
    .filter((lineGroup) => lineGroup.planVersion === selectedPlanVersion)
    .flatMap((lineGroup) =>
      lineGroup.lines.filter((line) =>
        selectedLineIdsByPlanVersion[selectedPlanVersion].includes(line.id)
      )
    );

  return {
    selectedLines,
    selectedCategories,
    selectedPlanVersion,
    visibleLines,
    selectLine,
    deselectLine,
    selectCategory,
    deselectCategory,
    setPlanVersion,
  };
};
