import React from 'react';
import { getStatusBadgeStyle } from '../../utils/formatters';

export const StatusBadge = ({ status, className = '' }) => {
  if (!status) return null;
  const badgeStyle = getStatusBadgeStyle(status);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${badgeStyle} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
      {status}
    </span>
  );
};
