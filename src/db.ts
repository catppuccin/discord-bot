import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	const allChannels = await prisma.user.findMany()
	console.log(allChannels)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
