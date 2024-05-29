# Project details

This project is a visualisation of the current designs for the new public transport network for Wiesbaden in 2030. 
This project is built as a React SPA, completely client-side rendered and built with Vite. 

## Run locally

You can run this project locally, just clone this repo, run `npm install` (or `pnpm install`) and start the vite dev server with `npm run dev` (or `pnpm dev`).

To render the map, you will need a [mapbox access token] (https://docs.mapbox.com/help/getting-started/access-tokens/). You can get this by creating a free account at mapbox. Then replace .env.example with your token and rename the file to .env so that it can be read properly. The project also uses Sentry for error monitoring, but the setup is not required for local development.

## Dependencies:

* Vite (plugin-react-swc, vite-plugin-svgr) - used to bundle the react application.
* Tailwind + shadcn/ui - my current go-to for styling and pre-written react components.
* react-map-gl - a react wrapper for the Mapbox JS SDK that makes life a lot easier.

## Source data

The public transport data used was kindly provided by https://planersocietaet.de/




