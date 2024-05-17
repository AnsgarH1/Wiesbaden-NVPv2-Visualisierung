import { useState } from "react";

import { Layer, Map, NavigationControl, Source } from "react-map-gl";

import { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group";
import { useTheme } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

import "mapbox-gl/dist/mapbox-gl.css";

import { m1_new, m1_old, m4_new, m4_old } from "./data/geojson";
import { Switch } from "./components/ui/switch";
import { Separator } from "./components/ui/separator";

const M1SourceNew = ({ theme }: { theme: string }) => (
  <Source key="m1_new" id="m1_new" type="geojson" data={m1_new}>
    <Layer
      key="my-layer-1"
      type="line"
      paint={{
        "line-color": theme === "light" ? "#004970" : "#c8d600",
        "line-width": 3,
      }}
    />
  </Source>
);

const M1SourceOld = ({ theme }: { theme: string }) => (
  <Source key="m1_old" id="m1_old" type="geojson" data={m1_old}>
    <Layer
      key="my-layer-1"
      type="line"
      paint={{
        "line-color": theme === "light" ? "#1f4052" : "#a1a938",
        "line-width": 3,
        "line-dasharray": [1, 0.1],
      }}
    />
  </Source>
);

const M4SourceNew = ({ theme }: { theme: string }) => (
  <Source key="m4_new" id="m4_new" type="geojson" data={m4_new}>
    <Layer
      key="my-layer-1"
      type="line"
      paint={{
        "line-color": theme === "light" ? "#004970" : "#ff2f00",
        "line-width": 3,
      }}
    />
  </Source>
);

const M4SourceOld = ({ theme }: { theme: string }) => (
  <Source key="m4_old" id="m4_old" type="geojson" data={m4_old}>
    <Layer
      key="my-layer-1"
      type="line"
      paint={{
        "line-color": theme === "light" ? "#1f4052" : "#e75858",
        "line-width": 3,
        "line-dasharray": [1, 0.1],
      }}
    />
  </Source>
);

function App() {
  const { theme } = useTheme();

  const [nvpPlanVersion, setNvpPlanVersion] = useState<"old" | "new" | "both">(
    "both"
  );

  const [selectedM1, setSelectedM1] = useState(true);
  const [selectedM4, setSelectedM4] = useState(true);

  const handleNvpPlanVersionChange = (value: string) => {
    if (value === "old" || value === "new" || value === "both") {
      setNvpPlanVersion(value);
    }
  };

  return (
    <div className="w-screen h-screen bg-white dark:bg-slate-800 flex flex-col lg:flex-row">
      <div className="flex-1 h-full w-full bg-green-400">
        <Map
          id="map"
          mapboxAccessToken={import.meta.env.VITE_PUBLIC_MAPBOX_TOKEN}
          initialViewState={{
            longitude: 8.24178,
            latitude: 50.0817,
            zoom: 12,
          }}
          reuseMaps
          style={{ height: "100%", width: "100%" }}
          mapStyle={
            theme === "light"
              ? "mapbox://styles/mapbox/light-v11"
              : "mapbox://styles/mapbox/dark-v11"
          }
        >
          {(nvpPlanVersion === "new" || nvpPlanVersion === "both") &&
            selectedM1 && <M1SourceNew theme={theme} />}
          {(nvpPlanVersion === "old" || nvpPlanVersion === "both") &&
            selectedM1 && <M1SourceOld theme={theme} />}

          {(nvpPlanVersion === "new" || nvpPlanVersion === "both") &&
            selectedM4 && <M4SourceNew theme={theme} />}
          {(nvpPlanVersion === "old" || nvpPlanVersion === "both") &&
            selectedM4 && <M4SourceOld theme={theme} />}
          <NavigationControl />
        </Map>
      </div>

      <div className="p-3  flex gap-3 flex-col items-center">
        <div className="flex gap-10 items-center">
          <h3 className="text-lg ">Ansicht konfigurieren</h3>
          <ModeToggle />
        </div>
        <Separator />
        <ToggleGroup
          type="single"
          value={nvpPlanVersion}
          onValueChange={handleNvpPlanVersionChange}
        >
          <ToggleGroupItem value="old">nur V1</ToggleGroupItem>
          <ToggleGroupItem value="both">beide Varianten</ToggleGroupItem>
          <ToggleGroupItem value="new">nur V2</ToggleGroupItem>
        </ToggleGroup>
        <Separator />
        <h3 className="text-lg ">Linien auswählen:</h3>

        <div className="flex gap-2 pt-2  w-full text-center">
          <Switch checked={selectedM1} onCheckedChange={setSelectedM1} />
          <div>
            <strong>M1:</strong> Dotzheim - Bierstadt
          </div>
        </div>
        <div className="flex gap-2  w-full">
          <Switch checked={selectedM4} onCheckedChange={setSelectedM4} />
          <p>
            <strong>M4:</strong> Nordfriedhof - Biebrich Rheinufer
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
