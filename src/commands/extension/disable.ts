import {spawn} from 'child_process'
import inquirer from 'inquirer'

import Base from '../../lib/base'
import {getLocalConfig, updateLocalConfig} from '../../lib/helpers'

export default class Disable extends Base {
  static description = 'Disable Chassis extensions'

  static examples = [
    '$ chassis extension:disable',
  ]

  isLocalCommand = true

  async run() {
    const enabledExtensions = getLocalConfig('extensions') || []
    const disabledExtensions = getLocalConfig('disabled_extensions') || []

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

    await updateLocalConfig({
      disabled_extensions: newDisabledExtensions,
      extensions: enabledExtensions.filter((e: string) => !newDisabledExtensions.includes(e))
    })

    spawn('vagrant', ['reload', '--provision'], {stdio: 'inherit'})
  }
}
