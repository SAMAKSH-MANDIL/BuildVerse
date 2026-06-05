export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-red-100 dark:border-red-900">
        <div className="flex justify-center text-red-500 mb-6">
          <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Unauthorized Access
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          You do not have permission to access this page. Please contact an administrator if you believe this is an error.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a href="/dashboard" className="text-blue-600 hover:text-blue-500 font-medium bg-blue-50 px-4 py-2 rounded-md">
            Go to Dashboard
          </a>
          <a href="/" className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2">
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
}
