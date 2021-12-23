import * as fs from 'fs'
import got from 'got'
import _ from 'lodash'
import { } from 'nanocolors'
import { CommandInteraction, GuildMember } from 'discord.js'

import Bot from '../../modules/bot.js'
import Utils from '../../modules/utils.js'
import Log from '../../modules/loggers.js'
import Discord from '../../modules/discord.js'
import YAML from '../../modules/yaml.js'

export default (bot: Bot) => {
  bot.CreateCommand({
    name: 'ban',
    description: 'Bans a specific user.',
    options: [
      {
        name: 'user',
        description: 'The user that will be banned.',
        type: 'USER',
        required: true
      },
      {
        name: 'length',
        description: 'The length of the ban (in days).',
        type: 'NUMBER',
        required: true
      },
      {
        name: 'reason',
        description: 'The reason for the ban.',
        type: 'STRING',
        required: false
      },
    ],
    permission: bot.configs.config.discordIds.role.moderator,
    guilds: [bot.configs.config.discordIds.guild],
    async execute(interaction: CommandInteraction) {      
      const user = interaction.options.getMember('user') as GuildMember
      const reason = interaction.options.getString('reason') || null
      const length = interaction.options.getNumber('length') || null
      
      if (length <= 0 && length != null) return await interaction.reply(Discord.Embed({
        embed: {
          title: 'Invalid Length',
          color: 0xE28C8C
        }
      }))

      user.ban({ days: length, reason: reason }).then(b => {
        interaction.reply(Discord.Embed({
          embed: {
            title: 'Successfully banned the user',
            description: `${user.toString()} was banned${(reason) ? ` for reason of ${reason}` : ''}${(length) ? ` for ${length} days` : ''}.`,
            color: 0xA4B9EF
          }
        }))
      })
    }
  })
}