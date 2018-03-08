import {reasonableTime} from '../helper/timeouts';
import {StatusEnum} from '../constants';

export async function toBootstrapPromise(app) {
  if (app.status !== StatusEnum.NOT_BOOTSTRAPPED) {
    return app;
  }

  app.status = StatusEnum.BOOTSTRAPPING;

  try {
    await reasonableTime(app.bootstrap(), `Bootstrapping app '${app.name}'`, app.timeouts.bootstrap);
    app.status = StatusEnum.NOT_MOUNTED;
  } catch (err) {
    app.status = StatusEnum.SKIP_BECAUSE_BROKEN;
    throw new Error(err);
  }

  console.log(app.status);
  return app;
}
