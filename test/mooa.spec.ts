const jsdom = require('jsdom')
const { JSDOM } = jsdom
const { window, document } = new JSDOM()

const globalAny: any = global
globalAny.window = window
globalAny.document = document

import { default as Mooa, mooaRouter } from '../src/mooa'

beforeEach(() => {
  globalAny.apps = []
  globalAny.mooa = {}
})

afterEach(() => {
  globalAny.apps = []
  globalAny.mooa = {}
})

test('new mooa test', () => {
  const mooa = new Mooa({
    mode: 'iframe',
    debug: false,
    parentElement: 'app-home',
    urlPrefix: 'app',
    switchMode: 'coexist',
    preload: true,
    includeZone: false
  })

  mooa.registerApplicationByLink(
    'help',
    '/assets/help',
    mooaRouter.matchRoute('help')
  )
  mooa.start()
})

test('new mooa by register', () => {
  const mooa = new Mooa({
    mode: 'iframe',
    debug: false,
    parentElement: 'app-home',
    urlPrefix: 'app',
    switchMode: 'coexist',
    preload: true,
    includeZone: true
  })

  mooa.registerApplication(
    'help',
    {
      name: 'help',
      selector: 'app-help',
      baseScriptUrl: '/assets/help',
      styles: ['styles.bundle.css'],
      prefix: 'help',
      scripts: ['inline.bundle.js', 'polyfills.bundle.js', 'main.bundle.js'],
      mode: 'iframe'
    },
    mooaRouter.matchRoute('help')
  )
  mooa.start()

  let currentApp = globalAny.apps[globalAny.apps.length - 1]
  expect(currentApp.name).toEqual('help')
  expect(currentApp.appConfig).toEqual({
    baseScriptUrl: '/assets/help',
    includeZone: true,
    mode: 'iframe',
    name: 'help',
    parentElement: 'app-home',
    prefix: 'app/help',
    preload: true,
    scripts: ['inline.bundle.js', 'polyfills.bundle.js', 'main.bundle.js'],
    selector: 'app-help',
    styles: ['styles.bundle.css']
  })
  expect(typeof globalAny.mooa.instance).toEqual('object')
})

test('new mooa by with options', () => {
  globalAny.apps = []
  const mooa = new Mooa({
    mode: 'iframe',
    debug: false,
    parentElement: 'app-home',
    urlPrefix: 'app',
    switchMode: 'coexist',
    preload: true,
    includeZone: false
  })

  let appConfig = {
    name: 'help',
    selector: 'app-help',
    baseScriptUrl: '/assets/help',
    styles: ['styles.bundle.css'],
    prefix: 'help',
    scripts: ['inline.bundle.js', 'polyfills.bundle.js', 'main.bundle.js'],
    mode: 'iframe'
  }

  mooa.registerApplication('help', appConfig, mooaRouter.matchRoute('help'))
  mooa.start()

  let currentApp = globalAny.apps[globalAny.apps.length - 1]

  expect(currentApp.name).toEqual('help')
  expect(currentApp.mode).toEqual('iframe')
  expect(currentApp.switchMode).toEqual('coexist')
  expect(currentApp.appConfig).toEqual({
    baseScriptUrl: '/assets/help',
    includeZone: false,
    mode: 'iframe',
    name: 'help',
    parentElement: 'app-home',
    prefix: 'app/help',
    preload: true,
    scripts: ['inline.bundle.js', 'polyfills.bundle.js', 'main.bundle.js'],
    selector: 'app-help',
    styles: ['styles.bundle.css']
  })
  expect(typeof globalAny.mooa.instance).toEqual('object')
})
