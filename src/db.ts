export class Interface {
	prisma:PrismaClient;

	constructor(prisma:PrismaClient) {
		this.prisma = prisma
	}

	async getChannels():Promise<array> {
		const channels = await this.prisma.channel.findMany()
		return channels
	}
	private async channelExists(query:string):Promise<boolean> {
		const result: object | null = await this.prisma.channel.findMany({
			where: {
				cid: {
					equals: query,
				}
			},
			select: {
				horni: true,
			}
		})
		return result
	}
	async isHorni(query:string):Promise<boolean> {
		const result = this.channelExists(query)
		if (result) {
			return result.horni
		} else {
			return true //default result
		}
	}
	async setHorni(channel:string, horni:boolean) {
		await this.prisma.channel.upsert({
			where: {
				cid: channel,
			},
			update: {
				horni: horni,
			},
			create: {
				cid: channel,
				horni: horni,
			}
		})
	}
	async isAutoThread(query:string):Promise<boolean> {
		const result = this.channelExists(query)
		if (result) {
			return result.autothread
		} else {
			return false //default result
		}
	}
	async setAutoThread(channel:string, autothread:boolean) {
		await this.prisma.channel.upsert({
			data: {
				cid: channel,
				autothread: autothread,
			}
		})
	}
}
