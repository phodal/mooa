const AppHelper = require('../../helper/app.helper')

test('should be able to find app name', () => {
  let apps = [{ name: 'app1' }, { name: 'help' }]
  let findApp = AppHelper.find(apps, (app: any) => {
    return app.name === 'help'
  })
  expect(findApp.name).toBe('help')
})

test('should be unable to find app name', () => {
  let apps = [{ name: 'app1' }, { name: 'help' }]
  let isFind = AppHelper.find(apps, (app: any) => {
    return app.name === 'help1'
  })
  expect(isFind).toBe(null)
})
