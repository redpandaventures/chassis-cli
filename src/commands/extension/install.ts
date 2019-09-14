import {spawn} from 'child_process'
import fs from 'fs-extra'
import inquirer from 'inquirer'
import {homedir} from 'os'
import path from 'path'

import * as configs from '../../configs'
import Base from '../../lib/base'
import * as helpers from '../../lib/helpers'

export default class Install extends Base {
  static description = 'Install Chassis extensions'

  static examples = [
    '$ chassis extension:install',
  ]

  async run() {
    const isGlobal = ! await helpers.isChassisDir()

    let enabledExtensions: string[] = helpers.getLocalConfig('extensions') || []

    if (isGlobal) {
      enabledExtensions = await fs.readdir(
        path.resolve(homedir(), '.chassis/extensions')
      )
    }

    enabledExtensions = enabledExtensions.map(item => item.toLowerCase())
    let remainingExtensions = configs.extensions.filter(item => {
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

    let newExtensions: string[] = []

    if (responses.type === 'Custom' && responses.extension) {
      newExtensions = [responses.extension]
    }

    if (responses.type === 'Official' && responses.extensions.length > 0) {
      newExtensions = responses.extensions
    }

    if (newExtensions.length === 0)
      this.error('Nothing to do! Please choose at least one extension.')

    newExtensions = newExtensions.map(name => name.toLowerCase())

    if (isGlobal) {
      this.log('Installing selected extensions globally..')
      newExtensions.map((repo: string) => {
        spawn('git', ['clone', helpers.getExtensionURL(repo)], {
          cwd: path.resolve(homedir(), '.chassis/extensions'),
          stdio: 'inherit'
        })
      })
    } else {
      await helpers.updateLocalConfig({
        extensions: enabledExtensions.concat(newExtensions)
      })

      spawn('vagrant', ['reload', '--provision'], {stdio: 'inherit'})
    }
  }
}
