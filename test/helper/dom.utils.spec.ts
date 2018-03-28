import {
  createApplicationIframeContainer,
  generateIFrameID,
  isIframeElementExist
} from '../../src/helper/dom.utils'
import { StatusEnum } from '../../src/model/constants'

const jsdom = require('jsdom')
const { JSDOM } = jsdom
const { window, document } = new JSDOM()

const globalAny: any = global
globalAny.window = window
globalAny.document = document

test('should be able generate iframe id', () => {
  let iframeID = generateIFrameID('app')
  expect(iframeID).toEqual('app_12456')
})

test('should be able generate iframe id', () => {
  let opts: any = {
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
    selector: 'app-help',
    switchMode: 'coexist',
    mode: 'iframe',
    bootstrap: jest.fn(),
    load: jest.fn(),
    mount: jest.fn(),
    unload: jest.fn(),
    unmount: () => null,
    timeouts: () => null,
    unloadApplication: () => null,
    getAppNames: () => null,
    status: StatusEnum.MOUNTED
  }

  createApplicationIframeContainer(opts)
  let htmlElement = isIframeElementExist(opts)
  let tmp = globalAny.document.createElement('div')
  tmp.appendChild(htmlElement)
  expect(tmp.innerHTML).toBe(
    '<iframe frameborder="" width="100%" height="100%" src="about:blankassets/iframe.html" id="help_206547"></iframe>'
  )
})
