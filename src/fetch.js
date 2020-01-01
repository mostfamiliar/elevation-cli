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
  let geoJSON = await JSON.parse(item);
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
    let element = await data.features.find( (feature) => feature.properties.tilequery.layer === 'contour' )
    if (element != undefined) {
      responseArr.push(element);
    }
  }
  spinner.stop();

  responseArr.map((feature1) => {
    geoJSON.features = geoJSON.features.map((feature2,index2) => {
      if(feature1.geometry.coordinates.toString() === feature2.geometry.coordinates.toString()){
        if(feature2.geometry.type === 'Point'){
        feature2.properties.ele = feature1.properties.ele;
        }
      }
        return feature2;
    });
  });

  return geoJSON;
}
