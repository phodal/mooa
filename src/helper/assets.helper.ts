import { hashCode } from './app.helper'

const createScriptTag = function(src: string) {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = src
  script.charset = 'UTF-8'
  script.id = hashCode(src)
  return script
}

const createLinkTag = function(src: string) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = src
  link.type = 'text/css'
  link.charset = 'UTF-8'
  link.id = hashCode(src)
  return link
}

const AssetsHelper = {
  createScriptTag: createScriptTag,
  createLinkTag: createLinkTag
}

export default AssetsHelper
