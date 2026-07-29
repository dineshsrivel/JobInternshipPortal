import React from 'react';
import { FileCheck } from 'lucide-react';

export const Applications = () => {
  return (
    <div className="glass-card p-8 text-center space-y-3">
      <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
        <FileCheck className="w-6 h-6" />
      </div>
      <h2 className="text-xl font-bold text-slate-800">Application Management Module</h2>
      <p className="text-xs text-slate-500 max-w-md mx-auto">
        Ready for Phase 2 implementation. Features: Applicant Status Badges (Applied, Shortlisted, Interview, Selected, Rejected) & Resume Viewers.
      </p>
    </div>
  );
};
export default Applications;
