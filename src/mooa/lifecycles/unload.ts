import {StatusEnum} from '../constants';
import {reasonableTime} from '../helper/timeouts';

const appsToUnload = {};

export async function toUnloadPromise(app) {
  const unloadInfo = appsToUnload[app.name];

  if (app.status === StatusEnum.NOT_LOADED) {
    finishUnloadingApp(app, unloadInfo);
    return app;
  }

  if (app.status === StatusEnum.UNLOADING) {
    await unloadInfo.promise;
    return app;
  }

  if (app.status !== StatusEnum.NOT_MOUNTED) {
    return app;
  }

  if (!unloadInfo) {
    return app;
  }

  try {
    app.status = StatusEnum.UNLOADING;
    await reasonableTime(app.unload(), `Unloading application '${app.name}'`, app.timeouts.unload);
  } catch (err) {
    console.error('Unloading Error', err);
    return app;
  }

  return app;
}

function finishUnloadingApp(app, unloadInfo) {
  delete appsToUnload[app.name];

  delete app.bootstrap;
  delete app.mount;
  delete app.unmount;
  delete app.unload;

  app.status = StatusEnum.NOT_LOADED;

  unloadInfo.resolve();
}

export function getUnloadApps() {
  return appsToUnload;
}

export function addAppToUnload(app, promiseGetter, resolve, reject) {
  appsToUnload[app.name] = {app, resolve, reject};
  Object.defineProperty(appsToUnload[app.name], 'promise', {get: promiseGetter});
}
