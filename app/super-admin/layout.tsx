import { requireSuperAdmin } from '@/lib/auth/permissions';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireSuperAdmin();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/super-admin/dashboard" className="text-xl font-bold text-gray-900 dark:text-white">
            BuildVerse <span className="text-purple-600 dark:text-purple-400">Super Admin</span>
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link href="/super-admin/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Dashboard</Link>
            <Link href="/super-admin/finalists" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Finalists</Link>
            <Link href="/super-admin/users" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Users</Link>
            <Link href="/super-admin/evaluations" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Evaluations</Link>
            <Link href="/super-admin/leaderboard" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Leaderboard</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 bg-purple-100 text-purple-700 px-2 py-1 rounded dark:bg-purple-900 dark:text-purple-300">SUPER_ADMIN</span>
          <UserButton />
        </div>
      </header>
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        {children}
      </main>
    </div>
  );
}
