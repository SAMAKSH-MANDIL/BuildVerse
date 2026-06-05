import { requireSuperAdmin } from '@/lib/auth/permissions';
import { calculateLeaderboard } from '@/lib/score-calculations';
import { detectAnomalies } from '@/lib/score-anomalies';
import { AlertTriangle, Trophy, BarChart3, TrendingUp, Users } from 'lucide-react';

export const metadata = {
  title: 'Leaderboard & Analytics | Super Admin',
};

export default async function LeaderboardPage() {
  await requireSuperAdmin();

  const scoreData = await calculateLeaderboard();
  const anomalies = await detectAnomalies();

  // Group by theme
  const themeGroups = scoreData.reduce((acc, team) => {
    acc[team.theme] = acc[team.theme] || [];
    acc[team.theme].push(team);
    return acc;
  }, {} as Record<string, typeof scoreData>);

  // Sort each theme group by rank
  Object.keys(themeGroups).forEach(theme => {
    themeGroups[theme].sort((a, b) => a.rank - b.rank);
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Live Leaderboard & Analytics</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Real-time aggregated scores across all rounds, applying 25%/30%/45% weighting logic.
        </p>
      </div>

      {anomalies.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 dark:bg-orange-900/20 dark:border-orange-800">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-orange-400 mr-2" />
            <h3 className="text-sm font-medium text-orange-800 dark:text-orange-300">
              Scoring Anomalies Detected ({anomalies.length})
            </h3>
          </div>
          <div className="mt-2 text-sm text-orange-700 dark:text-orange-400 space-y-1 pl-7">
            {anomalies.map((anom, idx) => (
              <div key={idx} className="flex justify-between items-center bg-orange-100/50 dark:bg-orange-900/50 px-3 py-2 rounded">
                <span>
                  <strong>{anom.teamCode}</strong> ({anom.type.replace('_', ' ')}): {anom.description}
                </span>
                <span className={`px-2 py-0.5 text-xs font-bold rounded ${anom.severity === 'HIGH' ? 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-300' : 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}`}>
                  {anom.severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Overall Leaderboard */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Overall Grand Finalist Rankings
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-20">Rank</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Team</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Theme</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">R1 (25%)</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">R2 (30%)</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">R3 (45%)</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Final Score</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {scoreData.map((team) => (
                <tr key={team.teamId} className={team.rank <= 3 ? "bg-yellow-50/50 dark:bg-yellow-900/10" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {team.isDisqualified ? (
                      <span className="text-red-600 font-bold text-sm">DQ</span>
                    ) : (
                      <span className={`text-lg font-bold ${team.rank === 1 ? 'text-yellow-600 dark:text-yellow-400' : team.rank === 2 ? 'text-gray-400 dark:text-gray-300' : team.rank === 3 ? 'text-orange-500 dark:text-orange-400' : 'text-gray-500'}`}>
                        #{team.rank}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">{team.teamName}</div>
                    <div className="text-xs text-gray-500">{team.teamCode}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      {team.theme}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="font-medium text-gray-900 dark:text-gray-300">
                      {team.roundScores['ROUND_1']?.averageScore.toFixed(2) || '0.00'} pts
                    </div>
                    <div className="text-xs text-gray-400">
                      Raw: {team.roundScores['ROUND_1']?.rawAverage.toFixed(1) || '0'}/{team.roundScores['ROUND_1']?.maxMarks || '0'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="font-medium text-gray-900 dark:text-gray-300">
                      {team.roundScores['ROUND_2']?.averageScore.toFixed(2) || '0.00'} pts
                    </div>
                    <div className="text-xs text-gray-400">
                      Raw: {team.roundScores['ROUND_2']?.rawAverage.toFixed(1) || '0'}/{team.roundScores['ROUND_2']?.maxMarks || '0'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="font-medium text-gray-900 dark:text-gray-300">
                      {team.roundScores['ROUND_3']?.averageScore.toFixed(2) || '0.00'} pts
                    </div>
                    <div className="text-xs text-gray-400">
                      Raw: {team.roundScores['ROUND_3']?.rawAverage.toFixed(1) || '0'}/{team.roundScores['ROUND_3']?.maxMarks || '0'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-lg font-black text-purple-600 dark:text-purple-400">
                      {team.finalScore.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
              
              {scoreData.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-500">
                    No evaluated teams yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Theme-wise Rankings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(themeGroups).map(([theme, teams]) => (
          <div key={theme} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <h3 className="text-md font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-500" />
                {theme} Bracket
              </h3>
            </div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {teams.map((team, idx) => (
                <li key={team.teamId} className="px-4 py-3 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 text-center font-bold text-sm ${idx === 0 ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-500'}`}>
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{team.teamName}</div>
                      <div className="text-xs text-gray-500">{team.teamCode}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-purple-600 dark:text-purple-400">{team.finalScore.toFixed(2)}</div>
                    <div className="text-xs text-gray-400">Overall: #{team.rank}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
