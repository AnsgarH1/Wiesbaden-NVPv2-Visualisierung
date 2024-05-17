import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { MapProvider } from "react-map-gl";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark">
      <MapProvider>
        <App />
      </MapProvider>
    </ThemeProvider>
  </React.StrictMode>
);
