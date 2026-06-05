'use client';

import { useState, useTransition } from 'react';
import { updateUserRole, RoleType } from '@/app/actions/users';

export default function RoleSelect({ 
  clerkUserId, 
  currentRole 
}: { 
  clerkUserId: string, 
  currentRole: string 
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as RoleType;
    if (newRole === currentRole) return;
    
    setError(null);
    startTransition(async () => {
      const res = await updateUserRole(clerkUserId, newRole);
      if (!res.success) {
        setError(res.error || 'Failed to update role');
      }
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <select
        value={currentRole}
        onChange={handleRoleChange}
        disabled={isPending}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50"
      >
        <option value="PENDING">Pending</option>
        <option value="EVALUATOR">Evaluator</option>
        <option value="ADMIN">Admin</option>
        <option value="SUPER_ADMIN">Super Admin</option>
      </select>
      
      {isPending && <span className="text-xs text-purple-500">Updating...</span>}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
