const request = require('request')
const cheerio = require('cheerio')
const NODEURL = require('url')

let apps: {}[] = []

export async function generateAppConfigByUrl(appUrl: string) {
  return new Promise(function(resolve, reject) {
    request(appUrl, (error: any, response: any, body: any) => {
      if (error) {
        reject(appUrl)
        return console.log('request app url', appUrl)
      }
      const $ = cheerio.load(body)
      let app = {
        name: '',
        selector: '',
        baseScriptUrl: '',
        styles: [''],
        prefix: '',
        scripts: ['']
      }
      let $scripts = $('script')
      let $link = $('link')
      let $body = $('body')
      let scripts: string[] = []
      let styles: string[] = []
      let selector: string = ''

      if ($scripts.length > 0) {
        $scripts.map((index: any) => {
          scripts.push($scripts[index].attribs.src)
        })
      }
      if ($link.length > 0) {
        $link.map((index: any) => {
          if ($link[index].attribs.rel === 'stylesheet') {
            styles.push($link[index].attribs.href)
          }
        })
      }
      if ($body.length > 0) {
        selector = $body.children()['0'].name
      }
      const myURL = new NODEURL.URL(appUrl)
      let pathName = myURL.pathname
      let urlResources = pathName.split('/')
      let lastPath = urlResources[urlResources.length - 1]

      app.scripts = scripts
      app.styles = styles
      app.selector = selector
      app.name = lastPath
      app.prefix = lastPath
      app.baseScriptUrl = pathName

      apps.push(app)
      resolve(app)
    })
  })
}

export async function getAppsConfig(urls: string[]) {
  let appPromises: any = []

  urls.map((url: string) => {
    if (url) {
      appPromises.push(generateAppConfigByUrl(url))
    }
  })
  let apps = await Promise.all(appPromises)
  return apps
}
