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
    name: 'announce',
    description: 'announce!',
    options: [
      {
        name: 'content',
        description: 'content of embed',
        type: 'STRING'
      }
    ],
    permission: '728311845298896958',
    guilds: ['728269506710995034'],
    execute(interaction: CommandInteraction) {
      interaction.channel.send(Discord.Embed({
        embed: {
          title: 'Announcement',
          description: interaction.options.getString('content'),
          color: 0x00AA00,
        },
      }))
      interaction.reply('Finished!')
    },
  })
}