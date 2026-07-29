import React from 'react';
import { UserPlus, Building2, Briefcase, FileUp, Send, CheckCircle2, Clock } from 'lucide-react';
import { formatRelativeTime } from '../../utils/formatters';

export const RecentActivityTimeline = ({ activities = [] }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'STUDENT_REGISTERED':
        return { icon: UserPlus, color: 'bg-blue-50 text-blue-600 border-blue-200' };
      case 'COMPANY_REGISTERED':
        return { icon: Building2, color: 'bg-purple-50 text-purple-600 border-purple-200' };
      case 'JOB_POSTED':
        return { icon: Briefcase, color: 'bg-amber-50 text-amber-600 border-amber-200' };
      case 'RESUME_UPLOADED':
        return { icon: FileUp, color: 'bg-indigo-50 text-indigo-600 border-indigo-200' };
      case 'APPLICATION_SUBMITTED':
        return { icon: Send, color: 'bg-emerald-50 text-emerald-600 border-emerald-200' };
      case 'JOB_APPROVED':
        return { icon: CheckCircle2, color: 'bg-teal-50 text-teal-600 border-teal-200' };
      default:
        return { icon: Clock, color: 'bg-slate-50 text-slate-600 border-slate-200' };
    }
  };

  return (
    <div className="glass-card p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">Recent Portal Activity</h3>
          <p className="text-xs text-slate-500 font-medium">Real-time log of student & employer events</p>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Live Feed
        </span>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto pr-1">
        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-400 text-xs font-medium">
            No recent portal activity recorded yet.
          </div>
        ) : (
          activities.map((activity, index) => {
            const config = getActivityIcon(activity.type);
            const Icon = config.icon;

            return (
              <div key={activity.id} className="relative flex items-start gap-4 group">
                {/* Connector line */}
                {index !== activities.length - 1 && (
                  <span className="absolute left-5 top-10 bottom-0 w-[2px] bg-slate-100 -mb-6" />
                )}

                {/* Icon avatar */}
                <div className={`p-2.5 rounded-2xl border ${config.color} shrink-0 z-10 shadow-2xs group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>

                {/* Activity Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-800 truncate">{activity.title}</h4>
                    <span className="text-[10px] font-semibold text-slate-400 shrink-0">
                      {formatRelativeTime(activity.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{activity.description}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
