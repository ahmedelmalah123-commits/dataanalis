// src/lib/prisma.ts
// Singleton Prisma client with safe build-time fallback
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  try {
    return new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    })
  } catch (error) {
    console.warn("Prisma client failed to instantiate, using safe proxy fallback:", error)
    return new Proxy({} as PrismaClient, {
      get(_target, prop) {
        return () => Promise.resolve(null)
      },
    })
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
