import * as fs from 'fs'
import got from 'got'
import _ from 'lodash'
import { } from 'nanocolors'
import { CommandInteraction, Role, TextChannel } from 'discord.js'

import Bot from '../../modules/bot.js'
import Utils from '../../modules/utils.js'
import Log from '../../modules/loggers.js'
import Discord from '../../modules/discord.js'
import YAML from '../../modules/yaml.js'

export default (bot: Bot) => {
  bot.CreateCommand({
    name: 'post',
    description: 'Posts an embed with a specific message',
    options: [
      {
        name: 'link',
        description: 'The link of the content.',
        type: 'STRING',
        required: true,
      },
      {
        name: 'title',
        description: 'The title of the post.',
        type: 'STRING',
        required: true,
      },
      {
        name: 'channel',
        description: 'The channel the post will be added to.',
        type: 'CHANNEL',
        required: true,
      },
      {
        name: 'role',
        description: 'The role that will mentioned.',
        type: 'ROLE',
        required: false,
      },
    ],
    permission: '728311845298896958',
    guilds: ['728269506710995034'],
    async execute(interaction: CommandInteraction) {
      const link = interaction.options.getString('link')
      const title = interaction.options.getString('title')
      const channel = interaction.options.getChannel('channel') as TextChannel
      const role = interaction.options.getRole('role') as Role || null

      const content = await got.get(link).text()

      await channel.send(Discord.Embed({
        ...((role != null) ? { content: role.toString() } : {}),
        embed: {
          title: title,
          description: content,
          color: 0xA4B9EF,
        },
      }))
      await interaction.reply(Discord.Embed({
        embed: {
          title: "Successfully sent the post!",
          color: 0xB3E1A3,
        },
      }))
    },
  })
}