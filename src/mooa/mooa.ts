import {StatusEnum} from './constants';

class Mooa {
  apps = [];

  registerApplication(appName: string, appConfig?, activeWhen?: {}, customProps: object = {}) {
    if (!activeWhen) {
      throw new Error(`Lost Loader`);
    }

    if (typeof activeWhen !== 'function') {
      throw new Error(`The activeWhen argument must be a function`);
    }

    this.apps.push({
      name: appName,
      appConfig,
      activeWhen,
      status: StatusEnum.NOT_LOADED,
      customProps: customProps
    });
  }

  start() {
    console.log(this.apps);
  }
}

const mooa = new Mooa();
export default mooa;
