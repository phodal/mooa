import { addAppToUnload } from '../../src/lifecycles/unload'
import { StatusEnum } from '../../src/model/constants'
import { ensureValidAppTimeouts } from '../../src/helper/timeouts'
import {
  getAppNames,
  toUnmountPromise,
  unloadApplication
} from '../../src/lifecycles/unmount'

const jsdom = require('jsdom')
const { JSDOM } = jsdom
const { window, document } = new JSDOM()

const globalAny: any = global
globalAny.window = window
globalAny.document = document

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
  let appNames = getAppNames()
  expect(appNames).toEqual(['help'])
  toUnmountPromise(app).then(app => {
    expect(unmountPromise).toBe(true)
    expect(app.status).toBe(StatusEnum.NOT_MOUNTED)
  })
})

test('unloadApplication', () => {
  let unmountPromise = false

  let mockApp = {
    name: 'help',
    status: StatusEnum.MOUNTED,
    unmount: (app: any) => {
      unmountPromise = true
      return new Promise((resolve, reject) => {
        resolve()
      })
    },
    unload: () => {
      return new Promise((resolve, reject) => {
        resolve()
      })
    },
    timeouts: ensureValidAppTimeouts(3000)
  }
  globalAny.window.apps = [mockApp]
  let app = {
    name: 'help',
    status: StatusEnum.MOUNTED
  }
  const resultPromise = new Promise((resolve, reject) => {
    addAppToUnload(app, () => resultPromise, resolve, reject)
  })
  unloadApplication('help')

  resultPromise.then(() => {
    expect(unmountPromise).toBe(true)
  })
})
