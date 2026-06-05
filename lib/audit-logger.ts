import prisma from '@/lib/prisma';
import { getCurrentUserRole } from '@/lib/auth/permissions';
import { auth, currentUser } from '@clerk/nextjs/server';

export type AuditActionType = 
  | 'EVALUATION_OVERRIDE'
  | 'EVALUATOR_REASSIGNED'
  | 'TEAM_DISQUALIFIED'
  | 'RESULTS_PUBLISHED'
  | 'ROUND_STATE_CHANGED';

export async function logAuditAction(
  action: AuditActionType, 
  entity: string, 
  entityId?: string,
  details?: { oldValue?: string; newValue?: string; reason?: string }
) {
  const { userId } = await auth();
  const user = await currentUser();
  
  if (!userId) {
    console.warn('AuditLog: Attempted to log action without authenticated user:', action);
    return;
  }

  try {
    const role = await getCurrentUserRole();
    const userName = user?.fullName || user?.primaryEmailAddress?.emailAddress || 'Unknown User';
    
    await prisma.auditLog.create({
      data: {
        clerkUserId: userId,
        userName,
        userRole: role || 'SYSTEM',
        action,
        entity,
        entityId,
        oldValue: details?.oldValue,
        newValue: details?.newValue,
        reason: details?.reason,
      }
    });
  } catch (error) {
    console.error('AuditLog: Failed to write audit log', error);
  }
}
