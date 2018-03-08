import {StatusEnum} from './constants';
import {toLoadPromise} from './lifecycles/load';
import {toBootstrapPromise} from './lifecycles/bootstrap';
import {toMountPromise} from './lifecycles/mount';
import loader from './loader';
import {ensureValidAppTimeouts} from './helper/timeouts';

class Mooa {
  started = false;
  apps = [];

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

    this.apps.push(this.createApp(appOpt));

    this.reRouter();
  }

  start() {
    this.started = true;
    return this.reRouter();
  }

  private reRouter() {
    async function loadApps() {

    }

    async function performAppChanges(apps) {
      // unload -> unmount
      // load -> mount
      const appsToLoad = apps;
      const loadThenMountPromises = appsToLoad.map(app => {
        return toLoadPromise(app)
          .then(toBootstrapPromise)
          .then(async function (toMountApp) {
            // await unmountAllPromise;
            return toMountPromise(toMountApp);
          });
      });

      await loadThenMountPromises;
    }

    if (this.started) {
      return performAppChanges(this.apps);
    } else {
      return loadApps();
    }
  }

  private createApp(appOpt) {
    const _loader = loader(appOpt);
    appOpt.bootstrap = _loader.bootstrap;
    appOpt.load = _loader.load;
    appOpt.mount = _loader.mount;
    appOpt.unload = _loader.unload;
    appOpt.unmount = _loader.unmount;
    appOpt.timeouts = ensureValidAppTimeouts(appOpt.timeouts);
    return appOpt;
  }
}

const mooa = new Mooa();
export default mooa;
