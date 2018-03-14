class ReRouterServices {
  private static instance: ReRouterServices
  private _service: any

  public static getInstance(): ReRouterServices {
    if (ReRouterServices.instance === null) {
      ReRouterServices.instance = new ReRouterServices()
    }
    return ReRouterServices.instance
  }

  get service(): any {
    return this._service
  }

  set service(value: any) {
    this._service = value
  }
}

export default ReRouterServices
