/**
 * Robin Coma Delperier
 * Licensed under the Apache-2.0 License
 * https://github.com/PlaceMe-SAS/single-spa-angular-cli/blob/master/LICENSE
 *
 * modified by Phodal HUANG
 *
 */

declare const history: History

export class MooaRouter {
  routes: string[]
  lastPathName: string
  defaultRoute: string = ''

  constructor() {
    this.routes = []
    this.lastPathName = '/'
  }

  matchRoute(
    prefix: string,
    isDefaultPage?: boolean
  ): (location: Location) => boolean {
    this.routes.push(prefix)
    if (isDefaultPage) {
      this.defaultRoute = prefix
    }
    return (location: Location): boolean => {
      if (prefix === '/') {
        return location.pathname === '/'
      }
      const route = this.routes.find(r => this.pathMatch(location, r))
      if (route) {
        // let isSamePath = this.lastPathName === location.pathname && location.pathname !== prefix
        // let isSameApp = this.sameApp(this.lastPathName, location.pathname, route);
        // if (!isSamePath && isSameApp) {
        //   this.lastPathName = location.pathname
        //   return true;
        // }
        // this.lastPathName = location.pathname
        return this.pathMatch(location, prefix)
      } else {
        this.lastPathName = location.pathname
        this.navigate(this.defaultRoute)
        return false
      }
    }
  }

  public navigate(path: string): void {
    history.pushState(null, '', path)
  }

  private pathMatch(location: Location, path: string): boolean {
    const loc = location.pathname + location.search
    return loc.indexOf(path) !== -1
  }

  private sameApp(
    newLocation: string,
    oldLocation: string,
    route: string
  ): boolean {
    return (
      newLocation.indexOf(route) !== -1 && oldLocation.indexOf(route) !== -1
    )
  }
}

export default MooaRouter
