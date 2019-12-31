import Conf from 'conf';
import { validateApiKey } from './utils';

// Persists with this key
export const configKey = 'elevation-cli';

export function configure(args) {
  const config = new Conf();
  let currentConfigObject = config.get(configKey);

  if (args.p || args.print) {
    console.log(currentConfigObject);
    return;
}
  currentConfigObject = currentConfigObject || {};

  //API Key
  let apiKey = args.apiKey || args.apikey || args['api-key'] || args.key || args.k;
  if (!apiKey) {
    apiKey = currentConfigObject.apiKey;
  }
  if (!validateApiKey(apiKey)) {
    return;
  }

  //API source, mapbox or OSM
  let apiSource = args.api || args['api'] || args.a;


  config.set(configKey, { apiKey: apiKey, apiSource: apiSource });
}
