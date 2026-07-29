import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

export const Settings = () => {
  return (
    <div className="glass-card p-8 text-center space-y-3">
      <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mx-auto">
        <SettingsIcon className="w-6 h-6" />
      </div>
      <h2 className="text-xl font-bold text-slate-800">Portal Settings & Configuration</h2>
      <p className="text-xs text-slate-500 max-w-md mx-auto">
        Ready for Phase 2 implementation. Features: Portal Name, Logo Upload, SMTP Setup, Database Status, API Config, Maintenance Mode & Backups.
      </p>
    </div>
  );
};
export default Settings;
