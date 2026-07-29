import React from 'react';
import { Building2 } from 'lucide-react';

export const Companies = () => {
  return (
    <div className="glass-card p-8 text-center space-y-3">
      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
        <Building2 className="w-6 h-6" />
      </div>
      <h2 className="text-xl font-bold text-slate-800">Company Management Module</h2>
      <p className="text-xs text-slate-500 max-w-md mx-auto">
        Ready for Phase 2 implementation. Features: Verification Queue, Approve/Reject Actions, Industry Filter & HR Details.
      </p>
    </div>
  );
};
export default Companies;
