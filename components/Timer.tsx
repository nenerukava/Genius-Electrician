
import React from 'react';

interface TimerProps {
  time: number;
}

const Timer: React.FC<TimerProps> = ({ time }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/20 backdrop-blur-sm p-2 px-4 rounded-lg text-white text-xl font-semibold shadow-lg border border-white/30">
      <span>เวลา: {formatTime(time)}</span>
    </div>
  );
};

export default Timer;
