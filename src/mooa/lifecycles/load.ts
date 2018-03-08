import {StatusEnum} from '../constants';

export async function toLoadPromise(app) {
  if (app.status !== StatusEnum.NOT_LOADED) {
    return app;
  }

  app.status = StatusEnum.NOT_BOOTSTRAPPED;
  return app;
}
