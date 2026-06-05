import { loadEnvConfig } from '@next/env';
import { PrismaClient } from '../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    // Perform a simple read query to verify connection
    await prisma.platformUser.findFirst();
    console.log('✅ Connected');
  } catch (error) {
    console.error('❌ Connection failed:');
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
