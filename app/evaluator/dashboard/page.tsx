import { requireEvaluator } from '@/lib/auth/permissions';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export const metadata = {
  title: 'Evaluator Dashboard | BuildVerse',
};

export default async function EvaluatorDashboard() {
  const user = await requireEvaluator();

  const assignments = await prisma.evaluatorAssignment.findMany({
    where: {
      evaluatorProfileId: user.evaluatorProfileId || 'unmatched',
    },
    include: {
      team: {
        include: {
          evaluations: {
            where: {
              evaluatorProfileId: user.evaluatorProfileId || 'unmatched',
            }
          },
          theme: true
        }
      },
      round: true
    },
    orderBy: { team: { teamCode: 'asc' } }
  });

  // Group assignments by team so we render each assigned team once 
  // (if an evaluator is assigned to the same team for multiple rounds, we show the team once, 
  // or we could show an entry per assignment. Let's do an entry per assignment for clarity)
  const assignedTeams = assignments.map(a => ({
    ...a.team,
    assignmentId: a.id,
    assignedRound: a.round
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assigned Teams</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Team</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Theme</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Round</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Evaluate</span></th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {assignedTeams.map((team, index) => {
                const evaluation = team.evaluations[0];
                const hasDraft = evaluation?.status === 'DRAFT';
                const hasSubmitted = evaluation?.status === 'SUBMITTED';
                
                return (
                  <tr key={`${team.id}-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{team.teamName}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{team.teamCode}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {team.theme?.name || 'Unspecified'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-purple-600 dark:text-purple-400">
                      {team.assignedRound.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {hasSubmitted ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Submitted
                        </span>
                      ) : hasDraft ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                          Draft Saved
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          Not Started
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium">
                      {evaluation?.totalScore ? `${evaluation.totalScore} / 400` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        href={`/evaluator/evaluate/${team.assignmentId}`}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        {hasSubmitted ? 'View' : hasDraft ? 'Continue' : 'Evaluate'}
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {assignedTeams.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    No teams available for evaluation.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
