import { StatusEnum } from './constants'
import { toLoadPromise } from './lifecycles/load'
import { toBootstrapPromise } from './lifecycles/bootstrap'
import { toMountPromise } from './lifecycles/mount'
import StatusHelper from './helper/status.helper'
import { toUnloadPromise } from './lifecycles/unload'
import { toUnmountPromise } from './lifecycles/unmount'
import { MooaOption } from './model/MooaOption'
import MooaRouter from './router'
import { MooaPlatform } from './platform'
import { customEvent, navigateAppByName } from './helper/app.helper'

declare const window: any

const apps: any[] = []
window.mooa = window.mooa || {}

class Mooa {
  started = false
  private option: MooaOption

  constructor(option: MooaOption) {
    if (window.mooa) {
      window.mooa.debug = option.debug
      window.mooa.instance = this
    }

    if (localStorage.getItem('mooa.debug') === 'true') {
      window.mooa.debug = true
    }
    this.option = option
  }

  registerApplication(
    appName: string,
    appConfig?: any,
    activeWhen?: {},
    customProps: object = {}
  ) {
    if (!activeWhen) {
      throw new Error(`Lost Loader`)
    }

    if (typeof activeWhen !== 'function') {
      throw new Error(`The activeWhen argument must be a function`)
    }

    if (this.option.parentElement) {
      appConfig.parentElement = this.option.parentElement
    }
    const appOpt = {
      name: appName,
      appConfig,
      activeWhen,
      status: StatusEnum.NOT_LOADED,
      customProps: customProps
    }

    apps.push(appOpt)
    window.apps = apps
  }

  start() {
    this.started = true
    window.addEventListener('mooa.routing.navigate', function(
      event: CustomEvent
    ) {
      const opts = event.detail
      navigateAppByName(opts)
    })
    return this.reRouter()
  }

  reRouter(eventArguments?: any) {
    if (eventArguments) {
      // TODO: log event
    }

    async function performAppChanges() {
      customEvent('mooa.routing.before')
      const unloadPromises = StatusHelper.getAppsToUnload().map(toUnloadPromise)

      const unmountUnloadPromises = StatusHelper.getAppsToUnmount(apps)
        .map(toUnmountPromise)
        .map((unmountPromise: any) => unmountPromise.then(toUnloadPromise))

      const allUnmountPromises = unmountUnloadPromises.concat(unloadPromises)

      const unmountAllPromise = Promise.all(allUnmountPromises)

      const appsToLoad = StatusHelper.getAppsToLoad(apps)
      const loadThenMountPromises = appsToLoad.map((app: any) => {
        return toLoadPromise(app)
          .then(toBootstrapPromise)
          .then(async function(toMountApp) {
            await unmountAllPromise
            return toMountPromise(toMountApp)
          })
      })

      const mountPromises = StatusHelper.getAppsToMount(apps)
        .filter((appToMount: any) => appsToLoad.indexOf(appToMount) < 0)
        .map(async function(appToMount: any) {
          await toBootstrapPromise(appToMount)
          await unmountAllPromise
          return toMountPromise(appToMount)
        })

      try {
        await unmountAllPromise
      } catch (err) {
        throw err
      }

      await Promise.all(loadThenMountPromises.concat(mountPromises))
    }

    return performAppChanges()
  }
}

export default Mooa

export const mooaRouter = new MooaRouter()
export const mooaPlatform = new MooaPlatform()
