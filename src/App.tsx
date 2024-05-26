import { useEffect, useReducer, useState } from "react";

import {
  Layer,
  LngLat,
  Map,
  NavigationControl,
  Popup,
  useMap,
} from "react-map-gl";

import { useTheme } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

import "mapbox-gl/dist/mapbox-gl.css";

import { Separator } from "./components/ui/separator";

import { LineMapSource } from "./components/LineMapSource";

import { busLineData } from "./data";

import { LineSelectionControl } from "./components/LineSelectionControl";
import { useSelectedLines } from "./useLineSelection";
import { Switch } from "./components/ui/switch";
import { Button } from "./components/ui/button";
import { Menu, X } from "lucide-react";

function App() {
  const { theme } = useTheme();

  const [hoverInfo, setHoverInfo] = useState<{
    lnglat: LngLat;
    lines: string[];
  } | null>(null);

  const map = useMap();
  const [showMenu, toggleMenu] = useReducer((val) => !val, true);
  useEffect(() => {
    map.map?.resize();
    console.log("map resized!", map.map);
  }, [showMenu, map]);

  const [showLineNames, setShowLineNames] = useState(true);
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
    <div className="w-screen h-screen bg-white dark:bg-slate-800 flex flex-row">
      <div className="flex flex-1 h-full w-ful">
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
          <NavigationControl position="top-left" />

          <Layer id="top-layer" type="sky" />
          {visibleLines.map((line) => (
            <LineMapSource
              key={line.id}
              line={line}
              showLineName={showLineNames}
              selectedPlanVersion={selectedPlanVersion}
            />
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
      {showMenu ? (
        <div className="p-3  basis-1/3 flex gap-3 flex-col items-center">
          <div className="flex flex-col w-full h-full  justify-between gap-3">
            <div className="flex gap-10 justify-between items-center w-full">
              <ModeToggle />
              <h1 className="text-lg font-bold ">Ansicht konfigurieren</h1>
              <Button
                variant="outline"
                size="icon"
                aria-label="Menü schließen"
                onClick={toggleMenu}
              >
                <X />
              </Button>
            </div>
            <Separator />
            <LineSelectionControl
              allLines={{
                v1: busLineData.filter(
                  (lineGroup) => lineGroup.planVersion === "v1"
                ),
                v2: busLineData.filter(
                  (lineGroup) => lineGroup.planVersion === "v2"
                ),
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
          <div className="flex  gap-3 w-full">
            <Switch
              checked={showLineNames}
              onCheckedChange={setShowLineNames}
            />
            <p>Liniennamen auf Karte anzeigen</p>
          </div>
        </div>
      ) : (
        <div className="absolute top-3 right-3">
          <Button size="icon" onClick={toggleMenu}>
            <Menu />
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
