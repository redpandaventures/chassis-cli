import {Command} from '@oclif/command'
import {sync as commandExists} from 'command-exists'

import {isChassisDir} from './helpers'

export default abstract class Base extends Command {
  isLocalCommand = false

  async init() {
    if (!commandExists('vagrant'))
      this.error(
        `Vagrant not found!
You need Vagrant and Virtual Box to use Chassis.
Get them here: http://docs.chassis.io/en/latest/quickstart/#prerequisites`
      )

    if (this.isLocalCommand && !isChassisDir())
      this.error('Please run this command again in a Chassis directory.')

    return super.init()
  }
}
