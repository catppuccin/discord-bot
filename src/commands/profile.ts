import * as fs from 'fs'
import got from 'got'
import _ from 'lodash'
import { } from 'nanocolors'
import { CommandInteraction, GuildMember, User } from 'discord.js'

import Bot from '../../modules/bot.js'
import Utils from '../../modules/utils.js'
import Log from '../../modules/loggers.js'
import Discord from '../../modules/discord.js'
import YAML from '../../modules/yaml.js'

import { Member } from '../../models/member.js'

export default (bot: Bot) => {
  bot.CreateCommand({
    name: 'profile',
    description: 'Sends the profile of a specific user.',
    permission: 'everyone',
    guilds: ['728269506710995034'],    
    options: [
      {
        name: 'member',
        description: 'The member\'s profile that will be sent.',
        type: 'USER',
        required: false,
      },
    ],
    async execute(interaction: CommandInteraction) {
      const member = interaction.options.getMember('member') as GuildMember || null

      if (member) {
        let memberDB = await Member.findOne({ where: { discord: member.id } })

        if (memberDB == null) {
          await Utils.generateMember(member.id)
        }

        memberDB = await Member.findOne({ where: { discord: member.id } })

        const memberJSON = (memberDB.toJSON() as any)

        interaction.reply(Discord.Embed({
          embed: {
            title: member.user.tag,
            thumbnail: {
              url: new URL(`https://cdn.discordapp.com/avatars/${member.id}/${member.user.avatar}.png`),
            },
            fields: [
              {
                name: 'Points',
                value: `${memberJSON.points} 🪙`,
                inline: true,
              },
              {
                name: 'Reps',
                value: `${memberJSON.reps}`,
                inline: true,
              },
              {
                name: 'Game Wins',
                value: `${memberJSON.wins}`,
                inline: true,
              },
              {
                name: 'Game Losses',
                value: `${memberJSON.losses}`,
                inline: true,
              },
            ],
            color: 0xA4B9EF
          }
        }))
      } else {
        let memberDB = await Member.findOne({ where: { discord: interaction.member.user.id } })

        if (memberDB == null) {
          await Utils.generateMember(interaction.member.user.id)
        }

        memberDB = await Member.findOne({ where: { discord: interaction.member.user.id } })

        const memberJSON = (memberDB.toJSON() as any)

        interaction.reply(Discord.Embed({
          embed: {
            title: (interaction.member.user as User).tag,
            thumbnail: {
              url: new URL(`https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}.png`),
            },
            fields: [
              {
                name: 'Points',
                value: `${memberJSON.points} 🪙`,
                inline: true,
              },
              {
                name: 'Reps',
                value: `${memberJSON.reps}`,
                inline: true,
              },
              {
                name: 'Game Wins',
                value: `${memberJSON.wins}`,
                inline: true,
              },
              {
                name: 'Game Losses',
                value: `${memberJSON.losses}`,
                inline: true,
              },
            ],
            color: 0xA4B9EF
          }
        }))
      }
    }
  })
}