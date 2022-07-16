import { CommandInteraction, MessageEmbed } from "discord.js";
import { Discord, Slash, SlashGroup, SlashOption } from "discordx";
import Fuse from "fuse.js";
import { Octokit } from "@octokit/rest";
import dotenv from "dotenv";

dotenv.config();
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
			const res = fuse.search(repo)[0];
			console.log(res);
			if (res instanceof Object) {
				// Result found, log it.
				const resultEmbed = new MessageEmbed()
					.setTitle("Results")
					.addFields(
						{
							name: "Repo",
							value: `[${res.item.full_name}](${res.item.html_url}#readme)` as string,
							inline: true,
						},
						{
							name: "Issues",
							value: `${res.item.open_issues_count}`,
							inline: true,
						},
						{
							name: "Stars",
							value: `${res.item.watchers_count}`,
							inline: true,
						}
					);
				interaction.editReply({
					content: `Found repo matching **${repo}**`,
					embeds: [resultEmbed],
				});
			} else {
				// Result not found, notify user.
				interaction.editReply({ content: "No results were found." });
			}
		});
	}
}
