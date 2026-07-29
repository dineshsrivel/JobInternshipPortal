import React from 'react';

export const Skeleton = ({ className = '', count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`bg-slate-200/80 animate-pulse rounded-lg ${className}`}
        />
      ))}
    </>
  );
};
