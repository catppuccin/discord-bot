import { PrismaClient } from "@prisma/client";

export class Interface {
	prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async getChannels(): Promise<object[]> {
		const channels = await this.prisma.channel.findMany();
		return channels;
	}
	private async channelExists(query: string): Promise<boolean> {
		const result: object | null = await this.prisma.channel.findUnique({
			where: {
				cid: query,
			},
			select: {
				horni: true,
			},
		});
		return result ? true : false;
	}
	async isHorni(query: string): Promise<boolean> {
		const result = this.channelExists(query);
		if (result) {
			return result;
		} else {
			return true; // default result
		}
	}
	async setHorni(channel: string, horni: boolean) {
		await this.prisma.channel.upsert({
			where: {
				cid: channel,
			},
			update: {
				horni,
			},
			create: {
				cid: channel,
				horni,
			},
		});
	}
	async isAutoThread(query: string): Promise<boolean> {
		const result = this.channelExists(query);
		if (result) {
			return result;
		} else {
			return false; // default result
		}
	}
	async setAutoThread(channel: string, autothread: boolean) {
		await this.prisma.channel.upsert({
			where: {
				cid: channel,
			},
			update: {
				autothread,
			},
			create: {
				cid: channel,
				autothread,
			},
		});
	}
}
