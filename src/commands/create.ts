import {flags} from '@oclif/command'
import ejs from 'ejs'
import execa from 'execa'
import fs from 'fs-extra'
import inquirer from 'inquirer'
import Listr from 'listr'
import notifier from 'node-notifier'
import {homedir} from 'os'
import path from 'path'
import split from 'split'

import * as configs from '../configs'
import Base from '../lib/base'
import Logger from '../lib/logger'

export default class Create extends Base {
  static description = 'Create a new Chassis project.'

  static examples = [
    '$ chassis create ',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    name: flags.string({char: 'n', description: 'Name of this project'}),
    domain: flags.string({char: 'd', description: 'Domain for this project'}),
    php: flags.string({char: 'p', description: 'PHP version', options: configs.php}),
    multisite: flags.string({char: 'm', description: 'Config multisite', options: configs.multisite.map(option => option.value)}),
    extensions: flags.string({multiple: true, char: 'e', description: 'Chassis extensions. This flag can be used multiple times.'}),
    default: flags.boolean({char: 'D', description: 'Create new Chassis project with default settings'}),
    skipVagrant: flags.boolean({char: 's', description: 'Skip provisioning'}),
  }

  async run() {
    const {flags} = this.parse(Create)

    let responses: any = await inquirer.prompt([
      {
        name: 'name',
        message: 'What is the name of your project?',
        default: configs.defaults.name,
        when: ! flags.name && ! flags.default,
        validate: answer => {
          let match = answer.match(/^[\w-]+$/)

          if (!match)
            return 'Please enter a valid name (letters, numbers and dashes)'

          if (fs.existsSync(path.resolve(process.cwd(), answer)))
            return `A folder named ${answer} already exists. Please move or rename that folder to continue.`

          return true
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
        choices: configs.php,
        default: configs.defaults.php
      },
      {
        type: 'list',
        name: 'multisite',
        message: 'Enable multisite?',
        when: ! flags.multisite && ! flags.default,
        choices: configs.multisite,
        default: configs.defaults.multisite
      },
      {
        type: 'checkbox',
        name: 'extensions',
        message: 'Which additional extensions would you like to include?',
        when: ! flags.default,
        choices: configs.extensions,
      }
    ])

    const params = {...configs.defaults, ...responses, ...flags}
    const logger = new Logger(params.domain)
    const projectPath = path.resolve(process.cwd(), params.name)
    const cachePath = path.resolve(homedir(), '.chassis/cache/Chassis')

    logger.add(
      `Begin creating new Chassis project with params: ${JSON.stringify(params)}`
    )

    const tasks = new Listr([
      {
        title: 'Check if folder exists',
        enabled: () => !!flags.name,
        task: () => {
          if (fs.existsSync(projectPath)) {
            let message = `A folder named ${params.name} already exists. Please move or rename that folder then try again.`
            logger.add(message)
            throw new Error(message)
          }
        }
      },
      {
        title: 'Prepare Chassis',
        task: () => new Listr([
          {
            title: 'Check if cache presents',
            task: ctx => {
              if (fs.existsSync(cachePath)) {
                ctx.cached = true
                logger.add('Cache found')
              } else {
                logger.add('Cache not found')
              }
            }
          },
          {
            title: 'Validate cache',
            enabled: ctx => !!ctx.cached,
            task: ctx => execa(
              'git',
              ['status', '--porcelain'],
              {cwd: cachePath}
            ).then(result => {
              if (result.stdout !== '') {
                logger.add('Cache is invalid. Rebuid cache.')
                ctx.rebuild = true
              }
            })
          },
          {
            title: 'Check for update',
            enabled: ctx => !!ctx.cached,
            skip: ctx => !!ctx.rebuild,
            task: ctx => execa(
              'git',
              ['rev-list', '--count', '--left-only', '@{u}...HEAD'],
              {cwd: cachePath}
            ).then(result => {
              if (result.stdout !== '0') {
                logger.add('Update is available. Rebuid cache.')
                ctx.rebuild = true
              }
            })
          },
          {
            title: 'Remove the old version',
            enabled: ctx => !!ctx.rebuild,
            task: () => fs.remove(cachePath)
              .then(() => logger.add('Deleted invalid cache.'))
          },
          {
            title: 'Clone Chassis from Github',
            enabled: ctx => !!ctx.rebuild || !ctx.cached,
            task: () => {
              const subprocess = execa(
                'git',
                ['clone', 'https://github.com/Chassis/Chassis', cachePath, '--depth', '1']
              )
              if (subprocess.all)
                return subprocess!.all.pipe(split(/\r?\n/, null))
            }
          },
          {
            title: 'Copy Chassis files',
            task: () => fs.copy(
              cachePath,
              projectPath
            )
          },
        ])
      },
      {
        title: 'Create config file',
        task: () => ejs.renderFile(
          path.resolve(__dirname, '../templates/_config.local.yaml'),
          params,
          {},
          (err, str) => {
            if (err)
              throw err
            fs.writeFileSync(`${projectPath}/config.local.yaml`, str)
          }
        )
      },
      {
        title: 'Provision the new Chassis project',
        enabled: () => !flags.skipVagrant,
        task: () => {
          logger.add('Begin provisioning your new Chassis project.')
          const subprocess = execa('vagrant', ['up'], {cwd: projectPath})
          if (subprocess.all) {
            subprocess.all.pipe(logger.stream())
            return subprocess.all.pipe(split(/\r?\n/, null))
          }
        }
      },
      {
        title: `Done @ ${params.domain}`,
        enabled: () => !flags.skipVagrant,
        task: () => {
          logger.add('Provisioning completed!')
          notifier.notify({
            title: 'Provisioning completed!',
            message: 'Click to open it in the browser.',
            sound: true,
            open: `http://${params.domain}`
          })
        }
      },
    ])

    this.log(`Create new Chassis project at ${projectPath}`)

    tasks.run().catch(err => {
      this.error(err.message)
    })
  }
}
