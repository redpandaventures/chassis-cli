import fs from 'fs-extra'
import {homedir} from 'os'
import path from 'path'

export default class Logger {
  domain: string

  logFilePath: string

  constructor(domain: string) {
    this.domain = domain
    this.logFilePath = this.getLogFilePath()

    this.maybeCreateLogFolder()
  }

  log(message: string) {
    process.stdout.write(message + '\n')
  }

  getLogFilePath() {
    const dateNow = this.getFormattedDate(new Date())
    return path.resolve(
      homedir(),
      `.chassis/logs/${this.domain}-${dateNow}.log`
    )
  }

  getFormattedDate(date: Date) {
    return date.getFullYear()
      + '-'
      + (date.getMonth() + 1).toString().padStart(2, '0')
      + '-'
      + date.getDate().toString().padStart(2, '0')
  }

  maybeCreateLogFolder() {
    fs.mkdir(
      path.resolve(homedir(), '.chassis/logs/'),
      {recursive: true},
      (err: any) => {
        if (err)
          this.log("Can't create log folder")
      }
    )
  }

  add(data: string) {
    fs.appendFile(
      this.logFilePath,
      data,
      {flag: 'a'},
      err => {
        if (err)
          this.log("Can't create log file. Check your permission.")
      }
    )
  }
}
