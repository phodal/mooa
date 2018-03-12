import {StatusEnum} from '../constants';
import {getUnloadApps} from '../lifecycles/unload';

function isActive(app) {
  return app.status === StatusEnum.MOUNTED;
}

function isntActive(app) {
  return !isActive(app);
}

function shouldntBeActive(app) {
  try {
    return !app.activeWhen(window.location);
  } catch (err) {
    app.status = StatusEnum.SKIP_BECAUSE_BROKEN;
    throw new Error(err);
  }
}

function notSkipped(item) {
  return item !== StatusEnum.SKIP_BECAUSE_BROKEN &&
    (!item || item.status !== StatusEnum.SKIP_BECAUSE_BROKEN);
}

function isLoaded(app) {
  return app.status !== StatusEnum.NOT_LOADED &&
    app.status !== StatusEnum.LOADING_SOURCE_CODE;
}

function notLoaded(app) {
  return !isLoaded(app);
}

function shouldBeActive(app) {
  try {
    return app.activeWhen(window.location);
  } catch (err) {
    app.status = StatusEnum.SKIP_BECAUSE_BROKEN;
    throw new Error(err);
  }
}

const StatusFilter = {
  getAppsToLoad: (apps) => {
    return apps
      .filter(notSkipped)
      .filter(notLoaded)
      .filter(shouldBeActive);
  },
  getAppsToUnload: () => {
    const appsToUnload = getUnloadApps();
    return Object.keys(appsToUnload)
      .map(appName => appsToUnload[appName].app)
      .filter(isntActive);
  },
  getAppUnloadInfo: (appName) => {
    const appsToUnload = getUnloadApps();
    return appsToUnload[appName];
  },
  getAppsToUnmount: (apps) => {
    return apps
      .filter(notSkipped)
      .filter(isActive)
      .filter(shouldntBeActive);
  },
  getAppsToMount: (apps) => {
    return apps
      .filter(notSkipped)
      .filter(isntActive)
      .filter(isLoaded)
      .filter(shouldBeActive);
  }
};

export default StatusFilter;
