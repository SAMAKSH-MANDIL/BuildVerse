import { loadEnvConfig } from '@next/env';
import { createClerkClient } from '@clerk/backend';
import { PrismaClient, UserRole, UserStatus } from '../generated/prisma';

import { PrismaPg } from '@prisma/adapter-pg';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function createSuperAdmin() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error('Usage: npm run create-super-admin <clerkUserId>');
    process.exit(1);
  }

  const clerkUserId = args[0];

  try {
    console.log(`Setting up super admin for user: ${clerkUserId}`);

    // Update Clerk metadata
    await clerkClient.users.updateUserMetadata(clerkUserId, {
      publicMetadata: {
        role: UserRole.SUPER_ADMIN,
        status: UserStatus.ACTIVE,
      }
    });

    console.log('Clerk metadata updated successfully.');

    // Fetch user details from Clerk if not already in our database
    const clerkUser = await clerkClient.users.getUser(clerkUserId);
    const primaryEmail = clerkUser.emailAddresses.find(e => e.id === clerkUser.primaryEmailAddressId)?.emailAddress || clerkUser.emailAddresses[0]?.emailAddress;
    const fullName = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim();

    // Update or Create Database Record
    const user = await prisma.platformUser.upsert({
      where: { clerkUserId },
      update: {
        role: UserRole.SUPER_ADMIN,
        status: UserStatus.ACTIVE,
      },
      create: {
        clerkUserId,
        email: primaryEmail || `unknown-${clerkUserId}@example.com`,
        fullName,
        imageUrl: clerkUser.imageUrl,
        role: UserRole.SUPER_ADMIN,
        status: UserStatus.ACTIVE,
      },
    });

    console.log('Database record updated successfully.');
    console.log('User is now SUPER_ADMIN:', user);
    
  } catch (error) {
    console.error('Failed to setup super admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createSuperAdmin();
