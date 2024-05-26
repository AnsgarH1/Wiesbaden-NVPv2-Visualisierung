import {
  BusCategory,
  Line,
  LineGroup,
  PlanVersion,
  SelectablePlanVersion,
  v1_Categories,
  v2_Categories,
} from "@/types";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Switch } from "./ui/switch";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Bus, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { lineGroupSort, lineSort } from "@/lib/utils";
import { getLineColorByLineNameAndCategory } from "@/lib/getBusLineColor";
import { Separator } from "./ui/separator";

type LineSelectionControlProps = {
  allLines: { v1: LineGroup[]; v2: LineGroup[] };
  selectedLines: Line[];
  selectedCategories: BusCategory[];
  selectedPlanVersion: SelectablePlanVersion;
  selectLine: (lineId: string) => void;
  deselectLine: (lineId: string) => void;
  selectCategory: (category: BusCategory) => void;
  deselectCategory: (category: BusCategory) => void;
  setPlanVersion: (planVersion: SelectablePlanVersion) => void;
};

export const LineSelectionControl = ({
  allLines,
  selectedLines,
  selectedCategories,
  selectedPlanVersion,
  selectLine,
  selectCategory,
  deselectLine,
  deselectCategory,
  setPlanVersion,
}: LineSelectionControlProps) => {
  const handlePlanVersionChange = (value: SelectablePlanVersion) => {
    setPlanVersion(value);
  };

  const handleCategoryChange = (category: BusCategory, selected: boolean) => {
    if (selected) {
      selectCategory(category);
    } else {
      deselectCategory(category);
    }
  };

  const handleLineChange = (lineId: string, selected: boolean) => {
    if (selected) {
      selectLine(lineId);
    } else {
      deselectLine(lineId);
    }
  };

  let allLinesForCurrentPlanVersion: LineGroup[] = [];

  if (selectedPlanVersion === "v1") {
    allLinesForCurrentPlanVersion = allLines.v1;
  } else if (selectedPlanVersion === "v2") {
    allLinesForCurrentPlanVersion = allLines.v2;
  } else {
    allLinesForCurrentPlanVersion = [
      ...allLines.v1.filter(
        (lineGroup) => lineGroup.category === BusCategory.METRO
      ),
      ...allLines.v2.filter(
        (lineGroup) => lineGroup.category === BusCategory.METRO
      ),
    ];
  }

  return (
    <div className="h-full overflow-y-scroll">
      <h2 className="text-lg font-bold">Version auswählen</h2>
      <ToggleGroup
        type="single"
        onValueChange={handlePlanVersionChange}
        value={selectedPlanVersion}
        className="p-3"
      >
        <ToggleGroupItem value={PlanVersion.V1}>
          <p>Version 1</p>
        </ToggleGroupItem>
        <ToggleGroupItem value={"both" satisfies SelectablePlanVersion}>
          <p>Beide Versionen</p>
        </ToggleGroupItem>
        <ToggleGroupItem value={PlanVersion.V2}>
          <p>Version 2</p>
        </ToggleGroupItem>
      </ToggleGroup>
      <Separator />
      <h2 className="text-lg font-bold">Kategorien</h2>
      <div className="pt-2">
        <div className="flex flex-col gap-2">
          {selectedPlanVersion === "both" && (
            <>
              <div className="flex flex-col p-3 ">
                <h3 className="text-md font-medium pb-3">Version 1</h3>
                {allLinesForCurrentPlanVersion
                  .filter(
                    (lineGroup) => lineGroup.planVersion === PlanVersion.V1
                  )
                  .flatMap((lineGroup) => lineGroup.lines)
                  .map((line) => (
                    <div
                      className="flex flex-row gap-3 pt-1 align-middle "
                      key={line.id}
                    >
                      <Switch
                        checked={selectedLines.includes(line)}
                        onCheckedChange={(checked) =>
                          handleLineChange(line.id, checked)
                        }
                      />
                      {line.name}
                    </div>
                  ))}
              </div>
              <Separator />
              <div className="flex flex-col p-3">
                <h3 className="text-md font-medium">Version 2</h3>
                {allLinesForCurrentPlanVersion
                  .filter(
                    (lineGroup) => lineGroup.planVersion === PlanVersion.V2
                  )
                  .flatMap((lineGroup) => lineGroup.lines)
                  .map((line) => (
                    <div
                      className="flex flex-row gap-3 pt-1 align-middle "
                      key={line.id}
                    >
                      <Switch
                        checked={selectedLines.includes(line)}
                        onCheckedChange={(checked) =>
                          handleLineChange(line.id, checked)
                        }
                      />
                      {line.name}
                    </div>
                  ))}
              </div>
            </>
          )}
          {selectedPlanVersion !== "both" &&
            allLinesForCurrentPlanVersion
              .sort(lineGroupSort)
              .map((lineGroup) => (
                <LineGroupCollapsible
                  lineGroup={lineGroup}
                  onCategoryChange={handleCategoryChange}
                  onLineChange={handleLineChange}
                  selectedCategories={selectedCategories}
                  selectedLines={selectedLines}
                  key={lineGroup.id}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

type LineGroupCollapsibleProps = {
  lineGroup: LineGroup;
  onCategoryChange: (category: BusCategory, checked: boolean) => void;
  onLineChange: (lineId: string, checked: boolean) => void;
  selectedCategories: Array<BusCategory>;
  selectedLines: Line[];
};

const LineGroupCollapsible = ({
  lineGroup,
  onCategoryChange,
  onLineChange,
  selectedCategories,
  selectedLines,
}: LineGroupCollapsibleProps) => {
  return (
    <div key={lineGroup.planVersion + lineGroup.category}>
      <Collapsible>
        <div className="flex justify-between gap-3" key={lineGroup.category}>
          <div className="flex gap-3 ">
            <Switch
              checked={selectedCategories.includes(lineGroup.category)}
              onCheckedChange={(checked) =>
                onCategoryChange(lineGroup.category, checked)
              }
            />
            {lineGroup.category}
          </div>
          <CollapsibleTrigger>
            <ChevronDown />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="p-3">
            {lineGroup.lines.sort(lineSort).map((line) => (
              <div
                className="flex gap-3 pt-1 align-middle "
                key={lineGroup.planVersion + line.id}
              >
                <Switch
                  checked={selectedLines.includes(line)}
                  onCheckedChange={(checked) => onLineChange(line.id, checked)}
                  color={getLineColorByLineNameAndCategory(
                    lineGroup.category,
                    line.name
                  )}
                />
                {line.name}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
