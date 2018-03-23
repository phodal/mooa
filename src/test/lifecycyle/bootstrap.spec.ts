import { StatusEnum } from '../../model/constants'
import { toBootstrapPromise } from '../../lifecycles/bootstrap'
import { ensureValidAppTimeouts } from '../../helper/timeouts'
import { toLoadPromise } from '../../lifecycles/load'

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
