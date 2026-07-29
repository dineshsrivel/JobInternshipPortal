import React from 'react';
import { Briefcase } from 'lucide-react';

export const Jobs = () => {
  return (
    <div className="glass-card p-8 text-center space-y-3">
      <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
        <Briefcase className="w-6 h-6" />
      </div>
      <h2 className="text-xl font-bold text-slate-800">Job Management Module</h2>
      <p className="text-xs text-slate-500 max-w-md mx-auto">
        Ready for Phase 2 implementation. Features: Job Approval, Salary Ranges, Job Type Filters, Bulk Approve & Bulk Delete.
      </p>
    </div>
  );
};
export default Jobs;
