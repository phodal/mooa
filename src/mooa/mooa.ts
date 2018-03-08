import {StatusEnum} from './constants';

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

    const appConfig = {
      name: appName,
      appConfig,
      activeWhen,
      status: StatusEnum.NOT_LOADED,
      customProps: customProps
    };

    this.apps.push(this.createApp(appConfig));

    this.reRouter();
  }

  start() {
    this.started = true;
    return this.reRouter();
  }

  private reRouter() {
    async function loadApps() {

    }

    async function performAppChanges() {
      // unload -> unmount
      // load -> mount
      const appsToLoad = this.apps;
      const loadThenMountPromises = appsToLoad.map(app => {
        // return toLoadPromise(app)
        //   .then(toBootstrapPromise)
        //   .then(async function(app) {
        //     await unmountAllPromise;
        //     return toMountPromise(app);
        //   });
      });

    }

    if (this.started) {
      return performAppChanges();
    } else {
      return loadApps();
    }
  }

  private createApp(appConfig: object) {
    const app = appConfig.map(x => Object.assign({}, x));
    return app;
  }
}

const mooa = new Mooa();
export default mooa;
