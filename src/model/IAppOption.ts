export interface IAppOption {
  name: string
  selector: string
  baseScriptUrl: string
  styles: string[]
  scripts: string[]
  prefix: string
  parentElement: string
}

export interface MooaApp extends IAppOption {
  appConfig: IAppOption
  sourceType?: string
  mode: string
  status: string
  bootstrap: any
  load: any
  mount: any
  unload: any
  unmount: any
  timeouts: any
  unloadApplication: any
  getAppNames: any
}
