import {spawn} from 'child_process'

import Base from '../lib/base'

export default class Start extends Base {
  static description = 'Start current chassis VM'

  static examples = [
    '$ chassis start',
  ]

  isLocalCommand = true

  async run() {
    spawn('vagrant', ['up'], {stdio: 'inherit'})
  }
}
