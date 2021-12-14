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
    name: 'unlock',
    description: 'Unlocks a specific channel.',
    permission: '759423014243794944',
    guilds: ['728269506710995034'],
    execute(interaction: CommandInteraction) { 
    ;(interaction.channel as TextChannel)
    .permissionOverwrites.create((interaction.channel as TextChannel)
    .guild.roles.cache.get('728334551012606024'), { SEND_MESSAGES: true }).then(x => { // member role
      interaction.reply(Discord.Embed({
        embed: {
          title: 'Successfully locked the channel',
          color: 0xA4B9EF,
        }
      }))
    })
    }
  })
}