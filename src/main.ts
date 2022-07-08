import "reflect-metadata"

import { dirname, importx } from "@discordx/importer"
import { Interaction, Message } from "discord.js"
import { Intents } from "discord.js"
import { Client } from "discordx"

// @ts-ignore-error
import { token } from "../bot_config.js"



export const bot = new Client({

  botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],

  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],

  silent: true,
  simpleCommand: { prefix: ";" }

})



bot.once("ready", async () => {

  await bot.guilds.fetch()
  await bot.initApplicationCommands()
  await bot.initApplicationPermissions()

  console.log("Bot started")

})



bot.on("interactionCreate", (interaction: Interaction) => {
  bot.executeInteraction(interaction)
})

bot.on("messageCreate", (message: Message) => {
  bot.executeCommand(message)
})



async function run() {

  await importx(dirname(import.meta.url) + "/{events,commands}/**/*.{ts,js}")
  await bot.login(token)

}

run()
