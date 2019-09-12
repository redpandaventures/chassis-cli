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
    value: 'chassis/Xdebug',
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
    name: 'yarn',
    value: 'chassis/yarn',
    checked: false,
  }, {
    name: 'nodejs',
    value: 'chassis/nodejs',
    checked: false,
  }, {
    name: 'Fish',
    value: 'chassis/Fish',
    checked: false,
  }, {
    name: 'Composer',
    value: 'chassis/Composer',
    checked: false,
  }, {
    name: 'Tester',
    value: 'chassis/Tester',
    checked: false,
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
    name: 'Query Monitor',
    value: 'chassis/Query_Monitor',
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
