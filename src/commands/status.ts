import Base from '../lib/base'
import {getLocalConfig, getVMStatus, isChassisDir} from '../lib/helpers'

export default class Status extends Base {
  static description = 'View chassis logs'

  static examples = [
    '$ chassis status',
  ]

  async run() {
    if (! isChassisDir())
      this.error('Please run this command again in a Chassis directory.')

    const vmStatus = `
=== Curent VM status =====================
Domain: ${getLocalConfig('hosts')}
PHP version: ${getLocalConfig('php')}
Status: ${getVMStatus()}
Multisite: ${getLocalConfig('multisite')}
Extensions: ${JSON.stringify(getLocalConfig('extensions')).replace(/,/g, ' | ')}
Disabled extensions: ${JSON.stringify(getLocalConfig('disabled_extensions')).replace(/,/g, ' | ')}
`

    this.log(vmStatus)
  }
}
