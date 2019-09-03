export const defaults = {
  name: 'chassis',
  domain: 'chassis.local',
  php: '7.2',
  multisite: 'No',
  extensions: ['chassis/Xdebug', 'chassis/phpcs', 'chassis/phpini', 'chassis/yarn', 'chassis/MariaDB', 'chassis/nodejs', 'chassis/Composer', 'chassis/Tester'],
}

export const php: string[] = ['5.3', '5.4', '5.5', '5.6', '7.0', '7.1', '7.2']

export const multisite: {name: string, value: string}[] = [
  {name: 'No.', value: 'No'},
  {name: 'Yes, with sub folder.', value: 'Yes'},
  {name: 'Yes, with sub domain.', value: 'subdomains'},
]

export const extensions: {name: string, value: string, checked: boolean}[] = [
  {
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
    name: 'Query Monitor',
    value: 'chassis/Query_Monitor',
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
  }
]
