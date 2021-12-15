import * as fs from 'fs'
import got from 'got'
import _ from 'lodash'
import { gray } from 'nanocolors'
import { Client } from 'discord.js'

import Bot from '../../modules/bot.js'
import Utils from '../../modules/utils.js'
import Log from '../../modules/loggers.js'
import Discord from '../../modules/discord.js'
import YAML from '../../modules/yaml.js'

import {Github} from '../../models/github.js'

const getGithubData = async () => {
  const api = got('https://api.github.com/orgs/catppuccin/repos')

  const data: any[] = await api.json()

  await Utils.db.sync()

  await Github.destroy({ truncate: true })

  for (const repo of data) {
    await Github.create({
      name: repo.name,
      full_name: repo.full_name,
      link: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      issues: repo.open_issues
    })
  }

  //await db.close()
}

export default (bot: Bot) => {
  bot.CreateEvent({
    name: 'ready',
    execute(client: Client) {
      console.log('Bot ready.')
      console.log(gray('────────────────────────────────────────────────────────────────────────────'))
      Log.Success('Bot has been loaded!')
      Log.Info(`Total Guilds: ${client.guilds.cache.size}`)
      Log.Info(`Total Users: ${client.users.cache.size}`)
      Log.Info(`Total Commands: ${bot.commands.length}`)
      Log.Info(`Total Events: ${bot.events.length}`)
    
      Utils.Backup('database.db')
      setInterval(() => {
        Utils.Backup('database.db')
      }, (1000 * 60 * 60 * 24))
    
      getGithubData()
      setInterval(() => {
        getGithubData()
      }, (1000 * 60 * 60))

      ;(async () => {
        if (!client.application?.owner) await client.application?.fetch()

        for (const command of bot.commands) {
          if (command.guilds.length === 0) {
            await client.application?.commands.create(command)
          } else {
            for (const guild of command.guilds) {
              try {
                const cpermission = command.permission
                
                const c = await client.guilds.cache.get(guild)?.commands.create(command)

                if (cpermission !== 'everyone') {
                  c?.permissions.add({
                    permissions: [
                      {
                        id: cpermission,
                        type: 'ROLE',
                        permission: true,
                      },
                    ],
                  })
                }
              } catch (error) {
                Utils.Error(new Error('An error occurred while creating guild specific commands!'))
              }
            }
          }
        }
      })()
    }
  })
}