const fetch = require('node-fetch');

export function validateApiKey(apiKey) {
  if (!apiKey) {
    console.error(
      chalk.redBright(
        `API Key has not been set up yet.`
      )
    );
    console.warn(
      `Please use command ${chalk.greenBright(
        'weather config --apiKey'
      )} to save your API key.
        `
    );
    return false;
  }
  return true;
}

export async function queryTerrainVectorTileset(lon, lat, apiKey) {
  const baseUri = 'https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/';
  const url = getApiUrl(baseUri, lon, lat, apiKey);
  let response = await fetch(url);
  let data = await response.json()
  return data;
}

function getApiUrl(baseUri, lon, lat, apiKey){
    let url = `${baseUri}${lon},${lat}.json?&access_token=${apiKey}`
    return url;
}
