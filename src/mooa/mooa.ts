import {StatusEnum} from './constants';
import {toLoadPromise} from './lifecycles/load';
import {toBootstrapPromise} from './lifecycles/bootstrap';
import {toMountPromise} from './lifecycles/mount';
import loader from './loader';
import {ensureValidAppTimeouts} from './helper/timeouts';
import StatusFilter from './helper/status-filter';

const apps = [];

class Mooa {
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

    apps.push(this.createApp(appOpt));
  }

  start() {
    this.started = true;
    return this.reRouter();
  }

  private reRouter() {
    async function performAppChanges() {
      const appsToLoad = StatusFilter.getAppsToLoad(apps);
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

    return performAppChanges();
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

  getApps() {
    return apps;
  }
}

const mooa = new Mooa();
export default mooa;
