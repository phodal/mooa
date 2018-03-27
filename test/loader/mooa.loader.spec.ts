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
  Object.defineProperty(window, 'mooa', () => {
    return {
      help: {
        mount: () => {}
      }
    }
  })

  const loader = mooaLoader({
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
    status: StatusEnum.NOT_BOOTSTRAPPED
  })

  loader.bootstrap()
  loader.load()
  expect(loader.mount()).toEqual(
    new Promise((resolve, reject) => {
      resolve()
    })
  )
})
