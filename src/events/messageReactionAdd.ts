import * as fs from 'fs'
import * as _ from 'lodash'
import got from 'got'
import { } from 'nanocolors'
import { Client, Message, MessageReaction, User } from 'discord.js'

import Bot from '../../modules/bot.js'
import Utils from '../../modules/utils.js'
import Log from '../../modules/loggers.js'
import Discord from '../../modules/discord.js'
import YAML from '../../modules/yaml.js'
import { Member } from '../../models/member.js'

export default (bot: Bot) => {
  bot.CreateEvent({
    name: 'messageReactionAdd',
    async execute(client: Client, reaction: MessageReaction, user: User) {      
      if (reaction.message.author?.id !== user.id) {
        let memberDB = await Member.findOne({ where: { discord: user.id } })

        if (memberDB == null) {
          await Utils.generateMember(user.id)
        }

        memberDB = await Member.findOne({ where: { discord: user.id } })

        memberDB.increment('points', { by: 20 })
      }
    }
  })
}