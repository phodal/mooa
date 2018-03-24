import { MOOA_EVENT, StatusEnum } from './model/constants'
import { toLoadPromise } from './lifecycles/load'
import { toBootstrapPromise } from './lifecycles/bootstrap'
import { toMountPromise } from './lifecycles/mount'
import StatusHelper from './helper/status.helper'
import { toUnloadPromise } from './lifecycles/unload'
import { toUnmountPromise } from './lifecycles/unmount'
import { MooaOption } from './model/MooaOption'
import MooaRouter from './router'
import { MooaPlatform } from './platform/platform'
import { customEvent, navigateAppByName } from './helper/app.helper'
import { generateIFrameID } from './helper/dom.utils'

declare const window: any

const apps: any[] = []
window.mooa = window.mooa || {}

class Mooa {
  started = false
  private option: MooaOption

  constructor(option: MooaOption) {
    window.mooa.instance = this

    if (option) {
      window.mooa.option = option
      window.mooa.debug = option.debug
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

    if (this.option.urlPrefix) {
      appConfig.prefix = this.option.urlPrefix + '/' + appConfig.prefix
    }

    const appOpt = {
      name: appName,
      appConfig,
      activeWhen,
      mode: '',
      switchMode: '',
      status: StatusEnum.NOT_LOADED,
      customProps: customProps
    }

    if (this.option.mode) {
      appOpt.mode = this.option.mode
    }

    if (appConfig && appConfig.mode) {
      appOpt.mode = appConfig.mode
    }

    if (this.option.switchMode) {
      appOpt.switchMode = this.option.switchMode
    }

    apps.push(appOpt)
    window.apps = apps
  }

  registerApplicationByLink(
    appName: string,
    link?: string,
    activeWhen?: {},
    customProps: object = {}
  ) {
    if (!activeWhen) {
      throw new Error(`Lost Loader`)
    }

    if (typeof activeWhen !== 'function') {
      throw new Error(`The activeWhen argument must be a function`)
    }

    let appConfig = {
      name: appName,
      scripts: [],
      selector: `app-${appName}`,
      baseScriptUrl: link,
      styles: [],
      parentElement: '',
      prefix: ''
    }

    if (this.option.parentElement) {
      appConfig.parentElement = this.option.parentElement
    }

    if (this.option.urlPrefix) {
      appConfig.prefix = this.option.urlPrefix + '/' + appConfig.name
    }

    const appOpt = {
      name: appName,
      appConfig: appConfig,
      activeWhen,
      sourceType: 'link',
      mode: '',
      switchMode: '',
      status: StatusEnum.NOT_LOADED,
      customProps: customProps
    }

    if (this.option.mode) {
      appOpt.mode = this.option.mode
    }

    if (this.option.switchMode) {
      appOpt.switchMode = this.option.switchMode
    }

    apps.push(appOpt)
    window.apps = apps
  }

  start() {
    this.started = true
    window.addEventListener(MOOA_EVENT.ROUTING_NAVIGATE, function(
      event: CustomEvent
    ) {
      if (event.detail) {
        navigateAppByName(event.detail)
      }
    })
    return this.reRouter()
  }

  reRouter(eventArguments?: any) {
    const that = this
    async function performAppChanges() {
      customEvent(MOOA_EVENT.ROUTING_BEFORE)
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
      if (eventArguments) {
        let activeApp = StatusHelper.getActiveApps(apps)[0]
        if (activeApp && activeApp['appConfig']) {
          that.createRoutingChangeEvent(eventArguments, activeApp)
        }
      }
    }

    return performAppChanges()
  }

  createRoutingChangeEvent(eventArguments: any, activeApp: any) {
    let eventArgs = {
      url: eventArguments.url,
      app: activeApp['appConfig']
    }

    if (activeApp.mode === 'iframe') {
      const iframeId = generateIFrameID(activeApp.name)
      let iframeEl: any = document.getElementById(iframeId)
      if (iframeEl && iframeEl.contentWindow) {
        iframeEl.contentWindow.mooa.option = window.mooa.option
        iframeEl.contentWindow.dispatchEvent(
          new CustomEvent(MOOA_EVENT.ROUTING_CHANGE, { detail: eventArgs })
        )
      }
    } else {
      customEvent(MOOA_EVENT.ROUTING_CHANGE, eventArgs)
    }
  }
}

export default Mooa

export const mooaRouter = new MooaRouter()
export const mooaPlatform = new MooaPlatform()
