import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/*
  Prisma 7 uses a driver adapter for the runtime connection.
  We use @prisma/adapter-pg against DATABASE_URL (Neon pooled
  connection in production). A singleton avoids exhausting
  connections during dev hot-reloads.
*/

const connectionString = process.env.DATABASE_URL;

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createClient() {
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env (see .env.example).",
    );
  }
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
