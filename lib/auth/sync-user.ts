import prisma from '@/lib/prisma';
import { UserRole, UserStatus } from '../../generated/prisma';
import { clerkClient } from '@clerk/nextjs/server';

export async function syncClerkUserToDatabase(data: any) {
  const { id, email_addresses, first_name, last_name, image_url } = data;
  
  const primaryEmail = email_addresses?.find((email: any) => email.id === data.primary_email_address_id)?.email_address || email_addresses?.[0]?.email_address;
  const fullName = `${first_name || ''} ${last_name || ''}`.trim();

  // Create or update PlatformUser
  const user = await prisma.platformUser.upsert({
    where: { clerkUserId: id },
    update: {
      email: primaryEmail,
      fullName: fullName,
      imageUrl: image_url,
    },
    create: {
      clerkUserId: id,
      email: primaryEmail,
      fullName: fullName,
      imageUrl: image_url,
      role: UserRole.PENDING,
      status: UserStatus.PENDING_APPROVAL,
    },
  });

  return user;
}

export async function updateUserRole(clerkUserId: string, newRole: UserRole) {
  const client = await clerkClient();
  
  // Update Clerk metadata
  await client.users.updateUserMetadata(clerkUserId, {
    publicMetadata: {
      role: newRole,
    }
  });

  // Update Database
  const user = await prisma.platformUser.update({
    where: { clerkUserId },
    data: { role: newRole },
  });

  return user;
}

export async function updateUserStatus(clerkUserId: string, newStatus: UserStatus) {
  const client = await clerkClient();
  
  // Update Clerk metadata
  await client.users.updateUserMetadata(clerkUserId, {
    publicMetadata: {
      status: newStatus,
    }
  });

  // Update Database
  const user = await prisma.platformUser.update({
    where: { clerkUserId },
    data: { status: newStatus },
  });

  return user;
}

export async function deactivatePlatformUser(clerkUserId: string) {
  return updateUserStatus(clerkUserId, UserStatus.INACTIVE);
}

export async function assignEvaluatorProfile(clerkUserId: string, evaluatorProfileId: string) {
  const client = await clerkClient();
  
  // Update Clerk metadata
  await client.users.updateUserMetadata(clerkUserId, {
    publicMetadata: {
      evaluatorProfileId: evaluatorProfileId,
    }
  });

  // Update Database
  const user = await prisma.platformUser.update({
    where: { clerkUserId },
    data: { evaluatorProfileId },
  });

  return user;
}
