import { PrismaClient } from "@prisma/client"

/**
 * In yarn dev, Prisma may fall in lack of connections.
 * This is why this hack is needed.
 *
 * In production, there is nothing to do.
 */

// add prisma to the NodeJS global type
interface CustomNodeJsGlobal {
  prisma: PrismaClient
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === "development") global.prisma = prisma

export default prisma
