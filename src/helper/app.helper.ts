import { StatusEnum } from '../model/constants'

declare const history: History
declare const window: any

export function find(arr: any, func: any) {
  for (let i = 0; i < arr.length; i++) {
    if (func(arr[i])) {
      return arr[i]
    }
  }

  return null
}

export function mooaLog(...args: any[]) {
  if (window['mooa'] && window['mooa']['debug']) {
    console.log(args)
  }
}

// Fixed for IE Custom Event
function MooaCustomEvent(event: any, params: any): any {
  params = params || { bubbles: false, cancelable: false, detail: undefined }
  let evt = document.createEvent('CustomEvent')
  evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
  return evt
}

export function customEvent(eventName: any, eventArgs?: any) {
  if (typeof window.CustomEvent !== 'function') {
    MooaCustomEvent.prototype = window.Event.prototype
    window.CustomEvent = MooaCustomEvent
  }

  window.dispatchEvent(new CustomEvent(eventName, { detail: eventArgs }))
}

export function navigateAppByName(opts: any): void {
  let navigateToApp: any
  window.apps.map((app: any) => {
    app.status = StatusEnum.NOT_LOADED
    if (app.name === opts.appName) {
      app.status = StatusEnum.NOT_LOADED
      navigateToApp = app
      return app
    }
  })

  if (navigateToApp) {
    history.pushState(
      null,
      '',
      navigateToApp.appConfig.prefix + '/' + opts.router
    )
    window.mooa.instance.reRouter()
  }
}

export function hashCode(str: string) {
  let hash = 0
  if (str.length === 0) {
    return hash.toString()
  }
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash = hash & hash
    hash = hash >>> 1
  }

  return hash.toString()
}
