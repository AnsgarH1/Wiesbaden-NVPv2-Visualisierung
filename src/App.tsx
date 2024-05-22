import { useState } from "react";

import { Layer, LngLat, Map, NavigationControl, Popup } from "react-map-gl";

import { useTheme } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

import "mapbox-gl/dist/mapbox-gl.css";

import { Separator } from "./components/ui/separator";

import { LineMapSource } from "./components/LineMapSource";

import { busLineData } from "./data";

import { LineSelectionControl } from "./components/LineSelectionControl";
import { useSelectedLines } from "./useLineSelection";

function App() {
  const { theme } = useTheme();

  const [hoverInfo, setHoverInfo] = useState<{
    lnglat: LngLat;
    lines: string[];
  } | null>(null);

  const {
    visibleLines,
    selectedCategories,
    selectedLines,
    selectLine,
    deselectLine,
    selectCategory,
    deselectCategory,
    selectedPlanVersion,
    setPlanVersion,
  } = useSelectedLines(busLineData);

  const hoveredLines = visibleLines.filter((line) =>
    hoverInfo?.lines.includes(line.id)
  );
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
          interactiveLayerIds={visibleLines.map((line) => line.id)}
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

          <Layer id="top-layer" type="sky" />
          {visibleLines.map((line) => (
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
        </Map>
      </div>

      <div className="p-3  flex gap-3 flex-col items-center">
        <div className="flex gap-10 items-center">
          <h3 className="text-lg ">Ansicht konfigurieren</h3>
          <ModeToggle />
        </div>
        <Separator />
        <LineSelectionControl
          allLines={{
            v1: busLineData.filter(lineGroup=>lineGroup.planVersion === "v1"),
            v2: busLineData.filter(lineGroup=>lineGroup.planVersion === "v2")
          }}
          selectedLines={selectedLines}
          selectedCategories={selectedCategories}
          selectedPlanVersion={selectedPlanVersion}
          setPlanVersion={setPlanVersion}
          selectLine={selectLine}
          deselectLine={deselectLine}
          selectCategory={selectCategory}
          deselectCategory={deselectCategory}
        />
      </div>
    </div>
  );
}

export default App;
