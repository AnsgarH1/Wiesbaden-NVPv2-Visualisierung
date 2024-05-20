import { BusCategory, SelectablePlanVersion } from "@/types";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Switch } from "./ui/switch";

type LineSelectionControlProps = {
  selectedPlanVersion: SelectablePlanVersion;
  selectedCategories: Array<BusCategory>;
  onPlanVersionChange: (planVersion: SelectablePlanVersion) => void;
  onCategoriesChange: (category: Array<BusCategory>) => void;
};

export const LineSelectionControl = ({
  selectedCategories,
  selectedPlanVersion,
  onCategoriesChange,
  onPlanVersionChange,
}: LineSelectionControlProps) => {
  const handlePlanVersionChange = (value: string) => {
    console.log(`new plan version: ${value}`);
    onPlanVersionChange(value as SelectablePlanVersion);
  };

  const handleCategoryChange = (category: BusCategory, selected: boolean) => {
    console.log(`category ${category} ${selected ? "selected" : "deselected"}`);
    const newCategories = selected
      ? [...selectedCategories, category]
      : selectedCategories.filter((c) => c !== category);
    onCategoriesChange(newCategories);
  };

  const v1_Categories = [
    BusCategory.METRO,
    BusCategory.STADT,
    BusCategory.QUARTIER,
  ];

  const v2_Categories = [
    BusCategory.METRO,
    BusCategory.EXPRESS,
    BusCategory.SPRINTER,
    BusCategory.STADT,
    BusCategory.REGIONAL,
  ];

  return (
    <div>
      <h2 className="text-wrap">Version auswählen</h2>
      <ToggleGroup
        type="single"
        onValueChange={handlePlanVersionChange}
        value={selectedPlanVersion}
      >
        <ToggleGroupItem value={"v1" satisfies SelectablePlanVersion}>
          <p>Version 1</p>
        </ToggleGroupItem>
        <ToggleGroupItem value={"both" satisfies SelectablePlanVersion}>
          <p>Beide Versionen</p>
        </ToggleGroupItem>
        <ToggleGroupItem value={"v2" satisfies SelectablePlanVersion}>
          <p>Version 2</p>
        </ToggleGroupItem>
      </ToggleGroup>
      <h2>Kategorien</h2>
      <div className="pt-2">
        {selectedPlanVersion === "v2" && (
          <div className="flex flex-col gap-2">
            {v2_Categories.map((category) => (
              <div className="flex gap-3">
                <Switch
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category, checked)
                  }
                />
                {category}
              </div>
            ))}
          </div>
        )}
        {selectedPlanVersion === "v1" && (
          <div className="flex flex-col gap-2">
            {v1_Categories.map((category) => (
              <div className="flex gap-3">
                <Switch
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category, checked)
                  }
                />
                {category}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
