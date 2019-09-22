import fs from 'fs-extra'
import inquirer from 'inquirer'
import open from 'open'
import {homedir} from 'os'

import Base from '../lib/base'
import {getLocalConfig, isChassisDir} from '../lib/helpers'

export default class Log extends Base {
  static description = 'View chassis logs'

  static examples = [
    '$ chassis log ',
  ]

  async run() {
    const logDir = `${homedir()}/.chassis/logs`
    const logFiles = (await fs.readdir(logDir))
      .filter(f => {
        if (! isChassisDir)
          return f.substr(-4) === '.log'

        const domain = getLocalConfig('hosts')

        if (domain.length === 0)
          return f.includes(domain[0])

        return false
      })

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

    return open(`${logDir}/${responses.file}`)
  }
}
