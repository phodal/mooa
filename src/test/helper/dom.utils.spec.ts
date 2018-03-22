import { generateIFrameID } from '../../helper/dom.utils'

test('should be able generate iframe id', () => {
  let iframeID = generateIFrameID('app')
  expect(iframeID).toEqual('app_12456')
})
