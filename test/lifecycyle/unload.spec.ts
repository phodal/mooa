import { StatusEnum } from '../../src/model/constants'
import { ensureValidAppTimeouts } from '../../src/helper/timeouts'
import { toUnloadPromise } from '../../src/lifecycles/unload'

test('unload mooa success', () => {
  let unloadFlag = false
  let app = {
    name: 'mooa',
    status: StatusEnum.NOT_MOUNTED,
    unload: () => {
      unloadFlag = true
      return new Promise((resolve, reject) => {
        resolve()
      })
    },
    timeouts: ensureValidAppTimeouts(3000)
  }
  toUnloadPromise(app).then(app => {
    expect(unloadFlag).toBe(true)
    expect(app.status).toBe(StatusEnum.UNLOADING)
  })
})
