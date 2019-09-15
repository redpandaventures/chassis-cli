import {spawn} from 'child_process'

import Base from '../lib/base'
import {isChassisDir} from '../lib/helpers'

export default class Start extends Base {
  static description = 'Start current chassis VM'

  static examples = [
    '$ chassis start',
  ]

  async run() {
    if (! isChassisDir())
      this.error('Please run this command again in a Chassis directory.')

    spawn('vagrant', ['up'], {stdio: 'inherit'})
  }
}
