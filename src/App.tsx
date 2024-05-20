import { useState } from "react";

import { Layer, LngLat, Map, NavigationControl, Popup } from "react-map-gl";

import { useTheme } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

import "mapbox-gl/dist/mapbox-gl.css";

import { Separator } from "./components/ui/separator";

import { LineMapSource } from "./components/LineMapSource";

import { busLineData } from "./data";
import { BusCategory, PlanVersion } from "./types";
import { LineSelectionControl } from "./components/LineSelectionControl";

function App() {
  const { theme } = useTheme();

  const [hoverInfo, setHoverInfo] = useState<{
    lnglat: LngLat;
    lines: string[];
  } | null>(null);

  const [selectedPlanVersion, setSelectedPlanVersion] = useState<
    "v1" | "v2" | "both"
  >("v2");

  const [selectedCategories, setSelectedCategories] = useState<BusCategory[]>([
    BusCategory.EXPRESS,
    BusCategory.METRO,
    BusCategory.SPRINTER,
    BusCategory.STADT,
    BusCategory.QUARTIER,
    BusCategory.REGIONAL,
  ]);

  const lineGroupsToDisplay = busLineData
    .filter(
      (lineGroup) =>
        (selectedPlanVersion === "both" ||
          lineGroup.planVersion ===
            (selectedPlanVersion === "v1" ? PlanVersion.V1 : PlanVersion.V2)) &&
        selectedCategories.includes(lineGroup.category)
    )
    .sort((b, a) => {
      // sort by category -> metrobusses before express and sprinter busses, before rest
      if (
        a.category === BusCategory.METRO &&
        b.category !== BusCategory.METRO
      ) {
        return -1;
      }
      if (
        b.category === BusCategory.METRO &&
        a.category !== BusCategory.METRO
      ) {
        return 1;
      }
      if (
        a.category === BusCategory.EXPRESS &&
        b.category !== BusCategory.EXPRESS
      ) {
        return -1;
      }
      if (
        b.category === BusCategory.EXPRESS &&
        a.category !== BusCategory.EXPRESS
      ) {
        return 1;
      }
      if (
        a.category === BusCategory.SPRINTER &&
        b.category !== BusCategory.SPRINTER
      ) {
        return -1;
      }
      if (
        b.category === BusCategory.SPRINTER &&
        a.category !== BusCategory.SPRINTER
      ) {
        return 1;
      }
      return 0;
    });

  const hoveredLines = lineGroupsToDisplay
    .flatMap((lineGroup) => lineGroup.lines)
    .filter((line) => hoverInfo?.lines.includes(line.id));
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
          interactiveLayerIds={lineGroupsToDisplay
            .flatMap((lineGroup) => lineGroup.lines)
            .map((line) => line.id)}
          onMouseMove={(e) => {
            if (e.features && e.features.length > 0) {
              const layerIds = e.features.map((f) => f.layer.id);

              setHoverInfo({
                lnglat: e.lngLat,
                lines: layerIds,
              });
            } else {
              setHoverInfo(null);
            }
          }}
        >
          <NavigationControl />

          {lineGroupsToDisplay
            .flatMap((lineGroup) => lineGroup.lines)
            .map((line) => (
              <LineMapSource key={line.id} line={line} />
            ))}

          {hoverInfo && hoveredLines && (
            <Popup
              longitude={hoverInfo.lnglat.lng}
              latitude={hoverInfo.lnglat.lat}
              style={{ color: "black" }}
              maxWidth="700px"
              closeButton={false}
            >
              {hoveredLines.map((line) => (
                <p key={line.id} className="text-nowrap text-md font-semibold">
                  {line.name}
                </p>
              ))}
            </Popup>
          )}
          <Layer id="top-layer" type="sky" />
        </Map>
      </div>

      <div className="p-3  flex gap-3 flex-col items-center">
        <div className="flex gap-10 items-center">
          <h3 className="text-lg ">Ansicht konfigurieren</h3>
          <ModeToggle />
        </div>
        <Separator />
        <LineSelectionControl
          onCategoriesChange={(categories) => setSelectedCategories(categories)}
          onPlanVersionChange={(version) => setSelectedPlanVersion(version)}
          selectedCategories={selectedCategories}
          selectedPlanVersion={selectedPlanVersion}
        />
      </div>
    </div>
  );
}

export default App;
