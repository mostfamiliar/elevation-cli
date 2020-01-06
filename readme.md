## Add elevation to geojson points using the Mapbox tilequery API.

### Import .geojson file with point geometry (lat/lng coordinates), export .geojson with 'ele' for each point

## Requirements
  * Active Mapbox API key
  * Node Version ~13


## Install

```
$ npm install --global elevation-cli
```


## Usage

```
  Usage
    $ elevation [command] <options|path>
    
  Commands
    - `config`: set mapbox API key
    - `fetch`: query mapbox API
    
  Options
    - `-h`: show help menu for a command
    - `-v`: show package version
    - `-p`: print
    
  Examples
    $ elevation fetch ~/azt.geojson
    $ elevation config -p
    
```

## Related

- [mapbox-terrain-tileset](https://docs.mapbox.com/help/troubleshooting/access-elevation-data/) - API for this module
- [everything-you-wanted-to-know-about-geojson](https://macwright.org/2015/03/23/geojson-second-bite.html) - Resource for understanding geojson formatting
