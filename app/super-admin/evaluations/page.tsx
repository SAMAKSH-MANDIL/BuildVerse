import { requireSuperAdmin } from '@/lib/auth/permissions';
import prisma from '@/lib/prisma';
import { detectAnomalies } from '@/lib/score-anomalies';
import { AlertCircle, Lock, Play, RefreshCw, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Evaluation Control | Super Admin',
};

export default async function EvaluationsControlPage() {
  await requireSuperAdmin();

  const rounds = await prisma.evaluationRound.findMany({
    orderBy: { createdAt: 'asc' },
    include: {
      criteria: true,
      evaluations: {
        include: { evaluator: { include: { PlatformUser: true } }, team: true }
      }
    }
  });

  const anomalies = await detectAnomalies();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Evaluation Control Center</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage round states (Pending, Active, Completed), monitor evaluator progress, and handle scoring anomalies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rounds.map((round) => {
          const submittedCount = round.evaluations.filter(e => e.status === 'SUBMITTED' || e.status === 'LOCKED').length;
          const totalEvals = round.evaluations.length; // Actually we should check total assignments for this round
          // For simplicity, we just show evaluations created (drafts + submitted)
          
          return (
            <div key={round.id} className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className={`px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center ${
                round.status === 'ACTIVE' ? 'bg-green-50 dark:bg-green-900/20' : 
                round.status === 'CLOSED' ? 'bg-purple-50 dark:bg-purple-900/20' : 
                'bg-gray-50 dark:bg-gray-900/50'
              }`}>
                <h3 className="text-md font-bold text-gray-900 dark:text-white">{round.title}</h3>
                <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                  round.status === 'ACTIVE' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                  round.status === 'CLOSED' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                  'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {round.status}
                </span>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Weighting:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{round.weighting * 100}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Total Criteria:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{round.criteria.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Submissions:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{submittedCount}</span>
                </div>
                
                <div className="pt-4 border-t border-gray-100 dark:border-gray-700 space-y-2">
                  <button disabled className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50">
                    <Play className="h-4 w-4" />
                    Activate Round
                  </button>
                  <button disabled className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 disabled:opacity-50">
                    <Lock className="h-4 w-4" />
                    Lock Evaluations
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {anomalies.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
            <h3 className="text-md font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              Scoring Anomalies Requires Attention
            </h3>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {anomalies.map((anom, idx) => (
              <li key={idx} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900 dark:text-white">{anom.teamCode}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">({anom.roundName})</span>
                    <span className={`px-2 py-0.5 text-xs font-bold rounded ${anom.severity === 'HIGH' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}`}>
                      {anom.type.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{anom.description}</p>
                </div>
                <Link 
                  href={`/super-admin/leaderboard`}
                  className="px-3 py-1.5 text-sm font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50"
                >
                  View Details
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
