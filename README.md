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
* [`chassis hello [FILE]`](#chassis-hello-file)
* [`chassis help [COMMAND]`](#chassis-help-command)

## `chassis hello [FILE]`

describe the command here

```
USAGE
  $ chassis hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ chassis hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/dinhtungdu/chassis-cli/blob/v1.0.0/src/commands/hello.ts)_

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
<!-- commandsstop -->
