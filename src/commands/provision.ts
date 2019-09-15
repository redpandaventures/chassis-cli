import {spawn} from 'child_process'

import Base from '../lib/base'

export default class Provision extends Base {
  static description = 'Provision current chassis VM'

  static examples = [
    '$ chassis provision',
  ]

  isLocalCommand = true

  async run() {
    spawn('vagrant', ['reload', '--provision'], {stdio: 'inherit'})
  }
}
