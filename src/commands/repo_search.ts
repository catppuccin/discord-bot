import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashGroup, SlashOption } from "discordx";
import { PrismaClient } from "@prisma/client";

// @ts-ignore-error
import { errorHandler } from "../utils/error_handler.ts";
// @ts-ignore-error
import { Interface } from "../db.ts";

const prisma = new PrismaClient();
const face = new Interface(prisma);

/*  repo_search COMMAND
 *  Description: Searches the repos for a theme
 */

@Discord()
@SlashGroup({ name: "repo" })
export class ChannelCommands {
	@Slash("search")
	@SlashGroup("repo")
	async search_repo(
		@SlashOption("repo") repo: string,
		interaction: CommandInteraction
	): Promise<void> {
		interaction.reply("Searching...");
	}
}
