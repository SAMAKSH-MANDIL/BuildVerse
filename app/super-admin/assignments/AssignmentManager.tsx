'use client';

import { useState } from 'react';
import { createAssignments, deleteAssignment } from '@/app/actions/assignments';
import { toast } from 'react-hot-toast';

type Evaluator = {
  id: string;
  name: string;
  assignments: {
    id: string;
    team: { id: string; teamName: string; teamCode: string };
    round: { id: string; title: string };
    status: string;
  }[];
};

type AssignmentManagerProps = {
  evaluators: Evaluator[];
  teams: { id: string; name: string; code: string }[];
  rounds: { id: string; name: string }[];
};

export function AssignmentManager({ evaluators, teams, rounds }: AssignmentManagerProps) {
  const [selectedEvaluator, setSelectedEvaluator] = useState<string>('');
  const [selectedRound, setSelectedRound] = useState<string>('');
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleTeam = (teamId: string) => {
    if (selectedTeams.includes(teamId)) {
      setSelectedTeams(selectedTeams.filter(id => id !== teamId));
    } else {
      setSelectedTeams([...selectedTeams, teamId]);
    }
  };

  const handleAssign = async () => {
    if (!selectedEvaluator || !selectedRound || selectedTeams.length === 0) {
      toast.error('Please select an evaluator, a round, and at least one team.');
      return;
    }

    setIsSubmitting(true);
    const res = await createAssignments(selectedEvaluator, selectedRound, selectedTeams);
    setIsSubmitting(false);

    if (res.success) {
      toast.success('Assignments created successfully!');
      setSelectedTeams([]); // Reset team selection
    } else {
      toast.error(res.error || 'Failed to create assignments');
    }
  };

  const handleDelete = async (assignmentId: string) => {
    if (confirm('Are you sure you want to remove this assignment?')) {
      const res = await deleteAssignment(assignmentId);
      if (res.success) {
        toast.success('Assignment removed');
      } else {
        toast.error('Failed to remove assignment');
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Create New Assignment</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Evaluator</label>
              <select 
                className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                value={selectedEvaluator}
                onChange={(e) => setSelectedEvaluator(e.target.value)}
              >
                <option value="">-- Choose Evaluator --</option>
                {evaluators.map(e => (
                  <option key={e.id} value={e.id}>{e.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Round</label>
              <select 
                className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                value={selectedRound}
                onChange={(e) => setSelectedRound(e.target.value)}
              >
                <option value="">-- Choose Round --</option>
                {rounds.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex justify-between items-center">
                <span>Select Teams</span>
                <div className="flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={() => {
                      if (selectedTeams.length === teams.length) {
                        setSelectedTeams([]);
                      } else {
                        setSelectedTeams(teams.map(t => t.id));
                      }
                    }}
                    className="text-xs text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 font-medium underline"
                  >
                    {selectedTeams.length === teams.length && teams.length > 0 ? 'Deselect All' : 'Select All'}
                  </button>
                  <span className="text-purple-600 font-bold text-xs bg-purple-100 dark:bg-purple-900/30 px-2 py-0.5 rounded">
                    {selectedTeams.length} selected
                  </span>
                </div>
              </label>
              <div className="max-h-64 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md p-2 space-y-1">
                {teams.map(t => (
                  <label key={t.id} className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      checked={selectedTeams.includes(t.id)}
                      onChange={() => toggleTeam(t.id)}
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      <strong>{t.code}</strong> - {t.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button 
              onClick={handleAssign}
              disabled={isSubmitting}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50"
            >
              {isSubmitting ? 'Assigning...' : 'Assign Evaluator to Teams'}
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Current Assignments</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {evaluators.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No evaluators found. Assign the EVALUATOR role to users first.</div>
            ) : evaluators.map(evaluator => (
              <div key={evaluator.id} className="p-6">
                <h3 className="text-md font-bold text-gray-900 dark:text-white mb-3">{evaluator.name}</h3>
                {evaluator.assignments.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No teams assigned yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {evaluator.assignments.map(assignment => (
                      <div key={assignment.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md border border-gray-100 dark:border-gray-600">
                        <div>
                          <div className="text-sm font-bold text-gray-800 dark:text-gray-200">{assignment.team.teamCode}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{assignment.team.teamName}</div>
                          <div className="text-xs mt-1 text-purple-600 dark:text-purple-400 font-medium">{assignment.round.title}</div>
                        </div>
                        <button 
                          onClick={() => handleDelete(assignment.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Remove assignment"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
