import React from 'react';

interface ProgressStatsProps {
  readCount: number;
  totalCount: number;
}

const PERCENTAGE_MAX = 100;

const ProgressStats: React.FC<ProgressStatsProps> = ({ readCount, totalCount }) => {
  const percentage = totalCount > 0 ? Math.round((readCount / totalCount) * PERCENTAGE_MAX) : 0;

  return (
    <div className="progress-stats" aria-label="Reading progress">
      <div className="stats-info">
        <span className="stats-count">{readCount} of {totalCount} books read</span>
        <span className="stats-percent">{percentage}%</span>
      </div>
      <div className="progress-bar-bg" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={PERCENTAGE_MAX}>
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressStats;
