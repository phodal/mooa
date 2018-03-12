export function find(arr, func) {
  for (let i = 0; i < arr.length; i++) {
    if (func(arr[i])) {
      return arr[i];
    }
  }

  return null;
}

export function getContainerEl(opts) {
  let el = document.querySelector(opts.selector);
  if (!el) {
    el = document.createElement(opts.selector);
    document.body.appendChild(el);
  }
  return el;
}

export function removeContainerEl(opts) {
  getContainerEl(opts).remove();
}
