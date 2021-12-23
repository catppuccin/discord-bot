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
    name: 'assigncontributor',
    description: 'Gives someone the contributor role.',
    options: [
      {
        name: 'user',
        description: 'The user that will be given the contributor role.',
        type: 'USER',
        required: true
      },
    ],
    permission: '759423014243794944',
    guilds: ['728269506710995034'],
    async execute(interaction: CommandInteraction) {      
      const user = interaction.options.getMember('user') as GuildMember
      
      user.roles.add(interaction.guild.roles.cache.find(f => f.id === '852313820177104936'))

      interaction.reply(Discord.Embed({
        embed: {
          title: 'Successfully gave the contributor role!',
          description: `Gave ${user.toString()} the contributor role!`,
          color: 0xB3E1A3
        }
      }))
    }
  })
}