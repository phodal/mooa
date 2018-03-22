import { StatusEnum } from '../model/constants'
import loader from '../loader/mooa.loader'
import { ensureValidAppTimeouts } from '../helper/timeouts'
import { customEvent, mooaLog } from '../helper/app.helper'
import { MooaApp } from '../model/IAppOption'

export async function toLoadPromise(app: any) {
  if (app.status !== StatusEnum.NOT_LOADED) {
    return app
  }

  createApp(app)

  customEvent('mooa.loading', { app: app })
  mooaLog('Loading application', app.name, app.status)
  app.status = StatusEnum.NOT_BOOTSTRAPPED
  app.mode = 'iframe'
  return app
}

function createApp(appOpt: any): MooaApp {
  const _loader = loader(appOpt)
  appOpt.bootstrap = _loader.bootstrap
  appOpt.load = _loader.load
  appOpt.mount = _loader.mount
  appOpt.unload = _loader.unload
  appOpt.unmount = _loader.unmount
  appOpt.timeouts = ensureValidAppTimeouts(appOpt.timeouts)
  return appOpt
}
