/**
 * Robin Coma Delperier
 * Licensed under the Apache-2.0 License
 * https://github.com/PlaceMe-SAS/single-spa-angular-cli/blob/master/LICENSE
 *
 * modified by Phodal HUANG
 *
 */

import LoaderHelper from '../helper/mooa-loader.helper'
import { createAppNode, removeAppNode } from '../helper/app.helper'
import { MooaApp } from '../model/IAppOption'

declare const window: any

function bootstrap(opts: MooaApp) {
  if (!window['mooa']) {
    window.mooa = {}
  }
  window.mooa.isSingleSpa = true
  window.mooa.name = opts.name

  return new Promise((resolve, reject) => {
    LoaderHelper.loadAllAssets(opts.appConfig).then(resolve, reject)
  })
}

function load(app: MooaApp) {
  return Promise.resolve()
}

function mount(app: MooaApp, props?: any) {
  return new Promise((resolve, reject) => {
    createAppNode(app.appConfig)
    if (window.mooa[app.name]) {
      window.mooa[app.name].mount(props)
      resolve()
    } else {
      console.error(`Cannot mount ${app.name} because that is not bootstraped`)
      reject()
    }
  })
}

function unmount(app: MooaApp, props: any) {
  const { unloadApplication, getAppNames } = props
  return new Promise((resolve, reject) => {
    if (window.mooa[app.name]) {
      window.mooa[app.name].unmount()
      removeAppNode(app.appConfig)
      if (getAppNames().indexOf(app.name) !== -1) {
        unloadApplication(app.name, { waitForUnmount: true })
        resolve()
      } else {
        reject(
          `Cannot unmount ${app.name} because that ${
            app.name
          } is not part of the decalred applications : ${getAppNames()}`
        )
      }
    } else {
      reject(`Cannot unmount ${app.name} because that is not bootstraped`)
    }
  })
}

function unload(app: MooaApp) {
  return new Promise((resolve, reject) => {
    app.appConfig.scripts
      .concat(app.appConfig.styles)
      .reduce((prev: Promise<any>, scriptName: string) => {
        return prev.then(LoaderHelper.unloadTag(app.appConfig, scriptName))
      }, Promise.resolve({}))
    resolve()
  })
}

export default function mooaLoader(opts: any) {
  return {
    bootstrap: bootstrap.bind(null, opts),
    load: load.bind(null, opts),
    mount: mount.bind(null, opts),
    unload: unload.bind(null, opts),
    unmount: unmount.bind(null, opts)
  }
}
