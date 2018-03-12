import {StatusEnum} from './constants';
import {toLoadPromise} from './lifecycles/load';
import {toBootstrapPromise} from './lifecycles/bootstrap';
import {toMountPromise} from './lifecycles/mount';
import StatusFilter from './helper/status-filter';
import {toUnloadPromise} from './lifecycles/unload';
import {toUnmountPromise} from './lifecycles/unmount';
import './model/IAppOption';

declare const window: any;

const apps = [];

class Mooa {
  constructor(options: MooaOptions) {

  }

  started = false;

  registerApplication(appName: string, appConfig?, activeWhen?: {}, customProps: object = {}) {
    if (!activeWhen) {
      throw new Error(`Lost Loader`);
    }

    if (typeof activeWhen !== 'function') {
      throw new Error(`The activeWhen argument must be a function`);
    }

    const appOpt = {
      name: appName,
      appConfig,
      activeWhen,
      status: StatusEnum.NOT_LOADED,
      customProps: customProps
    };

    apps.push(appOpt);
    window.apps = apps;
  }

  start() {
    this.started = true;
    return this.reRouter();
  }

  reRouter(eventArguments?) {
    const customEvent = this.customEvent;
    if (eventArguments) {

    }

    async function performAppChanges() {
      customEvent('before-routing-event');
      const unloadPromises = StatusFilter.getAppsToUnload().map(toUnloadPromise);

      const unmountUnloadPromises = StatusFilter.getAppsToUnmount(apps)
        .map(toUnmountPromise)
        .map(unmountPromise => unmountPromise.then(toUnloadPromise));

      const allUnmountPromises = unmountUnloadPromises.concat(unloadPromises);

      const unmountAllPromise = Promise.all(allUnmountPromises);

      const appsToLoad = StatusFilter.getAppsToLoad(apps);
      const loadThenMountPromises = appsToLoad.map(app => {
        return toLoadPromise(app)
          .then(toBootstrapPromise)
          .then(async function (toMountApp) {
            await unmountAllPromise;
            return toMountPromise(toMountApp);
          });
      });

      const mountPromises = StatusFilter.getAppsToMount(apps)
        .filter(appToMount => appsToLoad.indexOf(appToMount) < 0)
        .map(async function (appToMount) {
          await toBootstrapPromise(appToMount);
          await unmountAllPromise;
          return toMountPromise(appToMount);
        });

      try {
        await unmountAllPromise;
      } catch (err) {
        throw err;
      }

      await Promise.all(loadThenMountPromises.concat(mountPromises));
    }

    return performAppChanges();
  }

  customEvent(eventName, eventArgs?) {
    window.dispatchEvent(new CustomEvent(eventName, eventArgs));
  }
}

export default Mooa;
