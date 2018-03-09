interface IAppOption {
  name: string;
  selector: string;
  baseScriptUrl: string;
  styles: string[];
  scripts: string[];
  prefix: string;
}

interface MooaApp extends IAppOption {
  bootstrap: () => {};
  load: () => {};
  mount: () => {};
  unload: () => {};
  unmount: () => {};
  timeouts: () => {};
}
