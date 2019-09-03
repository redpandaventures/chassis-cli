chassis-cli
===========

Command line interface for Chassis

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
  -D, --default                                 Create new Chassis project with default settings
  -d, --domain=domain                           Domain for this project
  -e, --extensions=extensions                   Chassis extensions. This flag can be used multiple times.
  -h, --help                                    show CLI help
  -m, --multisite=No|Yes|subdomains             Config multisite
  -n, --name=name                               Name of this project
  -p, --php=5.3|5.4|5.5|5.6|7.0|7.1|7.2|7.3|7.4 PHP version
  -s, --skipVagrant                             Skip provisioning vagrant box
```

Default settings:
```
  name: chassis
  domain: chassis.local
  php: 7.3
  multisite: No
  extensions: 
    - chassis/phpini
    - chassis/Composer
    - chassis/yarn
    - chassis/nodejs
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
