import React from 'react';

interface ProgressStatsProps {
  readCount: number;
  totalCount: number;
}

const ProgressStats: React.FC<ProgressStatsProps> = ({ readCount, totalCount }) => {
  const percentage = totalCount > 0 ? Math.round((readCount / totalCount) * 100) : 0;

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-value">{totalCount}</div>
        <div className="stat-label">Total Books</div>
      </div>

      <div className="stat-card">
        <div className={`stat-value ${readCount > 0 ? 'green' : ''}`}>{readCount}</div>
        <div className="stat-label">Completed</div>
      </div>

      <div className="stat-card">
        <div className="stat-value">{percentage}%</div>
        <div className="stat-label">Progress</div>
        <div className="progress-bar-container" style={{ width: '80%', marginTop: '0.5rem' }}>
          <div
            className="progress-bar-fill"
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressStats;
