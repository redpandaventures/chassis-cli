import fs from 'fs-extra'
import inquirer from 'inquirer'
import open from 'open'
import {homedir} from 'os'

import Base from '../lib/base'

export default class Log extends Base {
  static description = 'Create a new Chassis project.'

  static examples = [
    '$ chassis log ',
  ]

  async run() {
    const logDir = `${homedir()}/.chassis/logs`
    const logFiles = (await fs.readdir(logDir))
      .filter(f => f.substr(-4) === '.log')

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

    return open(`${logDir}/${responses.file}`)
  }
}
