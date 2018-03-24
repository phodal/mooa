export enum StatusEnum {
  NOT_LOADED = 'NOT_LOADED',
  LOADING_SOURCE_CODE = 'LOADING_SOURCE_CODE',
  NOT_BOOTSTRAPPED = 'NOT_BOOTSTRAPPED',
  BOOTSTRAPPING = 'BOOTSTRAPPING',
  NOT_MOUNTED = 'NOT_MOUNTED',
  MOUNTING = 'MOUNTING',
  MOUNTED = 'MOUNTED',
  UNMOUNTING = 'UNMOUNTING',
  UNLOADING = 'UNLOADING',
  SKIP_BECAUSE_BROKEN = 'SKIP_BECAUSE_BROKEN'
}

export enum MOOA_EVENT {
  LOADING = 'mooa.loading',
  BOOTSTRAPPING = 'mooa.bootstrapping',
  MOUNTING = 'mooa.mounting',
  UNLOADING = 'mooa.unloading',
  UNMOUNTING = 'mooa.unmounting',
  ROUTING_NAVIGATE = 'mooa.routing.navigate',
  ROUTING_CHANGE = 'mooa.routing.change',
  ROUTING_BEFORE = 'mooa.routing.before',
  CHILD_MOUNT = 'mooa.child.mount',
  CHILD_UNMOUNT = 'mooa.child.unmount'
}
