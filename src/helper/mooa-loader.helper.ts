import assetsLoaderHelper from './assets-loader.helper'
import { IAppOption } from '../model/IAppOption'
import { hashCode } from './app.helper'
import { generateIFrameID } from './dom.utils'

/**
 * Robin Coma Delperier
 * Licensed under the Apache-2.0 License
 * https://github.com/PlaceMe-SAS/single-spa-angular-cli/blob/master/LICENSE
 *
 * modified by Phodal HUANG
 *
 */

const loadScriptTag = (src: string) => {
  return () => {
    return new Promise((resolve, reject) => {
      const script = assetsLoaderHelper.createScriptTag(src)
      script.onload = function() {
        resolve()
      }
      script.onerror = err => {
        reject(err)
      }
      document.head.appendChild(script)
    })
  }
}

const loadLinkTag = (url: string) => {
  return () => {
    return new Promise((resolve, reject) => {
      const link = assetsLoaderHelper.createLinkTag(url)
      link.onload = function() {
        resolve()
      }
      link.onerror = err => {
        reject(err)
      }
      document.head.appendChild(link)
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
    // opts.scripts.push('zone.min.js');
    const scriptsPromise = opts.scripts.reduce(
      (prev: Promise<undefined>, fileName: string) =>
        prev.then(
          ((src: string) => {
            return () => {
              return new Promise((resolve, reject) => {
                const script = assetsLoaderHelper.createScriptTag(src)
                script.onload = function() {
                  resolve()
                }
                script.onerror = err => {
                  reject(err)
                }
                if (iframeEl && iframeEl.contentWindow) {
                  iframeEl.contentWindow.document.head.appendChild(script)
                }
              })
            }
          })(`${opts.baseScriptUrl}/${fileName}`)
        ),
      Promise.resolve(undefined)
    )
    const stylesPromise = opts.styles.reduce(
      (prev: Promise<undefined>, fileName: string) =>
        prev.then(
          ((url: string) => {
            return () => {
              return new Promise((resolve, reject) => {
                const link = assetsLoaderHelper.createLinkTag(url)
                link.onload = function() {
                  resolve()
                }
                link.onerror = err => {
                  reject(err)
                }
                if (iframeEl && iframeEl.contentWindow) {
                  iframeEl.contentWindow.document.head.appendChild(link)
                }
              })
            }
          })(`${opts.baseScriptUrl}/${fileName}`)
        ),
      Promise.resolve(undefined)
    )
    Promise.all([scriptsPromise, stylesPromise]).then(resolve, reject)
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
