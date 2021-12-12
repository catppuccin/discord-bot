import * as fs from 'fs'
import got from 'got'
import _ from 'lodash'
import { } from 'nanocolors'
import { Client, Interaction } from 'discord.js'

import Bot from '../../modules/bot.js'
import Utils from '../../modules/utils.js'
import Log from '../../modules/loggers.js'
import Discord from '../../modules/discord.js'
import YAML from '../../modules/yaml.js'

import Command from '../../modules/handlers/command.js'

export default (bot: Bot) => {
  bot.CreateEvent({
    name: 'interactionCreate',
    execute(client: Client, interaction: Interaction) {
      if (!interaction.isCommand()) return

      const i = _.findIndex(bot.commands, {
        name: interaction.commandName,
      })

      if (i === -1) return

      try {
        bot.commands[i].execute(interaction)
      } catch (error: any) {
        Utils.Error(error)
        interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        })
      }
    }
  })
}