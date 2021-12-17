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
import { Member } from '../../models/member.js'

export default (bot: Bot) => {
  bot.CreateCommand({
    name: 'dice',
    description: 'Roll and dice and how a 50/50 chance is on your side!',
    options: [
      {
        name: 'amount',
        description: 'The amount of points you want to bet.',
        type: 'NUMBER',
        required: true
      },
      {
        name: 'guess',
        description: 'You must select either heads or tails.',
        type: 'STRING',
        required: true
      },
    ],
    permission: 'everyone',
    guilds: ['728269506710995034'],
    async execute(interaction: CommandInteraction) {
      const amount = interaction.options.getNumber('amount')
      const guess = interaction.options.getString('guess').toLowerCase()[0]
      const random = Utils.Random(0, 1)
      const user = (guess == 'h') ? 1 : 0
      await interaction.deferReply()

      if (amount <= 0) {
        return await interaction.editReply(Discord.Embed({
          embed: {
            color: 0xE28C8C,
            title: 'Error: Invalid Amount!',
            description: 'You must enter an amount greater than 0!'
          }
        }))
      }

      if (guess !== 'h' && guess !== 't') {
        return await interaction.editReply(Discord.Embed({
          embed: {
            color: 0xE28C8C,
            title: 'Error: Invalid Guess!',
            description: 'You must select either heads or tails!'
          }
        }))
      }

      let memberDB = await Member.findOne({ where: { discord: interaction.member.user.id } })

      if (memberDB == null) {
        await Utils.generateMember(interaction.member.user.id)
      }

      memberDB = await Member.findOne({ where: { discord: interaction.member.user.id } })

      if ((memberDB.toJSON() as any).points < amount) {
        return await interaction.editReply(Discord.Embed({
          embed: {
            color: 0xE28C8C,
            title: 'Error: Invalid Amount!',
            description: 'You must select an amount that you can cover!'
          }
        }))
      }

      if (random == user) memberDB.increment('points', {by: amount})
      else memberDB.decrement('points', {by: amount})

      await interaction.editReply(Discord.Embed({
        embed: {
          title: 'Dice Roll',
          description: `Your Points: ${((memberDB.toJSON() as any).points as number) + ((random == user) ? amount : -amount)}
          Your Bet: ${amount}
          Your Choice: ${(guess == 'h') ? 'heads' : 'tails'}
          Coin: ${(random) ? 'heads' : 'tails'}
          
          You ${(random == user) ? 'won' : 'lost'} ${amount} points!`,
          color: 0xA4B9EF
        }
      }))
    }
  })
}