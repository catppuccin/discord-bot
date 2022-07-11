import { CommandInteraction } from "discord.js"
import { Discord, Slash, SlashGroup, SlashOption } from "discordx"
import { PrismaClient } from '@prisma/client'

// @ts-ignore-error
import { errorHandler } from  "../utils/error_handler.ts"
import { Interface } from "../db.ts"


const prisma = new PrismaClient()
const face = new Interface(prisma)


/*  isHorni COMMAND
 *  Description: Tells you if the current channel is horni.
 */


 @Discord()
 @SlashGroup({ name: "channel" })
 export class ChannelCommands {
	
	@Slash("horni")
	@SlashGroup("channel")
	async isHorni(interaction: CommandInteraction): Promise<void> {
		var res = await face.isHorni(interaction.channelId)
		if (res) {
			return interaction.reply({ content: 'Channel is horni.', ephemeral: true })
		} else {
			return interaction.reply({ content: 'Channel is *not* horni.', ephemeral: true })
		}	
	}
 }
