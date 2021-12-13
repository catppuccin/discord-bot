import * as fs from 'fs'
import got from 'got'
import _ from 'lodash'
import { } from 'nanocolors'
import { Client, GuildMember, TextChannel } from 'discord.js'

import Bot from '../../modules/bot.js'
import Utils from '../../modules/utils.js'
import Log from '../../modules/loggers.js'
import Discord from '../../modules/discord.js'
import YAML from '../../modules/yaml.js'

import Command from '../../modules/handlers/command.js'

export default (bot: Bot) => {
  bot.CreateEvent({
    name: 'guildMemberAdd',
    execute(client: Client, member: GuildMember) {
      const channel = member.guild.channels.cache.get('883049414808203265') // welcome channel

      member.roles.add('883052187293474836') // role

      ;(channel as TextChannel).send(Discord.Embed({
        embed: {
          title: 'Welcome to Catppuccin!',
          url: new URL('https://github.com/catppuccin/catppuccin'),
          description: `Welcome, <@${member}>! Catppuccin is a mid-tone dark theme with an awesome 16-color palette.`,
          color: 0xA4B9EF
        }
      }))
    }
  })
}