# Mappinger
An open map with the end-user in mind.

## Prerequisites
(tbd)

## Configuration
rename `src/config.ts.sample` to `src/config.ts` and replace `"YOUR-TOKEN-GOES-HERE"` with your API token from [Mapbox](http://mapbox.com).

## Install typings
```
npm i -g typings
typings i
```

## Run
kick off typescript-compilation (with change-detection) and run a local devserver on localhost:8080
```
npm run devserver
```

## Build a Dev-Build
creates a build with dev-webpack-configuration in /build directory
```
npm run build-dev
```

## Build for Production
creates a build in /build directory
```
npm run build
```
