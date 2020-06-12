import {registerPlugin, ScullyConfig} from '@scullyio/scully';
import {DisableAngular} from 'scully-plugin-disable-angular';

// region Plugin for Pokemon Ids

const {httpGetJson, routeSplit} = require('@scullyio/scully');

import {PokeAPIList, PokeAPIResult} from 'src/app/pokemon/services/poke-api.model';

export const typeName = 'pokemonIds';

export const plugin = async (route, pluginConfig) => {
  const list: PokeAPIList = await httpGetJson(pluginConfig.url);

  // Helper to generate URLs from the given config
  const {createPath} = routeSplit(route);

  return list.results.map((item: PokeAPIResult) => {
    return {
      route: createPath(item.name), // Pass pokemon name as :id into the route
    };
  });
};

// endregion

// Register our plugin for routes of type typeName
registerPlugin('router', typeName, plugin);

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'demo',
  defaultPostRenderers: [DisableAngular],
  outDir: './dist/static',
  routes: {
    '/pokemon/view/:id': {
      type: typeName,
      url: 'https://pokeapi.co/api/v2/pokemon?limit=10'
    }
  }
};
