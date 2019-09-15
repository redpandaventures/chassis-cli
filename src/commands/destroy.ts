import {spawn} from 'child_process'

import Base from '../lib/base'

export default class Destroy extends Base {
  static description = 'Destroy current chassis VM'

  static examples = [
    '$ chassis destroy',
  ]

  isLocalCommand = true

  async run() {
    spawn('vagrant', ['destroy'], {stdio: 'inherit'})
  }
}
