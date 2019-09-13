import {spawnSync} from 'child_process'
import inquirer from 'inquirer'

import Base from '../../lib/base'
import * as helpers from '../../lib/helpers'

export default class Update extends Base {
  static description = 'Update Chassis extensions'

  static examples = [
    '$ chassis extension:update',
  ]

  async run() {
    if (! await helpers.isChassisDir())
      this.error('Please run this command again in a Chassis directory.')

    const extensionDir = `${process.cwd()}/extensions`
    const enabledExtensions = helpers.getLocalConfig('extensions') || []

    let {toUpdateExtensions} = await inquirer.prompt([
      {
        name: 'toUpdateExtensions',
        message: 'Choose extensions to update',
        type: 'checkbox',
        choices: enabledExtensions
      },
    ])

    toUpdateExtensions.map((extension: string) => {
      let [extensionName] = extension.split('/').slice(-1)
      this.log(`Updating ${extension}`)
      spawnSync('git', ['pull'], {
        cwd: `${extensionDir}/${extensionName}`,
        stdio: 'inherit'
      })
    })

    spawnSync('vagrant', ['reload', '--provision'], {stdio: 'inherit'})
  }
}
