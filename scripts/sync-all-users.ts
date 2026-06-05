import { loadEnvConfig } from '@next/env';
import { createClerkClient } from '@clerk/backend';
import { PrismaClient, UserRole, UserStatus } from '../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function syncAllUsers() {
  try {
    console.log('Fetching all users from Clerk...');
    const users = await clerkClient.users.getUserList({ limit: 100 });
    
    console.log(`Found ${users.data.length} users. Syncing to database...`);
    
    for (const clerkUser of users.data) {
      const primaryEmail = clerkUser.emailAddresses.find(e => e.id === clerkUser.primaryEmailAddressId)?.emailAddress || clerkUser.emailAddresses[0]?.emailAddress;
      const fullName = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim();

      const existingMetaRole = clerkUser.publicMetadata.role as UserRole;
      const existingMetaStatus = clerkUser.publicMetadata.status as UserStatus;

      await prisma.platformUser.upsert({
        where: { clerkUserId: clerkUser.id },
        update: {
          email: primaryEmail || `unknown-${clerkUser.id}@example.com`,
          fullName,
          imageUrl: clerkUser.imageUrl,
          // Preserve their existing role if they have one, otherwise fallback
          role: existingMetaRole || UserRole.PENDING,
          status: existingMetaStatus || UserStatus.PENDING_APPROVAL,
        },
        create: {
          clerkUserId: clerkUser.id,
          email: primaryEmail || `unknown-${clerkUser.id}@example.com`,
          fullName,
          imageUrl: clerkUser.imageUrl,
          role: existingMetaRole || UserRole.PENDING,
          status: existingMetaStatus || UserStatus.PENDING_APPROVAL,
        },
      });
      console.log(`Synced: ${primaryEmail} (Role: ${existingMetaRole || 'PENDING'})`);
    }
    
    console.log('Sync complete!');
  } catch (error) {
    console.error('Failed to sync users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

syncAllUsers();
