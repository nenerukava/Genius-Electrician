// Fix: Create EndScreen component
import React from 'react';
import { HighScore } from '../types';
import { LightningBoltIcon } from './Icons';

interface EndScreenProps {
  score: number;
  time: number;
  playerName: string;
  highScores: HighScore[];
  onRestart: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ score, time, playerName, highScores, onRestart }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4 text-white">
      <div className="relative bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 w-full max-w-2xl text-center">
        <LightningBoltIcon className="w-20 h-20 text-yellow-300 mx-auto drop-shadow-[0_0_15px_rgba(252,211,77,0.8)]" />
        <h1 className="text-5xl font-bold mt-4 text-yellow-300">ภารกิจสำเร็จ!</h1>
        <p className="text-xl mt-2 text-purple-200">เยี่ยมมาก, {playerName}!</p>

        <div className="mt-8 bg-black/20 p-6 rounded-lg flex justify-around">
          <div>
            <p className="text-lg text-purple-300">คะแนนของคุณ</p>
            <p className="text-4xl font-bold">{score}</p>
          </div>
          <div>
            <p className="text-lg text-purple-300">เวลาที่ใช้</p>
            <p className="text-4xl font-bold">{formatTime(time)}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-semibold mb-4 text-yellow-300">ทำเนียบช่างไฟอัจฉริยะ</h2>
          <div className="bg-black/20 p-4 rounded-lg max-h-60 overflow-y-auto">
            {highScores.sort((a, b) => b.score - a.score || a.time - b.time).slice(0, 5).map((hs, index) => (
              <div key={index} className={`flex justify-between p-3 rounded-md ${index % 2 === 0 ? 'bg-white/10' : ''}`}>
                <span className="font-semibold text-lg">{index + 1}. {hs.name}</span>
                <div className="flex gap-4">
                  <span className="text-lg">
                    {hs.score} คะแนน
                  </span>
                   <span className="text-lg text-purple-300">
                    ({formatTime(hs.time)})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onRestart}
          className="w-full bg-gradient-to-br from-yellow-400 to-amber-500 text-purple-900 font-bold text-2xl p-4 mt-8 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
        >
          เล่นอีกครั้ง
        </button>
      </div>
    </div>
  );
};

export default EndScreen;
