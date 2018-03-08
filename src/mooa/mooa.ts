import {Loader} from './loader';
import {NOT_LOADED} from './constants';

const apps = [];

const mooa = {
  registerApplication: function (appName: string, arg1?, arg2?, customProps: object = {}) {
    let loadImpl, activeWhen;
    if (!arg2) {
      if (!Loader) {
        throw new Error(`You cannot declare a single-spa application without either providing a way to load the application or a Loader.
         See https://github.com/CanopyTax/single-spa/blob/master/docs/single-spa-api.md#declareApplication`);
      }
      loadImpl = () => Loader.import(appName);
      activeWhen = arg1;
    } else {
      if (typeof arg1 !== 'function') {
        loadImpl = () => Promise.resolve(arg1);
      } else {
        loadImpl = arg1;
      }
      activeWhen = arg2;
    }
    if (typeof activeWhen !== 'function') {
      throw new Error(`The activeWhen argument must be a function`);
    }

    apps.push({
      name: appName,
      loadImpl,
      activeWhen,
      status: NOT_LOADED,
      customProps: customProps
    });
  },
  start: function () {

  }
};

export default mooa;
