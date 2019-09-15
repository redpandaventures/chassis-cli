import inquirer from 'inquirer'

import Base from '../../lib/base'
import {isChassisDir} from '../../lib/helpers'

export default class Extension extends Base {
  static description = 'Manage Chassis extensions'

  static examples = [
    '$ chassis extension',
  ]

  async run() {
    const isGlobal = ! isChassisDir()

    let choices = [
      {name: 'Install extension(s)', value: 'install'},
      {name: 'List installed extension(s)', value: 'list'},
      {name: 'Update extension(s)', value: 'update'},
      {name: 'Enable extension(s)', value: 'enable'},
      {name: 'Disable extension(s)', value: 'disable'},
    ]

    if (isGlobal)
      choices = [
        {name: 'Install global extension(s)', value: 'install'},
        {name: 'List installed global extension(s)', value: 'list'},
      ]

    let {action} = await inquirer.prompt([
      {
        name: 'action',
        message: 'What can Chassis do for you?',
        type: 'list',
        choices,
      },
    ])

    return this.config.runCommand(`extension:${action}`)
  }
}
