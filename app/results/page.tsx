import prisma from '@/lib/prisma';
import { Trophy, Medal, Award, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Grand Finale Results | BuildVerse',
};

export default async function PublicResultsPage() {
  const teams = await prisma.team.findMany({
    where: { 
      finalRank: { not: null },
      disqualified: false
    },
    orderBy: { finalRank: 'asc' },
    include: { theme: true }
  });

  const isPublished = teams.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            BuildVerse <span className="text-purple-600 dark:text-purple-400">Finale</span>
          </Link>
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full dark:bg-gray-700 dark:text-gray-300">
            Official Results
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 py-12 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
            Grand Finale Results
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            After 3 rigorous rounds of evaluation, the jury has spoken. Here are the final standings for the BuildVerse hackathon.
          </p>
        </div>

        {!isPublished ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <Trophy className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Results Not Yet Published</h2>
            <p className="text-gray-500 dark:text-gray-400">
              The jury is still finalizing the scores. Please check back later!
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Top 3 Podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-12">
              {/* 2nd Place */}
              {teams[1] && (
                <div className="order-2 md:order-1 bg-gradient-to-b from-gray-100 to-white dark:from-gray-700 dark:to-gray-800 rounded-t-2xl shadow-lg border border-gray-200 dark:border-gray-600 p-6 text-center transform md:translate-y-8">
                  <Medal className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <div className="text-2xl font-black text-gray-900 dark:text-white">{teams[1].teamName}</div>
                  <div className="text-sm font-medium text-gray-500 mt-1">{teams[1].theme?.name || 'Open Innovation'}</div>
                  <div className="mt-4 inline-block bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-1 rounded-full text-sm font-bold">
                    2nd Place
                  </div>
                </div>
              )}

              {/* 1st Place */}
              {teams[0] && (
                <div className="order-1 md:order-2 bg-gradient-to-b from-yellow-50 to-white dark:from-yellow-900/30 dark:to-gray-800 rounded-t-2xl shadow-xl border border-yellow-200 dark:border-yellow-700/50 p-8 text-center relative z-10">
                  <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-2" />
                  <div className="text-3xl font-black text-gray-900 dark:text-white">{teams[0].teamName}</div>
                  <div className="text-md font-medium text-gray-500 mt-1">{teams[0].theme?.name || 'Open Innovation'}</div>
                  <div className="mt-4 inline-block bg-yellow-400 text-yellow-900 px-6 py-1.5 rounded-full text-md font-black shadow-sm">
                    1st Place Winner
                  </div>
                </div>
              )}

              {/* 3rd Place */}
              {teams[2] && (
                <div className="order-3 md:order-3 bg-gradient-to-b from-orange-50 to-white dark:from-orange-900/20 dark:to-gray-800 rounded-t-2xl shadow-lg border border-orange-200 dark:border-orange-800/50 p-6 text-center transform md:translate-y-12">
                  <Award className="h-12 w-12 text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-black text-gray-900 dark:text-white">{teams[2].teamName}</div>
                  <div className="text-sm font-medium text-gray-500 mt-1">{teams[2].theme?.name || 'Open Innovation'}</div>
                  <div className="mt-4 inline-block bg-orange-200 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300 px-4 py-1 rounded-full text-sm font-bold">
                    3rd Place
                  </div>
                </div>
              )}
            </div>

            {/* Runner Ups List */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Full Rankings</h2>
              </div>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {teams.slice(3).map((team) => (
                  <li key={team.id} className="p-4 sm:px-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-8 text-center text-lg font-bold text-gray-400">
                        {team.finalRank}
                      </div>
                      <div>
                        <div className="text-md font-bold text-gray-900 dark:text-white">{team.teamName}</div>
                        <div className="text-xs text-gray-500">{team.theme?.name}</div>
                      </div>
                    </div>
                    {team.award && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                        {team.award}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
