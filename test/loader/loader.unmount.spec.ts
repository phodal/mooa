const jsdom = require('jsdom')
const { JSDOM } = jsdom
const { window, document } = new JSDOM()

const globalAny: any = global
globalAny.window = window
globalAny.document = document

import mooaLoader from '../../src/loader/mooa.loader'
import { StatusEnum } from '../../src/model/constants'

test('unmount test', () => {
  globalAny.window.mooa = {
    help: {
      mount: () => {
        return
      },
      unmount: () => {
        return
      }
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
    unmount: () => {
      return
    },
    status: StatusEnum.MOUNTED
  }

  const loader = mooaLoader(opts)

  loader.load()
  loader.bootstrap()
  loader.mount()
  expect(
    loader.unmount({
      unloadApplication: () => {
        return
      },
      getAppNames: () => {
        return ['help']
      }
    })
  ).toEqual(
    new Promise((resolve, reject) => {
      resolve()
    })
  )
})
