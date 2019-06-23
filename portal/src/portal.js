import * as singleSpa from 'single-spa';
import { GlobalEventDistributor } from './globalEventDistributor';
import { loadApp } from './helper';
const NODE_ENV = process.env.NODE_ENV;

async function init() {
  const globalEventDistributor = new GlobalEventDistributor();
  let loadingPromises = [];
  if (NODE_ENV === 'prod') {
    let projectConfig;
    projectConfig = await SystemJS.import('./project.config.js');
    loadingPromises = projectConfig.projects.map(element => {
      loadApp({
        name: element.name,
        main: element.main,
        url: element.prefix,
        store: element.store,
        base: element.base,
        path: element.path,
      });
    });
  } else {
    // reactApp: The URL "/reactApp/..." is being redirected to "http://localhost:9001/..." this is done by the webpack proxy (webpack.config.js)
    loadingPromises.push(
      loadApp({
        name: 'reactApp',
        path: '/reactApp',
        main: '/reactApp/main.js',
        store: '/reactApp/store.js',
        globalEventDistributor,
      }),
    );
    // vueApp: The URL "/vueApp/..." is being redirected to "http://localhost:9002/..." this is done by the webpack proxy (webpack.config.js)
    loadingPromises.push(
      loadApp({
        name: 'vueApp',
        path: '/vueApp',
        main: '/vueApp/main.js',
        store: '/vueApp/store.js',
        globalEventDistributor,
      }),
    ); // does not have a store, so we pass null
  }
  await Promise.all(loadingPromises);
  singleSpa.start();
}

init();
