import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const TopHiringBarChart = ({ data }) => {
  return (
    <div className="glass-card p-6 flex flex-col justify-between">
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-900">Top Hiring Employers</h3>
        <p className="text-xs text-slate-500 font-medium">Companies with highest candidate hires</p>
      </div>

      <div className="h-64 w-full flex items-center justify-center">
        {(!data || data.length === 0) ? (
          <p className="text-xs text-slate-400 font-medium">No hiring employer data recorded yet</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 10, left: 30, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
              <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tick={{ fill: '#334155', fontSize: 11, fontWeight: 600 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="hires" fill="#2563EB" radius={[0, 8, 8, 0]} name="Successful Hires" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
