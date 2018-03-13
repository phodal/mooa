export function find(arr, func) {
  for (let i = 0; i < arr.length; i++) {
    if (func(arr[i])) {
      return arr[i]
    }
  }

  return null
}

export function getContainerEl(opts) {
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

export function removeContainerEl(opts) {
  let el = document.querySelector(opts.selector)
  if (el) {
    getContainerEl(opts).remove()
  }
}

export function mooaLog(...args) {
  if (window['mooa'] && window['mooa']['debug']) {
    console.log(args)
  }
}
