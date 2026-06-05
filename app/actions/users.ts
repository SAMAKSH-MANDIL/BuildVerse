'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { requireSuperAdmin } from '@/lib/auth/permissions';
import { clerkClient } from '@clerk/nextjs/server';

export type RoleType = 'SUPER_ADMIN' | 'ADMIN' | 'EVALUATOR' | 'PENDING';

export async function updateUserRole(clerkUserId: string, newRole: RoleType) {
  const adminUser = await requireSuperAdmin();

  if (adminUser?.id === clerkUserId && newRole !== 'SUPER_ADMIN') {
    return { success: false, error: 'You cannot demote yourself to prevent locking out the only admin.' };
  }

  try {
    const client = await clerkClient();

    // 1. Update Clerk publicMetadata
    await client.users.updateUserMetadata(clerkUserId, {
      publicMetadata: {
        role: newRole,
      }
    });

    // 2. Update Prisma Database
    const updatedUser = await prisma.platformUser.update({
      where: { clerkUserId },
      data: { role: newRole as any }
    });

    // 3. Ensure evaluator profile exists if promoted
    if (newRole === 'EVALUATOR' && !updatedUser.evaluatorProfileId) {
      await prisma.evaluatorProfile.create({
        data: { PlatformUser: { connect: { id: updatedUser.id } } }
      });
    }

    revalidatePath('/super-admin/users');
    return { success: true };
  } catch (error) {
    console.error('Failed to update user role:', error);
    return { success: false, error: 'An error occurred while updating the role.' };
  }
}
