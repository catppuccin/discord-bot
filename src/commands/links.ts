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
    name: 'links',
    description: 'Sends useful links regarding the project.',
    permission: 'everyone',
    guilds: ['728269506710995034'],
    async execute(interaction: CommandInteraction) {
      await interaction.deferReply()
      await interaction.editReply(Discord.Embed({
        embed: {
          title: 'Project links',
          fields: [
            {
              name: 'Github Organization',
              value: '[catppuccin](https://github.com/catppuccin)'
            },
            {
              name: 'Project Links',
              value: 'To take a look at project links, please run `/github`!'
            },
          ],
          color: 0xA4B9EF
        }
      }))
    }
  })
}