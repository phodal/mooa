import { customEvent } from './helper/app.helper'

declare const window: any
window.mooa = window.mooa || {}

export class MooaPlatform {
  name: string = ''
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

  appBase(): string {
    if (this.isSingleSpaApp()) {
      const pathNames = window.location.pathname.split('/')
      if (pathNames.length < 2) {
        return '/'
      }
      const parentRouter = pathNames[1]
      const appName = pathNames[2]
      const locationPath = '/' + parentRouter + '/' + appName
      window.mooa.basePath = locationPath
      return locationPath
    } else {
      return '/'
    }
  }

  navigateTo(opts: any) {
    customEvent('mooa.routing.navigate', opts)
  }

  handleRouterUpdate(router: any, appName: string) {
    window.addEventListener('mooa.routing.change', (event: CustomEvent) => {
      if (event.detail.app.name === appName) {
        let urlPrefix = 'app'
        if (urlPrefix) {
          urlPrefix = `/${window.mooa.option.urlPrefix}/`
        }
        router.navigate([event.detail.url.replace(urlPrefix + appName, '')])
      }
    })
  }

  private isSingleSpaApp(): boolean {
    return window.mooa.isSingleSpa
  }
}

export default MooaPlatform
