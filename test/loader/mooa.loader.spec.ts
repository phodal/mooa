const jsdom = require('jsdom')
const { JSDOM } = jsdom
const { window, document } = new JSDOM()

const globalAny: any = global
globalAny.window = window
globalAny.document = document

import mooaLoader from '../../src/loader/mooa.loader'
import { StatusEnum } from '../../src/model/constants'

test('bootstrap test', () => {
  const loader = mooaLoader({
    name: '',
    appConfig: {
      name: 'help',
      selector: 'app-help',
      baseScriptUrl: '/assets/help',
      styles: ['styles.bundle.css'],
      prefix: 'help',
      scripts: ['inline.bundle.js', 'polyfills.bundle.js', 'main.bundle.js'],
      mode: 'iframe'
    }
  })

  loader.bootstrap()
  expect(1 + 2).toBe(3)
})

test('load test', () => {
  const loader = mooaLoader({
    name: '',
    appConfig: {
      name: 'help',
      selector: 'app-help',
      baseScriptUrl: '/assets/help',
      styles: ['styles.bundle.css'],
      prefix: 'help',
      scripts: ['inline.bundle.js', 'polyfills.bundle.js', 'main.bundle.js'],
      mode: 'iframe'
    }
  })

  expect(loader.load()).toEqual(
    new Promise((resolve, reject) => {
      resolve()
    })
  )
})

test('mount test', () => {
  globalAny.window.mooa = {
    help: {
      mount: jest.fn()
    }
  }

  let opts = {
    name: 'help',
    appConfig: {
      name: 'help',
      selector: 'app-help',
      baseScriptUrl: '/assets/help',
      styles: ['styles.bundle.css'],
      prefix: 'help',
      scripts: ['inline.bundle.js', 'polyfills.bundle.js', 'main.bundle.js'],
      mode: 'iframe'
    },
    bootstrap: jest.fn(),
    load: jest.fn(),
    mount: jest.fn(),
    unload: jest.fn(),
    unmount: jest.fn(),
    status: StatusEnum.MOUNTED
  }

  const loader = mooaLoader(opts)

  loader.load(opts)
  loader.bootstrap(opts)
  expect(loader.mount(opts)).toEqual(
    new Promise((resolve, reject) => {
      resolve()
    })
  )
})
