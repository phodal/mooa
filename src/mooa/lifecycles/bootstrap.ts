import {ensureValidAppTimeouts, reasonableTime} from '../helper/timeouts';
import {StatusEnum} from '../constants';
import loader from '../loader/mooa.loader';

export async function toBootstrapPromise(app) {
  if (app.status !== StatusEnum.NOT_BOOTSTRAPPED) {
    return app;
  }

  app.status = StatusEnum.BOOTSTRAPPING;
  createApp(app);

  try {
    await reasonableTime(app.bootstrap(), `Bootstrapping app '${app.name}'`, app.timeouts.bootstrap);
    app.status = StatusEnum.NOT_MOUNTED;
  } catch (err) {
    console.error(err);
    app.status = StatusEnum.SKIP_BECAUSE_BROKEN;
    throw new Error(err);
  }

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
