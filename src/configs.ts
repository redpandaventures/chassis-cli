export const defaults = {
  name: 'chassis',
  domain: 'chassis.local',
  php: '7.3',
  multisite: 'No',
  extensions: []
}

export const php: string[] = ['5.3', '5.4', '5.5', '5.6', '7.0', '7.1', '7.2', '7.3', '7.4']

export const multisite: {name: string, value: string}[] = [
  {name: 'No.', value: 'No'},
  {name: 'Yes, with sub folder.', value: 'Yes'},
  {name: 'Yes, with sub domain.', value: 'subdomains'},
]

export const extensions: {name: string, value: string, checked: boolean}[] = [
  {
    name: 'Xdebug',
    value: 'chassis/xdebug',
    checked: false,
  }, {
    name: 'phpcs',
    value: 'chassis/phpcs',
    checked: false,
  }, {
    name: 'phpini',
    value: 'chassis/phpini',
    checked: false,
  }, {
    name: 'nodejs',
    value: 'chassis/nodejs',
    checked: false,
  }, {
    name: 'yarn',
    value: 'chassis/yarn',
    checked: false,
  }, {
    name: 'Fish',
    value: 'chassis/fish',
    checked: false,
  }, {
    name: 'Composer',
    value: 'chassis/composer',
    checked: false,
  }, {
    name: 'Tester',
    value: 'chassis/tester',
    checked: false,
  }, {
    name: 'MailHog',
    value: 'chassis/mailhog',
    checked: false,
  }, {
    name: 'SequelPro',
    value: 'chassis/sequelpro',
    checked: false,
  }, {
    name: 'Cavalcade',
    value: 'chassis/cavalcade',
    checked: false,
  }, {
    name: 'Theme Review',
    value: 'chassis/themereview',
    checked: false,
  }, {
    name: 'xhprof',
    value: 'chassis/xhprof',
    checked: false,
  }, {
    name: 'Debugging',
    value: 'chassis/debugging',
    checked: false,
  }, {
    name: 'phpMyAdmin',
    value: 'chassis/phpmyadmin',
    checked: false,
  }, {
    name: 'Query Monitor',
    value: 'chassis/query_monitor',
    checked: false,
  }, {
    name: 'memcache',
    value: 'chassis/memcache',
    checked: false,
  }, {
    name: 'db_backup',
    value: 'chassis/db_backup',
    checked: false,
  }, {
    name: 'local_dev',
    value: 'chassis/local_dev',
    checked: false,
  }
]
