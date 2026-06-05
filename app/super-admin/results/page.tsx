'use client';

import { useState } from 'react';
import { publishResults } from '@/app/actions/results';
import { CheckCircle2, Lock, Share, AlertTriangle, RefreshCw } from 'lucide-react';

export default function ResultsPublicationPage() {
  const [isPublishing, setIsPublishing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handlePublish = async () => {
    if (!confirm('Are you sure you want to permanently publish these results? This will lock all scores and generate public leaderboards.')) return;
    
    setIsPublishing(true);
    setError('');
    
    try {
      const res = await publishResults();
      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.error || 'Failed to publish');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Publish Final Results</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Run final aggregations and lock the grand finale results to the public database.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6 space-y-6">
        
        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md flex items-start dark:bg-green-900/20 dark:border-green-800">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-green-800 dark:text-green-300">Results Published Successfully</h3>
              <p className="mt-1 text-sm text-green-700 dark:text-green-400">
                The final scores and ranks have been saved to the database. The public leaderboard is now live.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md flex items-start dark:bg-red-900/20 dark:border-red-800">
            <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Publication Failed</h3>
              <p className="mt-1 text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          </div>
        )}

        <div className="space-y-4 border-l-4 border-purple-500 pl-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pre-Flight Checklist</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" /> All evaluation rounds are complete.
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" /> Scoring anomalies have been reviewed.
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" /> Super Admin overrides have been applied.
            </li>
          </ul>
        </div>

        <div className="pt-6 border-t border-gray-200 dark:border-gray-700 flex gap-4">
          <button
            onClick={handlePublish}
            disabled={isPublishing || success}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-md font-medium transition-colors disabled:opacity-50"
          >
            {isPublishing ? (
              <RefreshCw className="h-5 w-5 animate-spin" />
            ) : (
              <Lock className="h-5 w-5" />
            )}
            {isPublishing ? 'Publishing...' : 'Lock & Publish Results'}
          </button>

          {success && (
            <a 
              href="/results"
              target="_blank"
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 px-6 py-2.5 rounded-md font-medium transition-colors"
            >
              <Share className="h-5 w-5" />
              View Public Page
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
