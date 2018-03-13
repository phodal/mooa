/**
 * Robin Coma Delperier
 * Licensed under the Apache-2.0 License
 * https://github.com/PlaceMe-SAS/single-spa-angular-cli/blob/master/LICENSE
 *
 * modified by Phodal HUANG
 *
 */

declare const window: any
window.mooa = window.mooa || {}

export class MooaPlatform {
  name: string
  router: any

  mount(name: string, router?: any) {
    this.name = name
    this.router = router
    return new Promise((resolve, reject) => {
      if (this.isSingleSpaApp()) {
        window.mooa[this.name] = window.mooa[this.name] || {}
        window.mooa[this.name].mount = (props: any) => {
          resolve({ props, attachUnmount: this.unmount.bind(this) })
        }
      } else {
        resolve({ props: {}, attachUnmount: this.unmount.bind(this) })
      }
    })
  }

  unmount(module: any) {
    if (this.isSingleSpaApp()) {
      window.mooa[this.name].unmount = () => {
        if (module) {
          module.destroy()
          if (this.router) {
            module.injector.get(this.router).dispose()
          }
        }
      }
    }
  }

  private isSingleSpaApp(): boolean {
    return window.mooa.isSingleSpa
  }

  get appBase() {
    const pathNames = window.location.pathname.split('/')
    const parentRouter = pathNames[1]
    const appName = pathNames[2]
    const locationPath = '/' + parentRouter + '/' + appName
    window.mooa.basePath = locationPath
    return locationPath
  }
}

const mooaPlatform = new MooaPlatform()
export default mooaPlatform
