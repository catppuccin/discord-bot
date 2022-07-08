import { TextChannel } from 'discord.js'

// @ts-ignore-error
import { logChannel, errorMessage } from  "../../bot_config.js"


export function errorHandler(source: any, error: any): string {

  const timestamp = new Date(Date.now()).toUTCString()

  const fullError = `${timestamp} - ${source.member?.user.username}: ${String(error)}`

  console.log(timestamp, error)
  ;(source.client.channels.cache.get(logChannel) as TextChannel).send(fullError)

  return source.reply({ content: errorMessage, ephemeral: true })

}
