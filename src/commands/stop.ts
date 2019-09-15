import {spawn} from 'child_process'

import Base from '../lib/base'
import {isChassisDir} from '../lib/helpers'

export default class Stop extends Base {
  static description = 'Stop current chassis VM'

  static examples = [
    '$ chassis stop',
  ]

  async run() {
    if (! isChassisDir())
      this.error('Please run this command again in a Chassis directory.')

    spawn('vagrant', ['halt'], {stdio: 'inherit'})
  }
}
