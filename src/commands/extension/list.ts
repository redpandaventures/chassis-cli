import fs from 'fs-extra'
import {homedir} from 'os'
import path from 'path'

import Base from '../../lib/base'
import * as helpers from '../../lib/helpers'

export default class List extends Base {
  static description = 'List installed Chassis extensions'

  static examples = [
    '$ chassis extension:list',
  ]

  async run() {
    const isGlobal = ! await helpers.isChassisDir()

    let enabledExtensions: string[] = helpers.getLocalConfig('extensions') || []

    if (isGlobal) {
      enabledExtensions = await fs.readdir(
        path.resolve(homedir(), '.chassis/extensions')
      )
    }

    this.log(`Installed ${isGlobal ? 'global ' : ''}extensions:`)

    enabledExtensions.map(extension => this.log(`- ${extension}`))
  }
}
