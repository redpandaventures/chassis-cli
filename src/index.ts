import * as Config from '@oclif/config'
import Help from '@oclif/plugin-help'
import inquirer from 'inquirer'

import Base from './lib/base'
import {getVMStatus, isChassisDir} from './lib/helpers'

class Chassis extends Base {
  static run(argv = process.argv.slice(2), options?: Config.LoadOptions) {
    return super.run(argv, options || module.parent && module.parent.parent && module.parent.parent.filename || __dirname)
  }

  async init() {
    let [id, ...argv] = this.argv
    await this.config.runHook('init', {id, argv})
    return super.init()
  }

  async run() {
    if (this.argv.length > 0) {
      let [id, ...argv] = this.argv
      this.parse({strict: false, '--': false, ...this.ctor as any})
      if (!this.config.findCommand(id)) {
        let topic = this.config.findTopic(id)
        if (topic) return this._help()
      }
      return this.config.runCommand(id, argv)
    }

    let choices = [
      {name: 'Create a new project (In current directory).', value: 'create'},
      {name: 'Manage extensions.', value: 'extension'},
      {name: 'View logs.', value: 'log'},
      {name: 'Exit.', value: 'exit'},
    ]

    if (isChassisDir()) {
      if (getVMStatus() === 'running') {
        choices = [{name: 'Stop VM', value: 'stop'}]
      } else {
        choices = [{name: 'Start VM', value: 'start'}]
      }
      choices = choices.concat([
        {name: 'Restart VM', value: 'restart'},
        {name: 'View VM status', value: 'status'},
        {name: 'Manage extensions.', value: 'extension'},
        {name: 'View logs.', value: 'log'},
        {name: 'Exit.', value: 'exit'},
        {name: '(Re)provision VM', value: 'provision'},
        {name: 'Destroy VM', value: 'destroy'},
      ])
    }

    let responses: any = await inquirer.prompt([
      {
        type: 'list',
        name: 'command',
        message: 'What can Chassis do for you?',
        choices,
      }
    ])

    if (responses.command === 'exit') {
      this.log('Have a great day!')
      this.exit(0)
    }

    return this.config.runCommand(responses.command)
  }

  protected _helpOverride(): boolean {
    if (['-v', '--version', 'version'].includes(this.argv[0])) return this._version() as any
    if (['-h', 'help'].includes(this.argv[0])) return true
    for (let arg of this.argv) {
      if (arg === '--help') return true
      if (arg === '--') return false
    }
    return false
  }

  protected _help() {
    const HHelp: typeof Help = require('@oclif/plugin-help').default
    const help = new HHelp(this.config)
    help.showHelp(this.argv)
    return this.exit(0)
  }
}

export function run(argv = process.argv.slice(2), options?: Config.LoadOptions) {
  return Chassis.run(argv, options)
}
