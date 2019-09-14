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
    if (!key)
      return localConfig

    if (key in localConfig)
      return localConfig[key]

    return []
  } catch (e) {// tslint:disable-line
    return []
  }
}

export async function updateLocalConfig(data: {[key: string]: any}) {
  const mergedData = Object.assign(getLocalConfig(), data)
  return fs.writeFile('config.local.yaml', yaml.safeDump(mergedData))
}

export function getExtensionURL(repo: string) {
  if (repo.match(/^\w+$/))
    return `https://github.com/chassis/${repo}`
  if (repo.match(/^\w+\/\w+$/))
    return `https://github.com/${repo}`

  return repo
}
