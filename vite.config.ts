import { sentryVitePlugin } from "@sentry/vite-plugin";
import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr({
    include: "**/*.svg?react",
  }), sentryVitePlugin({
    org: "ansgar-hoyer",
    project: "nvp-visualisierung"
  })],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  assetsInclude: ['**/*.ttf'],

  build: {
    sourcemap: true
  }
})