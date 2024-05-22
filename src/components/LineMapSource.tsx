import { getLinePaint } from "@/lib/getBusLineColor";
import { Line } from "@/types";
import { Layer, Source } from "react-map-gl";
import { useTheme } from "./theme-provider";

export const LineMapSource = ({ line }: { line: Line }) => {
  const { theme } = useTheme();
  return (
    <Source
      key={`${line.id}-source`}
      id={`${line.id}-source`}
      type="geojson"
      data={line.routes[0].geometry}
    >
      <Layer
        beforeId="top-layer"
        id={`${line.id}-line`}
        type="line"
        layout={{
          "line-join": "round",
          "line-cap": "round",
        }}
        paint={getLinePaint(line)}
      />
      {line.lineName && (
        <Layer
          type="symbol"
          id={`${line.id}-label`}
          layout={{
            "text-field": line.name,
            "symbol-placement": "line",
            "symbol-spacing": 100,
            "text-size": 10,
            "text-anchor": "center",
            "icon-allow-overlap": true,
            "text-allow-overlap": true,
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
