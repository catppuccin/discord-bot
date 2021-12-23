import * as fs from 'fs'
import Utils from './utils.js'
import { gray, green, blue, red, white } from 'nanocolors'

const getTime = () => {
  const time = Utils.Time()
  return {
    YMD: `${time.year}-${Utils.PadWithZeros(time.month, 2)}-${Utils.PadWithZeros(time.date, 2)}`,
    HMS: `${Utils.PadWithZeros(time.hours, 2)}:${Utils.PadWithZeros(time.minutes, 2)}:${Utils.PadWithZeros(time.seconds, 2)}`,
  }
}

export default class {
  static Success(message: any) {
    const { YMD, HMS } = getTime()

    console.log(gray(`(${YMD} ${HMS}) (CODE: S) `)  + green('Catppuccin') + gray(' » ') + white(message))
    fs.appendFileSync(`./logs/console/${YMD}.txt`, `${`(${YMD} ${HMS})`} (CODE: S) Catppuccin » ${message}\n`)
  }

  static Error(message: any) {
    const { YMD, HMS } = getTime()

    console.log(gray(`(${YMD} ${HMS}) (CODE: E) `) + red('Catppuccin') + gray(' » ') + white(message))
    fs.appendFileSync(`./logs/console/${YMD}.txt`, `${`(${YMD} ${HMS})`} (CODE: E) Catppuccin » ${message}\n`)
  }

  static Info(message: any) {
    const { YMD, HMS } = getTime()

    console.log(gray(`(${YMD} ${HMS}) (CODE: I) `) + blue('Catppuccin') + gray(' » ') + white(message))
    fs.appendFileSync(`./logs/console/${YMD}.txt`, `${`(${YMD} ${HMS})`} (CODE: I) Catppuccin » ${message}\n`)
  }
}