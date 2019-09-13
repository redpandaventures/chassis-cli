import {spawn} from 'child_process'
import inquirer from 'inquirer'

import * as configs from '../../configs'
import Base from '../../lib/base'
import * as helpers from '../../lib/helpers'

export default class Install extends Base {
  static description = 'Install Chassis extensions'

  static examples = [
    '$ chassis extension:install',
  ]

  async run() {
    if (! await helpers.isChassisDir())
      this.error('Please run this command again in a Chassis directory.')

    const enabledExtensions = helpers.getLocalConfig('extensions') || []
    const remainingExtensions = configs.extensions.filter(item => {
      return !enabledExtensions.includes(item.value)
    })

    let responses = await inquirer.prompt([
      {
        name: 'type',
        message: 'Choose extension type',
        type: 'list',
        choices: ['Official', 'Custom']
      },
      {
        name: 'extension',
        message: 'Extension name or URL',
        when: ({type}) => type === 'Custom',
      },
      {
        name: 'extensions',
        message: 'Choose extensions to install',
        type: 'checkbox',
        choices: remainingExtensions,
        when: ({type}) => type === 'Official',
      },
    ])

    let newExtensions = []

    if (responses.type === 'Custom' && responses.extension) {
      newExtensions = [responses.extension]
    }

    if (responses.type === 'Official' && responses.extensions.length > 0) {
      newExtensions = responses.extensions
    }

    if (newExtensions.length === 0)
      this.error('Nothing to do! Please choose at least one extension.')

    await helpers.updateLocalConfig({
      extensions: enabledExtensions.concat(newExtensions)
    })

    spawn('vagrant', ['reload', '--provision'], {stdio: 'inherit'})
  }
}
