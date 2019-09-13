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

    let {extensions} = await inquirer.prompt([
      {
        name: 'toDisableExtensions',
        message: 'Choose extensions to disable',
        type: 'checkbox',
        choices: enabledExtensions
      },
    ])

    if (extensions.length === 0)
      this.error('Nothing to do! Please choose at least one extension.')

    this.log('Disabling selected extensions..')

    await helpers.updateLocalConfig({
      disabled_extensions: extensions
    })

    spawn('vagrant', ['reload', '--provision'], {stdio: 'inherit'})
  }
}
