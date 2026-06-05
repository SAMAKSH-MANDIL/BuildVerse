export default function PendingApprovalPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="flex justify-center text-blue-500 mb-6">
          <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Account Pending Approval
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Your account has been created successfully and is currently pending review by an administrator. 
          You will gain access to the platform once your role has been assigned.
        </p>
        <div className="mt-8">
          <a href="/" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
}
