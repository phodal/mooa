const jsdom = require('jsdom')
const { JSDOM } = jsdom
const { window, document } = new JSDOM()

const globalAny: any = global
globalAny.window = window
globalAny.document = document

import mooaLoader from '../../src/loader/mooa.loader'
import { StatusEnum } from '../../src/model/constants'

test('bootstrap test', () => {
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
    unmount: () => null,
    status: StatusEnum.MOUNTED
  }

  const loader = mooaLoader(opts)

  loader.bootstrap.call(opts)
  expect(loader.bootstrap.call(opts)).toEqual(
    new Promise((resolve, reject) => {
      resolve()
    })
  )
})

test('bootstrap iframe test', () => {
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
    mode: 'iframe',
    bootstrap: jest.fn(),
    load: jest.fn(),
    mount: jest.fn(),
    unload: jest.fn(),
    unmount: () => null,
    status: StatusEnum.MOUNTED
  }

  const loader = mooaLoader(opts)

  expect(loader.bootstrap.call(opts)).toEqual(
    new Promise((resolve, reject) => {
      resolve()
    })
  )
})

test('bootstrap link test', () => {
  let opts = {
    name: 'help',
    appConfig: {
      name: 'help',
      selector: 'app-help',
      baseScriptUrl: '/assets/help',
      styles: ['styles.bundle.css'],
      prefix: 'help',
      scripts: ['inline.bundle.js', 'polyfills.bundle.js', 'main.bundle.js'],
      sourceType: 'link'
    },
    sourceType: 'link',
    bootstrap: jest.fn(),
    load: jest.fn(),
    mount: jest.fn(),
    unload: jest.fn(),
    unmount: () => null,
    status: StatusEnum.MOUNTED
  }

  const loader = mooaLoader(opts)

  expect(loader.bootstrap.call(opts)).toEqual(
    new Promise((resolve, reject) => {
      resolve()
    })
  )
})
