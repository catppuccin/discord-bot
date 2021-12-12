import dotenv from 'dotenv'
dotenv.config()

import * as Discordjs from 'discord.js'
import Utils from './modules/utils.js'
import YAML from './modules/yaml.js'

import Bot from './modules/bot.js'

const client = new Discordjs.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: [
  // Discordjs.Intents.FLAGS.DIRECT_MESSAGES,
  // Discordjs.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  // Discordjs.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  Discordjs.Intents.FLAGS.GUILDS,
  // Discordjs.Intents.FLAGS.GUILD_BANS,
  // Discordjs.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  // Discordjs.Intents.FLAGS.GUILD_INTEGRATIONS,
  // Discordjs.Intents.FLAGS.GUILD_INVITES,
  Discordjs.Intents.FLAGS.GUILD_MEMBERS,
  Discordjs.Intents.FLAGS.GUILD_MESSAGES,
  Discordjs.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  // Discordjs.Intents.FLAGS.GUILD_MESSAGE_TYPING,
  // Discordjs.Intents.FLAGS.GUILD_PRESENCES,
  // Discordjs.Intents.FLAGS.GUILD_VOICE_STATES,
  // Discordjs.Intents.FLAGS.GUILD_WEBHOOKS,
] })

YAML.Generate('config', { prefix: '-' })
YAML.Generate('lang', { commands: [] })

Utils.CreateDirectory('logs')
Utils.CreateDirectory('logs/console')
Utils.CreateDirectory('backups')

const bot = new Bot(client, process.env.TOKEN, ['config', 'lang'])

bot.Start(bot)