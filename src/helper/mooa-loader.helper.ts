import assetsLoaderHelper from './assets-loader.helper'
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
  loadAllAssetsForIframe: loadAllAssetsForIframe,
  unloadTag: unloadTag
}

export default MooaLoaderHelper
