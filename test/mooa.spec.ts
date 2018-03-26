import { default as Mooa, mooaRouter } from '../src/mooa'

beforeEach(() => {
  ;(global as any).apps = []
  ;(global as any).mooa = {}
})

afterEach(() => {
  ;(global as any).apps = []
  ;(global as any).mooa = {}
})

test('new mooa test', () => {
  const mooa = new Mooa({
    mode: 'iframe',
    debug: false,
    parentElement: 'app-home',
    urlPrefix: 'app'
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
    urlPrefix: 'app'
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

  expect((global as any).apps[0].name).toEqual('help')
  expect(typeof (global as any).mooa.instance).toEqual('object')
})
