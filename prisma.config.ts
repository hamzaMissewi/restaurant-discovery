import "dotenv/config"; // ✅ CRITICAL: Load environment variables

export default {
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  // ✅ NO engine property - removed in Prisma v7
  datasource: {
    url: process.env.DATABASE_URL,
  },
};
