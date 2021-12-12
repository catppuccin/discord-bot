import { ApplicationCommandOptionData, CommandInteraction } from 'discord.js'
import { CommandObject } from '../../global' 

export default class Command implements CommandObject {
  name: string
  description: string
  options?: ApplicationCommandOptionData[]
  defaultPermission?: boolean
  permission: string
  guilds: string[] // put nothing for global command, if global then permissions will not work
  execute: (interaction: CommandInteraction) => void
  
  constructor(command: CommandObject) {
    this.name = command.name
    this.description = command.description
    this.options = command.options
    this.defaultPermission = command.defaultPermission
    this.permission = command.permission
    this.guilds = command.guilds
    this.execute = command.execute
  }
}