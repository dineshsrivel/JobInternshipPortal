import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export const ApplicationStatusPieChart = ({ data }) => {
  return (
    <div className="glass-card p-6 flex flex-col justify-between">
      <div className="mb-2">
        <h3 className="text-base font-bold text-slate-900">Application Pipeline Status</h3>
        <p className="text-xs text-slate-500 font-medium">Distribution across recruitment funnel stages</p>
      </div>

      <div className="h-56 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={5}
              dataKey="value"
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend list */}
      <div className="grid grid-cols-2 gap-2 text-xs font-semibold pt-2 border-t border-slate-100">
        {data?.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 truncate">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-slate-600 truncate">{item.name}</span>
            </div>
            <span className="text-slate-900 font-bold ml-1">{item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
