import { StatusEnum } from '../../model/constants'
import { toBootstrapPromise } from '../../lifecycles/bootstrap'
import { ensureValidAppTimeouts } from '../../helper/timeouts'
import { toLoadPromise } from '../../lifecycles/load'

test('load mooa success', () => {
  toLoadPromise({
    name: 'mooa',
    status: StatusEnum.NOT_LOADED,
    bootstrap: () => {
      return new Promise((resolve, reject) => {
        resolve()
      })
    },
    timeouts: ensureValidAppTimeouts(3000)
  }).then(app => {
    expect(app.status).toBe(StatusEnum.NOT_BOOTSTRAPPED)
    expect(typeof app.bootstrap).toBe('function')
    expect(typeof app.load).toBe('function')
    expect(typeof app.mount).toBe('function')
    expect(typeof app.unload).toBe('function')
    expect(typeof app.unmount).toBe('function')
    expect(typeof app.timeouts).toBe('object')
  })
})
