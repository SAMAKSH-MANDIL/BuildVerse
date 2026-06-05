'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { requireSuperAdmin } from '@/lib/auth/permissions';

import { CreateAssignmentsSchema, DeleteAssignmentSchema } from '@/lib/validations/schemas';
import { rateLimit } from '@/lib/security/rate-limiter';
import { requireAuthenticatedUser } from '@/lib/auth/permissions';

export async function createAssignments(evaluatorProfileId: string, roundId: string, teamIds: string[]) {
  const user = await requireAuthenticatedUser();
  await requireSuperAdmin();

  const clerkUserId = user.id || (user as any).clerkUserId || 'unknown';
  const rateLimitResult = rateLimit('createAssignments', clerkUserId, 50, 60000);
  if (!rateLimitResult.success) {
    return { success: false, error: 'Too many requests. Please slow down and try again later.' };
  }

  const validationResult = CreateAssignmentsSchema.safeParse({ evaluatorProfileId, roundId, teamIds });
  if (!validationResult.success) {
    console.error('Validation error:', validationResult.error.format());
    return { success: false, error: 'Invalid assignment parameters.' };
  }

  try {
    const data = teamIds.map((teamId) => ({
      evaluatorProfileId,
      roundId,
      teamId,
    }));

    // Atomically upsert assignments using a transaction to avoid partial completion
    await prisma.$transaction(
      data.map((assignment) =>
        prisma.evaluatorAssignment.upsert({
          where: {
            evaluatorProfileId_teamId_roundId: {
              evaluatorProfileId: assignment.evaluatorProfileId,
              teamId: assignment.teamId,
              roundId: assignment.roundId,
            }
          },
          update: {},
          create: assignment
        })
      )
    );

    revalidatePath('/super-admin/assignments');
    revalidatePath('/super-admin/finalists');
    return { success: true };
  } catch (error) {
    console.error('Failed to create assignments:', error);
    return { success: false, error: 'An error occurred while creating assignments.' };
  }
}

export async function deleteAssignment(assignmentId: string) {
  const user = await requireAuthenticatedUser();
  await requireSuperAdmin();

  const clerkUserId = user.id || (user as any).clerkUserId || 'unknown';
  const rateLimitResult = rateLimit('deleteAssignment', clerkUserId, 50, 60000);
  if (!rateLimitResult.success) {
    return { success: false, error: 'Too many requests. Please slow down.' };
  }

  const validationResult = DeleteAssignmentSchema.safeParse({ assignmentId });
  if (!validationResult.success) {
    return { success: false, error: 'Invalid assignment ID.' };
  }

  try {
    // If the evaluation is already submitted, we might not want to delete it easily, but super admin can do anything.
    await prisma.evaluatorAssignment.delete({
      where: { id: assignmentId }
    });
    revalidatePath('/super-admin/assignments');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete assignment:', error);
    return { success: false, error: 'Failed to delete assignment.' };
  }
}
