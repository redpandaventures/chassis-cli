import inquirer from 'inquirer'

import Base from '../../lib/base'
import {isChassisDir} from '../../lib/helpers'

export default class Extension extends Base {
  static description = 'Manage Chassis extensions'

  static examples = [
    '$ chassis extension',
  ]

  async run() {
    if (! await isChassisDir())
      this.error('Please run this command again in a Chassis directory.')

    let {action} = await inquirer.prompt([
      {
        name: 'action',
        message: 'What can Chassis do for you?',
        type: 'list',
        choices: [
          {name: 'Install extension(s)', value: 'install'},
          {name: 'Update extensions', value: 'update'},
          //{name: 'Uninstall extension(s)', value: 'uninstall'},
        ],
      },
    ])

    return this.config.runCommand(`extension:${action}`)
  }
}
