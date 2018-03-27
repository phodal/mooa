import MooaPlatform from '../../src/platform/platform'
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const { window, document } = new JSDOM()

const globalAny: any = global
globalAny.window = window
globalAny.document = document

let mooaPlatform = new MooaPlatform()

test('platform base path 1', () => {
  let basePath = mooaPlatform.appBase()
  expect(basePath).toBe('/')
})

test('platform base path 2', () => {
  globalAny.window.mooa = {
    isSingleSpa: true
  }
  let mooaPlatform = new MooaPlatform()
  let basePath = mooaPlatform.appBase()
  expect(basePath).toBe('/')
})

test('platform base mount', () => {
  let mooaPlatform = new MooaPlatform()
  let basePath = mooaPlatform.mount('app1', '/assets/app1')
  expect(basePath).toEqual(
    new Promise((resolve, reject) => {
      resolve()
    })
  )
})

test('platform base mount', () => {
  let mooaPlatform = new MooaPlatform()
  mooaPlatform.mount('app1', '/assets/app1')
  globalAny.window['app1'] = {
    unmount: () => {
      return
    }
  }
  let func = {
    destroy: () => {
      return
    },
    injector: () => {
      return {
        get: (params: any) => {
          return {
            dispose: () => {
              return
            }
          }
        }
      }
    }
  }
  mooaPlatform.unmount(func)
})

test('platform navigateTo', () => {
  let mooaPlatform = new MooaPlatform()
  mooaPlatform.navigateTo({
    name: 'helo',
    route: ''
  })

  window.dispatchEvent = jest.fn()
})

test('platform handleRouterUpdate', () => {
  let mooaPlatform = new MooaPlatform()
  mooaPlatform.handleRouterUpdate('helo', '')
})
