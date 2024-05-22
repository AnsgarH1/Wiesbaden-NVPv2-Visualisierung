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

  return (
    <div className="h-full overflow-y-scroll">
      <h2 className="text-wrap">Version auswählen</h2>
      <ToggleGroup
        type="single"
        onValueChange={handlePlanVersionChange}
        value={selectedPlanVersion}
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
      <h2>Kategorien</h2>
      <div className="pt-2">
        {selectedPlanVersion === "v2" && (
          <div className="flex flex-col gap-2">
            {v2_Categories.map((category) => (
              <div>
                <div className="flex gap-3" key={category}>
                  <Switch
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category, checked)
                    }
                  />
                  {category}
                </div>
                <div className="p-3">
                  {allLines.v2
                    .filter((lineGroup) => lineGroup.category === category)
                    .flatMap((lineGroup) => lineGroup.lines)
                    .map((line) => (
                      <div  className="flex gap-3 pt-1">
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
              </div>
            ))}
          </div>
        )}
        {selectedPlanVersion === "v1" && (
          <div className="flex flex-col gap-2">
            {v1_Categories.map((category) => (
              <div>
                <div className="flex gap-3">
                  <Switch
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category, checked)
                    }
                  />
                  {category}
                </div>
                <div className="p-3">
                  {allLines.v1
                    .filter((lineGroup) => lineGroup.category === category)
                    .flatMap((lineGroup) => lineGroup.lines)
                    .map((line) => (
                      <div  className="flex gap-3">
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
