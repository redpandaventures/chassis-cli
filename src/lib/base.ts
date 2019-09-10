import {Command} from '@oclif/command'
import {sync as commandExists} from 'command-exists'

export default abstract class Base extends Command {
  async init() {
    if (!commandExists('vagrant'))
      this.error(`Vagrant not found!
You need Vagrant and Virtual Box to use Chassis.
Get them here: http://docs.chassis.io/en/latest/quickstart/#prerequisites`)

    return super.init()
  }
}
