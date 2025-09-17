import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const prismaClientSingleton = () =>
  new PrismaClient({
    log: ['error', 'warn'],
    errorFormat: 'colorless',
  })

export const prisma = global.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') global.prisma = prisma


