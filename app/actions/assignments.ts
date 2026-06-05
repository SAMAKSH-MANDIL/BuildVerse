'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { requireSuperAdmin } from '@/lib/auth/permissions';

export async function createAssignments(evaluatorProfileId: string, roundId: string, teamIds: string[]) {
  await requireSuperAdmin();

  if (!evaluatorProfileId || !roundId || !teamIds || teamIds.length === 0) {
    return { success: false, error: 'Missing required fields' };
  }

  try {
    const data = teamIds.map((teamId) => ({
      evaluatorProfileId,
      roundId,
      teamId,
    }));

    // Insert ignoring duplicates (which Prisma handles cleanly using createMany with skipDuplicates if supported, but let's use a loop with upsert or ignore constraint)
    for (const assignment of data) {
      await prisma.evaluatorAssignment.upsert({
        where: {
          evaluatorProfileId_teamId_roundId: {
            evaluatorProfileId: assignment.evaluatorProfileId,
            teamId: assignment.teamId,
            roundId: assignment.roundId,
          }
        },
        update: {},
        create: assignment
      });
    }

    revalidatePath('/super-admin/assignments');
    revalidatePath('/super-admin/finalists');
    return { success: true };
  } catch (error) {
    console.error('Failed to create assignments:', error);
    return { success: false, error: 'An error occurred while creating assignments.' };
  }
}

export async function deleteAssignment(assignmentId: string) {
  await requireSuperAdmin();

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
