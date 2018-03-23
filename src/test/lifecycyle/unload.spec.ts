import { StatusEnum } from '../../model/constants'
import { ensureValidAppTimeouts } from '../../helper/timeouts'
import { toMountPromise } from '../../lifecycles/mount'
import { addAppToUnload, toUnloadPromise } from '../../lifecycles/unload'

test('unload mooa success', () => {
  // let unloadFlag = false
  // let app = {
  //   name: 'mooa',
  //   status: StatusEnum.NOT_MOUNTED,
  //   unload: () => {
  //     unloadFlag = true
  //     return new Promise((resolve, reject) => {
  //       resolve()
  //     })
  //   },
  //   timeouts: ensureValidAppTimeouts(3000)
  // };
  // addAppToUnload(app, () => {}, )
  // toUnloadPromise(app).then(app => {
  //   expect(unloadFlag).toBe(true)
  //   expect(app.status).toBe(StatusEnum.UNLOADING)
  // })
})
