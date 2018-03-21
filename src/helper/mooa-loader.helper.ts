import assetsLoaderHelper from './assets-loader.helper'
import { IAppOption } from '../model/IAppOption'
import { hashCode } from './app.helper'

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
  unloadTag: unloadTag
}

export default MooaLoaderHelper
