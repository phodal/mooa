const jsdom = require('jsdom')
const { JSDOM } = jsdom
const { window, document } = new JSDOM()

const globalAny: any = global
globalAny.window = window
globalAny.document = document

import { StatusEnum } from '../../src/model/constants'
import { ensureValidAppTimeouts } from '../../src/helper/timeouts'
import { toUnmountPromise } from '../../src/lifecycles/unmount'

test('unmount mooa success', () => {
  let mockApp = {
    name: 'help',
    status: StatusEnum.MOUNTED,
    unmount: () => null
  }
  globalAny.window.apps = [mockApp]
  let unmountPromise = false
  let app = {
    name: 'help',
    status: StatusEnum.MOUNTED,
    unloadApplication: jest.fn(),
    unmount: (app: any) => {
      unmountPromise = true
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
