import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, Prisma } from '@prisma/client'


const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({
    adapter: adapter,
} as Prisma.PrismaClientOptions)


async function main() {
    const allUsers = await prisma.pricetracking.findMany()
    console.log(allUsers)
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit()
    })