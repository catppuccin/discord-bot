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

export default (bot: Bot) => {
  bot.CreateEvent({
    name: 'messageCreate',
    execute(client: Client, message: Message) {
      // profanity filter
      const filter = new Filter();

      if (filter.isProfane(message.content)) {      
        const cleaned = filter.clean(message.content)

        message.channel.send(Discord.Embed({
          embed: {
            title: `${message.author.tag} used profanity!`,
            description: cleaned.replace(/\*/g, '\\*'), // fix character limits!
            color: 0xA4B9EF
          }
        }))

        message.delete()
      }

    }
  })
}