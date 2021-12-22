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
import { Member } from '../../models/member.js'

export default (bot: Bot) => {
  bot.CreateCommand({
    name: 'givepoints',
    description: 'Gives points to a specific user.',
    options: [
      {
        name: 'user',
        description: 'The user that will have their points increased.',
        type: 'USER',
        required: true
      },
      {
        name: 'amount',
        description: 'The amount of points to give.',
        type: 'NUMBER',
        required: true
      },
    ],
    permission: '759423014243794944',
    guilds: ['728269506710995034'],
    async execute(interaction: CommandInteraction) {      
      const user = interaction.options.getMember('user') as GuildMember
      const points = interaction.options.getNumber('amount') || null
      
      let memberDB = await Member.findOne({ where: { discord: user.id } })

      if (memberDB == null) {
        await Utils.generateMember(user.id)
      }

      memberDB = await Member.findOne({ where: { discord: user.id } })

      memberDB.increment('points', {by: points})

      interaction.reply(Discord.Embed({
        embed: {
          title: 'Successfully gave the user points!',
          description: `${user.toString()} was given ${points} points.`,
          color: 0xA4B9EF
        }
      }))
    }
  })
}