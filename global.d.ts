import { ApplicationCommandOptionData, BaseMessageComponentOptions, Client, CommandInteraction, MessageActionRow, MessageActionRowOptions, MessageAttachment } from 'discord.js'

declare type CommandObject = {
  name: string
  description: string
  options?: ApplicationCommandOptionData[]
  defaultPermission?: boolean
  permission: string
  guilds: string[] // put nothing for global command, if global then permissions will not work
  execute: (interaction: CommandInteraction) => void
}

declare interface EventObject {
  name: string
  execute: Function
}

declare interface BotObject {
  client: Client
  yamlFiles: string[]
}

declare interface Field {
  name: string,
  value: string,
  inline?: boolean,
}

declare interface Embed {
  color?: number
  title?: string
  url?: URL
  author?: {
    name: string
    icon_url?: URL
    url?: string
  }
  description?: string
  thumbnail?: {
    url: URL
  }
  fields?: Field[]
	image?: {
		url: URL
	}
	timestamp?: Date,
  footer?: {
		text: string,
		icon_url?: URL,
	}
}

declare interface Message {
  embed: Embed
  content?: string
  files?: MessageAttachment[]
  components?: (MessageActionRow | (Required<BaseMessageComponentOptions> & MessageActionRowOptions))[]
}

declare interface Time {
  UTC: string
  ISO: string
  TZ: string
  date: number,
  month: number,
  year: number
  hours: number,
  minutes: number,
  seconds: number,
}