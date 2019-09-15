import {spawn} from 'child_process'

import Base from '../lib/base'

export default class Restart extends Base {
  static description = 'Restart current chassis VM'

  static examples = [
    '$ chassis restart',
  ]

  isLocalCommand = true

  async run() {
    spawn('vagrant', ['reload'], {stdio: 'inherit'})
  }
}
