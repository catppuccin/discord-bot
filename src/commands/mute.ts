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
    name: 'mute',
    description: 'Mutes a specific user.',
    options: [
      {
        name: 'user',
        description: 'The user that will be muted.',
        type: 'USER',
        required: true,
      },
    ],
    permission: bot.configs.config.discordIds.role.moderator,
    guilds: [bot.configs.config.discordIds.guild],
    execute(interaction: CommandInteraction) {
      const user = interaction.options.getMember('user') as GuildMember

      user.roles.add(bot.configs.config.discordIds.mute).then(x => { // muted role
        interaction.reply(Discord.Embed({
          embed: {
            title: 'Successfully muted the user',
            description: `${user.toString()} was muted.`,
            color: 0xA4B9EF,
          }
        }))
      })
    }
  })
}