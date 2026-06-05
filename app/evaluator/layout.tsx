import { requireEvaluator } from '@/lib/auth/permissions';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default async function EvaluatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireEvaluator();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/evaluator/dashboard" className="text-xl font-bold text-gray-900 dark:text-white">
            BuildVerse <span className="text-green-600 dark:text-green-400">Evaluator</span>
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link href="/evaluator/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Dashboard</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 bg-green-100 text-green-700 px-2 py-1 rounded dark:bg-green-900 dark:text-green-300">EVALUATOR</span>
          <UserButton />
        </div>
      </header>
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        {children}
      </main>
    </div>
  );
}
