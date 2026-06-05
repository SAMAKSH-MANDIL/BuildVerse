import { requireAuthenticatedUser, getCurrentUserRole, checkBaseAccess } from '@/lib/auth/permissions';
import { UserRole } from '@/lib/auth/roles';
import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import EvaluationForm from './EvaluationForm';

export default async function EvaluatePage({ params }: { params: Promise<{ assignmentId: string }> }) {
  // Ensure user is authenticated and get base access
  const user = await checkBaseAccess();
  const role = await getCurrentUserRole();
  const resolvedParams = await params;
  const assignmentId = resolvedParams.assignmentId;

  // Fetch the assignment and the associated team/round/criteria
  const assignment = await prisma.evaluatorAssignment.findUnique({
    where: { id: assignmentId },
    include: {
      team: true,
      round: {
        include: {
          criteria: {
            orderBy: { order: 'asc' }
          }
        }
      },
      evaluator: {
        include: { PlatformUser: true }
      }
    }
  });

  if (!assignment) {
    return notFound();
  }

  // Authorization Check:
  // ONLY the assigned evaluator OR a Super Admin can view/edit this form.
  const isSuperAdmin = role === UserRole.SUPER_ADMIN;
  const isAssignedEvaluator = (user as any).evaluatorProfileId === assignment.evaluatorProfileId;

  if (!isSuperAdmin && !isAssignedEvaluator) {
    redirect('/unauthorized');
  }

  // Fetch existing evaluation if it exists
  const evaluation = await prisma.evaluation.findUnique({
    where: {
      evaluatorProfileId_teamId_roundId: {
        evaluatorProfileId: assignment.evaluatorProfileId,
        teamId: assignment.teamId,
        roundId: assignment.roundId,
      }
    },
    include: {
      scores: true,
      feedbacks: true
    }
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Evaluate: {assignment.team.teamName}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {assignment.round.title} | Team Code: {assignment.team.teamCode}
          </p>
        </div>
        {isSuperAdmin && !isAssignedEvaluator && (
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">
            Super Admin Override Mode
          </span>
        )}
      </div>

      <EvaluationForm 
        assignment={assignment} 
        existingEvaluation={evaluation} 
        isSuperAdmin={isSuperAdmin}
      />
    </div>
  );
}
