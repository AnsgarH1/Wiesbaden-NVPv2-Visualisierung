import { Switch } from "./ui/switch";

export const StopSelectionControl = ({
  showStops,
  setShowStops,
  showLineNames,
  setShowLineNames,
}: {
  showStops: boolean;
  showLineNames: boolean;
  setShowStops: (value: boolean) => void;
  setShowLineNames: (value: boolean) => void;
}) => (
  <div className="flex flex-col py-3 gap-3 w-full">
    <div className="flex  gap-3 w-full">
      <Switch checked={showStops} onCheckedChange={setShowStops} />
      <p>Haltstellen anzeigen</p>
    </div>
    <div className="flex  gap-3 w-full">
      <Switch checked={showLineNames} onCheckedChange={setShowLineNames} />
      <p>Liniennamen auf Karte anzeigen</p>
    </div>
  </div>
);
