chassis-cli
===========

Command line interface for Chassis

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/chassis-cli.svg)](https://npmjs.org/package/chassis-cli)
[![Codecov](https://codecov.io/gh/dinhtungdu/chassis-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/dinhtungdu/chassis-cli)
[![Downloads/week](https://img.shields.io/npm/dw/chassis-cli.svg)](https://npmjs.org/package/chassis-cli)
[![License](https://img.shields.io/npm/l/chassis-cli.svg)](https://github.com/dinhtungdu/chassis-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
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
* [`chassis create [FILE]`](#chassis-create)
* [`chassis help [COMMAND]`](#chassis-help-command)

## `chassis create`

Create a new chassis project.

```
USAGE
  $ chassis create

OPTIONS
  -D, --default                          Create new Chassis project with default settings
  -d, --domain=domain                    Domain for this project
  -e, --extensions=extensions            Chassis extensions. This flag can be used multiple times.
  -h, --help                             show CLI help
  -m, --multisite=No|Yes|subdomains      Config multisite
  -n, --name=name                        Name of this project
  -p, --php=5.3|5.4|5.5|5.6|7.0|7.1|7.2  PHP version
  -s, --skipVagrant                      Skip provisioning vagrant box

EXAMPLE
  $ chassis create
```

_See code: [src/commands/create.ts](https://github.com/dinhtungdu/chassis-cli/blob/master/src/commands/create.ts)_

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
<!-- commandsstop -->
