'use server';

import prisma from '@/lib/prisma';
import { getCurrentUserRole, requireAuthenticatedUser } from '@/lib/auth/permissions';
import { UserRole } from '@/lib/auth/roles';

type SaveEvaluationInput = {
  assignmentId: string;
  scores: {
    criterionId: string;
    score: number;
    feedback: string;
  }[];
  overallFeedback: string;
  status: 'DRAFT' | 'SUBMITTED';
};

export async function saveEvaluation(input: SaveEvaluationInput) {
  try {
    const user = await requireAuthenticatedUser();
    const role = await getCurrentUserRole();

    const assignment = await prisma.evaluatorAssignment.findUnique({
      where: { id: input.assignmentId },
      include: {
        round: { include: { criteria: true } }
      }
    });

    if (!assignment) {
      return { success: false, error: 'Assignment not found' };
    }

    const isSuperAdmin = role === UserRole.SUPER_ADMIN;
    const isAssignedEvaluator = (user as any).evaluatorProfileId === assignment.evaluatorProfileId;

    if (!isSuperAdmin && !isAssignedEvaluator) {
      return { success: false, error: 'Unauthorized to evaluate this team' };
    }

    // Validate scores are within max marks
    let totalScore = 0;
    for (const scoreInput of input.scores) {
      const crit = assignment.round.criteria.find(c => c.id === scoreInput.criterionId);
      if (!crit) return { success: false, error: 'Invalid criterion ID' };
      if (scoreInput.score > crit.maxMarks || scoreInput.score < 0) {
        return { success: false, error: `Score for ${crit.title} must be between 0 and ${crit.maxMarks}` };
      }
      totalScore += scoreInput.score;
    }

    // Transaction for upserting evaluation, scores, and feedbacks
    await prisma.$transaction(async (tx) => {
      const evaluation = await tx.evaluation.upsert({
        where: {
          evaluatorProfileId_teamId_roundId: {
            evaluatorProfileId: assignment.evaluatorProfileId,
            teamId: assignment.teamId,
            roundId: assignment.roundId,
          }
        },
        create: {
          assignmentId: assignment.id,
          evaluatorProfileId: assignment.evaluatorProfileId,
          teamId: assignment.teamId,
          roundId: assignment.roundId,
          totalScore: totalScore,
          status: input.status,
        },
        update: {
          totalScore: totalScore,
          status: input.status,
        }
      });

      // Clear existing feedbacks
      await tx.evaluationFeedback.deleteMany({
        where: { evaluationId: evaluation.id }
      });

      // Save overall feedback if present
      if (input.overallFeedback.trim()) {
        await tx.evaluationFeedback.create({
          data: {
            evaluationId: evaluation.id,
            content: input.overallFeedback,
          }
        });
      }

      // Upsert individual criterion scores and save their feedbacks
      for (const scoreInput of input.scores) {
        await tx.criterionScore.upsert({
          where: {
            evaluationId_criterionId: {
              evaluationId: evaluation.id,
              criterionId: scoreInput.criterionId,
            }
          },
          create: {
            evaluationId: evaluation.id,
            criterionId: scoreInput.criterionId,
            score: scoreInput.score,
          },
          update: {
            score: scoreInput.score,
          }
        });

        if (scoreInput.feedback.trim()) {
          await tx.evaluationFeedback.create({
            data: {
              evaluationId: evaluation.id,
              criterionId: scoreInput.criterionId,
              content: scoreInput.feedback,
            }
          });
        }
      }

      // If Super Admin override, log it
      if (isSuperAdmin && !isAssignedEvaluator) {
        const clerkUserId = user.id || (user as any).clerkUserId || 'system';
        await tx.auditLog.create({
          data: {
            clerkUserId: clerkUserId,
            userRole: role || 'UNKNOWN',
            action: 'SUPER_ADMIN_OVERRIDE_EVALUATION',
            entity: 'Evaluation',
            entityId: evaluation.id,
            oldValue: JSON.stringify({ status: input.status, newScore: totalScore })
          }
        });
      }
    });

    return { success: true };
  } catch (error) {
    console.error('Error saving evaluation:', error);
    return { success: false, error: 'Internal Server Error' };
  }
}
