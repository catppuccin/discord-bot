import * as fs from 'fs'
import * as _ from 'lodash'
import got from 'got'
import { } from 'nanocolors'
import { Client, Message } from 'discord.js'
import Filter from 'bad-words'

import Bot from '../../modules/bot.js'
import Utils from '../../modules/utils.js'
import Log from '../../modules/loggers.js'
import Discord from '../../modules/discord.js'
import YAML from '../../modules/yaml.js'

import { Member } from '../../models/member.js'

export default (bot: Bot) => {
  bot.CreateEvent({
    name: 'messageCreate',
    async execute(client: Client, message: Message) {
      // profanity filter
      const filter = new Filter();

      if (filter.isProfane(message.content)) {      
        const cleaned = filter.clean(message.content)

        message.channel.send(Discord.Embed({
          embed: {
            title: `${message.author.tag} used profanity!`,
            description: cleaned.replace(/\*/g, '\\*'),
            color: 0xA4B9EF
          }
        }))

        message.delete()
      }

      let memberDB = await Member.findOne({ where: { discord: message.member.id } })

      if (memberDB == null) {
        await Utils.generateMember(message.member.id)
      }

      memberDB = await Member.findOne({ where: { discord: message.member.id } })

      memberDB.increment('points', { by: 5 })

    }
  })
}