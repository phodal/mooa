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

export function mooaLog(...args: any) {
  if (window['mooa'] && window['mooa']['debug']) {
    console.log(args)
  }
}
