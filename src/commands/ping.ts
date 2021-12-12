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
    name: 'ping',
    description: 'Tests the latency of the bot.',
    permission: 'everyone',
    guilds: ['728269506710995034'],
    async execute(interaction: CommandInteraction) {
      const t1 = new Date()
      await interaction.deferReply()
      const t2 = new Date()
      await interaction.editReply(Discord.Embed({
        embed: {
          title: 'Ping',
          fields: [
            {
              name: 'Latency',
              value: `${Math.round(t2.getMilliseconds() - t1.getMilliseconds())}ms`
            },
            {
              name: 'Heartbeat',
              value: `${Math.round(bot.client.ws.ping)}ms`
            }
          ],
          color: 0xA4B9EF
        }
      }))
    }
  })
}