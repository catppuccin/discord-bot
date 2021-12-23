import * as fs from 'fs'
import got from 'got'
import _ from 'lodash'
import { } from 'nanocolors'
import { CommandInteraction, TextChannel } from 'discord.js'

import Bot from '../../modules/bot.js'
import Utils from '../../modules/utils.js'
import Log from '../../modules/loggers.js'
import Discord from '../../modules/discord.js'
import YAML from '../../modules/yaml.js'

export default (bot: Bot) => {
  bot.CreateCommand({
    name: 'clear',
    description: 'Clears a set amount of messages.',
    options: [
      {
        name: 'quantity',
        description: 'The quantity of messages that will be deleted (must be 2-100).',
        type: 'NUMBER',
        required: true,
      }
    ],
    permission: bot.configs.config.discordIds.role.moderator,
    guilds: [bot.configs.config.discordIds.guild],
    async execute(interaction: CommandInteraction) {
      const quantity = interaction.options.getNumber('quantity')
      
      if (quantity < 2 || quantity > 100) return await interaction.reply(Discord.Embed({
        embed: {
          title: 'Invalid Quantity',
          color: 0xE28C8C
        }
      }))

      try {
        await (interaction.channel as TextChannel).bulkDelete(quantity)
      } catch (error) {
        return await interaction.reply(Discord.Embed({
          embed: {
            title: 'Messages are older than 14 days!',
            color: 0xE28C8C
          }
        }))
      }

      await interaction.reply(Discord.Embed({
        embed: {
          title: `Successfully deleted ${quantity} messages`,
          color: 0xA4B9EF
        }
      }))
    }
  })
}