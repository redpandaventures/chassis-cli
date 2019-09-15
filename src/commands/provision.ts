import {spawn} from 'child_process'

import Base from '../lib/base'
import {isChassisDir} from '../lib/helpers'

export default class Provision extends Base {
  static description = 'Provision current chassis VM'

  static examples = [
    '$ chassis provision',
  ]

  async run() {
    if (! isChassisDir())
      this.error('Please run this command again in a Chassis directory.')

    spawn('vagrant', ['reload', '--provision'], {stdio: 'inherit'})
  }
}
