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
    <div className="bg-white p-8 rounded-2xl shadow-sm mb-8 border border-stone-200" aria-label="Reading progress">
      {/* Read Progress */}
      <div className="mb-8">
        <div className="flex justify-between mb-2 font-serif text-xl text-stone-800">
          <span className="stats-count">
            Books Read
          </span>
          <span className="stats-percent font-sans text-stone-500 text-base font-medium">{readPercentage}%</span>
        </div>
        <div className="flex items-baseline gap-2 mb-3">
             <span className="text-4xl font-bold text-emerald-600 tracking-tight">{readCount}</span>
             <span className="text-stone-400 text-sm font-sans">of {totalCount}</span>
        </div>
        <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden" role="progressbar" aria-valuenow={readPercentage} aria-valuemin={0} aria-valuemax={PERCENTAGE_MAX} aria-label="Reading progress bar">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${readPercentage}%` }}
          />
        </div>
      </div>

      {/* Download Progress */}
      <div>
        <div className="flex justify-between mb-2 font-serif text-xl text-stone-800">
          <span className="stats-count">
            Books Collected
          </span>
          <span className="stats-percent font-sans text-stone-500 text-base font-medium">{downloadedPercentage}%</span>
        </div>
         <div className="flex items-baseline gap-2 mb-3">
             <span className="text-4xl font-bold text-sky-600 tracking-tight">{downloadedCount}</span>
             <span className="text-stone-400 text-sm font-sans">of {totalCount}</span>
        </div>
        <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden" role="progressbar" aria-valuenow={downloadedPercentage} aria-valuemin={0} aria-valuemax={PERCENTAGE_MAX} aria-label="Downloading progress bar">
          <div
            className="h-full bg-sky-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${downloadedPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressStats;
