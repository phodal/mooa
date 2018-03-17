import { getAppsConfig } from './cli.help'
const fs = require('fs')

export default function generate(program: any) {
  let urlListFilePath = program.args[0]

  let filePath = process.cwd() + '/' + urlListFilePath
  if (fs.existsSync(filePath)) {
    let urlFile = fs.readFileSync(filePath, 'utf8')
    let urls = urlFile.split(/\r?\n/)
    getAppsConfig(urls).then(apps => {
      fs.writeFileSync(
        process.cwd() + '/apps.json',
        JSON.stringify(apps, null, 2)
      )
    })
  }
}
