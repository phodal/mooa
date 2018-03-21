import { MooaApp } from '../../dist/types/model/IAppOption'
import { hashCode } from './app.helper'

declare const Element: any
declare const document: Document

export function createApplicationContainer(mooaApp: MooaApp) {
  const opts = mooaApp.appConfig
  let el = document.querySelector(opts.selector)
  if (el) {
    return el
  }

  el = document.createElement(opts.selector)

  if (opts.parentElement) {
    let parentEl = document.querySelector(opts.parentElement)
    if (parentEl) {
      parentEl.appendChild(el)
    } else {
      document.body.appendChild(el)
    }
  } else {
    document.body.appendChild(el)
  }

  return el
}

export function removeApplicationContainer(mooaApp: MooaApp) {
  const opts = mooaApp.appConfig
  let el = document.querySelector(opts.selector)
  if (el && el !== null) {
    if (!('remove' in Element.prototype)) {
      Element.prototype.remove = function() {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el)
        }
      }
    } else {
      el.remove()
    }
  }
}

export function createApplicationIframeContainer(mooaApp: MooaApp) {
  const opts = mooaApp.appConfig
  const iframe: any = document.createElement('iframe')
  iframe.frameBorder = ''
  iframe.width = '100%'
  iframe.height = '100%'
  iframe.id = generateIFrameID(mooaApp.appConfig.name)

  const el = document.createElement(opts.selector)

  if (opts.parentElement) {
    let parentEl = document.querySelector(opts.parentElement)
    if (parentEl) {
      parentEl.appendChild(iframe)
    }
  } else {
    document.body.appendChild(iframe)
  }

  let iframeEl: any = document.getElementById(iframe.id)
  iframeEl.contentWindow.document.body.appendChild(el)
  iframeEl.contentWindow.mooa = {
    isSingleSpa: true
  }
}

export function removeApplicationIframeContainer(mooaApp: MooaApp) {
  const iframeId = generateIFrameID(mooaApp.appConfig.name)
  let iframeEl = document.getElementById(iframeId)
  if (iframeEl) {
    if (!('remove' in Element.prototype)) {
      Element.prototype.remove = function() {
        if (iframeEl && iframeEl.parentNode) {
          iframeEl.parentNode.removeChild(iframeEl)
        }
      }
    } else {
      iframeEl.remove()
    }
  }
}

export function generateIFrameID(name: string) {
  return name + '_' + hashCode(name)
}
