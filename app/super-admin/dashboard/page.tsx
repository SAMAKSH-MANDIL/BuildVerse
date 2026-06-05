import { requireSuperAdmin } from '@/lib/auth/permissions';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function SuperAdminDashboard() {
  await requireSuperAdmin();

  const totalUsers = await prisma.platformUser.count();
  const totalEvaluations = await prisma.evaluation.count();

  const teams = await prisma.team.findMany({
    include: {
      theme: true,
      tracks: { include: { track: true } },
      assignments: true,
    },
    orderBy: { teamCode: 'asc' },
  });

  const totalFinalists = teams.length;
  const saasTeams = teams.filter(t => t.theme?.name === 'SaaS & Enterprise Solutions').length;
  const healthTeams = teams.filter(t => t.theme?.name === 'Healthcare Innovation').length;
  const edtechTeams = teams.filter(t => t.theme?.name === 'Education Technology (EdTech)').length;
  const agriTeams = teams.filter(t => t.theme?.name === 'AgriTech / Rural Innovation').length;
  const smartTeams = teams.filter(t => t.theme?.name === 'Smart Cities / Civic Tech').length;
  const fintechTeams = teams.filter(t => t.theme?.name === 'FinTech').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Super Admin Dashboard</h1>
        <div className="flex gap-3">
          <Link href="/super-admin/assignments" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Assign Evaluators
          </Link>
          <Link href="/super-admin/users" className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:border-gray-600 px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Manage Users
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalUsers}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase font-semibold">Platform Users</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{totalFinalists}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase font-semibold">Total Teams</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{saasTeams}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">SaaS</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{healthTeams}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Health</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{edtechTeams}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">EdTech</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{agriTeams}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">AgriTech</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{smartTeams}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Smart Cities</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{fintechTeams}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">FinTech</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Team</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Theme / Tracks</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Resources</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Attendance</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Assignments</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Progress</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {teams.length > 0 ? (
                teams.map((team) => (
                  <tr key={team.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">{team.teamCode}</div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{team.teamName}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{team.leaderName}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">{team.theme?.name || 'No Theme'}</div>
                      <div className="flex flex-wrap gap-1">
                        {team.tracks.map(t => (
                          <span key={t.trackId} className="px-2 py-0.5 text-[10px] bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded">
                            {t.track.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {team.pitchDeckUrl ? (
                        <a href={team.pitchDeckUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-xs">View Deck</a>
                      ) : (
                        <span className="text-gray-400 text-xs">No Deck</span>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        team.attendanceStatus === 'PRESENT' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        team.attendanceStatus === 'ABSENT' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {team.attendanceStatus}
                      </span>
                      {team.disqualified && (
                        <span className="ml-1 px-2 inline-flex text-xs leading-5 font-bold rounded-full bg-red-600 text-white">DQ</span>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {team.assignments.length} assigned
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-xs flex gap-1">
                        <span className={`px-1 rounded ${team.round1Status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>R1</span>
                        <span className={`px-1 rounded ${team.round2Status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>R2</span>
                        <span className={`px-1 rounded ${team.round3Status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>R3</span>
                      </div>
                      {team.finalScore !== null && (
                        <div className="text-xs mt-1 font-bold">Score: {team.finalScore.toFixed(2)}</div>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex flex-col gap-2 items-end">
                        <button className="text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                          Mark Present
                        </button>
                        <button className="text-xs text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                          Disqualify
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    No teams found. Please run the seed script.
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
