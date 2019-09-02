import {flags} from '@oclif/command'
import {spawn} from 'child_process'
import * as fs from 'fs'
import * as inquirer from 'inquirer'
import * as notifier from 'node-notifier'
import * as path from 'path'

import Base from '../lib/base'

export default class Create extends Base {
  static description = 'Create new chassis project'

  static examples = [
    '$ chassis create ',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    name: flags.string({char: 'n', description: 'Name of this project'}),
    domain: flags.string({char: 'd', description: 'Domain for this project'}),
    php: flags.string({char: 'p', description: 'PHP version'}),
    multisite: flags.string({char: 'm', description: 'Config multisite'}),
    extensions: flags.string({char: 'e', description: 'Install Chassis extensions'}),
    default: flags.string({char: 'D', description: 'Create new Chassis project with default settings'}),
  }

  async run() {
    const {flags} = this.parse(Create)

    const defaults = {
      name: 'chassis',
      domain: '',
      php: '7.2',
      multisite: 'no',
      extensions: [],
    }

    let responses: any = await inquirer.prompt([
      {
        name: 'name',
        message: 'What is the name of your project?',
        default: defaults.name,
        when: ! flags.name && ! flags.default,
        validate: answer => {
          let match = answer.match(/^[\w-]+$/)
          return (match) ? true : 'Please enter a valid name (letters, numbers and dashes)'
        },
      },
      {
        name: 'domain',
        message: 'What domain would you like to use?',
        default: ({name = ''}: {name: string}): string => {
          if (name)
            return `${name}.local`
          return `${flags.name}.local`
        },
        when: ! flags.domain && ! flags.default,
        validate: answer => {
          let match = answer.match(/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/)
          return (match) ? true : 'Please enter a valid domain'
        },
      },
      {
        type: 'list',
        name: 'php',
        message: 'Which PHP version would you like to use?',
        when: ! flags.php && ! flags.default,
        choices: ['5.3', '5.4', '5.5', '5.6', '7.0', '7.1', '7.2'],
        default: defaults.php
      },
      {
        type: 'list',
        name: 'multisite',
        message: 'Enable multisite?',
        when: ! flags.multisite && ! flags.default,
        choices: [
          {name: 'No.', value: 'no'},
          {name: 'Yes, with sub folder.', value: 'subfolder'},
          {name: 'Yes, with sub domain.', value: 'subdomain'},
        ],
        default: defaults.multisite
      },
      {
        type: 'checkbox',
        name: 'extensions',
        message: 'Which additional extensions would you like to include?',
        when: ! flags.default,
        choices: [{
          name: 'Xdebug',
          value: 'chassis/Xdebug',
          checked: true,
        }, {
          name: 'phpcs',
          value: 'chassis/phpcs',
          checked: true,
        }, {
          name: 'phpini',
          value: 'chassis/phpini',
          checked: true,
        }, {
          name: 'yarn',
          value: 'chassis/yarn',
          checked: true,
        }, {
          name: 'MariaDB',
          value: 'chassis/MariaDB',
          checked: true,
        }, {
          name: 'nodejs',
          value: 'chassis/nodejs',
          checked: true,
        }, {
          name: 'Fish',
          value: 'chassis/Fish',
          checked: true,
        }, {
          name: 'Composer',
          value: 'chassis/Composer',
          checked: true,
        }, {
          name: 'Tester',
          value: 'chassis/Tester',
          checked: true,
        }, {
          name: 'MailHog',
          value: 'chassis/MailHog',
          checked: false,
        }, {
          name: 'SequelPro',
          value: 'chassis/SequelPro',
          checked: false,
        }, {
          name: 'Cavalcade',
          value: 'chassis/Cavalcade',
          checked: false,
        }, {
          name: 'Theme Review',
          value: 'chassis/ThemeReview',
          checked: false,
        }, {
          name: 'xhprof',
          value: 'chassis/xhprof',
          checked: false,
        }, {
          name: 'Debugging',
          value: 'chassis/Debugging',
          checked: false,
        }, {
          name: 'phpMyAdmin',
          value: 'chassis/phpMyAdmin',
          checked: false,
        }, {
          name: 'Query-Monitor',
          value: 'chassis/Query-Monitor',
          checked: false,
        }, {
          name: 'memcache',
          value: 'chassis/memcache',
          checked: false,
        }, {
          name: 'db-backup',
          value: 'chassis/db-backup',
          checked: false,
        }, {
          name: 'local-dev',
          value: 'chassis/local-dev',
          checked: false,
        }, {
          name: 'VIP-Classic',
          value: 'stuartshields/chassis-vip-classic',
          checked: false,
        }]
      }
    ])

    const params = {...defaults, ...responses, ...flags}
    const projectPath = path.resolve(process.cwd(), params.name)

    if(fs.existsSync(projectPath))
      this.error(`A folder named ${params.name} already exists. Please move or rename that folder to continue.`)

    notifier.notify({
      title: 'Completed!',
      message: 'Your new Chassis project is ready',
      sound: true,
      open: '',
    })
  }
}
