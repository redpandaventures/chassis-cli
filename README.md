chassis-cli
===========

Command line interface for Chassis

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
* [Development](#development)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g chassis-cli
$ chassis COMMAND
running command...
$ chassis (-v|--version|version)
chassis-cli/1.0.0 darwin-x64 node-v10.15.1
$ chassis --help [COMMAND]
USAGE
  $ chassis COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`chassis create`](#chassis-create)
* [`chassis destroy`](#chassis-destroy)
* [`chassis extension`](#chassis-extension)
* [`chassis extension:disable`](#chassis-extensiondisable)
* [`chassis extension:enable`](#chassis-extensionenable)
* [`chassis extension:install`](#chassis-extensioninstall)
* [`chassis extension:list`](#chassis-extensionlist)
* [`chassis extension:update`](#chassis-extensionupdate)
* [`chassis help [COMMAND]`](#chassis-help-command)
* [`chassis log`](#chassis-log)
* [`chassis php`](#chassis-php)
* [`chassis provision`](#chassis-provision)
* [`chassis restart`](#chassis-restart)
* [`chassis start`](#chassis-start)
* [`chassis status`](#chassis-status)
* [`chassis stop`](#chassis-stop)

## `chassis create`

Create a new Chassis project.

```
USAGE
  $ chassis create

OPTIONS
  -D, --default                                  Create new Chassis project with default settings
  -d, --domain=domain                            Domain for this project
  -e, --extensions=extensions                    Chassis extensions. This flag can be used multiple times.
  -h, --help                                     show CLI help
  -m, --multisite=No|Yes|subdomains              Config multisite
  -n, --name=name                                Name of this project
  -p, --php=5.3|5.4|5.5|5.6|7.0|7.1|7.2|7.3|7.4  PHP version
  -s, --skipVagrant                              Skip provisioning

EXAMPLE
  $ chassis create
```

_See code: [src/commands/create.ts](https://github.com/dinhtungdu/chassis-cli/blob/v1.0.0/src/commands/create.ts)_

## `chassis destroy`

Destroy current chassis VM

```
USAGE
  $ chassis destroy

EXAMPLE
  $ chassis destroy
```

_See code: [src/commands/destroy.ts](https://github.com/dinhtungdu/chassis-cli/blob/v1.0.0/src/commands/destroy.ts)_

## `chassis extension`

Manage Chassis extensions

```
USAGE
  $ chassis extension

EXAMPLE
  $ chassis extension
```

_See code: [src/commands/extension/index.ts](https://github.com/dinhtungdu/chassis-cli/blob/v1.0.0/src/commands/extension/index.ts)_

## `chassis extension:disable`

Disable Chassis extensions

```
USAGE
  $ chassis extension:disable

EXAMPLE
  $ chassis extension:disable
```

_See code: [src/commands/extension/disable.ts](https://github.com/dinhtungdu/chassis-cli/blob/v1.0.0/src/commands/extension/disable.ts)_

## `chassis extension:enable`

Enable Chassis extensions

```
USAGE
  $ chassis extension:enable

EXAMPLE
  $ chassis extension:enable
```

_See code: [src/commands/extension/enable.ts](https://github.com/dinhtungdu/chassis-cli/blob/v1.0.0/src/commands/extension/enable.ts)_

## `chassis extension:install`

Install Chassis extensions

```
USAGE
  $ chassis extension:install

EXAMPLE
  $ chassis extension:install
```

_See code: [src/commands/extension/install.ts](https://github.com/dinhtungdu/chassis-cli/blob/v1.0.0/src/commands/extension/install.ts)_

## `chassis extension:list`

List installed Chassis extensions

```
USAGE
  $ chassis extension:list

EXAMPLE
  $ chassis extension:list
```

_See code: [src/commands/extension/list.ts](https://github.com/dinhtungdu/chassis-cli/blob/v1.0.0/src/commands/extension/list.ts)_

## `chassis extension:update`

Update Chassis extensions

```
USAGE
  $ chassis extension:update

EXAMPLE
  $ chassis extension:update
```

_See code: [src/commands/extension/update.ts](https://github.com/dinhtungdu/chassis-cli/blob/v1.0.0/src/commands/extension/update.ts)_

## `chassis help [COMMAND]`

display help for chassis

```
USAGE
  $ chassis help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

## `chassis log`

View chassis logs

```
USAGE
  $ chassis log

EXAMPLE
  $ chassis log
```

_See code: [src/commands/log.ts](https://github.com/dinhtungdu/chassis-cli/blob/v1.0.0/src/commands/log.ts)_

## `chassis php`

Change PHP version for current Chassis VM

```
USAGE
  $ chassis php

EXAMPLE
  $ chassis php
```

_See code: [src/commands/php.ts](https://github.com/dinhtungdu/chassis-cli/blob/v1.0.0/src/commands/php.ts)_

## `chassis provision`

Provision current chassis VM

```
USAGE
  $ chassis provision

EXAMPLE
  $ chassis provision
```

_See code: [src/commands/provision.ts](https://github.com/dinhtungdu/chassis-cli/blob/v1.0.0/src/commands/provision.ts)_

## `chassis restart`

Restart current chassis VM

```
USAGE
  $ chassis restart

EXAMPLE
  $ chassis restart
```

_See code: [src/commands/restart.ts](https://github.com/dinhtungdu/chassis-cli/blob/v1.0.0/src/commands/restart.ts)_

## `chassis start`

Start current chassis VM

```
USAGE
  $ chassis start

EXAMPLE
  $ chassis start
```

_See code: [src/commands/start.ts](https://github.com/dinhtungdu/chassis-cli/blob/v1.0.0/src/commands/start.ts)_

## `chassis status`

View chassis logs

```
USAGE
  $ chassis status

EXAMPLE
  $ chassis status
```

_See code: [src/commands/status.ts](https://github.com/dinhtungdu/chassis-cli/blob/v1.0.0/src/commands/status.ts)_

## `chassis stop`

Stop current chassis VM

```
USAGE
  $ chassis stop

EXAMPLE
  $ chassis stop
```

_See code: [src/commands/stop.ts](https://github.com/dinhtungdu/chassis-cli/blob/v1.0.0/src/commands/stop.ts)_
<!-- commandsstop -->

# Development
<!-- development -->
1. Clone it `git clone https://github.com/redpandaventures/chassis-cli.git`.
2. Install it: `yarn install`.
3. Link it: `npm link`.
4. Run it: `chassis`
<!-- developmentstop -->
