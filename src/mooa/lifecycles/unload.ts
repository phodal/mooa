import {StatusEnum} from '../constants';

export async function toUnloadPromise(app) {
  if (app.status !== StatusEnum.NOT_LOADED) {
    return app;
  }

  return app;
}
