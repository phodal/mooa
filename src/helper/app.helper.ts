import { StatusEnum } from '../constants'

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

export function getContainerEl(opts: any) {
  let el = document.querySelector(opts.selector)
  if (!el) {
    el = document.createElement(opts.selector)

    if (opts.parentElement) {
      let parentEl = document.querySelector(opts.parentElement)
      while (parentEl.hasChildNodes()) {
        parentEl.removeChild(parentEl.lastChild)
      }
      parentEl.appendChild(el)
    } else {
      document.body.appendChild(el)
    }
  }
  return el
}

export function removeContainerEl(opts: any) {
  let el = document.querySelector(opts.selector)
  if (el) {
    getContainerEl(opts).remove()
  }
}

export function mooaLog(...args: any[]) {
  if (window['mooa'] && window['mooa']['debug']) {
    console.log(args)
  }
}

// Fixed for IE Custom Event
function CustomEvent(event, params) {
  params = params || { bubbles: false, cancelable: false, detail: undefined }
  var evt = document.createEvent('CustomEvent')
  evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
  return evt
}

export function customEvent(eventName: any, eventArgs?: any) {
  if (typeof window.CustomEvent !== 'function') {
    CustomEvent.prototype = window.Event.prototype

    window.CustomEvent = CustomEvent
  }
  window.dispatchEvent(new CustomEvent(eventName, eventArgs))
}

export function navigateAppByName(opts: any) {
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
