import * as fs from 'fs'
import got from 'got'
import _ from 'lodash'
import { } from 'nanocolors'
import { CommandInteraction } from 'discord.js'

import Bot from '../../modules/bot.js'
import Utils from '../../modules/utils.js'
import Log from '../../modules/loggers.js'
import Discord from '../../modules/discord.js'
import YAML from '../../modules/yaml.js'

export default (bot: Bot) => {
  bot.CreateCommand({
    name: 'help',
    description: 'Sends the help menu for the bot and the project.',
    permission: 'everyone',
    guilds: ['728269506710995034'],
    async execute(interaction: CommandInteraction) {
      await interaction.deferReply()
      await interaction.editReply(Discord.Embed({
        embed: {
          title: 'Help Menu',
          description: `[Catppuccin is a community-driven mid-tone dark theme that aims to be the middle ground between low and high contrast themes, providing a warm color palette with 16 eye-candy colors that are bright enough to be visible during the day, yet pale enough to be easy on your eyes throughout the night.](https://github.com/catppuccin/catppuccin)
          
          **Commands**
          To use commands type a slash and browse for the command you want!
          
          **Links**
          Check out /links and /github!`,
          color: 0xA4B9EF
        }
      }))
    }
  })
}