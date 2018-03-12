import {StatusEnum} from '../constants';
import {reasonableTime} from '../helper/timeouts';
import StatusFilter from '../helper/status-filter';
import {addAppToUnload, toUnloadPromise} from './unload';
import {find} from '../helper/app.helper';

declare const window: any;

export function getAppNames() {
  return window.apps.map((app) => app.name);
}

function immediatelyUnloadApp(app, resolve, reject) {
  toUnmountPromise(app)
    .then(toUnloadPromise)
    .then(() => {
      resolve();
      setTimeout(() => {
        // reroute, but the unload promise is done
        this.reRouter();
      });
    })
    .catch(reject);
}

export function unloadApplication(appName, opts = {waitForUnmount: false}) {
  if (typeof appName !== 'string') {
    throw new Error(`unloadApplication requires a string 'appName'`);
  }
  const app = find(window.apps, App => App.name === appName);
  if (!app) {
    throw new Error(`Could not unload application '${appName}' because no such application has been declared`);
  }

  const appUnloadInfo = StatusFilter.getAppUnloadInfo(app.name);
  if (opts && opts.waitForUnmount) {

    if (appUnloadInfo) {
      return appUnloadInfo.promise;
    } else {
      const promise = new Promise((resolve, reject) => {
        addAppToUnload(app, () => promise, resolve, reject);
      });
      return promise;
    }
  } else {
    let resultPromise;

    if (appUnloadInfo) {
      resultPromise = appUnloadInfo.promise;
      immediatelyUnloadApp(app, appUnloadInfo.resolve, appUnloadInfo.reject);
    } else {
      resultPromise = new Promise((resolve, reject) => {
        addAppToUnload(app, () => resultPromise, resolve, reject);
        immediatelyUnloadApp(app, resolve, reject);
      });
    }

    return resultPromise;
  }
}

export function appendFunc(app: MooaApp) {
  app.unloadApplication = unloadApplication;
  app.getAppNames = getAppNames;
  return app;
}

export async function toUnmountPromise(app) {
  if (app.status !== StatusEnum.MOUNTED) {
    return app;
  }

  try {
    await reasonableTime(app.unmount(appendFunc(app)), `Unmounting application ${app.name}'`, app.timeouts.unmount);
    app.status = StatusEnum.NOT_MOUNTED;
  } catch (err) {
    console.error(err);
    app.status = StatusEnum.SKIP_BECAUSE_BROKEN;
    throw new Error(err);
  }

  return app;
}
