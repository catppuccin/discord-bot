import * as fs from 'fs'
import { Sequelize } from 'sequelize'

import Log from './loggers.js'

import { Time } from '../global'

export default class Utils {
  static db: Sequelize = new Sequelize({
    storage: 'database.db',
    dialect: 'sqlite',
    logging: false
  })

  static PadWithZeros(number: number, length = 4): string {
    let n = '' + number
    while (n.length < length) {
      n = '0' + n
    }
    return n
  }

  static Time(date=new Date()): Time {
    const d = new Date(date)
    return {
      UTC: d.toUTCString(),
      ISO: d.toISOString(),
      TZ: d.toString(),
      date: d.getDate(),
      month: d.getMonth() + 1,
      year: d.getFullYear(),
      hours: d.getHours(),
      minutes: d.getMinutes(),
      seconds: d.getSeconds(),
    }
  }

  static Backup(name: string): void {
    const time = this.Time()
    const folder = `./backups/${time.month}-${time.date}-${time.year}`
    this.CreateDirectory(folder)
    fs.copyFile(name, `${folder}/${name}`, (err: Error) => {
      if (err) this.Error(err)
      Log.Success(`Created backup of ${name}`)
    })
  }

  static CreateDirectory(name: string): void {
    if (!fs.existsSync(`./${name}`)) {
      fs.mkdirSync(`./${name}`)
    }
  }

  static ConvertHexaColor(hexaColor: string): number {
    return Number(hexaColor.toUpperCase().replace('#', '0x'))
  }

  static Error(e: Error): void {
    fs.appendFileSync('errors.txt', `${Utils.Time().TZ}\n${e.stack}\n───────────────\n`)
    Log.Error('An error has occured!')
  }

  static Random(minimum: number, maximum: number): number {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
  }
  
  // https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid/2117523#2117523
  static UUID4(): string { 
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0
      const v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  static IsValidHttpURL(s: string): boolean {
    let url: URL

    try {
      url = new URL(s)
    } catch (e) {
      return false
    }

    return url.protocol === 'http:' || url.protocol === 'https:'
  }
}