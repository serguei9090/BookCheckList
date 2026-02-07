import React from 'react';

interface ProgressStatsProps {
  readCount: number;
  totalCount: number;
}

const PERCENTAGE_MAX = 100;

const ProgressStats: React.FC<ProgressStatsProps> = ({ readCount, totalCount }) => {
  const percentage = totalCount > 0 ? Math.round((readCount / totalCount) * PERCENTAGE_MAX) : 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-stone-200" aria-label="Reading progress">
      <div className="flex justify-between mb-3 font-semibold text-amber-800">
        <span className="stats-count">
          <span className="text-emerald-600">{readCount}</span> <span className="text-stone-500">of {totalCount} books read</span>
        </span>
        <span className="stats-percent">{percentage}%</span>
      </div>
      <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={PERCENTAGE_MAX}>
        <div
          className="h-full bg-amber-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressStats;
