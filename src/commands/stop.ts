import {spawn} from 'child_process'

import Base from '../lib/base'

export default class Stop extends Base {
  static description = 'Stop current chassis VM'

  static examples = [
    '$ chassis stop',
  ]

  isLocalCommand = true

  async run() {
    spawn('vagrant', ['halt'], {stdio: 'inherit'})
  }
}
