import { default as Mooa, mooaRouter } from '../src/mooa'

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
    '/assets/help',
    mooaRouter.matchRoute('help')
  )
  mooa.start()
})
