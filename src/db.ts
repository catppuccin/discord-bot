import { PrismaClient } from "@prisma/client";

type dbres = {
	id: number;
	cid: string;
	hthresh: number;
	horni: boolean;
	autothread: boolean;
};
export class Interface {
	prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async getChannels(): Promise<dbres[]> {
		const channels = await this.prisma.channel.findMany();
		return channels;
	}
	private async channelExists(query: string): Promise<boolean> {
		const result: dbres | null = await this.prisma.channel.findUnique({
			where: {
				cid: query,
			},
		});
		return result ? true : false;
	}
	async isHorni(query: string): Promise<boolean> {
		const horne: dbres | null = await this.prisma.channel.findUnique({
			where: {
				cid: query,
			},
		});
		return horne ? horne.horni : true;
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
		const athread: dbres | null = await this.prisma.channel.findUnique({
			where: {
				cid: query,
			},
		});
		return athread ? athread.autothread : false;
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
