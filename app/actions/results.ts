'use server';

import { requireSuperAdmin, requireAuthenticatedUser } from '@/lib/auth/permissions';
import prisma from '@/lib/prisma';
import { calculateLeaderboard } from '@/lib/score-calculations';
import { logAuditAction } from '@/lib/audit-logger';
import { revalidatePath } from 'next/cache';
import { rateLimit } from '@/lib/security/rate-limiter';

export async function publishResults() {
  const user = await requireAuthenticatedUser();
  await requireSuperAdmin();

  const clerkUserId = user.id || (user as any).clerkUserId || 'unknown';
  const rateLimitResult = rateLimit('publishResults', clerkUserId, 5, 60000); // 5 calls per minute
  if (!rateLimitResult.success) {
    return { success: false, error: 'Too many requests. Please slow down.' };
  }

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
