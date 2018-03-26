import MooaPlatform from '../../src/platform/platform'

let mooaPlatform = new MooaPlatform()

test('platform base path 1', () => {
  let basePath = mooaPlatform.appBase()
  expect(basePath).toBe('/')
})

test('platform base path 2', () => {
  ;(global as any).mooa = {
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
