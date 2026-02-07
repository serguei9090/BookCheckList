import React from 'react';

interface ProgressStatsProps {
  readCount: number;
  downloadedCount: number;
  totalCount: number;
}

const PERCENTAGE_MAX = 100;

const ProgressStats: React.FC<ProgressStatsProps> = ({ readCount, downloadedCount, totalCount }) => {
  const readPercentage = totalCount > 0 ? Math.round((readCount / totalCount) * PERCENTAGE_MAX) : 0;
  const downloadedPercentage = totalCount > 0 ? Math.round((downloadedCount / totalCount) * PERCENTAGE_MAX) : 0;

  return (
    <div className="progress-stats" aria-label="Progress statistics">
      <div className="stats-row">
        <div className="stats-info">
          <span className="stats-count">{readCount} of {totalCount} books read</span>
          <span className="stats-percent">{readPercentage}%</span>
        </div>
        <div className="progress-bar-bg" role="progressbar" aria-valuenow={readPercentage} aria-valuemin={0} aria-valuemax={PERCENTAGE_MAX} aria-label="Reading progress bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${readPercentage}%` }}
          />
        </div>
      </div>
      <div className="stats-row">
        <div className="stats-info">
          <span className="stats-count">{downloadedCount} of {totalCount} books downloaded</span>
          <span className="stats-percent">{downloadedPercentage}%</span>
        </div>
        <div className="progress-bar-bg" role="progressbar" aria-valuenow={downloadedPercentage} aria-valuemin={0} aria-valuemax={PERCENTAGE_MAX} aria-label="Downloading progress bar">
          <div
            className="progress-bar-fill downloaded"
            style={{ width: `${downloadedPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressStats;
