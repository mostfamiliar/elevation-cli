const fs = require('fs');
const flatten = require('flatten');
const geojsonCoords = require('@mapbox/geojson-coords');
const ora = require('ora');
import Conf from 'conf';
import { configKey } from './configure';
import {
  validateApiKey,
  queryTerrainVectorTileset
} from './utils';

// Query the API
export async function fetch(args) {
  // Import file and parse coordinates
  const fileName = args._[1]
  let item = fs.readFileSync(fileName,{ encoding: 'utf8' });
  let geoJSON = JSON.parse(item);
  let coordinates = geojsonCoords(geoJSON);
  let responseArr = [];


  // API key check
  const config = new Conf().get(configKey);
  const apiKey =
    args.apiKey ||
    args.apikey ||
    args['api-key'] ||
    args.key ||
    args.k ||
    config.apiKey;
  if (!validateApiKey(apiKey)) {
    return;
  }

  //TODO Add rate limiting

  let spinner = ora()
  for (let coordinatePair of coordinates) {
    spinner.start();
    let data = await queryTerrainVectorTileset(coordinatePair[0], coordinatePair[1], apiKey);
    let ele = await data.features.filter( (feature) => feature.properties.tilequery.layer === 'contour')
    responseArr.push(ele[0]);
  }
  spinner.stop();

  for(let feature of responseArr){
    for(let feature2 of geoJSON.features) {
      if(feature2.geometry.type === 'LineString'){
        for(let coordinate of feature2.geometry.coordinates){
          if(coordinate === feature.geometry.coordinates){
            console.log("hi")
          }
        }
      }
    }
  }
}

function compareArrays(arr1, arr2) {
  // arr1.forEach((f1) => arr2.forEach(f2=>{
  //   if(f1.features)
  // });
}
