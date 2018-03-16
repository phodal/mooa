import { StatusEnum } from '../constants'
import { getUnloadApps } from '../lifecycles/unload'

function isActive(app: any) {
  return app.status === StatusEnum.MOUNTED
}

function InActive(app: any) {
  return !isActive(app)
}

function shouldNotBeActive(app: any) {
  try {
    return !app.activeWhen(window.location)
  } catch (err) {
    app.status = StatusEnum.SKIP_BECAUSE_BROKEN
    throw new Error(err)
  }
}

function notSkipped(item: any) {
  return (
    item !== StatusEnum.SKIP_BECAUSE_BROKEN &&
    (!item || item.status !== StatusEnum.SKIP_BECAUSE_BROKEN)
  )
}

function isLoaded(app: any) {
  return (
    app.status !== StatusEnum.NOT_LOADED &&
    app.status !== StatusEnum.LOADING_SOURCE_CODE
  )
}

function notLoaded(app: any) {
  return !isLoaded(app)
}

function shouldBeActive(app: any) {
  try {
    return app.activeWhen(window.location)
  } catch (err) {
    app.status = StatusEnum.SKIP_BECAUSE_BROKEN
    throw new Error(err)
  }
}

const StatusHelper = {
  getAppsToLoad: (apps: any) => {
    return apps
      .filter(notSkipped)
      .filter(notLoaded)
      .filter(shouldBeActive)
  },
  getAppsToUnload: () => {
    const appsToUnload = getUnloadApps()
    return Object.keys(appsToUnload)
      .map(appName => appsToUnload[appName].app)
      .filter(InActive)
  },
  getAppUnloadInfo: (appName: any) => {
    const appsToUnload = getUnloadApps()
    return appsToUnload[appName]
  },
  getAppsToUnmount: (apps: any) => {
    return apps
      .filter(notSkipped)
      .filter(isActive)
      .filter(shouldNotBeActive)
  },
  getAppsToMount: (apps: any) => {
    return apps
      .filter(notSkipped)
      .filter(InActive)
      .filter(isLoaded)
      .filter(shouldBeActive)
  },
  getActiveApps: (apps: any) => {
    return apps.filter(notSkipped).filter(isActive)
  }
}

export default StatusHelper
