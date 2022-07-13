import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashGroup, SlashOption } from "discordx";
import { PrismaClient } from "@prisma/client";
import Fuse from "fuse.js";
import { Octokit } from "@octokit/rest";
import dotenv from "dotenv";

// @ts-ignore-error
import { Interface } from "../db.ts";

dotenv.config();
const prisma = new PrismaClient();
const face = new Interface(prisma);
const octokit = new Octokit({
	auth: process.env.GH_TOKEN,
});

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
		// Send an API request to search the repos.
		interaction.reply({
			content: `Searching for repos matching **${repo}**...`,
		});
		octokit.paginate("GET /orgs/catppuccin/repos").then((repos) => {
			const options = {
				includeScore: true,
				keys: ["name", "full_name"],
			};
			const fuse = new Fuse(repos, options);
		});
	}
}
