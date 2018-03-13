import {reasonableTime} from '../helper/timeouts';
import {StatusEnum} from '../constants';
import {mooaLog} from '../helper/app.helper';

export async function toBootstrapPromise(app) {
  if (app.status !== StatusEnum.NOT_BOOTSTRAPPED) {
    return app;
  }

  app.status = StatusEnum.BOOTSTRAPPING;

  try {
    mooaLog('Bootstrapping application', app.name, app.status);
    await reasonableTime(app.bootstrap(), `Bootstrapping app '${app.name}'`, app.timeouts.bootstrap);
    app.status = StatusEnum.NOT_MOUNTED;
  } catch (err) {
    console.error(err);
    app.status = StatusEnum.SKIP_BECAUSE_BROKEN;
    throw new Error(err);
  }

  return app;
}

