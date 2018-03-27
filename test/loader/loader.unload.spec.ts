const jsdom = require('jsdom')
const { JSDOM } = jsdom
const { window, document } = new JSDOM()

const globalAny: any = global
globalAny.window = window
globalAny.document = document

import mooaLoader from '../../src/loader/mooa.loader'
import { StatusEnum } from '../../src/model/constants'

test('loader unload test', () => {
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
    switchMode: 'coexist',
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
  loader.unmount({
    unloadApplication: () => {
      return
    },
    getAppNames: () => {
      return ['help']
    }
  })
  expect(loader.unload()).toEqual(
    new Promise((resolve, reject) => {
      resolve()
    })
  )
})

test('loader unload coexist test', () => {
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
  loader.unmount({
    unloadApplication: () => {
      return
    },
    getAppNames: () => {
      return ['help']
    }
  })
  loader.unload().then(() => {
    expect(opts.appConfig.scripts).toEqual([
      'inline.bundle.js',
      'polyfills.bundle.js',
      'main.bundle.js'
    ])
  })
})
