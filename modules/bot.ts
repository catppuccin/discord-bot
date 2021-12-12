import * as Discordjs from 'discord.js'
import * as fs from 'fs'
import logs from 'discord-logs'

import Command from './handlers/command.js'
import Event from './handlers/event.js'
import Log from './loggers.js'
import Utils from './utils.js'
import YAML from './yaml.js'

import { BotObject } from '../global' 

import * as path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


export default class Bot implements BotObject {
  public client: Discordjs.Client
  public yamlFiles: string[]

  private token: string

  public src: object[]
  public commands: Command[]
  public events: Event[]
  public configs: any

  constructor(client: Discordjs.Client, token: string, yamlFiles: string[]) {
    this.client = client
    this.token = token
    this.yamlFiles = yamlFiles

    this.src = []
    this.commands = []
    this.events = []
    this.configs = {}
  }

  async Start(bot: Bot) {
    await logs(bot.client)
    await this.YAMLFiles()

    const files: any = await this.GetSrc()
    await this.GetModules(bot, files)
    await this.StartEvents()
    await this.Login()
  }

  private async GetSrc() {
    return new Promise((resolve, reject) => {
      const getAllFiles = (dirPath: string, arrayOfFiles: string[]) => {
        const files = fs.readdirSync(path.join(__dirname, dirPath, '/'))
        arrayOfFiles = arrayOfFiles || []
        files.forEach((file: string) => {
          if (fs.statSync(path.join(__dirname, dirPath, '/', file)).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles)
          } else {
            arrayOfFiles.push(path.join(__dirname, dirPath, '/', file))
          }
        })
        return arrayOfFiles
      }
      const files: string[] = getAllFiles('../src', [])
      if (files) resolve(files)
      else reject(files)
    })
  }

  private async GetModules(bot: Bot, files: string[]) {
    return new Promise((resolve, reject) => {
      let c = 0
      files.map(file => ((process.platform == 'win32') ? 'file:\\\\\\' : '' ) + file.replace(/\.ts/g, '.js')).forEach(async (file, index) => {
        if (!file.endsWith('.js')) return
        let name = file.substring(0, file.indexOf('.js')).replace(/^.*[\\\/]/, '') 
        let module = (await import(file)).default
        await module(bot)
        this.src.push({name, file, module})
        c++
        if (c == files.length) resolve(files)
      })
    })
  }

  private async StartEvents() {
    for (const event of this.events) {
      this.client.on(event.name, event.execute.bind(null, this.client))
    }
  }

  private async Login() {
    return new Promise((resolve, reject) => {
      this.client.login(this.token)
        .catch(() => {
          const err = new Error('An Error Occurred')
          Utils.Error(err)
          reject(err)
        })
    })
  }

  private async YAMLFiles () {
    return new Promise((resolve, reject) => {
      this.yamlFiles.forEach(yaml => {
        this.configs[yaml] = YAML.Get(yaml)
      })
      resolve(this.yamlFiles)
    })
  }

  CreateCommand(command: Command) {
    this.commands.push(command)
  }

  CreateEvent(event: Event) {
    this.events.push(event)
  }
}