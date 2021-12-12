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
    description: 'Ping!',
    permission: 'everyone',
    guilds: ['728269506710995034'],
    execute(interaction: CommandInteraction) {
      interaction.reply('Pong.')
    }
  })
}