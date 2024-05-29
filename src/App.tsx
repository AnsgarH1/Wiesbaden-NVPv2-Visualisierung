/// <reference types="vite-plugin-svgr/client" />
import { useEffect, useReducer, useState } from "react";

import {
  Layer,
  LngLat,
  Map,
  Marker,
  NavigationControl,
  Popup,
  useMap,
} from "react-map-gl";

import { useTheme } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

import "mapbox-gl/dist/mapbox-gl.css";

import WnbLogoSvg from "@/assets/wnb-logo.svg?react";
import GithubIcon from "@/assets/github-mark.svg?react";

import { Separator } from "./components/ui/separator";

import { LineMapSource } from "./components/LineMapSource";

import { busLineData } from "./data";

import { LineSelectionControl } from "./components/LineSelectionControl";
import { useSelectedLines } from "./useLineSelection";
import { Switch } from "./components/ui/switch";
import { Button } from "./components/ui/button";
import {  MapPin, Menu, X } from "lucide-react";
import { PlanVersion, Stop } from "./types";
import { v1_stops } from "./data/version_01/v1_stops";
import { v2_stops } from "./data/version_02/v2_stops";

const INITIAL_MAP_ZOOM = 12;

function App() {
  const { theme } = useTheme();

 
  const [hoverInfo, setHoverInfo] = useState<{
    lnglat: LngLat;
    lineLayerIds: string[];
  } | null>(null);

  const map = useMap();

  const [showMenu, toggleMenu] = useReducer((val) => !val, true);
  useEffect(() => {
    map.map?.resize();
  }, [showMenu, map]);
  const [mapZoom, setMapZoom] = useState(INITIAL_MAP_ZOOM);

  const [showLineNames, setShowLineNames] = useState(true);
  const [showStops, setShowStops] = useState(false);
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

  const hoveredOverLines = visibleLines.filter((line) =>
    hoverInfo?.lineLayerIds.some((layerId) => layerId.includes(line.id))
  );


  const stopsToDisplay: Stop[] = showStops
    ? selectedPlanVersion === PlanVersion.V1
      ? v1_stops
      : v2_stops
    : [];

  return (
    <div className="w-screen h-screen bg-background ">
      <div className="flex flex-col h-full w-full ">
        <div className="flex-1 flex overflow-hidden border-b-slate-700">
          <div className="flex-1  ">
            <Map
              id="map"
              mapboxAccessToken={import.meta.env.VITE_PUBLIC_MAPBOX_TOKEN}
              initialViewState={{
                longitude: 8.24178,
                latitude: 50.0817,
                zoom: INITIAL_MAP_ZOOM,
              }}
              reuseMaps
              onZoomEnd={(e) => setMapZoom(e.target.getZoom())}
              style={{ height: "100%", width: "100%" }}
              mapStyle={
                theme === "light"
                  ? "mapbox://styles/mapbox/light-v11"
                  : "mapbox://styles/mapbox/dark-v11"
              }
              interactiveLayerIds={visibleLines.map(
                (line) => `${line.id}-line`
              )}
              onMouseMove={(e) => {
                if (e.features && e.features.length > 0) {
                  const layerIds = e.features.map((f) => f.layer.id);

                  setHoverInfo({
                    lnglat: e.lngLat,
                    lineLayerIds: layerIds,
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
              {hoverInfo && hoveredOverLines && (
                <Popup
                  longitude={hoverInfo.lnglat.lng}
                  latitude={hoverInfo.lnglat.lat}
                  style={{ color: "black" }}
                  maxWidth="700px"
                  closeButton={false}
                >
                  {hoveredOverLines.map((line) => (
                    <p key={line.id} className="text-nowrap ">
                      {line.name}
                    </p>
                  ))}
                </Popup>
              )}
              {stopsToDisplay.map((stop) => (
                <Marker
                  latitude={stop.geometry.coordinates[1]}
                  longitude={stop.geometry.coordinates[0]}
                  key={stop.id}
                  anchor="bottom"
                >
                  <div className="flex justify-center flex-col items-center">
                    {mapZoom > 14 && <p>{stop.name}</p>}
                    <MapPin
                      size={mapZoom > 14 ? 24 : 16}
                      color={theme === "light" ? "#4b4b4b" : "#a7a7a7"}
                    />
                  </div>
                </Marker>
              ))}
            </Map>
          </div>
          {showMenu ? (
            <div className="p-3  flex flex-col justify-between bg-popover  w-96  items-center min-w-12 overflow-y-auto">
              <div className="flex flex-col gap-3 w-full">
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
              <div className="flex flex-col py-3 gap-3 w-full">
                <div className="flex  gap-3 w-full">
                  <Switch checked={showStops} onCheckedChange={setShowStops} />
                  <p>Haltstellen anzeigen</p>
                </div>
                <div className="flex  gap-3 w-full">
                  <Switch
                    checked={showLineNames}
                    onCheckedChange={setShowLineNames}
                  />
                  <p>Liniennamen auf Karte anzeigen</p>
                </div>
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
        <div className=" bg-primary text-white dark:bg-background flex justify-between items-center px-3">
          <a href="https://www.wiesbaden-neu-bewegen.de">
            <WnbLogoSvg className="h-16 w-auto py-3" />
          </a>
          <h1 className="text-xl font-semibold">
            Interaktiver Nahverkehrsplan Wiesbaden{" "}
          </h1>
          <div className="flex gap-5">
            <a href="https://github.com/AnsgarH1/Wiesbaden-NVPv2-Visualisierung">
              <div className="flex justify-center items-center  gap-2 underline ">
                <GithubIcon className="h-4 w-auto fill-white" />
                GitHub
              </div>
            </a>

            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
