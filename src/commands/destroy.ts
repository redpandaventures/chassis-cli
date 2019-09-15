import {spawn} from 'child_process'

import Base from '../lib/base'
import {isChassisDir} from '../lib/helpers'

export default class Destroy extends Base {
  static description = 'Destroy current chassis VM'

  static examples = [
    '$ chassis destroy',
  ]

  async run() {
    if (! isChassisDir())
      this.error('Please run this command again in a Chassis directory.')

    spawn('vagrant', ['destroy'], {stdio: 'inherit'})
  }
}
