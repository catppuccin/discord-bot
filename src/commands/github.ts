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

import {Github} from '../../models/github.js'

const format = (name: string, link: string, stars: number, forks: number, issues: number): string => {
  //return `[${name}](${link}) | ⭐ ${stars} | 🍴 ${forks} | ❓ ${issues}`
  return `[${name}](${link}), ${stars} Stars, ${forks} Forks, ${issues} Issues`
}

export default (bot: Bot) => {
  bot.CreateCommand({
    name: 'github',
    description: 'Sends a link to the github account.',
    permission: 'everyone',
    guilds: ['728269506710995034'],
    async execute(interaction: CommandInteraction) {
      await interaction.deferReply()

      await Utils.db.sync()

      //await Utils.db.close()

      // const api = got('https://api.github.com/orgs/catppuccin/repos') // TODO, create a system to automatically call this url every hour and store it into the database, ensuring that we dont hit any api limits

      // const data: any[] = await api.json()
      const data: any[] = (await Github.findAll()).map(repo => repo.toJSON())

      //console.log(data)

      const main = data.filter(repo => repo.full_name === 'catppuccin/catppuccin')[0]

      await interaction.editReply(Discord.Embed({
        embed: {
          title: 'Github links',
          description: `**Main Repository**
          ${format(main.name, main.link, main.stars, main.forks, main.issues)}
          
          **Other Repositories**
          ${data.filter(repo => repo.full_name !== 'catppuccin/catppuccin')
                .sort((a, b) => b.stars - a.stars)
                .slice(0, 20)
                .map(repo => format(repo.name, repo.link, repo.stars, repo.forks, repo.issues))
                .join('\n')}
          `,
          color: 0xA4B9EF
        }
      }))
    }
  })
}