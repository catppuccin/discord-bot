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
    name: 'unban',
    description: 'Unbans a specific user.',
    options: [
      {
        name: 'id',
        description: 'The id of the user that will be unbanned.',
        type: 'STRING',
        required: true,
      },
    ],
    permission: '759423014243794944',
    guilds: ['728269506710995034'],
    execute(interaction: CommandInteraction) {
      const user = interaction.options.getString('id')

      interaction.guild.bans.remove(user).then(ub => {
        interaction.reply(Discord.Embed({
          embed: {
            title: 'Successfully unbanned the user',
            color: 0xA4B9EF
          }
        }))
      }).catch(() => {
        interaction.reply(Discord.Embed({
          embed: {
            title: 'An Error Occurred!',
            color: 0xE28C8C
          }
        }))
      })
    }
  })
}