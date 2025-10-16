
import React from 'react';
import { TOTAL_LEVELS } from '../constants';

interface ProgressBarProps {
  currentLevel: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentLevel }) => {
  const progressPercentage = ((currentLevel + 1) / TOTAL_LEVELS) * 100;

  return (
    <div className="w-full bg-gray-200/50 rounded-full h-6 border-2 border-white/50 shadow-inner">
      <div
        className="bg-yellow-400 h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2"
        style={{ width: `${progressPercentage}%` }}
      >
        <span className="text-sm font-bold text-yellow-800">
            {currentLevel + 1} / {TOTAL_LEVELS}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
