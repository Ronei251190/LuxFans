let prismaClient: any;

function getPrisma() {
  if (!prismaClient) {
    const { PrismaClient } = require("@prisma/client");

    const globalForPrisma = globalThis as unknown as {
      prisma?: any;
    };

    prismaClient =
      globalForPrisma.prisma ||
      new PrismaClient({
        log: ["error"],
      });

    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = prismaClient;
    }
  }

  return prismaClient;
}

export const prisma = new Proxy(
  {},
  {
    get(_target, prop) {
      return getPrisma()[prop as keyof ReturnType<typeof getPrisma>];
    },
  }
) as any;