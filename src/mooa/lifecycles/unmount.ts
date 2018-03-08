import {StatusEnum} from '../constants';

export async function toUnmountPromise(app) {
  if (app.status !== StatusEnum.MOUNTED) {
    return app;
  }

  return app;
}
