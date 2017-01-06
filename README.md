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
typings install dt~es6-promise dt~es6-collections --global --save
```

## Run
kick off typescript-compilation (with change-detection) and run a local devserver on localhost:8080
```
npm run devserver
```
## Build for Production
creates a build in /build directory
```
npm run dumpprod
```
