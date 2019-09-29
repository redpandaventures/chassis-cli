import {execSync} from 'child_process'
import fs from 'fs-extra'
import yaml from 'js-yaml'
import path from 'path'

export function isChassisDir(): any {
  try {
    const files = fs.readdirSync(process.cwd())
    const gotIt = files.includes('Vagrantfile')
      && files.includes('content')
      && files.includes('config.yaml')
      && files.includes('config.yaml')
      && files.includes('wp-config.php')

    if (gotIt)
      return true

    process.chdir(path.resolve(process.cwd(), '..'))
    return isChassisDir()
  } catch (err) { // tslint:disable-line
    return false
  }
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

export function getVMStatus() {
  if (!isChassisDir())
    return 'none'

  let [status] = execSync('vagrant status --machine-readable | grep state,')
    .toString()
    .split(',')
    .slice(-1)

  return status.replace(/\r?\n|\r/, '')
}

export function rreaddirSync(dir: string, allFiles: string[] = []) {
  const files = fs.readdirSync(dir).map(f => path.join(dir, f))
  allFiles.push(...files)
  files.forEach(f => {
    fs.statSync(f).isDirectory() && rreaddirSync(f, allFiles)
  })
  return allFiles
}
