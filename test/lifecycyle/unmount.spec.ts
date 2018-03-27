import { StatusEnum } from '../../src/model/constants'
import { ensureValidAppTimeouts } from '../../src/helper/timeouts'
import { toUnmountPromise } from '../../src/lifecycles/unmount'

test('unmount mooa success', () => {
  let unmountPromise = false
  let app = {
    name: 'mooa',
    status: StatusEnum.MOUNTED,
    unmount: (app: any) => {
      unmountPromise = true
      app.unloadApplication('help')
      return new Promise((resolve, reject) => {
        resolve()
      })
    },
    timeouts: ensureValidAppTimeouts(3000)
  }
  toUnmountPromise(app).then(app => {
    expect(unmountPromise).toBe(true)
    expect(app.status).toBe(StatusEnum.NOT_MOUNTED)
  })
})
