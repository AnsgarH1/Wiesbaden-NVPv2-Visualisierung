import { getLinePaint } from "@/lib/getBusLineColor";
import { Line, SelectablePlanVersion } from "@/types";
import { Layer, Source } from "react-map-gl";
import { useTheme } from "./theme-provider";
import { FeatureCollection } from "geojson";

export const LineMapSource = ({
  line,
  showLineName,
  selectedPlanVersion,
}: {
  line: Line;
  showLineName: boolean;
  selectedPlanVersion: SelectablePlanVersion;
}) => {
  const { theme } = useTheme();

  // set both routes as source if multiple routes exist on line
  const data: FeatureCollection = {
    type: "FeatureCollection",
    features: line.routes.map((route) => ({
      type: "Feature",
      properties: {},
      geometry: route.geometry,
    })),
  };

  return (
    <Source
      key={`${line.id}-source`}
      id={`${line.id}-source`}
      type="geojson"
      data={data}
    >
      <Layer
        beforeId="top-layer"
        id={`${line.id}-line`}
        type="line"
        layout={{
          "line-join": "round",
          "line-cap": "round",
        }}
        paint={getLinePaint(line, selectedPlanVersion == "both")}
      />
      {showLineName && line.lineName && (
        <Layer
          type="symbol"
          id={`${line.id}-label`}
          layout={{
            "text-field": line.name,
            "symbol-placement": "line",
            "symbol-spacing": 50,
            "text-size": 12,
            "text-ignore-placement": false,
            "symbol-avoid-edges": true,
          }}
          paint={{
            "text-color": theme === "light" ? "#000" : "#fff",
            "text-halo-color": theme === "light" ? "#fff" : "#000",
            "text-halo-width": 2,
          }}
        />
      )}
    </Source>
  );
};
