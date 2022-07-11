import { PrismaClient } from "@prisma/client";

// type for these things
type dbhorne = {
	horni: boolean;
};
type dbthread = {
	autothread: boolean;
};
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
		});
		return result ? true : false;
	}
	async isHorni(query: string): Promise<boolean> {
		const horne: dbhorne | null = await this.prisma.channel.findUnique({
			where: {
				cid: query,
			},
			select: {
				horni: true,
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
		const athread: dbthread | null = await this.prisma.channel.findUnique({
			where: {
				cid: query,
			},
			select: {
				autothread: true,
			},
		});
		return athread ? athread.autothread : true;
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
