import { StatusEnum } from '../../src/model/constants'
import { toBootstrapPromise } from '../../src/lifecycles/bootstrap'
import { ensureValidAppTimeouts } from '../../src/helper/timeouts'
import { toLoadPromise } from '../../src/lifecycles/load'

test('bootstrap mooa success', () => {
  let bootstrapFlag = false
  toBootstrapPromise({
    name: 'mooa',
    status: StatusEnum.NOT_BOOTSTRAPPED,
    bootstrap: () => {
      bootstrapFlag = true
      return new Promise((resolve, reject) => {
        resolve()
      })
    },
    timeouts: ensureValidAppTimeouts(3000)
  }).then(app => {
    expect(bootstrapFlag).toBe(true)
    expect(app.status).toBe(StatusEnum.NOT_MOUNTED)
  })
})
