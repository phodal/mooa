import {StatusEnum} from '../constants';
import loader from '../loader/mooa.loader';
import {ensureValidAppTimeouts} from '../helper/timeouts';
import {mooaLog} from '../helper/app.helper';

export async function toLoadPromise(app) {
  if (app.status !== StatusEnum.NOT_LOADED) {
    return app;
  }

  createApp(app);

  mooaLog('Loading application', app.name, app.status);
  app.status = StatusEnum.NOT_BOOTSTRAPPED;
  return app;
}

function createApp(appOpt): MooaApp {
  const _loader = loader(appOpt);
  appOpt.bootstrap = _loader.bootstrap;
  appOpt.load = _loader.load;
  appOpt.mount = _loader.mount;
  appOpt.unload = _loader.unload;
  appOpt.unmount = _loader.unmount;
  appOpt.timeouts = ensureValidAppTimeouts(appOpt.timeouts);
  return appOpt;
}

