'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { saveEvaluation } from '@/app/actions/evaluation';

type EvaluationFormProps = {
  assignment: any;
  existingEvaluation: any;
  isSuperAdmin: boolean;
};

export default function EvaluationForm({ assignment, existingEvaluation, isSuperAdmin }: EvaluationFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Initialize scores state from existing evaluation or default to 0
  const initialScores: Record<string, { score: number; feedback: string }> = {};
  assignment.round.criteria.forEach((crit: any) => {
    const existingScore = existingEvaluation?.scores?.find((s: any) => s.criterionId === crit.id);
    const existingFeedback = existingEvaluation?.feedbacks?.find((f: any) => f.criterionId === crit.id);
    initialScores[crit.id] = {
      score: existingScore ? existingScore.score : 0,
      feedback: existingFeedback?.content || ''
    };
  });

  const [scores, setScores] = useState(initialScores);
  const overallFeedbackObj = existingEvaluation?.feedbacks?.find((f: any) => f.criterionId === null);
  const [overallFeedback, setOverallFeedback] = useState(overallFeedbackObj?.content || '');
  
  const isSubmitted = existingEvaluation?.status === 'SUBMITTED';
  const isLocked = isSubmitted && !isSuperAdmin;

  const totalScore = Object.values(scores).reduce((sum, s) => sum + Number(s.score), 0);
  const maxPossibleScore = assignment.round.criteria.reduce((sum: number, c: any) => sum + c.maxMarks, 0);

  const handleScoreChange = (criterionId: string, value: number) => {
    setScores(prev => ({
      ...prev,
      [criterionId]: { ...prev[criterionId], score: value }
    }));
  };

  const handleFeedbackChange = (criterionId: string, value: string) => {
    setScores(prev => ({
      ...prev,
      [criterionId]: { ...prev[criterionId], feedback: value }
    }));
  };

  const handleSubmit = (status: 'DRAFT' | 'SUBMITTED') => {
    // Validate extreme scores require feedback
    for (const crit of assignment.round.criteria) {
      const s = scores[crit.id];
      const percent = s.score / crit.maxMarks;
      if (status === 'SUBMITTED' && (percent <= 0.2 || percent >= 0.9) && !s.feedback.trim()) {
        setError(`Please provide feedback for extreme score on "${crit.title}"`);
        return;
      }
    }

    if (status === 'SUBMITTED' && !overallFeedback.trim()) {
      setError("Overall feedback is required for final submission.");
      return;
    }

    setError(null);
    startTransition(async () => {
      const res = await saveEvaluation({
        assignmentId: assignment.id,
        scores: Object.entries(scores).map(([criterionId, data]) => ({
          criterionId,
          score: Number(data.score),
          feedback: data.feedback
        })),
        overallFeedback,
        status
      });

      if (res.success) {
        router.refresh();
        if (status === 'SUBMITTED') {
          router.push('/evaluator/dashboard');
        }
      } else {
        setError(res.error || 'Failed to save evaluation');
      }
    });
  };

  return (
    <div className="space-y-8 pb-12">
      {isLocked && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 dark:bg-yellow-900/30 dark:border-yellow-600">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                This evaluation has been submitted and is locked from further edits.
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 dark:bg-red-900/30 dark:border-red-600">
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex justify-between items-center">
          <h2 className="font-semibold text-gray-900 dark:text-white">Evaluation Criteria</h2>
          <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
            Total: {totalScore} / {maxPossibleScore}
          </div>
        </div>

        <div className="p-6 space-y-8">
          {assignment.round.criteria.map((crit: any) => (
            <div key={crit.id} className="border-b border-gray-100 dark:border-gray-700 pb-8 last:border-0 last:pb-0">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">{crit.title}</h3>
                  {crit.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{crit.description}</p>
                  )}
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white ml-4 shrink-0">
                  {scores[crit.id].score} <span className="text-sm font-normal text-gray-500">/ {crit.maxMarks}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <input 
                    type="range" 
                    min="0" 
                    max={crit.maxMarks} 
                    step="1"
                    value={scores[crit.id].score}
                    onChange={(e) => handleScoreChange(crit.id, parseInt(e.target.value, 10))}
                    disabled={isLocked}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-purple-600 disabled:opacity-50"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0</span>
                    <span>{crit.maxMarks / 2}</span>
                    <span>{crit.maxMarks}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Criterion Feedback (Required for extreme scores)
                  </label>
                  <textarea
                    rows={2}
                    value={scores[crit.id].feedback}
                    onChange={(e) => handleFeedbackChange(crit.id, e.target.value)}
                    disabled={isLocked}
                    placeholder="Provide specific feedback for this criterion..."
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <h2 className="font-semibold text-gray-900 dark:text-white">Overall Assessment</h2>
        </div>
        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Overall Feedback (Required)
          </label>
          <textarea
            rows={4}
            value={overallFeedback}
            onChange={(e) => setOverallFeedback(e.target.value)}
            disabled={isLocked}
            placeholder="Summarize your final thoughts, team strengths, and areas for improvement..."
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={() => router.push(isSuperAdmin ? '/super-admin/dashboard' : '/evaluator/dashboard')}
          className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        
        {!isLocked && (
          <>
            <button
              onClick={() => handleSubmit('DRAFT')}
              disabled={isPending}
              className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              Save as Draft
            </button>
            <button
              onClick={() => handleSubmit('SUBMITTED')}
              disabled={isPending}
              className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
            >
              {isPending ? 'Saving...' : 'Submit Final Evaluation'}
            </button>
          </>
        )}
        
        {isSuperAdmin && isSubmitted && (
          <button
            onClick={() => handleSubmit('SUBMITTED')}
            disabled={isPending}
            className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
          >
            {isPending ? 'Overriding...' : 'Force Override & Submit'}
          </button>
        )}
      </div>
    </div>
  );
}
