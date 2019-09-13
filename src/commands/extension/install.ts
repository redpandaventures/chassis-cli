import execa from 'execa'
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

    let {toInstallExtensions} = await inquirer.prompt([
      {
        name: 'toInstallextensions',
        message: 'Choose extensions to install',
        type: 'checkbox',
        choices: remainingExtensions,
      },
    ])

    await helpers.updateLocalConfig({
      extensions: enabledExtensions.concat(toInstallExtensions)
    })

    let subprocess = execa('vagrant', ['reload', '--provision'])
    subprocess.stdout.pipe(process.stdout)
    subprocess.stderr.pipe(process.stderr)
  }
}
