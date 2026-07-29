import React from 'react';
import { Users } from 'lucide-react';

export const Students = () => {
  return (
    <div className="glass-card p-8 text-center space-y-3">
      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
        <Users className="w-6 h-6" />
      </div>
      <h2 className="text-xl font-bold text-slate-800">Student Management Module</h2>
      <p className="text-xs text-slate-500 max-w-md mx-auto">
        Ready for Phase 2 implementation. Features: Data Table, College Filters, Resume Preview, Skill Badges, Status Actions & CSV Export.
      </p>
    </div>
  );
};
export default Students;
