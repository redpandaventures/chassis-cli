import fs from 'fs-extra'
import yaml from 'js-yaml'

export async function isChassisDir() {
  let files = await fs.readdir(process.cwd())
  return files.includes('Vagrantfile')
    && files.includes('content')
    && files.includes('config.yaml')
    && files.includes('config.yaml')
    && files.includes('wp-config.php')
}

export function getLocalConfig(key = ''): any {
  try {
    const localConfig = yaml.safeLoad(fs.readFileSync('config.local.yaml', 'utf8'))
    if (key !== '' && key in localConfig)
      return localConfig[key]
    return localConfig
  } catch (e) {// tslint:disable-line
    return false
  }
}
