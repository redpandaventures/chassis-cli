import fs from 'fs-extra'
import inquirer from 'inquirer'
import open from 'open'
import {homedir} from 'os'
import path from 'path'

import Base from '../lib/base'
import {getLocalConfig, isChassisDir, rreaddirSync} from '../lib/helpers'

export default class Log extends Base {
  static description = 'View chassis logs'

  static examples = [
    '$ chassis log ',
  ]

  async run() {
    const logDir = `${homedir()}/.chassis/logs`
    const domain = isChassisDir ? getLocalConfig('hosts').find(() => true) : ''

    let logFiles = (await fs.readdir(logDir))
      .filter(f => {
        if (domain)
          return f.includes(domain)

        return f.substr(-4) === '.log'
      })
      .map(f => ({name: f, value: path.resolve(logDir, f)}))

    if (domain) {
      let localLogs = rreaddirSync('logs')
        .filter(f => f.substr(-4) === '.log')
      .map(f => ({name: f, value: path.resolve(process.cwd(), f)}))
      logFiles = logFiles.concat(localLogs)
    }

    if (logFiles.length === 0)
      this.log("Can't find any log for current project")

    let responses: any = await inquirer.prompt([
      {
        name: 'file',
        message: 'Choose a log file to view:',
        type: 'list',
        choices: [
          {name: 'Reveal the log folder', value: 'reveal'},
          new inquirer.Separator(),
          ...logFiles
        ],
      },
    ])

    if (responses.file === 'reveal')
      return open(logDir)

    return open(responses.file)
  }
}
