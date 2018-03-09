import {StatusEnum} from '../constants';

export function notSkipped(item) {
  return item !== StatusEnum.SKIP_BECAUSE_BROKEN &&
    (!item || item.status !== StatusEnum.SKIP_BECAUSE_BROKEN);
}

export function isLoaded(app) {
  return app.status !== StatusEnum.NOT_LOADED &&
    app.status !== StatusEnum.LOADING_SOURCE_CODE;
}

export function notLoaded(app) {
  return !isLoaded(app);
}

export function shouldBeActive(app) {
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
  }
};

export default StatusFilter;
