const assetsLoaderHelper = require('../../helper/assets.helper').default

test('should be able create script tag', () => {
  let scriptTag = assetsLoaderHelper.createScriptTag('/test.js')
  let tmp = document.createElement('div')
  tmp.appendChild(scriptTag)
  expect(tmp.innerHTML).toBe(
    '<script type="text/javascript" src="/test.js" charset="UTF-8" id="1494346482"></script>'
  )
})

test('should be able create style tag', () => {
  let scriptTag = assetsLoaderHelper.createLinkTag('/style.css')
  let tmp = document.createElement('div')
  tmp.appendChild(scriptTag)
  expect(tmp.innerHTML).toBe(
    '<link rel="stylesheet" href="/style.css" type="text/css" charset="UTF-8" id="2145530989">'
  )
})
