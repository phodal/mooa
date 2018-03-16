#!/usr/bin/env node

import { getAppsConfig } from './cli/cli.help'

const program = require('commander')
const fs = require('fs')

let version = require('../../package.json').version

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

if (program.generate) {
  let urlListFilePath = program.args[0]

  let filePath = process.cwd() + '/' + urlListFilePath
  if (fs.existsSync(filePath)) {
    let urlFile = fs.readFileSync(filePath, 'utf8')
    let urls = urlFile.split(/\r?\n/)
    getAppsConfig(urls).then(apps => {
      fs.writeFileSync(process.cwd() + '/apps.json', JSON.stringify(apps))
    })
  }
}

if (!process.argv.slice(2).length || !process.argv.length) {
  program.outputHelp()
}
