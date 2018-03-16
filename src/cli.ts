#!/usr/bin/env node

const request = require('request')
const program = require('commander')
const cheerio = require('cheerio')
const fs = require('fs')
const { URL } = require('url')

let version = require('../../package.json').version
let apps: {}[] = []

program
  .version(version)
  .option('-c, --create [type]', 'Create [type] host || app')
  .option('-u, --update [host]', 'Update [type] host || app')
  .option('-g, --generate', 'Generate Mooa App Config')
  .parse(process.argv)

if (program.create) {
  if (program.create === 'host') {
    console.log('create host')
  } else if (program.create === 'app') {
    console.log('create app')
  }
}

if (program.update) {
  if (program.update === 'host') {
    console.log('update host')
  } else if (program.update === 'app') {
    console.log('update app')
  }
}

async function generateAppConfigByUrl(appUrl: string) {
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
      const myURL = new URL(appUrl)
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

async function getAppsConfig(urls: string[]) {
  let appPromises: any = []

  urls.map((url: string) => {
    if (url) {
      appPromises.push(generateAppConfigByUrl(url))
    }
  })
  let apps = await Promise.all(appPromises)
  return apps
}

if (program.generate) {
  let urlListFilePath = program.args[0]

  let filePath = process.cwd() + urlListFilePath
  if (fs.existsSync(filePath)) {
    let urlFile = fs.readFileSync(filePath, 'utf8')
    let urls = urlFile.split(/\r?\n/)
    getAppsConfig(urls).then(() => {
      console.log(apps)
    })
  }
}

if (!process.argv.slice(2).length || !process.argv.length) {
  program.outputHelp()
}
