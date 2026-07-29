import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

export const StatCard = ({
  title,
  value,
  growth,
  icon: Icon,
  color = 'blue',
  sparklineData = [12, 18, 15, 25, 20, 32, 28]
}) => {
  const isPositive = growth >= 0;

  const colorVariants = {
    blue: {
      iconBg: 'bg-blue-50 text-blue-600',
      stroke: '#2563EB',
      fill: '#DBEAFE'
    },
    emerald: {
      iconBg: 'bg-emerald-50 text-emerald-600',
      stroke: '#10B981',
      fill: '#D1FAE5'
    },
    amber: {
      iconBg: 'bg-amber-50 text-amber-600',
      stroke: '#F59E0B',
      fill: '#FEF3C7'
    },
    rose: {
      iconBg: 'bg-rose-50 text-rose-600',
      stroke: '#EF4444',
      fill: '#FEE2E2'
    },
    indigo: {
      iconBg: 'bg-indigo-50 text-indigo-600',
      stroke: '#6366F1',
      fill: '#E0E7FF'
    }
  };

  const currentVariant = colorVariants[color] || colorVariants.blue;

  const chartData = sparklineData.map((val, i) => ({ val, i }));

  return (
    <div className="glass-card p-5 hover-lift relative overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Card Header: Icon + Growth Badge */}
        <div className="flex items-center justify-between mb-3">
          <div className={`p-3 rounded-2xl ${currentVariant.iconBg} transition-transform group-hover:scale-105`}>
            <Icon className="w-5 h-5" />
          </div>

          <div
            className={`inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full text-xs font-bold ${
              isPositive
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                : 'bg-rose-50 text-rose-700 border border-rose-200/60'
            }`}
          >
            {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            <span>{Math.abs(growth)}%</span>
          </div>
        </div>

        {/* Card Label & Large Number */}
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
          {typeof value === 'number' ? value.toLocaleString('en-IN') : value}
        </h3>
      </div>

      {/* Mini Sparkline Chart */}
      <div className="h-10 w-full mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`gradient-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={currentVariant.stroke} stopOpacity={0.4} />
                <stop offset="95%" stopColor={currentVariant.stroke} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="val"
              stroke={currentVariant.stroke}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#gradient-${title.replace(/\s+/g, '')})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
