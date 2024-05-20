import { getLinePaint } from "@/lib/getBusLineColor";
import { Line } from "@/types";
import { Layer, Source } from "react-map-gl";
import { useTheme } from "./theme-provider";

export const LineMapSource = ({ line }: { line: Line }) => {
  const { theme } = useTheme();
  return (
    <Source
      key={`${line.id}-source`}
      id={line.id}
      type="geojson"
      data={
        line.routes.length === 1
          ? line.routes[0].geometry
          : {
              type: "FeatureCollection",
              features: line.routes.map((route) => ({
                type: "Feature",
                properties: {},
                geometry: route.geometry,
              })),
            }
      }
    >
      <Layer
        beforeId={`top-layer`}
        id={line.id}
        type="line"
        layout={{
          "line-join": "round",
          "line-cap": "round",
          "line-miter-limit": 10,
        }}
        paint={getLinePaint(line)}
      />
      {line.lineName && (
        <Layer
          type="symbol"
          id={`${line.id}-label`}
          layout={{
            "text-field":  line.name,
            "symbol-placement": "line",
            "symbol-spacing": 100,
            "text-size": 14,
            "text-anchor": "center",
          }}
          paint={{
            "text-color": theme === "light" ? "#000" : "#fff",
            "text-halo-color": theme === "light" ? "#fff" : "#000",
            "text-halo-width": 3,
          }}
        />
      )}
    </Source>
  );
};
