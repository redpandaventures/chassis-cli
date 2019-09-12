import execa from 'execa'
import inquirer from 'inquirer'

import * as configs from '../../configs'
import Base from '../../lib/base'
import * as helpers from '../../lib/helpers'

export default class Extension extends Base {
  static description = 'Manage Chassis extensions'

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

    let {toInstallextensions} = await inquirer.prompt([
      {
        name: 'toInstallextensions',
        message: 'Choose extensions to install',
        type: 'checkbox',
        choices: remainingExtensions,
      },
    ])

    await helpers.updateLocalConfig({
      extensions: enabledExtensions.concat(toInstallextensions)
    })

    let subprocess = execa('vagrant', ['reload', '--provision'])
    subprocess.stdout.pipe(process.stdout)
    subprocess.stderr.pipe(process.stderr)
  }
}
