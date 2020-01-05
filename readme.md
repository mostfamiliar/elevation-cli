## Add elevation to geojson points using the Mapbox tilequery API.

### Import .geojson file, export .geojson with coordinates

## Requirements
  * Active Mapbox api key
  * Node Version ~13


## Install

```
$ npm install --global elevation-cli
```


## Usage

```
1. Configure API Key
  $ elevation config -a


$ elevation -h

  Usage
    $ elevation [command] <options|path>
  Examples
    $ elevation fetch ~/azt.geojson
    $ elevation config -p
```

## Related

- [mapbox-terrain-tileset](https://docs.mapbox.com/help/troubleshooting/access-elevation-data/) - API for this module
- [everything-you-wanted-to-know-about-geojson](https://macwright.org/2015/03/23/geojson-second-bite.html) - Resource for understanding geojson formatting
