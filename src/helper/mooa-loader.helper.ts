import assetsLoaderHelper from './assets.helper'
import { IAppOption } from '../model/IAppOption'
import { hashCode } from './app.helper'
import { generateIFrameID } from './dom.utils'

function loadScriptPromise(src: string, iframeEl: any) {
  return new Promise((resolve, reject) => {
    const script = assetsLoaderHelper.createScriptTag(src)
    script.onload = function() {
      resolve()
    }
    script.onerror = err => {
      reject(err)
    }
    if (iframeEl) {
      if (iframeEl && iframeEl.contentWindow) {
        iframeEl.contentWindow.document.head.appendChild(script)
      }
    } else {
      document.head.appendChild(script)
    }
  })
}

const loadScriptTag = (src: string, iframeEl?: any) => {
  return () => {
    return loadScriptPromise(src, iframeEl)
  }
}

const loadLinkTag = (url: string, iframeEl?: any) => {
  return () => {
    return new Promise((resolve, reject) => {
      const link = assetsLoaderHelper.createLinkTag(url)
      link.onload = function() {
        resolve()
      }
      link.onerror = err => {
        reject(err)
      }

      if (iframeEl) {
        if (iframeEl && iframeEl.contentWindow) {
          iframeEl.contentWindow.document.head.appendChild(link)
        }
      } else {
        document.head.appendChild(link)
      }
    })
  }
}

function loadAllAssets(opts: any) {
  return new Promise((resolve, reject) => {
    const scriptsPromise = opts.scripts.reduce(
      (prev: Promise<undefined>, fileName: string) =>
        prev.then(loadScriptTag(`${opts.baseScriptUrl}/${fileName}`)),
      Promise.resolve(undefined)
    )
    const stylesPromise = opts.styles.reduce(
      (prev: Promise<undefined>, fileName: string) =>
        prev.then(loadLinkTag(`${opts.baseScriptUrl}/${fileName}`)),
      Promise.resolve(undefined)
    )
    Promise.all([scriptsPromise, stylesPromise]).then(resolve, reject)
  })
}

function loadAllAssetsForIframe(opts: any) {
  const iframeId = generateIFrameID(opts.name)
  let iframeEl: any = document.getElementById(iframeId)
  if (!iframeEl) {
    return new Promise((resolve, reject) => {
      reject()
    })
  }

  return new Promise((resolve, reject) => {
    const scriptsPromise = opts.scripts.reduce(
      (prev: Promise<undefined>, fileName: string) =>
        prev.then(loadScriptTag(`${opts.baseScriptUrl}/${fileName}`, iframeEl)),
      Promise.resolve(undefined)
    )

    const zonejsPromise = loadScriptPromise(`/assets/zone.min.js`, iframeEl)

    const stylesPromise = opts.styles.reduce(
      (prev: Promise<undefined>, fileName: string) =>
        prev.then(loadLinkTag(`${opts.baseScriptUrl}/${fileName}`)),
      Promise.resolve(undefined)
    )

    Promise.all([scriptsPromise, zonejsPromise, stylesPromise]).then(
      resolve,
      reject
    )
  })
}

const xmlToAssets = (
  xml: string
): { styles: (string | null)[]; scripts: (string | null)[] } => {
  let dom = document.createElement('html')
  let urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  dom.innerHTML = xml
  const linksEls = dom.querySelectorAll('link[rel="stylesheet"]')
  const scriptsEls = dom.querySelectorAll('script[type="text/javascript"]')
  return {
    styles: Array.from(linksEls)
      .map(el => el.getAttribute('href'))
      .filter(src => {
        if (src) {
          return !urlRegex.test(src)
        }
      }),
    scripts: Array.from(scriptsEls)
      .map(el => el.getAttribute('src'))
      .filter(src => {
        if (src) {
          return !(/zone\.js/.test(src) && urlRegex.test(src))
        }
      })
  }
}

const transformOptsWithAssets = (opts: any): Promise<null> => {
  const url = `${opts.baseScriptUrl}/index.html`
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest()
    req.onreadystatechange = event => {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status >= 200 && req.status < 400) {
          const res = xmlToAssets(req.responseText)
          opts.styles = res.styles
          opts.scripts = res.scripts
          resolve(null)
        } else {
          reject(
            `Try to load ${url}, status : ${req.status} => ${req.statusText}`
          )
        }
      }
    }
    req.open('GET', url, true)
    req.send(null)
  })
}

const loadAllAssetsByUrl = (opts: any) => {
  return new Promise((resolve, reject) => {
    transformOptsWithAssets(opts).then(() => {
      const scriptsPromise = opts.scripts.reduce(
        (prev: Promise<undefined>, fileName: string) =>
          prev.then(loadScriptTag(`${opts.baseScriptUrl}/${fileName}`)),
        Promise.resolve(undefined)
      )
      const stylesPromise = opts.styles.reduce(
        (prev: Promise<undefined>, fileName: string) =>
          prev.then(loadLinkTag(`${opts.baseScriptUrl}/${fileName}`)),
        Promise.resolve(undefined)
      )
      Promise.all([scriptsPromise, stylesPromise]).then(resolve, reject)
    }, reject)
  })
}

function unloadTag(opts: IAppOption, scriptName: string) {
  return () => {
    return new Promise((resolve, reject) => {
      const tag = document.getElementById(
        hashCode(`${opts.baseScriptUrl}/${scriptName}`)
      )
      if (tag) {
        document.head.removeChild(tag)
      }
      resolve()
    })
  }
}

const MooaLoaderHelper = {
  loadAllAssets: loadAllAssets,
  loadAllAssetsByUrl: loadAllAssetsByUrl,
  loadAllAssetsForIframe: loadAllAssetsForIframe,
  unloadTag: unloadTag
}

export default MooaLoaderHelper
