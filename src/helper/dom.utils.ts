import { IAppOption } from '../model/IAppOption'

declare const Element: any
declare const document: Document

export function createApplicationContainer(opts: IAppOption) {
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

export function removeApplicationContainer(opts: IAppOption) {
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
