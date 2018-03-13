interface IAppOption {
  name: string;
  selector: string;
  baseScriptUrl: string;
  styles: string[];
  scripts: string[];
  prefix: string;
  parentElement: string;
}

interface MooaApp extends IAppOption {
  appConfig: IAppOption;
  status: string;
  bootstrap: () => {};
  load: () => {};
  mount: () => {};
  unload: () => {};
  unmount: () => {};
  timeouts: () => {};
  unloadApplication: (any) => {};
  getAppNames: () => {};
}
