import {spawn} from 'child_process'
import inquirer from 'inquirer'

import Base from '../../lib/base'
import * as helpers from '../../lib/helpers'

export default class Enable extends Base {
  static description = 'Enable Chassis extensions'

  static examples = [
    '$ chassis extension:enable',
  ]

  async run() {
    if (! await helpers.isChassisDir())
      this.error('Please run this command again in a Chassis directory.')

    const disabledExtensions = helpers.getLocalConfig('disabled_extensions') || []

    if (disabledExtensions.length === 0)
      this.error("Nothing to do! You don't have any disabled extension.")

    let {extensions} = await inquirer.prompt([
      {
        name: 'extensions',
        message: 'Choose extensions to enable',
        type: 'checkbox',
        choices: disabledExtensions
      },
    ])

    if (extensions.length === 0)
      this.error('Nothing to do! Please choose at least one extension.')

    this.log('Enabling selected extensions..')

    await helpers.updateLocalConfig({
      disabled_extensions: disabledExtensions.filter((e: string) => !extensions.includes(e))
    })

    spawn('vagrant', ['reload', '--provision'], {stdio: 'inherit'})
  }
}
