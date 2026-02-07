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
    <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-stone-200" aria-label="Reading progress">
      {/* Read Progress */}
      <div className="mb-6">
        <div className="flex justify-between mb-3 font-semibold text-amber-800">
          <span className="stats-count">
            <span className="text-emerald-600">{readCount}</span> <span className="text-stone-500">of {totalCount} books read</span>
          </span>
          <span className="stats-percent">{readPercentage}%</span>
        </div>
        <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={readPercentage} aria-valuemin={0} aria-valuemax={PERCENTAGE_MAX} aria-label="Reading progress bar">
          <div
            className="h-full bg-amber-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${readPercentage}%` }}
          />
        </div>
      </div>

      {/* Download Progress */}
      <div>
        <div className="flex justify-between mb-3 font-semibold text-sky-800">
          <span className="stats-count">
            <span className="text-sky-600">{downloadedCount}</span> <span className="text-stone-500">of {totalCount} books downloaded</span>
          </span>
          <span className="stats-percent">{downloadedPercentage}%</span>
        </div>
        <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={downloadedPercentage} aria-valuemin={0} aria-valuemax={PERCENTAGE_MAX} aria-label="Downloading progress bar">
          <div
            className="h-full bg-sky-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${downloadedPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressStats;
