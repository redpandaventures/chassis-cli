import {spawn} from 'child_process'
import inquirer from 'inquirer'

import Base from '../../lib/base'
import {getLocalConfig} from '../../lib/helpers'

export default class Update extends Base {
  static description = 'Update Chassis extensions'

  static examples = [
    '$ chassis extension:update',
  ]

  isLocalCommand = true

  async run() {
    const extensionDir = `${process.cwd()}/extensions`
    const enabledExtensions = getLocalConfig('extensions') || []

    let {extensions} = await inquirer.prompt([
      {
        name: 'toUpdateExtensions',
        message: 'Choose extensions to update',
        type: 'checkbox',
        choices: enabledExtensions
      },
    ])

    if (extensions.length === 0)
      this.error('Nothing to do! Please choose at least one extension.')

    this.log('Updating selected extensions..')

    await extensions.map((extension: string) => {
      let [extensionName] = extension.split('/').slice(-1)
      spawn('git', ['pull'], {
        cwd: `${extensionDir}/${extensionName.replace('.git', '')}`,
        stdio: 'inherit'
      })
    })

    spawn('vagrant', ['reload', '--provision'], {stdio: 'inherit'})
  }
}
