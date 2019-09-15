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
    if (! helpers.isChassisDir())
      this.error('Please run this command again in a Chassis directory.')

    const enabledExtensions = helpers.getLocalConfig('extensions') || []
    const disabledExtensions = helpers.getLocalConfig('disabled_extensions') || []

    if (enabledExtensions.length === 0)
      this.error("Nothing to do! You don't have any extension.")

    let {extensions} = await inquirer.prompt([
      {
        name: 'extensions',
        message: 'Choose extensions to disable',
        type: 'checkbox',
        choices: enabledExtensions.filter((e: string) => !disabledExtensions.includes(e))
      },
    ])

    if (extensions.length === 0)
      this.error('Nothing to do! Please choose at least one extension.')

    this.log('Disabling selected extensions..')

    const newDisabledExtensions = [...new Set(disabledExtensions.concat(extensions))]

    await helpers.updateLocalConfig({
      disabled_extensions: newDisabledExtensions,
      extensions: enabledExtensions.filter((e: string) => !newDisabledExtensions.includes(e))
    })

    spawn('vagrant', ['reload', '--provision'], {stdio: 'inherit'})
  }
}
