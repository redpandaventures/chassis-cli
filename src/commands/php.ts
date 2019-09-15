import {spawn} from 'child_process'
import inquirer from 'inquirer'

import * as configs from '../configs'
import Base from '../lib/base'
import {getLocalConfig, updateLocalConfig} from '../lib/helpers'

export default class PHP extends Base {
  static description = 'Change PHP version for current Chassis VM'

  static examples = [
    '$ chassis php',
  ]

  isLocalCommand = true

  async run() {
    const currentPhpVersion = getLocalConfig('php').toString()
    this.log(`Curent PHP version: ${currentPhpVersion}`)

    let {phpVersion} = await inquirer.prompt([
      {
        name: 'phpVersion',
        message: 'Choose PHP version to change',
        type: 'list',
        choices: configs.php.filter((v: string) => v !== currentPhpVersion),
      },
    ])

    await updateLocalConfig({php: phpVersion})

    spawn('vagrant', ['reload', '--provision'], {stdio: 'inherit'})
  }
}
