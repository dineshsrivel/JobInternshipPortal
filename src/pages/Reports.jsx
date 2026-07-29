import React from 'react';
import { FileBarChart } from 'lucide-react';

export const Reports = () => {
  return (
    <div className="glass-card p-8 text-center space-y-3">
      <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
        <FileBarChart className="w-6 h-6" />
      </div>
      <h2 className="text-xl font-bold text-slate-800">Reports Generation Engine</h2>
      <p className="text-xs text-slate-500 max-w-md mx-auto">
        Ready for Phase 2 implementation. Features: Download PDF, Download Excel, Print Reports across Students, Companies & Jobs.
      </p>
    </div>
  );
};
export default Reports;
