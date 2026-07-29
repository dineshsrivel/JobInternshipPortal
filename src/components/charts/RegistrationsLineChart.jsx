import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const RegistrationsLineChart = ({ data }) => {
  return (
    <div className="glass-card p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Registration Growth Trends</h3>
          <p className="text-xs text-slate-500 font-medium">Student vs Company onboardings per month</p>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line type="monotone" dataKey="students" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} name="Students" />
            <Line type="monotone" dataKey="companies" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4 }} name="Companies" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
