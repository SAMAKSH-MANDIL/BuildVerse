'use server';

import { requireSuperAdmin } from '@/lib/auth/permissions';
import prisma from '@/lib/prisma';
import { calculateLeaderboard } from '@/lib/score-calculations';
import { logAuditAction } from '@/lib/audit-logger';
import { revalidatePath } from 'next/cache';

export async function publishResults() {
  await requireSuperAdmin();

  try {
    // 1. Run the aggregation
    const scoreData = await calculateLeaderboard();

    // 2. Persist the final scores and ranks into the Team table
    await prisma.$transaction(
      scoreData.map(team => 
        prisma.team.update({
          where: { id: team.teamId },
          data: {
            finalScore: team.finalScore,
            finalRank: team.rank
          }
        })
      )
    );

    // 3. Log the action
    await logAuditAction(
      'RESULTS_PUBLISHED',
      'Team',
      undefined,
      { reason: `Published results for ${scoreData.length} teams.` }
    );

    revalidatePath('/super-admin/results');
    revalidatePath('/results');

    return { success: true };
  } catch (error) {
    console.error('Failed to publish results:', error);
    return { success: false, error: 'Failed to publish results' };
  }
}
