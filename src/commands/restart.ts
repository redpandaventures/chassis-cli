import {spawn} from 'child_process'

import Base from '../lib/base'
import {isChassisDir} from '../lib/helpers'

export default class Restart extends Base {
  static description = 'Restart current chassis VM'

  static examples = [
    '$ chassis restart',
  ]

  async run() {
    if (! isChassisDir())
      this.error('Please run this command again in a Chassis directory.')

    spawn('vagrant', ['reload'], {stdio: 'inherit'})
  }
}
