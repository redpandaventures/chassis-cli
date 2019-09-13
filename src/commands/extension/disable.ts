import {spawn} from 'child_process'
import inquirer from 'inquirer'

import Base from '../../lib/base'
import * as helpers from '../../lib/helpers'

export default class Disable extends Base {
  static description = 'Disable Chassis extensions'

  static examples = [
    '$ chassis extension:disable',
  ]

  async run() {
    if (! await helpers.isChassisDir())
      this.error('Please run this command again in a Chassis directory.')

    const enabledExtensions = helpers.getLocalConfig('extensions') || []

    let {toDisableExtensions} = await inquirer.prompt([
      {
        name: 'toDisableExtensions',
        message: 'Choose extensions to disable',
        type: 'checkbox',
        choices: enabledExtensions
      },
    ])

    this.log('Disabling selected extensions..')

    await helpers.updateLocalConfig({
      disabled_extensions: toDisableExtensions
    })

    spawn('vagrant', ['reload', '--provision'], {stdio: 'inherit'})
  }
}
