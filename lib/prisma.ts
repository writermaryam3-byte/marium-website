
// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

import { Environments } from "@/app/types/enums";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  })
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter
  });

if (process.env.NODE_ENV !== Environments.PROD) globalForPrisma.prisma = db;


