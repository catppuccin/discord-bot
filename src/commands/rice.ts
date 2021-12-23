import * as fs from 'fs'
import got from 'got'
import _ from 'lodash'
import { } from 'nanocolors'
import { ButtonInteraction, Client, CommandInteraction, GuildMember, Interaction, MessageActionRow, MessageButton, TextChannel } from 'discord.js'

import Bot from '../../modules/bot.js'
import Utils from '../../modules/utils.js'
import Log from '../../modules/loggers.js'
import Discord from '../../modules/discord.js'
import YAML from '../../modules/yaml.js'
import { Member } from '../../models/member.js'
import { Rice } from '../../models/rices.js'

export default (bot: Bot) => {
  bot.CreateCommand({
    name: 'rice',
    description: 'Post a rice so everyone can see it!.',
    options: [
      {
        name: 'title',
        description: 'The title of your rice.',
        type: 'STRING',
        required: true
      },
      {
        name: 'dewm',
        description: 'The desktop environment or windows manager.',
        type: 'STRING',
        required: true
      },
      {
        name: 'image',
        description: 'The image link.',
        type: 'STRING',
        required: true
      },
    ],
    permission: 'everyone',
    guilds: [bot.configs.config.discordIds.guild],
    async execute(interaction: CommandInteraction) {      
      const title = interaction.options.getString('title')
      const dewm = interaction.options.getString('dewm')
      const image = interaction.options.getString('image')
      
      if (!Utils.IsValidHttpURL(image)) return await interaction.reply(Discord.Embed({
        embed: {
          title: 'Invalid Image URL!',
          color: 0xE28C8C
        }
      }))

      const UUID4 = Utils.UUID4()

      Rice.create({
        title: title,
        dewm: dewm,
        image: image,
        user: interaction.member.user.id + '',
        uuid: UUID4,
        message: ''
      })

      ;(interaction.guild.channels.cache.find(gc => gc.id === bot.configs.config.discordIds.channel.riceVerification) as TextChannel).send(Discord.Embed({
        embed: {
          title: 'A new rice needs to be reviewed!',
          fields: [
            {
              name: 'UUID4',
              value:  `${UUID4}`
            },
            {
              name: 'User',
              value:  `${interaction.member.toString()}`
            },
            {
              name: 'Title',
              value: title + ''
            },
            {
              name: 'DE/WM',
              value: dewm + ''
            },
          ],
          image: {
            url: new URL(image)
          },
          color: 0xA4B9EF
        },
        components: [
          new MessageActionRow()
            .addComponents(
              new MessageButton()
              .setCustomId('rice-accept')
              .setLabel('Accept Rice')
              .setStyle('SUCCESS'),
              new MessageButton()
              .setCustomId('rice-deny')
              .setLabel('Deny Rice')
              .setStyle('DANGER')
            )
        ]
      }))

      interaction.reply(Discord.Embed({
        embed: {
          title: 'Awaiting review!',
          description: 'Thanks for your interest in posting your rice! Please wait as our moderators review this!',
          color: 0xA4B9EF
        }
      }))
    }
  })

  bot.CreateEvent({
    name: 'interactionCreate',
    async execute(client: Client, interaction: Interaction) {
      if (!interaction.isButton()) return

      interaction as ButtonInteraction

      if (interaction.customId === 'rice-accept') {
        const r: any = await Rice.findOne({ where: { uuid: interaction.message.embeds[0].fields[0].value }})
        const u = await interaction.guild.members.cache.find(f => f.id === r.user)

        interaction.update(Discord.Embed({
          embed: {
            title: 'Rice accepted!',
            fields: [
              {
                name: 'UUID4',
                value: `${r.uuid}`
              },
              {
                name: 'User',
                value:  `${u.toString()}`
              },
              {
                name: 'Title',
                value: r.title + ''
              },
              {
                name: 'DE/WM',
                value: r.dewm + ''
              },
            ],
            image: {
              url: new URL(r.image)
            },
            color: 0xB3E1A3
          },
          components: []
        }))

        ;(interaction.guild.channels.cache.find(f => f.id === bot.configs.config.discordIds.channel.rice) as TextChannel).send(Discord.Embed({
          embed: {
            title: r.title,
            fields: [
              {
                name: 'User',
                value: `${u.toString()}`
              },
              {
                name: 'DE/WM',
                value: r.dewm,
              },
            ],
            image: {
              url: new URL(r.image)
            },
            color: 0xA4B9EF,
          },
        })).then(async msg => {
          await msg.react('⬆')
          await msg.react('⬇')
          r.message = msg.id + ''
          await r.save();

          let memberDB = await Member.findOne({ where: { discord: r.user } })

          if (memberDB == null) {
            await Utils.generateMember(r.user)
          }
    
          memberDB = await Member.findOne({ where: { discord: r.user } })

          memberDB.increment('points', { by: 500 })
        })
      } else if (interaction.customId === 'rice-deny') {
        const r: any = await Rice.findOne({ where: { uuid: interaction.message.embeds[0].fields[0].value }})
        const u: any = await interaction.guild.members.cache.find(f => f.id === r.user)

        interaction.update(Discord.Embed({
          embed: {
            title: 'Rice denied!',
            fields: [
              {
                name: 'UUID4',
                value: `${r.uuid}`
              },
              {
                name: 'User',
                value:  `${u.toString()}`
              },
              {
                name: 'Title',
                value: r.title + ''
              },
              {
                name: 'DE/WM',
                value: r.dewm + ''
              },
            ],
            image: {
              url: new URL(r.image)
            },
            color: 0xE28C8C
          },
          components: []
        }))
      }
    }
  })
}