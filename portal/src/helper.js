import * as singleSpa from 'single-spa'; // waiting for this to be merged: https://github.com/CanopyTax/single-spa/pull/156

export function hashPrefix(prefix) {
    return function (location) {
        return location.hash.startsWith(`#${prefix}`);
    }
}

export async function loadApp({name, path, main, store, globalEventDistributor}) {
    let storeModule = {}, customProps = {globalEventDistributor: globalEventDistributor};
    // try to import the store module
    try {
        storeModule = store ? await SystemJS.import(store) : {storeInstance: null};
    } catch (e) {
        console.log(`Could not load store of app ${name}.`, e);
    }

    if (storeModule.storeInstance && globalEventDistributor) {
        // add a reference of the store to the customProps
        customProps.store = storeModule.storeInstance;

        // register the store with the globalEventDistributor
        globalEventDistributor.registerStore(storeModule.storeInstance);
    }

    // register the app with singleSPA and pass a reference to the store of the app as well as a reference to the globalEventDistributor
    singleSpa.registerApplication(name, () => SystemJS.import(main), hashPrefix(path), customProps);
}