import prisma from '@/lib/prisma';
import { requireSuperAdmin } from '@/lib/auth/permissions';
import { AssignmentManager } from './AssignmentManager';

export default async function AssignmentsPage() {
  await requireSuperAdmin();

  // Fetch all required data for assignments
  const evaluators = await prisma.evaluatorProfile.findMany({
    include: {
      PlatformUser: true,
      assignments: {
        include: {
          team: true,
          round: true,
        }
      }
    }
  });

  const teams = await prisma.team.findMany({
    orderBy: { teamCode: 'asc' }
  });

  const rounds = await prisma.evaluationRound.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Evaluator Assignments</h1>
      </div>

      <AssignmentManager 
        evaluators={evaluators.map(e => ({
          id: e.id,
          name: e.PlatformUser?.fullName || e.PlatformUser?.email || 'Unknown',
          assignments: e.assignments
        }))} 
        teams={teams.map(t => ({ id: t.id, name: t.teamName, code: t.teamCode }))} 
        rounds={rounds.map(r => ({ id: r.id, name: r.title }))} 
      />
    </div>
  );
}
