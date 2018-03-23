import { StatusEnum } from '../../src/model/constants'
import { ensureValidAppTimeouts } from '../../src/helper/timeouts'
import { toMountPromise } from '../../src/lifecycles/mount'

test('load mooa success', () => {
  let mountFlag = false
  toMountPromise({
    name: 'mooa',
    status: StatusEnum.NOT_MOUNTED,
    mount: () => {
      mountFlag = true
      return new Promise((resolve, reject) => {
        resolve()
      })
    },
    timeouts: ensureValidAppTimeouts(3000)
  }).then(app => {
    expect(mountFlag).toBe(true)
    expect(app.status).toBe(StatusEnum.MOUNTED)
  })
})
