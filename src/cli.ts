#!/usr/bin/env node

import generate from './cli/generate'
import create from './cli/create'
import update from './cli/update'

const program = require('commander')

let version = require('../../package.json').version

program
  .version(version)
  .option('-c, --create [type]', 'Create [type] host || app')
  .option('-u, --update [host]', 'Update [type] host || app')
  .option('-g, --generate', 'Generate Mooa App Config')
  .parse(process.argv)

if (program.create) {
  create(program)
}

if (program.update) {
  update(program)
}

if (program.generate) {
  generate(program)
}

if (!process.argv.slice(2).length || !process.argv.length) {
  program.outputHelp()
}
